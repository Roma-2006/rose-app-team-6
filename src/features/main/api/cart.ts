import { GetCartResponse } from '../types/server-cart';

/**
 * Client-safe read for the authenticated cart. The bearer token is supplied
 * by the caller (client session for React Query, server session for initial
 * page data), so this stays a plain fetch instead of a Server Action.
 */
export async function getCart(token: string): Promise<GetCartResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Failed to fetch cart: ${response.status} ${errorBody}`);
  }

  return response.json();
}
