import { Suspense } from 'react';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

import { ArrowRight } from 'lucide-react';
import { ProductCard } from './Product-card';
import { getOccasions } from '@/features/dashboard/apis/occasion.api';
import { getProducts } from '@/features/dashboard/apis/product.api';
import type { Product } from '@/features/dashboard/types/products';
import MostPopularSectionLoading from './mostpopular-loading';

const HOME_OCCASIONS = ['Wedding', 'Anniversary', 'Birthday', 'Engagement'];

interface MostPopularSectionProps {
  occasionId?: string;
}

const MostPopularSectionContent = async ({ occasionId }: MostPopularSectionProps) => {
  const t = await getTranslations('home.most-Popular');
  const locale = await getLocale();
  const isRtl = locale === 'ar';

  let products: Product[] | undefined;
  let visibleOccasions: Awaited<ReturnType<typeof getOccasions>> = [];
  let hasError = false;

  try {
    const [productsResult, occasions] = await Promise.all([
      getProducts({
        limit: 12,
        sortBy: 'mostPopular',
        sortOrder: 'desc',
        occasionId,
      }),
      getOccasions(),
    ]);

    products = productsResult?.data;
    visibleOccasions = occasions?.filter((occ) => HOME_OCCASIONS.includes(occ.title)) ?? [];
  } catch {
    hasError = true;
  }

  return (
    <section className="w-full mt-16">
      <div className="flex justify-between items-end pb-10">
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
          {visibleOccasions.map((occ) => (
            <Link
              key={occ.id}
              href={`/?occasionId=${occ.id}`}
              scroll={false}
              className={`text-sm md:text-base font-medium transition-all whitespace-nowrap ${
                occasionId === occ.id ? 'text-text-primary' : 'text-text-soft hover:text-text-plain'
              }`}
            >
              {occ.title}
            </Link>
          ))}
        </div>
      </div>
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {' '}
        {hasError ? (
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

export const MostPopularSection = ({ occasionId }: MostPopularSectionProps) => {
  return (
    <Suspense fallback={<MostPopularSectionLoading />}>
      <MostPopularSectionContent occasionId={occasionId} />
    </Suspense>
  );
};
