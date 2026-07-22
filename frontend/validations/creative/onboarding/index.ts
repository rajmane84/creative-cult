import { z } from 'zod';
import { Degree } from '@/types';

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

// ------------------------------- Education schema -----------------------------------------

export const educationSchema = z.object({
  school: z
    .string('School / University is required')
    .min(2, 'School name must be at least 2 characters'),
  degree: z.enum(Degree, {
    error: (issue) =>
      issue.input === undefined
        ? 'Degree is required'
        : 'Please select a valid degree',
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

export type Education = z.infer<typeof educationSchema>;

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
  education: z.array(educationSchema).optional(),
  resumeUrl: z.string().optional(),
  resumePublicId: z.string().optional(),
});

export type CreativeOnboardingFormData = z.infer<
  typeof creativeOnboardingSchema
>;
