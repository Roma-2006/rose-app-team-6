import { LOGIN_SCHEMA } from '../schemas/login.schema';

export type TLoginData = z.infer<typeof LOGIN_SCHEMA>;
interface BackendErrorResponse {
  status: boolean;
  code: number;
  message: string;
  payload?: string;
}
