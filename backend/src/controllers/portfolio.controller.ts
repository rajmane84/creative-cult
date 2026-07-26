import type { Request, Response } from 'express';
import { PortfolioOwnerType, PortfolioCreditStatus } from '@prisma/client';
import { prisma } from '../util/prisma';
import { asyncHandler } from '../middlewares/asyncHandler';
import { ApiResponse } from '../util/response/ApiResponse';
import { ConflictError, NotFoundError } from '../util/errors/AppError';
import {
  getOwnCreativeProfile,
  getCultOrThrow,
  assertIsAdminOrOwner,
} from '../helpers/cult.helper';
import {
  getPortfolioItemOrThrow,
  assertCanManagePortfolioItem,
} from '../helpers/portfolio.helper';

const ownerSelect = {
  ownerCreativeProfile: {
    select: {
      id: true,
      user: {
        select: { id: true, name: true, username: true, image: true },
      },
    },
  },
  ownerCult: {
    select: { id: true, name: true, slug: true, avatarUrl: true },
  },
};

const creditsSelect = {
  credits: {
    include: {
      creativeProfile: {
        select: {
          id: true,
          user: {
            select: { id: true, name: true, username: true, image: true },
          },
        },
      },
    },
    orderBy: { createdAt: 'asc' as const },
  },
};

// ---------------------------- Controllers -----------------------------------

/**
 * POST /portfolio
 * Create a portfolio item, owned either by the creator's own profile
 * (FREELANCER) or by a cult they admin/own (CULT).
 */
export const createPortfolioItemHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      title,
      description,
      coverImageUrl,
      mediaUrls,
      tags,
      projectDate,
      ownerType,
      cultId,
    } = req.body;
    const profile = await getOwnCreativeProfile(String(req.user!.id));

    if (ownerType === PortfolioOwnerType.CULT) {
      await getCultOrThrow(String(cultId));
      await assertIsAdminOrOwner(String(cultId), profile.id);
    }

    const item = await prisma.portfolioItem.create({
      data: {
        title: String(title),
        description: description ? String(description) : undefined,
        coverImageUrl: coverImageUrl ? String(coverImageUrl) : undefined,
        mediaUrls: mediaUrls ?? [],
        tags: tags ?? [],
        projectDate: projectDate ?? undefined,
        ownerType,
        ownerCreativeProfileId:
          ownerType === PortfolioOwnerType.FREELANCER ? profile.id : undefined,
        ownerCultId:
          ownerType === PortfolioOwnerType.CULT ? String(cultId) : undefined,
      },
    });

    return ApiResponse.created(
      res,
      item,
      'Portfolio item created successfully'
    );
  }
);

/**
 * GET /portfolio/mine
 * Portfolio items directly owned by the logged-in creative's own profile.
 */
export const listMyPortfolioItemsHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const profile = await getOwnCreativeProfile(String(req.user!.id));

    const items = await prisma.portfolioItem.findMany({
      where: { ownerCreativeProfileId: profile.id },
      include: { ...creditsSelect },
      orderBy: { createdAt: 'desc' },
    });

    return ApiResponse.success(res, items);
  }
);

/**
 * GET /portfolio/cult/:cultId
 * Public listing of portfolio items owned by a cult.
 */
export const listCultPortfolioItemsHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const cultId = String(req.params.cultId);
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;

    await getCultOrThrow(cultId);

    const where = { ownerCultId: cultId };
    const [items, total] = await Promise.all([
      prisma.portfolioItem.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: { ...creditsSelect },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.portfolioItem.count({ where }),
    ]);

    return ApiResponse.paginated(
      res,
      items,
      ApiResponse.calculatePagination(page, limit, total)
    );
  }
);

/**
 * GET /portfolio/profile/:username
 * Public listing for a creative's profile: items they own, plus items
 * they've been credited on and have accepted.
 */
export const listProfilePortfolioItemsHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const username = String(req.params.username);

    const user = await prisma.user.findFirst({
      where: { username: { equals: username, mode: 'insensitive' } },
      include: { creativeProfile: true },
    });

    if (!user?.creativeProfile) {
      throw new NotFoundError('Creative profile not found');
    }

    const profileId = user.creativeProfile.id;

    const [owned, credited] = await Promise.all([
      prisma.portfolioItem.findMany({
        where: { ownerCreativeProfileId: profileId },
        include: { ...ownerSelect },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.portfolioItem.findMany({
        where: {
          credits: {
            some: {
              creativeProfileId: profileId,
              status: PortfolioCreditStatus.ACCEPTED,
            },
          },
        },
        include: {
          ...ownerSelect,
          credits: {
            where: { creativeProfileId: profileId },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return ApiResponse.success(res, { owned, credited });
  }
);

/**
 * GET /portfolio/:id
 * Public fetch of a single portfolio item with owner + credits.
 */
export const getPortfolioItemByIdHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const id = String(req.params.id);

    const item = await prisma.portfolioItem.findUnique({
      where: { id },
      include: { ...ownerSelect, ...creditsSelect },
    });

    if (!item) {
      throw new NotFoundError('Portfolio item not found');
    }

    return ApiResponse.success(res, item);
  }
);

/**
 * PATCH /portfolio/:id
 * Owner-only edit. Ownership itself is immutable after creation.
 */
export const updatePortfolioItemHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const profile = await getOwnCreativeProfile(String(req.user!.id));

    const item = await getPortfolioItemOrThrow(id);
    await assertCanManagePortfolioItem(item, profile.id);

    const updated = await prisma.portfolioItem.update({
      where: { id },
      data: req.body,
    });

    return ApiResponse.success(
      res,
      updated,
      'Portfolio item updated successfully'
    );
  }
);

/**
 * DELETE /portfolio/:id
 * Owner-only hard delete. Cascades to credits.
 */
export const deletePortfolioItemHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const profile = await getOwnCreativeProfile(String(req.user!.id));

    const item = await getPortfolioItemOrThrow(id);
    await assertCanManagePortfolioItem(item, profile.id);

    await prisma.portfolioItem.delete({ where: { id } });

    return ApiResponse.noContent(res);
  }
);

