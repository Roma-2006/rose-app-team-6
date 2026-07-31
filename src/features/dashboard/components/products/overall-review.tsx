'use client';

import { useLocale, useTranslations } from 'next-intl';
import RatingStars from './star-rating';

interface OverallReviewProps {
  product: {
    rating: number;
    ratingsCount: number;
  };
}

export default function OverallReview({ product }: OverallReviewProps) {
  const t = useTranslations('product-details');
  const locale = useLocale();

  const isRtl = locale === 'ar';

  return (
    <section className="py-10">
      <div className="relative inline-block">
        {/* Pink background */}
        <div
          className={`absolute start-0 top-6 h-4 w-40 bg-bg-secondary-faint ${
            isRtl ? 'rounded-l-full' : 'rounded-r-full'
          }`}
        />

        {/* Title */}
        <h2 className="relative z-10 font-['Sarabun'] text-4xl font-bold leading-9 text-text-primary">
          {t('reviews.title')}
        </h2>

        {/* Red underline */}
        <div className="absolute start-0 top-9.5 z-10 h-0.5 w-14 rounded-full bg-soft-pink" />
      </div>

      <div className="mt-2">
        <h5 className=" text-lg font-semibold">{t('reviews.generalrating')}:</h5>

        <div className="flex items-center gap-2 text-sm text-text-muted">
          <span className="font-semibold text-text-plain">
            {t('reviews.rating', { rating: product.rating })}
          </span>

          <span>{t('reviews.ratingsCount', { count: product.ratingsCount })}</span>
        </div>
        <RatingStars rating={product.rating} disabled />
      </div>
    </section>
  );
}
