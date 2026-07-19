'use client';
import { LanguageSwitcherAuth } from '@/features/auth/components/language-switcher-auth';
import { Link } from '@/i18n/navigation';
import { Bell, Heart, ShoppingCart, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import SecondaryNavigation from './secondary-navigation';
import { useSession } from 'next-auth/react';
import HeaderSearchInput from './headear-search-input';

export default function Header() {
  const t = useTranslations();
  const session = useSession();
  const userStatus = session.status;
  const isAuthenticated = userStatus === 'authenticated';
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
            ''
          )}

          <span className=" flex items-center gap-2.5 px-4 border-r border-l  border-border-muted">
            {!isAuthenticated ? (
              <Link href="/login">
                <Heart size={24} />
              </Link>
            ) : (
              <Heart size={24} />
            )}
            {!isAuthenticated ? (
              <Link href="/login">
                <ShoppingCart size={24} />
              </Link>
            ) : (
              <ShoppingCart size={24} />
            )}
            <Bell size={24} />
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
