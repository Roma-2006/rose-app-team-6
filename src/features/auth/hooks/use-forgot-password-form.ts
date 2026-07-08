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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit: SubmitHandler<ForgotPasswordValues> = async (data) => {
    setIsLoading(true);
    try {
      const res = await forgotPassword(data.email);

      if (res.status) {
        if (onSuccess) {
          onSuccess(data.email);
        } else {
          router.push(`/${locale}/password-reset-sent?email=${encodeURIComponent(data.email)}`);
        }
      } else {
        toast.error(res?.message || t('auth.auth-forgotPw.errors.noAccount'));
      }
    } catch (err) {
      toast.error(t('auth.auth-forgotPw.errors.somethingWentWrong'));
    } finally {
      setIsLoading(false);
    }
  };

  return { t, isRtl: locale === 'ar', isLoading, ...form, onSubmit };
};
