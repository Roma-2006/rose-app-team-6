'use client';

import { useCart } from '@/features/dashboard/hooks/use-cart';
import { useWishlist } from '@/features/dashboard/hooks/use-wishlist';

export const useProductActions = (productId: string, onShowLogin?: () => void) => {
  const { addToCart: cartAction, isAdding, isInCart } = useCart();
  const {
    toggleWishlist: wishlistAction,
    isPending: isWishlisting,
    isInWishlist,
  } = useWishlist(productId);

  const handleAddToCart = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (isAdding) return;

    cartAction({ productId, quantity: 1 });
  };

  const handleToggleWishlist = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (isWishlisting) return;

    wishlistAction();
  };

  return {
    addToCart: handleAddToCart,
    toggleWishlist: handleToggleWishlist,
    isAdding,
    isWishlisting,
    isInWishlist,
    isInCart: isInCart(productId),
  };
};
