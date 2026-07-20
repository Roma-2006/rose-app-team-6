'use client';

import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useRef } from 'react';

import type { Product } from '../../../types/product.type';

import { Button } from '@/shared/components/ui/button';
import { ProductCardSkeleton } from './product-card-skelton';
import { ProductCard } from './Product-card';

interface BestSellingSectionClientProps {
  products?: Product[];
  isLoading?: boolean;
}

export const BestSellingSectionClient = ({
  products,
  isLoading = false,
}: BestSellingSectionClientProps) => {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const t = useTranslations('home.bestSelling');

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'next' | 'prev') => {
    if (!scrollRef.current) return;

    const scrollAmount = 320;
    const modifier = direction === 'next' ? 1 : -1;
    const rtlMultiplier = isRtl ? -1 : 1;

    scrollRef.current.scrollBy({
      left: scrollAmount * modifier * rtlMultiplier,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-20 mx-20 lg:mx-20 ">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-9">
        {/* Left/Top Content: Badge, Headlines */}
        <div className="size-lf-stretch inline-flex flex-col justify-start items-start gap-2.5">
          {/* Section Badge */}
          <div className="self-stretch h-8 justify-center text-text-secondary text-base font-bold uppercase tracking-widest">
            {t('badge')}
          </div>

          <div className="self-stretch flex-1 flex flex-col justify-start items-start gap-2">
            {/* Split Title for dynamic coloring */}
            <div className="self-stretch justify-center ">
              <span className="text-text-secondary text-3xl font-bold leading-8">
                {t('titlePart1')}{' '}
              </span>
              <span className="text-text-primary text-3xl font-bold leading-8">
                {t('titlePart2')}{' '}
              </span>
              <span className="text-text-secondary text-3xl font-bold leading-8">
                {t('titlePart3')}{' '}
              </span>
              <span className="text-text-primary text-3xl font-bold leading-8">
                {t('titlePart4')}
              </span>
            </div>

            {/* Description  */}
            <div className="self-stretch justify-center text-text-soft text-base font-normal leading-5 whitespace-pre-line mt-4">
              {t('description')}
            </div>
          </div>

          {/* Call to Action Button */}
          <Button
            buttonVariant="text"
            variant="primary"
            title={t('exploreButton')}
            rightIcon={
              isRtl ? (
                <ArrowLeft
                  size={18}
                  className="text-rose group-hover/button:-translate-x-1 transition-transform"
                />
              ) : (
                <ArrowRight
                  size={18}
                  className="text-rose group-hover/button:translate-x-1 transition-transform"
                />
              )
            }
            className="mt-16 w-40 bg-secondary rounded-lg text-text-inverse "
          />
        </div>

        {/* Right/Bottom Content */}
        <div className="relative flex-1 lg:max-w-[950px] w-full">
          <button
            onClick={() => scroll('prev')}
            className="absolute -left-5 rtl:-right-5 rtl:left-auto top-[161px] z-20 w-9 h-9 bg-secondary rounded-full flex justify-center items-center text-rose shadow-lg hover:opacity-80 transition-opacity"
          >
            {isRtl ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory px-2"
          >
            {isLoading
              ? [...Array(4)].map((_, i) => <ProductCardSkeleton key={i} />)
              : products?.map((product) => (
                  <div key={product.id} className="snap-start">
                    <ProductCard product={product} />
                  </div>
                ))}
          </div>

          {/* Scroll Right Button  */}
          <button
            onClick={() => scroll('next')}
            className="absolute -right-5 rtl:-left-5 rtl:right-auto top-[161px] z-20 w-9 h-9 bg-secondary rounded-full flex justify-center items-center text-rose shadow-lg hover:opacity-80 transition-opacity"
          >
            {isRtl ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>
      </div>
    </section>
  );
};
