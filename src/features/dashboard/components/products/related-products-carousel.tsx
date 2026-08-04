'use client';

import React, { useMemo } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { ProductCard } from '../home/home-products/Product-card';
import { Product } from '../../types/products';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/ui/carousel';

interface RelatedProductsCarouselProps {
  products: Product[];
}

export default function RelatedProductsCarousel({ products }: RelatedProductsCarouselProps) {
  const autoplayPlugin = useMemo(() => Autoplay({ delay: 3000, stopOnInteraction: true }), []);

  const handleMouseEnter = () => {
    autoplayPlugin.stop();
  };

  const handleMouseLeave = () => {
    autoplayPlugin.reset();
  };

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      plugins={[autoplayPlugin]}
      className="w-full relative "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CarouselContent>
        {products.map((item) => (
          <CarouselItem
            key={item.id}
            className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex justify-center"
          >
            <ProductCard product={item} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious
        variant="secondary"
        className="absolute -left-3 top-1/10 -translate-y-1/2 z-20 w-8 h-8 rounded-full border-none bg-marron-600 text-white transition-all hover:bg-marron-600/90 active:scale-95 disabled:opacity-50"
      />
      <CarouselNext
        variant="secondary"
        className="absolute -right-3 top-1/10 -translate-y-1/2 z-20 w-8 h-8 rounded-full border-none bg-marron-600 text-white transition-all hover:bg-marron-600/90 active:scale-95 disabled:opacity-50"
      />
    </Carousel>
  );
}
