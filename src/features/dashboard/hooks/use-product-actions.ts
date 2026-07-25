// G:\Rose website\rose-app-team-6\src\features\dashboard\hooks\use-product-actions.ts
'use client';

import { useSession } from 'next-auth/react';
import { useCart } from '@/shared/hooks/use-cart';
import { useWishlist } from '@/shared/hooks/use-wishlist';

export const useProductActions = (productId: string, onShowLogin: () => void) => {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';

  // استدعاء الهوكس الخاصة بالسلة والأمنيات
  const { addToCart: cartAction, isAdding, isInCart } = useCart();
  const {
    toggleWishlist: wishlistAction,
    isPending: isWishlisting,
    isInWishlist,
  } = useWishlist(productId);

  /**
   * دالة التحقق من تسجيل الدخول
   * تمنع تنفيذ الـ mutation وتعرض المودال إذا كان المستخدم Guest
   */
  const handleRequireAuth = () => {
    if (!isAuthenticated) {
      onShowLogin();
      return false;
    }
    return true;
  };

  /**
   * إضافة للسلة
   * - تمنع الـ Bubbling (انتقال الضغطة للكارد)
   * - تمنع الطلبات المتكررة أثناء التحميل
   * - تطلب تسجيل الدخول أولاً
   */
  const handleAddToCart = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (isAdding) return; // المتطلب: Prevent duplicate requests
    if (!handleRequireAuth()) return; // المتطلب: Guests cannot add products

    cartAction({ productId, quantity: 1 });
  };

  /**
   * تبديل حالة الأمنيات (Add/Remove)
   * - تمنع الـ Bubbling
   * - تمنع الطلبات المتكررة
   * - تطلب تسجيل الدخول أولاً
   */
  const handleToggleWishlist = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (isWishlisting) return; // المتطلب: Prevent duplicate requests
    if (!handleRequireAuth()) return; // المتطلب: Guests cannot add to wishlist

    wishlistAction();
  };

  return {
    addToCart: handleAddToCart,
    toggleWishlist: handleToggleWishlist,
    isAdding,
    isWishlisting,
    isInWishlist,
    isInCart: isInCart(productId), // تم إضافتها لكي يستخدمها الـ UI إذا لزم الأمر
  };
};
