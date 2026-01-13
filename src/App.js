import React, { useEffect } from "react";
import { HashRouter, Routes, Route, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

// --- COMPONENTS ---
import ReleaseGate from "./components/ReleaseGate";
import AudioPlayer from "./components/AudioPlayer";
import PasswordHome from "./components/PasswordHome"; 

// --- PAGES ---
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

// 🌟 Layout wrapper (Only for the Main App pages, not the password page)
const MainLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-pink-200 to-yellow-200">
      <AudioPlayer />
      {children}
    </div>
  );
};

// 🔐 Wrapper for the Password Logic to handle Navigation
const PasswordPageWrapper = () => {
  const navigate = useNavigate();

  // Check if already unlocked previously
  useEffect(() => {
    if (localStorage.getItem("access_granted") === "true") {
      navigate("/home");
    }
  }, [navigate]);

  const handleUnlock = () => {
    localStorage.setItem("access_granted", "true");
    launchConfetti();
    // 👉 NAVIGATE TO HOME AFTER SUCCESS
    navigate("/home");
  };

  return <PasswordHome onUnlock={handleUnlock} />;
};

// 💌 App Component
const App = () => {
  return (
    // 1. ReleaseGate is the "God" wrapper. 
    // Nothing below runs until the timer ends.
    <HashRouter>
  <ReleaseGate>
    <Routes>
      <Route path="/" element={<PasswordPageWrapper />} />

      <Route
        path="/home"
        element={
          <MainLayout>
            <Welcome />
          </MainLayout>
        }
      />

      <Route
        path="/memory-lane"
        element={
          <MainLayout>
            <MemoryLane />
          </MainLayout>
        }
      />

      <Route
        path="/cake"
        element={
          <MainLayout>
            <Cake launchConfetti={launchConfetti} />
          </MainLayout>
        }
      />

      <Route
        path="/letter"
        element={
          <MainLayout>
            <Letter />
          </MainLayout>
        }
      />
    </Routes>
  </ReleaseGate>
</HashRouter>

  );
};

export default App;