'use client';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import RegisterSubtitle from './register-subtitle';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPasswordSchema } from '../../schemas/create-password.schema';
import { TCreatePasswordFields } from '../../types/register';
import useRegister from '../../hooks/use-register';
import CustomInput from '@/shared/components/custom-input';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/components/ui/button';
import { useSearchParams, useRouter } from 'next/navigation';
import AuthFooter from '../shared/auth-footer';
import AuthError from '../shared/auth-error';
export default function CreatePassword() {
  const t = useTranslations('auth.auth-register.create-password');
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const userInfo = JSON.parse(sessionStorage.getItem(`register-user-info-${email}`) || '{}');
  console.log(userInfo);
  //mutation
  const { mutate: register, error, isPending } = useRegister();
  //errors
  const generalError = typeof error === 'string' ? error : '';
  const errors = Array.isArray(error) ? error : [];
  const passwordErrors = errors?.find((err) => err.path === 'password');
  const passwordError = passwordErrors?.messages
    ? passwordErrors?.messages.join(',')
    : passwordErrors?.message;
  const confirmPasswordError = errors?.find((err) => err.path === 'confirmPassword')?.message;
  console.log(generalError);
  //form
  const form = useForm<TCreatePasswordFields>({
    resolver: zodResolver(createPasswordSchema),
    mode: 'onChange',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });
  //function
  const onSubmit: SubmitHandler<TCreatePasswordFields> = (values) => {
    console.log({ ...userInfo, ...values });
    register({ ...userInfo, email: userInfo.email?.toLowerCase(), ...values });
  };
  return (
    <section className="flex flex-col w-full ">
      <RegisterSubtitle
        currentStep={4}
        title="title"
        subTitle="create-password.sub-title"
        registerSubTitle="create-password.create-password-sub-title"
      />
      <form
        className="pt-5"
        onSubmit={form.handleSubmit(onSubmit, (errors) => console.log('FORM ERRORS:', errors))}
      >
        <div className="flex flex-col gap-4 ">
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
                  <AuthError zodError={fieldState.error?.message} beError={passwordError} />
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
                  <AuthError zodError={fieldState.error?.message} beError={confirmPasswordError} />
                )}
              </>
            )}
          />
        </div>
        <Button
          className="w-full my-9"
          variant="primary"
          title="auth.auth-register.create-password.button"
          buttonVariant="text"
          type="submit"
          loading={isPending}
          disabled={isPending || (form.formState.isSubmitted && !form.formState.isValid)}
        />
        {/* {generalError && <p className="text-text-danger my-1">{generalError}</p>} */}
        <AuthError beError={generalError} />
        <AuthFooter
          question="auth-register.create-password.have-account"
          href="/login"
          link="auth-register.create-password.login"
        />
      </form>
    </section>
  );
}
