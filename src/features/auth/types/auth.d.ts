import { User } from './user';
import { z } from 'zod';
import { loginSchema } from '../schemas/login.schema';

//Login
export type LoginFields = z.infer<ReturnType<typeof loginSchema>>;

// API response types
export interface LoginResponse {
  user: User;
  token: string;
}
