'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterEmailSchema } from '@/features/auth/schemas/register-email.schema';

import { Button } from '@/shared/components/ui/button';
import CustomInput from '@/shared/components/custom-input';
import { useState } from 'react';
import * as z from 'zod';
import Link from 'next/link';

import { useRegisterEmail } from '../../hooks/useRegisterEmail';
import AuthError from '../shared/auth-error';
import { TRegisterEmailFormProps } from '../../types/register';

export const RegisterEmailForm = ({ setEmail, setStep, verifyError }: TRegisterEmailFormProps) => {
  const t = useTranslations();
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const [isLoading, setIsLoading] = useState(false);

  const registerEmailMutation = useRegisterEmail();
  type RegisterEmailValues = z.infer<typeof RegisterEmailSchema>;

  const { control, handleSubmit, setError } = useForm<RegisterEmailValues>({
    resolver: zodResolver(RegisterEmailSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',

    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: RegisterEmailValues) => {
    setIsLoading(true);
    try {
      const res = await registerEmailMutation.mutateAsync(data.email);
      if (res?.status) {
        setEmail(data.email);
        setStep('otp');
        const getEndTime = () => Date.now() + 60 * 1000;
        localStorage.setItem('otp-resend-end-time', getEndTime().toString());
      }
    } catch (err) {
      type ApiErrorLike = {
        message?: string;
        response?: { message?: string };
      };

      const apiMessage =
        err instanceof Error
          ? err.message
          : ((err as ApiErrorLike)?.message ?? (err as ApiErrorLike)?.response?.message) || '';

      const normalizedMessage = apiMessage.toLowerCase();

      if (normalizedMessage.includes('no account')) {
        setError('email', {
          message: 'step1.errors.no-account',
        });
      } else if (normalizedMessage.includes('registered')) {
        setError('email', {
          message: 'step1.errors.email-already-registered',
        });
      } else {
        setError('email', {
          message: 'step1.errors.something-went-wrong',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => {
              const hasError = fieldState.invalid || !!verifyError;
              return (
                <>
                  <CustomInput
                    id="email"
                    variant="email"
                    label={t('auth.auth-register.step1.emailLabel')}
                    placeholder={t('auth.auth-register.step1.emailPlaceholder')}
                    error={hasError}
                    isRtl={isRtl}
                    {...field}
                  />

                  {/* {errorMessage && <AuthError beError={errorMessage} />} */}
                  {(fieldState.error || verifyError) && (
                    <AuthError zodError={fieldState.error?.message} beError={verifyError} />
                  )}
                </>
              );
            }}
          />
        </div>

        <Button
          type="submit"
          buttonVariant="text"
          variant="primary"
          title="auth.auth-register.step1.continue"
          loading={isLoading}
          className="h-12 w-full transition-all"
        />
      </form>

      <hr className="mt-9 w-full border-0 border-t border-border-muted dark:border-border-soft" />

      <div className="mt-8 text-center text-sm">
        <span className="text-text-plain dark:text-text-plain">
          {t('auth.auth-register.step1.footerText')}{' '}
        </span>

        <Link
          href="/login"
          className="font-bold text-text-primary transition-colors hover:underline dark:text-text-primary"
        >
          {t('auth.auth-register.step1.registerLink')}
        </Link>
      </div>
    </div>
  );
};
