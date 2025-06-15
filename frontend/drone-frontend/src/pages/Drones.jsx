import { useEffect, useState } from 'react';
import axios from 'axios';
import DroneCard from '../components/DroneCard';
import NewDroneForm from '../components/NewDroneForm';
import UpdateDroneForm from '../components/UpdateDroneForm';
import DroneInfoPopup from '../components/DroneInfoPopup';
import DroneMapPopup from '../components/DroneMapPopup';
import { useNavigate } from 'react-router-dom';

export default function Drones() {
  const [drones, setDrones] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [droneToUpdate, setDroneToUpdate] = useState(null);

  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [selectedDrone, setSelectedDrone] = useState(null);

  const [showMap, setShowMap] = useState(false);
  const [droneToTrack, setDroneToTrack] = useState(null);
  const [missionToTrack, setMissionToTrack] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/drones`)
      .then(res => setDrones(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-black flex flex-col justify-center py-2">
      <div className="relative flex items-center w-full px-20 mb-2">
        <button onClick={() => navigate('/')} className="py-1 px-5 text-sm rounded-xl text-white bg-gray-950 border border-purple-700">
            Back
        </button>
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold text-purple-400">
            Drone Fleet
        </h1>
      </div>

      
      <div className="flex flex-wrap justify-center gap-6 border-2 border-purple-700 rounded-xl mx-20 py-2 overflow-y-auto">
        {drones.map(drone => (
            <div key={drone._id}>
            <DroneCard drone={drone} 
            onUpdate={() => {
                setDroneToUpdate(drone);
                setShowUpdateModal(true);
            }}
            onKnowMore={() => {
                setSelectedDrone(drone);
                setShowInfoPopup(true);
            }}
            onTrack={async () => {
                setDroneToTrack(drone);
                if (drone.missionId) {
                try {
                    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/missions/${drone.missionId}`);
                    setMissionToTrack(res.data);
                    setShowMap(true);
                } catch (err) {
                    console.error("Failed to fetch mission for drone:", err);
                }
                } else {
                alert("No mission assigned to this drone.");
                }
            }}/>
            </div>
        ))}

        {/* Add New Drone Card */}
        <div onClick={() => setShowModal(true)} className="bg-gray-950 border-2 border-dashed border-purple-700 hover:border-purple-400 p-5 rounded-xl w-72 flex flex-col justify-center items-center text-purple-400 cursor-pointer">
          <span className="text-2xl font-bold mb-2">+</span>
          <p className="text-sm">Add New Drone</p>
        </div>
      </div>

      {/* Add Drone Form Modal */}
      {showModal && <NewDroneForm setShowModal={setShowModal} setDrones={setDrones} />}

      {showUpdateModal && (
        <UpdateDroneForm
            drone={droneToUpdate}
            setShowModal={setShowUpdateModal}
            setDrones={setDrones}
        />
      )}

      {showInfoPopup && (
        <DroneInfoPopup
            drone={selectedDrone}
            setShowPopup={setShowInfoPopup}
        />
      )}

      {showMap && (
        <DroneMapPopup
            drone={droneToTrack}
            mission={missionToTrack}
            setShowMap={setShowMap}
        />
      )}

    </div>
  );
}
