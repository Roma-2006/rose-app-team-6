'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterEmailSchema } from '@/features/auth/schemas/register-email.schema';

import { Button } from '@/shared/components/ui/button';
import CustomInput from '@/shared/components/custom-input';
import { saveRegisterEmail } from '../../actions/register-step.action';
import { useState } from 'react';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from '@/i18n/navigation';
import { useRegisterEmail } from '../../hooks/useRegisterEmail';

export const RegisterEmailForm = () => {
  const t = useTranslations('auth.auth-register');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const registerEmailMutation = useRegisterEmail();
  type RegisterEmailValues = z.infer<typeof RegisterEmailSchema>;

  const { control, handleSubmit, setError } = useForm<RegisterEmailValues>({
    resolver: zodResolver(RegisterEmailSchema),
    mode: 'onTouched',
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
        await saveRegisterEmail(data.email);

        router.push('/register/otp');
      }
    } catch (err) {
      type ApiErrorLike = {
        message?: string;
        response?: { message?: string };
      };

      const apiMessage =
        err instanceof Error
          ? err.message
          : ((err as ApiErrorLike)?.response?.message ?? (err as ApiErrorLike)?.message ?? '');

      if (apiMessage?.toLowerCase().includes('no account') || apiMessage?.includes('حساب')) {
        setError('email', {
          type: 'server',
          message: 'noAccount',
        });
      } else {
        setError('email', {
          type: 'server',
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
            render={({ field, fieldState }) => {
              const errorMessageKey = fieldState.error?.message;
              const translatedMessage = errorMessageKey
                ? t(`errors.${errorMessageKey}`)
                : undefined;

              return (
                <>
                  <CustomInput
                    id="email"
                    variant="email"
                    label={t('step1.emailLabel')}
                    placeholder={t('step1.emailPlaceholder')}
                    error={fieldState.invalid}
                    errorMessage={translatedMessage}
                    isRtl={isRtl}
                    {...field}
                  />
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
        <span className="text-text-plain dark:text-text-plain">{t('step1.footerText')} </span>

        <Link
          href="/login"
          className="font-bold text-text-primary transition-colors hover:underline dark:text-text-primary"
        >
          {t('step1.registerLink')}
        </Link>
      </div>
    </div>
  );
};
