import { useEffect, useState } from 'react';
import axios from 'axios';
import MissionCard from '../components/MissionCard';
import NewMissionForm from '../components/NewMissionForm';
import MissionInfoPopup from '../components/MissionInfoPopup';
import UpdateMissionForm from '../components/UpdateMissionForm';
import { useNavigate } from 'react-router-dom';

export default function Missions() {
  const [missions, setMissions] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [selectedMission, setSelectedMission] = useState(null);
  const [showInfoPopup,setShowInfoPopup] = useState(false);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [missionToUpdate, setMissionToUpdate] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/missions`)
      .then(res => setMissions(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-black flex flex-col justify-center py-2">
      <div className="relative flex items-center w-full px-20 mb-2">
        <button onClick={() => navigate('/')} className="py-1 px-5 text-sm rounded-xl text-white bg-gray-950 border border-purple-700">
            Back
        </button>
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold text-purple-400">
            Missions Overview
        </h1>
      </div>

      <div className="flex flex-wrap justify-center gap-6 border-2 border-purple-700 rounded-xl mx-20 py-2 overflow-y-auto">
        {missions.map(mission => (
          <div key={mission._id}>
            <MissionCard 
            mission={mission} 
            onKnowMore={() => {
                setSelectedMission(mission);
                setShowInfoPopup(true);
            }}
            onUpdate={() => {
                setMissionToUpdate(mission);
                setShowUpdateModal(true);
            }} />
          </div>
        ))}

        {/* Add New Mission Card */}
        <div onClick={() => setShowModal(true)} className="bg-gray-950 border-2 border-dashed border-purple-700 hover:border-purple-400 p-5 rounded-xl w-72 flex flex-col justify-center items-center text-purple-400 cursor-pointer">
          <span className="text-2xl font-bold mb-2">+</span>
          <p className="text-sm">Add New Mission</p>
        </div>
      </div>

      {/* New Mission Modal */}
      {showModal && (
        <NewMissionForm
          setShowModal={setShowModal}
          setMissions={setMissions}
        />
      )}

      {showInfoPopup && (
        <MissionInfoPopup
            mission={selectedMission}
            setShowPopup={setShowInfoPopup}
        />
      )}

      {showUpdateModal && (
        <UpdateMissionForm
            mission={missionToUpdate}
            setShowModal={setShowUpdateModal}
            setMissions={setMissions}
        />
      )}

    </div>
  );
}
