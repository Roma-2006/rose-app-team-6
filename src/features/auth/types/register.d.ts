import { UserInfoSchema } from '../schemas/user-info.schema';
import { TUser } from './user';
import { createPasswordSchema } from './../schemas/create-password.schema';
import { ValidationError } from '@/shared/types/api';

export type TRegisterStepsProps = 'register' | 'otp' | 'user-info' | 'create-password';
//register
export type TRegisterEmailFormProps = {
  setEmail: (email: string) => void;
  setStep: (step: TRegisterStepsProps) => void;
  verifyError?: string;
};
type EmailProps = {
  email: string;
};
//otp
export type TOtpFormProps = {
  email: string;
  setStep: (step: TRegisterStepsProps) => void;
};
type OTPSectionProps = {
  onResend: () => Promise<boolean>;
};
export interface ConfirmEmailVerificationRequest {
  email: string;
  code: string;
}
//userInfo
export type TUserInfoFields = z.infer<typeof UserInfoSchema>;
export type TUserInfoFormProps = {
  firstNameError?: string;
  lastNameError?: string;
  userNameError?: string;
  genderError?: string;
  phoneError?: string;
  email: string;
  userInfo: TUserInfoFields;
  setUserInfo: (userInfo: TUserInfoFields) => void;
  setStep: (step: TRegisterStepsProps) => void;
};

export type TRegisterFields = TUserInfoFields & TCreatPasswordFields;

export type TRegisterResponse = {
  user: TUser;
  token: string;
};
//subTitle
export type RegisterSubtitleProps = {
  currentStep: number;
  title: string;
  subTitle: string;
  registerSubTitle: string;
};

//createPassword
export type TCreatePasswordFields = z.infer<typeof createPasswordSchema>;
export type TCreatePasswordProps = {
  userInfo: TUserInfoFields;
} & TUseRegisterProps;
export type TUseRegisterProps = {
  setErrors: (errors: ValidationError[]) => void;
  setUserInfo: (userInfo: TUserInfoFields) => void;
  setStep: (step: TRegisterStepsProps) => void;
};
