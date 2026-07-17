import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from './util/prisma';
import { env } from './util/env';
import { customSession } from 'better-auth/plugins';

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  trustedOrigins: env.CORS_ORIGINS,
  advanced: {
    useSecureCookies: false,
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: false,
      },
      username: {
        type: 'string',
        required: false,
      },
    },
  },
  plugins: [
    customSession(async ({ user, session }) => {
      const creativeProfile = await prisma.creativeProfile.findUnique({
        where: { userId: user.id },
      });
      return {
        user: { ...user, creativeProfile },
        session,
      };
    }),
  ],
});
