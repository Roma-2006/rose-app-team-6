'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import * as z from 'zod';

import { resetPassword } from '@/features/auth/apis/reset-password.api';
import { resetPasswordSchema } from '@/features/auth/schemas/reset-password.schema';

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export const useResetPasswordForm = () => {
  // Translation
  const t = useTranslations();

  // Context
  const locale = useLocale();
  const isRtl = locale === 'ar';

  // Navigation
  const router = useRouter();

  // Query
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  // State
  const [isLoading, setIsLoading] = useState(false);

  // Form
  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  // Variables (Derived)
  const buildPayload = (data: ResetPasswordValues) => ({
    token,
    newPassword: data.newPassword,
    confirmPassword: data.confirmPassword,
  });

  // Functions
  const handleSuccess = () => {
    toast.success(t('auth.auth-forgotPw.step3.successToast'));
    router.push(`/${locale}/login`);
  };

  const handleFailure = (message?: string) => {
    toast.error(message || t('auth.auth-forgotPw.step3.resetFailed'));
  };

  const handleApiError = () => {
    toast.error(t('auth.auth-forgotPw.errors.somethingWentWrong'));
  };

  const onSubmit: SubmitHandler<ResetPasswordValues> = async (data) => {
    setIsLoading(true);
    try {
      const res = await resetPassword(buildPayload(data));

      if (res.status) {
        handleSuccess();
        return;
      }

      handleFailure(res.message);
    } catch {
      handleApiError();
    } finally {
      setIsLoading(false);
    }
  };

  return {
    t,
    isRtl,
    token,
    isLoading,
    ...form,
    onSubmit,
  };
};
