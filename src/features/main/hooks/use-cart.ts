'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useSyncExternalStore, useCallback } from 'react';

import {
  getLocalCartSnapshot,
  addToLocalCart,
  updateLocalCartQuantity,
  removeFromLocalCart,
  clearLocalCart,
  CART_STORAGE_EVENT,
  getLocalCartServerSnapshot,
} from '../lib/storage';
import type { LocalCartItem, LocalCartProduct } from '../types/local-cart';
import { getCart } from '../api/cart';
import {
  addToCartAction,
  updateCartQuantityAction,
  removeFromCartAction,
  clearCartAction,
} from '../api/cart.api';
import type { ServerCartItem, GetCartResponse } from '../types/server-cart';

export type CartItem = ServerCartItem | LocalCartItem;

interface UseCartOptions {
  initialItems?: GetCartResponse;
}

export const useCart = ({ initialItems }: UseCartOptions = {}) => {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const isAuthenticated = status === 'authenticated';
  const token = session?.token;

  // Hydration-safe subscription to the guest cart: the server snapshot is an
  // empty array, and the client snapshot reads localStorage only after
  // hydration. No state is set synchronously in an effect.
  const subscribeToCartEvents = useCallback((onStoreChange: () => void) => {
    if (typeof window === 'undefined') return () => {};
    window.addEventListener(CART_STORAGE_EVENT, onStoreChange);
    return () => window.removeEventListener(CART_STORAGE_EVENT, onStoreChange);
  }, []);

  const localItems = useSyncExternalStore(
    subscribeToCartEvents,
    getLocalCartSnapshot,
    getLocalCartServerSnapshot
  );
  const cartQuery = useQuery<GetCartResponse>({
    queryKey: ['cart'],
    queryFn: () => getCart(token as string),
    enabled: isAuthenticated && !!token,
    initialData: initialItems,
  });

  const serverItems: ServerCartItem[] = cartQuery.data?.payload?.cartItems ?? [];

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
        addToLocalCart(productId, quantity, product);
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
        updateLocalCartQuantity(id, newQuantity);
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
        removeFromLocalCart(id);
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
