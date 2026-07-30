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
  // 1. إنشاء الـ Plugin باستخدام useMemo لجعله مستقراً ومتاحاً للـ Render بدون استخدام useRef
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
      plugins={[autoplayPlugin]} // ✅ ممرر الآن بشكل آمن تماماً ويتوافق مع قواعد React
      className="w-full relative px-8"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CarouselContent className="-ms-4">
        {products.map((item) => (
          <CarouselItem
            key={item.id}
            className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex justify-center"
          >
            <ProductCard product={item} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="absolute left-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full border-none bg-secondary text-white hover:bg-secondary/90 hover:text-white transition-all active:scale-95 disabled:opacity-50" />
      <CarouselNext className="absolute right-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full border-none bg-secondary text-white hover:bg-secondary/90 hover:text-white transition-all active:scale-95 disabled:opacity-50" />
    </Carousel>
  );
}
