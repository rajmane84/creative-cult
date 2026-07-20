import type { Request, Response, NextFunction } from 'express';
import { auth } from '../auth';
import { UnauthorizedError } from '../util/errors/AppError';

/**
 * Middleware to authenticate users using better-auth
 * Checks if a valid session exists for the request
 */
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionData = await auth.api.getSession({
      headers: req.headers,
    });

    if (!sessionData) {
      throw new UnauthorizedError('Authentication required. Please log in.');
    }

    // Attach session and user to request object for use in subsequent middleware/routes
    req.session = sessionData;
    req.user = sessionData.user;

    next();
  } catch (error) {
    next(error);
  }
};
