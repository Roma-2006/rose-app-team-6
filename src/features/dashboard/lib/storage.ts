'use client';

import type { LocalCartItem, LocalCartProduct } from '../types/local-cart';
import type { LocalWishlistItem, LocalWishlistProduct } from '../types/local-wishlist';

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

export const addToLocalCart = (
  productId: string,
  quantity: number,
  product?: LocalCartProduct
): LocalCartItem[] => {
  const items = getLocalCart();
  const existingIndex = items.findIndex((item) => item.productId === productId);

  const productSnapshot: LocalCartProduct = {
    id: product?.id ?? productId,
    title: product?.title ?? '',
    cover: product?.cover ?? '',
    price: product?.price ?? '0',
    discountType: product?.discountType ?? null,
    discountValue: product?.discountValue ?? '0',
    rating: product?.rating ?? 0,
    ratings: product?.ratings ?? 0,
    stock: product?.stock ?? 0,
  };

  if (existingIndex >= 0) {
    items[existingIndex] = {
      ...items[existingIndex],
      quantity: items[existingIndex].quantity + quantity,
      product: productSnapshot,
    };
  } else {
    items.push({
      id: crypto.randomUUID(),
      productId,
      quantity,
      product: productSnapshot,
    });
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

export const clearLocalCart = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new Event(CART_STORAGE_EVENT));
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

export const addToLocalWishlist = (
  productId: string,
  product?: LocalWishlistProduct
): LocalWishlistItem[] => {
  const items = getLocalWishlist();
  const existingIndex = items.findIndex(
    (item) => item.productId === productId || item.product.id === productId
  );

  const productSnapshot: LocalWishlistProduct = {
    id: product?.id ?? productId,
    title: product?.title ?? '',
    cover: product?.cover ?? '',
    price: product?.price ?? '0',
    discountType: product?.discountType ?? null,
    discountValue: product?.discountValue ?? '0',
    rating: product?.rating ?? 0,
    ratings: product?.ratings ?? 0,
    stock: product?.stock ?? 0,
  };

  if (existingIndex >= 0) {
    items[existingIndex] = {
      ...items[existingIndex],
      product: productSnapshot,
    };
  } else {
    items.push({
      id: crypto.randomUUID(),
      productId,
      product: productSnapshot,
    });
  }

  setLocalWishlist(items);
  return items;
};

export const removeFromLocalWishlist = (itemId: string): LocalWishlistItem[] => {
  const items = getLocalWishlist().filter((item) => item.id !== itemId);
  setLocalWishlist(items);
  return items;
};

export const clearLocalWishlist = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(WISHLIST_KEY);
  window.dispatchEvent(new Event(WISHLIST_STORAGE_EVENT));
};

export const isInLocalWishlist = (productId: string): boolean => {
  const items = getLocalWishlist();
  return items.some((item) => item.productId === productId || item.product.id === productId);
};
