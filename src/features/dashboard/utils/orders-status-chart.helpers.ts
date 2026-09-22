import { type ChartConfig } from '@/shared/components/ui/chart';

// Types
export type OrderStatus = {
  completed: { count: number; percent: number };
  inProgress: { count: number; percent: number };
  canceled: { count: number; percent: number };
  totalOrders: number;
};

export type OrdersStatusChartProps = {
  data: OrderStatus;
};

export type PieLabelProps = {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
};

// Constants
export const CHART_CONFIG = {
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

export const getChartData = (data: OrderStatus, t: (key: string) => string) => [
  {
    status: 'completed',
    label: t('completed'),
    value: data.completed.count,
    percent: data.completed.percent,
    fill: CHART_CONFIG.completed.color,
  },
  {
    status: 'inProgress',
    label: t('inProgress'),
    value: data.inProgress.count,
    percent: data.inProgress.percent,
    fill: CHART_CONFIG.inProgress.color,
  },
  {
    status: 'canceled',
    label: t('canceled'),
    value: data.canceled.count,
    percent: data.canceled.percent,
    fill: CHART_CONFIG.canceled.color,
  },
];
