import { Router } from 'express';
import { authenticate } from '../../middlewares/authMiddleware';
import { uploadResume } from '../../util/multer';
import { parseResume } from '../../controllers/resume.controller';
import { env } from '../../util/env';

const router = Router();

router.post(
  '/parse',
  authenticate,
  (req, res, next) => {
    if (!env.RESUME_UPLOAD_ENABLED) {
      return res.status(503).json({
        success: false,
        error: 'Resume upload feature is temporarily disabled',
        statusCode: 503,
      });
    }
    next();
  },
  uploadResume,
  parseResume
);

export default router;
