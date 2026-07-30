import { z } from 'zod';

export const createReviewSchema = z.object({
  rating: z
    .number('Rating is required')
    .int('Rating must be a whole number')
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5'),
  comment: z
    .string()
    .max(1000, 'Comment must be at most 1000 characters')
    .optional(),
});

export const reviewQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1).optional(),
  limit: z.coerce.number().min(1).max(100).default(10).optional(),
});
