import { Router } from 'express';
import userRouter from './user.route';
import { env } from '../../util/env';
import { ApiResponse } from '../../util/response/ApiResponse';

const router = Router();

router.use('/user', userRouter);

router.get('/health', (_, res) => {
  const healthCheck = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: env.NODE_ENV,
  };

  return ApiResponse.success(res, healthCheck, 'Health check successful');
});

export default router;
