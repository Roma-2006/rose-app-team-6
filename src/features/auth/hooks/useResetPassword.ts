'use client';

import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '@/features/auth/apis/reset-password.api';

export function useResetPassword() {
  return useMutation({
    mutationFn: (data: { token: string; newPassword: string; confirmPassword: string }) =>
      resetPassword(data),
  });
}
