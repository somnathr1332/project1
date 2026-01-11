import { useLocation } from "react-router-dom";
import GlobalAudio from "./components/GlobalAudio";
import AudioPlayerUI from "./components/AudioPlayerUI";
import ReleaseGate from "./components/ReleaseGate";

const Layout = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="relative">
      <ReleaseGate>
        {/* Music ALWAYS plays */}
        <GlobalAudio />

        {/* UI ONLY on Home */}
        {isHome && <AudioPlayerUI />}

        {children}
      </ReleaseGate>
    </div>
  );
};

export default Layout;
