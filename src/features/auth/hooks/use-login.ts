'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { TLoginData } from '../types/auth';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();
  const t = useTranslations();
  const tLogin = useTranslations('auth.login');

  // handleLogin
  const handleLogin = async (data: TLoginData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn('credentials', {
        username: data.username,
        password: data.password,
        rememberMe: String(data.rememberMe),
        redirect: false,
      });

      console.log('Form data:', data);

      if (result?.error) {
        if (result.error === 'Route not found' || result.error === 'CredentialsSignin') {
          setError(tLogin('invalidCredentials'));
        } else {
          setError(result.error);
        }
        return;
      }

      if (result?.ok) {
        let callbackUrl = new URLSearchParams(window.location.search).get('callbackUrl') || '/';

        // Strip the localized prefix (e.g., '/en/', '/ar/') if it exists at the start of the string
        if (callbackUrl.match(/^\/[a-z]{2}(\/|$)/)) {
          callbackUrl = callbackUrl.replace(/^\/[a-z]{2}/, '') || '/';
        }

        router.refresh();
        router.push(callbackUrl);
      }
    } catch (error1) {
      setError((error1 as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  // handleLogout
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut({ redirect: false });
      router.push('/');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleLogin,
    handleLogout,
    isLoading,
    error,
    session,
    status,
  };
}
