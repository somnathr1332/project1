import { createContext, useRef } from "react";
import SONG from "../audio/song.mp3";

export const AudioContext = createContext();

const AudioProvider = ({ children }) => {
  const audioRef = useRef(new Audio(SONG));
  audioRef.current.loop = true;
  audioRef.current.volume = 0.5;

  return (
    <AudioContext.Provider value={audioRef}>
      {children}
    </AudioContext.Provider>
  );
};

export default AudioProvider;
