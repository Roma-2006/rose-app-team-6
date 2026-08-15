'use client';

import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller } from 'react-hook-form';
import { CHANGE_PASS_SCHEMA } from '../schemas/change-pass.schema';
import { FieldGroup } from '@/shared/components/ui/field';
import CustomInput from '@/shared/components/custom-input';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/components/ui/button';

type FormValues = z.infer<typeof CHANGE_PASS_SCHEMA>;

// const { Changepassword, isPending } = useChangePassword();

export default function ChangePassword() {
  const t = useTranslations('change-password');

  const form = useForm<FormValues>({
    resolver: zodResolver(CHANGE_PASS_SCHEMA),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    // Changepassword(data);
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
              label={t('old-password')}
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
              label={t('new-password')}
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
              label={t('confirm-password')}
              errorMessage={fieldState.error?.message}
            />
          )}
        />
      </FieldGroup>

      <Button
        type="submit"
        buttonVariant="text"
        variant="primary"
        //  loading={isPending}
        title="change-password.submit-button"
      />
    </form>
  );
}
