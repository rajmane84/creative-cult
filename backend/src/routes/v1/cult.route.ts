import { Router } from 'express';
import {
  authenticate,
  optionalAuthenticate,
} from '../../middlewares/authMiddleware';
import { requireCreative } from '../../middlewares/roleMiddleware';
import { validate } from '../../middlewares/validate';
import {
  createCultSchema,
  updateCultSchema,
  updateMemberRoleSchema,
  cultQuerySchema,
  respondInviteSchema,
  createCultInviteSchema,
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
  getMyCultsHandler,
  getMyInvitesHandler,
  respondInviteHandler,
  createCultInviteHandler,
} from '../../controllers/cult.controller';
import { emailVerificationMiddleware } from '../../middlewares/emailVerificationMiddleware';

const router = Router();

// Public / Discovery routes
router.get('/', validate(cultQuerySchema, 'query'), listCultsHandler);

// Authenticated User's Cults & Invites (registered BEFORE dynamic :slug route)
router.get('/my', authenticate, requireCreative, getMyCultsHandler);
router.get('/invites/my', authenticate, requireCreative, getMyInvitesHandler);
router.post(
  '/invites/:inviteId/respond',
  authenticate,
  emailVerificationMiddleware,
  requireCreative,
  validate(respondInviteSchema),
  respondInviteHandler
);

// Dynamic routes
router.get('/:slug', optionalAuthenticate, getCultBySlugHandler);
router.get('/:cultId/members', getCultMembersHandler);

// Protected routes (require authentication + creative role)
router.post(
  '/',
  authenticate,
  emailVerificationMiddleware,
  requireCreative,
  validate(createCultSchema),
  createCultHandler
);

router.post(
  '/:cultId/invites',
  authenticate,
  requireCreative,
  validate(createCultInviteSchema),
  createCultInviteHandler
);

router.patch(
  '/:cultId',
  authenticate,
  requireCreative,
  validate(updateCultSchema),
  updateCultHandler
);

router.delete('/:cultId', authenticate, requireCreative, disbandCultHandler);

router.delete(
  '/:cultId/members/:membershipId',
  authenticate,
  requireCreative,
  removeCultMemberHandler
);

router.post(
  '/:cultId/members/:membershipId/leave',
  authenticate,
  requireCreative,
  leaveCultHandler
);

router.patch(
  '/:cultId/members/:membershipId/role',
  authenticate,
  requireCreative,
  validate(updateMemberRoleSchema),
  updateMemberRoleHandler
);

export default router;
