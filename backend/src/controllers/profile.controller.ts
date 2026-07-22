import type { Request, Response } from 'express';
import { prisma } from '../util/prisma';
import { asyncHandler } from '../middlewares/asyncHandler';
import { NotFoundError } from '../util/errors/AppError';
import { ApiResponse } from '../util/response/ApiResponse';

export const handleGetProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        image: true,
        role: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const creativeProfile = await prisma.creativeProfile.findUnique({
      where: { userId },
      include: {
        skills: {
          include: {
            skill: true,
          },
        },
        experiences: true,
        education: true,
      },
    });

    if (!creativeProfile) {
      throw new NotFoundError('Creative profile not found');
    }

    return ApiResponse.success(
      res,
      {
        user,
        creativeProfile,
      },
      'Profile retrieved successfully'
    );
  }
);

export const handleUpdateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { headline, bio, availability } = req.body;

    const creativeProfile = await prisma.creativeProfile.findUnique({
      where: { userId },
    });

    if (!creativeProfile) {
      throw new NotFoundError('Creative profile not found');
    }

    const updatedProfile = await prisma.creativeProfile.update({
      where: { id: creativeProfile.id },
      data: {
        headline: headline !== undefined ? headline : creativeProfile.headline,
        bio: bio !== undefined ? bio : creativeProfile.bio,
        availability:
          availability !== undefined
            ? availability
            : creativeProfile.availability,
      },
    });

    return ApiResponse.success(
      res,
      updatedProfile,
      'Profile updated successfully'
    );
  }
);

export const handleUpdateSkills = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { skills } = req.body;

    const creativeProfile = await prisma.creativeProfile.findUnique({
      where: { userId },
    });

    if (!creativeProfile) {
      throw new NotFoundError('Creative profile not found');
    }

    // Delete existing skills for this profile to avoid duplicates
    await prisma.creativeSkill.deleteMany({
      where: { creativeProfileId: creativeProfile.id },
    });

    // Process each skill
    for (const skillInput of skills) {
      if (!skillInput.name || skillInput.name.trim().length < 2) {
        continue; // Skip invalid skills
      }

      const skillName = skillInput.name.trim();
      const skillLevel: 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT' =
        skillInput.expertise || 'INTERMEDIATE';

      // Check if skill exists in the Skill table (case-insensitive check)
      const existingSkill = await prisma.skill.findFirst({
        where: {
          name: {
            equals: skillName,
            mode: 'insensitive',
          },
        },
      });

      let skill;
      if (existingSkill) {
        skill = existingSkill;
      } else {
        // Create slug from skill name
        const slug = skillName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');

        skill = await prisma.skill.create({
          data: {
            name: skillName,
            slug,
          },
        });
      }

      // Create CreativeSkill record connecting profile to skill
      await prisma.creativeSkill.create({
        data: {
          creativeProfileId: creativeProfile.id,
          skillId: skill.id,
          level: skillLevel,
          name: skill.name,
        },
      });
    }

    // Fetch updated profile with skills
    const updatedProfile = await prisma.creativeProfile.findUnique({
      where: { id: creativeProfile.id },
      include: {
        skills: {
          include: {
            skill: true,
          },
        },
      },
    });

    return ApiResponse.success(
      res,
      updatedProfile,
      'Skills updated successfully'
    );
  }
);

export const handleUpdateAvailability = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { availability } = req.body;

    const creativeProfile = await prisma.creativeProfile.findUnique({
      where: { userId },
    });

    if (!creativeProfile) {
      throw new NotFoundError('Creative profile not found');
    }

    const updatedProfile = await prisma.creativeProfile.update({
      where: { id: creativeProfile.id },
      data: {
        availability,
      },
    });

    return ApiResponse.success(
      res,
      updatedProfile,
      'Availability status updated successfully'
    );
  }
);
