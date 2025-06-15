import express from 'express';
import {
  getAllDrones,
  updateDroneStatus,
  createDrone,
  getDroneById,
} from '../controllers/drone.controller.js';

const router = express.Router();

router.get('/', getAllDrones);
router.get('/:id', getDroneById);
router.post('/createDrone', createDrone);
router.put('/:id', updateDroneStatus);

export default router;
