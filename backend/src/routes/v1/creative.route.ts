import { Router } from 'express';
import { authenticate } from '../../middlewares/authMiddleware';
import { requireCreative } from '../../middlewares/roleMiddleware';
import { handleCreativeOnboarding } from '../../controllers/creative.controller';

const router = Router();

// Onboarding route - only requires authentication, not creative role
router.post('/onboarding', authenticate, handleCreativeOnboarding);

// Other creative routes require creative role
router.use(authenticate);
router.use(requireCreative);

export default router;
