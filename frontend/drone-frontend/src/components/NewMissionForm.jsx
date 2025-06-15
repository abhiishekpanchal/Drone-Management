import axios from 'axios';
import { useEffect, useState } from 'react';

export default function NewMissionForm({ setShowModal, setMissions }) {
  const [loading, setLoading] = useState(false);
  const [drones, setDrones] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/drones`)
        .then(res => {
        const availableDrones = res.data.filter(drone => !drone.missionId);
        setDrones(availableDrones);
        })
        .catch(err => console.error("Failed to fetch drones", err));
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const waypoints = [
      { lat: Number(form.lat1.value), lng: Number(form.lng1.value) },
      { lat: Number(form.lat2.value), lng: Number(form.lng2.value) },
      { lat: Number(form.lat3.value), lng: Number(form.lng3.value) }
    ];

    const newMission = {
      name: form.name.value,
      droneId: form.droneId.value,
      waypoints,
      altitude: Number(form.altitude.value),
      frequency: Number(form.frequency.value),
      sensorType: form.sensorType.value,
      pattern: form.pattern.value,
      overlapPercentage: Number(form.overlapPercentage.value),
      estimatedTime: Number(form.estimatedTime.value),
      status: "planned"
    };

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/missions/createMission`, newMission);
      setMissions(prev => [...prev, res.data]);
      setShowModal(false);
    } catch (err) {
      console.error("Failed to add mission", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-purple-950 text-white rounded-xl p-4 w-[26rem] shadow-lg">
        <h2 className="text-lg font-bold mb-3">Add New Mission</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2 text-xs">

          <label className="flex items-center gap-2">
            <span className="w-1/3 text-left">Mission Name:</span>
            <input name="name" className="flex-1 p-1 rounded bg-gray-800" required />
          </label>

          <label className="flex items-center gap-2">
            <span className="w-1/3 text-left">Assign Drone:</span>
            <select name="droneId" className="flex-1 p-1 rounded bg-gray-800" required>
              <option value="">--Select--</option>
              {drones.map(drone => (
                <option key={drone._id} value={drone._id}>{drone.name}</option>
              ))}
            </select>
          </label>

          {[1, 2, 3].map(i => (
            <div key={i} className="flex gap-2">
              <label className="flex items-center gap-1 flex-1 w-1/2">
                <span className="w-1/3 text-left">Lat {i}:</span>
                <input name={`lat${i}`} type="number" step="any" className="flex-1 p-1 rounded bg-gray-800" required />
              </label>
              <label className="flex items-center gap-1 flex-1 w-1/2">
                <span className="w-1/3 text-left">Lng {i}:</span>
                <input name={`lng${i}`} type="number" step="any" className="flex-1 p-1 rounded bg-gray-800" required />
              </label>
            </div>
          ))}

          <label className="flex items-center gap-2">
            <span className="w-1/3 text-left">Altitude (m):</span>
            <input name="altitude" type="number" className="flex-1 p-1 rounded bg-gray-800" defaultValue={100} />
          </label>

          <label className="flex items-center gap-2">
            <span className="w-1/3 text-left">Frequency:</span>
            <input name="frequency" type="number" className="flex-1 p-1 rounded bg-gray-800" defaultValue={10} />
          </label>

          <label className="flex items-center gap-2">
            <span className="w-1/3 text-left">Sensor Type:</span>
            <input name="sensorType" className="flex-1 p-1 rounded bg-gray-800" placeholder="e.g., thermal" />
          </label>

          <label className="flex items-center gap-2">
            <span className="w-1/3 text-left">Pattern:</span>
            <select name="pattern" className="flex-1 p-1 rounded bg-gray-800">
              <option value="crosshatch">Crosshatch</option>
              <option value="perimeter">Perimeter</option>
              <option value="custom">Custom</option>
            </select>
          </label>

          <label className="flex items-center gap-2">
            <span className="w-1/3 text-left">Overlap %:</span>
            <input name="overlapPercentage" type="number" className="flex-1 p-1 rounded bg-gray-800" defaultValue={30} />
          </label>

          <label className="flex items-center gap-2">
            <span className="w-1/3 text-left">Est. Time (min):</span>
            <input name="estimatedTime" type="number" className="flex-1 p-1 rounded bg-gray-800" defaultValue={5} />
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
              disabled={loading}
              className="px-4 py-1.5 rounded bg-white text-black hover:bg-purple-200"
            >
              {loading ? "Creating..." : "Create Mission"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
