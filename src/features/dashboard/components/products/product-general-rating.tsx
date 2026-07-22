import { IGeneralRatingData } from '../../types/product-reviews';
import SecTitle from '../home/section-title';
import RatingStars from './star-rating';
import { Star } from 'lucide-react';

export default function ProductGeneralRating({
  generalRating = 0,
  totalRatings = 0,
}: IGeneralRatingData) {
  return (
    <div className=" rating-container flex flex-col mb-10 w-full max-h-31 text-start items-start gap-2.5">
      <SecTitle text="Product Reviews" />
      {/* Rating */}
      <h5 className=" text-xl font-semibold text-text-plain ">General rating:</h5>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl text-text-plain font-bold">{generalRating.toFixed(1)}</span>

        <span className="text-xl text-text-muted">({totalRatings} ratings)</span>
      </div>

      <RatingStars rating={generalRating} maxStars={5} />
    </div>
  );
}
