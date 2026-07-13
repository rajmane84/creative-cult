import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from './util/prisma';
import { env } from './util/env';

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
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
    },
  },
});
