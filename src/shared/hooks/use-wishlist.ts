'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { wishlistApi } from '../api/wishlist.api';

export const useWishlist = (productId?: string) => {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();

  const token = session?.token;

  const wishlistQuery = useQuery({
    queryKey: ['wishlist'],
    queryFn: () => wishlistApi.getWishlist(token!),
    enabled: !!token && status === 'authenticated',
  });

  const payload = wishlistQuery.data?.payload;

  const wishlistItems = (
    Array.isArray(payload) ? payload : (payload?.wishlistItems ?? payload?.items ?? [])
  ) as WishlistItem[];

  const existingItem = wishlistItems.find((item: WishlistItem) => {
    const idInWishlist = item.product?.id ?? item.productId ?? item.id;

    return String(idInWishlist) === String(productId);
  });

  const isInWishlist = !!existingItem;

  const toggleWishlistMutation = useMutation({
    mutationFn: async () => {
      if (!productId) {
        throw new Error('Product id is required');
      }

      if (isInWishlist && existingItem) {
        return wishlistApi.removeFromWishlist(existingItem.id, token!);
      }

      return wishlistApi.addToWishlist(productId, token!);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['wishlist'],
      });
    },
  });

  return {
    wishlistItems,
    wishlistCount: wishlistItems.length,
    isInWishlist,
    toggleWishlist: toggleWishlistMutation.mutate,
    isPending: toggleWishlistMutation.isPending,
    isLoading: wishlistQuery.isLoading,
    isError: wishlistQuery.isError,
    refetch: wishlistQuery.refetch,
  };
};
