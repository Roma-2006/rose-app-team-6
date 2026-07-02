import type { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { login } from '@/features/auth/apis/login.api';
import { loginSchema } from '@/features/auth/schemes/login.scheme';

/**
 * NextAuth configuration options for the application.
 *
 * Defines the credentials provider, custom pages, and JWT/session callbacks
 * used throughout the authentication flow.
 * 
 */


export const authOptions: NextAuthOptions = {
  
  pages: {
    /** Redirect unauthenticated users to the login page. */
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
       * Validates the submitted credentials against the API.
       *
       * @param credentials - The raw username and password from the sign-in form.
       * @returns The authenticated user object, or `null` if authentication fails.
       * @throws {Error} If validation fails, the API returns an error, or the
       *                 response payload is missing required fields.
       */
      authorize: async (credentials) => {
        const result = loginSchema.safeParse({
          username: credentials?.username,
          password: credentials?.password,
        });

        if (!result.success) {
          throw new Error('Invalid username or password');
        }

        console.log(process.env.AUTH_SESSION_MAX_AG)

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
     * Persists custom fields (`user`, `token`) onto the JWT after sign-in.
     *
     * Runs whenever a JWT is created or updated. The `user` object is only
     * present on the initial sign-in, so fields are written conditionally.
     *
     * @param token - The current JWT payload.
     * @param user  - The user object returned by `authorize` (only on sign-in).
     * @returns The updated JWT payload.
     */
    jwt: ({ token, user }) => {
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }
      return token;
    },

    /**
     * Exposes selected JWT fields on the client-side session object.
     *
     * Runs whenever a session is checked. Maps `token.user` onto
     * `session.user` so the client always has access to the current user.
     *
     * @param session - The current session object.
     * @param token   - The decoded JWT payload.
     * @returns The updated session object.
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
