import { useTranslations } from 'next-intl';
import type { AdminStatisticsCategory } from '../types/statistics';
import { formatNumber } from '../utils/formatters';

export function CategoriesList({ categories }: { categories: AdminStatisticsCategory[] }) {
  // Translation
  const t = useTranslations('dashboard.statistics.categories');
  return (
    <div className="overflow-hidden rounded-xl  bg-bg-plain shadow-xs h-full">
      <div className=" px-5 py-4">
        <h2 className="text-2xl font-semibold text-text-plain">{t('title')}</h2>
      </div>

      {categories.length === 0 ? (
        <p className="px-5 py-6 text-center text-xs text-text-muted">{t('empty')}</p>
      ) : (
        <div className="md:max-h-56 md:overflow-y-auto">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`mx-5 flex items-center justify-between py-3 ${
                index !== categories.length - 1 ? 'border-b border-border-muted' : ''
              }`}
            >
              <span className="text-base font-normaltext-text-plain">{category.title}</span>

              <span className="shrink-0 rounded-lg bg-bg-muted p-2 text-sm font-medium text-text-plain">
                {formatNumber(category.productCount)} {t('units')}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
