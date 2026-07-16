import type { Request, Response, NextFunction } from 'express';
import { ForbiddenError } from '../util/errors/AppError';

/**
 * Middleware to check if user has required role
 * @param allowedRoles - Array of roles that are allowed to access the route
 * @returns Express middleware function
 */
export const authorize = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check if user exists (should be set by authenticate middleware)
      if (!req.user) {
        throw new ForbiddenError('Authentication required');
      }

      // Check if user has a role
      if (!req.user.role) {
        throw new ForbiddenError('User role not assigned');
      }

      // Check if user's role is in the allowed roles
      if (!allowedRoles.includes(req.user.role)) {
        throw new ForbiddenError(
          `Access denied. Required role: ${allowedRoles.join(' or ')}, your role: ${req.user.role}`
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export const requireAdmin = authorize('ADMIN');
export const requireClient = authorize('CLIENT');
export const requireCreative = authorize('CREATIVE');
export const requireAdminOrClient = authorize('ADMIN', 'CLIENT');
export const requireAdminOrCreative = authorize('ADMIN', 'CREATIVE');
export const requireClientOrCreative = authorize('CLIENT', 'CREATIVE');
