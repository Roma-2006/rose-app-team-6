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
  const t = useTranslations('products.product-reviews');
  const locale = useLocale();

  const isRtl = locale === 'ar';

  return (
    <section className="py-10">
      <div className="relative inline-block">
        {/* Pink background highlight */}
        <div
          className={`absolute start-0 top-6 h-4 w-40 bg-bg-secondary-faint ${
            isRtl ? 'rounded-l-full' : 'rounded-r-full'
          }`}
        />

        {/* Section Title */}
        <h2 className="relative z-10 font-['Sarabun'] text-4xl font-bold leading-9 text-text-primary">
          {t('title')}
        </h2>

        {/* Decorative underline */}
        <div className="absolute start-0 top-9.5 z-10 h-0.5 w-14 rounded-full bg-soft-pink" />
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-text-primary">{t('generalrating')}:</h3>

        <div className="mt-1 flex items-center gap-2 text-sm text-text-muted">
          <span className="font-semibold text-text-plain">
            {t('rating', { rating: product?.rating ?? 0 })}
          </span>

          <span>{t('ratingsCount', { count: product?.ratingsCount ?? 0 })}</span>
        </div>

        <div className="mt-2">
          <RatingStars rating={product?.rating ?? 0} disabled />
        </div>
      </div>
    </section>
  );
}
