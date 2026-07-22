import React from 'react';
import { Star } from 'lucide-react'; // Or import from your custom icons library

interface IRatingStarsProps {
  rating: number;
  maxStars?: number;
}

export default function RatingStars({ rating, maxStars = 5 }: IRatingStarsProps) {
  return (
    <div className="flex w-25 h-5 gap-0.5 ">
      {[...Array(maxStars)].map((_, index) => {
        const isFull = index < Math.floor(rating);
        const isHalf = !isFull && index < rating;
        return (
          <div key={index} className="relative select-none">
            <Star
              size={14}
              className={`w-4 h-3.5 ${
                isFull ? 'fill-[#FBA707] stroke-[#FBBF24]' : 'fill-white stroke-[#FBBF24]'
              }`}
            />
            {isHalf && (
              <div className="absolute top-0 left-0 overflow-hidden w-1/2">
                <Star size={14} className="w-4 h-3.5 fill-[#FBA707] stroke-[#FBBF24]" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
