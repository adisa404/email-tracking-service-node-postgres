import { Router } from 'express';
import emailRoutes from './email.js';
import trackingRoutes from './tracking.js';

const router = Router();

router.use('/email', emailRoutes);
router.use('/tracking', trackingRoutes);

export default router;
