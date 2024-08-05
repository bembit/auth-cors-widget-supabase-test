import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { CheckboxController } from '../controllers/checkboxController';

const router = express.Router();
const checkboxController = new CheckboxController();

router.get('/checkbox-state', authMiddleware, checkboxController.getCheckboxState);
router.post('/checkbox-state', authMiddleware, checkboxController.saveCheckboxState);

export default router;