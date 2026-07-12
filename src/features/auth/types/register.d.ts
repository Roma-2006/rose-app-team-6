import { UserInfoSchema } from '../schemas/user-info.schema';
import { TUser } from './user';
import { createPasswordSchema } from './../schemas/create-password.schema';
import { ValidationError } from '@/shared/types/api';

interface RegisterPageProps {
  params:
    | Promise<{
        register: string[];
      }>
    | {
        register: string[];
      };
}

export type TRegisterStepsProps = {
  steps: string[];
};
//userInfo
export type TUserInfoFields = z.infer<typeof UserInfoSchema>;
export type TUserInfoFormProps = {
  firstNameError?: string;
  lastNameError?: string;
  userNameError?: string;
  genderError?: string;
  email: string;
  userInfo: TUserInfoFields;
  setUserInfo: (userInfo: TUserInfoFields) => void;
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

//creatPassword
export type TCreatePasswordFields = z.infer<typeof createPasswordSchema>;
export type TCreatePasswordProps = {
  userInfo: TUserInfoFields;
} & TUseRegisterProps;
export type TUseRegisterProps = {
  setErrors: (errors: ValidationError[]) => void;
  setUserInfo: (userInfo: TUserInfoFields) => void;
};
