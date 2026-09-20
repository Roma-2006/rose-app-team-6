'use client';

import { User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LoginForm from '@/features/auth/components/login/login-form';

export default function LoginPopover() {
  const t = useTranslations();

  return (
    <div className="group relative inline-block">
      {/* Trigger */}
      <Link
        href="/login"
        className="mt-4 flex cursor-pointer items-center gap-1.5 text-foreground transition-colors hover:text-primary"
      >
        <User size={20} />
        <span>{t('header.login')}</span>
      </Link>

      {/* Popover Card */}
      <div className="absolute right-0 top-full z-50 hidden w-98 pt-2 group-hover:block">
        <div className="overflow-hidden rounded-2xl bg-bg-plain shadow-xl">
          {/* Tabs Navigation Header */}
          <div className="flex h-11 w-full">
            {/* Active Login Tab */}
            <span className="flex flex-1 items-center  bg-bg-primary justify-center  text-sm font-medium text-text-inverse  rounded-tl-2xl">
              {t('header.login')}
            </span>

            {/* Inactive Register */}
            <Link
              href="/register"
              className="flex flex-1 items-center justify-center bg-bg-subtle  text-sm font-medium text-text-plain transition-colors  rounded-tr-2xl"
            >
              {t('header.register')}
            </Link>
          </div>

          {/* Login Form Container */}
          <div className="p-5">
            <LoginForm variant="popover" />
          </div>
        </div>
      </div>
    </div>
  );
}
