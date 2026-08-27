'use client';

import { Pie, PieChart, Cell } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/shared/components/ui/chart';

import { DashboardTitle } from '../../shared/dashboard-title';
import { useTranslations } from 'next-intl';

const chartConfig = {
  completed: {
    label: 'Completed',
    color: '#10b981',
  },
  inProgress: {
    label: 'In progress',
    color: '#2563eb',
  },
  canceled: {
    label: 'Canceled',
    color: '#ef4444',
  },
} satisfies ChartConfig;

type PieLabelProps = {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
};

type OrderStatus = {
  completed: { count: number; percent: number };
  inProgress: { count: number; percent: number };
  canceled: { count: number; percent: number };
  totalOrders: number;
};

type OrdersStatusChartProps = {
  data: OrderStatus;
};

export function OrdersStatusChart({ data }: OrdersStatusChartProps) {
  const t = useTranslations('dashboard.dashboard-title');

  const chartData = [
    {
      status: 'completed',
      label: 'Completed',
      value: data.completed.count,
      percent: data.completed.percent,
      fill: chartConfig.completed.color,
    },
    {
      status: 'inProgress',
      label: 'In progress',
      value: data.inProgress.count,
      percent: data.inProgress.percent,
      fill: chartConfig.inProgress.color,
    },
    {
      status: 'canceled',
      label: 'Canceled',
      value: data.canceled.count,
      percent: data.canceled.percent,
      fill: chartConfig.canceled.color,
    },
  ];

  const renderCustomizedLabel = ({
    cx = 0,
    cy = 0,
    midAngle = 0,
    innerRadius = 0,
    outerRadius = 0,
    percent = 0,
  }: PieLabelProps) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 1;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <g>
        <circle
          cx={x}
          cy={y}
          r={16}
          fill="#ffffff"
          filter="drop-shadow(0px 4px 4px rgba(0,0,0,0.1))"
        />
        <text
          x={x}
          y={y}
          fill="#1f2937"
          textAnchor="middle"
          dominantBaseline="central"
          className="text-[11px] font-bold"
        >
          {`${percent}%`}
        </text>
      </g>
    );
  };

  return (
    <div className="w-full rounded-2xl  p-6 ">
      {/* Title Header */}
      <div className="mb-6 text-start lg:text-center">
        <DashboardTitle title={t('ordersStatus')} />
      </div>

      <div className="flex flex-row items-center justify-between gap-4 lg:flex-col lg:items-stretch">
        {/* Chart Container */}
        <div className="w-1/2 flex-shrink-0 lg:w-full lg:max-w-[220px] lg:mx-auto">
          <ChartContainer config={chartConfig} className="mx-auto aspect-square min-h-[170px]">
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
                    percent: chartData[props.index].percent,
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
        <div className="flex w-1/2 flex-col justify-center gap-3  lg:w-full">
          {chartData.map((item) => (
            <div key={item.status} className="flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full " style={{ backgroundColor: item.fill }} />
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
