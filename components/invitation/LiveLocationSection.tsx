"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "./InvitationLanguageContext";

interface LiveLocationSectionProps {
  mapUrl: string;
}

export default function LiveLocationSection({
  mapUrl,
}: LiveLocationSectionProps) {
  const { language } = useLanguage();
  const isEn = language === "en";

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
            fontFamily: isEn
              ? "var(--font-geist-sans)"
              : "var(--font-sinhala)",
            fontSize: "0.78rem",
            letterSpacing: isEn ? "0.32em" : "0.12em",
            color: "var(--wedding-primary)",
            textTransform: "uppercase",
          }}
        >
          {isEn ? "LIVE LOCATION" : "සජීවී ස්ථානය"}
        </p>

        <h3
          className="mt-3 text-wedding-heading"
          style={{
            fontFamily: isEn
              ? "var(--font-geist-sans)"
              : "var(--font-sinhala)",
            fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
            fontWeight: 500,
            letterSpacing: "0.04em",
          }}
        >
          {isEn ? "Royal Arcade" : "රෝයල් ආකේඩ්"}
        </h3>

        <p
          className="mt-2 text-wedding-muted"
          style={{
            fontFamily: isEn
              ? "var(--font-geist-sans)"
              : "var(--font-sinhala)",
            fontSize: "clamp(0.95rem, 2.4vw, 1.1rem)",
            letterSpacing: isEn ? "0.12em" : "normal",
          }}
        >
          {isEn ? "Udugampola, Gampaha" : "උඩුගම්පොළ, ගම්පහ"}
        </p>

        <div className="mt-8 mb-4 w-full max-w-sm overflow-hidden rounded-xl shadow-lg border border-wedding-accent/20 relative h-64">
          <iframe
            src="https://maps.google.com/maps?q=Royal%20Arcade,%20Udugampola,%20Gampaha&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Wedding Venue Location"
          ></iframe>
        </div>

        <motion.a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3 text-white"
          style={{
            background: "var(--wedding-gradient)",
            fontFamily: isEn
              ? "var(--font-geist-sans)"
              : "var(--font-sinhala)",
            fontSize: "0.88rem",
            letterSpacing: isEn ? "0.16em" : "0.06em",
            textTransform: isEn ? "uppercase" : "none",
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

          <span className="relative z-10">
            {isEn ? "Open Live Location" : "ස්ථානය සිතියමෙන් බලන්න"}
          </span>
        </motion.a>
      </div>
    </motion.section>
  );
}