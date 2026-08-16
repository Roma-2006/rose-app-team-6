import { Order, OrdersApiResponse, OrdersMetadata } from '../types/order';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;

export async function getOrders(
  token: string,
  page: number = DEFAULT_PAGE,
  limit: number = DEFAULT_LIMIT
): Promise<OrdersApiResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders?page=${page}&limit=${limit}`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    }
  );

  const result: OrdersApiResponse = await response.json();

  if (!response.ok || !result.status) {
    throw new Error(result.message || 'Failed to fetch orders');
  }

  return result;
}

export async function getAllOrders(
  token: string,
  limit: number = DEFAULT_LIMIT
): Promise<{ data: Order[]; metadata: OrdersMetadata }> {
  const firstPage = await getOrders(token, 1, limit);

  const allOrders = [...firstPage.payload.data];
  const { totalPages } = firstPage.payload.metadata;

  if (totalPages > 1) {
    const remainingPages = await Promise.all(
      Array.from({ length: totalPages - 1 }, (_, index) => getOrders(token, index + 2, limit))
    );

    remainingPages.forEach((pageResponse) => {
      allOrders.push(...pageResponse.payload.data);
    });
  }

  return {
    data: allOrders,
    metadata: firstPage.payload.metadata,
  };
}
