import { CultMemberRole, CultMembershipStatus } from '@prisma/client';
import { prisma } from '../util/prisma';
import { ForbiddenError, NotFoundError } from '../util/errors/AppError';

/**
 * Fetch the CreativeProfile for the logged-in user, or throw.
 * Every cult action requires the actor to be a Creative.
 */
export async function getOwnCreativeProfile(userId: string) {
  const profile = await prisma.creativeProfile.findUnique({
    where: { userId },
  });

  if (!profile) {
    throw new ForbiddenError('A Creative profile is required for this action');
  }

  return profile;
}

/**
 * Fetch a cult or throw NotFoundError.
 */
export async function getCultOrThrow(cultId: string) {
  const cult = await prisma.cult.findUnique({ where: { id: cultId } });
  if (!cult) {
    throw new NotFoundError('Cult not found');
  }
  return cult;
}

/**
 * Ensure the given creativeProfileId is an ACTIVE LEADER of the given cult.
 * Returns the membership row if so, otherwise throws ForbiddenError.
 */
export async function assertIsLeader(
  cultId: string,
  creativeProfileId: string
) {
  const membership = await prisma.cultMembership.findUnique({
    where: {
      cultId_creativeProfileId: { cultId, creativeProfileId },
    },
  });

  if (
    !membership ||
    membership.status !== CultMembershipStatus.ACTIVE ||
    membership.role !== CultMemberRole.LEADER
  ) {
    throw new ForbiddenError('Only a cult leader can perform this action');
  }

  return membership;
}

/**
 * Slugify a cult name and ensure uniqueness by appending a numeric suffix
 * if needed (cult-name, cult-name-2, cult-name-3, ...).
 */
export async function generateUniqueSlug(name: string) {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  let slug = base;
  let suffix = 1;

  while (await prisma.cult.findUnique({ where: { slug } })) {
    suffix += 1;
    slug = `${base}-${suffix}`;
  }

  return slug;
}
