import type { Request, Response } from 'express';
import { auth } from '../auth';
import { prisma } from '../util/prisma';
import { asyncHandler } from '../middlewares/asyncHandler';
import {
  UnauthorizedError,
  BadRequestError,
  ValidationError,
} from '../util/errors/AppError';
import { ApiResponse } from '../util/response/ApiResponse';

export const handleUpdateUserRole = asyncHandler(
  async (req: Request, res: Response) => {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      throw new UnauthorizedError('User session not found');
    }

    const { role } = req.body;

    if (!role) {
      throw new BadRequestError('Role is required');
    }

    if (!['CLIENT', 'CREATIVE', 'ADMIN'].includes(role)) {
      throw new ValidationError(
        'Invalid role. Must be one of: CLIENT, CREATIVE, ADMIN',
        {
          providedRole: role,
          validRoles: ['CLIENT', 'CREATIVE', 'ADMIN'],
        }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { role },
    });

    return ApiResponse.success(
      res,
      updatedUser,
      'User role updated successfully'
    );
  }
);
