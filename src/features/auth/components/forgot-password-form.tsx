'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema } from '@/features/auth/schemas/forgot-password.schema';
import { useForgotPassword } from '@/features/auth/hooks/useForgotPassword';
import { Button } from '@/shared/components/ui/button';
import CustomInput from '@/shared/components/custom-input';
import ErrorAlert from '@/shared/components/error-alert';
import { useState } from 'react';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from '@/i18n/navigation';

export const ForgotPasswordForm = () => {
  const t = useTranslations();
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const forgotPasswordMutation = useForgotPassword();

  type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

  const { setError, control, handleSubmit } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordValues) => {
    setIsLoading(true);

    try {
      const res = await forgotPasswordMutation.mutateAsync(data.email);

      if (res?.status) {
        router.push(`/password-reset-sent?email=${encodeURIComponent(data.email)}`);
      }
    } catch (err) {
      type ApiErrorLike = {
        message?: string;
        response?: {
          message?: string;
        };
      };

      const apiMessage =
        err instanceof Error
          ? err.message
          : ((err as ApiErrorLike)?.message ?? (err as ApiErrorLike)?.response?.message);

      if (apiMessage?.toLowerCase().includes('no account')) {
        setError('email', {
          message: 'noAccount',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-2">
        <h1 className="text-[28px] font-bold text-text-plain dark:text-text-plain mb-2 transition-colors">
          {t('auth.auth-forgotPw.step1.title')}
        </h1>

        <p className="text-text-plain dark:text-text-plain text-sm font-normal leading-relaxed transition-colors">
          {t('auth.auth-forgotPw.step1.subtitle')}
        </p>
      </div>

      <hr className=" w-full border-0 border-t border-border-muted dark:border-border-soft" />
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
        <div className="space-y-2">
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <CustomInput
                  id="email"
                  variant="email"
                  label={t('auth.auth-forgotPw.step1.emailLabel')}
                  placeholder={t('auth.auth-forgotPw.step1.emailPlaceholder')}
                  error={fieldState.invalid}
                  errorMessage={
                    fieldState.error?.message
                      ? t(`auth.auth-forgotPw.errors.${fieldState.error.message}`)
                      : undefined
                  }
                  isRtl={isRtl}
                  {...field}
                />

                {fieldState.error && (
                  <ErrorAlert
                    errorMessage={t(`auth.auth-forgotPw.errors.${fieldState.error.message}`)}
                    isRtl={isRtl}
                  />
                )}
              </>
            )}
          />
        </div>

        <Button
          type="submit"
          buttonVariant="text"
          variant="primary"
          title="auth.auth-forgotPw.step1.continue"
          loading={isLoading}
          className="h-12 w-full transition-all"
        />
      </form>

      <hr className="mt-9 w-full border-0 border-t border-border-muted dark:border-border-soft" />

      <div className="mt-8 text-center text-sm">
        <span className="text-text-plain dark:text-text-plain">
          {t('auth.auth-forgotPw.step1.footerText')}{' '}
        </span>

        <Link
          href="/register"
          className="font-bold text-text-primary transition-colors hover:underline dark:text-text-primary"
        >
          {t('auth.auth-forgotPw.step1.registerLink')}
        </Link>
      </div>
    </div>
  );
};
