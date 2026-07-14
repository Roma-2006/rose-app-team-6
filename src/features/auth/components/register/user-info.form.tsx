'use client';
import CustomInput from '@/shared/components/custom-input';
import { Button } from '@/shared/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations, useLocale } from 'next-intl';
import { Controller } from 'react-hook-form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TUserInfoFields } from '../../types/register';
import SelectGender from '@/shared/components/custom-ui/select-gender';
import RegisterSubtitle from './register-subtitle';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { userInfoSchema } from '../../schemas/user-info.schema';
import { useEffect, useState } from 'react';
import AuthFooter from '../shared/auth-footer';
import { ValidationError } from '@/shared/types/api';
import AuthError from '../shared/auth-error';
import { useRouter } from '@/i18n/navigation';
import { goToCreatePassword } from '../../actions/register-step.action';

export default function UserInfoForm({ email }: EmailProps) {
  const t = useTranslations('auth.auth-register');
  const router = useRouter();
  const locale = useLocale();
  const isRtl = locale === 'ar';

  //mutation
  console.log('email:', email);
  const getStoredErrors = (): ValidationError[] => {
    if (typeof window === 'undefined') return [];
    const storedError = sessionStorage.getItem('register-error');
    if (storedError && storedError !== 'undefined') {
      return JSON.parse(storedError);
    }
    return [];
  };
  const [errors] = useState<ValidationError[]>(() => {
    const result = getStoredErrors();
    return Array.isArray(result) ? result : [];
  });
  const genderError = errors?.find((err) => err.path === 'gender')?.message;
  const userNameErrors = errors?.find((err) => err.path === 'username');
  const userNameError = userNameErrors?.messages
    ? userNameErrors.messages.join(',')
    : userNameErrors?.message;
  const lastNameError = errors?.find((err) => err.path === 'lastName')?.message;
  const firstNameError = errors?.find((err) => err.path === 'firstName')?.message;
  //form
  const form = useForm<TUserInfoFields>({
    resolver: zodResolver(userInfoSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      gender: '',
      phone: '',
    },
  });
  //function
  const onSubmit: SubmitHandler<TUserInfoFields> = async (values) => {
    if (!email) return;
    const userInfo = { ...values, email: email, gender: values.gender.toUpperCase() };
    // Persist user information between registration steps.
    // The flow spans multiple pages and may redirect back after server validation.

    sessionStorage.setItem(`register-user-info-${email}`, JSON.stringify(userInfo));

    await goToCreatePassword(email);
    router.push(`/register/create-password?email=${encodeURIComponent(email)}`);
  };
  useEffect(() => {
    if (!email) return;
    const userInfo = sessionStorage.getItem(`register-user-info-${email}`);
    if (userInfo) {
      const data = JSON.parse(userInfo);
      form.reset({
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        phone: data.phone,
        gender: data.gender
          ? data.gender.charAt(0).toUpperCase() + data.gender.slice(1).toLowerCase()
          : '',
      });
      form.trigger();
    }
  }, [form, email]);
  return (
    <section className="flex flex-col ">
      <RegisterSubtitle
        currentStep={3}
        title="title"
        subTitle="user-info.sub-title"
        registerSubTitle="user-info.user-info-sub-title"
      />
      <form className="pt-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 ">
          <div className="flex gap-5 justify-between ">
            {/* first-name*/}
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
                    label={t('user-info.first-name')}
                  />
                  {(fieldState.error || firstNameError) && (
                    <AuthError zodError={fieldState.error?.message} beError={firstNameError} />
                  )}
                </div>
              )}
            />
            {/* last-name */}
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
                    label={t('user-info.last-name')}
                  />
                  {(fieldState.error || lastNameError) && (
                    <AuthError zodError={fieldState.error?.message} beError={lastNameError} />
                  )}
                </div>
              )}
            />
          </div>
          {/* user-name */}
          <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
              <>
                <CustomInput
                  {...field}
                  aria-invalid={fieldState.invalid}
                  variant="default"
                  subVariant="user-name"
                  label={t('user-info.user-name')}
                />
                {(fieldState.error || userNameError) && (
                  <AuthError zodError={fieldState.error?.message} beError={userNameError} />
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
                  label={t('user-info.phone')}
                />
                {fieldState.error && <AuthError zodError={fieldState.error?.message} />}
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
                  <AuthError zodError={fieldState.error?.message} beError={genderError} />
                )}
              </>
            )}
          />
          {/* password */}
        </div>
        <Button
          className="w-full my-9"
          variant="primary"
          title="button.next"
          rightIcon={isRtl ? <ArrowLeft /> : <ArrowRight />}
          buttonVariant="text"
          type="submit"
          disabled={(form.formState.isSubmitted && !form.formState.isValid) || !email}
        />
        <AuthFooter
          question="auth-register.need-help"
          href="/contact"
          link="auth-register.contact-us"
        />
      </form>
    </section>
  );
}
