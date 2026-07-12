'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import * as z from 'zod';

import { forgotPassword } from '@/features/auth/apis/forgot-password.api';
import { forgotPasswordSchema } from '@/features/auth/schemas/forgot-password.schema';

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export const useForgotPasswordForm = (onSuccess?: (email: string) => void) => {
  const t = useTranslations();
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit: SubmitHandler<ForgotPasswordValues> = async (data) => {
    setIsLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/${locale}/reset-password`;

      const res = await forgotPassword(data.email, redirectUrl);

      if (res.status) {
        toast.success(t('auth.auth-forgotPw.step2.resendToast'));

        if (onSuccess) {
          onSuccess(data.email);
        }
      } else {
        toast.error(res?.message || t('auth.auth-forgotPw.errors.noAccount'));
      }
    } catch {
      toast.error(t('auth.auth-forgotPw.errors.somethingWentWrong'));
    } finally {
      setIsLoading(false);
    }
  };

  return { t, isRtl: locale === 'ar', isLoading, ...form, onSubmit };
};
