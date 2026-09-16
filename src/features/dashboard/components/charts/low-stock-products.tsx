import { useTranslations } from 'next-intl';

import { formatNumber } from '../../utils/formatters';
import { AdminStatisticsLowStockProduct } from '../../types/statistics';

export function LowStockProducts({ products }: { products: AdminStatisticsLowStockProduct[] }) {
  // Translation
  const t = useTranslations('dashboard.statistics.low-stock');
  return (
    <div className="overflow-hidden rounded-xl bg-bg-plain shadow-xs">
      <div className=" px-5 py-4">
        <h2 className="text-2xl font-semibold text-text-plain">{t('title')}</h2>
      </div>

      {products.length === 0 ? (
        <p className="px-5 py-6 text-center text-xs text-text-muted">{t('empty')}</p>
      ) : (
        <div className="max-h-80 overflow-y-auto md:max-h-56">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`mx-5 flex items-center justify-between py-3 ${
                index !== products.length - 1 ? 'border-b border-border-muted' : ''
              }`}
            >
              <span className="truncate text-base font-normal text-text-plain">
                {product.title}
              </span>
              <span
                className={`text-sm font-medium ${
                  product.stock < 5 ? 'text-text-danger' : 'text-text-plain'
                }`}
              >
                {formatNumber(product.stock)} {t('units')}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
