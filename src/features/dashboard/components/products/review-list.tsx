'use client';

import { useProductReviews } from '../../hooks/use-review-list';
import RatingStars from './star-rating';

interface ReviewListProps {
  productId: string;
}

export default function ReviewList({ productId }: ReviewListProps) {
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useProductReviews(productId);

  const reviews = data?.pages.flatMap((page) => page.data) ?? [];
  console.log(reviews);

  if (isLoading) {
    return <p>Loading reviews...</p>;
  }

  if (isError) {
    return <p>{error instanceof Error ? error.message : 'Failed to load reviews'}</p>;
  }

  if (reviews.length === 0) {
    return <p className="col-span-2 py-8 text-center text-text-muted">No reviews yet.</p>;
  }

  return (
    <div className="col-span-2 max-h-56 overflow-auto pe-7 border-bg-muted border-r scrollbar-none">
      {reviews.map((review) => {
        const userName =
          `${review.user.firstName} ${review.user.lastName}`.trim() || review.user.username;

        return (
          <div key={review.id} className="flex items-start gap-4 py-5  border-b border-bg-muted">
            <div className="flex size-10 shrink-0 text-white font-semibold items-center justify-center rounded-full bg-bg-primary-saturated ">
              {userName.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0 flex-1 text-start">
              <div>
                <h4 className="font-semibold">{userName}</h4>

                <p className="text-sm text-text-muted">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex">
                <RatingStars rating={review.rating} disabled />

                <span className="font-semibold">({review.rating}/5)</span>
              </div>

              <h6 className="font-semibold">{review.headline}</h6>

              <p className="text-sm leading-relaxed text-text-default ">{review.content}</p>
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
          {isFetchingNextPage ? 'Loading...' : 'Load more'}
        </button>
      )}
    </div>
  );
}
