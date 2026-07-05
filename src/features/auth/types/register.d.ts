import { RegisterSchema } from '../schemas/register.schema';
import { TUser } from './user';

export type TRegisterFields = z.infer<typeof RegisterSchema>;

export type TRegisterResponse = {
  user: TUser;
  token: string;
};
