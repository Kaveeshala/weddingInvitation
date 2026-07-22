"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import InvitationIntro from "@/components/invitation/InvitationIntro";

interface InviteIntroClientProps {
  token: string;
}

export default function InviteIntroClient({
  token,
}: InviteIntroClientProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [videoFadingOut, setVideoFadingOut] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.playsInline = true;
    video.play().catch(() => {});
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setVideoFadingOut(true);
      setTimeout(() => {
        setVideoEnded(true);
      }, 1800);
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-wedding-bg">
      <AnimatePresence>
        {!videoEnded && (
          <motion.div
            key="video-layer"
            className="fixed inset-0 z-50"
            initial={{ opacity: 1 }}
            animate={{ opacity: videoFadingOut ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          >
            <video
              ref={videoRef}
              src="/videos/Cover_video.mp4"
              className="w-full h-full object-cover"
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {videoEnded && (
          <motion.div
            key="intro-layer"
            className="min-h-screen w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <InvitationIntro invitePath={`/invite/${token}/card`} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}