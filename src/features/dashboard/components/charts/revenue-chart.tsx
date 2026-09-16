'use client';

import { Area, AreaChart, CartesianGrid, Label, ReferenceDot, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, type ChartConfig } from '@/shared/components/ui/chart';
import { useTranslations } from 'next-intl';
import { DashboardTitle } from '../../shared/dashboard-title';

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'var(--bg-primary-saturated)',
  },
} satisfies ChartConfig;

//TYPES

type RevenuePoint = {
  period: string;
  label: string;
  revenue: number;
};

type RevenueChartProps = {
  data: RevenuePoint[];
  period: 'monthly' | 'week';
  onPeriodChange: (period: 'monthly' | 'week') => void;
  isPending?: boolean;
};

export function RevenueChart({ data, period, onPeriodChange, isPending }: RevenueChartProps) {
  const t = useTranslations('dashboard.dashboard-chart-title');
  const maxRevenuePoint = data.reduce<RevenuePoint | null>((max, point) => {
    if (!max || point.revenue > max.revenue) {
      return point;
    }

    return max;
  }, null);

  return (
    <div className="w-full rounded-2xl bg-bg-plain p-6  shadow-sm">
      {/* Header: Title + Controls  */}

      <div className="mb-6 flex  items-center justify-between ">
        <DashboardTitle title={t('revenue')} />
        <div className="flex items-center gap-4 text-sm font-semibold">
          <button
            type="button"
            onClick={() => onPeriodChange('monthly')}
            disabled={isPending}
            className={period === 'monthly' ? 'text-text-primary' : 'text-text-plain'}
          >
            {t('monthly')}
          </button>

          <button
            type="button"
            onClick={() => onPeriodChange('week')}
            disabled={isPending}
            className={period === 'week' ? 'text-text-primary' : 'text-text-plain'}
          >
            {t('lastweek')}
          </button>
        </div>
      </div>

      {/* Chart Container  */}
      <ChartContainer config={chartConfig} className="h-85 w-full">
        <AreaChart
          accessibilityLayer
          data={data}
          margin={{
            top: 25,
            left: -10,
            right: 12,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--bg-primary-saturated)" stopOpacity={0.35} />
              <stop offset="95%" stopColor="var(--bg-primary-saturated)" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            vertical
            horizontal={false}
            stroke="var(--text-subtle)"
            strokeOpacity={0.5}
          />

          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            tick={{
              fill: 'var(--text-default)',
              fontSize: 12,
              fontWeight: 600,
            }}
          />

          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            tick={{
              fill: 'var(--text-default)',
              fontSize: 12,
              fontWeight: 600,
            }}
            domain={[0, 5000]}
            ticks={[0, 1000, 2000, 3000, 4000, 5000]}
          />
          {/* Tooltip  */}
          <ChartTooltip
            cursor={{ stroke: 'var(--bg-primary-saturated)', strokeWidth: 1 }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="flex flex-col items-center">
                    <span className="mb-1 text-xs font-extrabold text-text-primary">
                      {payload[0].value} {t('EGP')}
                    </span>
                  </div>
                );
              }
              return null;
            }}
          />

          <Area
            dataKey="revenue"
            type="monotone"
            fill="url(#revenueGradient)"
            stroke="var(--bg-primary-saturated)"
            strokeWidth={2}
            activeDot={{
              r: 6,
              fill: 'var(--bg-primary-saturated)',
              stroke: 'var(--bg-plain)',
              strokeWidth: 2,
            }}
          />

          {maxRevenuePoint && (
            <ReferenceDot
              x={maxRevenuePoint.label}
              y={maxRevenuePoint.revenue}
              r={6}
              fill="var(--bg-primary-saturated)"
              stroke="var(--bg-plain)"
              strokeWidth={3}
            >
              <Label
                value={`${maxRevenuePoint.revenue} ${t('EGP')}`}
                position="top"
                offset={10}
                fill="var(--text-primary)"
                fontSize={14}
                fontWeight={800}
              />
            </ReferenceDot>
          )}
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
