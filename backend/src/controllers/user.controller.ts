import type { Request, Response } from 'express';
import { prisma } from '../util/prisma';
import { asyncHandler } from '../middlewares/asyncHandler';

import { ApiResponse } from '../util/response/ApiResponse';

export const handleUpdateUserRole = asyncHandler(
  async (req: Request, res: Response) => {
    const { role } = req.body;

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

    const existingUser = await prisma.user.findUnique({
      where: { username: username as string },
    });

    return ApiResponse.success(res, {
      available: !existingUser,
    });
  }
);
