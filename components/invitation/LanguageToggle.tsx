"use client";

import { useLanguage } from "./InvitationLanguageContext";
import { motion } from "framer-motion";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-4 right-4 z-[100] flex items-center p-1 rounded-full border border-[#d4af37]/40 bg-white/80 backdrop-blur-md shadow-[0_8px_20px_rgba(176,141,87,0.15)] select-none"
    >
      <button
        type="button"
        onClick={() => setLanguage("si")}
        className={`relative rounded-full px-3.5 py-1 text-xs font-semibold transition-all duration-300 ${
          language === "si"
            ? "text-white shadow-sm"
            : "text-[#77685a] hover:text-[#b08d57]"
        }`}
        style={{
          fontFamily: "var(--font-sinhala)",
        }}
      >
        {language === "si" && (
          <motion.div
            layoutId="active-lang-bg"
            className="absolute inset-0 rounded-full"
            style={{ background: "var(--wedding-gradient)" }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <span className="relative z-10">සිංහල</span>
      </button>

      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`relative rounded-full px-3.5 py-1 text-xs font-semibold transition-all duration-300 ${
          language === "en"
            ? "text-white shadow-sm"
            : "text-[#77685a] hover:text-[#b08d57]"
        }`}
        style={{
          fontFamily: "var(--font-geist-sans)",
          letterSpacing: "0.04em",
        }}
      >
        {language === "en" && (
          <motion.div
            layoutId="active-lang-bg"
            className="absolute inset-0 rounded-full"
            style={{ background: "var(--wedding-gradient)" }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <span className="relative z-10">English</span>
      </button>
    </motion.div>
  );
}
