'use client';

import { LocalCartItem } from '../types/local-cart';

const CART_KEY = 'rose_cart';
const WISHLIST_KEY = 'rose_wishlist';

export const CART_STORAGE_EVENT = 'rose_cart_updated';
export const WISHLIST_STORAGE_EVENT = 'rose_wishlist_updated';

export const getLocalCart = (): LocalCartItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as LocalCartItem[]) : [];
  } catch {
    return [];
  }
};

export const setLocalCart = (items: LocalCartItem[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_STORAGE_EVENT));
};

export const addToLocalCart = (productId: string, quantity: number): LocalCartItem[] => {
  const items = getLocalCart();
  const existingIndex = items.findIndex((item) => item.productId === productId);

  if (existingIndex >= 0) {
    items[existingIndex] = {
      ...items[existingIndex],
      quantity: items[existingIndex].quantity + quantity,
    };
  } else {
    const newItem: LocalCartItem = {
      id: crypto.randomUUID(),
      productId,
      quantity,
      product: { id: productId },
    };

    items.push(newItem);
  }
  setLocalCart(items);
  return items;
};
export const updateLocalCartQuantity = (itemId: string, quantity: number): LocalCartItem[] => {
  const items = getLocalCart();
  const index = items.findIndex((item) => item.id === itemId);

  if (index >= 0) {
    items[index] = { ...items[index], quantity };
    setLocalCart(items);
  }

  return items;
};

export const removeFromLocalCart = (itemId: string): LocalCartItem[] => {
  const items = getLocalCart().filter((item) => item.id !== itemId);
  setLocalCart(items);
  return items;
};

export const getLocalWishlist = (): LocalWishlistItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    return raw ? (JSON.parse(raw) as LocalWishlistItem[]) : [];
  } catch {
    return [];
  }
};

export const setLocalWishlist = (items: LocalWishlistItem[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(WISHLIST_STORAGE_EVENT));
};
export const addToLocalWishlist = (productId: string): LocalWishlistItem[] => {
  const items = getLocalWishlist();

  const exists = items.some(
    (item) => item.productId === productId || item.product.id === productId
  );

  if (!exists) {
    const newItem: LocalWishlistItem = {
      id: crypto.randomUUID(),
      productId,
      product: { id: productId },
    };

    items.push(newItem);
    setLocalWishlist(items);
  }

  return items;
};

export const removeFromLocalWishlist = (itemId: string): LocalWishlistItem[] => {
  const items = getLocalWishlist().filter((item) => item.id !== itemId);
  setLocalWishlist(items);
  return items;
};

export const isInLocalWishlist = (productId: string): boolean => {
  const items = getLocalWishlist();
  return items.some((item) => item.productId === productId || item.product.id === productId);
};
