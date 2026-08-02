'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { TLoginData } from '../types/auth';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { syncGuestDataToServer } from '@/features/dashboard/lib/guest-data';
import { useQueryClient } from '@tanstack/react-query';

export default function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (status === 'authenticated' && session?.token) {
      syncGuestDataToServer(session.token, queryClient);
    }
  }, [status, session?.token, queryClient]);
  const router = useRouter();

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

      if (result?.error) {
        if (result.error === 'Route not found' || result.error === 'CredentialsSignin') {
          setError(tLogin('invalidCredentials'));
        } else {
          setError(result.error);
        }
        return;
      }

      if (result?.ok) {
        const rawCallbackUrl =
          new URLSearchParams(window.location.search).get('callbackUrl') || '/';
        const normalizedCallbackUrl = rawCallbackUrl.startsWith('/')
          ? rawCallbackUrl.replace(/^\/([a-z]{2})(\/|$)/, '/$2')
          : rawCallbackUrl;

        router.refresh();
        router.push(normalizedCallbackUrl || '/');
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
