'use client';

import { useMutation } from '@tanstack/react-query';
import { registerEmail } from '@/features/auth/apis/register-email.api';

export function useRegisterEmail() {
  return useMutation({
    mutationFn: (email: string) => registerEmail(email),
  });
}
