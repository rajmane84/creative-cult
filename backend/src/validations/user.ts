import { z } from 'zod';
import { Role } from '@prisma/client';

export const updateUserRoleSchema = z.object({
  role: z.enum(Role, {
    error: (issue) =>
      issue.input === undefined
        ? 'Role is required'
        : 'Invalid role. Must be one of: CLIENT, CREATIVE, ADMIN',
  }),
});

export const checkUsernameSchema = z.object({
  username: z.string('Username is required').min(1, 'Username is required'),
});
