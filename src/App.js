import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import ReleaseGate from './components/ReleaseGate';
import AudioPlayer from './components/AudioPlayer';
import Welcome from './pages/Welcome';
import MemoryLane from './pages/MemoryLane';
import Cake from './pages/Cake';
import Letter from './pages/Letter';

const Layout = ({ children }) => {
  return (
    <div className="relative">
      <ReleaseGate>
        <AudioPlayer />
        {children}
      </ReleaseGate>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/memory-lane" element={<MemoryLane />} />
          <Route path="/cake" element={<Cake />} />
          <Route path="/letter" element={<Letter />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;