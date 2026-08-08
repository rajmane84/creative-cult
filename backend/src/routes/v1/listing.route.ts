import { Router } from 'express';
import { authenticate } from '../../middlewares/authMiddleware';
import { requireClient } from '../../middlewares/roleMiddleware';
import { validate } from '../../middlewares/validate';
import { emailVerificationMiddleware } from '../../middlewares/emailVerificationMiddleware';
import {
  createListingSchema,
  updateListingSchema,
  listingQuerySchema,
} from '../../validations/listing';
import {
  handleGetListings,
  handleGetListingById,
  handleCreateListing,
  handleUpdateListing,
  handleDeleteListing,
  handleUpdateListingStatus,
} from '../../controllers/listing.controller';

const router = Router();

// All listing routes require authentication, and the CLIENT role
router.use(authenticate, requireClient);

// Query validation for listing list
router.get('/', validate(listingQuerySchema, 'query'), handleGetListings);

// Get single listing
router.get('/:id', handleGetListingById);

// Create new listing
router.post(
  '/',
  emailVerificationMiddleware,
  validate(createListingSchema),
  handleCreateListing
);

// Update listing
router.patch(
  '/:id',
  emailVerificationMiddleware,
  validate(updateListingSchema),
  handleUpdateListing
);

// Update listing status
router.patch(
  '/:id/status',
  emailVerificationMiddleware,
  handleUpdateListingStatus
);

// Delete listing
router.delete('/:id', emailVerificationMiddleware, handleDeleteListing);

export default router;
