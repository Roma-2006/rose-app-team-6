'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { use, useEffect, useState } from 'react';
import { TLoginData } from '../types/auth';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { syncGuestDataToServer } from '@/features/main/lib/guest-data';
import { useQueryClient } from '@tanstack/react-query';

export default function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    if (status !== 'authenticated' || !session?.token) return;
    syncGuestDataToServer(session.token, queryClient);
    if (session.user?.role === 'ADMIN') {
      router.push('/dashboard');
    } else {
      router.push('/');
    }
  }, [status, session?.token, session?.user?.role, queryClient, router]);
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
        const rawError = String(result.error);
        const normalizedError = rawError.replace(/^[^:]+:/, '').trim();

        if (rawError === 'Route not found' || rawError === 'CredentialsSignin') {
          setError(tLogin('invalidCredentials'));
        } else if (normalizedError) {
          setError(normalizedError);
        } else {
          setError(tLogin('invalidCredentials'));
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
