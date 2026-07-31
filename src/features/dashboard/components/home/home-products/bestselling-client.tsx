'use client';

import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useRef } from 'react';

import { Button } from '@/shared/components/ui/button';
import { ProductCardSkeleton } from './product-card-skelton';
import { ProductCard } from './Product-card';
import { Product } from '@/features/dashboard/types/products';

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
    <section className=" w-full mt-16">
      <div className="flex flex-col lg:flex-row lg:items-start gap-9">
        <div className="w-80 shrink-0 flex flex-col items-start gap-3">
          <p className="text-base font-bold uppercase tracking-widest text-text-secondary text-start w-full">
            {t('badge')}
          </p>

          <h2 className="w-full text-start text-3xl font-bold leading-tight">
            <span className="text-text-secondary">{t('titlePart1')} </span>
            <span className="text-text-primary">{t('titlePart2')} </span>
            <span className="text-text-secondary">{t('titlePart3')} </span>
          </h2>

          <p className="w-full text-start text-base leading-6 text-text-soft whitespace-pre-line">
            {t('description')}
          </p>
          <Button
            buttonVariant="text"
            variant="primary"
            title="home.bestSelling.exploreButton"
            rightIcon={
              isRtl ? (
                <ArrowLeft
                  size={18}
                  className="text-text-inverse group-hover/button:-translate-x-1 transition-transform"
                />
              ) : (
                <ArrowRight
                  size={18}
                  className="text-text-inverse group-hover/button:translate-x-1 transition-transform"
                />
              )
            }
            className="mt-5 w-40 bg-bg-primary rounded-lg text-text-inverse"
          />
        </div>

        {/* Right/Bottom Content */}
        <div className="relative flex-1 lg:max-w-5xl w-full">
          <button
            onClick={() => scroll('prev')}
            className="absolute -left-5 rtl:-right-5 rtl:left-auto top-[161px] z-20 w-9 h-9 bg-bg-primary rounded-full flex justify-center items-center text-text-inverse shadow-lg hover:opacity-80 transition-opacity"
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
            className="absolute -right-5 rtl:-left-5 rtl:right-auto top-[161px] z-20 w-9 h-9 bg-bg-primary rounded-full flex justify-center items-center text-text-inverse shadow-lg hover:opacity-80 transition-opacity"
          >
            {isRtl ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>
      </div>
    </section>
  );
};
