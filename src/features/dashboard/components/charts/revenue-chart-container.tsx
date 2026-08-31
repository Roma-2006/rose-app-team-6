'use client';

import { useState, useTransition } from 'react';
import { RevenueChart } from './revenue-chart';
import { getAdminStatistics, type RevenuePeriod } from '../../apis/statistics.api';

type RevenuePoint = {
  period: string;
  label: string;
  revenue: number;
};

type Props = {
  initialData: RevenuePoint[];
};

export function RevenueChartContainer({ initialData }: Props) {
  const [period, setPeriod] = useState<RevenuePeriod>('monthly');
  const [data, setData] = useState<RevenuePoint[]>(initialData);
  const [isPending, startTransition] = useTransition();

  const handlePeriodChange = (newPeriod: RevenuePeriod) => {
    setPeriod(newPeriod);

    startTransition(async () => {
      try {
        const statistics = await getAdminStatistics({
          revenuePeriod: newPeriod,
        });

        setData(statistics.revenue.points);
      } catch (error) {
        console.error('Failed to fetch statistics:', error);
      }
    });
  };

  return (
    <RevenueChart
      data={data}
      period={period}
      onPeriodChange={handlePeriodChange}
      isPending={isPending}
    />
  );
}
