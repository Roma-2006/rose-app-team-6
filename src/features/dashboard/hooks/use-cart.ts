'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useState, useEffect, useCallback } from 'react';

import { getCartAction, addToCartAction, updateCartQuantityAction } from '../apis/cart.api';
import { getLocalCart, addToLocalCart, CART_STORAGE_EVENT } from '../lib/storage';
import { LocalCartItem } from '../types/local-cart';

export const useCart = () => {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const isAuthenticated = status === 'authenticated';
  const token = session?.token;

  const [localItems, setLocalItems] = useState<LocalCartItem[]>(() => getLocalCart());
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
    mutationFn: async ({ productId, quantity = 1 }: { productId: string; quantity?: number }) => {
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
        // localStorage (guest)
        const updated = addToLocalCart(productId, quantity);
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
