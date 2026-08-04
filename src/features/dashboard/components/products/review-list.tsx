'use client';

import { useTranslations } from 'next-intl';

import { Skeleton } from '@/shared/components/ui/skeleton';
import { useProductReviews } from '../../hooks/use-review-list';
import { IProductReview } from '../../types/product-reviews';
import RatingStars from './star-rating';

interface ReviewListProps {
  productId: string;
  initialReviews: IProductReview[];
  totalReviews: number;
}

export default function ReviewList({ productId, initialReviews, totalReviews }: ReviewListProps) {
  const t = useTranslations('product-details.reviews');

  const { data, isPending, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useProductReviews({
      productId,
      initialReviews,
      totalReviews,
      limit: 5,
    });

  const reviews = data?.pages.flatMap((page) => page.data) ?? [];
  const uniqueReviews = Array.from(new Map(reviews.map((review) => [review.id, review])).values());
  if (isPending) {
    return (
      <div className="col-span-2 space-y-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-start gap-4 border-b border-bg-muted py-5">
            <Skeleton className="size-10 shrink-0 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-3 w-1/5" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p role="alert" className="text-destructive">
        {t('error')}
      </p>
    );
  }

  if (reviews.length === 0) {
    return <p className="col-span-2 py-8 text-center text-text-muted">{t('empty')}</p>;
  }

  return (
    <div className="scrollbar-none col-span-2 max-h-100 overflow-auto border-r border-bg-muted pe-7">
      {uniqueReviews.map((review) => {
        const fullName = `${review.user.firstName} ${review.user.lastName}`.trim();

        const userName = fullName || review.user.username;

        return (
          <div key={review.id} className="flex items-start gap-4 border-b border-bg-muted py-5">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-bg-primary-saturated font-semibold text-white">
              {userName.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0 flex-1 text-start">
              <h4 className="font-semibold">{userName}</h4>

              <p className="text-sm text-text-muted">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>

              <div className="flex items-center gap-1">
                <RatingStars rating={review.rating} disabled />

                <span className="font-semibold">
                  {t('rating', {
                    rating: review.rating,
                  })}
                </span>
              </div>

              <h6 className="font-semibold">{review.headline}</h6>

              <p className="text-sm leading-relaxed text-text-default">{review.content}</p>
            </div>
          </div>
        );
      })}

      {hasNextPage && (
        <button
          type="button"
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
          className="my-4 w-full disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isFetchingNextPage ? t('loadingMore') : t('loadMore')}
        </button>
      )}
    </div>
  );
}
