'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import * as z from 'zod';

import { forgotPassword } from '@/features/auth/apis/forgot-password.api';
import { forgotPasswordSchema } from '@/features/auth/schemes/forgot-password.schema';

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export const useForgotPasswordForm = () => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();

  const isRtl = locale === 'ar';

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordValues> = async (data) => {
    setIsLoading(true);
    try {
      const res = await forgotPassword(data.email);
      if (res.status) {
        toast.success(res.message || t('auth-forgotPw.step2.successToast'));
        router.push(`/password-reset-sent?email=${encodeURIComponent(data.email)}`);
      } else {
        toast.error(t('auth-forgotPw.errors.noAccount'));
      }
    } catch (err) {
      toast.error(t('auth-forgotPw.step1.errors.somethingWentWrong'));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    t,
    isRtl,
    isLoading,
    ...form,
    onSubmit,
  };
};
