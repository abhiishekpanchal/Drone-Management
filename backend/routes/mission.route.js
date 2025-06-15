import express from 'express';
import {
  getAllMissions,
  createMission,
  updateMissionStatus,
  getMissionById
} from '../controllers/mission.controller.js';

const router = express.Router();

router.get('/', getAllMissions);
router.get('/:id', getMissionById);
router.post('/createMission', createMission);
router.put('/:id/status', updateMissionStatus);

export default router;
