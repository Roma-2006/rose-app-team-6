'use client';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@/i18n/navigation';

import { ArrowRight } from 'lucide-react';
import { ProductCardSkeleton } from './product-card-skelton';
import { ProductCard } from './Product-card';
import { getOccasions } from '@/features/dashboard/apis/occasion.api';
import { useProducts } from '@/features/dashboard/hooks/use-products';
const ALL_TAB_ID = 'home.all';

export const MostPopularSection = () => {
  const t = useTranslations('home.most-Popular');
  const [activeTab, setActiveTab] = useState<string>(ALL_TAB_ID);
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const { data, isLoading, isError } = useProducts({
    limit: 12,
    sortBy: 'mostPopular',
    sortOrder: 'desc',
    occasionId: activeTab === ALL_TAB_ID ? undefined : activeTab,
  });

  const products = data?.data;
  const { data: occasions } = useQuery({
    queryKey: ['occasions'],
    queryFn: () => getOccasions(),
  });

  const HOME_OCCASIONS = ['Wedding', 'Anniversary', 'Birthday', 'Engagement'];

  const visibleOccasions = occasions?.filter((occ) => HOME_OCCASIONS.includes(occ.title)) ?? [];

  return (
    <section className="w-full my-16 mx-auto justify-center ">
      <div className="flex justify-between items-end pb-10 mr-1.5">
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
          <button
            type="button"
            onClick={() => setActiveTab(ALL_TAB_ID)}
            className={`text-sm md:text-base font-medium transition-all whitespace-nowrap ${
              activeTab === ALL_TAB_ID
                ? 'text-text-primary'
                : 'text-text-soft hover:text-text-plain'
            }`}
          >
            {t('all')}
          </button>

          {visibleOccasions.map((occ) => (
            <button
              key={occ.id}
              onClick={() => setActiveTab(occ.id)}
              className={`text-sm md:text-base font-medium transition-all whitespace-nowrap ${
                activeTab === occ.id ? 'text-text-primary' : 'text-text-soft hover:text-text-plain'
              }`}
            >
              {occ.title}
            </button>
          ))}
        </div>
      </div>
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {' '}
        {isLoading ? (
          [...Array(8)].map((_, i) => <ProductCardSkeleton key={i} />)
        ) : isError ? (
          <div className="col-span-full text-center text-text-danger">{t('error')}</div>
        ) : products?.length === 0 ? (
          <div className="col-span-full text-center py-20 text-text-soft">
            {t('noProductsFound')}
          </div>
        ) : (
          products?.map((p) => <ProductCard key={p.id} product={p} />)
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
