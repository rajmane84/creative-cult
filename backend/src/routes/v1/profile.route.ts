import { Router } from 'express';
import { authenticate } from '../../middlewares/authMiddleware';
import { validate } from '../../middlewares/validate';
import {
  updateProfileSchema,
  updateSkillsSchema,
} from '../../validations/profile';
import {
  handleGetProfile,
  handleUpdateProfile,
  handleUpdateSkills,
} from '../../controllers/profile.controller';

const router = Router();

// All profile routes require authentication
router.get('/', authenticate, handleGetProfile);
router.patch(
  '/',
  authenticate,
  validate(updateProfileSchema),
  handleUpdateProfile
);
router.patch(
  '/skills',
  authenticate,
  validate(updateSkillsSchema),
  handleUpdateSkills
);

export default router;
