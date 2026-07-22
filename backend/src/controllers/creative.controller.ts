import type { Request, Response } from 'express';
import { prisma } from '../util/prisma';
import { asyncHandler } from '../middlewares/asyncHandler';
import { BadRequestError } from '../util/errors/AppError';
import { ApiResponse } from '../util/response/ApiResponse';
import { deleteFromCloudinary } from '../util/cloudinary';

export const handleCreativeOnboarding = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      username,
      headline,
      bio,
      skills,
      education,
      resumeUrl,
      resumePublicId,
    } = req.body;

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
          resumeUrl,
          resumeFileName: resumePublicId, // Storing publicId for now, can be updated later
          resumeUploadedAt: resumeUrl ? new Date() : null,
          onboardingCompleted: true,
        },
      });
    } else {
      // Delete old resume from Cloudinary if updating with a new one
      if (
        resumeUrl &&
        creativeProfile.resumeFileName &&
        resumePublicId !== creativeProfile.resumeFileName
      ) {
        try {
          await deleteFromCloudinary(creativeProfile.resumeFileName, 'raw');
        } catch (error) {
          console.error('Failed to delete old resume from Cloudinary:', error);
          // Continue with update even if deletion fails
        }
      }

      creativeProfile = await prisma.creativeProfile.update({
        where: { id: creativeProfile.id },
        data: {
          headline,
          bio,
          resumeUrl: resumeUrl || creativeProfile.resumeUrl,
          resumeFileName: resumePublicId || creativeProfile.resumeFileName,
          resumeUploadedAt: resumeUrl
            ? new Date()
            : creativeProfile.resumeUploadedAt,
          onboardingCompleted: true,
        },
      });
    }

    // Handle skills if provided
    if (skills && Array.isArray(skills) && skills.length > 0) {
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
    }

    // Handle education if provided
    if (education && Array.isArray(education) && education.length > 0) {
      // Delete existing education records to avoid duplicates
      await prisma.education.deleteMany({
        where: { creativeProfileId: creativeProfile.id },
      });

      await prisma.education.createMany({
        data: education.map((item: any) => ({
          creativeProfileId: creativeProfile.id,
          school: item.school.trim(),
          degree: item.degree,
          fieldOfStudy: item.fieldOfStudy.trim(),
          country: item.country.trim(),
          yearOfGraduation: item.yearOfGraduation.trim(),
        })),
      });
    }

    // Fetch updated profile with skills and education
    const updatedProfile = await prisma.creativeProfile.findUnique({
      where: { id: creativeProfile.id },
      include: {
        skills: {
          include: {
            skill: true,
          },
        },
        education: true,
      },
    });

    return ApiResponse.success(
      res,
      {
        user: updatedUser,
        creativeProfile: updatedProfile,
      },
      'Creative onboarding completed successfully'
    );
  }
);
