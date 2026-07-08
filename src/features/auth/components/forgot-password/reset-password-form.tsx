'use client';

import { Controller } from 'react-hook-form';

import { useResetPasswordForm } from '@/features/auth/hooks/use-reset-password-form';
import { Button } from '@/shared/components/ui/button';
import CustomInput from '@/shared/components/custom-input';

export const ResetPasswordForm = () => {
  const { t, isRtl, isLoading, control, handleSubmit, onSubmit } = useResetPasswordForm();

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-[28px] font-bold text-text-plain dark:text-text-plain mb-2">
          {t('auth.auth-forgotPw.step3.title')}
        </h1>
        <p className="text-text-plain dark:text-text-plain text-sm font-normal leading-relaxed">
          {t('auth.auth-forgotPw.step3.subtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
      </form>
    </div>
  );
};
