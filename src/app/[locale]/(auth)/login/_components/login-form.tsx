'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { TLoginData } from '@/features/auth/types/login';
import { LOGIN_SCHEMA } from '@/features/auth/schemas/login.schema';
import UseLogin from '@/features/auth/hooks/use-login';
import { FieldGroup } from '@/shared/components/ui/field';
import CustomInput from '@/shared/components/custom-input';
import ErrorAlert from '@/shared/components/error-alert';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/components/ui/button';
import { BaseCheckbox } from '@/shared/components/custom-ui/BaseCheckbox';
import { Link } from '@/i18n/navigation';

export default function LoginForm() {
  const form = useForm<TLoginData>({
    resolver: zodResolver(LOGIN_SCHEMA((key) => key)),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const t = useTranslations('login');

  const { login, isPending, error } = UseLogin();

  const onSubmit = (data: TLoginData) => {
    login(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-96  mb-14 flex flex-col">
      <FieldGroup>
        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <CustomInput
              {...field}
              variant="default"
              subVariant="username"
              id="username"
              autoComplete="username"
              className="mb-4"
              errorMessage={fieldState.error?.message}
            />
          )}
        />

        <div className="relative">
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <CustomInput
                {...field}
                variant="password"
                subVariant="password"
                id="password"
                autoComplete="current-password"
                errorMessage={fieldState.error?.message}
                className="mb-2.5"
              />
            )}
          />

          <div className="flex justify-end mb-2.5">
            <Link href="/forget-password" className="text-sm font-semibold text-text-primary ">
              {t('forgot-password')}
            </Link>
          </div>
        </div>

        {error && <ErrorAlert errorMessage={error || 'Something went wrong'} />}
      </FieldGroup>

      <BaseCheckbox
        onChange={function (isChecked: boolean): void {
          throw new Error('Function not implemented.');
        }}
        list={[{ id: 'remember-me', label: t('remember-me') }]}
      />

      <Button
        type="submit"
        variant="primary"
        className="mt-9 w-full"
        title="login.submit-btn"
        buttonVariant="text"
        loading={isPending}
      />
    </form>
  );
}
