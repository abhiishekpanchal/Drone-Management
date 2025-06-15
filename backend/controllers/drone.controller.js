import Drone from '../models/drone.model.js';

export const getAllDrones = async (req, res) => {
  const drones = await Drone.find();
  res.json(drones);
};

export const getDroneById = async (req, res) => {
  try {
    const drone = await Drone.findById(req.params.id).populate('missionId');
    if (!drone) return res.status(404).json({ error: 'Drone not found' });
    res.json(drone);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch drone' });
  }
};

export const createDrone = async (req, res) => {
  try {
    const { name, status, battery, location } = req.body;

    if (!name || !battery || !location?.lat || !location?.lng) {
      return res.status(400).json({ error: 'Missing required drone fields' });
    }

    const drone = await Drone.create(req.body);
    res.status(201).json(drone);
  } catch (err) {
    console.error('Drone creation failed:', err);
    res.status(500).json({ error: 'Failed to create drone' });
  }
};


export const updateDroneStatus = async (req, res) => {
  const { id } = req.params;
  const drone = await Drone.findByIdAndUpdate(id, req.body, { new: true });
  res.json(drone);
};
