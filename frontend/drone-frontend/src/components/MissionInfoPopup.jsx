import React from 'react';

export default function MissionInfoPopup({ mission, setShowPopup }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-purple-950 text-white w-[26rem] rounded-xl p-6 shadow-xl relative text-sm">
        <button
          className="absolute top-2 right-3 text-gray-300 hover:text-white text-lg"
          onClick={() => setShowPopup(false)}
        >
          ×
        </button>

        <h2 className="text-xl font-bold text-purple-300 mb-4">Mission Details</h2>

        <div className="flex flex-col gap-2 text-sm">
          <div className="flex">
            <div className="w-1/3 text-left font-semibold">Name:</div>
            <div className="w-2/3 text-right">{mission.name}</div>
          </div>
          <div className="flex">
            <div className="w-1/3 text-left font-semibold">Status:</div>
            <div className="w-2/3 text-right capitalize">{mission.status}</div>
          </div>
          <div className="flex">
            <div className="w-1/3 text-left font-semibold">Drone:</div>
            <div className="w-2/3 text-right">{mission.droneId?.name ?? 'Unassigned'}</div>
          </div>
          <div className="flex">
            <div className="w-1/3 text-left font-semibold">Altitude:</div>
            <div className="w-2/3 text-right">{mission.altitude} m</div>
          </div>
          <div className="flex">
            <div className="w-1/3 text-left font-semibold">Frequency:</div>
            <div className="w-2/3 text-right">{mission.frequency} Hz</div>
          </div>
          <div className="flex">
            <div className="w-1/3 text-left font-semibold">Sensor:</div>
            <div className="w-2/3 text-right">{mission.sensorType || '--'}</div>
          </div>
          <div className="flex">
            <div className="w-1/3 text-left font-semibold">Pattern:</div>
            <div className="w-2/3 text-right capitalize">{mission.pattern}</div>
          </div>
          <div className="flex">
            <div className="w-1/3 text-left font-semibold">Overlap:</div>
            <div className="w-2/3 text-right">{mission.overlapPercentage}%</div>
          </div>
          <div className="flex">
            <div className="w-1/3 text-left font-semibold">Est. Time:</div>
            <div className="w-2/3 text-right">{mission.estimatedTime} min</div>
          </div>
          <div className="flex justify-between mt-2">
            <div className="text-left font-semibold mb-1">Waypoints:</div>
            <ul className="list-disc list-inside space-y-1 text-gray-300 pl-3">
              {mission.waypoints?.map((wp, i) => (
                <li key={i} className='text-left ml-16'>
                  Lat: {wp.lat}, Lng: {wp.lng}
                </li>
              )) ?? <li>None</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
