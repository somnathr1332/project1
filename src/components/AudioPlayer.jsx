import React, { useEffect, useRef, useState } from "react";
import SONG from "../audio/song.mp3";

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;

    const tryAutoplay = async () => {
      try {
        await audio.play();
      } catch {
        // Autoplay blocked → wait for user click
        window.addEventListener(
          "click",
          () => audio.play(),
          { once: true }
        );
      }
    };

    tryAutoplay();

    // 🔥 Sync state with REAL audio status
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      await audio.play();
    } else {
      audio.pause();
    }
  };

  const handleVolume = (e) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (audioRef.current) audioRef.current.volume = val;
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Audio Element */}
      <audio ref={audioRef} src={SONG} loop />

      {/* UI */}
      <div className="flex items-center gap-3 p-3 rounded-full backdrop-blur-md bg-black/40 shadow-2xl">
        <button
          onClick={togglePlay}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-b-pink to-b-purple text-white hover:scale-110 active:scale-95 transition"
        >
          {isPlaying ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={handleVolume}
          className="w-20"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
