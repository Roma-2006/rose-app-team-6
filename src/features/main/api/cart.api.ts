'use server';

import { getAuthToken } from '../lib/get-auth-token';

async function getHeaders() {
  const token = await getAuthToken();
  return {
    'Content-Type': 'application/json',
    accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function addToCartAction(productId: string, quantity: number = 1) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
    method: 'POST',
    headers: await getHeaders(),
    body: JSON.stringify({ productId, quantity }),
  });

  if (!response.ok) throw new Error('Failed to add product');
  return response.json();
}

export async function updateCartQuantityAction(itemId: string, quantity: number) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${itemId}`, {
    method: 'PATCH',
    headers: await getHeaders(),
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) throw new Error('Failed to update quantity');
  return response.json();
}

export async function removeFromCartAction(itemId: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${itemId}`, {
    method: 'DELETE',
    headers: await getHeaders(),
  });

  if (!response.ok) throw new Error('Failed to remove item');
  return response.json();
}

export async function clearCartAction() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
    method: 'DELETE',
    headers: await getHeaders(),
  });

  if (!response.ok) throw new Error('Failed to clear cart');
  return response.json();
}
