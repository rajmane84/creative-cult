import type { Request, Response } from 'express';
import { CultMemberRole, CultMembershipStatus } from '@prisma/client';
import { prisma } from '../util/prisma';
import { asyncHandler } from '../middlewares/asyncHandler';
import { ApiResponse } from '../util/response';
import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
} from '../util/errors/AppError';
import { MAX_CULTS_LED } from '../constants';
import {
  getOwnCreativeProfile,
  getCultOrThrow,
  assertIsLeader,
  generateUniqueSlug,
} from '../helpers/cult.helper';

// ---------------------------- Controllers -----------------------------------

/**
 * POST /cults
 * Create a cult. Creator automatically becomes LEADER.
 */
export const createCultHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, slug, tagline, bio, avatarUrl } = req.body;
    const profile = await getOwnCreativeProfile(String(req.user!.id));

    if (!profile.onboardingCompleted) {
      throw new ForbiddenError('Complete onboarding before creating a cult');
    }

    const activeLeaderships = await prisma.cultMembership.count({
      where: {
        creativeProfileId: profile.id,
        role: CultMemberRole.LEADER,
        status: CultMembershipStatus.ACTIVE,
      },
    });

    if (activeLeaderships >= MAX_CULTS_LED) {
      throw new ForbiddenError(
        `You can only lead up to ${MAX_CULTS_LED} cults at a time`
      );
    }

    const finalSlug = slug
      ? String(slug)
      : await generateUniqueSlug(String(name));

    // If a slug was explicitly provided, still confirm it's free
    if (slug) {
      const existing = await prisma.cult.findUnique({
        where: { slug: String(slug) },
      });
      if (existing) {
        throw new ConflictError('That slug is already taken');
      }
    }

    const cult = await prisma.$transaction(async (tx) => {
      const newCult = await tx.cult.create({
        data: {
          name: String(name),
          slug: finalSlug,
          tagline: tagline ? String(tagline) : undefined,
          bio: bio ? String(bio) : undefined,
          avatarUrl: avatarUrl ? String(avatarUrl) : undefined,
          createdByUserId: String(req.user!.id),
        },
      });

      await tx.cultMembership.create({
        data: {
          cultId: newCult.id,
          creativeProfileId: profile.id,
          role: CultMemberRole.LEADER,
          status: CultMembershipStatus.ACTIVE,
        },
      });

      return newCult;
    });

    return ApiResponse.created(res, cult, 'Cult created successfully');
  }
);

/**
 * GET /cults
 * Public discovery listing with search + pagination.
 */
export const listCultsHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const search = req.query.search ? String(req.query.search) : undefined;
    const skill = req.query.skill ? String(req.query.skill) : undefined;
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;

    const where = {
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' as const } },
          { tagline: { contains: search, mode: 'insensitive' as const } },
          { bio: { contains: search, mode: 'insensitive' as const } },
        ],
      }),
      ...(skill && {
        memberships: {
          some: {
            status: CultMembershipStatus.ACTIVE,
            creativeProfile: {
              skills: {
                some: {
                  skill: {
                    name: { equals: skill, mode: 'insensitive' as const },
                  },
                },
              },
            },
          },
        },
      }),
    };

    const [cults, total] = await Promise.all([
      prisma.cult.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.cult.count({ where }),
    ]);

    return ApiResponse.paginated(
      res,
      cults,
      ApiResponse.calculatePagination(page, limit, total)
    );
  }
);

/**
 * GET /cults/:slug
 * Public cult profile page.
 */
export const getCultBySlugHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const slug = String(req.params.slug);

    const cult = await prisma.cult.findUnique({
      where: { slug },
      include: {
        memberships: {
          where: { status: CultMembershipStatus.ACTIVE },
          include: {
            creativeProfile: {
              select: {
                id: true,
                headline: true,
                availability: true,
                user: { select: { name: true, username: true, image: true } },
              },
            },
          },
        },
      },
    });

    if (!cult) {
      throw new NotFoundError('Cult not found');
    }

    return ApiResponse.success(res, cult);
  }
);

/**
 * PATCH /cults/:cultId
 * Leader-only profile update.
 */
export const updateCultHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const cultId = String(req.params.cultId);
    const profile = await getOwnCreativeProfile(String(req.user!.id));

    await getCultOrThrow(cultId);
    await assertIsLeader(cultId, profile.id);

    const updated = await prisma.cult.update({
      where: { id: cultId },
      data: req.body,
    });

    return ApiResponse.success(res, updated, 'Cult updated successfully');
  }
);

/**
 * DELETE /cults/:cultId
 * Leader-only disband. Hard delete — cascades to memberships/invites.
 * Swap for a soft-delete (isActive: false) once that field exists on Cult.
 */
export const disbandCultHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const cultId = String(req.params.cultId);
    const profile = await getOwnCreativeProfile(String(req.user!.id));

    await getCultOrThrow(cultId);
    await assertIsLeader(cultId, profile.id);

    await prisma.cult.delete({ where: { id: cultId } });

    return ApiResponse.noContent(res);
  }
);

