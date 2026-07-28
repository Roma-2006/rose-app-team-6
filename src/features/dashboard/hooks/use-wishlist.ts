'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

import {
  getWishlistAction,
  addToWishlistAction,
  removeFromWishlistAction,
} from '../apis/wishlist.api';
import {
  getLocalWishlist,
  addToLocalWishlist,
  removeFromLocalWishlist,
  isInLocalWishlist,
  WISHLIST_STORAGE_EVENT,
} from '../lib/storage';

export const useWishlist = (productId?: string) => {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const isAuthenticated = status === 'authenticated';
  const token = session?.token;

  const [localItems, setLocalItems] = useState<LocalWishlistItem[]>(() => getLocalWishlist());
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

  const wishlistItems = isAuthenticated ? serverItems : localItems;

  const isInWishlist = isAuthenticated
    ? wishlistItems.some((item) => item.productId === productId)
    : productId
      ? isInLocalWishlist(productId)
      : false;

  const existingItem = isAuthenticated
    ? wishlistItems.find((item) => item.productId === productId)
    : productId
      ? (localItems.find((item) => item.productId === productId) ?? null)
      : null;

  const toggleWishlistMutation = useMutation({
    mutationFn: async () => {
      if (!productId) {
        throw new Error('Product id is required');
      }

      if (isAuthenticated) {
        // Server action (authenticated)
        if (isInWishlist && existingItem) {
          return removeFromWishlistAction(existingItem.id);
        }

        return addToWishlistAction(productId);
      } else {
        // localStorage (guest)
        if (isInWishlist && existingItem) {
          const updated = removeFromLocalWishlist(existingItem.id);
          setLocalItems([...updated]);
        } else {
          const updated = addToLocalWishlist(productId);
          setLocalItems([...updated]);
        }

        return Promise.resolve({ success: true });
      }
    },

    onSuccess: async () => {
      if (isAuthenticated) {
        await queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      }
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
    refetch: isAuthenticated ? wishlistQuery.refetch : async () => Promise.resolve(),
  };
};
