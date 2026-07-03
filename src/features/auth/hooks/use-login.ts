'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { TLoginData } from '../types/login';

export default function UseLogin() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: TLoginData) => {
    setIsPending(true);
    setError(null);

    try {
      const result = await signIn('credentials', {
        username: data.username,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        return;
      }

      if (result?.ok) {
        const callbackUrl = new URLSearchParams(window.location.search).get('callbackUrl') || '/';

        window.location.href = callbackUrl;
      }
    } catch (error1) {
      setError((error1 as Error).message);
    } finally {
      setIsPending(false);
    }
  };

  return { isPending, error, login };
}
