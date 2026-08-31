'use client';

import { Controller } from 'react-hook-form';
import CustomInput from '@/shared/components/custom-input';
import { Button } from '@/shared/components/ui/button';
import { useChangePassword } from '@/features/main/hooks/use-change-password';
import { useTranslations } from 'next-intl';

export function ChangePasswordForm() {
  //  Translation
  const t = useTranslations('dashboard.account.change-password');

  // Custom hooks
  const { form, onSubmit, isLoading } = useChangePassword();

  // Form
  const { control } = form;

  return (
    <div className="min-h-screen bg-bg-subtle flex items-start justify-start p-4 pb-24 sm:p-6 md:p-8 lg:pb-8">
      <div className="w-full ">
        <h1 className="text-xl font-semibold text-text-plain mb-4 sm:text-2xl sm:mb-6">
          {t('title')}
        </h1>
        <div className="bg-bg-plain rounded-2xl shadow-sm ">
          <form
            onSubmit={onSubmit}
            noValidate
            className="bg-bg-plain p-4 rounded-xl flex flex-col gap-5 sm:p-6 sm:gap-6"
          >
            {/* old password */}
            <Controller
              name="currentPassword"
              control={control}
              render={({ field, fieldState }) => (
                <CustomInput
                  variant="password"
                  subVariant="old"
                  id="currentPassword"
                  label={t('currentPassword')}
                  placeholder={t('placeholders.currentPassword')}
                  disabled={isLoading}
                  {...field}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
            {/* newPassword */}
            <Controller
              name="newPassword"
              control={control}
              render={({ field, fieldState }) => (
                <CustomInput
                  variant="password"
                  subVariant="new"
                  id="newPassword"
                  label={t('newPassword')}
                  placeholder={t('placeholders.newPassword')}
                  disabled={isLoading}
                  {...field}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
            {/* confirmPassword */}
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field, fieldState }) => (
                <CustomInput
                  variant="password"
                  subVariant="confirm"
                  id="confirmPassword"
                  label={t('confirmPassword')}
                  placeholder={t('placeholders.confirmPassword')}
                  disabled={isLoading}
                  {...field}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />

            <div className="flex justify-end pt-6 sm:pt-12">
              <Button
                buttonVariant="text"
                title={t('button')}
                variant="primary"
                type="submit"
                loading={isLoading}
                className={'font-medium px-8 py-3 rounded-lg text-sm'}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
