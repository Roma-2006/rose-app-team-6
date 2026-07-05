'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Cormorant_Garamond } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['italic'],
  display: 'swap',
});

export default function WelcomeText() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('welcome-auth');

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  if (!mounted) return null;

  const isLogin = pathname.endsWith('/login');
  const isRegister = pathname.endsWith('/otp');

  if (!isLogin && !isRegister) return null;

  return (
    <h1
      className={`
        ${cormorant.className}
        text-center
        text-5xl
        italic
        font-medium
        mt-12
        mb-10
        transition-colors
        ${resolvedTheme === 'dark' ? 'text-text-primary-faint' : 'text-text-primary'}
      `}
    >
      {isLogin ? t('login-title') : t('register-title')}
    </h1>
  );
}
