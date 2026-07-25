import type { Request, Response } from 'express';
import {
  CultMemberRole,
  CultMembershipStatus,
  CultInviteStatus,
} from '@prisma/client';
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
  assertIsOwner,
  assertIsAdminOrOwner,
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
        role: CultMemberRole.OWNER,
        status: CultMembershipStatus.ACTIVE,
      },
    });

    if (activeLeaderships >= MAX_CULTS_LED) {
      throw new ForbiddenError(
        `You can only own up to ${MAX_CULTS_LED} cults at a time`
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
          role: CultMemberRole.OWNER,
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
        createdBy: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
        memberships: {
          where: { status: CultMembershipStatus.ACTIVE },
          include: {
            creativeProfile: {
              select: {
                id: true,
                headline: true,
                availability: true,
                user: {
                  select: { id: true, name: true, username: true, image: true },
                },
                skills: {
                  include: {
                    skill: { select: { id: true, name: true } },
                  },
                },
              },
            },
          },
          orderBy: { joinedAt: 'asc' },
        },
      },
    });

    if (!cult) {
      throw new NotFoundError('Cult not found');
    }

    let userRole: CultMemberRole | null = null;
    let userMembershipId: string | null = null;

    if (req.user) {
      const profile = await prisma.creativeProfile.findUnique({
        where: { userId: String(req.user.id) },
      });
      if (profile) {
        const membership = cult.memberships.find(
          (m) => m.creativeProfileId === profile.id
        );
        if (membership) {
          userRole =
            (membership.role as string) === 'LEADER'
              ? CultMemberRole.OWNER
              : membership.role;
          userMembershipId = membership.id;
        } else if (cult.createdByUserId === String(req.user.id)) {
          userRole = CultMemberRole.OWNER;
        }
      }
    }

    const memberCount = cult.memberships.length;

    return ApiResponse.success(res, {
      ...cult,
      userRole,
      userMembershipId,
      memberCount,
    });
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
    await assertIsAdminOrOwner(cultId, profile.id);

    const updated = await prisma.cult.update({
      where: { id: cultId },
      data: req.body,
    });

    return ApiResponse.success(res, updated, 'Cult updated successfully');
  }
);

/**
 * DELETE /cults/:cultId
 * Owner-only disband. Hard delete — cascades to memberships/invites.
 */
export const disbandCultHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const cultId = String(req.params.cultId);
    const profile = await getOwnCreativeProfile(String(req.user!.id));

    const cult = await getCultOrThrow(cultId);

    const membership = await prisma.cultMembership.findUnique({
      where: {
        cultId_creativeProfileId: { cultId, creativeProfileId: profile.id },
      },
    });

    const isOwner =
      cult.createdByUserId === String(req.user!.id) ||
      (membership &&
        membership.status === CultMembershipStatus.ACTIVE &&
        (membership.role === CultMemberRole.OWNER ||
          (membership.role as string) === 'LEADER'));

    if (!isOwner) {
      throw new ForbiddenError('Only the cult owner can disband this cult');
    }

    await prisma.$transaction([
      prisma.cultInvite.deleteMany({ where: { cultId } }),
      prisma.cultMembership.deleteMany({ where: { cultId } }),
      prisma.cult.delete({ where: { id: cultId } }),
    ]);

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
 * Owner or Admin removes a member. Cannot remove oneself or the owner.
 */
export const removeCultMemberHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const cultId = String(req.params.cultId);
    const membershipId = String(req.params.membershipId);
    const actingProfile = await getOwnCreativeProfile(String(req.user!.id));

    await getCultOrThrow(cultId);
    const actingMembership = await assertIsAdminOrOwner(
      cultId,
      actingProfile.id
    );

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

    if (targetMembership.role === CultMemberRole.OWNER) {
      throw new ForbiddenError(
        'The cult owner cannot be removed. Transfer ownership first.'
      );
    }

    if (
      actingMembership.role === CultMemberRole.ADMIN &&
      targetMembership.role === CultMemberRole.ADMIN
    ) {
      throw new ForbiddenError(
        'Admins cannot remove other admins. Only the owner can manage admins.'
      );
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
 * Self-leave. Blocks if the requester is the sole OWNER.
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

    if (membership.role === CultMemberRole.OWNER) {
      throw new ConflictError(
        'Transfer ownership to another member before leaving, or disband the cult'
      );
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
 * Owner manages member roles or transfers ownership.
 */
export const updateMemberRoleHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const cultId = String(req.params.cultId);
    const membershipId = String(req.params.membershipId);
    const { role } = req.body;
    const actingProfile = await getOwnCreativeProfile(String(req.user!.id));

    await getCultOrThrow(cultId);
    const actingOwnerMembership = await assertIsOwner(cultId, actingProfile.id);

    const targetMembership = await prisma.cultMembership.findUnique({
      where: { id: membershipId },
    });

    if (!targetMembership || targetMembership.cultId !== cultId) {
      throw new NotFoundError('Membership not found in this cult');
    }

    if (targetMembership.status !== CultMembershipStatus.ACTIVE) {
      throw new ConflictError('Member is not currently active in this cult');
    }

    if (targetMembership.id === actingOwnerMembership.id) {
      throw new BadRequestError(
        'You cannot change your own role directly. Transfer ownership to another member.'
      );
    }

    if (role === CultMemberRole.OWNER) {
      // Single owner model: transfer ownership from current owner to target member
      const updated = await prisma.$transaction(async (tx) => {
        // Demote current owner to ADMIN
        await tx.cultMembership.update({
          where: { id: actingOwnerMembership.id },
          data: { role: CultMemberRole.ADMIN },
        });

        // Promote target member to OWNER
        return tx.cultMembership.update({
          where: { id: membershipId },
          data: { role: CultMemberRole.OWNER },
        });
      });

      return ApiResponse.success(
        res,
        updated,
        'Ownership transferred successfully'
      );
    }

    const updated = await prisma.cultMembership.update({
      where: { id: membershipId },
      data: { role },
    });

    return ApiResponse.success(res, updated, 'Member role updated');
  }
);

