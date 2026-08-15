import { Order, OrdersApiResponse, OrdersMetadata } from '../types/order';

export async function getOrders(token: string): Promise<OrdersApiResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders?page=1&limit=20`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  const result: OrdersApiResponse = await response.json();

  if (!response.ok || !result.status) {
    throw new Error(result.message || 'Failed to fetch orders');
  }

  return result;
}
