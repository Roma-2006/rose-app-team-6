'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useState, useEffect, useCallback } from 'react';

import {
  getLocalCart,
  addToLocalCart,
  updateLocalCartQuantity,
  removeFromLocalCart,
  clearLocalCart,
  CART_STORAGE_EVENT,
} from '../lib/storage';
import type { LocalCartItem, LocalCartProduct } from '../types/local-cart';
import {
  addToCartAction,
  getCartAction,
  updateCartQuantityAction,
  removeFromCartAction,
  clearCartAction,
} from '../api/cart.api';

export interface ServerCartCategory {
  id: string;
  categoryId?: string;
}

export interface ServerCartProduct {
  id: string;
  category?: ServerCartCategory;
  categoryId?: string;
  cover?: string;
  createdAt?: string;
  deletedAt?: string | null;
  description?: string;
  discountType?: string;
  discountValue?: string;
  gallery?: string;
  immutable?: boolean;
  price: string;
  rating?: number;
  ratings?: number;
  stock?: number;
  subCategory?: ServerCartCategory;
  subCategoryId?: string;
  title: string;
  updatedAt?: string;
}

export interface ServerCartItem {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
  productId: string;
  quantity: number;
  product: ServerCartProduct;
}

// The API returns a plain array of cart items. Some earlier/other
// endpoints in this codebase wrap results in a `payload` envelope, so we
// stay defensive and support that shape too.
interface ServerCartPayload {
  cartItems?: ServerCartItem[];
  products?: ServerCartItem[];
}

type GetCartResponse =
  | ServerCartItem[]
  | {
      payload?: ServerCartPayload;
      cartItems?: ServerCartItem[];
    };

// Items returned to consumers of this hook are either the server shape
// (when authenticated) or the local/guest shape (when a guest).
export type CartItem = ServerCartItem | LocalCartItem;

export const useCart = () => {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const isAuthenticated = status === 'authenticated';
  const token = session?.token;

  const [localItems, setLocalItems] = useState<LocalCartItem[]>(() =>
    typeof window !== 'undefined' ? getLocalCart() : []
  );

  useEffect(() => {
    if (!isAuthenticated) {
      const handleGuestCartChange = () => setLocalItems(getLocalCart());
      window.addEventListener(CART_STORAGE_EVENT, handleGuestCartChange);

      return () => {
        window.removeEventListener(CART_STORAGE_EVENT, handleGuestCartChange);
      };
    }
    return undefined;
  }, [isAuthenticated]);

  const cartQuery = useQuery<GetCartResponse>({
    queryKey: ['cart'],
    queryFn: () => getCartAction(),
    enabled: isAuthenticated && !!token,
  });

  const serverItems: ServerCartItem[] = Array.isArray(cartQuery.data)
    ? cartQuery.data
    : cartQuery.data?.payload?.cartItems ||
      cartQuery.data?.payload?.products ||
      cartQuery.data?.cartItems ||
      [];

  const isGuest = !isAuthenticated;
  const cartItems: CartItem[] = isGuest ? localItems : serverItems;

  const getItemId = (item: CartItem): string | undefined =>
    (item as ServerCartItem).productId ??
    (item as ServerCartItem).product?.id ??
    (item as LocalCartItem).productId;

  const addToCartMutation = useMutation({
    mutationFn: async ({
      productId,
      quantity = 1,
      product,
    }: {
      productId: string;
      quantity?: number;
      product?: LocalCartProduct;
    }) => {
      if (!productId) throw new Error('Product id is required');

      if (isGuest) {
        const updated = addToLocalCart(productId, quantity, product);
        setLocalItems([...updated]);
        return { success: true };
      }

      const existingItem = (serverItems as ServerCartItem[]).find(
        (item) => getItemId(item) === productId
      );

      if (existingItem) {
        return updateCartQuantityAction(existingItem.id, existingItem.quantity + quantity);
      }

      return addToCartAction(productId, quantity);
    },
    onSuccess: async () => {
      if (!isGuest) {
        await queryClient.invalidateQueries({ queryKey: ['cart'] });
      }
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ id, newQuantity }: { id: string; newQuantity: number }) => {
      if (isGuest) {
        const updated = updateLocalCartQuantity(id, newQuantity);
        setLocalItems([...updated]);
        return { success: true };
      }
      return updateCartQuantityAction(id, newQuantity);
    },
    onSuccess: async () => {
      if (!isGuest) {
        await queryClient.invalidateQueries({ queryKey: ['cart'] });
      }
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (id: string) => {
      if (isGuest) {
        const updated = removeFromLocalCart(id);
        setLocalItems([...updated]);
        return { success: true };
      }
      return removeFromCartAction(id);
    },
    onSuccess: async () => {
      if (!isGuest) {
        await queryClient.invalidateQueries({ queryKey: ['cart'] });
      }
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      if (isGuest) {
        clearLocalCart();
        setLocalItems([]);
        return { success: true };
      }
      return clearCartAction();
    },
    onSuccess: async () => {
      if (!isGuest) {
        await queryClient.invalidateQueries({ queryKey: ['cart'] });
      }
    },
  });

  const isInCart = useCallback(
    (id: string) => cartItems.some((item) => getItemId(item) === id),
    [cartItems]
  );

  return {
    cartItems,
    uniqueItemsCount: cartItems.length,
    isLoading: cartQuery.isLoading && isAuthenticated,
    addToCart: addToCartMutation.mutate,
    isAdding: addToCartMutation.isPending,
    updateQuantity: (id: string, newQuantity: number) =>
      updateQuantityMutation.mutate({ id, newQuantity }),
    removeFromCart: removeFromCartMutation.mutate,
    clearCart: clearCartMutation.mutate,
    isInCart,
  };
};
