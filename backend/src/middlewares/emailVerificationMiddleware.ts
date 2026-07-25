import type { Request, Response, NextFunction } from 'express';
import { ForbiddenError, UnauthorizedError } from '../util/errors/AppError';
import { prisma } from '../util/prisma';

/**
 * Middleware to verify whether the authenticated user has verified their email address.
 * Throws UnauthorizedError if not authenticated, or ForbiddenError if email is not verified.
 */
export const requireEmailVerified = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new UnauthorizedError('Authentication required');
    }

    let isVerified = req.user.emailVerified;

    if (isVerified === undefined || isVerified === null) {
      const user = await prisma.user.findUnique({
        where: { id: String(req.user.id) },
        select: { emailVerified: true },
      });
      isVerified = Boolean(user?.emailVerified);
    }

    if (!isVerified) {
      throw new ForbiddenError(
        'Email verification required. Please verify your email address before proceeding.'
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const emailVerificationMiddleware = requireEmailVerified;
