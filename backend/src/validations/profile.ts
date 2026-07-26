import { z } from 'zod';
import {
  AvailabilityStatus,
  SkillLevel,
  Degree,
  EmploymentType,
} from '@prisma/client';

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

export const updateEducationSchema = z.object({
  education: z.array(
    z.object({
      school: z
        .string('School / University is required')
        .min(2, 'School name must be at least 2 characters'),
      degree: z.enum(Degree, {
        error: (issue) =>
          issue.input === undefined ? 'Degree is required' : 'Invalid degree',
      }),
      fieldOfStudy: z
        .string('Field of study is required')
        .min(2, 'Field of study must be at least 2 characters'),
      country: z
        .string('Country is required')
        .min(2, 'Country must be at least 2 characters'),
      yearOfGraduation: z
        .string('Graduation year is required')
        .regex(/^(19|20)\d{2}$/, 'Enter a valid 4-digit graduation year'),
    })
  ),
});

export const updateExperienceSchema = z.object({
  experiences: z.array(
    z.object({
      title: z
        .string('Title is required')
        .min(2, 'Title must be at least 2 characters'),
      employmentType: z.enum(EmploymentType, {
        error: (issue) =>
          issue.input === undefined
            ? 'Employment type is required'
            : 'Invalid employment type',
      }),
      companyName: z.string().optional(),
      industry: z.string().optional(),
      startDate: z.coerce.date('Start date is required'),
      endDate: z.coerce.date().optional(),
      currentlyWorking: z.boolean().default(false),
      description: z.string().optional(),
      skills: z.array(z.string()).default([]),
    })
  ),
});
