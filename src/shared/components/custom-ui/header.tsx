import { LanguageSwitcherAuth } from '@/features/auth/components/language-switcher-auth';
import { Link } from '@/i18n/navigation';
import { Bell, Heart, ShoppingCart, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import CustomInput from '../custom-input';
import SecondaryNavigation from './secondary-navigation';

export default function Header() {
  const t = useTranslations();
  return (
    <header className="sticky top-0">
      <div className=" flex items-center py-4.5 px-9 gap-4 ">
        <Link href="/" className="w-21.25 h-20 relative">
          <Image
            src="/assets/images/logo.png"
            alt="Rose app logo"
            fill
            //priority
            className="object-cover object-center "
          />
        </Link>
        {/* search input */}
        <div className="grow">
          <CustomInput variant="search" placeholder={t('header.search-placeholder')} />
        </div>
        <div className="flex">
          <Link href="/login" className=" flex items-center gap-1.5 px-4  ">
            <User size={20} /> {t('header.login')}
          </Link>
          <span className=" flex items-center gap-2.5 px-4 border-r border-l  border-border-muted">
            <Heart size={24} />
            <ShoppingCart size={24} />
            <Bell size={24} />
          </span>
          <span className=" flex pl-4">
            <LanguageSwitcherAuth />
          </span>
        </div>
      </div>
      <SecondaryNavigation />
    </header>
  );
}
