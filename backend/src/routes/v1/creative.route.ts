import { Router } from 'express';
import { authenticate } from '../../middlewares/authMiddleware';
import { requireCreative } from '../../middlewares/roleMiddleware';

const router = Router();

router.use(authenticate);
router.use(requireCreative);

export default router;
