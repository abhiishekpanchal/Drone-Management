import axios from 'axios';
import React, { useEffect, useState } from 'react'

function DroneCard({drone, onUpdate, onKnowMore, onTrack}) {
    const [missionName, setMissionName] = useState(null);

    useEffect(() => {
        if (drone.missionId) {
        axios
            .get(`${import.meta.env.VITE_API_BASE_URL}/api/missions/${drone.missionId}`)
            .then(res => setMissionName(res.data.name))
            .catch(err => console.error("Failed to fetch mission name:", err));
        }
    }, [drone.missionId]);

  return (
    <div className="bg-gray-950 border-2 border-purple-700 hover:border-purple-400 p-5 rounded-xl w-72 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold text-purple-300 mb-1">{drone.name}</h2>
              <p className="text-sm text-gray-400">
                {missionName ? `Mission: ${missionName}` : 'No mission allotted'}
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <button className="w-full py-1 rounded bg-purple-700 hover:bg-purple-600 transition" onClick={onKnowMore}>Know More</button>
              <button className="w-full py-1 rounded bg-purple-700 hover:bg-purple-600 transition" onClick={onTrack}>Track Fleet</button>
              <button className="w-full py-1 rounded bg-purple-700 hover:bg-purple-600 transition" onClick={onUpdate}>Update Fleet</button>
            </div>
    </div>
  )
}

export default DroneCard