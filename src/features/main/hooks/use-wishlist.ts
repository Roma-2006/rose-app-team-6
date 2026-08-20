'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
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
  const { status } = useSession();
  const queryClient = useQueryClient();
  const isAuthenticated = status === 'authenticated';

  useEffect(() => {
    if (isAuthenticated) return;

    const handleGuestWishlistChange = () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist', 'guest'] });
    };

    window.addEventListener(WISHLIST_STORAGE_EVENT, handleGuestWishlistChange);
    return () => window.removeEventListener(WISHLIST_STORAGE_EVENT, handleGuestWishlistChange);
  }, [isAuthenticated, queryClient]);

  // Authenticated wishlist
  const wishlistQuery = useQuery<GetWishlistResponse>({
    queryKey: ['wishlist'],
    queryFn: async () => {
      const response = await fetch('/api/wishlist');
      if (!response.ok) {
        throw new Error('Failed to fetch wishlist');
      }
      return response.json();
    },
    enabled: isAuthenticated,
    initialData: initialWishlist,
  });

  // Guest wishlist
  const guestWishlistQuery = useQuery<LocalWishlistItem[]>({
    queryKey: ['wishlist', 'guest'],
    queryFn: () => getLocalWishlist(),
    enabled: !isAuthenticated,
    initialData: typeof window !== 'undefined' ? getLocalWishlist() : [],
    staleTime: 0,
  });

  const wishlistItems = isAuthenticated
    ? (wishlistQuery.data?.payload.wishlistItems ?? [])
    : (guestWishlistQuery.data ?? []);

  const isInWishlist = isAuthenticated
    ? wishlistItems.some((item) => item.productId === productId)
    : productId
      ? isInLocalWishlist(productId)
      : false;

  const existingItem = isAuthenticated
    ? wishlistItems.find((item) => item.productId === productId)
    : productId
      ? (guestWishlistQuery.data?.find((item) => item.productId === productId) ?? null)
      : null;

  const toggleWishlistMutation = useMutation({
    mutationFn: async ({ product }: { product?: LocalWishlistProduct } = {}) => {
      if (!productId) {
        throw new Error('Product id is required');
      }

      if (!isAuthenticated) {
        if (isInWishlist && existingItem) {
          const updated = removeFromLocalWishlist(existingItem.id);
          return { success: true, items: updated };
        }
        const updated = addToLocalWishlist(productId, product);
        return { success: true, items: updated };
      }

      if (isInWishlist && existingItem) {
        return removeFromWishlistAction(existingItem.id);
      }
      return addToWishlistAction(productId);
    },
    onSuccess: async () => {
      if (isAuthenticated) {
        await queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      } else {
        await queryClient.invalidateQueries({ queryKey: ['wishlist', 'guest'] });
      }
    },
  });

  // remove item from wishlist
  const removeItemFromWishlistMutation = useMutation({
    mutationFn: async (itemId: string) => {
      if (!isAuthenticated) {
        const updated = removeFromLocalWishlist(itemId);
        return { success: true, items: updated };
      }
      return removeFromWishlistAction(itemId);
    },
    onSuccess: async () => {
      if (isAuthenticated) {
        await queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      } else {
        await queryClient.invalidateQueries({ queryKey: ['wishlist', 'guest'] });
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  //ClearWishlist
  const clearWishlistMutation = useMutation({
    mutationFn: async () => {
      if (!isAuthenticated) {
        clearLocalWishlist();
        return { success: true };
      }
      return clearWishlist();
    },
    onSuccess: async () => {
      if (isAuthenticated) {
        await queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      } else {
        await queryClient.invalidateQueries({ queryKey: ['wishlist', 'guest'] });
      }
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
    isLoading: isAuthenticated ? wishlistQuery.isLoading : guestWishlistQuery.isLoading,
    isError: isAuthenticated ? wishlistQuery.isError : guestWishlistQuery.isError,
    error: isAuthenticated ? wishlistQuery.error : guestWishlistQuery.error,
    refetch: isAuthenticated ? wishlistQuery.refetch : guestWishlistQuery.refetch,
    isFetching: isAuthenticated ? wishlistQuery.isFetching : guestWishlistQuery.isFetching,
    removeItemFromWishlistMutation: removeItemFromWishlistMutation.mutate,
    clearWishlist: clearWishlistMutation.mutateAsync,
    loadingClearWishlist: clearWishlistMutation.isPending,
  };
};
