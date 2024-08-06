import express from 'express';
import { CorsPreferencesController } from '../controllers/corsPreferencesController';
import { authMiddleware } from '../middleware/authMiddleware';
import { dynamicCorsMiddleware } from '../middleware/corsMiddleware';

const router = express.Router();
const corsPreferencesController = new CorsPreferencesController();

// Route to get CORS preferences
router.get('/cors-preferences', authMiddleware, dynamicCorsMiddleware, corsPreferencesController.getCorsPreferences);

// Route to update CORS preferences
router.post('/cors-preferences', authMiddleware, dynamicCorsMiddleware, corsPreferencesController.updateCorsPreferences);

export default router;
