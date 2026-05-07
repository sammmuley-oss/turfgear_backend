import { Router } from 'express';
import { dashboardController } from '../controllers/dashboardController.js';

const router = Router();

router.get('/metrics', dashboardController.getMetrics);
router.get('/cities', dashboardController.getCities);
router.get('/activities', dashboardController.getActivities);
router.get('/health', dashboardController.getHealth);

export default router;
