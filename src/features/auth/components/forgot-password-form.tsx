'use client';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema } from '@/features/auth/schemes/forgot-password.schema';
import { forgotPasswordAction } from '@/features/auth/apis/forgotpass.api';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { useState } from 'react';
import * as z from 'zod';
import { toast } from 'sonner';
import Link from 'next/link';

export const ForgotPasswordForm = () => {
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

  const onSubmit = async (data: ForgotPasswordValues) => {
    setIsLoading(true);
    try {
      const res = await forgotPasswordAction(data.email);
      if (res.status) {
        toast.success(res.message || 'Reset instructions sent');
      } else {
        toast.error(t('auth-forgotPw.errors.noAccount'));
      }
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-8">
        <h1 className="text-[28px] font-bold text-text-plain dark:text-text-plain mb-2 transition-colors">
          {t('auth-forgotPw.step1.title')}
        </h1>
        <p className="text-text-plain dark:text-text-plain text-sm font-normal leading-relaxed transition-colors">
          {t('auth-forgotPw.step1.subtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-plain dark:text-text-plain transition-colors">
            {t('auth-forgotPw.step1.emailLabel')}
          </label>

          <Input
            {...register('email')}
            type="email"
            placeholder={t('auth-forgotPw.step1.emailPlaceholder')}
            aria-invalid={!!errors.email}
          />

          {errors.email && (
            <p className="text-red-500 dark:text-red-400 text-xs mt-1">
              {errors.email.message as string}
            </p>
          )}
        </div>

        <Button
          type="submit"
          buttonVariant="text"
          variant="primary"
          title="auth-forgotPw.step1.continue"
          loading={isLoading}
          className="w-full h-12 transition-all"
        />
      </form>

      <div className="mt-8 text-center text-sm">
        <span className="text-text-plain dark:text-text-plain">
          {t('auth-forgotPw.step1.footerText')}{' '}
        </span>
        <Link
          href="/register"
          className="text-text-primary dark:text-text-primary font-bold hover:underline transition-colors"
        >
          {t('auth-forgotPw.step1.registerLink')}
        </Link>
      </div>
    </div>
  );
};
