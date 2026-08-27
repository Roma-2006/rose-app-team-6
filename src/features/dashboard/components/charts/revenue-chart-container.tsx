'use client';

import { useState, useTransition } from 'react';
import { getStatistics } from '../../api/statistics';
import { RevenueChart } from './revenue-chart';

type RevenuePoint = {
  period: string;
  label: string;
  revenue: number;
};

type Props = {
  initialData: RevenuePoint[];
};

export function RevenueChartContainer({ initialData }: Props) {
  const [period, setPeriod] = useState<'monthly' | 'week'>('monthly');
  const [data, setData] = useState(initialData);
  const [isPending, startTransition] = useTransition();

  const handlePeriodChange = (newPeriod: 'monthly' | 'week') => {
    setPeriod(newPeriod);

    startTransition(async () => {
      const statistics = await getStatistics(newPeriod);

      setData(statistics.payload.revenue.points);
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
