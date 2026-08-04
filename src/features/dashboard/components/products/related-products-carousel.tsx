'use client';

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale } from 'next-intl';
import { ProductCard } from '../home/home-products/Product-card';
import { Product } from '../../types/products';

interface RelatedProductsCarouselProps {
  products: Product[];
}

export default function RelatedProductsCarousel({ products }: RelatedProductsCarouselProps) {
  const locale = useLocale();
  const isRtl = locale === 'ar';
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
    <section className="w-full mt-4">
      <div className="relative mx-auto w-full lg:max-w-5xl">
        <button
          onClick={() => scroll('prev')}
          className="absolute -left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-bg-primary text-text-inverse shadow-lg transition-opacity hover:opacity-80 rtl:-right-4 rtl:left-auto"
        >
          {isRtl ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto px-2 py-2 snap-x snap-mandatory hide-scrollbar"
        >
          {products.map((item) => (
            <div key={item.id} className="snap-start shrink-0">
              <ProductCard product={item} />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll('next')}
          className="absolute -right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-bg-primary text-text-inverse shadow-lg transition-opacity hover:opacity-80 rtl:-left-4 rtl:right-auto"
        >
          {isRtl ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
    </section>
  );
}
