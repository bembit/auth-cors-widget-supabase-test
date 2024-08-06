import { Router } from 'express';
import authRoutes from './authRoutes';
import checkboxRoutes from './checkboxRoutes';
import corsRoutes from './corsRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/checkbox', checkboxRoutes);
router.use('/cors', corsRoutes);

export default router;
