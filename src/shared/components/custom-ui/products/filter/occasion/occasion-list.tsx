'use client';

import { useTranslations } from 'next-intl';
import OccasionItem from './occasion-item';
import OccasionItemSkeleton from './occasion-skelton';
import ResetButton from '../general/reset-button';
import { getOccasions } from '@/shared/api/products/filter/occasion.api';
import { Occasion } from '@/shared/types/products/filter/occasion';
import {
  LIMIT,
  SKELETON_COUNT,
  NEXT_PAGE_SKELETON_COUNT,
} from '@/shared/constants/filter.constants';
import { useInfiniteFilterList } from '@/features/dashboard/hooks/use-infinity-filter';

const OccasionList = () => {
  // Translation
  const t = useTranslations('products.filter.occasion');

  // State
  const {
    items: occasions,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    loadMoreRef,
  } = useInfiniteFilterList({
    queryKey: ['occasions', 'filter'],
    queryFn: getOccasions,
    limit: LIMIT,
  });

  return (
    <div className="w-full pt-2.5 pb-5 border-b border-border-muted">
      <div className="flex justify-between items-center">
        <h3 className="text-text-plain font-semibold text-lg">{t('title')}</h3>
        <ResetButton paramKeys={['occasionId', 'suboccasionId']} />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 max-h-104 overflow-y-auto overflow-x-hidden hide-scrollbar p-0.5">
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
