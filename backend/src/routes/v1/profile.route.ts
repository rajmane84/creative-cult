import { Router } from 'express';
import { authenticate } from '../../middlewares/authMiddleware';
import { validate } from '../../middlewares/validate';
import {
  updateProfileSchema,
  updateSkillsSchema,
  updateAvailabilitySchema,
  updateEducationSchema,
  updateExperienceSchema,
} from '../../validations/profile';
import {
  handleGetProfile,
  handleUpdateProfile,
  handleUpdateSkills,
  handleUpdateAvailability,
  handleUpdateEducation,
  handleUpdateExperience,
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
router.patch(
  '/availability',
  authenticate,
  validate(updateAvailabilitySchema),
  handleUpdateAvailability
);
router.patch(
  '/education',
  authenticate,
  validate(updateEducationSchema),
  handleUpdateEducation
);
router.patch(
  '/experience',
  authenticate,
  validate(updateExperienceSchema),
  handleUpdateExperience
);

export default router;
