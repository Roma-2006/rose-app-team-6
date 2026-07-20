'use client';

import { signOut } from 'next-auth/react';
import { useLocale } from 'next-intl';

export default function Logout() {
  const locale = useLocale();

  return (
    <button
      onClick={() => signOut({ callbackUrl: `/${locale}/login` })}
      className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
    >
      تسجيل الخروج
    </button>
  );
}
