'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { Button } from '@/shared/components/ui/button';

import { ProductCardSkeleton } from './product-card-skelton';
import { ProductCard } from './Product-card';
import { Product } from '@/features/main/types/products';
import { Carousel } from '../../shared/carousel';

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
            title={t('exploreButton')}
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
          <Carousel>
            {isLoading
              ? [...Array(4)].map((_, i) => (
                  <div key={i} className="snap-start">
                    <ProductCardSkeleton />
                  </div>
                ))
              : products?.map((product) => (
                  <div key={product.id} className="snap-start">
                    <ProductCard product={product} />
                  </div>
                ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};
