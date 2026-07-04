'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema } from '@/features/auth/schemes/forgot-password.schema';
import { forgotPassword } from '@/features/auth/apis/forgot-password.api';
import { Button } from '@/shared/components/ui/button';
import CustomInput from '@/shared/components/custom-input';
import ErrorAlert from '@/shared/components/error-alert';
import { useState } from 'react';
import * as z from 'zod';
import { toast } from 'sonner';
import Link from 'next/link';

export const ForgotPasswordForm = () => {
  const t = useTranslations();
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const [isLoading, setIsLoading] = useState(false);

  type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordValues) => {
    setIsLoading(true);
    try {
      const res = await forgotPassword(data.email);
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

      <hr className="border-0 border-t border-border-muted dark:border-border-soft mt-2 w-full" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
        <div className="space-y-2">
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <CustomInput
                  variant="email"
                  label={t('auth-forgotPw.step1.emailLabel')}
                  placeholder={t('auth-forgotPw.step1.emailPlaceholder')}
                  id="email"
                  errorMessage={fieldState.error?.message}
                  error={fieldState.invalid}
                  isRtl={isRtl}
                  {...field}
                />

                {fieldState.error && (
                  <ErrorAlert errorMessage={fieldState.error.message} isRtl={isRtl} />
                )}
              </>
            )}
          />
        </div>

        <Button
          type="submit"
          buttonVariant="text"
          variant="primary"
          title={t('auth-forgotPw.step1.continue')}
          loading={isLoading}
          className="w-full h-12 transition-all"
        />
      </form>

      <hr className="border-0 border-t border-border-muted dark:border-border-soft mt-9 w-full" />

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
