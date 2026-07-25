'use client';

import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/shared/lib/utils/tailwind-cn';
import ResetButton from '../general/reset-button';

const STAR_VALUES = [1, 2, 3, 4, 5];

const RatingFilter = () => {
  const t = useTranslations('products.filter.rating');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const selectedRating = Number(searchParams.get('minRating')) || 0;
  const displayValue = hoveredValue ?? selectedRating;

  const handleClick = (value: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === selectedRating) {
      params.delete('minRating');
    } else {
      params.set('minRating', String(value));
    }

    params.set('page', '1');

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <h3 className="text-text-plain font-semibold text-lg">{t('title')}</h3>
        <ResetButton paramKeys={['minRating']} />
      </div>

      <div className="mt-3 flex gap-2" onMouseLeave={() => setHoveredValue(null)}>
        {STAR_VALUES.map((value) => (
          <button
            key={value}
            type="button"
            aria-label={t('starLabel', { count: value })}
            aria-pressed={selectedRating >= value}
            onClick={() => handleClick(value)}
            onMouseEnter={() => setHoveredValue(value)}
            className="p-0.5"
          >
            <Star
              className={cn(
                'size-6 transition-colors',
                displayValue >= value
                  ? 'fill-bg-warning text-border-warning'
                  : 'fill-transparent text-border-warning'
              )}
              strokeWidth={1.5}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
export default RatingFilter;
