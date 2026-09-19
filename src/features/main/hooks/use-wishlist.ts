'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import {
  getLocalWishlist,
  addToLocalWishlist,
  removeFromLocalWishlist,
  clearLocalWishlist,
  isInLocalWishlist,
  WISHLIST_STORAGE_EVENT,
} from '../lib/storage';
import type { LocalWishlistItem, LocalWishlistProduct } from '../types/local-wishlist';
import {
  addToWishlistAction,
  removeFromWishlistAction,
  clearWishlist,
} from '../actions/wishlist.action';
import { toast } from 'sonner';
import { GetWishlistResponse } from '../types/wishlist';

export const useWishlist = (productId?: string, initialWishlist?: GetWishlistResponse) => {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
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

  const wishlistQuery = useQuery<GetWishlistResponse>({
    queryKey: ['wishlist'],
    queryFn: async () => {
      const response = await fetch('/api/wishlist');
      if (!response.ok) {
        throw new Error('Failed to fetch wishlist');
      }
      return response.json();
    },
    enabled: isAuthenticated && !!token,
  });

  const serverItems = wishlistQuery.data?.payload.wishlistItems ?? [];
  const shouldUseGuestData = !isAuthenticated;

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
  const removeItemFromWishlistMutation = useMutation({
    mutationFn: async (itemId: string) => {
      if (shouldUseGuestData) {
        const updated = removeFromLocalWishlist(itemId);
        setLocalItems([...updated]);
        return { success: true };
      }
      return removeFromWishlistAction(itemId);
    },
    onSuccess: async () => {
      toast.success('remove item successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  //ClearWishlist
  const clearWishlistMutation = useMutation({
    mutationFn: async () => {
      if (shouldUseGuestData) {
        clearLocalWishlist();
        setLocalItems([]);
        return { success: true };
      }
      return clearWishlist();
    },
    onSuccess: async () => {
      toast.success('Wishlist cleared successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return {
    wishlistItems,
    wishlistCount: wishlistItems.length,
    isInWishlist,
    toggleWishlist: toggleWishlistMutation.mutate,
    isPending: toggleWishlistMutation.isPending,
    removeItemFromWishlistMutation: removeItemFromWishlistMutation.mutate,
    //clearMutation
    clearWishlist: clearWishlistMutation.mutateAsync,
    loadingClearWishlist: clearWishlistMutation.isPending,
  };
};
