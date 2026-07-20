import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../util/errors/AppError';
import { ApiResponse } from '../util/response/ApiResponse';

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const isOperational = err.isOperational ?? false;

  console.error('Error:', {
    message: err.message,
    statusCode,
    isOperational,
    stack: err.stack,
    path: req.path,
    method: req.method,
    context: err.context,
  });

  return ApiResponse.error(
    res,
    message,
    statusCode,
    err.context,
    process.env.NODE_ENV === 'development' ? err.stack : undefined
  );
};
