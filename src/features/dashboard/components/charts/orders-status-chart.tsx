'use client';

import { useTranslations } from 'next-intl';
import { Cell, Pie, PieChart } from 'recharts';

import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/shared/components/ui/chart';
import { DashboardTitle } from '../../shared/dashboard-title';
import {
  getChartData,
  OrdersStatusChartProps,
  CHART_CONFIG,
} from '../../utils/orders-status-chart.helpers';
import { renderCustomizedLabel } from './custom-pie-label';

export function OrdersStatusChart({ data }: OrdersStatusChartProps) {
  const t = useTranslations('dashboard.dashboard-chart-title');
  const chartData = getChartData(data, t);

  return (
    <div className="w-full rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
      {/* Title Header */}
      <div className="mb-6 text-start lg:text-center">
        <DashboardTitle title={t('ordersStatus')} />
      </div>

      <div className="flex flex-row items-center justify-between gap-4 lg:flex-col lg:items-stretch">
        {/* Chart Container */}
        <div className="w-1/2 flex-shrink-0 lg:w-full lg:max-w-74 lg:mx-auto">
          <ChartContainer config={CHART_CONFIG} className="mx-auto aspect-square min-h-43">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="status" hideLabel />} />

              <Pie
                data={chartData}
                dataKey="value"
                nameKey="status"
                innerRadius={45}
                outerRadius={85}
                strokeWidth={0}
                labelLine={false}
                label={(props) =>
                  renderCustomizedLabel({
                    ...props,
                    percent: chartData[props.index]?.percent ?? 0,
                  })
                }
              >
                {chartData.map((entry) => (
                  <Cell key={entry.status} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>

        {/* Legend List */}
        <div className="flex w-1/2 flex-col justify-center gap-3 lg:w-full">
          {chartData.map((item) => (
            <div key={item.status} className="flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.fill }} />
                <span className="font-semibold text-gray-700">{item.label}</span>
              </div>
              <div className="font-bold text-gray-900">
                {item.value} <span className="font-semibold text-gray-900">({item.percent}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
