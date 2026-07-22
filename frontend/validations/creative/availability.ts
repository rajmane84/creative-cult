import { z } from 'zod';
import { AvailabilityStatus } from '@/types';

export const updateAvailabilitySchema = z.object({
  availability: z.enum(AvailabilityStatus, {
    error: (issue) =>
      issue.input === undefined
        ? 'Availability status is required'
        : 'Invalid availability status',
  }),
});

export type UpdateAvailabilityInput = z.infer<typeof updateAvailabilitySchema>;
