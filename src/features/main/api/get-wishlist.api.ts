import { getAuthToken } from '../lib/get-auth-token';
import { GetWishlistResponse } from '../types/wishlist';
export async function getWishlist(): Promise<GetWishlistResponse> {
  const token = await getAuthToken();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlist`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch wishlist');
  }
  const payload = await response.json();
  return payload;
}
