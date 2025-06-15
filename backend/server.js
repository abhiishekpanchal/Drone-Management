import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import droneRoutes from './routes/drone.route.js';
import missionRoutes from './routes/mission.route.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

app.use('/api/drones', droneRoutes);
app.use('/api/missions', missionRoutes);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB', error)
  })

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
