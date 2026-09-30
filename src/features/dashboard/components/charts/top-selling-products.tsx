import { useTranslations } from 'next-intl';

import { AdminStatisticsTopProduct } from '@/features/main/types/statistics';
import { formatNumber } from '../../utils/formatters';

const rankBackgrounds = ['bg-amber-50', 'bg-bg-soft', 'bg-amber-800/25'];

export function TopSellingProducts({ products }: { products: AdminStatisticsTopProduct[] }) {
  // Translation
  const t = useTranslations('dashboard.statistics.top-selling');
  return (
    <div className="overflow-hidden rounded-xl  bg-bg-plain shadow-xs">
      <div className=" px-5 py-4">
        <h2 className="text-2xl font-semibold text-text-plain">{t('title')}</h2>
      </div>

      {products.length === 0 ? (
        <p className="px-5 py-6 text-center text-xs text-text-muted">{t('empty')}</p>
      ) : (
        <div className="space-y-2 p-3">
          {products.map((product, index) => (
            <div
              key={product.productId}
              className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 ${
                rankBackgrounds[index] ?? 'bg-bg-muted'
              }`}
            >
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <span className="truncate text-base font-semibold text-text-plain">
                  {product.title}
                </span>

                <span className="shrink-0 text-xs font-normal tracking-normal text-text-plain">
                  ({formatNumber(product.unitPrice)} {t('currency')})
                </span>
              </div>

              <span className="shrink-0 text-sm font-medium  tracking-normal text-text-plain">
                {formatNumber(product.totalSales)} {t('units')}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
