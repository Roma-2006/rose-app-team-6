import 'server-only';

import { getAuthToken } from '@/features/main/lib/get-auth-token';
import { AdminStatisticsResponse } from '../types/statistics';

export type RevenuePeriod = 'monthly' | 'week';

export interface GetAdminStatisticsParams {
  revenuePeriod?: RevenuePeriod;
  lowStockThreshold?: number;
  topProductsLimit?: number;
  lowStockLimit?: number;
}

export async function getAdminStatistics(
  params: GetAdminStatisticsParams = {}
): Promise<AdminStatisticsResponse['payload']> {
  const token = await getAuthToken();

  if (!token) {
    throw new Error('Authentication required');
  }

  const searchParams = new URLSearchParams({
    revenuePeriod: params.revenuePeriod ?? 'monthly',
    lowStockThreshold: String(params.lowStockThreshold ?? 20),
    topProductsLimit: String(params.topProductsLimit ?? 5),
    lowStockLimit: String(params.lowStockLimit ?? 20),
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/statistics?${searchParams.toString()}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      cache: 'no-store',
    }
  );

  const result: AdminStatisticsResponse = await response.json();

  if (!response.ok || !result.status || !result.payload) {
    throw new Error(result.message || 'Failed to fetch admin statistics');
  }

  return result.payload;
}
