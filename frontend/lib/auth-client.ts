import { createAuthClient } from 'better-auth/react';
import {
  customSessionClient,
  inferAdditionalFields,
} from 'better-auth/client/plugins';
import type { auth } from 'backend/src/auth';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 'http://localhost:5000',
  fetchOptions: {
    credentials: 'include',
  },
  plugins: [
    inferAdditionalFields<typeof auth>(),
    customSessionClient<typeof auth>(),
  ],
});
