import axios from 'axios';
import { useState } from 'react';

export default function UpdateDroneForm({ drone, setShowModal, setDrones }) {
  const [formData, setFormData] = useState({
    name: drone.name,
    status: drone.status,
    battery: drone.battery,
    lat: drone.location.lat,
    lng: drone.location.lng,
    speed: drone.speed ?? 0,
    temperature: drone.temperature ?? 0,
    signalStrength: drone.signalStrength ?? 0
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['battery', 'lat', 'lng', 'speed', 'temperature', 'signalStrength'].includes(name)
        ? Number(value)
        : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const updatedData = {
      name: formData.name,
      status: formData.status,
      battery: formData.battery,
      speed: formData.speed,
      temperature: formData.temperature,
      signalStrength: formData.signalStrength,
      location: {
        lat: formData.lat,
        lng: formData.lng
      }
    };

    try {
      const res = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/drones/${drone._id}`, updatedData);
      setDrones(prev => prev.map(d => (d._id === drone._id ? res.data : d)));
      setShowModal(false);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-purple-950 text-white rounded-xl p-6 w-[28rem] shadow-lg">
        <h2 className="text-xl font-bold mb-4">Update Drone Info</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-sm">
          <label className="flex items-center gap-2">
            <span className="w-1/3 text-left">Name:</span>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="flex-1 p-1 rounded bg-gray-800"
              required
            />
          </label>

          <label className="flex items-center gap-2">
            <span className="w-1/3 text-left">Status:</span>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="flex-1 p-1 rounded bg-gray-800"
            >
              <option value="idle">Idle</option>
              <option value="in-mission">In-Mission</option>
              <option value="charging">Charging</option>
              <option value="error">Error</option>
            </select>
          </label>

          <label className="flex items-center gap-2">
            <span className="w-1/3 text-left">Battery %:</span>
            <input
              name="battery"
              type="number"
              min="0"
              max="100"
              value={formData.battery}
              onChange={handleChange}
              className="flex-1 p-1 rounded bg-gray-800"
              required
            />
          </label>

          <label className="flex items-center gap-2">
            <span className="w-1/3 text-left">Latitude:</span>
            <input
              name="lat"
              type="number"
              step="any"
              value={formData.lat}
              onChange={handleChange}
              className="flex-1 p-1 rounded bg-gray-800"
              required
            />
          </label>

          <label className="flex items-center gap-2">
            <span className="w-1/3 text-left">Longitude:</span>
            <input
              name="lng"
              type="number"
              step="any"
              value={formData.lng}
              onChange={handleChange}
              className="flex-1 p-1 rounded bg-gray-800"
              required
            />
          </label>

          <label className="flex items-center gap-2">
            <span className="w-1/3 text-left">Speed (km/h):</span>
            <input
              name="speed"
              type="number"
              step="any"
              value={formData.speed}
              onChange={handleChange}
              className="flex-1 p-1 rounded bg-gray-800"
            />
          </label>

          <label className="flex items-center gap-2">
            <span className="w-1/3 text-left">Temperature (°C):</span>
            <input
              name="temperature"
              type="number"
              step="any"
              value={formData.temperature}
              onChange={handleChange}
              className="flex-1 p-1 rounded bg-gray-800"
            />
          </label>

          <label className="flex items-center gap-2">
            <span className="w-1/3 text-left">Signal Strength (%):</span>
            <input
              name="signalStrength"
              type="number"
              min="0"
              max="100"
              value={formData.signalStrength}
              onChange={handleChange}
              className="flex-1 p-1 rounded bg-gray-800"
            />
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
              className="px-4 py-2 rounded bg-purple-700 hover:bg-purple-600"
            >
              Update Drone
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
