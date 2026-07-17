import { z } from 'zod';

// ------------------------------- Skill schema -----------------------------------------

const skillSchema = z.object({
  name: z
    .string()
    .min(2, 'Skill name must be at least 2 characters')
    .max(50, 'Skill name must be less than 50 characters'),
  expertise: z.enum(
    ['BEGINNER', 'INTERMEDIATE', 'EXPERT'],
    'Please select a valid expertise level'
  ),
});

export type Skill = z.infer<typeof skillSchema>;

// ------------------------------- Creative onboarding schema -----------------------------------------

export const creativeOnboardingSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores'
    ),
  headline: z.string().optional(),
  bio: z.string().optional(),
  skills: z.array(skillSchema).optional(),
});

export type CreativeOnboardingFormData = z.infer<
  typeof creativeOnboardingSchema
>;
