'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Card } from '@/shared/components/ui/card';
import { slides } from '@/features/dashboard/constants/slides';
import { useTranslations } from 'next-intl';

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const t = useTranslations('home');

  const goTo = (index: number) => {
    setActive((index + slides.length) % slides.length);
  };

  const slide = slides[active];

  return (
    <Card className="relative h-full min-h-111 overflow-hidden rounded-3xl border-0 p-0">
      {/* Slide Image */}
      <Image
        src={slide.image}
        alt={t(slide.title)}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      {/* Content Side */}
      <div className="absolute inset-y-0 start-0 z-10 flex max-w-xl flex-col justify-end gap-3 p-10 pb-12">
        <h2 className="text-4xl font-semibold leading-tight text-white tracking-tight text-start">
          {t(slide.title)}
        </h2>
        <p className="text-sm text-start font-medium text-white/90">{t(slide.subtitle)}</p>

        {/* Button */}
        <Link
          href="/products"
          className="mt-2 w-fit rounded-xl bg-soft-pink-50 px-6 py-2.5 text-center text-sm font-bold text-maroon-600 transition-colors hover:bg-soft-pink-100 shadow-sm"
        >
          {t(slide.cta)}
        </Link>
      </div>

      {/* Top Right Dots */}
      <div className="absolute end-5 top-5 z-10 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`h-2 transition-all duration-300 ${
              index === active
                ? 'w-8 rounded-full bg-maroon-600'
                : 'w-2 rounded-full bg-white/70 hover:bg-white'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Bottom Arrows Container */}
      <div className="absolute bottom-10 end-10 z-10 flex items-center justify-between w-20 h-9 rounded-full bg-soft-pink-50/90 p-1 backdrop-blur-sm shadow-sm border border-white/20">
        {/* Left Arrow */}
        <button
          onClick={() => goTo(active - 1)}
          className="flex h-8 w-8 items-center justify-center text-maroon-800 transition hover:opacity-75 rtl:rotate-180"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => goTo(active + 1)}
          className="flex h-8 w-8 items-center justify-center text-maroon-800 transition hover:opacity-75 rtl:rotate-180"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </Card>
  );
}
