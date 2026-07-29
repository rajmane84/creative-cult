import type { Request, Response } from 'express';
import { Role } from '@prisma/client';
import { prisma } from '../util/prisma';
import { asyncHandler } from '../middlewares/asyncHandler';
import { getLocationFromRequest } from '../util/geolocation';
import { ApiResponse } from '../util/response/ApiResponse';

export const handleUpdateUserRole = asyncHandler(
  async (req: Request, res: Response) => {
    const { role } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: req.user!.id },
      data: { role },
    });

    // Choosing the CLIENT role is what makes someone a client - create the
    // profile row here so a client always has one, since (unlike creatives)
    // there is no separate onboarding step that creates it later.
    if (role === Role.CLIENT) {
      await prisma.clientProfile.upsert({
        where: { userId: req.user!.id },
        create: {
          userId: req.user!.id,
          location: getLocationFromRequest(req),
          onboardingCompleted: true,
        },
        update: {},
      });
    }

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
