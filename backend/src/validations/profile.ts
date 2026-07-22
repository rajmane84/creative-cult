import { z } from 'zod';
import { AvailabilityStatus, SkillLevel } from '@prisma/client';

export const updateProfileSchema = z.object({
  headline: z.string('Headline is required').optional(),
  bio: z.string('Bio is required').optional(),
  availability: z
    .enum(AvailabilityStatus, {
      error: (issue) =>
        issue.input === undefined
          ? 'Availability is required'
          : 'Invalid availability status. Must be one of: AVAILABLE, BUSY, NOT_AVAILABLE',
    })
    .optional(),
});

export const updateSkillsSchema = z.object({
  skills: z
    .array(
      z.object({
        name: z
          .string('Skill name is required')
          .min(2, 'Skill name must be at least 2 characters'),
        expertise: z
          .enum(SkillLevel, {
            error: (issue) =>
              issue.input === undefined
                ? 'Skill level is required'
                : 'Invalid skill level. Must be one of: BEGINNER, INTERMEDIATE, EXPERT',
          })
          .optional(),
      })
    )
    .min(1, 'At least one skill is required'),
});

export const updateAvailabilitySchema = z.object({
  availability: z.enum(AvailabilityStatus, {
    error: (issue) =>
      issue.input === undefined
        ? 'Availability status is required'
        : 'Invalid availability status. Must be one of: AVAILABLE, BUSY, NOT_AVAILABLE',
  }),
});
