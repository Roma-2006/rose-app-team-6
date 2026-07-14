'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterEmailSchema } from '@/features/auth/schemas/register-email.schema';

import { Button } from '@/shared/components/ui/button';
import CustomInput from '@/shared/components/custom-input';
import ErrorAlert from '@/shared/components/error-alert';
import { useState } from 'react';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from '@/i18n/navigation';
import { useRegisterEmail } from '../../hooks/useRegisterEmail';
import { advanceRegistrationStep } from '../../lib/registeration-progress';

export const RegisterEmailForm = () => {
  const t = useTranslations();
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const registerEmailMutation = useRegisterEmail();

  type RegisterEmailValues = z.infer<typeof RegisterEmailSchema>;

  const { setError, control, handleSubmit } = useForm<RegisterEmailValues>({
    resolver: zodResolver(RegisterEmailSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: RegisterEmailValues) => {
    setIsLoading(true);
    try {
      const res = await registerEmailMutation.mutateAsync(data.email);

      if (res?.status) {
        await advanceRegistrationStep(data.email, 'otp');
        router.push({
          pathname: '/register/otp',
          query: { email: data.email },
        });
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
      <form onSubmit={handleSubmit(onSubmit)} className=" space-y-6">
        <div className="space-y-2">
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <CustomInput
                  id="email"
                  variant="email"
                  label={t('auth.auth-register.step1.emailLabel')}
                  placeholder={t('auth.auth-register.step1.emailPlaceholder')}
                  error={fieldState.invalid}
                  errorMessage={
                    fieldState.error?.message
                      ? t(`auth-register.errors.${fieldState.error.message}`)
                      : undefined
                  }
                  isRtl={isRtl}
                  {...field}
                />

                {fieldState.error && (
                  <ErrorAlert
                    errorMessage={t(`auth-register.errors.${fieldState.error.message}`)}
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
