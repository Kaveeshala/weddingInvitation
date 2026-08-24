"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import InvitationIntro from "@/components/invitation/InvitationIntro";
import { LanguageProvider } from "@/components/invitation/InvitationLanguageContext";
import LanguageToggle from "@/components/invitation/LanguageToggle";

interface InviteIntroClientProps {
  token: string;
}

export default function InviteIntroClient({
  token,
}: InviteIntroClientProps) {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [videoFadingOut, setVideoFadingOut] = useState(false);

  const cardTarget = token === "preview" ? "/invite/preview/card" : `/invite/${token}/card`;

  useEffect(() => {
    if (!showVideo) return;

    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    
    // Play with a slight delay to allow the fade-in animation to start
    video.play().catch(() => {});

    const handleEnded = () => {
      setVideoFadingOut(true);
      setTimeout(() => {
        router.push(cardTarget);
      }, 1800);
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, [showVideo, router, cardTarget]);

  return (
    <LanguageProvider>
      <main className="relative min-h-screen w-full overflow-hidden bg-wedding-bg">
        <LanguageToggle />

        <AnimatePresence>
          {!showVideo && (
            <motion.div
              key="intro-layer"
              className="min-h-screen w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              <InvitationIntro onOpen={() => setShowVideo(true)} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showVideo && (
            <motion.div
              key="video-layer"
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
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
      </main>
    </LanguageProvider>
  );
}