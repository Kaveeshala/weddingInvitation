"use client";

import { motion } from "framer-motion";

const hearts = [0, 1, 2];

export default function FloralDivider() {
  return (
    <div
      className="flex items-center justify-center gap-3 w-full max-w-xs mx-auto"
      role="presentation"
      aria-hidden="true"
    >
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#d4aa7d]/80" />

      {hearts.map((i) => (
        <motion.svg
          key={i}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ opacity: 0.82, y: 0, scale: 1 }}
          animate={{
            opacity: [0.75, 1, 0.82],
            y: [0, -4, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
          style={{
            filter: "drop-shadow(0 0 8px rgba(176, 141, 87, 0.18))",
          }}
        >
          <path
            d="M12 20.5C11.7 20.5 11.4 20.4 11.15 20.2C6.3 16.7 3 13.74 3 9.75C3 7.02 5.14 5 7.72 5C9.38 5 10.93 5.86 12 7.2C13.07 5.86 14.62 5 16.28 5C18.86 5 21 7.02 21 9.75C21 13.74 17.7 16.7 12.85 20.2C12.6 20.4 12.3 20.5 12 20.5Z"
            fill="#f4e8d0"
            stroke={i === 1 ? "#b08d57" : "#d4aa7d"}
            strokeWidth="1.6"
          />
        </motion.svg>
      ))}

      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#d4aa7d]/80" />
    </div>
  );
}