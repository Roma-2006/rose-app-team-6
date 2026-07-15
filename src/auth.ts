import type { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { login } from '@/features/auth/apis/login.api';
import { LOGIN_SCHEMA } from '@/features/auth/schemas/login.schema';
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
        rememberMe: {
          label: 'Remember me',
          type: 'text',
        },
      },
      /**
       * Authenticates a user using the Credentials provider.
       *
       * The credentials are validated locally with Zod before calling the API.
       */
      authorize: async (credentials) => {
        const t = await getTranslations('login');

        const result = LOGIN_SCHEMA(t).safeParse({
          username: credentials?.username,
          password: credentials?.password,
          rememberMe: credentials?.rememberMe === 'true',
        });

        if (!result.success) {
          // throw new Error('Invalid username or password');
          return null;
        }

        const data = await login(result.data);

        if (!data.status) {
          throw new Error(data?.message || 'Invalid username or password');
        }

        const { user, token } = data.payload ?? {};

        if (!user || !token) {
          return null; // satisfy User | null
        }

        return {
          id: user.id,
          user,
          token,
          rememberMe: credentials?.rememberMe === 'true',
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
        token.rememberMe = user.rememberMe;

        if (token.rememberMe) {
          token.exp = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60; // 30 dayes
        } else {
          token.exp = Math.floor(Date.now() / 1000) + 1 * 24 * 60 * 60; //  one day
        }
      }

      return token;
    },

    /**
     * Make the authenticated user available through the client session.
     */
    session: ({ session, token }) => {
      session.user = token.user;
      if (token.rememberMe) {
        session.expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: Number(process.env.AUTH_SESSION_MAX_AGE) || 1 * 24 * 60 * 60,
  },
};
