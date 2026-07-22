"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface InvitationIntroProps {
  invitePath?: string;
}

export default function InvitationIntro({
  invitePath = "/invitation",
}: InvitationIntroProps) {
  const router = useRouter();

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-between bg-wedding-bg px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Main content — centred vertically */}
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.7 }}
              className="text-wedding-primary uppercase"
              style={{
                fontFamily: "var(--font-sinhala)",
                fontSize: "clamp(1rem, 2.8vw, 1.25rem)",
                letterSpacing: "0.12em",
                lineHeight: 1.6,
              }}
            >
              ආදරණීය විවාහ මංගල උත්සවය
            </motion.p>

            {/* Bride name */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.75 }}
              className="mt-10 text-wedding-heading"
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "clamp(3rem, 11vw, 6.2rem)",
                fontWeight: 500,
                lineHeight: 0.95,
                letterSpacing: "0.03em",
              }}
            >
              Dilma
            </motion.p>

            {/* & */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.75 }}
              className="mt-3 text-wedding-primary"
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "clamp(2rem, 5vw, 2.8rem)",
                lineHeight: 1,
              }}
            >
              &
            </motion.p>

            {/* Groom name */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.75 }}
              className="mt-3 text-wedding-heading"
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "clamp(3rem, 11vw, 6.2rem)",
                fontWeight: 500,
                lineHeight: 0.95,
                letterSpacing: "0.03em",
              }}
            >
              Isuru
            </motion.p>

            {/* Invitation text */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.64, duration: 0.7 }}
              className="mt-8 max-w-2xl text-wedding-muted"
              style={{
                fontFamily: "var(--font-sinhala)",
                fontSize: "clamp(1rem, 2.6vw, 1.15rem)",
                lineHeight: 1.95,
              }}
            >
              අපගේ විවාහ මංගල උත්සවය සඳහා අප ඔබව මහත් ප්‍රීතියෙන් යුතුව
              පිළිගන්නෙමු
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Open Invitation Button — pinned at bottom */}
      <motion.div
        className="mt-12 mb-4 flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Hint text */}
        <motion.p
          className="text-wedding-muted text-xs tracking-widest uppercase"
          style={{ fontFamily: "var(--font-sinhala)", fontSize: "0.85rem" }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
        >
          ආරාධනාව බලන්න
        </motion.p>

        {/* Glowing animated button */}
        <motion.button
          id="open-invitation-btn"
          onClick={() => router.push(invitePath)}
          aria-label="ආරාධනාව විවෘත කරන්න"
          className="relative px-12 py-4 rounded-full text-white font-medium overflow-hidden"
          style={{
            background: "var(--wedding-gradient)",
            fontFamily: "var(--font-sinhala)",
            fontSize: "clamp(1rem, 2.5vw, 1.1rem)",
            letterSpacing: "0.08em",
            boxShadow: "0 0 0 0 rgba(176, 141, 87, 0.5)",
          }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(176, 141, 87, 0.5)",
              "0 0 0 14px rgba(176, 141, 87, 0)",
              "0 0 0 0 rgba(176, 141, 87, 0.5)",
            ],
          }}
          transition={{
            boxShadow: {
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            },
            scale: { duration: 0.2 },
          }}
        >
          <motion.span
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)",
              backgroundSize: "200% 100%",
            }}
            animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
          />
          ආරාධනාව විවෘත කරන්න
        </motion.button>
      </motion.div>
    </section>
  );
}