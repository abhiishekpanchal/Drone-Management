import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashBoard from './pages/DashBoard'
import Drones from './pages/Drones';
import Missions from './pages/Missions';

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<DashBoard />}/>
        <Route path='/drones' element={<Drones />}/>
        <Route path='/missions' element={<Missions />}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
