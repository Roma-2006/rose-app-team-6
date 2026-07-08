import { creatPasswordSchema } from '../schemas/creat-password.schema';
import { UserInfoSchema } from '../schemas/user-info.schema';
import { TUser } from './user';

export type TUserInfoFields = z.infer<typeof UserInfoSchema>;

export type TRegisterFields = TUserInfoFields & TCreatPasswordFields;

export type TRegisterResponse = {
  user: TUser;
  token: string;
};

export type RegisterSubtitleProps = {
  currentStep: number;
  title: string;
  subTitle: string;
  registerSubTitle: string;
};

//creatPassword
export type TCreatPasswordFields = z.infer<typeof creatPasswordSchema>;
