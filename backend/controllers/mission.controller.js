import Drone from '../models/drone.model.js';
import Mission from '../models/mission.model.js';

export const getAllMissions = async (req, res) => {
  try {
    const missions = await Mission.find().populate('droneId');
    res.json(missions);
  } catch (err) {
    console.error('Failed to fetch missions:', err);
    res.status(500).json({ error: 'Failed to retrieve missions' });
  }
};

export const getMissionById = async (req, res) => {
  const { id } = req.params;
  try {
    const mission = await Mission.findById(id).populate('droneId');
    if (!mission) return res.status(404).json({ error: 'Mission not found' });
    res.json(mission);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch mission' });
  }
};

export const createMission = async (req, res) => {
  try {
    const { droneId } = req.body;

    const droneExists = await Drone.findById(droneId);
    if (!droneExists) {
      return res.status(400).json({ error: 'Invalid droneId. Drone does not exist.' });
    }

    const mission = await Mission.create(req.body);

    await Drone.findByIdAndUpdate(req.body.droneId, {
      missionId: mission._id,
    });

    res.status(201).json(mission);
  } catch (error) {
    console.error('Error creating mission:', error);
    res.status(500).json({ error: 'Failed to create mission' });
  }
};

export const updateMissionStatus = async (req, res) => {
  const { id } = req.params;
  const { status, progress, estimatedTime } = req.body;

  const validStatuses = ['planned', 'in-progress', 'paused', 'completed', 'aborted'];
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid mission status' });
  }

  try {
    const updateFields = {};
    if (status) updateFields.status = status;
    if (typeof progress === 'number') updateFields.progress = progress;
    if (typeof estimatedTime === 'number') updateFields.estimatedTime = estimatedTime;

    if (status === 'completed' || status === 'aborted') {
      updateFields.endTime = new Date();  
    }

    const updatedMission = await Mission.findByIdAndUpdate(id, updateFields, { new: true });

    if (status) {
      const droneId = updatedMission.droneId;

      let droneUpdate = {};
      if (status === 'in-progress') {
        droneUpdate = { status: 'in-mission', missionId: updatedMission._id };
      } else if (status === 'completed' || status === 'aborted') {
        droneUpdate = { status: 'idle', missionId: null };
      }

      await Drone.findByIdAndUpdate(droneId, droneUpdate);
    }

    res.json(updatedMission);
  } catch (err) {
    console.error('Failed to update mission:', err);
    res.status(500).json({ error: 'Failed to update mission status' });
  }
};

