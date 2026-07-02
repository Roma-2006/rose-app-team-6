'use client';

import { useTranslations, useLocale } from 'next-intl';
import { toast } from 'sonner';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '@/features/auth/schemes/reset-password.schema';
import { useResetPassword } from '@/features/auth/hooks/useResetPassword';
import { Button } from '@/shared/components/ui/button';
import CustomInput from '@/shared/components/custom-input';
import ErrorAlert from '@/shared/components/error-alert';
import { useRouter, useSearchParams } from 'next/navigation';
import * as z from 'zod';
import { useState } from 'react';

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export const ResetPasswordForm = () => {
  const t = useTranslations();
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [isLoading, setIsLoading] = useState(false);

  if (!token) {
    router.push('/forgot-password');
  }

  const resetPasswordMutation = useResetPassword();

  const {
    control,
    handleSubmit,
    formState: { errors: _errors },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ResetPasswordValues) => {
    if (!token) {
      return;
    }

    setIsLoading(true);
    try {
      const res = await resetPasswordMutation.mutateAsync({
        token,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });

      if (res?.status) {
        toast.success(t('auth-forgotPw.step3.successToast'));
        router.push('/login');
        return;
      }
    } catch (err) {
      type ApiErrorLike = {
        message?: string;
        response?: {
          message?: string;
        };
      };

      const apiMessage: string | undefined =
        err instanceof Error
          ? err.message
          : ((err as ApiErrorLike)?.message ?? (err as ApiErrorLike)?.response?.message);
      if (!apiMessage) return;

      // Map backend error codes/messages into inline field errors
      // Expected: passwordOldSame
      if (apiMessage.toLowerCase?.().includes('old')) {
        // Conservative mapping: treat as "passwordOldSame"
        control.setError('newPassword', { message: 'passwordOldSame' });
      }

      // Fallback mapping to existing zod error keys
      if (apiMessage === 'passwordRequirement') {
        control.setError('newPassword', { message: 'passwordRequirement' });
      }
      if (apiMessage === 'passwordMatch') {
        control.setError('confirmPassword', { message: 'passwordMatch' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-[28px] font-bold text-text-plain dark:text-text-plain mb-2">
          {t('auth-forgotPw.step3.title')}
        </h1>
        <p className="text-text-plain dark:text-text-plain text-sm font-normal leading-relaxed">
          {t('auth-forgotPw.step3.subtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* New Password */}
        <Controller
          name="newPassword"
          control={control}
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <CustomInput
                variant="password"
                label={t('auth-forgotPw.step3.passwordLabel')}
                placeholder="••••••••"
                id="newPassword"
                isRtl={isRtl}
                error={fieldState.invalid}
                errorMessage={fieldState.error?.message}
                {...field}
              />
              {fieldState.error && (
                <ErrorAlert
                  isRtl={isRtl}
                  errorMessage={t(`auth-forgotPw.errors.${fieldState.error.message}`)}
                />
              )}
            </div>
          )}
        />

        {/* Confirm Password */}
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field, fieldState }) => (
            <div className="space-y-1">
              <CustomInput
                variant="password"
                label={t('auth-forgotPw.step3.confirmPasswordLabel')}
                placeholder="••••••••"
                id="confirmPassword"
                isRtl={isRtl}
                error={fieldState.invalid}
                errorMessage={fieldState.error?.message}
                {...field}
              />
              {fieldState.error && (
                <ErrorAlert
                  isRtl={isRtl}
                  errorMessage={t(`auth-forgotPw.errors.${fieldState.error.message}`)}
                />
              )}
            </div>
          )}
        />

        <Button
          type="submit"
          buttonVariant="text"
          variant="primary"
          title={t('auth-forgotPw.step3.reset')}
          loading={isLoading}
          className="w-full h-12 mt-4"
        />
      </form>
    </div>
  );
};
