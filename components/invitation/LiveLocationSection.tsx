"use client";

import { motion } from "framer-motion";

interface LiveLocationSectionProps {
  mapUrl: string;
}

export default function LiveLocationSection({
  mapUrl,
}: LiveLocationSectionProps) {
  return (
    <motion.section
      id="location-section"
      className="px-6 py-14 flex justify-center"
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.05, duration: 0.75 }}
      style={{
        background:
          "linear-gradient(180deg, rgba(248, 238, 227, 0.92) 0%, rgba(246, 234, 221, 0.94) 52%, rgba(244, 232, 208, 0.78) 100%)",
      }}
    >
      <div className="w-full max-w-2xl text-center flex flex-col items-center">
        <p
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "0.78rem",
            letterSpacing: "0.32em",
            color: "var(--wedding-primary)",
            textTransform: "uppercase",
          }}
        >
          LIVE LOCATION
        </p>

        <h3
          className="mt-3 text-wedding-heading"
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
            fontWeight: 500,
            letterSpacing: "0.04em",
          }}
        >
          Royal Arcade
        </h3>

        <p
          className="mt-2 text-wedding-muted"
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "clamp(0.95rem, 2.4vw, 1.1rem)",
            letterSpacing: "0.12em",
          }}
        >
          Udugampola
        </p>

        <p
          className="mt-4 max-w-md text-wedding-muted"
          style={{
            fontFamily: "var(--font-sinhala)",
            fontSize: "clamp(0.9rem, 2.1vw, 1rem)",
            lineHeight: 1.9,
          }}
        >
          උත්සව ශාලාවේ ස්ථානය පහතින් බලන්න.
        </p>

        <motion.a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3 text-white"
          style={{
            background: "var(--wedding-gradient)",
            fontFamily: "var(--font-geist-sans)",
            fontSize: "0.88rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            boxShadow: "0 10px 24px rgba(176, 141, 87, 0.22)",
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.span
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(115deg, transparent 18%, rgba(255,255,255,0.08) 34%, rgba(255,255,255,0.32) 50%, rgba(255,255,255,0.08) 66%, transparent 82%)",
              transform: "translateX(-140%)",
            }}
            animate={{ x: ["0%", "220%"] }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              repeatDelay: 1.2,
              ease: "easeInOut",
            }}
          />

          <span className="relative z-10">Open Live Location</span>
        </motion.a>
      </div>
    </motion.section>
  );
}