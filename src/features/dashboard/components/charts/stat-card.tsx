import {
  CircleDollarSign,
  ClipboardList,
  Package,
  ReceiptText,
  type LucideIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

type StatKey = 'products' | 'orders' | 'categories' | 'revenue';

const STAT_CARDS: {
  key: StatKey;
  label: string;
  icon: LucideIcon;
  cardBg: string;

  color: string;
}[] = [
  {
    key: 'products',
    label: 'Total products',
    icon: Package,
    cardBg: 'bg-bg-primary-fade',

    color: 'text-text-primary',
  },
  {
    key: 'orders',
    label: 'Total orders',
    icon: ReceiptText,
    cardBg: 'bg-bg-info-fade',

    color: 'text-text-info',
  },
  {
    key: 'categories',
    label: 'Total categories',
    icon: ClipboardList,
    cardBg: 'bg-violet-50',

    color: 'text-violet-600',
  },
  {
    key: 'revenue',
    label: 'Total revenue',
    icon: CircleDollarSign,
    cardBg: 'bg-bg-success-fade',

    color: 'text-text-success',
  },
];

function StatCard({
  label,
  value,
  icon: Icon,
  cardBg,

  color,
}: (typeof STAT_CARDS)[number] & { value: string }) {
  return (
    <div className={`flex flex-col gap-2 rounded-xl p-3 shadow-sm sm:p-4 ${cardBg}`}>
      <Icon className={`size-7 sm:size-9 ${color}`} strokeWidth={1.8} />

      <div>
        <div className={`text-xl font-semibold sm:text-2xl ${color}`}>{value}</div>
        <div className="mt-0.5 text-sm font-medium text-text-plain sm:text-base">{label}</div>
      </div>
    </div>
  );
}

type StatsGridProps = {
  values: Record<StatKey, string>;
};

export function StatsGrid({ values }: StatsGridProps) {
  // Translation
  const t = useTranslations('dashboard.statistics.stats');
  return (
    <div className="h-full lg:rounded-2xl lg:bg-bg-plain lg:p-6 lg:shadow-xs">
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {STAT_CARDS.map(({ key, ...card }) => (
          <StatCard key={key} {...card} label={t(key)} value={values[key]} />
        ))}
      </div>
    </div>
  );
}
