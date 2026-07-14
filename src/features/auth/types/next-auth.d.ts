import 'next-auth';
import 'next-auth/jwt';
import { User as UserType } from './user';

declare module 'next-auth' {
  interface User {
    user: UserType;
    token: string;
    rememberMe?: boolean;
  }

  interface Session {
    user: UserType;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: UserType;
    token: string;
    rememberMe?: boolean;
  }
}
