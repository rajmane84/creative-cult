import { Router } from 'express';
import { authenticate } from '../../middlewares/authMiddleware';
import { requireCreative } from '../../middlewares/roleMiddleware';
import { validate } from '../../middlewares/validate';
import { emailVerificationMiddleware } from '../../middlewares/emailVerificationMiddleware';
import {
  createPortfolioItemSchema,
  updatePortfolioItemSchema,
  portfolioQuerySchema,
  addPortfolioCreditSchema,
  respondPortfolioCreditSchema,
} from '../../validations/portfolio';
import {
  createPortfolioItemHandler,
  listMyPortfolioItemsHandler,
  listCultPortfolioItemsHandler,
  listProfilePortfolioItemsHandler,
  getPortfolioItemByIdHandler,
  updatePortfolioItemHandler,
  deletePortfolioItemHandler,
  addPortfolioCreditHandler,
  removePortfolioCreditHandler,
  getMyPendingCreditsHandler,
  respondPortfolioCreditHandler,
} from '../../controllers/portfolio.controller';

const router = Router();

// Authenticated user's own items & credits (registered BEFORE dynamic :id route)
router.get('/mine', authenticate, requireCreative, listMyPortfolioItemsHandler);
router.get(
  '/credits/my',
  authenticate,
  requireCreative,
  getMyPendingCreditsHandler
);
router.post(
  '/credits/:creditId/respond',
  authenticate,
  requireCreative,
  validate(respondPortfolioCreditSchema),
  respondPortfolioCreditHandler
);

// Public / Discovery routes
router.get(
  '/cult/:cultId',
  validate(portfolioQuerySchema, 'query'),
  listCultPortfolioItemsHandler
);
router.get('/profile/:username', listProfilePortfolioItemsHandler);

// Protected routes (require authentication + creative role)
router.post(
  '/',
  authenticate,
  emailVerificationMiddleware,
  requireCreative,
  validate(createPortfolioItemSchema),
  createPortfolioItemHandler
);

router.post(
  '/:id/credits',
  authenticate,
  requireCreative,
  validate(addPortfolioCreditSchema),
  addPortfolioCreditHandler
);

router.delete(
  '/:id/credits/:creditId',
  authenticate,
  requireCreative,
  removePortfolioCreditHandler
);

// Dynamic routes (must come after the static routes above)
router.get('/:id', getPortfolioItemByIdHandler);

router.patch(
  '/:id',
  authenticate,
  requireCreative,
  validate(updatePortfolioItemSchema),
  updatePortfolioItemHandler
);

router.delete(
  '/:id',
  authenticate,
  requireCreative,
  deletePortfolioItemHandler
);

export default router;
