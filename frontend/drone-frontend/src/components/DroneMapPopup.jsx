import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom drone icon
const droneIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
});

// Haversine formula (accurate earth distance in km)
function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

export default function DroneMapPopup({ drone, mission, setShowMap }) {
  const speed = drone.speed ?? 20; // km/h
  const intervalMs = 1000; // update every 1s

  const [position, setPosition] = useState(mission.waypoints[0]);
  const [currentLeg, setCurrentLeg] = useState(0);
  const intervalRef = useRef(null);

  const moveToNext = () => {
    if (currentLeg >= mission.waypoints.length - 1) {
      clearInterval(intervalRef.current);
      return;
    }

    const from = mission.waypoints[currentLeg];
    const to = mission.waypoints[currentLeg + 1];

    const latDiff = to.lat - from.lat;
    const lngDiff = to.lng - from.lng;

    const totalDistance = Math.sqrt(latDiff ** 2 + lngDiff ** 2);
    const stepSize = (speed / 3600) / 0.111;

    const nextLat = position.lat + (latDiff / totalDistance) * stepSize;
    const nextLng = position.lng + (lngDiff / totalDistance) * stepSize;

    const reached =
      Math.abs(nextLat - to.lat) < 0.0002 && Math.abs(nextLng - to.lng) < 0.0002;

    if (reached) {
      setPosition(to);
      setCurrentLeg((prev) => prev + 1);
    } else {
      setPosition({ lat: nextLat, lng: nextLng });
    }
  };

  useEffect(() => {
    intervalRef.current = setInterval(moveToNext, intervalMs);
    return () => clearInterval(intervalRef.current);
  }, [currentLeg, position]);

  const totalDistance = useMemo(() => {
    let dist = 0;
    for (let i = 0; i < mission.waypoints.length - 1; i++) {
      const wp1 = mission.waypoints[i];
      const wp2 = mission.waypoints[i + 1];
      dist += getDistance(wp1.lat, wp1.lng, wp2.lat, wp2.lng);
    }
    return dist;
  }, [mission]);

  const distanceCovered = useMemo(() => {
    if (currentLeg === 0) return 0;

    let covered = 0;
    for (let i = 0; i < currentLeg; i++) {
      const wp1 = mission.waypoints[i];
      const wp2 = mission.waypoints[i + 1];
      covered += getDistance(wp1.lat, wp1.lng, wp2.lat, wp2.lng);
    }

    if (currentLeg > 0) {
        const from = mission.waypoints[currentLeg - 1];
        const partial = getDistance(from.lat, from.lng, position.lat, position.lng);
        return covered + partial;
    } else {
        return 0;
    }
  }, [position, currentLeg, mission]);

  const progressPercent = Math.min(
    100,
    Math.round((distanceCovered / totalDistance) * 100)
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl w-[90vw] h-[80vh] flex shadow-2xl overflow-hidden">

        {/* LEFT PANEL: Info */}
        <div className="w-1/3 p-6 text-white bg-gray-950 relative">
          <button
            className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-purple-300"
            onClick={() => setShowMap(false)}
          >
            ×
          </button>
          <h2 className="text-xl font-bold mb-6 text-purple-300">{drone.name}</h2>

          <div className="flex flex-col gap-4 text-sm">
            <div className="flex justify-between"><span>Status:</span><span>{drone.status}</span></div>
            <div className="flex justify-between"><span>Battery:</span><span>{drone.battery}%</span></div>
            <div className="flex justify-between"><span>Speed:</span><span>{speed} km/h</span></div>
            <div className="flex justify-between"><span>Temp:</span><span>{drone.temperature ?? '--'} °C</span></div>
            <div className="flex justify-between"><span>Signal:</span><span>{drone.signalStrength ?? '--'}%</span></div>
            <div className="flex justify-between"><span>Latitude:</span><span>{position.lat.toFixed(5)}</span></div>
            <div className="flex justify-between"><span>Longitude:</span><span>{position.lng.toFixed(5)}</span></div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <h3 className="text-sm text-gray-300 mb-1">Mission Progress</h3>
            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
              <div
                className="bg-purple-500 h-3 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1 text-center">{progressPercent}% completed</p>
          </div>
        </div>

        {/* RIGHT PANEL: Map */}
        <div className="w-2/3 h-full">
          <MapContainer center={[position.lat, position.lng]} zoom={17} className="w-full h-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
            <Polyline positions={mission.waypoints.map(wp => [wp.lat, wp.lng])} color="purple" />
            <Marker position={[position.lat, position.lng]} icon={droneIcon}>
              <Popup>
                <strong>{drone.name}</strong><br />
                Battery: {drone.battery}%<br />
                Status: {drone.status}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
