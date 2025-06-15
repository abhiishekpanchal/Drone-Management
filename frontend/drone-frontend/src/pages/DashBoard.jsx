import React from 'react';
import { useNavigate } from 'react-router-dom';

function DashBoard() {
    const navigate = useNavigate()

  return (
    <div className='fixed top-0 left-0 w-screen h-screen flex justify-center items-center gap-10 bg-black'>

      {/* Drones Section */}
        <div className='flex flex-col gap-6 justify-start items-center w-1/5 min-h-44 rounded-xl bg-gray-950 p-4 border-2 border-purple-700 hover:border-purple-400 transition-all duration-200'>
          <button onClick={() => navigate('/drones')} className='py-2 px-12 rounded-xl uppercase bg-purple-700 text-white hover:bg-purple-600 transition'>Drones</button>
          <div className='text-sm text-center text-gray-600'>
            View real-time drone data, including status, battery, and location. Manage your fleet effortlessly.
          </div>
        </div>

      {/* Missions Section */}
        <div className='flex flex-col gap-6 justify-start items-center w-1/5 min-h-44 rounded-xl bg-gray-950 p-4 border-2 border-purple-700 hover:border-purple-400 transition-all duration-200'>
          <button onClick={() => navigate('/missions')} className='py-2 px-12 rounded-xl uppercase bg-purple-700 text-white hover:bg-purple-600 transition'>Missions</button>
          <div className='text-sm text-center text-gray-600'>
            Plan and launch autonomous drone missions with configurable waypoints and live tracking.
          </div>
        </div>

    </div>
  );
}

export default DashBoard;
