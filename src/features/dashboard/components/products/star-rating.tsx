import React from 'react';
import { Star } from 'lucide-react';

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
    <div className="flex w-25 h-5 gap-0.5">
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        const isFull = index < Math.floor(rating);
        const isHalf = !isFull && index < rating;

        return (
          <button
            key={index}
            type="button"
            disabled={disabled}
            className="relative select-none focus:outline-none disabled:cursor-not-allowed"
            onClick={() => onStarClick?.(starValue)}
          >
            <Star
              size={14}
              className={`w-4 h-4 ${
                isFull ? 'fill-[#FBA707] stroke-[#FBBF24]' : 'fill-transparent stroke-[#FBBF24]'
              }`}
            />
            {isHalf && (
              <div className="absolute top-0 left-0 overflow-hidden w-1/2 pointer-events-none">
                <Star size={14} className="w-4 h-3.5 fill-[#FBA707] stroke-[#FBBF24]" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
