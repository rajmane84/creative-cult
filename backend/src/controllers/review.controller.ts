import type { Request, Response } from 'express';
import { prisma } from '../util/prisma';
import { asyncHandler } from '../middlewares/asyncHandler';
import { ApiResponse } from '../util/response/ApiResponse';
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from '../util/errors/AppError';

// ---------------------------- Controllers -----------------------------------

/**
 * POST /reviews/:username
 * Leave a review on a creative's profile. One review per (reviewer, creative)
 * pair — see the @@unique on Review in schema.prisma.
 *
 * NOTE: there's no Booking model yet, so this can't verify the reviewer
 * actually hired this creative. Revisit this check once bookings exist.
 */
export const createReviewHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const username = String(req.params.username);
    const { rating, comment } = req.body;
    const reviewerUserId = String(req.user!.id);

    const targetUser = await prisma.user.findFirst({
      where: { username: { equals: username, mode: 'insensitive' } },
      include: { creativeProfile: true },
    });

    if (!targetUser?.creativeProfile) {
      throw new NotFoundError('Creative not found');
    }

    if (targetUser.id === reviewerUserId) {
      throw new BadRequestError('You cannot review your own profile');
    }

    const existingReview = await prisma.review.findUnique({
      where: {
        reviewerUserId_creativeProfileId: {
          reviewerUserId,
          creativeProfileId: targetUser.creativeProfile.id,
        },
      },
    });

    if (existingReview) {
      throw new ConflictError('You have already reviewed this creative');
    }

    const review = await prisma.review.create({
      data: {
        rating: Number(rating),
        comment: comment ? String(comment) : undefined,
        reviewerUserId,
        creativeProfileId: targetUser.creativeProfile.id,
      },
    });

    return ApiResponse.created(res, review, 'Review submitted successfully');
  }
);

/**
 * GET /reviews/:username
 * Public, paginated list of reviews left on a creative's profile.
 */
export const listReviewsForCreativeHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const username = String(req.params.username);
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;

    const targetUser = await prisma.user.findFirst({
      where: { username: { equals: username, mode: 'insensitive' } },
      include: { creativeProfile: true },
    });

    if (!targetUser?.creativeProfile) {
      throw new NotFoundError('Creative not found');
    }

    const where = { creativeProfileId: targetUser.creativeProfile.id };

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          reviewerUser: {
            select: { id: true, name: true, username: true, image: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.review.count({ where }),
    ]);

    return ApiResponse.paginated(
      res,
      reviews,
      ApiResponse.calculatePagination(page, limit, total)
    );
  }
);

/**
 * DELETE /reviews/:reviewId
 * Reviewer-only retraction of their own review.
 */
export const deleteReviewHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const reviewId = String(req.params.reviewId);
    const reviewerUserId = String(req.user!.id);

    const review = await prisma.review.findUnique({ where: { id: reviewId } });

    if (!review) {
      throw new NotFoundError('Review not found');
    }

    if (review.reviewerUserId !== reviewerUserId) {
      throw new BadRequestError('You can only delete your own review');
    }

    await prisma.review.delete({ where: { id: reviewId } });

    return ApiResponse.noContent(res);
  }
);
