'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { cartApi } from '../api/cart.api';

export const useCart = () => {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();

  const token = session?.token;

  const cartQuery = useQuery({
    queryKey: ['cart'],
    queryFn: () => cartApi.getCart(token!),
    enabled: !!token && status === 'authenticated',
  });

  const cartItems = (cartQuery.data?.payload?.cartItems ?? []) as CartItem[];

  const addToCartMutation = useMutation({
    mutationFn: async ({ productId, quantity = 1 }: { productId: string; quantity?: number }) => {
      if (!productId) {
        throw new Error('Product id is required');
      }

      const existingItem = cartItems.find(
        (item: CartItem) => item.productId === productId || item.product?.id === productId
      );

      if (existingItem) {
        return cartApi.updateCartQuantity(
          existingItem.id,
          existingItem.quantity + quantity,
          token!
        );
      }

      return cartApi.addToCart(productId, quantity, token!);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['cart'],
      });
    },
  });

  return {
    cartItems,
    uniqueItemsCount: cartItems.length,
    addToCart: addToCartMutation.mutate,
    isAdding: addToCartMutation.isPending,
    isInCart: (id: string) =>
      cartItems.some((item: CartItem) => item.productId === id || item.product?.id === id),
  };
};
