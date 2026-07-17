import { Router } from 'express';
import { authenticate } from '../../middlewares/authMiddleware';
import {
  handleUpdateUserRole,
  handleCheckUsername,
} from '../../controllers/user.controller';

const router = Router();

// Role update requires authentication
router.post('/role', authenticate, handleUpdateUserRole);

// Username check is public (can be called during onboarding)
router.get('/check-username', handleCheckUsername);

export default router;
