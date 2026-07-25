import { z } from 'zod';
import { CultMemberRole } from '@prisma/client';

export const createCultSchema = z.object({
  name: z
    .string('Cult name is required')
    .min(2, 'Cult name must be at least 2 characters')
    .max(50, 'Cult name must be at most 50 characters'),
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .max(60, 'Slug must be at most 60 characters')
    .regex(
      /^[a-z0-9-]+$/,
      'Slug can only contain lowercase letters, numbers, and hyphens'
    )
    .optional(),
  tagline: z
    .string()
    .max(150, 'Tagline must be at most 150 characters')
    .optional(),
  bio: z.string().max(1000, 'Bio must be at most 1000 characters').optional(),
  avatarUrl: z.string().optional(),
});

export const updateCultSchema = z.object({
  name: z
    .string()
    .min(2, 'Cult name must be at least 2 characters')
    .max(50, 'Cult name must be at most 50 characters')
    .optional(),
  tagline: z
    .string()
    .max(150, 'Tagline must be at most 150 characters')
    .optional(),
  bio: z.string().max(1000, 'Bio must be at most 1000 characters').optional(),
  avatarUrl: z.string().optional(),
});

export const updateMemberRoleSchema = z.object({
  role: z.enum(CultMemberRole, {
    error: (issue) =>
      issue.input === undefined
        ? 'Role is required'
        : 'Invalid cult member role',
  }),
});

export const cultQuerySchema = z.object({
  search: z.string().optional(),
  skill: z.string().optional(),
  page: z.coerce.number().min(1).default(1).optional(),
  limit: z.coerce.number().min(1).max(100).default(10).optional(),
});

export const respondInviteSchema = z.object({
  action: z.enum(['ACCEPT', 'DECLINE'], {
    error: (issue) =>
      issue.input === undefined
        ? 'Action is required'
        : 'Invalid action. Must be ACCEPT or DECLINE',
  }),
});

export const createCultInviteSchema = z
  .object({
    targetUsername: z
      .string('Target username is required')
      .min(1, 'Target username is required')
      .optional(),
    targetEmailId: z
      .string('Target email ID is required')
      .email('Invalid email address')
      .optional(),
    message: z
      .string()
      .max(500, 'Message must be at most 500 characters')
      .optional(),
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
