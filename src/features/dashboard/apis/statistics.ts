'use server';

import { getAuthToken } from '@/features/main/lib/get-auth-token';

export type RevenuePeriod = 'monthly' | 'week';

export async function getStatistics(
  revenuePeriod: RevenuePeriod = 'monthly'
): Promise<StatisticsResponse> {
  const token = await getAuthToken();

  const params = new URLSearchParams({
    revenuePeriod,
    lowStockThreshold: '20',
    topProductsLimit: '5',
    lowStockLimit: '20',
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/statistics?${params.toString()}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch statistics');
  }

  return response.json();
}
