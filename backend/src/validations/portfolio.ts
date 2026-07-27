import { z } from 'zod';
import { PortfolioOwnerType } from '@prisma/client';

export const createPortfolioItemSchema = z
  .object({
    title: z
      .string('Title is required')
      .min(2, 'Title must be at least 2 characters')
      .max(100, 'Title must be at most 100 characters'),
    description: z
      .string()
      .max(2000, 'Description must be at most 2000 characters')
      .optional(),
    coverImageUrl: z.string().optional(),
    mediaUrls: z.array(z.string()).max(30, 'Too many media items').optional(),
    tags: z
      .preprocess(
        (value) =>
          value === undefined
            ? undefined
            : Array.isArray(value)
              ? value
              : [value],
        z.array(z.string()).max(20, 'Too many tags')
      )
      .optional(),
    projectDate: z.coerce.date().optional(),
    ownerType: z.enum(PortfolioOwnerType, {
      error: (issue) =>
        issue.input === undefined
          ? 'ownerType is required'
          : 'ownerType must be FREELANCER or CULT',
    }),
    cultId: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.ownerType === PortfolioOwnerType.CULT && !data.cultId) {
      ctx.addIssue({
        code: 'custom',
        message: 'cultId is required when ownerType is CULT',
        path: ['cultId'],
      });
    }

    if (data.ownerType === PortfolioOwnerType.FREELANCER && data.cultId) {
      ctx.addIssue({
        code: 'custom',
        message: 'cultId must not be provided when ownerType is FREELANCER',
        path: ['cultId'],
      });
    }
  });

export const updatePortfolioItemSchema = z.object({
  title: z
    .string()
    .min(2, 'Title must be at least 2 characters')
    .max(100, 'Title must be at most 100 characters')
    .optional(),
  description: z
    .string()
    .max(2000, 'Description must be at most 2000 characters')
    .optional(),
  coverImageUrl: z.string().optional(),
  mediaUrls: z.array(z.string()).max(30, 'Too many media items').optional(),
  tags: z.array(z.string()).max(20, 'Too many tags').optional(),
  projectDate: z.coerce.date().optional(),
});

export const portfolioQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1).optional(),
  limit: z.coerce.number().min(1).max(100).default(10).optional(),
});

export const addPortfolioCreditSchema = z
  .object({
    targetUsername: z
      .string('Target username is required')
      .min(1, 'Target username is required')
      .optional(),
    targetEmailId: z
      .string('Target email ID is required')
      .email('Invalid email address')
      .optional(),
    role: z.string().max(50, 'Role must be at most 50 characters').optional(),
  })
  .superRefine((data, ctx) => {
    const hasUsername = !!data.targetUsername;
    const hasEmailId = !!data.targetEmailId;

    if (!hasUsername && !hasEmailId) {
      ctx.addIssue({
        code: 'custom',
        message: 'Either targetUsername or targetEmailId is required',
        path: ['targetEmailId'],
      });
    }

    if (hasUsername && hasEmailId) {
      ctx.addIssue({
        code: 'custom',
        message:
          'Provide only one of targetUsername or targetEmailId, not both',
        path: ['targetEmailId'],
      });
    }
  });

export const respondPortfolioCreditSchema = z.object({
  action: z.enum(['ACCEPT', 'DECLINE'], {
    error: (issue) =>
      issue.input === undefined
        ? 'Action is required'
        : 'Invalid action. Must be ACCEPT or DECLINE',
  }),
});
