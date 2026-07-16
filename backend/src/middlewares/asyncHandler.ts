import type { Request, Response, NextFunction } from 'express';
import { AppError, InternalServerError } from '../util/errors/AppError';

/**
 * Async handler wrapper to catch errors in async route handlers
 * and pass them to the error middleware instead of causing unhandled promise rejections
 *
 * @param fn - Async function to wrap
 * @returns Express middleware function
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      // If it's not already an AppError, convert it to one
      if (!(error instanceof AppError)) {
        const appError = new InternalServerError(
          error.message || 'An unexpected error occurred',
          { originalError: error }
        );
        next(appError);
      } else {
        next(error);
      }
    });
  };
};
