"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function LandingPage() {
  const router = useRouter();
  const [tapping, setTapping] = useState(false);

  const handleTap = async () => {
    if (tapping) return;
    setTapping(true);

    setTimeout(() => {
      router.push("/invitation");
    }, 2600);
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-[#f4ece0]">
      <motion.img
        src="/images/wedding_image5.jpeg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover md:object-contain"
        initial={{
          filter: "blur(6px) brightness(0.6)",
          scale: 1,
          opacity: 1,
        }}
        animate={
          tapping
            ? {
                filter: "blur(0px) brightness(1)",
                scale: 1.02,
                opacity: 1,
              }
            : {
                filter: "blur(6px) brightness(0.6)",
                scale: 1,
                opacity: 1,
              }
        }
        transition={{
          duration: 1.4,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          objectPosition: "center center",
        }}
      />

      <motion.div
        className="absolute inset-0"
        aria-hidden="true"
        initial={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.45) 100%)",
          opacity: 1,
        }}
        animate={tapping ? { opacity: 0.15 } : { opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      <motion.div
        className="absolute inset-0 bg-[#fdf8f2]"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={tapping ? { opacity: 1 } : { opacity: 0 }}
        transition={{
          delay: 1.4,
          duration: 0.9,
          ease: "easeInOut",
        }}
      />

      <AnimatePresence>
        {!tapping && (
          <motion.div
            className="relative z-10 flex flex-col items-center gap-8 text-center px-6"
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col items-center gap-2">
              <motion.p
                className="text-[#ebb276] text-4xl"
                style={{ fontFamily: "var(--font-sinhala)" }}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                අපේ මගුල් ගෙදර එන්න
              </motion.p>

              <motion.p
                className="text-white/70 font-light tracking-widest text-lg"
                style={{ fontFamily: "var(--font-geist-sans)" }}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
              >
                28 · January · 2027
              </motion.p>
            </div>

            <motion.button
              onClick={handleTap}
              aria-label="Open wedding invitation"
              className="tap-btn relative z-0 px-12 py-2 rounded-full tracking-wide text-md uppercase text-[#2c2c2c] bg-[#d4aa7d] font-medium active:scale-95"
              style={{ fontFamily: "var(--font-geist-sans)" }}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              Tap
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}