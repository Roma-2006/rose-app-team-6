'use server';

import { getAuthToken } from '../lib/get-auth-token';

export async function addToWishlistAction(productId: string) {
  const token = await getAuthToken();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlist`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      productId,
    }),
  });

  if (response.status === 409) {
    throw new Error('Product already exists in wishlist');
  }

  if (!response.ok) {
    throw new Error('Failed to add product to wishlist');
  }

  return response.json();
}

export async function removeFromWishlistAction(itemId: string) {
  const token = await getAuthToken();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlist/${itemId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to remove product from wishlist');
  }

  return response.json();
}

//ClearWishlist
export async function clearWishlist() {
  const token = await getAuthToken();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlist`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to remove product from wishlist');
  }

  return response.json();
}
