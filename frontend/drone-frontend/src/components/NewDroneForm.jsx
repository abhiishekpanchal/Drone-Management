import axios from 'axios';
import { useState } from 'react';

export default function NewDroneForm({ setShowModal, setDrones }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const newDrone = {
      name: e.target.name.value,
      status: e.target.status.value,
      battery: Number(e.target.battery.value),
      speed: Number(e.target.speed.value),
      temperature: Number(e.target.temperature.value),
      signalStrength: Number(e.target.signalStrength.value),
      location: {
        lat: Number(e.target.lat.value),
        lng: Number(e.target.lng.value)
      }
    };

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/drones/createDrone`, newDrone);
      setDrones(prev => [...prev, res.data]);
      setShowModal(false);
    } catch (error) {
      console.error("Failed to add drone", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-purple-950 text-white rounded-xl p-6 w-[28rem] shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add New Drone</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-sm">

          <label className="flex items-center gap-2">
            <span className="w-1/3 text-left">Name:</span>
            <input name="name" className="flex-1 p-1 rounded bg-gray-800" required />
          </label>

          <label className="flex items-center gap-2">
            <span className="w-1/3 text-left">Status:</span>
            <select name="status" className="flex-1 p-1 rounded bg-gray-800">
              <option value="idle">Idle</option>
              <option value="in-mission">In-Mission</option>
              <option value="charging">Charging</option>
              <option value="error">Error</option>
            </select>
          </label>

          <label className="flex items-center gap-2">
            <span className="w-1/3 text-left">Battery %:</span>
            <input name="battery" type="number" min="0" max="100" className="flex-1 p-1 rounded bg-gray-800" required />
          </label>

          <label className="flex items-center gap-2">
            <span className="w-1/3 text-left">Latitude:</span>
            <input name="lat" type="number" step="any" className="flex-1 p-1 rounded bg-gray-800" required />
          </label>

          <label className="flex items-center gap-2">
            <span className="w-1/3 text-left">Longitude:</span>
            <input name="lng" type="number" step="any" className="flex-1 p-1 rounded bg-gray-800" required />
          </label>

          <label className="flex items-center gap-2">
            <span className="w-1/3 text-left">Speed (km/h):</span>
            <input name="speed" type="number" step="any" className="flex-1 p-1 rounded bg-gray-800" defaultValue={0} />
          </label>

          <label className="flex items-center gap-2">
            <span className="w-1/3 text-left">Temperature (°C):</span>
            <input name="temperature" type="number" step="any" className="flex-1 p-1 rounded bg-gray-800" defaultValue={0} />
          </label>

          <label className="flex items-center gap-2">
            <span className="w-1/3 text-left">Signal Strength (%):</span>
            <input name="signalStrength" type="number" min="0" max="100" className="flex-1 p-1 rounded bg-gray-800" defaultValue={100} />
          </label>

          <div className="flex justify-between mt-4 text-sm">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded bg-white text-black hover:bg-purple-200"
            >
              {loading ? "Adding..." : "Add Drone"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
