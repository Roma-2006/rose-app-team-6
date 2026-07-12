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
  const t = useTranslations();
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordValues> = async (data) => {
    setIsLoading(true);
    try {
      const res = await resetPassword({
        token,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });

      if (res.status) {
        toast.success(t('auth.auth-forgotPw.step3.successToast'));
        router.push(`/${locale}/login`);
      } else {
        toast.error(res.message || t('auth.auth-forgotPw.step3.resetFailed'));
      }
    } catch {
      toast.error(t('auth.auth-forgotPw.errors.somethingWentWrong'));
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
