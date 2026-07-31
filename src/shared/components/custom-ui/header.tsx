'use client';
import { LanguageSwitcherAuth } from '@/features/auth/components/language-switcher-auth';
import { Link } from '@/i18n/navigation';
import { Bell, Heart, ShoppingCart, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import SecondaryNavigation from './secondary-navigation';
import { useSession } from 'next-auth/react';
import HeaderSearchInput from './headear-search-input';
import UserDropdown from '../header/user-dropdown';
import NotificationsList from '@/features/notification/components/notifications-list';

import { useCart } from '@/features/dashboard/hooks/use-cart';
import { useWishlist } from '@/features/dashboard/hooks/use-wishlist';

export default function Header() {
  const t = useTranslations();
  const session = useSession();
  const userStatus = session.status;
  const isAuthenticated = userStatus === 'authenticated';

  const { uniqueItemsCount } = useCart();
  const { wishlistCount } = useWishlist();
  return (
    <header className="sticky top-0 z-50 bg-bg-plain">
      <div className=" flex items-center py-4.5 px-9 gap-4 ">
        <Link href="/" className="w-21.25 h-20 relative">
          <Image
            src="/assets/images/logo.png"
            alt="Rose app logo"
            fill
            className="object-cover object-center "
          />
        </Link>
        {/* search input */}
        <div className="grow">
          <HeaderSearchInput />
        </div>
        <div className="flex">
          {!isAuthenticated ? (
            <Link href="/login" className=" flex items-center gap-1.5 px-4  ">
              <User size={20} /> {t('header.login')}
            </Link>
          ) : (
            <UserDropdown user={session.data.user} />
          )}

          <span className=" flex items-center gap-2.5 px-4 border-r border-l  border-border-muted">
            <div className="relative">
              <Heart size={24} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-bg-primary text-text-inverse text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </div>
            <div className="relative">
              <ShoppingCart size={24} />
              {uniqueItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-bg-primary text-text-inverse text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {uniqueItemsCount}
                </span>
              )}
            </div>
            {!isAuthenticated ? (
              <Link href="/login">
                <Bell size={24} />
              </Link>
            ) : (
              <NotificationsList />
            )}
          </span>
          <span className={` flex ltr:pl-4 rtl:pr-4 `}>
            <LanguageSwitcherAuth />
          </span>
        </div>
      </div>
      <SecondaryNavigation />
    </header>
  );
}
