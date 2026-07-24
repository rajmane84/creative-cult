import { z } from 'zod';

export const createCultSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Cult name must be at least 2 characters' })
    .max(50, { message: 'Cult name must be under 50 characters' }),
  tagline: z
    .string()
    .max(100, { message: 'Tagline must be under 100 characters' })
    .optional(),
  description: z
    .string()
    .max(500, { message: 'Description must be under 500 characters' })
    .optional(),
  tags: z.array(z.string()).optional(),
});

export type CreateCultFormValues = z.infer<typeof createCultSchema>;
