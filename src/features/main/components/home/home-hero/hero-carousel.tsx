'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Card } from '@/shared/components/ui/card';
import { useTranslations } from 'next-intl';
import { slides } from '@/features/main/constants/slides';

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const t = useTranslations('home');

  const goTo = (index: number) => {
    setActive((index + slides.length) % slides.length);
  };

  return (
    <Card className="relative h-full min-h-111 overflow-hidden rounded-3xl border-0 ring-0 p-0">
      {/* Dynamic Slide Backgrounds */}
      {slides.map((slide, index) => {
        const isActive = index === active;
        return (
          <div
            key={index}
            className={`absolute inset-0 h-full w-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-[opacity,transform] ${
              isActive ? 'opacity-100 scale-100 z-0' : 'opacity-0 scale-105 pointer-events-none z-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={t(slide.title)}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        );
      })}

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-10" />

      {/* Content Side with Smooth Fade */}
      <div className="absolute inset-y-0 start-0 z-20 flex max-w-xl flex-col justify-end gap-3 p-10 pb-12">
        {slides.map((slide, index) => {
          const isActive = index === active;
          return (
            <div
              key={index}
              className={`flex flex-col gap-3 transition-all duration-500 ease-out ${
                isActive
                  ? 'opacity-100 translate-y-0 relative'
                  : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none hidden'
              }`}
            >
              <h2 className="text-4xl font-semibold leading-tight text-white tracking-tight text-start">
                {t(slide.title)}
              </h2>
              <p className="text-sm text-start font-medium text-white/90">{t(slide.subtitle)}</p>

              {/* Button */}
              <Link
                href="/products"
                className="mt-2 w-fit rounded-xl bg-soft-pink-50 px-6 py-2.5 text-center text-sm font-bold text-maroon-600 transition-all hover:bg-soft-pink-100 shadow-sm hover:scale-105 active:scale-95"
              >
                {t(slide.cta)}
              </Link>
            </div>
          );
        })}
      </div>

      {/* Top Right Dots */}
      <div className="absolute end-5 top-5 z-20 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`h-2 transition-all duration-500 ease-out ${
              index === active
                ? 'w-8 rounded-full bg-maroon-600'
                : 'w-2 rounded-full bg-white/70 hover:bg-white'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Bottom Arrows Container */}
      <div className="absolute bottom-10 end-10 z-20 flex items-center justify-between w-20 h-9 rounded-full bg-soft-pink-50/90 p-1 backdrop-blur-sm shadow-sm border border-white/20">
        {/* Left Arrow */}
        <button
          onClick={() => goTo(active - 1)}
          className="flex h-8 w-8 items-center justify-center text-maroon-800 transition hover:opacity-75 active:scale-90 rtl:rotate-180"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => goTo(active + 1)}
          className="flex h-8 w-8 items-center justify-center text-maroon-800 transition hover:opacity-75 active:scale-90 rtl:rotate-180"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </Card>
  );
}
