'use client';

import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import OccasionItem from './occasion-item';
import OccasionItemSkeleton from './occasion-skelton';
import ResetButton from '../general/reset-button';
import { getOccasions } from '@/shared/api/products/filter/occasion.api';
import { Occasion } from '@/shared/types/products/filter/occasion';

const LIMIT = 20;
const SKELETON_COUNT = 6;
const NEXT_PAGE_SKELETON_COUNT = 2;

const OccasionList = () => {
  const t = useTranslations('products.filter.occasion');
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['occasions', 'filter'],
    queryFn: ({ pageParam }) => getOccasions({ page: pageParam, limit: LIMIT }),
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

  const occasions = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <h3 className="text-text-plain font-semibold text-lg">{t('title')}</h3>
        <ResetButton paramKeys={['occasionId', 'suboccasionId']} />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 max-h-104 overflow-y-auto overflow-x-hidden">
        {isLoading
          ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <OccasionItemSkeleton key={`initial-skeleton-${i}`} />
            ))
          : occasions.map((occasion: Occasion) => (
              <OccasionItem key={occasion.id} occasion={occasion} />
            ))}

        {hasNextPage && <div ref={loadMoreRef} className="col-span-2 h-1" />}

        {isFetchingNextPage &&
          Array.from({ length: NEXT_PAGE_SKELETON_COUNT }).map((_, i) => (
            <OccasionItemSkeleton key={`next-skeleton-${i}`} />
          ))}
      </div>
    </div>
  );
};
export default OccasionList;
