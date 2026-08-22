//'use client';
import { LanguageSwitcherAuth } from '@/features/auth/components/language-switcher-auth';
import { Link } from '@/i18n/navigation';
import { Bell, Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import SecondaryNavigation from './secondary-navigation';
import { useSession } from 'next-auth/react';
import HeaderSearchInput from './header-search-input';
import GuestGatedIcon from './guest-gated-icon';
import UserAuthAction from './user-auth-action';
import { ThemeToggle } from '../theme';
import { useCart } from '@/features/main/hooks/use-cart';
import { useWishlist } from '@/features/main/hooks/use-wishlist';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { getWishlist } from '@/features/main/api/get-wishlist.api';
import HeaderClient from './header-client';

export default async function Header() {
  const session = await getServerSession(authOptions);
  const isAuthenticated = !!session?.user;
  let wishlistCount;
  if (isAuthenticated) {
    const wishlist = await getWishlist();
    wishlistCount = wishlist.payload.wishlistItems.length;
  }
  return (
    <header className="sticky top-0 z-50 bg-bg-plain">
      <div className=" flex flex-col md:flex-row  items-center py-4.5 px-9 gap-4 ">
        <div className="flex w-full md:grow items-center gap-4">
          <Link href="/" className="w-21.25 h-20 relative">
            <Image
              src="/assets/images/logo.png"
              alt="Rose app logo"
              fill
              className="object-cover object-center "
            />
          </Link>
          {/* search input */}
          <div className="grow w-full">
            <HeaderSearchInput />
          </div>
        </div>
        <div className="flex">
          <UserAuthAction isAuthenticated={isAuthenticated} />
          <HeaderClient isAuthenticated={isAuthenticated} serverWishlistCount={wishlistCount} />
          <span className={` flex ltr:pl-4 rtl:pr-4 gap-2.5 `}>
            <LanguageSwitcherAuth />
            <ThemeToggle />
          </span>
        </div>
      </div>
      <SecondaryNavigation />
    </header>
  );
}
