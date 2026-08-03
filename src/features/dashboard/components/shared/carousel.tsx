'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useRef, type ReactNode } from 'react';

interface CarouselProps {
  children: ReactNode;
  gap?: number;
  fallbackStep?: number;
}

export const Carousel = ({ children, gap = 24, fallbackStep = 312 }: CarouselProps) => {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'next' | 'prev') => {
    const container = scrollRef.current;
    if (!container) return;

    const child = container.firstElementChild as HTMLElement | null;
    const cardWidth = child ? child.getBoundingClientRect().width : 0;
    const step = cardWidth + gap;

    // Smoothing Scrolling
    const scrollAmount = (step > 0 ? step : fallbackStep) * 1.5;
    const modifier = direction === 'next' ? 1 : -1;
    const rtlMultiplier = isRtl ? -1 : 1;

    container.scrollBy({
      left: scrollAmount * modifier * rtlMultiplier,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => scroll('prev')}
        className="absolute -left-5 rtl:-right-5 rtl:left-auto top-[161px] z-20 w-9 h-9 bg-bg-primary rounded-full flex justify-center items-center text-text-inverse shadow-lg transition-transform hover:scale-110 active:scale-95"
      >
        {isRtl ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      <div
        ref={scrollRef}
        style={{ gap }}
        className="flex overflow-x-auto hide-scrollbar snap-x snap-proximity scroll-smooth transform-gpu will-change-scroll px-2"
      >
        {children}
      </div>

      <button
        onClick={() => scroll('next')}
        className="absolute -right-5 rtl:-left-5 rtl:right-auto top-[161px] z-20 w-9 h-9 bg-bg-primary rounded-full flex justify-center items-center text-text-inverse shadow-lg transition-transform hover:scale-110 active:scale-95"
      >
        {isRtl ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>
    </div>
  );
};
