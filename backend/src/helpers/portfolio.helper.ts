import { PortfolioOwnerType } from '@prisma/client';
import { prisma } from '../util/prisma';
import { ForbiddenError, NotFoundError } from '../util/errors/AppError';
import { assertIsAdminOrOwner } from './cult.helper';

/**
 * Fetch a portfolio item or throw NotFoundError.
 */
export async function getPortfolioItemOrThrow(portfolioItemId: string) {
  const item = await prisma.portfolioItem.findUnique({
    where: { id: portfolioItemId },
  });

  if (!item) {
    throw new NotFoundError('Portfolio item not found');
  }

  return item;
}

/**
 * Ensure the acting creative profile is allowed to manage (edit/delete/credit)
 * the given portfolio item. Ownership is exclusive, so exactly one of these
 * checks applies: the item's own profile owner, or an admin/owner of the
 * owning cult.
 */
export async function assertCanManagePortfolioItem(
  item: {
    ownerType: PortfolioOwnerType;
    ownerCreativeProfileId: string | null;
    ownerCultId: string | null;
  },
  actingCreativeProfileId: string
) {
  if (item.ownerType === PortfolioOwnerType.FREELANCER) {
    if (item.ownerCreativeProfileId !== actingCreativeProfileId) {
      throw new ForbiddenError(
        'Only the owner of this portfolio item can perform this action'
      );
    }
    return;
  }

  // item.ownerType === CULT
  await assertIsAdminOrOwner(
    item.ownerCultId as string,
    actingCreativeProfileId
  );
}
