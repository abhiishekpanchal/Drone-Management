import mongoose from 'mongoose';

const droneSchema = new mongoose.Schema({
  name: String,
  status: { type: String, enum: ['idle', 'in-mission', 'charging', 'error'], default: 'idle' },
  battery: Number,
  location: {
    lat: Number,
    lng: Number
  },
  missionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mission', default: null },
  speed: Number,          
  temperature: Number,     
  signalStrength: Number
});

export default mongoose.model('Drone', droneSchema);
