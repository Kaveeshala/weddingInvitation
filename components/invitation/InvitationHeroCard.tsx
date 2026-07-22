"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

interface InvitationHeroCardProps {
  guestName?: string;
}

export default function InvitationHeroCard({
  guestName,
}: InvitationHeroCardProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative px-4 sm:px-6 lg:px-10 py-12 sm:py-16 w-full">
      <div className="mx-auto w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          <motion.img
            src="/images/texts/topic2.png"
            alt="Wedding invitation topic"
            className="w-[200px] sm:w-[260px] md:w-[320px] h-auto object-contain"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
          />

          <motion.div
            className="mt-10 w-full grid grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="flex flex-col items-center text-center gap-1">
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "clamp(1.4rem, 4vw, 2.2rem)",
                  fontWeight: 500,
                  color: "var(--wedding-heading)",
                  letterSpacing: "0.04em",
                }}
              >
                Dilma
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sinhala)",
                  fontSize: "clamp(0.7rem, 1.8vw, 0.88rem)",
                  lineHeight: 1.95,
                  color: "var(--wedding-muted)",
                }}
              >
                මිරහවත්ත මහතා සහ
                <br />
                එම මැතිණියගේ
                <br />
                ආදරණීය දියණිය
              </p>
            </div>

            <div className="flex justify-center">
              <div
                className="rounded-[50px] overflow-hidden border-[4px] border-wedding-highlight shadow-[0_8px_30px_rgba(124,92,61,0.18)] bg-wedding-surface"
                style={{ width: "90px", height: "116px" }}
              >
                <img
                  src="/images/wedding_image3.jpeg"
                  alt="Dilma and Isuru"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            <div className="flex flex-col items-center text-center gap-1">
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "clamp(1.4rem, 4vw, 2.2rem)",
                  fontWeight: 500,
                  color: "var(--wedding-heading)",
                  letterSpacing: "0.04em",
                }}
              >
                Isuru
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sinhala)",
                  fontSize: "clamp(0.7rem, 1.8vw, 0.88rem)",
                  lineHeight: 1.95,
                  color: "var(--wedding-muted)",
                }}
              >
                සමුනවීර මහතා සහ
                <br />
                එම මැතිණියගේ
                <br />
                ආදරණීය පුතණුවන්
              </p>
            </div>
          </motion.div>

          <motion.p
            className="mt-8 max-w-sm text-wedding-muted"
            style={{
              fontFamily: "var(--font-sinhala)",
              fontSize: "clamp(0.88rem, 2.2vw, 1rem)",
              lineHeight: 2.1,
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            අතිනත ගැනීමේ ප්‍රීතිය නිමිත්තෙන් පැවැත්වෙන ප්‍රිය සම්භාවනයට සහභාගි
            වන මෙන්
          </motion.p>

          <motion.div
            className="mt-6 w-full max-w-xl mx-auto text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <p
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "clamp(1.05rem, 3vw, 1.45rem)",
                color: "var(--wedding-heading)",
                letterSpacing: "0.05em",
                lineHeight: 1.6,
              }}
            >
              {guestName || "Mr / Mrs / Mr & Mrs / Ms"}
            </p>
          </motion.div>

          <motion.p
            className="mt-6 text-wedding-heading"
            style={{
              fontFamily: "var(--font-sinhala)",
              fontSize: "clamp(0.88rem, 2.2vw, 1rem)",
              lineHeight: 2,
            }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
          >
            කෙරෙන ගෞරවනීය ආරාධනනයයි!
          </motion.p>

          <motion.button
            id="date-block"
            onClick={() => scrollTo("countdown-section")}
            className="mt-8 flex items-center justify-center gap-6 cursor-pointer group focus:outline-none"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.7 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            aria-label="ගණන් කිරීම බලන්න"
          >
            <div
              className="flex flex-col items-center py-1 border-t border-b-2 double border-wedding-border px-2"
              style={{ borderStyle: "double none double none" }}
            >
              <span
                style={{
                  fontFamily: "var(--font-sinhala)",
                  fontSize: "0.95rem",
                  color: "var(--wedding-primary)",
                }}
              >
                ජනවාරි
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "clamp(3.8rem, 10vw, 5.5rem)",
                  fontWeight: 600,
                  lineHeight: 0.9,
                  color: "var(--wedding-heading)",
                  letterSpacing: "-0.02em",
                }}
              >
                28
              </span>
              <span
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.85rem",
                  color: "var(--wedding-muted)",
                  letterSpacing: "0.15em",
                  marginTop: "2px",
                }}
              >
                2027
              </span>
            </div>

            <div
              className="flex flex-col items-center py-1 border-t border-b-2 double border-wedding-border px-2"
              style={{ borderStyle: "double none double none" }}
            >
              <span
                style={{
                  fontFamily: "var(--font-sinhala)",
                  fontSize: "0.95rem",
                  color: "var(--wedding-primary)",
                }}
              >
                බ්‍රහස්පතින්දා
              </span>
            </div>
          </motion.button>

          <motion.p
            className="mt-6 text-wedding-muted"
            style={{
              fontFamily: "var(--font-sinhala)",
              fontSize: "clamp(0.85rem, 2.2vw, 0.98rem)",
              lineHeight: 2,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            පෙරවරු 09:00 සිට පස්වරු 04:30 දක්වා
          </motion.p>

          <motion.p
            className="text-wedding-muted"
            style={{
              fontFamily: "var(--font-sinhala)",
              fontSize: "clamp(0.78rem, 1.9vw, 0.9rem)",
              lineHeight: 1.8,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.6 }}
          >
            (පෝරුවේ චාරිත්‍ර&nbsp;&nbsp;පෙ:ව: 09:00 ට)
          </motion.p>

          <motion.button
            type="button"
            onClick={() => scrollTo("location-section")}
            className="mt-8 flex flex-col items-center cursor-pointer group focus:outline-none"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Live Location section"
          >
            <p
              className="group-hover:text-wedding-primary transition-colors duration-200"
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
                fontWeight: 500,
                color: "var(--wedding-heading)",
                letterSpacing: "0.04em",
              }}
            >
              Royal Arcade
            </p>
            <p
              className="group-hover:text-wedding-primary transition-colors duration-200"
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "clamp(0.95rem, 2.4vw, 1.15rem)",
                color: "var(--wedding-muted)",
                letterSpacing: "0.14em",
                marginTop: "0.2rem",
              }}
            >
              Gampaha
            </p>
          </motion.button>

          <motion.button
            onClick={() => scrollTo("rsvp-section")}
            className="mt-10 flex flex-col items-center group focus:outline-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            aria-label="RSVP — ප්‍රතිචාරය"
          >
            <span
              className="group-hover:text-wedding-primary-hover transition-colors duration-200 cursor-pointer"
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.78rem",
                letterSpacing: "0.38em",
                color: "var(--wedding-primary)",
                textTransform: "uppercase" as const,
                borderBottom: "1.5px solid var(--wedding-primary)",
                paddingBottom: "3px",
              }}
            >
              RSVP
            </span>

            <motion.span
              className="mt-2 flex items-center justify-center text-wedding-primary"
              animate={{ y: [0, 5, 0], opacity: [0.65, 1, 0.65] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              aria-hidden="true"
            >
              <ArrowDown size={24} strokeWidth={1.8} />
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
