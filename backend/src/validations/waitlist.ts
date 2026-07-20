import { z } from 'zod';
import { JoinAs } from '@prisma/client';

export const waitlistSchema = z.object({
  email: z
    .string('Email is required')
    .email('Please enter a valid email address'),
  joinAs: z.enum(JoinAs, {
    error: (issue) =>
      issue.input === undefined
        ? 'JoinAs role is required'
        : 'JoinAs must be one of: FREELANCER, COLLECTIVE, CLIENT',
  }),
});
