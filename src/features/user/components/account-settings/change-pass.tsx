'use client';

import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller } from 'react-hook-form';
import { CHANGE_PASS_SCHEMA } from '../../schemas/change-pass.schema';
import { FieldGroup } from '@/shared/components/ui/field';
import CustomInput from '@/shared/components/custom-input';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/components/ui/button';
import { useChangePassword } from '../../hooks/use-change-pass';
import { useMemo } from 'react';

type FormValues = z.infer<ReturnType<typeof CHANGE_PASS_SCHEMA>>;

export default function ChangePassword() {
  // Translation
  const t = useTranslations();

  // Custom hooks
  const { changePassword, isLoading, isError, isSuccess, error } = useChangePassword();

  // Form
  const schemaInstance = useMemo(() => CHANGE_PASS_SCHEMA(t), [t]);

  const form = useForm<FormValues>({
    resolver: zodResolver(schemaInstance),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  // Functions (handlers)
  const onSubmit = (data: FormValues) => {
    changePassword(
      {
        currentPassword: data.oldPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmNewPassword,
      },
      {
        onSuccess: () => form.reset(),
      }
    );
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full flex flex-col">
      <FieldGroup>
        <Controller
          name="oldPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <CustomInput
              {...field}
              variant="password"
              subVariant="password"
              error={fieldState.invalid}
              label={t('account-settings.change-password.old-password')}
              errorMessage={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="newPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <CustomInput
              {...field}
              variant="password"
              subVariant="password"
              error={fieldState.invalid}
              label={t('account-settings.change-password.new-password')}
              errorMessage={fieldState.error?.message}
              className="before:content-[''] before:block before:w-full before:h-[1px] before:bg-bg-muted before:mb-6 before:mt-2"
            />
          )}
        />

        <Controller
          name="confirmNewPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <CustomInput
              {...field}
              aria-invalid={fieldState.invalid}
              variant="password"
              subVariant="password"
              label={t('account-settings.change-password.confirm-password')}
              errorMessage={fieldState.error?.message}
            />
          )}
        />
      </FieldGroup>

      {isError && error && (
        <span className="text-sm font-medium text-text-danger mt-4 self-start">{t(error)}</span>
      )}
      {isSuccess && (
        <span className="text-sm font-medium text-text-success mt-4 self-start">
          {t('account-settings.change-password.success')}
        </span>
      )}
      <Button
        className="w-[30%] self-end mt-15"
        type="submit"
        buttonVariant="text"
        variant="primary"
        loading={isLoading}
        title="account-settings.change-password.submit-button"
      />
    </form>
  );
}
