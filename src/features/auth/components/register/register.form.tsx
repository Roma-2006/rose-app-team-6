'use client';
import { Link } from '@/i18n/navigation';
import CustomInput from '@/shared/components/custom-input';
import { Button } from '@/shared/components/ui/button';
import { Combobox } from '@/shared/components/ui/combobox';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RegisterSchema } from '../../schemas/register.schema';
import { TRegisterFields } from '../../types/register';
import SelectGender from '@/shared/components/custom-ui/select-gender';
import useRegister from '../../hooks/use-register';

export default function RegisterForm() {
  const t = useTranslations('auth.register');
  //mutation
  const { mutate: register, error, isPending } = useRegister();
  //errors
  const generalError = typeof error === 'string' ? error : '';
  const errors = Array.isArray(error) ? error : [];
  const genderError = errors?.find((err) => err.path === 'gender')?.message;
  const passwordErrors = errors?.find((err) => err.path === 'password');
  const passwordError = passwordErrors?.messages
    ? passwordErrors?.messages.join(',')
    : passwordErrors?.message;
  const firstNameError = errors?.find((err) => err.path === 'username');
  const firstNameMessages = [
    'First Name must be at least 2 characters',
    'First Name can only contain letters, numbers, and underscores',
  ];
  const lastNameError = errors?.find((err) => err.path === 'lastName')?.message;
  const emailError = errors?.find((err) => err.path === 'email')?.message;
  const confirmPasswordError = errors?.find((err) => err.path === 'confirmPassword')?.message;
  console.log(generalError);
  //form
  const form = useForm<TRegisterFields>({
    resolver: zodResolver(RegisterSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });
  //function
  const onSubmit: SubmitHandler<TRegisterFields> = (values) => {
    console.log(values, 'rrrr', values.firstName);
    register({ ...values, username: values.firstName });
  };
  return (
    <form onSubmit={form.handleSubmit(onSubmit, (errors) => console.log('FORM ERRORS:', errors))}>
      <div className="flex flex-col gap-4 ">
        <div className="flex gap-5 justify-between ">
          <Controller
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <div className="basis-1/2">
                <CustomInput
                  {...field}
                  aria-invalid={fieldState.invalid}
                  variant="default"
                  subVariant="first-name"
                  label={t('first-name')}
                />
                {(fieldState.error || firstNameError) && (
                  <p className="text-text-danger mt-1">
                    {fieldState.error
                      ? fieldState.error.message
                      : firstNameError.message
                        ? firstNameMessages?.[0]
                        : firstNameMessages.join(',')}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <div className="basis-1/2">
                <CustomInput
                  {...field}
                  aria-invalid={fieldState.invalid}
                  variant="default"
                  subVariant="last-name"
                  label={t('last-name')}
                />
                {(fieldState.error || lastNameError) && (
                  <p className="text-text-danger mt-1">
                    {fieldState.error ? fieldState.error.message : lastNameError}
                  </p>
                )}
              </div>
            )}
          />
        </div>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <>
              <CustomInput
                {...field}
                aria-invalid={fieldState.invalid}
                variant="email"
                subVariant="email"
                label={t('email')}
              />
              {(fieldState.error || emailError) && (
                <p className="text-text-danger mt-1">
                  {fieldState.error ? fieldState.error.message : emailError}
                </p>
              )}
            </>
          )}
        />
        <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <>
              <CustomInput
                {...field}
                aria-invalid={fieldState.invalid}
                variant="phone"
                subVariant="phone"
                label={t('phone')}
              />
              {fieldState.error && (
                <p className="text-text-danger mt-1">{fieldState.error.message}</p>
              )}
            </>
          )}
        />
        {/* gender */}
        <Controller
          name="gender"
          control={form.control}
          render={({ field, fieldState }) => (
            <>
              <SelectGender
                {...field}
                aria-invalid={fieldState.invalid}
                value={field.value}
                onChange={field.onChange}
              />
              {(fieldState.error || genderError) && (
                <p className="text-text-danger mt-1">
                  {fieldState.error ? fieldState.error.message : genderError}
                </p>
              )}
            </>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <>
              <CustomInput
                {...field}
                aria-invalid={fieldState.invalid}
                variant="password"
                subVariant="password"
                label={t('password')}
              />
              {(fieldState.error || passwordError) && (
                <p className="text-text-danger mt-1">
                  {fieldState.error ? fieldState.error.message : passwordError}
                </p>
              )}
            </>
          )}
        />
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <>
              <CustomInput
                {...field}
                aria-invalid={fieldState.invalid}
                variant="password"
                subVariant="password"
                label={t('confirm-password')}
              />
              {(fieldState.error || confirmPasswordError) && (
                <p className="text-text-danger mt-1">
                  {fieldState.error ? fieldState.error.message : confirmPasswordError}
                </p>
              )}
            </>
          )}
        />
      </div>
      <Button
        className="w-full my-9"
        variant="primary"
        title="auth.register.button"
        buttonVariant="text"
        type="submit"
        loading={isPending}
        disabled={isPending || !form.formState.isValid}
      />
      {generalError && <p className="text-text-danger my-1">{generalError}</p>}
      <p className=" text-text-plain font-medium text-sm text-center pt-5 border-t border-border-muted ">
        {t('have-account')}{' '}
        <Link className="font-bold text-text-primary" href="/login">
          {t('login')}
        </Link>
      </p>
    </form>
  );
}
