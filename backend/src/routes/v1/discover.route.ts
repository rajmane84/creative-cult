import { Router } from 'express';
import { validate } from '../../middlewares/validate';
import { discoverFreelancersQuerySchema } from '../../validations/discover';
import {
  listFreelancersHandler,
  getFreelancerByUsernameHandler,
} from '../../controllers/discover.controller';

const router = Router();

// Public discovery routes — no auth required.
router.get(
  '/freelancers',
  validate(discoverFreelancersQuerySchema, 'query'),
  listFreelancersHandler
);
router.get('/freelancers/:username', getFreelancerByUsernameHandler);

export default router;
