'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { TLoginData } from '@/features/auth/types/login';
import { LOGIN_SCHEMA } from '@/features/auth/schemas/login.schema';
import useLogin from '@/features/auth/hooks/use-login';
import { FieldGroup } from '@/shared/components/ui/field';
import CustomInput from '@/shared/components/custom-input';
import ErrorAlert from '@/shared/components/error-alert';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/components/ui/button';
import { BaseCheckbox } from '@/shared/components/custom-ui/BaseCheckbox';
import { Link } from '@/i18n/navigation';

export default function LoginForm() {
  const tLogin = useTranslations('login');
  const tInput = useTranslations('custom-input');
  const form = useForm<TLoginData>({
    resolver: zodResolver(LOGIN_SCHEMA(tLogin)),
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
  });

  const { handleLogin, isLoading, session, status, error } = useLogin();

  const onSubmit = (data: TLoginData) => {
    handleLogin(data);
  };

  return (
    <>
      {status === 'authenticated' && session && null}

      {status !== 'authenticated' && (
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full mb-14 flex flex-col">
          <FieldGroup>
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <CustomInput
                  {...field}
                  variant="default"
                  disabled={isLoading}
                  subVariant="username"
                  id="username"
                  autoComplete="username"
                  placeholder={tInput('default.username.placeholder')}
                  label={tInput('default.username.label')}
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
                    disabled={isLoading}
                    autoComplete="current-password"
                    placeholder={tInput('password.password.placeholder')}
                    label={tInput('password.password.label')}
                    errorMessage={fieldState.error?.message}
                    className="mb-2.5"
                  />
                )}
              />

              <div className="flex justify-end mb-2.5">
                <Link href="/forget-password" className="text-sm font-semibold text-text-primary ">
                  {tLogin('forgot-password')}
                </Link>
              </div>
            </div>

            {error && <ErrorAlert errorMessage={error || 'Something went wrong'} />}
          </FieldGroup>

          <Controller
            name="rememberMe"
            control={form.control}
            render={({ field }) => (
              <BaseCheckbox
                onChange={(isChecked: boolean) => {
                  if (field.value !== isChecked) {
                    setTimeout(() => {
                      field.onChange(isChecked);
                    }, 0);
                  }
                }}
                list={[{ id: 'remember-me', label: tLogin('remember-me') }]}
              />
            )}
          />

          <Button
            type="submit"
            variant="primary"
            className="mt-9 w-full"
            title="login.submit-btn"
            buttonVariant="text"
            loading={isLoading}
            disabled={isLoading}
          />
        </form>
      )}
    </>
  );
}
