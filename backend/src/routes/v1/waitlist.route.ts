import { Router } from 'express';
import {
  joinWaitlist,
  getWaitlistCount,
} from '../../controllers/waitlist.controller';
import { validate } from '../../middlewares/validate';
import { waitlistSchema } from '../../validations/waitlist';

const router = Router();

router.post('/', validate(waitlistSchema), joinWaitlist);
router.get('/count', getWaitlistCount);

export default router;
