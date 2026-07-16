import { Router } from 'express';
import { handleUpdateUserRole } from '../../controllers/user.controller';

const router = Router();

router.post('/role', handleUpdateUserRole);

export default router;
