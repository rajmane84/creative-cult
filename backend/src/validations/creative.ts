import { z } from 'zod';
import { SkillLevel, Degree, EmploymentType } from '@prisma/client';

export const educationItemSchema = z.object({
  school: z
    .string('School name is required')
    .min(2, 'School name must be at least 2 characters'),
  degree: z.enum(Degree, {
    error: (issue) =>
      issue.input === undefined ? 'Degree is required' : 'Invalid degree type',
  }),
  fieldOfStudy: z
    .string('Field of study is required')
    .min(2, 'Field of study must be at least 2 characters'),
  country: z
    .string('Country is required')
    .min(2, 'Country must be at least 2 characters'),
  yearOfGraduation: z
    .string('Graduation year is required')
    .regex(
      /^(19|20)\d{2}$/,
      'Please enter a valid 4-digit graduation year (e.g. 2024)'
    ),
});

export const experienceItemSchema = z.object({
  title: z
    .string('Title is required')
    .min(2, 'Title must be at least 2 characters'),
  employmentType: z.enum(EmploymentType, {
    error: (issue) =>
      issue.input === undefined
        ? 'Employment type is required'
        : 'Invalid employment type',
  }),
  companyName: z
    .string('Company name is required')
    .min(1, 'Company name is required'),
  industry: z.string('Industry is required').min(1, 'Industry is required'),
  startDate: z.coerce.date('Start date is required'),
  endDate: z.coerce.date().optional(),
  currentlyWorking: z.boolean().default(false),
  description: z.string().optional(),
  skills: z.array(z.string()).default([]),
});

export const creativeOnboardingSchema = z.object({
  username: z
    .string('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores'
    ),
  headline: z.string().optional(),
  bio: z.string().optional(),
  skills: z
    .array(
      z.object({
        name: z.string('Skill name is required'),
        expertise: z
          .enum(SkillLevel, {
            error: () => 'Invalid skill level',
          })
          .optional(),
      })
    )
    .optional(),
  education: z.array(educationItemSchema).optional(),
  experience: z.array(experienceItemSchema).optional(),
  resumeUrl: z.string().optional(),
  resumePublicId: z.string().optional(),
});
