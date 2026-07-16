import type { Request, Response } from 'express';
import { ApiResponse } from '../util/response/ApiResponse';

export const notFoundHandler = (req: Request, res: Response) => {
  return ApiResponse.error(res, 'Route not found', 404, {
    path: req.path,
    method: req.method,
  });
};
