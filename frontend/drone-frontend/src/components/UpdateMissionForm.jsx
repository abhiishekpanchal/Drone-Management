import axios from 'axios';
import { useState } from 'react';

export default function UpdateMissionForm({ mission, setShowModal, setMissions }) {
  const [formData, setFormData] = useState({
    name: mission.name,
    status: mission.status,
    altitude: mission.altitude,
    frequency: mission.frequency,
    sensorType: mission.sensorType || '',
    pattern: mission.pattern,
    overlapPercentage: mission.overlapPercentage,
    estimatedTime: mission.estimatedTime,
    waypoints: mission.waypoints ?? []
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['altitude', 'frequency', 'overlapPercentage', 'estimatedTime'].includes(name)
        ? Number(value)
        : value
    }));
  };

  const handleWaypointChange = (index, key, value) => {
    const updated = [...formData.waypoints];
    updated[index][key] = parseFloat(value);
    setFormData(prev => ({ ...prev, waypoints: updated }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const updatedData = {
      name: formData.name,
      status: formData.status,
      altitude: formData.altitude,
      frequency: formData.frequency,
      sensorType: formData.sensorType,
      pattern: formData.pattern,
      overlapPercentage: formData.overlapPercentage,
      estimatedTime: formData.estimatedTime,
      waypoints: formData.waypoints
    };

    try {
      const res = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/missions/${mission._id}/status`, updatedData);
      setMissions(prev => prev.map(m => (m._id === mission._id ? res.data : m)));
      setShowModal(false);
    } catch (err) {
      console.error("Failed to update mission", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-purple-950 text-white rounded-xl p-4 w-[26rem] shadow-lg">
        <h2 className="text-lg font-bold mb-3">Update Mission</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2 text-xs">

          <label className="flex items-center gap-2">
            <span className="w-1/3 text-left">Mission Name:</span>
            <input name="name" value={formData.name} onChange={handleChange} className="flex-1 p-1 rounded bg-gray-800" required />
          </label>

          <label className="flex items-center gap-2">
            <span className="w-1/3 text-left">Status:</span>
            <select name="status" value={formData.status} onChange={handleChange} className="flex-1 p-1 rounded bg-gray-800">
              <option value="planned">Planned</option>
              <option value="in-progress">In-Progress</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
              <option value="aborted">Aborted</option>
            </select>
          </label>

          {[0, 1, 2].map(i => (
            <div key={i} className="flex gap-2">
              <label className="flex items-center gap-1 flex-1 w-1/2">
                <span className="w-1/3 text-left">Lat {i + 1}:</span>
                <input
                  type="number"
                  step="any"
                  value={formData.waypoints[i]?.lat || ''}
                  onChange={e => handleWaypointChange(i, 'lat', e.target.value)}
                  className="flex-1 p-1 rounded bg-gray-800"
                  required
                />
              </label>
              <label className="flex items-center gap-1 flex-1 w-1/2">
                <span className="w-1/3 text-left">Lng {i + 1}:</span>
                <input
                  type="number"
                  step="any"
                  value={formData.waypoints[i]?.lng || ''}
                  onChange={e => handleWaypointChange(i, 'lng', e.target.value)}
                  className="flex-1 p-1 rounded bg-gray-800"
                  required
                />
              </label>
            </div>
          ))}

          <label className="flex items-center gap-2">
            <span className="w-1/3 text-left">Altitude (m):</span>
            <input name="altitude" type="number" value={formData.altitude} onChange={handleChange} className="flex-1 p-1 rounded bg-gray-800" />
          </label>

          <label className="flex items-center gap-2">
            <span className="w-1/3 text-left">Frequency:</span>
            <input name="frequency" type="number" value={formData.frequency} onChange={handleChange} className="flex-1 p-1 rounded bg-gray-800" />
          </label>

          <label className="flex items-center gap-2">
            <span className="w-1/3 text-left">Sensor Type:</span>
            <input name="sensorType" value={formData.sensorType} onChange={handleChange} className="flex-1 p-1 rounded bg-gray-800" placeholder="e.g., thermal" />
          </label>

          <label className="flex items-center gap-2">
            <span className="w-1/3 text-left">Pattern:</span>
            <select name="pattern" value={formData.pattern} onChange={handleChange} className="flex-1 p-1 rounded bg-gray-800">
              <option value="crosshatch">Crosshatch</option>
              <option value="perimeter">Perimeter</option>
              <option value="custom">Custom</option>
            </select>
          </label>

          <label className="flex items-center gap-2">
            <span className="w-1/3 text-left">Overlap %:</span>
            <input name="overlapPercentage" type="number" value={formData.overlapPercentage} onChange={handleChange} className="flex-1 p-1 rounded bg-gray-800" />
          </label>

          <label className="flex items-center gap-2">
            <span className="w-1/3 text-left">Est. Time (min):</span>
            <input name="estimatedTime" type="number" value={formData.estimatedTime} onChange={handleChange} className="flex-1 p-1 rounded bg-gray-800" />
          </label>

          <div className="flex justify-between mt-3 text-xs">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-1.5 rounded bg-gray-700 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded bg-white text-black hover:bg-purple-200"
            >
              Update Mission
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
