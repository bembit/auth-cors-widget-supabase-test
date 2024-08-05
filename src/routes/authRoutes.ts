import express from 'express';
import { AuthController } from '../controllers/authController';

const router = express.Router();
const authController = new AuthController();

router.post('/login', authController.login);
router.post('/register', authController.register);

// Protected routes
// split this too
export default router;
