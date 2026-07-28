import { z } from 'zod';

// ------------------------------- Profile header schema -----------------------------------------

export const profileHeaderSchema = z.object({
  headline: z
    .string()
    .max(100, 'Headline must be less than 100 characters')
    .optional(),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
});

export type ProfileHeaderFormData = z.infer<typeof profileHeaderSchema>;
