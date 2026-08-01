"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface InvitationIntroProps {
  invitePath?: string;
}

const MotionButton = motion(Button);

export default function InvitationIntro({
  invitePath = "/invitation",
}: InvitationIntroProps) {
  const router = useRouter();

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-between bg-wedding-bg px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="flex w-full flex-1 items-center justify-center">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
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

      <motion.div
        className="mt-12 mb-4 flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.p
          className="text-wedding-muted text-xs tracking-widest uppercase"
          style={{ fontFamily: "var(--font-sinhala)", fontSize: "0.85rem" }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
        >
          ආරාධනාව බලන්න
        </motion.p>

        <MotionButton
          id="open-invitation-btn"
          type="button"
          onClick={() => router.push(invitePath)}
          aria-label="ආරාධනාව විවෘත කරන්න"
          className="relative overflow-hidden rounded-full px-12 py-7 text-white shadow-none hover:opacity-95"
          style={{
            background: "var(--wedding-gradient)",
            fontFamily: "var(--font-sinhala)",
            fontSize: "clamp(1rem, 2.5vw, 1.1rem)",
            letterSpacing: "0.08em",
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
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)",
              backgroundSize: "200% 100%",
            }}
            animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
          />
          <span className="relative z-10">ආරාධනාව විවෘත කරන්න</span>
        </MotionButton>
      </motion.div>
    </section>
  );
}