/**
 * POST /portfolio/:id/credits
 * Owner tags a creative as a contributor. Stays PENDING until the credited
 * creative accepts it — see respondPortfolioCreditHandler.
 */
export const addPortfolioCreditHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const { targetUsername, targetEmailId, role } = req.body;
    const profile = await getOwnCreativeProfile(String(req.user!.id));

    const item = await getPortfolioItemOrThrow(id);
    await assertCanManagePortfolioItem(item, profile.id);

    let targetProfile;
    if (targetEmailId) {
      const user = await prisma.user.findFirst({
        where: {
          email: { equals: String(targetEmailId), mode: 'insensitive' },
        },
        include: { creativeProfile: true },
      });
      targetProfile = user?.creativeProfile;
    } else if (targetUsername) {
      const user = await prisma.user.findFirst({
        where: {
          username: { equals: String(targetUsername), mode: 'insensitive' },
        },
        include: { creativeProfile: true },
      });
      targetProfile = user?.creativeProfile;
    }

    if (!targetProfile) {
      throw new NotFoundError('Creative user not found');
    }

    const existingCredit = await prisma.portfolioItemCredit.findUnique({
      where: {
        portfolioItemId_creativeProfileId: {
          portfolioItemId: id,
          creativeProfileId: targetProfile.id,
        },
      },
    });

    if (existingCredit) {
      throw new ConflictError('This person is already credited on this item');
    }

    const credit = await prisma.portfolioItemCredit.create({
      data: {
        portfolioItemId: id,
        creativeProfileId: targetProfile.id,
        role: role ? String(role) : undefined,
        status: PortfolioCreditStatus.PENDING,
      },
    });

    return ApiResponse.created(res, credit, 'Credit added, pending acceptance');
  }
);

/**
 * DELETE /portfolio/:id/credits/:creditId
 * Owner removes a credit.
 */
export const removePortfolioCreditHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const creditId = String(req.params.creditId);
    const profile = await getOwnCreativeProfile(String(req.user!.id));

    const item = await getPortfolioItemOrThrow(id);
    await assertCanManagePortfolioItem(item, profile.id);

    const credit = await prisma.portfolioItemCredit.findUnique({
      where: { id: creditId },
    });

    if (!credit || credit.portfolioItemId !== id) {
      throw new NotFoundError('Credit not found on this portfolio item');
    }

    await prisma.portfolioItemCredit.delete({ where: { id: creditId } });

    return ApiResponse.noContent(res);
  }
);

/**
 * GET /portfolio/credits/my
 * Pending credit tags awaiting the logged-in creative's response.
 */
export const getMyPendingCreditsHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const profile = await getOwnCreativeProfile(String(req.user!.id));

    const credits = await prisma.portfolioItemCredit.findMany({
      where: {
        creativeProfileId: profile.id,
        status: PortfolioCreditStatus.PENDING,
      },
      include: {
        portfolioItem: {
          include: { ...ownerSelect },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return ApiResponse.success(res, credits);
  }
);

/**
 * POST /portfolio/credits/:creditId/respond
 * Credited creative accepts or declines being tagged.
 */
export const respondPortfolioCreditHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const creditId = String(req.params.creditId);
    const { action } = req.body;
    const profile = await getOwnCreativeProfile(String(req.user!.id));

    const credit = await prisma.portfolioItemCredit.findUnique({
      where: { id: creditId },
    });

    if (!credit || credit.creativeProfileId !== profile.id) {
      throw new NotFoundError('Credit not found');
    }

    if (credit.status !== PortfolioCreditStatus.PENDING) {
      throw new ConflictError('This credit has already been responded to');
    }

    const updated = await prisma.portfolioItemCredit.update({
      where: { id: creditId },
      data: {
        status:
          action === 'ACCEPT'
            ? PortfolioCreditStatus.ACCEPTED
            : PortfolioCreditStatus.DECLINED,
        respondedAt: new Date(),
      },
    });

    return ApiResponse.success(
      res,
      updated,
      action === 'ACCEPT' ? 'Credit accepted' : 'Credit declined'
    );
  }
);
