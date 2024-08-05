import { Router } from 'express';
import authRoutes from './authRoutes';
import checkboxRoutes from './checkboxRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/checkbox', checkboxRoutes);

export default router;
