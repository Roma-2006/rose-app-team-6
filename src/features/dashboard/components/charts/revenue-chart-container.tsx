'use client';

import { useState, useTransition } from 'react';
import { RevenueChart } from './revenue-chart';
import type { RevenuePeriod } from '../../apis/statistics.api';

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
        const response = await fetch(`/api/admin/statistics?revenuePeriod=${newPeriod}`, {
          method: 'GET',
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch statistics');
        }

        const result = await response.json();

        setData(result.payload.revenue.points);
      } catch {
        // Handle request failure
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
