'use client';

import { Controller } from 'react-hook-form';

import { useResetPasswordForm } from '@/features/auth/hooks/use-reset-password-form';
import { Button } from '@/shared/components/ui/button';
import CustomInput from '@/shared/components/custom-input';
import { Link } from '@/i18n/navigation';

export const ResetPasswordForm = () => {
  const { t, isRtl, isLoading, control, handleSubmit, onSubmit } = useResetPasswordForm();

  return (
    <div className="w-full">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-text-plain mb-2">
          {t('auth.auth-forgotPw.step3.title')}
        </h1>
        <p className="text-text-plain text-sm font-normal ">
          {t('auth.auth-forgotPw.step3.subtitle')}
        </p>
      </div>
      <hr className="border-0 border-t border-border-muted dark:border-border-soft  w-full" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
        {/* New Password */}
        <Controller
          name="newPassword"
          control={control}
          render={({ field, fieldState }) => (
            <CustomInput
              variant="password"
              label={t('auth.auth-forgotPw.step3.passwordLabel')}
              placeholder="••••••••"
              id="newPassword"
              isRtl={isRtl}
              error={fieldState.invalid}
              errorMessage={
                fieldState.error
                  ? t(`auth.auth-forgotPw.errors.${fieldState.error.message}`)
                  : undefined
              }
              {...field}
            />
          )}
        />

        {/* Confirm Password */}
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field, fieldState }) => (
            <CustomInput
              variant="password"
              label={t('auth.auth-forgotPw.step3.confirmPasswordLabel')}
              placeholder="••••••••"
              id="confirmPassword"
              isRtl={isRtl}
              error={fieldState.invalid}
              errorMessage={
                fieldState.error
                  ? t(`auth.auth-forgotPw.errors.${fieldState.error.message}`)
                  : undefined
              }
              {...field}
            />
          )}
        />

        <Button
          type="submit"
          buttonVariant="text"
          variant="primary"
          title="auth.auth-forgotPw.step3.reset"
          loading={isLoading}
          className="w-full h-12 mt-4"
        />
        <hr className="border-0 border-t border-border-muted dark:border-border-soft mt-2 w-full" />
        <div className="text-center">
          <span className="text-text-plain ">{t('auth.auth-forgotPw.step2.needHelp')} </span>
          <Link
            href="/contact"
            className="text-text-primary font-bold hover:underline transition-colors"
          >
            {t('auth.auth-forgotPw.step2.contactUs')}
          </Link>
        </div>
      </form>
    </div>
  );
};
