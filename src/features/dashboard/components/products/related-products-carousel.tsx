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
    <section className="w-full mt-16">
      <div className="relative flex-1 lg:max-w-5xl w-full mx-auto">
        <button
          onClick={() => scroll('prev')}
          className="absolute -left-5 rtl:-right-5 rtl:left-auto top-40.25 z-20 w-9 h-9 bg-bg-primary rounded-full flex justify-center items-center text-text-inverse shadow-lg hover:opacity-80 transition-opacity"
        >
          {isRtl ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory px-2 py-2"
        >
          {products.map((item) => (
            <div key={item.id} className="snap-start shrink-0">
              <ProductCard product={item} />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll('next')}
          className="absolute -right-5 rtl:-left-5 rtl:right-auto top-40.25 z-20 w-9 h-9 bg-bg-primary rounded-full flex justify-center items-center text-text-inverse shadow-lg hover:opacity-80 transition-opacity"
        >
          {isRtl ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
    </section>
  );
}
