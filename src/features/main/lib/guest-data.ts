'use client';

import { QueryClient } from '@tanstack/react-query';

import { clearLocalCart, clearLocalWishlist, getLocalCart, getLocalWishlist } from './storage';

let syncPromise: Promise<void> | null = null;

async function uploadCartItems(token: string, items: ReturnType<typeof getLocalCart>) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    throw new Error('API URL is not configured');
  }

  for (const item of items) {
    const response = await fetch(`${baseUrl}/cart`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        productId: item.productId,
        quantity: item.quantity ?? 1,
      }),
    });

    if (!response.ok && response.status !== 409) {
      throw new Error('Failed to sync cart items');
    }
  }
}

async function uploadWishlistItems(token: string, items: ReturnType<typeof getLocalWishlist>) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    throw new Error('API URL is not configured');
  }

  for (const item of items) {
    const response = await fetch(`${baseUrl}/wishlist`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        productId: item.productId,
      }),
    });

    if (!response.ok && response.status !== 409) {
      throw new Error('Failed to sync wishlist items');
    }
  }
}

export async function syncGuestDataToServer(token: string | undefined, queryClient: QueryClient) {
  if (!token) return;

  if (syncPromise) {
    return syncPromise;
  }

  syncPromise = (async () => {
    const localCartItems = getLocalCart();
    const localWishlistItems = getLocalWishlist();

    if (localCartItems.length === 0 && localWishlistItems.length === 0) {
      return;
    }

    try {
      await uploadCartItems(token, localCartItems);
      await uploadWishlistItems(token, localWishlistItems);

      clearLocalCart();
      clearLocalWishlist();

      await queryClient.invalidateQueries({ queryKey: ['cart'] });
      await queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    } catch {
      return;
    }
  })();

  try {
    await syncPromise;
  } finally {
    syncPromise = null;
  }
}
