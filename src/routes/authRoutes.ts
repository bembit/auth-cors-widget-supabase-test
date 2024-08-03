import express from 'express';
import { AuthController } from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();
const authController = new AuthController();

router.post('/login', authController.login);
router.post('/register', authController.register);

// Protected routes
router.get('/checkbox-state', authMiddleware, authController.getCheckboxState);
router.post('/checkbox-state', authMiddleware, authController.saveCheckboxState);

export default router;
