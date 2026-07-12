import { TRegisterStepsProps, TUserInfoFields } from '../../types/register';
import { OtpForm } from '@/features/auth/components/register/otp-form';
import { RegisterEmailForm } from '@/features/auth/components/register/register-email-from';
import CreatePassword from '@/features/auth/components/register/create-password';
import UserInfoForm from '@/features/auth/components/register/user-info.form';
import { useState } from 'react';
import { ValidationError } from '@/shared/types/api';
export default function RegisterSteps({ steps }: TRegisterStepsProps) {
  const [userInfo, setUserInfo] = useState<TUserInfoFields>({});
  const [email, setEmail] = useState<string>('');
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const genderError = errors?.find((err) => err.path === 'gender')?.message;
  const userNameErrors = errors?.find((err) => err.path === 'username');
  const userNameError = userNameErrors?.messages
    ? userNameErrors.messages.join(',')
    : userNameErrors?.message;
  const lastNameError = errors?.find((err) => err.path === 'lastName')?.message;
  const firstNameError = errors?.find((err) => err.path === 'firstName')?.message;

  // 1.register
  if (steps.length === 0 || (steps[0] === 'register' && steps.length === 1)) {
    return <RegisterEmailForm />;
  }
  // 2.register/otp
  if (steps[0] === 'otp' || (steps[0] === 'register' && steps[1] === 'otp')) {
    return <OtpForm />;
  }

  // 3./register/userInfo
  if (steps[0] === 'user-info' || (steps[0] === 'register' && steps[1] === 'user-info')) {
    return (
      <UserInfoForm
        firstNameError={firstNameError}
        lastNameError={lastNameError}
        userNameError={userNameError}
        genderError={genderError}
        email={email}
        setUserInfo={setUserInfo}
        userInfo={userInfo}
      />
    );
  }
  // 4./register/create-password
  if (
    steps[0] === 'create-password' ||
    (steps[0] === 'register' && steps[1] === 'create-password')
  ) {
    return <CreatePassword userInfo={userInfo} setErrors={setErrors} setUserInfo={setUserInfo} />;
  }
}
