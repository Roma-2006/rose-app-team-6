'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { TLoginData } from '../types/login';
import { useRouter } from '@/i18n/navigation';

export default function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status, update } = useSession();
  const router = useRouter();

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

      if (result?.error) {
        setError(result.error);
        return;
      }

      if (result?.ok) {
        const callbackUrl = new URLSearchParams(window.location.search).get('callbackUrl') || '/';

        await update();

        router.push(callbackUrl);

        router.refresh();
      }
    } catch (error1) {
      setError((error1 as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

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
