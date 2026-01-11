import { useEffect, useRef } from "react";
import SONG from "../audio/song.mp3";

const GlobalAudio = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    const tryPlay = async () => {
      try {
        await audioRef.current.play();
      } catch {
        window.addEventListener(
          "click",
          () => audioRef.current.play(),
          { once: true }
        );
      }
    };

    tryPlay();
  }, []);

  return (
    <audio
      ref={audioRef}
      src={SONG}
      loop
      volume={0.5}
    />
  );
};

export default GlobalAudio;
