import React from 'react';

function MissionCard({ mission, onUpdate, onKnowMore }) {

  return (
    <div className="bg-gray-950 border-2 border-purple-700 hover:border-purple-400 p-5 rounded-xl w-72 flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold text-purple-300 mb-1">{mission.name}</h2>
        <p className="text-sm text-gray-400">
          Drone: {mission.droneId?.name ?? 'Unassigned'}
        </p>
        <p className="text-sm text-gray-500 capitalize">Status: {mission.status}</p>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <button className="w-full py-1 rounded bg-purple-700 hover:bg-purple-600 transition" onClick={onKnowMore}>Know More</button>
        <button className="w-full py-1 rounded bg-purple-700 hover:bg-purple-600 transition" onClick={onUpdate}>Update Mission</button>
      </div>
    </div>
  );
}

export default MissionCard;
