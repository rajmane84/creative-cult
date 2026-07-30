import { Router } from 'express';
import { authenticate } from '../../middlewares/authMiddleware';
import { validate } from '../../middlewares/validate';
import {
  createReviewSchema,
  reviewQuerySchema,
} from '../../validations/review';
import {
  createReviewHandler,
  listReviewsForCreativeHandler,
  deleteReviewHandler,
} from '../../controllers/review.controller';
import { emailVerificationMiddleware } from '../../middlewares/emailVerificationMiddleware';

const router = Router();

// Public
router.get(
  '/:username',
  validate(reviewQuerySchema, 'query'),
  listReviewsForCreativeHandler
);

// Authenticated
router.post(
  '/:username',
  authenticate,
  emailVerificationMiddleware,
  validate(createReviewSchema),
  createReviewHandler
);
router.delete('/:reviewId', authenticate, deleteReviewHandler);

export default router;
