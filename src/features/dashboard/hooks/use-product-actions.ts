'use client';

import { useCart } from '@/features/dashboard/hooks/use-cart';
import { useWishlist } from '@/features/dashboard/hooks/use-wishlist';
import type { LocalCartProduct } from '@/features/dashboard/types/local-cart';

export const useProductActions = (productId: string, product?: LocalCartProduct) => {
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

    cartAction({ productId: product?.id ?? productId, quantity: 1, product });
  };

  const handleToggleWishlist = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (isWishlisting) return;

    wishlistAction({ product });
  };

  return {
    addToCart: handleAddToCart,
    toggleWishlist: handleToggleWishlist,
    isAdding,
    isWishlisting,
    isInWishlist,
    isInCart: isInCart(product?.id ?? productId),
  };
};