/**
 * GET /cults/:cultId/members
 * Public list of active members.
 */
export const getCultMembersHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const cultId = String(req.params.cultId);
    await getCultOrThrow(cultId);

    const members = await prisma.cultMembership.findMany({
      where: { cultId, status: CultMembershipStatus.ACTIVE },
      include: {
        creativeProfile: {
          select: {
            id: true,
            headline: true,
            availability: true,
            user: { select: { name: true, username: true, image: true } },
          },
        },
      },
      orderBy: { joinedAt: 'asc' },
    });

    return ApiResponse.success(res, members);
  }
);

/**
 * DELETE /cults/:cultId/members/:membershipId
 * Leader removes another member. Leaders cannot remove themselves this way —
 * they must use the /leave route instead.
 */
export const removeCultMemberHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const cultId = String(req.params.cultId);
    const membershipId = String(req.params.membershipId);
    const actingProfile = await getOwnCreativeProfile(String(req.user!.id));

    await getCultOrThrow(cultId);
    await assertIsLeader(cultId, actingProfile.id);

    const targetMembership = await prisma.cultMembership.findUnique({
      where: { id: membershipId },
    });

    if (!targetMembership || targetMembership.cultId !== cultId) {
      throw new NotFoundError('Membership not found in this cult');
    }

    if (targetMembership.creativeProfileId === actingProfile.id) {
      throw new BadRequestError('Use the leave endpoint to remove yourself');
    }

    if (targetMembership.status !== CultMembershipStatus.ACTIVE) {
      throw new ConflictError('Member is not currently active in this cult');
    }

    const updated = await prisma.cultMembership.update({
      where: { id: membershipId },
      data: { status: CultMembershipStatus.REMOVED, leftAt: new Date() },
    });

    return ApiResponse.success(res, updated, 'Member removed');
  }
);

/**
 * POST /cults/:cultId/members/:membershipId/leave
 * Self-leave. Blocks if the requester is the sole ACTIVE leader.
 */
export const leaveCultHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const cultId = String(req.params.cultId);
    const membershipId = String(req.params.membershipId);
    const profile = await getOwnCreativeProfile(String(req.user!.id));

    const membership = await prisma.cultMembership.findUnique({
      where: { id: membershipId },
    });

    if (!membership || membership.cultId !== cultId) {
      throw new NotFoundError('Membership not found in this cult');
    }

    if (membership.creativeProfileId !== profile.id) {
      throw new ForbiddenError('You can only remove yourself from a cult');
    }

    if (membership.status !== CultMembershipStatus.ACTIVE) {
      throw new ConflictError(
        'You are not currently an active member of this cult'
      );
    }

    if (membership.role === CultMemberRole.LEADER) {
      const otherActiveLeaders = await prisma.cultMembership.count({
        where: {
          cultId,
          role: CultMemberRole.LEADER,
          status: CultMembershipStatus.ACTIVE,
          id: { not: membership.id },
        },
      });

      if (otherActiveLeaders === 0) {
        throw new ConflictError(
          'Promote another member to leader before leaving, or disband the cult'
        );
      }
    }

    const updated = await prisma.cultMembership.update({
      where: { id: membershipId },
      data: { status: CultMembershipStatus.LEFT, leftAt: new Date() },
    });

    return ApiResponse.success(res, updated, 'You have left the cult');
  }
);

/**
 * PATCH /cults/:cultId/members/:membershipId/role
 * Leader promotes/demotes a member. Blocks demoting the sole active leader.
 */
export const updateMemberRoleHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const cultId = String(req.params.cultId);
    const membershipId = String(req.params.membershipId);
    const { role } = req.body;
    const actingProfile = await getOwnCreativeProfile(String(req.user!.id));

    await getCultOrThrow(cultId);
    await assertIsLeader(cultId, actingProfile.id);

    const targetMembership = await prisma.cultMembership.findUnique({
      where: { id: membershipId },
    });

    if (!targetMembership || targetMembership.cultId !== cultId) {
      throw new NotFoundError('Membership not found in this cult');
    }

    if (targetMembership.status !== CultMembershipStatus.ACTIVE) {
      throw new ConflictError('Member is not currently active in this cult');
    }

    if (
      targetMembership.role === CultMemberRole.LEADER &&
      role === CultMemberRole.MEMBER
    ) {
      const otherActiveLeaders = await prisma.cultMembership.count({
        where: {
          cultId,
          role: CultMemberRole.LEADER,
          status: CultMembershipStatus.ACTIVE,
          id: { not: targetMembership.id },
        },
      });

      if (otherActiveLeaders === 0) {
        throw new ConflictError('Cult must have at least one active leader');
      }
    }

    const updated = await prisma.cultMembership.update({
      where: { id: membershipId },
      data: { role },
    });

    return ApiResponse.success(res, updated, 'Member role updated');
  }
);
