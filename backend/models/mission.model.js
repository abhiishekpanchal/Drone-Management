import mongoose from 'mongoose';

const missionSchema = new mongoose.Schema({
  name: String,
  droneId: { type: mongoose.Schema.Types.ObjectId, ref: 'Drone' },
  waypoints: [{ lat: Number, lng: Number }],
  altitude: Number,
  progress: Number,
  status: { type: String, enum: ['planned', 'in-progress', 'completed', 'paused', 'aborted'], default: 'planned' },
  startTime: Date,
  endTime: Date,
  frequency: Number, 
  sensorType: String, 
  pattern: {
    type: String,
    enum: ['crosshatch', 'perimeter', 'custom'],
    default: 'custom'
  },
  overlapPercentage: Number, 
  estimatedTime: Number,
  distance: Number,     
  coverage: Number  
});

export default mongoose.model('Mission', missionSchema);
