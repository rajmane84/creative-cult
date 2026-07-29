import { z } from 'zod';
import { ClientType, Industry, CompanySize } from '@prisma/client';

export const updateClientProfileSchema = z.object({
  clientType: z
    .enum(ClientType, {
      error: (issue) =>
        issue.input === undefined
          ? 'Client type is required'
          : 'Invalid client type. Must be one of: INDIVIDUAL, COMPANY',
    })
    .optional(),
  companyName: z.string('Company name is required').optional(),
  industry: z
    .enum(Industry, {
      error: () => 'Invalid industry',
    })
    .optional(),
  companySize: z
    .enum(CompanySize, {
      error: () => 'Invalid company size',
    })
    .optional(),
  foundedYear: z
    .string()
    .regex(/^(19|20)\d{2}$/, 'Enter a valid 4-digit founded year')
    .optional(),
  bio: z.string('Bio is required').optional(),
  website: z.url('Enter a valid website URL').optional().or(z.literal('')),
  phoneNumber: z.string('Phone number is required').optional(),
  location: z
    .string('Location is required')
    .max(100, 'Location must be at most 100 characters')
    .optional(),
});
