'use client';

import { Controller } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from '@/i18n/navigation';
import CustomInput from '@/shared/components/custom-input';
import { useForgotPasswordForm } from '@/features/auth/hooks/use-forgot-password-form';
import { Button } from '@/shared/components/ui/button';

export const ForgotPasswordForm = () => {
  const { t, isRtl, isLoading, control, handleSubmit, onSubmit } = useForgotPasswordForm();

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

      <hr className="border-0 border-t border-border-muted dark:border-border-soft mt-2 w-full" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
        <div className="space-y-2">
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <CustomInput
                  id="email"
                  errorMessage={fieldState.error?.message}
                  error={fieldState.invalid}
                  isRtl={isRtl}
                  {...field}
                />
              </>
            )}
          />
        </div>

        <Button
          type="submit"
          buttonVariant="text"
          variant="primary"
          title="auth-forgotPw.step1.continue"
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
