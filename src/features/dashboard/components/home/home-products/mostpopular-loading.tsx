import { getLocale, getTranslations } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';

import { ProductCardSkeleton } from './product-card-skelton';

const HOME_OCCASIONS = ['Wedding', 'Anniversary', 'Birthday', 'Engagement'];

export default async function MostPopularSectionLoading() {
  const t = await getTranslations('home.most-Popular');
  const locale = await getLocale();
  const isRtl = locale === 'ar';

  return (
    <section className="w-full mt-2 md:mt-16">
      <div className="flex justify-between items-end  pb-2 md:pb-10 flex-wrap gap-2 md:gap-0">
        <div className="relative inline-block">
          {/* Pink background */}
          <div
            className={`absolute start-0 top-6 w-40 h-4 bg-bg-secondary-faint ${
              isRtl ? 'rounded-l-full' : 'rounded-r-full'
            }`}
          />
          {/* Title */}
          <h2 className="relative z-10  text-text-primary text-xl md:text-4xl font-bold font-['Sarabun'] leading-9">
            {t('mostPopular')}
          </h2>

          {/* Red underline */}
          <div className="absolute start-0 bottom-0 top-9.5 w-14 h-0.5 bg-soft-pink rounded-full z-10" />
        </div>
        {/* Right Side: Occasion Tabs */}
        <div className="flex items-center gap-6">
          {HOME_OCCASIONS.map((occ) => (
            <span
              key={occ}
              className="text-sm md:text-base font-medium transition-all whitespace-nowrap text-text-soft hover:text-text-plain"
            >
              {occ}
            </span>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>

      {/* View More at the bottom right */}
      <div className="self-stretch flex justify-end items-center gap-2.5">
        <span className="text-text-primary text-base font-semibold flex items-center gap-2 hover:underline">
          {t('viewMore')}
          <ArrowRight size={12} strokeWidth={3} />
        </span>
      </div>
    </section>
  );
}
