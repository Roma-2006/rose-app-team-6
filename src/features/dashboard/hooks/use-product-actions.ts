import { useState } from 'react';
import { useSession } from 'next-auth/react';

export const useProductActions = (productId: string, onShowLogin: () => void) => {
  const { status } = useSession();
  const [loading, setLoading] = useState(false);
  const handleRequireAuth = () => {
    if (status !== 'authenticated') {
      onShowLogin();
      return false;
    }
    return true;
  };

  const addToCart = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!handleRequireAuth()) return;

    try {
      setLoading(true);
      await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity: 1 }),
      });
    } catch (error) {
      console.error('Error adding to cart', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlist = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!handleRequireAuth()) return;

    try {
      setLoading(true);
      await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
    } catch (error) {
      console.error('Error updating wishlist', error);
    } finally {
      setLoading(false);
    }
  };

  return { addToCart, toggleWishlist, loading };
};
