'use client';

import { signOut } from 'next-auth/react';

export default function SignOutButton({ locale }: { locale: string }) {
  return (
    <button
      onClick={() => signOut({ callbackUrl: `/${locale}/login` })}
      className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition-colors"
    >
      تسجيل الخروج
    </button>
  );
}
