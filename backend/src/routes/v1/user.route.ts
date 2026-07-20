import { Router } from 'express';
import { authenticate } from '../../middlewares/authMiddleware';
import { validate } from '../../middlewares/validate';
import {
  updateUserRoleSchema,
  checkUsernameSchema,
} from '../../validations/user';
import {
  handleUpdateUserRole,
  handleCheckUsername,
} from '../../controllers/user.controller';

const router = Router();

// Role update requires authentication
router.post(
  '/role',
  authenticate,
  validate(updateUserRoleSchema),
  handleUpdateUserRole
);

// Username check is public (can be called during onboarding)
router.get(
  '/check-username',
  validate(checkUsernameSchema, 'query'),
  handleCheckUsername
);

export default router;
