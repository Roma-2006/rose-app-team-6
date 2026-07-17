'use client';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import { useOccasions } from '../../../hooks/useHomeData';
import { getProducts } from '../../../api/product.api';
import { Link } from '@/i18n/navigation';
import { ProductCard } from './ProductCard';
import { ProductCardSkeleton } from './ProductCardSkeleton';
import { ArrowRight } from 'lucide-react';

export const MostPopularSection = () => {
  const t = useTranslations('home.most-Popular');
  const [activeTab, setActiveTab] = useState<string>('home.all');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const { data: occasions, isLoading: isOccasionsLoading } = useOccasions();
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products', 'most-popular', activeTab],
    queryFn: () => getProducts(activeTab === 'home.all' ? undefined : activeTab, 12),
  });

  const allOccasions = occasions ?? [];

  return (
    <section className="py-20  mx-20 px-4  flex flex-col gap-10">
      {/* Header Section */}
      <div className="flex justify-between items-end  pb-4">
        {/* Left Side: Title with Decorations */}
        <div className="relative inline-block">
          {/* Pink background */}
          <div
            className={`absolute start-0 top-6 w-40 h-4 bg-bg-secondary-faint ${
              isRtl ? 'rounded-l-full' : 'rounded-r-full'
            }`}
          />
          {/* Title */}
          <h2 className="relative z-10  text-text-primary text-4xl font-bold font-['Sarabun'] leading-9">
            {t('mostPopular')}
          </h2>

          {/* Red underline */}
          <div className="absolute start-0 bottom-0 top-9.5 w-14 h-0.5 bg-soft-pink rounded-full z-10" />
        </div>

        {/* Right Side: Occasion Tabs */}
        <div className="flex items-center gap-6">
          {allOccasions.map((occ) => (
            <button
              key={occ.id}
              onClick={() => setActiveTab(occ.id)}
              className={`text-sm md:text-base font-medium transition-all whitespace-nowrap ${
                activeTab === occ.id ? 'text-text-primary' : 'text-text-soft hover:text-text-plain'
              }`}
            >
              {t(`occasions.${occ.title}`)}
            </button>
          ))}
        </div>
      </div>
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 content-center mt-10">
        {isLoading ? (
          [...Array(8)].map((_, i) => <ProductCardSkeleton key={i} />)
        ) : isError ? (
          <div className="col-span-full text-center text-text-danger">{t('error')}</div>
        ) : (products ?? []).length === 0 ? (
          <div className="col-span-full text-center py-20 text-text-soft">
            {t('noProductsFound')}
          </div>
        ) : (
          (products ?? []).slice(0, 12).map((p) => <ProductCard key={p.id} product={p} />)
        )}
      </div>

      {/* View More at the bottom right */}

      <div className="self-stretch flex justify-end items-center gap-2.5">
        <Link
          href="/products"
          className="text-text-primary text-base font-semibold flex items-center gap-2 hover:underline"
        >
          {t('viewMore')}
          <ArrowRight size={12} strokeWidth={3} />
        </Link>
      </div>
    </section>
  );
};
