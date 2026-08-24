import { AdminStatisticsResponse } from './types/statistics';

export interface GetAdminStatisticsParams {
  lowStockThreshold?: number;
  topProductsLimit?: number;
  lowStockLimit?: number;
}

export async function getAdminStatistics(
  token: string,
  params: GetAdminStatisticsParams = {}
): Promise<AdminStatisticsResponse['payload']> {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/admin/statistics`);

  url.searchParams.set('lowStockThreshold', String(params.lowStockThreshold ?? 20));
  url.searchParams.set('topProductsLimit', String(params.topProductsLimit ?? 5));
  url.searchParams.set('lowStockLimit', String(params.lowStockLimit ?? 20));

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  const result: AdminStatisticsResponse = await response.json();

  if (!response.ok || !result.status || !result.payload) {
    throw new Error(result.message || 'Failed to fetch admin statistics');
  }

  return result.payload;
}
