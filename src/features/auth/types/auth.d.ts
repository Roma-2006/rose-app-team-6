import { User } from './user';
import { z } from 'zod';
import { LOGIN_SCHEMA } from '../schemas/login.schema';

//Login

export type TLoginData = z.infer<typeof LOGIN_SCHEMA>;

// API response types
export interface LoginResponse {
  user: User;
  token: string;
}
