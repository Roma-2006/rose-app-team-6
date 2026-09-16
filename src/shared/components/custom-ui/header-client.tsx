'use client';

import { Bell, Heart, ShoppingCart } from 'lucide-react';
import GuestGatedIcon from './guest-gated-icon';
import { useCart } from '@/features/main/hooks/use-cart';
import { useWishlist } from '@/features/main/hooks/use-wishlist';

type HeaderClientProps = {
  isAuthenticated: boolean;
  serverWishlistCount?: number;
};

export default function HeaderClient({ isAuthenticated, serverWishlistCount }: HeaderClientProps) {
  const { uniqueItemsCount } = useCart();
  const { wishlistCount: localWishlistCount } = useWishlist();

  const wishlistCount = isAuthenticated ? serverWishlistCount : localWishlistCount;

  return (
    <span className="flex items-center gap-2.5 px-4 border-r border-l border-border-muted">
      <GuestGatedIcon badgeCount={wishlistCount} href="/wishlist">
        <Heart size={24} />
      </GuestGatedIcon>

      <GuestGatedIcon badgeCount={uniqueItemsCount} href="/cart">
        <ShoppingCart size={24} />
      </GuestGatedIcon>

      <Bell size={24} />
    </span>
  );
}
