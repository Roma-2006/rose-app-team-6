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

        const data = await login(result.data);

        if (!data.status) {
          throw new Error(data.message);
        }

        const { user, token } = data.payload ?? {};

        if (!user || !token) {
          return null;
        }

        // هنا نرجع الهيكل المطابق تماماً لتعريف الـ Interface الخاص بك
        return {
          id: String(user.id),
          user: user, // يتوافق مع user: UserType
          token: token, // يتوافق مع token: string
          rememberMe: isRememberMe,
        };
      },
    }),
  ],

  callbacks: {
    jwt: ({ token, user }) => {
      // الـ user هنا يملك الآن التايب الصحيح تلقائياً بفضل الـ Augmentation
      if (user) {
        token.user = user.user;
        token.token = user.token;
        token.rememberMe = user.rememberMe;

        if (user.rememberMe) {
          token.exp = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60; // 30 days
        } else {
          token.exp = Math.floor(Date.now() / 1000) + 1 * 24 * 60 * 60; // 1 day
        }
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
