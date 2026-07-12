'use client';

import { useMutation } from '@tanstack/react-query';
import { sendEmailVerification } from '@/features/auth/apis/send-email-verification.api';

export function useRegisterEmail() {
  return useMutation({
    mutationFn: (email: string) => sendEmailVerification({ email }),
  });
}
