'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useState, useEffect, useCallback } from 'react';

import { getCartAction, addToCartAction, updateCartQuantityAction } from '../apis/cart.api';
import { getLocalCart, addToLocalCart, CART_STORAGE_EVENT } from '../lib/storage';
import type { LocalCartItem, LocalCartProduct } from '../types/local-cart';

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

  const cartQuery = useQuery({
    queryKey: ['cart'],
    queryFn: () => getCartAction(),
    enabled: isAuthenticated && !!token,
  });

  const serverItems = cartQuery.data?.payload.cartItems ?? [];

  const cartItems = isAuthenticated ? serverItems : localItems;

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
      if (!productId) {
        throw new Error('Product id is required');
      }

      if (isAuthenticated) {
        const existingItem = cartItems.find((item) => item.productId === productId);

        if (existingItem) {
          return updateCartQuantityAction(existingItem.id, existingItem.quantity + quantity);
        }

        return addToCartAction(productId, quantity);
      } else {
        const updated = addToLocalCart(productId, quantity, product);
        setLocalItems([...updated]);
        return Promise.resolve({ success: true });
      }
    },

    onSuccess: async () => {
      if (isAuthenticated) {
        await queryClient.invalidateQueries({ queryKey: ['cart'] });
      }
    },
  });

  const isInCart = useCallback(
    (id: string) => cartItems.some((item) => item.productId === id),
    [cartItems]
  );

  return {
    cartItems,
    uniqueItemsCount: cartItems.length,
    addToCart: addToCartMutation.mutate,
    isAdding: addToCartMutation.isPending,
    isInCart,
  };
};
