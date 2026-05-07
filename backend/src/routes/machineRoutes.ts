import { Router } from 'express';
import { machineController } from '../controllers/machineController.js';

const router = Router();

router.get('/', machineController.getAll);
router.get('/cities', machineController.getCities);
router.get('/:machineId', machineController.getById);
router.get('/:machineId/analytics', machineController.getAnalytics);
router.get('/:machineId/diagnostics', machineController.getDiagnostics);
router.get('/:machineId/events', machineController.getEvents);

export default router;
