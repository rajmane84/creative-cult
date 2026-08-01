import rateLimit from 'express-rate-limit';
import { ApiResponse } from './response/ApiResponse';

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    return ApiResponse.error(
      res,
      'Too many requests, please try again later',
      429
    );
  },
});
