import { z } from 'zod';
import { ClientType, Industry, CompanySize } from '@/types';

// ------------------------------- Profile header schema -----------------------------------------

export const profileHeaderSchema = z.object({
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  location: z
    .string()
    .max(100, 'Location must be less than 100 characters')
    .optional(),
});

export type ProfileHeaderFormData = z.infer<typeof profileHeaderSchema>;

// ------------------------------- Business details schema ---------------------------------------

export const businessDetailsSchema = z.object({
  clientType: z.enum(ClientType),
  companyName: z
    .string()
    .max(100, 'Company name must be less than 100 characters')
    .optional(),
  industry: z.enum(Industry).optional(),
  companySize: z.enum(CompanySize).optional(),
  foundedYear: z
    .string()
    .regex(/^(19|20)\d{2}$/, 'Enter a valid 4-digit founded year')
    .optional()
    .or(z.literal('')),
  website: z
    .string()
    .url('Enter a valid website URL')
    .optional()
    .or(z.literal('')),
  phoneNumber: z
    .string()
    .max(20, 'Phone number must be less than 20 characters')
    .optional()
    .or(z.literal('')),
});

export type BusinessDetailsFormData = z.infer<typeof businessDetailsSchema>;
