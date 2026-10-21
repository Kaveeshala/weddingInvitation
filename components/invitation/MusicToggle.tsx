"use client";

import { useInvitationAudio } from "./InvitationAudioContext";
import { Music, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicToggle() {
  const { isPlaying, toggleMusic } = useInvitationAudio();

  return (
    <div className="fixed bottom-5 right-5 z-[100] sm:bottom-6 sm:right-6">
      <motion.button
        type="button"
        onClick={toggleMusic}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label={isPlaying ? "Pause wedding music" : "Play wedding music"}
        title={isPlaying ? "Pause music" : "Play music"}
        className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af37]/50 bg-white/90 text-[#b08d57] shadow-[0_8px_24px_rgba(176,141,87,0.25)] backdrop-blur-md transition-colors hover:border-[#b08d57] hover:bg-white"
      >
        {/* Subtle pulsing glow ring when playing */}
        {isPlaying && (
          <span className="pointer-events-none absolute -inset-1 rounded-full border border-[#d4af37]/40 animate-ping opacity-35" />
        )}

        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center relative"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="flex items-center justify-center"
              >
                <Music className="h-5 w-5 text-[#b08d57]" />
              </motion.div>

              {/* Sound wave dot indicator */}
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#b08d57] opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#b08d57]" />
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="paused"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center text-[#998b7e] group-hover:text-[#b08d57]"
            >
              <VolumeX className="h-5 w-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
