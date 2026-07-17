import { z } from 'zod';

export const creativeOnboardingSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores'
    ),
  // Add other fields as optional since only username is required
  headline: z.string().optional(),
  bio: z.string().optional(),
});

export type CreativeOnboardingFormData = z.infer<
  typeof creativeOnboardingSchema
>;
