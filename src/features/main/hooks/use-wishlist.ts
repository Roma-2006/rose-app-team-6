'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from '@/i18n/navigation';
import {
  getLocalWishlist,
  addToLocalWishlist,
  removeFromLocalWishlist,
  isInLocalWishlist,
  WISHLIST_STORAGE_EVENT,
} from '../lib/storage';
import type { LocalWishlistItem, LocalWishlistProduct } from '../types/local-wishlist';
import {
  addToWishlistAction,
  getWishlistAction,
  removeFromWishlistAction,
  clearWishlist,
} from '../api/wishlist.api';

export const useWishlist = (productId?: string) => {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();
  const isAuthenticated = status === 'authenticated';
  const token = session?.token;

  const [localItems, setLocalItems] = useState<LocalWishlistItem[]>(() =>
    typeof window !== 'undefined' ? getLocalWishlist() : []
  );

  useEffect(() => {
    if (isAuthenticated) return;

    const handleGuestWishlistChange = () => {
      setLocalItems(getLocalWishlist());
    };

    window.addEventListener(WISHLIST_STORAGE_EVENT, handleGuestWishlistChange);

    return () => {
      window.removeEventListener(WISHLIST_STORAGE_EVENT, handleGuestWishlistChange);
    };
  }, [isAuthenticated]);

  const wishlistQuery = useQuery({
    queryKey: ['wishlist'],
    queryFn: () => getWishlistAction(),
    enabled: isAuthenticated && !!token,
  });

  const serverItems = wishlistQuery.data?.payload.wishlistItems ?? [];
  const shouldUseGuestData =
    !isAuthenticated ||
    wishlistQuery.isPending ||
    wishlistQuery.isLoading ||
    wishlistQuery.isFetching;

  const wishlistItems = shouldUseGuestData ? localItems : serverItems;

  const isInWishlist = shouldUseGuestData
    ? productId
      ? isInLocalWishlist(productId)
      : false
    : wishlistItems.some((item) => item.productId === productId);

  const existingItem = shouldUseGuestData
    ? productId
      ? (localItems.find((item) => item.productId === productId) ?? null)
      : null
    : wishlistItems.find((item) => item.productId === productId);

  const toggleWishlistMutation = useMutation({
    mutationFn: async ({ product }: { product?: LocalWishlistProduct } = {}) => {
      if (!productId) {
        throw new Error('Product id is required');
      }

      if (shouldUseGuestData) {
        if (isInWishlist && existingItem) {
          const updated = removeFromLocalWishlist(existingItem.id);
          setLocalItems([...updated]);
        } else {
          const updated = addToLocalWishlist(productId, product);
          setLocalItems([...updated]);
        }

        return Promise.resolve({ success: true });
      }

      if (isInWishlist && existingItem) {
        return removeFromWishlistAction(existingItem.id);
      }

      return addToWishlistAction(productId);
    },

    onSuccess: async () => {
      if (!shouldUseGuestData) {
        await queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      }
    },
  });
  // remove item from wishlist
  const removeItemFromWishlidstMutation = useMutation({
    mutationFn: (itemId: string) => removeFromWishlistAction(itemId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['wishlist'],
      });
    },
  });
  //ClearWishlist
  const clearWishlistMutation = useMutation({
    mutationFn: () => clearWishlist(),
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
    isLoading: isAuthenticated ? wishlistQuery.isLoading : false,
    isError: isAuthenticated ? wishlistQuery.isError : false,
    error: wishlistQuery.error,
    removeItemFromWishlidstMutation: removeItemFromWishlidstMutation.mutate,
    //clearMutation
    clearWishlist: clearWishlistMutation.mutate,
  };
};
