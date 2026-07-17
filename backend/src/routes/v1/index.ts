import { Router } from 'express';
import { env } from '../../util/env';
import { ApiResponse } from '../../util/response/ApiResponse';

// Routes
import userRouter from './user.route';
import creativeRouter from './creative.route';

const router = Router();

router.use('/user', userRouter);
router.use('/creative', creativeRouter);

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
