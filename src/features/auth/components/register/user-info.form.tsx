'use client';
import CustomInput from '@/shared/components/custom-input';
import { Button } from '@/shared/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations, useLocale } from 'next-intl';
import { Controller } from 'react-hook-form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TUserInfoFields, TUserInfoFormProps } from '../../types/register';
import SelectGender from '@/shared/components/custom-ui/select-gender';
import RegisterSubtitle from './register-subtitle';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { userInfoSchema } from '../../schemas/user-info.schema';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AuthFooter from '../shared/auth-footer';
import { ValidationError } from '@/shared/types/api';
import AuthError from '../shared/auth-error';
import { advanceRegistrationStep } from '@/features/auth/lib/registeration-progress';

export default function UserInfoForm({
  firstNameError,
  lastNameError,
  userNameError,
  genderError,
  email,
  setUserInfo,
  userInfo,
  setStep,
  phoneError,
}: TUserInfoFormProps) {
  const t = useTranslations('auth.auth-register');
  const router = useRouter();
  const locale = useLocale();
  const isRtl = locale === 'ar';
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
    const userDetails = { ...values, email: email, gender: values.gender.toUpperCase() };
    setUserInfo(userDetails);
    setStep('create-password');
  };
  useEffect(() => {
    if (!email) return;
    if (userInfo) {
      form.reset({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        username: userInfo.username,
        phone: userInfo.phone,
        gender: userInfo.gender
          ? userInfo.gender.charAt(0).toUpperCase() + userInfo.gender.slice(1).toLowerCase()
          : '',
      });
      form.trigger();
    }
  }, [form, email, userInfo]);
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
                    error={fieldState.invalid || !!firstNameError}
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
                    error={fieldState.invalid || !!lastNameError}
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
                  error={fieldState.invalid || !!userNameError}
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
                  error={fieldState.invalid || !!phoneError}
                />
                {(fieldState.error || phoneError) && (
                  <AuthError zodError={fieldState.error?.message} beError={phoneError} />
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
