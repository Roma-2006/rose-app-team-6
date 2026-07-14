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

//userInfo
export type TUserInfoFields = z.infer<typeof UserInfoSchema>;

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
