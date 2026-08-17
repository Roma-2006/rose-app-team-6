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

type FormValues = z.infer<ReturnType<typeof CHANGE_PASS_SCHEMA>>;

export default function ChangePassword() {
  const t = useTranslations();
  const { changePassword, isLoading } = useChangePassword();

  const schemaInstance = CHANGE_PASS_SCHEMA(t);
  const form = useForm<FormValues>({
    resolver: zodResolver(schemaInstance),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    changePassword({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
      confirmNewPassword: data.confirmNewPassword,
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full">
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
              label={t('change-password.old-password')}
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
              label={t('change-password.new-password')}
              errorMessage={fieldState.error?.message}
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
              label={t('change-password.confirm-password')}
              errorMessage={fieldState.error?.message}
            />
          )}
        />
      </FieldGroup>

      <Button
        type="submit"
        buttonVariant="text"
        variant="primary"
        loading={isLoading}
        title="change-password.submit-button"
      />
    </form>
  );
}
