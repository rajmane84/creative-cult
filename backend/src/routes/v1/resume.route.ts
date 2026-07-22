import { Router } from 'express';
import { authenticate } from '../../middlewares/authMiddleware';
import { uploadResume } from '../../util/multer';
import { parseResume } from '../../controllers/resume.controller';

const router = Router();

router.post('/parse', authenticate, uploadResume, parseResume);

export default router;
