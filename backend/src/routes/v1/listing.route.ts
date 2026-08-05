import { Router } from 'express';
import { authenticate } from '../../middlewares/authMiddleware';
import { requireClient } from '../../middlewares/roleMiddleware';
import { validate } from '../../middlewares/validate';
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

// All listing routes require authentication and the CLIENT role
router.use(authenticate, requireClient);

// Query validation for listing list
router.get('/', validate(listingQuerySchema, 'query'), handleGetListings);

// Get single listing
router.get('/:id', handleGetListingById);

// Create new listing
router.post('/', validate(createListingSchema), handleCreateListing);

// Update listing
router.patch('/:id', validate(updateListingSchema), handleUpdateListing);

// Update listing status
router.patch('/:id/status', handleUpdateListingStatus);

// Delete listing
router.delete('/:id', handleDeleteListing);

export default router;
