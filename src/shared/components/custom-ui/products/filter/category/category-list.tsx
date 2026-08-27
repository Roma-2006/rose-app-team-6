'use client';

import { useTranslations } from 'next-intl';
import CategoryItem from './category-item';
import ResetButton from '../general/reset-button';
import { getCategories } from '@/shared/api/products/filter/category.api';
import {
  LIMIT,
  SKELETON_COUNT,
  NEXT_PAGE_SKELETON_COUNT,
} from '@/shared/constants/filter.constants';
import { useInfiniteFilterList } from '@/features/main/hooks/use-infinity-filter';
import CategoryItemSkeleton from '@/features/main/components/skeleton/category-skeleton';

const CategoryList = () => {
  // Translation
  const t = useTranslations('products.filter.category');

  // State
  const {
    items: categories,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    loadMoreRef,
  } = useInfiniteFilterList({
    queryKey: ['categories'],
    queryFn: getCategories,
    limit: LIMIT,
  });

  return (
    <div className="w-full pt-2.5 pb-5 border-b border-border-muted">
      <div className="flex justify-between">
        <h3 className="text-text-plain font-semibold text-lg">{t('title')}</h3>
        <ResetButton paramKeys={['categoryId', 'subCategoryId']} />
      </div>

      <div className="mt-3 flex flex-col gap-2 max-h-49.75 overflow-y-auto overflow-x-hidden hide-scrollbar p-0.5">
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
