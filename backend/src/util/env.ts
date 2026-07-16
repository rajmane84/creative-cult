import { z } from 'zod';

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url('DATABASE_URL must be a valid URL'),

  // Better Auth
  BETTER_AUTH_URL: z.string().url('BETTER_AUTH_URL must be a valid URL'),
  BETTER_AUTH_SECRET: z
    .string()
    .min(32, 'BETTER_AUTH_SECRET must be at least 32 characters'),

  // Google OAuth
  GOOGLE_CLIENT_ID: z.string().min(1, 'GOOGLE_CLIENT_ID is required'),
  GOOGLE_CLIENT_SECRET: z.string().min(1, 'GOOGLE_CLIENT_SECRET is required'),

  // Server
  PORT: z.string().default('3000').transform(Number),
  NODE_ENV: z.string().default('development'),

  // CORS
  CORS_ORIGINS: z
    .string()
    .default('http://localhost:3000,http://localhost:3001')
    .transform((val) => {
      // Try to parse as JSON array first, otherwise split by comma
      try {
        const parsed = JSON.parse(val);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch {
        // If not valid JSON, fall back to comma-separated
        console.warn(
          'CORS_ORIGINS is not valid JSON, falling back to comma-separated format'
        );
      }
      return val.split(',');
    }),
});

export const env = envSchema.parse(process.env);
