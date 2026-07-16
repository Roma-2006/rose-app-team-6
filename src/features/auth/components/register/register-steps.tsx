'use client';
import { OtpForm } from '@/features/auth/components/register/otp-form';
import { RegisterEmailForm } from '@/features/auth/components/register/register-email-form';
import CreatePassword from '@/features/auth/components/register/create-password';
import UserInfoForm from '@/features/auth/components/register/user-info.form';
import { useState } from 'react';
import { ValidationError } from '@/shared/types/api';
import { TRegisterStepsProps, TUserInfoFields } from '@/features/auth/types/register';
export default function RegisterSteps() {
  const [step, setStep] = useState<TRegisterStepsProps>('register');
  const [userInfo, setUserInfo] = useState<TUserInfoFields | null>(null);
  const [email, setEmail] = useState<string>('');
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const genderError = errors?.find((err) => err.path === 'gender')?.message;
  const userNameErrors = errors?.find((err) => err.path === 'username');
  const userNameError = userNameErrors?.messages
    ? userNameErrors.messages.join(',')
    : userNameErrors?.message;
  const lastNameError = errors?.find((err) => err.path === 'lastName')?.message;
  const firstNameError = errors?.find((err) => err.path === 'firstName')?.message;
  const verifyError = errors?.find((err) => err.path === 'verify')?.message;
  const phoneError = errors?.find((err) => err.path === 'phone')?.message;
  return (
    <>
      {step === 'register' ? (
        <RegisterEmailForm setEmail={setEmail} setStep={setStep} verifyError={verifyError} />
      ) : step === 'otp' ? (
        <OtpForm email={email} setStep={setStep} />
      ) : step === 'user-info' ? (
        <UserInfoForm
          firstNameError={firstNameError}
          lastNameError={lastNameError}
          userNameError={userNameError}
          genderError={genderError}
          email={email}
          setUserInfo={setUserInfo}
          userInfo={userInfo}
          setStep={setStep}
          phoneError={phoneError}
        />
      ) : step === 'create-password' ? (
        <CreatePassword
          userInfo={userInfo}
          setErrors={setErrors}
          setUserInfo={setUserInfo}
          setStep={setStep}
        />
      ) : null}
    </>
  );
}
