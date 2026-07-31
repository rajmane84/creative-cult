import { z } from 'zod';
import { EmploymentType } from '@/types';

export const experienceSchema = z
  .object({
    title: z
      .string('Title is required')
      .min(2, 'Title must be at least 2 characters'),
    employmentType: z.enum(EmploymentType, {
      error: (issue) =>
        issue.input === undefined
          ? 'Employment type is required'
          : 'Please select a valid employment type',
    }),
    companyName: z
      .string('Company name is required')
      .min(1, 'Company name is required'),
    industry: z.string('Industry is required').min(1, 'Industry is required'),
    startDate: z
      .string('Start date is required')
      .min(1, 'Start date is required'),
    endDate: z.string().optional(),
    currentlyWorking: z.boolean().default(false),
    description: z.string().optional(),
    skills: z.array(z.string()).default([]),
  })
  .superRefine((data, ctx) => {
    if (!data.currentlyWorking && !data.endDate) {
      ctx.addIssue({
        code: 'custom',
        message: 'End date is required unless you currently work here',
        path: ['endDate'],
      });
    }
  });

export type Experience = z.infer<typeof experienceSchema>;
