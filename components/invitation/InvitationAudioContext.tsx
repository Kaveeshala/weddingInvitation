"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";

interface AudioContextType {
  isPlaying: boolean;
  userPaused: boolean;
  playMusic: () => Promise<void>;
  pauseMusic: () => void;
  toggleMusic: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function InvitationAudioProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  const playMusic = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      audio.volume = 0.55; // Gentle wedding background volume
      await audio.play();
      setIsPlaying(true);
      setUserPaused(false);
    } catch (err) {
      // Browser autoplay policy might block if there was no user interaction yet
      console.warn("Background music autoplay deferred pending user interaction:", err);
      setIsPlaying(false);
    }
  }, []);

  const pauseMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    setIsPlaying(false);
    setUserPaused(true);
  }, []);

  const toggleMusic = useCallback(() => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  }, [isPlaying, pauseMusic, playMusic]);

  // Synchronize state with native HTMLAudioElement events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        userPaused,
        playMusic,
        pauseMusic,
        toggleMusic,
      }}
    >
      {children}
      <audio
        ref={audioRef}
        src="/audio/background_music.mp3"
        loop
        preload="auto"
        playsInline
      />
    </AudioContext.Provider>
  );
}

export function useInvitationAudio(): AudioContextType {
  const context = useContext(AudioContext);
  if (!context) {
    return {
      isPlaying: false,
      userPaused: false,
      playMusic: async () => {},
      pauseMusic: () => {},
      toggleMusic: () => {},
    };
  }
  return context;
}
