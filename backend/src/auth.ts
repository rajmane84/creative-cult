import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from './util/prisma';
import { env } from './util/env';
import { customSession } from 'better-auth/plugins';

const isProd = env.NODE_ENV === 'production';

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL, // Your backend url
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
  trustedOrigins: env.CORS_ORIGINS, // Your frontend urls
  advanced: {
    useSecureCookies: isProd,

    defaultCookieAttributes: {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
    },
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
