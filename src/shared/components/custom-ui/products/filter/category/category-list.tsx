'use client';

import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import CategoryItem from './category-item';
import CategoryItemSkeleton from './category-skeleton';
import ResetButton from '../general/reset-button';
import { getCategories } from '@/shared/api/products/filter/category.api';
import {
  LIMIT,
  SKELETON_COUNT,
  NEXT_PAGE_SKELETON_COUNT,
} from '@/shared/constants/filter.constants';

const CategoryList = () => {
  const t = useTranslations('products.filter.category');
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['categories'],
    queryFn: ({ pageParam }) => getCategories({ page: pageParam, limit: LIMIT }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.metadata.page < lastPage.metadata.totalPages
        ? lastPage.metadata.page + 1
        : undefined,
  });

  useEffect(() => {
    const sentinel = loadMoreRef.current;
    if (!sentinel || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { root: sentinel.parentElement, threshold: 0.1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const categories = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className="w-full pt-2.5 pb-5 border-b border-border-muted">
      <div className="flex justify-between">
        <h3 className="text-text-plain font-semibold text-lg">{t('title')}</h3>
        <ResetButton paramKeys={['categoryId', 'subCategoryId']} />
      </div>

      <div className="mt-3 flex flex-col gap-2 max-h-49.75 overflow-y-auto overflow-x-hidden">
        {isLoading
          ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <CategoryItemSkeleton key={`initial-skeleton-${i}`} />
            ))
          : categories.map((category) => <CategoryItem key={category.id} category={category} />)}

        {hasNextPage && <div ref={loadMoreRef} className="h-1" />}

        {isFetchingNextPage &&
          Array.from({ length: NEXT_PAGE_SKELETON_COUNT }).map((_, i) => (
            <CategoryItemSkeleton key={`next-skeleton-${i}`} />
          ))}
      </div>
    </div>
  );
};
export default CategoryList;
