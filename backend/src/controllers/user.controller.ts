import type { Request, Response } from 'express';
import { prisma } from '../util/prisma';
import { asyncHandler } from '../middlewares/asyncHandler';
import { BadRequestError, ValidationError } from '../util/errors/AppError';
import { ApiResponse } from '../util/response/ApiResponse';

export const handleUpdateUserRole = asyncHandler(
  async (req: Request, res: Response) => {
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
      where: { id: req.user!.id },
      data: { role },
    });

    return ApiResponse.success(
      res,
      updatedUser,
      'User role updated successfully'
    );
  }
);

export const handleCheckUsername = asyncHandler(
  async (req: Request, res: Response) => {
    const { username } = req.query;

    if (!username || typeof username !== 'string') {
      throw new BadRequestError('Username is required');
    }

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    return ApiResponse.success(res, {
      available: !existingUser,
    });
  }
);
