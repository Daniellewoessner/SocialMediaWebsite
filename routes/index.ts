import { Router } from 'express';
import userRoutes from '../routes/api/userRoutes.js';
import thoughtRoutes from '../routes/api/thoughtRoutes.js';

const router = Router();

router.use(userRoutes);
router.use(thoughtRoutes);

export default router;