/**
 * GET /cults/my
 * Get all active cults for the logged in creative user.
 */
export const getMyCultsHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const profile = await getOwnCreativeProfile(String(req.user!.id));

    const memberships = await prisma.cultMembership.findMany({
      where: {
        creativeProfileId: profile.id,
        status: CultMembershipStatus.ACTIVE,
      },
      include: {
        cult: {
          include: {
            memberships: {
              where: { status: CultMembershipStatus.ACTIVE },
              select: { id: true },
            },
          },
        },
      },
      orderBy: { joinedAt: 'desc' },
    });

    const cults = memberships.map((m) => ({
      id: m.cult.id,
      name: m.cult.name,
      slug: m.cult.slug,
      tagline: m.cult.tagline,
      bio: m.cult.bio,
      avatarUrl: m.cult.avatarUrl,
      userRole: m.role,
      memberCount: m.cult.memberships.length,
      joinedAt: m.joinedAt.toISOString(),
      createdAt: m.cult.createdAt.toISOString(),
    }));

    return ApiResponse.success(res, cults);
  }
);

/**
 * GET /cults/invites/my
 * Get all pending invites received by the logged in creative.
 */
export const getMyInvitesHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const profile = await getOwnCreativeProfile(String(req.user!.id));

    const invites = await prisma.cultInvite.findMany({
      where: {
        invitedProfileId: profile.id,
        status: CultInviteStatus.PENDING,
      },
      include: {
        cult: { select: { id: true, name: true, slug: true, avatarUrl: true } },
        invitedByUser: {
          select: { id: true, name: true, username: true, image: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const formattedInvites = invites.map((inv) => ({
      id: inv.id,
      cultId: inv.cult.id,
      cultName: inv.cult.name,
      cultSlug: inv.cult.slug,
      cultAvatarUrl: inv.cult.avatarUrl,
      inviterName: inv.invitedByUser.name,
      inviterAvatarUrl: inv.invitedByUser.image,
      status: inv.status,
      message: inv.message,
      createdAt: inv.createdAt.toISOString(),
    }));

    return ApiResponse.success(res, formattedInvites);
  }
);

/**
 * POST /cults/invites/:inviteId/respond
 * Respond to a cult invite (ACCEPT or DECLINE).
 */
export const respondInviteHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const inviteId = String(req.params.inviteId);
    const { action } = req.body;
    const profile = await getOwnCreativeProfile(String(req.user!.id));

    const invite = await prisma.cultInvite.findUnique({
      where: { id: inviteId },
    });

    if (!invite || invite.invitedProfileId !== profile.id) {
      throw new NotFoundError('Invite not found');
    }

    if (invite.status !== CultInviteStatus.PENDING) {
      throw new ConflictError('Invite has already been processed');
    }

    if (action === 'ACCEPT') {
      await prisma.$transaction(async (tx) => {
        await tx.cultInvite.update({
          where: { id: inviteId },
          data: {
            status: CultInviteStatus.ACCEPTED,
            respondedAt: new Date(),
          },
        });

        await tx.cultMembership.upsert({
          where: {
            cultId_creativeProfileId: {
              cultId: invite.cultId,
              creativeProfileId: profile.id,
            },
          },
          create: {
            cultId: invite.cultId,
            creativeProfileId: profile.id,
            role: CultMemberRole.MEMBER,
            status: CultMembershipStatus.ACTIVE,
          },
          update: {
            status: CultMembershipStatus.ACTIVE,
            role: CultMemberRole.MEMBER,
            joinedAt: new Date(),
            leftAt: null,
          },
        });
      });

      return ApiResponse.success(
        res,
        { inviteId, action },
        'Joined cult successfully'
      );
    } else {
      await prisma.cultInvite.update({
        where: { id: inviteId },
        data: {
          status: CultInviteStatus.DECLINED,
          respondedAt: new Date(),
        },
      });

      return ApiResponse.success(
        res,
        { inviteId, action },
        'Invitation declined'
      );
    }
  }
);

/**
 * POST /cults/:cultId/invites
 * Leader invites a creative to join the cult.
 */
export const createCultInviteHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const cultId = String(req.params.cultId);
    const actingProfile = await getOwnCreativeProfile(String(req.user!.id));
    const { targetUsername, targetEmailId, message } = req.body;

    await getCultOrThrow(cultId);
    await assertIsAdminOrOwner(cultId, actingProfile.id);

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

    const existingMember = await prisma.cultMembership.findUnique({
      where: {
        cultId_creativeProfileId: {
          cultId,
          creativeProfileId: targetProfile.id,
        },
      },
    });

    if (
      existingMember &&
      existingMember.status === CultMembershipStatus.ACTIVE
    ) {
      throw new ConflictError('User is already an active member of this cult');
    }

    const existingInvite = await prisma.cultInvite.findFirst({
      where: {
        cultId,
        invitedProfileId: targetProfile.id,
        status: CultInviteStatus.PENDING,
      },
    });

    if (existingInvite) {
      throw new ConflictError('A pending invite already exists for this user');
    }

    const newInvite = await prisma.cultInvite.create({
      data: {
        cultId,
        invitedByUserId: String(req.user!.id),
        invitedProfileId: targetProfile.id,
        message: message ? String(message) : undefined,
        status: CultInviteStatus.PENDING,
      },
    });

    return ApiResponse.created(res, newInvite, 'Invite sent successfully');
  }
);
