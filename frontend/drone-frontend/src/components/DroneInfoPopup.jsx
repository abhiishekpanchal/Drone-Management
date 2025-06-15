// components/DroneInfoPopup.jsx
import React from 'react';

export default function DroneInfoPopup({ drone, setShowPopup }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-purple-950 text-white w-[26rem] rounded-xl p-6 shadow-xl relative text-sm">
        <button
          className="absolute top-2 right-3 text-gray-300 hover:text-white text-lg"
          onClick={() => setShowPopup(false)}
        >
          ×
        </button>

        <h2 className="text-xl font-bold text-purple-300 mb-4">Drone Details</h2>

        <div className="flex flex-col gap-2 text-sm">
            <div className="flex">
                <div className="w-1/3 text-left font-semibold">Name:</div>
                <div className="w-2/3 text-right">{drone.name}</div>
            </div>
            <div className="flex">
                <div className="w-1/3 text-left font-semibold">Status:</div>
                <div className="w-2/3 text-right">{drone.status}</div>
            </div>
            <div className="flex">
                <div className="w-1/3 text-left font-semibold">Battery:</div>
                <div className="w-2/3 text-right">{drone.battery}%</div>
            </div>
            <div className="flex">
                <div className="w-1/3 text-left font-semibold">Speed:</div>
                <div className="w-2/3 text-right">{drone.speed ?? '--'} km/h</div>
            </div>
            <div className="flex">
                <div className="w-1/3 text-left font-semibold">Temperature:</div>
                <div className="w-2/3 text-right">{drone.temperature ?? '--'} °C</div>
            </div>
            <div className="flex">
                <div className="w-1/3 text-left font-semibold">Signal:</div>
                <div className="w-2/3 text-right">{drone.signalStrength ?? '--'}%</div>
            </div>
            <div className="flex">
                <div className="w-1/3 text-left font-semibold">Location:</div>
                <div className="w-2/3 text-right">
                {drone.location.lat}, {drone.location.lng}
                </div>
            </div>
            <div className="flex">
                <div className="w-1/3 text-left font-semibold">Mission:</div>
                <div className="w-2/3 text-right">{drone.missionId ?? 'None'}</div>
            </div>
        </div>

      </div>
    </div>
  );
}
