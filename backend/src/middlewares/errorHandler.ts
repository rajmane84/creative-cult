import type { Request, Response } from 'express';
import { AppError } from '../util/errors/AppError';
import { ApiResponse } from '../util/response/ApiResponse';

export const errorHandler = (err: AppError, req: Request, res: Response) => {
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

  // Prepare context for response
  const responseContext: Record<string, unknown> = {
    ...(err.context && { context: err.context }),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  };

  return ApiResponse.error(res, message, statusCode, responseContext);
};
