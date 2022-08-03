import NextAuth, { type NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { verify } from 'argon2';

import { prisma } from '../../../server/db/client';
import { loginSchema } from '../../../utils/auth-validation';
import { User } from '@prisma/client';

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'jsmith@gmail.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials, request) => {
        const creds: { email: string; password: string } =
          await loginSchema.parseAsync(credentials);

        const user: User | null = await prisma.user.findFirst({
          where: { email: creds.email },
        });

        if (!user) {
          return null;
        }

        const isValidPassword = await verify(user.password, creds.password);

        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          username: user.username,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }

      return session;
    },
  },
  jwt: {
    secret: 'super-secret',
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  pages: {
    signIn: '/',
    newUser: '/signup',
  },
};


export default NextAuth(nextAuthOptions);