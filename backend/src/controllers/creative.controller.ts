import type { Request, Response } from 'express';
import { prisma } from '../util/prisma';
import { asyncHandler } from '../middlewares/asyncHandler';
import { BadRequestError } from '../util/errors/AppError';
import { ApiResponse } from '../util/response/ApiResponse';

export const handleCreativeOnboarding = asyncHandler(
  async (req: Request, res: Response) => {
    const { username, headline, bio } = req.body;

    if (!username) {
      throw new BadRequestError('Username is required');
    }

    // Check if username is already taken
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser && existingUser.id !== req.user!.id) {
      throw new BadRequestError('Username is already taken');
    }

    // Update user with username
    const updatedUser = await prisma.user.update({
      where: { id: req.user!.id },
      data: { username },
    });

    // Get or create creative profile
    let creativeProfile = await prisma.creativeProfile.findUnique({
      where: { userId: req.user!.id },
    });

    if (!creativeProfile) {
      creativeProfile = await prisma.creativeProfile.create({
        data: {
          userId: req.user!.id,
          headline,
          bio,
          onboardingCompleted: true,
        },
      });
    } else {
      creativeProfile = await prisma.creativeProfile.update({
        where: { id: creativeProfile.id },
        data: {
          headline,
          bio,
          onboardingCompleted: true,
        },
      });
    }

    return ApiResponse.success(
      res,
      {
        user: updatedUser,
        creativeProfile,
      },
      'Creative onboarding completed successfully'
    );
  }
);
