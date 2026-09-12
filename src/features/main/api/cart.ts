import { GetCartResponse } from '../types/server-cart';

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

  const data = await response.json();

  return data.payload.cartItems;
}
