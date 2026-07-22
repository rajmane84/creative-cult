import { Router } from 'express';
import { env } from '../../util/env';
import { ApiResponse } from '../../util/response/ApiResponse';

// Routes
import userRouter from './user.route';
import creativeRouter from './creative.route';
import waitlistRouter from './waitlist.route';
import resumeRouter from './resume.route';
import profileRouter from './profile.route';

const router = Router();

router.use('/user', userRouter);
router.use('/creative', creativeRouter);
router.use('/waitlist', waitlistRouter);
router.use('/resume', resumeRouter);
router.use('/profile', profileRouter);

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
