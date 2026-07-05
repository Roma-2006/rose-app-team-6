import type { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { login } from '@/features/auth/apis/login.api';
import { loginSchema } from '@/features/auth/schemas/login.schema';
import { getTranslations } from 'next-intl/server';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      /**
       * Authenticates a user using the Credentials provider.
       *
       * The credentials are validated locally with Zod before calling the API.
       */
      authorize: async (credentials) => {
        const t = await getTranslations('login.schema');

        const result = loginSchema(t).safeParse({
          username: credentials?.username,
          password: credentials?.password,
        });

        if (!result.success) {
          throw new Error('Invalid username or password');
        }

        const data = await login(result.data);

        if (!data.status) {
          throw new Error(data.message);
        }

        const { user, token } = data.payload ?? {};

        if (!user || !token) {
          return null; // satisfy User | null
        }

        return {
          id: user.id,
          user,
          token,
        };
      },
    }),
  ],

  callbacks: {
    /**
     * Persist custom authentication data in the JWT so it survives
     * across future requests.
     */
    jwt: ({ token, user }) => {
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }
      return token;
    },

    /**
     * Make the authenticated user available through the client session.
     */
    session: ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: Number(process.env.AUTH_SESSION_MAX_AGE),
  },
};
