'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, type ChartConfig } from '@/shared/components/ui/chart';
import { useTranslations } from 'next-intl';
import { DashboardTitle } from '../../shared/dashboard-title';

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: '#a81c1c',
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

  return (
    <div className="w-full rounded-2xl bg-white p-6 border border-gray-100 shadow-sm">
      {/* Header: Title + Controls  */}

      <div className="mb-6 flex  items-center justify-between ">
        <DashboardTitle title={t('revenue')} />
        <div className="flex items-center gap-4 text-sm font-semibold">
          <button
            type="button"
            onClick={() => onPeriodChange('monthly')}
            disabled={isPending}
            className={period === 'monthly' ? 'text-[#a81c1c]' : 'text-gray-800'}
          >
            {t('monthly')}
          </button>

          <button
            type="button"
            onClick={() => onPeriodChange('week')}
            disabled={isPending}
            className={period === 'week' ? 'text-[#a81c1c]' : 'text-gray-800'}
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
              <stop offset="5%" stopColor="#a81c1c" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#a81c1c" stopOpacity={0.0} />
            </linearGradient>
          </defs>

          <CartesianGrid vertical={true} horizontal={false} stroke="#f0f0f0" />

          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            tick={{ fill: '#374151', fontSize: 12, fontWeight: 600 }}
          />

          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            tick={{ fill: '#374151', fontSize: 12, fontWeight: 600 }}
            domain={[0, 5000]}
            ticks={[0, 1000, 2000, 3000, 4000, 5000]}
          />

          {/* Tooltip  */}
          <ChartTooltip
            cursor={{ stroke: '#f0f0f0', strokeWidth: 1 }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="flex flex-col items-center">
                    <span className="mb-1 text-xs font-extrabold text-[#a81c1c]">
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
            type="linear"
            fill="url(#revenueGradient)"
            stroke="#a81c1c"
            strokeWidth={2}
            activeDot={{
              r: 6,
              fill: '#a81c1c',
              stroke: '#ffffff',
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
