'use client';

import { TUserAuthActionProps } from '@/shared/types/user-auth-action';

import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import UserDropdown from '../header/user-dropdown';
import LoginPopover from '@/features/auth/components/login-popover/login-popover';
export default function UserAuthAction({ isAuthenticated }: TUserAuthActionProps) {
  // Translations
  const t = useTranslations();

  // Session
  const { data: session } = useSession();

  if (!isAuthenticated) {
    return <LoginPopover />;
  }
  if (!session) return null;
  return <UserDropdown user={session?.user} />;
}
