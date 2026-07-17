'use client';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useBestSellingProducts } from '../../../hooks/useBestSellingProducts';
import { ProductCard } from './ProductCard';
import { useLocale, useTranslations } from 'next-intl';
import { ProductCardSkeleton } from './ProductCardSkeleton';
import { useRef } from 'react';
import { Button } from '@/shared/components/ui/button';

export const BestSellingSection = () => {
  const { data: products, isLoading, isError } = useBestSellingProducts();
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const t = useTranslations('home.bestSelling');

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-20 mx-20 lg:mx-20 dark:bg-bg-plain">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-9">
        {/* Left/Top Content: Badge, Headlines, and Call to Action */}
        <div className="size-lf-stretch inline-flex flex-col justify-start items-start gap-2.5">
          {/* Section Badge */}
          <div className="self-stretch h-8 justify-center text-text-secondary text-base font-bold uppercase tracking-[4px]">
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
            className="mt-16 w-40 bg-secondary rounded-lg text-text-inverse"
          />
        </div>

        {/* Right/Bottom Content: Product Carousel */}
        <div className="relative flex-1 lg:max-w-[950px] w-full">
          {/* Scroll Left Button - rtl:rotate-180 flips the arrow for Arabic */}
          <button
            onClick={() => scroll('left')}
            className="absolute -left-5 top-[161px] z-20 w-9 h-9 bg-secondary rounded-full flex justify-center items-center text-rose shadow-lg hover:opacity-80 transition-opacity"
          >
            <ChevronLeft size={20} className="rtl:rotate-180" />
          </button>

          {/* Horizontal scroll  */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory px-2"
          >
            {isLoading
              ? // Display Skeletons while fetching data
                [...Array(4)].map((_, i) => <ProductCardSkeleton key={i} />)
              : // Render actual Product Cards
                products?.map((product) => (
                  <div key={product.id} className="snap-start">
                    <ProductCard product={product} />
                  </div>
                ))}
          </div>

          {/* Scroll Right Button - rtl:rotate-180 flips the arrow for Arabic */}
          <button
            onClick={() => scroll('right')}
            className="absolute -right-5 top-[161px] z-20 w-9 h-9 bg-secondary rounded-full flex justify-center items-center text-rose shadow-lg hover:bg-red-900 transition-colors"
          >
            <ChevronRight size={20} className="rtl:rotate-180" />
          </button>
        </div>
      </div>
    </section>
  );
};
