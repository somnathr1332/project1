import React, { useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import confetti from "canvas-confetti";

import ReleaseGate from "./components/ReleaseGate";
import AudioPlayer from "./components/AudioPlayer";

import Welcome from "./pages/Welcome";
import MemoryLane from "./pages/MemoryLane";
import Cake from "./pages/Cake";
import Letter from "./pages/Letter";

// 🎉 Confetti trigger function
const launchConfetti = () => {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
  });
};

// 🌟 Layout wrapper
const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-pink-200 to-yellow-200">
      <ReleaseGate>
        <AudioPlayer />
        {children}
      </ReleaseGate>
    </div>
  );
};

// 💌 App component
const App = () => {
  // Launch confetti on first load
  useEffect(() => {
    launchConfetti();
  }, []);

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/memory-lane" element={<MemoryLane />} />
          <Route path="/cake" element={<Cake launchConfetti={launchConfetti} />} />
          <Route path="/letter" element={<Letter />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;