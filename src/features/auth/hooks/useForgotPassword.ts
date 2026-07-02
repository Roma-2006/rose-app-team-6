'use client';

import { useMutation } from '@tanstack/react-query';
import { forgotPassword } from '@/features/auth/apis/forgot-password.api';

export function useForgotPassword() {
  return useMutation({
    mutationFn: (email: string) => forgotPassword(email),
  });
}
