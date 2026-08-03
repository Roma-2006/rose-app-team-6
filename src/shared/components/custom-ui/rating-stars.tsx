import { Star } from 'lucide-react';

export default function RatingStarts({ rating }: { rating: number }) {
  const ratingValue = Math.round(rating);
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          fill={i < ratingValue ? 'var(--color-yellow-400)' : 'none'}
          stroke="var(--color-yellow-400)"
        />
      ))}
    </>
  );
}
