"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./InvitationLanguageContext";

interface InvitationIntroProps {
  invitePath?: string;
  onOpen?: () => void;
}

const MotionButton = motion(Button);

export default function InvitationIntro({
  invitePath = "/invitation",
  onOpen,
}: InvitationIntroProps) {
  const router = useRouter();
  const { language } = useLanguage();
  const isEn = language === "en";

  return (
    <section 
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center bg-wedding-bg px-4 py-10 sm:px-6 sm:py-14 lg:px-8 pb-[10vh] bg-[url('/images/first-bg-image.jpeg')] bg-cover bg-center bg-no-repeat overflow-hidden"
    >
      {/* Blurred overlay extended off-screen to hide blur halo/space at the edges */}
      <div className="absolute inset-[-30px] backdrop-blur-[6px] bg-black/20 z-0"></div>
      
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
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
              className="text-white uppercase"
              style={{
                fontFamily: isEn
                  ? "'Manrope', sans-serif"
                  : "var(--font-sinhala)",
                fontSize: isEn
                  ? "clamp(1.2rem, 3.5vw, 1.6rem)"
                  : "clamp(1rem, 2.8vw, 1.25rem)",
                letterSpacing: isEn ? "0.22em" : "0.12em",
                lineHeight: 1.6,
                fontWeight: isEn ? 500 : 400,
              }}
            >
              {isEn ? "Wedding CELEBRATION" : "ආදරණීය විවාහ මංගල උත්සවය"}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.75 }}
              className="mt-10 text-white"
              style={{
                fontFamily: isEn
                  ? "var(--font-geist-sans)"
                  : "var(--font-sinhala)",
                fontSize: "clamp(3rem, 11vw, 6.2rem)",
                fontWeight: 500,
                lineHeight: 0.95,
                letterSpacing: "0.03em",
              }}
            >
              {isEn ? "Dilma" : "දිල්මා"}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.75 }}
              className="mt-3 text-white"
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "clamp(2rem, 5vw, 2.8rem)",
                lineHeight: 1,
              }}
            >
              &amp;
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.75 }}
              className="mt-3 text-white"
              style={{
                fontFamily: isEn
                  ? "var(--font-geist-sans)"
                  : "var(--font-sinhala)",
                fontSize: "clamp(3rem, 11vw, 6.2rem)",
                fontWeight: 500,
                lineHeight: 0.95,
                letterSpacing: "0.03em",
              }}
            >
              {isEn ? "Isuru" : "ඉසුරු"}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.64, duration: 0.7 }}
              className="mt-8 max-w-2xl text-white"
              style={{
                fontFamily: isEn
                  ? "var(--font-geist-sans)"
                  : "var(--font-sinhala)",
                fontSize: isEn
                  ? "clamp(0.95rem, 2.4vw, 1.1rem)"
                  : "clamp(1rem, 2.6vw, 1.15rem)",
                lineHeight: isEn ? 1.7 : 1.95,
                letterSpacing: isEn ? "0.02em" : "normal",
              }}
            >
              {isEn
                ? "We joyfully welcome you to celebrate our wedding day"
                : "අපගේ විවාහ මංගල උත්සවය සඳහා අප ඔබව මහත් ප්‍රීතියෙන් යුතුව පිළිගන්නෙමු"}
            </motion.p>
          </motion.div>
        </div>

      <motion.div
        className="relative z-10 mt-12 sm:mt-16 flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.p
          className="text-white text-xs tracking-widest uppercase"
          style={{
            fontFamily: isEn
              ? "var(--font-geist-sans)"
              : "var(--font-sinhala)",
            fontSize: isEn ? "0.78rem" : "0.85rem",
            letterSpacing: isEn ? "0.2em" : "0.08em",
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
        >
          {isEn ? "View Invitation" : "ආරාධනාව බලන්න"}
        </motion.p>

        <MotionButton
          id="open-invitation-btn"
          type="button"
          onClick={() => {
            if (onOpen) {
              onOpen();
            } else {
              router.push(invitePath);
            }
          }}
          aria-label={isEn ? "Open Invitation" : "ආරාධනාව විවෘත කරන්න"}
          className="relative overflow-hidden rounded-full px-12 py-7 text-white shadow-none hover:opacity-95"
          style={{
            background: "var(--wedding-gradient)",
            fontFamily: isEn
              ? "var(--font-geist-sans)"
              : "var(--font-sinhala)",
            fontSize: "clamp(1rem, 2.5vw, 1.1rem)",
            letterSpacing: isEn ? "0.14em" : "0.08em",
            textTransform: isEn ? "uppercase" : "none",
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
          <span className="relative z-10">
            {isEn ? "Open Invitation" : "ආරාධනාව විවෘත කරන්න"}
          </span>
        </MotionButton>
      </motion.div>
    </section>
  );
}