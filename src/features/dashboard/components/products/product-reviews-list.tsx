// components/ProductReviewsList.tsx
import React from 'react';
import { Star } from 'lucide-react';
import { IReviewItem } from '../../types/product-reviews';
import RatingStars from './star-rating';

interface ProductReviewsListProps {
  reviews: IReviewItem[];
}

export default function ProductReviewsList({ reviews = [] }: ProductReviewsListProps) {
  if (reviews.length === 0) {
    return (
      <div className="  w-185.5 flex justify-center items-center ">
        <p className="text-sm text-text-plain text-center ">
          No reviews posted yet for this product.
        </p>
      </div>
    );
  }

  return (
    <div className="w-185.5 ">
      {reviews.map((review, index) => (
        <div key={review.id || index} className=" review-container flex flex-col gap-2.5 pb-2.5">
          {/* Reviewer info  */}

          <div className="flex items-start text-start h-11 gap-2.5">
            {/* Reviewer Logo */}

            <div className="w-3 h-5 rounded-full bg-bg-primary flex items-center justify-center text-white font-semibold text-xl select-none">
              {review.userName?.charAt(0).toUpperCase()}
            </div>
            {/* Reviewer Name and Date */}
            <div className="flex flex-col  items-start w-18 gap-0.5">
              <span className=" text-start text-lg font-semibold text-text-plain ">
                {review.userName}
              </span>
              <p className=" text-start text-sm text-text-muted font-medium">{review.date}</p>
            </div>
          </div>

          {/*  Rating */}
          <div className="flex items-center gap-1">
            <RatingStars rating={review.rating} />
            <span className="text-sm font-semibold text-text-plain">
              ({review.rating?.toFixed(1)})
            </span>
          </div>

          {/* Comment text*/}
          <div className="comment-container flex flex-col gap-1.5 ">
            <h5 className="text-lg font-semibold text-text-plain ">{review.title}</h5>
            <p className="text-sm text-text-default  max-w-2xl leading-tight  whitespace-pre-line">
              {review.comment}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
