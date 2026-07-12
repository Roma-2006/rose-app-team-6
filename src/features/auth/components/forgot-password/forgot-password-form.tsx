'use client';
import { Controller } from 'react-hook-form';
import { Link } from '@/i18n/navigation';
import { useForgotPasswordForm } from '@/features/auth/hooks/use-forgot-password-form';
import { Button } from '@/shared/components/ui/button';
import CustomInput from '@/shared/components/custom-input';

interface ForgotPasswordFormProps {
  onSuccess: (email: string) => void;
}

export const ForgotPasswordForm = ({ onSuccess }: ForgotPasswordFormProps) => {
  const { t, isRtl, isLoading, control, handleSubmit, onSubmit } = useForgotPasswordForm(onSuccess);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-2">
        <h1 className="text-3xl font-bold text-text-plain  mb-2">
          {t('auth.auth-forgotPw.step1.title')}
        </h1>
        <p className="text-text-plain text-sm font-normal">
          {t('auth.auth-forgotPw.step1.subtitle')}
        </p>
      </div>

      <hr className="border-0 border-t border-border-muted dark:border-border-soft w-full" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
        <div className="space-y-2">
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <CustomInput
                variant="email"
                label={t('auth.auth-forgotPw.step1.emailLabel')}
                placeholder={t('auth.auth-forgotPw.step1.emailPlaceholder')}
                id="email"
                errorMessage={
                  fieldState.error
                    ? t(`auth.auth-forgotPw.errors.${fieldState.error.message}`)
                    : undefined
                }
                error={fieldState.invalid}
                isRtl={isRtl}
                {...field}
              />
            )}
          />
        </div>
        <Button
          type="submit"
          buttonVariant="text"
          variant="primary"
          title="auth.auth-forgotPw.step1.continue"
          loading={isLoading}
          className="w-full h-12"
        />
      </form>
      <hr className="border-0 border-t border-border-muted dark:border-border-soft mt-9 w-full" />

      <div className="mt-8 text-center text-sm">
        <span className="text-text-plain dark:text-text-plain">
          {t('auth.auth-forgotPw.step1.footerText')}{' '}
        </span>
        <Link
          href="/register"
          className="text-text-primary dark:text-text-primary font-bold hover:underline transition-colors"
        >
          {t('auth.auth-forgotPw.step1.registerLink')}
        </Link>
      </div>
    </div>
  );
};
