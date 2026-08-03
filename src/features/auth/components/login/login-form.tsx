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
  const tLogin = useTranslations('auth.login');
  const tInput = useTranslations('custom-input');
  const form = useForm<TLoginData>({
    resolver: zodResolver(LOGIN_SCHEMA(tLogin)),
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
  });

  const { handleLogin, isLoading, status, error } = useLogin();

  const onSubmit = (data: TLoginData) => {
    handleLogin(data);
  };

  return (
    <>
      {status !== 'authenticated' && (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-101.5   mb-7 flex flex-col justify-center     "
        >
          <FieldGroup>
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <CustomInput
                  {...field}
                  variant="default"
                  disabled={isLoading}
                  error={fieldState.invalid}
                  subVariant="user-name"
                  id="username"
                  autoComplete="user-name"
                  placeholder={tInput('default.user-name.placeholder')}
                  label={tInput('default.user-name.label')}
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
                    error={fieldState.invalid}
                    disabled={isLoading}
                    autoComplete="current-password"
                    placeholder={tInput('password.password.placeholder')}
                    label={tInput('password.password.label')}
                    errorMessage={fieldState.error?.message}
                    className="mb-2.5 "
                  />
                )}
              />

              <div className="flex justify-end mb-2.5">
                <Link href="forgot-password" className="text-sm font-semibold text-text-primary ">
                  {tLogin('forgot-password')}
                </Link>
              </div>
            </div>

            {error && <ErrorAlert errorMessage={error || 'Something went wrong'} />}
          </FieldGroup>

          <Controller
            name="rememberMe"
            control={form.control}
            render={({ field, fieldState }) => (
              <BaseCheckbox
                // value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                list={[{ id: 'remember-me', label: tLogin('rememberMe') }]}
              />
            )}
          />

          <Button
            type="submit"
            variant="primary"
            className="mt-9 w-full"
            title="auth.login.button"
            buttonVariant="text"
            loading={isLoading}
            disabled={isLoading}
          />
        </form>
      )}
    </>
  );
}
