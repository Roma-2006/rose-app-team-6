'use client';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useBestSellingProducts } from '../hooks/useBestSellingProducts';
import { ProductCard } from './ProductCard';
import { useTranslations } from 'next-intl';
import { ProductCardSkeleton } from './ProductCardSkeleton';
import { useRef } from 'react';
import { Button } from '@/shared/components/ui/button';

export const BestSellingSection = () => {
  const { data: products, isLoading, isError } = useBestSellingProducts();
  const t = useTranslations('home');
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
    <section className="py-20  max-w-[1281px] mx-20 ">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-9">
        {/* الجزء الأيسر: النصوص */}
        <div className="size-lf-stretch inline-flex flex-col justify-start items-start gap-2.5">
          <div className="self-stretch h-8 justify-center text-text-secondary text-base font-bold font-['Sarabun'] uppercase tracking-[4px]">
            Best Selling
          </div>
          <div className="self-stretch flex-1 flex flex-col justify-start items-start gap-2">
            <div className="self-stretch justify-center">
              <span className="text-text-secondary text-3xl font-bold font-['Sarabun'] leading-8">
                Check Out
              </span>
              <span className="text-text-primary text-3xl font-bold font-['Sarabun'] leading-8">
                {' '}
                What Everyone’s{' '}
              </span>
              <span className="text-text-secondary text-3xl font-bold font-['Sarabun'] leading-8">
                Buying
              </span>
              <span className="text-text-primary text-3xl font-bold font-['Sarabun'] leading-8">
                {' '}
                Right Now
              </span>
            </div>
            <div className="self-stretch justify-center text-text-soft text-base font-normal font-['Sarabun'] leading-5">
              Not sure what to choose?
              <br />
              Start with our best sellers, these are the gifts our customers keep coming back for.
              <br />
              Whether you&apos;re celebrating a birthday, anniversary or wedding, our top picks are
              guaranteed to leave a lasting impression.{' '}
            </div>
          </div>
          <Button
            buttonVariant="text"
            variant="primary"
            title="Explore gifts"
            rightIcon={
              <ArrowRight
                size={18}
                className="text-rose group-hover/button:translate-x-1 transition-transform"
              />
            }
            className="mt-16 w-40 bg-secondary rounded-lg text-text-inverse"
          />
        </div>

        <div className="relative flex-1 lg:max-w-[950px] ">
          <button
            onClick={() => scroll('left')}
            className="absolute -left-5 top-[161px] z-20 w-9 h-9 bg-secondary rounded-full flex justify-center items-center text-rose shadow-lg  transition-opacity"
          >
            <ChevronLeft size={20} />
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

          <button
            onClick={() => scroll('right')}
            className="absolute -right-5 top-[161px] z-20 w-9 h-9 bg-secondary rounded-full flex justify-center items-center text-rose-100 shadow-lg hover:bg-red-900 "
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};
