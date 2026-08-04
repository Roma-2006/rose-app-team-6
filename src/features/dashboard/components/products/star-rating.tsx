'use client';

import { Star, StarHalf } from 'lucide-react';

interface IRatingStarsProps {
  rating: number;
  maxStars?: number;
  disabled?: boolean;
  onStarClick?: (rating: number) => void;
}

export default function RatingStars({
  rating,
  maxStars = 5,
  disabled = false,
  onStarClick,
}: IRatingStarsProps) {
  return (
    <div className="flex h-5 gap-0.5">
      {Array.from({ length: maxStars }).map((_, index) => {
        const starValue = index + 1;

        const isFull = index < Math.floor(rating);

        const isHalf = !isFull && rating - index >= 0.5 && rating - index < 1;

        return (
          <button
            key={starValue}
            type="button"
            disabled={disabled}
            aria-label={`${starValue} stars`}
            className="relative size-4 shrink-0 select-none focus:outline-none disabled:cursor-default"
            onClick={() => onStarClick?.(starValue)}
          >
            {isFull ? (
              <Star aria-hidden="true" className="size-4 fill-amber-400 stroke-amber-400" />
            ) : isHalf ? (
              <StarHalf aria-hidden="true" className="size-4 fill-amber-400 stroke-amber-400" />
            ) : (
              <Star aria-hidden="true" className="size-4 fill-transparent stroke-amber-400" />
            )}
          </button>
        );
      })}
    </div>
  );
}
