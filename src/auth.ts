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
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
        rememberMe: { label: 'Remember me', type: 'text' },
      },
      authorize: async (credentials) => {
        const t = await getTranslations('auth.login');

        const isRememberMe = String(credentials?.rememberMe) === 'true';

        const result = LOGIN_SCHEMA(t).safeParse({
          username: credentials?.username,
          password: credentials?.password,
          rememberMe: isRememberMe,
        });
        if (!result.success) {
          console.error('❌ Zod Validation Failed:', result.error.format());
          return null;
        }

        try {
          const data = await login(result.data);
          if (!data.status) {
            throw new Error(data.message || 'Login failed');
          }

          const { user, token } = data.payload ?? {};

          if (!user || !token) {
            return null;
          }

          return {
            id: String(user.id),
            user,
            token,
            rememberMe: isRememberMe,
          };
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Login failed';
          console.error('❌ Credentials authorize failed:', message);
          throw new Error(message);
        }
      },
    }),
  ],

  callbacks: {
    jwt: ({ token, user, trigger, session }) => {
      if (user) {
        token.user = user.user;
        token.token = user.token;
        token.rememberMe = user.rememberMe;
      }
      if (trigger === 'update' && session) {
        token.user = {
          ...token.user,
          ...session,
        };
      }
      if (token.rememberMe) {
        token.exp = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;
      } else if (!token.exp) {
        token.exp = Math.floor(Date.now() / 1000) + 1 * 24 * 60 * 60;
      }

      return token;
    },

    session: ({ session, token }) => {
      if (token) {
        session.user = token.user;
        session.token = token.token;
      }

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
