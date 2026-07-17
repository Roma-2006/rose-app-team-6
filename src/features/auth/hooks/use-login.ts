'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { TLoginData } from '../types/login';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const t = useTranslations();
  // handleLogin
  const handleLogin = async (data: TLoginData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn('credentials', {
        username: data.username,
        password: data.password,
        rememberMe: data.rememberMe,
        redirect: false,
      });
      console.log(data);
      if (result?.error) {
        // Handle specific error messages and translate them
        if (result.error === 'Route not found' || result.error === 'CredentialsSignin') {
          setError(t('auth.login.invalidCredentials'));
        } else {
          setError(result.error);
        }
        return;
      }

      if (result?.ok) {
        const callbackUrl = new URLSearchParams(window.location.search).get('callbackUrl') || '/';

        await update();

        router.push(callbackUrl);

        router.refresh();
      }
      console.log('Login Request:', router);
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
      setError((err as Error).message);
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
