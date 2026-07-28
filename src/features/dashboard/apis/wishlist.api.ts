'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

async function getAuthToken(): Promise<string> {
  const session = await getServerSession(authOptions);

  if (!session?.token) {
    throw new Error('Authentication required');
  }

  return session.token;
}

export async function getWishlistAction(): Promise<GetWishlistResponse> {
  const token = await getAuthToken();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlist`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch wishlist');
  }

  return response.json();
}

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
