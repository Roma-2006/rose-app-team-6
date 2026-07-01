'use client';
import { Link } from '@/i18n/navigation';
import CustomInput from '@/shared/components/custom-input';
import { Button } from '@/shared/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function RegisterForm() {
  const t = useTranslations('auth.register');
  //mutation
  const { mutate: register, error: isError, loading: isLoading } = useRegister();
  //form
  const form = useForm<TRegisterField>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      gender: '',
    },
  });
  //function
  const onSubmit: SubmitHandler<TRegisterField> = (values) => {
    console.log(values);
    register(values);
  };
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4 ">
        <div className="flex gap-5 justify-between">
          <Controller
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <CustomInput
                {...field}
                aria-invalid={fieldState.invalid}
                variant="default"
                subVariant="first-name"
                label={t('first-name')}
              />
            )}
          />
          <Controller
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <CustomInput variant="default" subVariant="last-name" label={t('last-name')} />
            )}
          />
        </div>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <CustomInput variant="email" subVariant="email" label={t('email')} />
          )}
        />
        <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <CustomInput variant="phone" subVariant="phone" label={t('phone')} />
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <CustomInput variant="password" subVariant="password" label={t('password')} />
          )}
        />
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <CustomInput variant="password" subVariant="password" label={t('confirm-password')} />
          )}
        />
      </div>
      <Button
        className="w-full my-9"
        variant="primary"
        title="auth.register.button"
        // onClick={() => console.log("hiiiiiiiiiiiiiii")}
        buttonVariant="text"
      />
      <p className=" text-text-plain font-medium text-sm text-center pt-5 border-t border-border-muted ">
        {t('have-account')}{' '}
        <Link className="font-bold text-text-primary" href="/login">
          {t('login')}
        </Link>
      </p>
    </form>
  );
}
