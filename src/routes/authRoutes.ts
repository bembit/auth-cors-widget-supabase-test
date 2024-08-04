import express from 'express';
import { AuthController } from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';
import { CheckboxController } from '../controllers/checkboxController';

const router = express.Router();
const authController = new AuthController();
const checkboxController = new CheckboxController();

router.post('/login', authController.login);
router.post('/register', authController.register);

// Protected routes
// split this too
router.get('/checkbox-state', authMiddleware, checkboxController.getCheckboxState);
router.post('/checkbox-state', authMiddleware, checkboxController.saveCheckboxState);

export default router;
