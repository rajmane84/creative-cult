import { Router } from 'express';
import { authenticate } from '../../middlewares/authMiddleware';
import { requireCreative } from '../../middlewares/roleMiddleware';
import { validate } from '../../middlewares/validate';
import {
  createCultSchema,
  updateCultSchema,
  updateMemberRoleSchema,
  cultQuerySchema,
} from '../../validations/cult';
import {
  createCultHandler,
  listCultsHandler,
  getCultBySlugHandler,
  updateCultHandler,
  disbandCultHandler,
  getCultMembersHandler,
  removeCultMemberHandler,
  leaveCultHandler,
  updateMemberRoleHandler,
} from '../../controllers/cult.controller';

const router = Router();

// Public routes
router.get('/', validate(cultQuerySchema, 'query'), listCultsHandler);
router.get('/:slug', getCultBySlugHandler);
router.get('/:cultId/members', getCultMembersHandler);

// Protected routes (require authentication)
router.post(
  '/',
  authenticate,
  requireCreative,
  validate(createCultSchema),
  createCultHandler
);

router.patch(
  '/:cultId',
  authenticate,
  validate(updateCultSchema),
  updateCultHandler
);

router.delete('/:cultId', authenticate, disbandCultHandler);

router.delete(
  '/:cultId/members/:membershipId',
  authenticate,
  removeCultMemberHandler
);

router.post(
  '/:cultId/members/:membershipId/leave',
  authenticate,
  leaveCultHandler
);

router.patch(
  '/:cultId/members/:membershipId/role',
  authenticate,
  validate(updateMemberRoleSchema),
  updateMemberRoleHandler
);

export default router;
