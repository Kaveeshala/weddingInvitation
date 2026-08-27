"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useLanguage } from "./InvitationLanguageContext";

interface InvitationHeroCardProps {
  guestName?: string;
}

export default function InvitationHeroCard({
  guestName,
}: InvitationHeroCardProps) {
  const { language } = useLanguage();
  const isEn = language === "en";

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full">
      {/* Full Screen Background Image */}
      <div className="absolute inset-0 z-0 bg-[#fdfbf7]">
        <div 
          className="sticky top-0 w-full h-dvh md:h-screen bg-size-[100%_100%] md:bg-contain bg-center bg-no-repeat" 
          style={{ backgroundImage: "url('/images/inivtation-bg-image.jpeg')" }} 
        />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-10 py-10 sm:py-16 mx-auto w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          {/* CONTENT CONTAINER */}
          <div className="relative w-full flex flex-col items-center justify-center min-h-screen">
            
            {/* Content Wrapper */}
            <div className="relative z-10 px-2 sm:px-8 py-8 flex flex-col items-center text-center w-full">
              {/* Header image switcher */}
              {!isEn ? (
                <motion.img
                  key="sinhala-topic-img"
                  src="/images/texts/topic2.png"
                  alt="විවාහ මංගල ආරාධනාව"
                  className="w-45 sm:w-65 md:w-[320px] h-auto object-contain"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.7 }}
                />
              ) : (
                <motion.div
                  key="english-topic-header"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.7 }}
                  className="flex flex-col items-center gap-1.5"
                >
                  <span
                    style={{
                      fontFamily: "'Courgette', cursive",
                      fontSize: "clamp(1.6rem, 5vw, 3rem)",
                      color: "var(--wedding-primary)",
                      fontWeight: 700,
                      lineHeight: 1.2,
                    }}
                  >
                    Wedding Invitation
                  </span>
                </motion.div>
              )}

              <motion.div
                className="mt-6 sm:mt-10 w-full grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-6 md:gap-8"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                {/* Bride */}
                <div className="flex flex-col items-center text-center gap-1">
                  <p
                    style={{
                      fontFamily: isEn
                        ? "var(--font-geist-sans)"
                        : "var(--font-sinhala)",
                      fontSize: isEn
                        ? "clamp(0.55rem, 1.4vw, 0.85rem)"
                        : "clamp(0.55rem, 1.5vw, 0.88rem)",
                      lineHeight: isEn ? 1.4 : 1.8,
                      color: "var(--wedding-muted)",
                    }}
                  >
                    {isEn ? (
                      <>
                        Beloved daughter of
                        <br />
                        Mr. Chaminda Mirahawatte &amp; Mrs. Jayanthi Kumari
                      </>
                    ) : (
                      <>
                        චමින්ද මිරහවත්ත මැතිතුමාගේ සහ
                        <br />
                        ජයන්ති කුමාරි මැතිනියගේ
                        <br />
                        ආදරණීය දියණිය
                      </>
                    )}
                  </p>
                  <p
                    style={{
                      fontFamily: isEn
                        ? "var(--font-geist-sans)"
                        : "var(--font-sinhala)",
                      fontSize: "clamp(1rem, 3.5vw, 2.2rem)",
                      fontWeight: 500,
                      color: "var(--wedding-heading)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {isEn ? "Dilma" : "දිල්මා"}
                  </p>
                </div>

                {/* Couple photo */}
                <div className="flex justify-center z-10 px-1">
                  <div
                    className="rounded-[30px] sm:rounded-[50px] overflow-hidden border-[3px] sm:border-4 border-wedding-highlight shadow-[0_8px_30px_rgba(124,92,61,0.18)] bg-wedding-surface w-16.25 h-21.25 sm:w-22.5 sm:h-29 md:w-27.5 md:h-35.5 transition-all duration-300"
                  >
                    <img
                      src="/images/wedding_image3.jpeg"
                      alt="Dilma and Isuru"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>

                {/* Groom */}
                <div className="flex flex-col items-center text-center gap-1">
                  <p
                    style={{
                      fontFamily: isEn
                        ? "var(--font-geist-sans)"
                        : "var(--font-sinhala)",
                      fontSize: isEn
                        ? "clamp(0.55rem, 1.4vw, 0.85rem)"
                        : "clamp(0.55rem, 1.5vw, 0.88rem)",
                      lineHeight: isEn ? 1.4 : 1.8,
                      color: "var(--wedding-muted)",
                    }}
                  >
                    {isEn ? (
                      <>
                        Beloved son of
                        <br />
                        Mr. Ravindra Munaweera &amp; Mrs. Chandrika Bandaranaike
                      </>
                    ) : (
                      <>
                        රවීන්ද්ර මුණවීර මැතිතුමාගේ සහ
                        <br />
                        චන්ද්රිකා බණ්ඩාරනායක මැතිනියගේ
                        <br />
                        ආදරණීය පුතනුවන්
                      </>
                    )}
                  </p>
                  <p
                    style={{
                      fontFamily: isEn
                        ? "var(--font-geist-sans)"
                        : "var(--font-sinhala)",
                      fontSize: "clamp(1rem, 3.5vw, 2.2rem)",
                      fontWeight: 500,
                      color: "var(--wedding-heading)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {isEn ? "Isuru" : "ඉසුරු"}
                  </p>
                </div>
              </motion.div>

              <motion.p
                className="mt-6 sm:mt-8 max-w-md text-wedding-muted px-2"
                style={{
                  fontFamily: isEn
                    ? "var(--font-geist-sans)"
                    : "var(--font-sinhala)",
                  fontSize: isEn
                    ? "clamp(0.75rem, 1.8vw, 0.95rem)"
                    : "clamp(0.75rem, 2vw, 1rem)",
                  lineHeight: isEn ? 1.6 : 2,
                }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
              >
                {isEn
                  ? "Request the pleasure of your company to celebrate their wedding reception"
                  : "අතිනත ගැනීමේ ප්‍රීතිය නිමිත්තෙන් පැවැත්වෙන ප්‍රිය සම්භාවනයට සහභාගි වන මෙන්"}
              </motion.p>

              <motion.div
                className="mt-4 sm:mt-6 w-full max-w-xl mx-auto text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "clamp(0.9rem, 2.5vw, 1.45rem)",
                    color: "var(--wedding-heading)",
                    letterSpacing: "0.05em",
                    lineHeight: 1.5,
                  }}
                >
                  {guestName || (isEn ? "Dear Guest" : "හිතවත් අමුත්තා වෙත")}
                </p>
              </motion.div>

              <motion.p
                className="mt-1 sm:mt-2 text-wedding-heading"
                style={{
                  fontFamily: isEn
                    ? "var(--font-geist-sans)"
                    : "var(--font-sinhala)",
                  fontSize: isEn
                    ? "clamp(0.75rem, 1.8vw, 0.95rem)"
                    : "clamp(0.75rem, 2vw, 1rem)",
                  lineHeight: 1.8,
                  letterSpacing: isEn ? "0.04em" : "normal",
                }}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.7 }}
              >
                {isEn
                  ? "You are cordially invited!"
                  : "කෙරෙන ගෞරවනීය ආරාධනයයි!"}
              </motion.p>

              <motion.button
                id="date-block"
                onClick={() => scrollTo("countdown-section")}
                className="mt-4 sm:mt-6 flex items-center justify-center gap-3 sm:gap-6 cursor-pointer group focus:outline-none"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.7 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                aria-label={isEn ? "View countdown" : "ගණන් කිරීම බලන්න"}
              >
                <div
                  className="flex flex-col items-center py-1 border-y-2 border-solid border-wedding-primary px-1 sm:px-2"
                >
                  <span
                    style={{
                      fontFamily: isEn
                        ? "var(--font-geist-sans)"
                        : "var(--font-sinhala)",
                      fontSize: "clamp(0.7rem, 2vw, 0.95rem)",
                      color: "var(--wedding-primary)",
                      letterSpacing: isEn ? "0.1em" : "normal",
                    }}
                  >
                    {isEn ? "JANUARY" : "ජනවාරි"}
                  </span>
                </div>

                <div className="flex flex-col items-center bg-wedding-surface/60 rounded-xl px-2 sm:px-3 py-1 shadow-sm backdrop-blur-sm">
                  <span
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "clamp(2.5rem, 8vw, 5.5rem)",
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
                      fontSize: "clamp(0.6rem, 1.5vw, 0.85rem)",
                      color: "var(--wedding-muted)",
                      letterSpacing: "0.15em",
                      marginTop: "2px",
                    }}
                  >
                    2027
                  </span>
                </div>

                <div
                  className="flex flex-col items-center py-1 border-y-2 border-solid border-wedding-primary px-1 sm:px-2"
                >
                  <span
                    style={{
                      fontFamily: isEn
                        ? "var(--font-geist-sans)"
                        : "var(--font-sinhala)",
                      fontSize: "clamp(0.7rem, 2vw, 0.95rem)",
                      color: "var(--wedding-primary)",
                      letterSpacing: isEn ? "0.08em" : "normal",
                    }}
                  >
                    {isEn ? "THURSDAY" : "බ්‍රහස්පතින්දා"}
                  </span>
                </div>
              </motion.button>

              <motion.p
                className="mt-4 sm:mt-6 text-wedding-muted"
                style={{
                  fontFamily: isEn
                    ? "var(--font-geist-sans)"
                    : "var(--font-sinhala)",
                  fontSize: isEn
                    ? "clamp(0.7rem, 1.8vw, 0.95rem)"
                    : "clamp(0.75rem, 2vw, 0.98rem)",
                  lineHeight: 1.8,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                {isEn
                  ? "From 09:00 AM to 04:30 PM"
                  : "පෙරවරු 09:00 සිට පස්වරු 04:30 දක්වා"}
              </motion.p>

              <motion.p
                className="text-wedding-muted"
                style={{
                  fontFamily: isEn
                    ? "var(--font-geist-sans)"
                    : "var(--font-sinhala)",
                  fontSize: isEn
                    ? "clamp(0.65rem, 1.5vw, 0.88rem)"
                    : "clamp(0.7rem, 1.7vw, 0.9rem)",
                  lineHeight: 1.6,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.85, duration: 0.6 }}
              >
                {isEn
                  ? "(Poruwa Ceremony at 09:00 AM)"
                  : "(පෝරුවේ චාරිත්‍ර  පෙ:ව: 09:00 ට)"}
              </motion.p>

              <motion.button
                type="button"
                onClick={() => scrollTo("location-section")}
                className="mt-4 sm:mt-6 flex flex-col items-center cursor-pointer group focus:outline-none"
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
                    fontFamily: isEn
                      ? "var(--font-geist-sans)"
                      : "var(--font-sinhala)",
                    fontSize: "clamp(1.5rem, 4.5vw, 2.8rem)",
                    fontWeight: 500,
                    color: "var(--wedding-heading)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {isEn ? "Royal Arcade" : "රෝයල් ආකේඩ්"}
                </p>
                <p
                  className="group-hover:text-wedding-primary transition-colors duration-200"
                  style={{
                    fontFamily: isEn
                      ? "var(--font-geist-sans)"
                      : "var(--font-sinhala)",
                    fontSize: "clamp(0.8rem, 2vw, 1.15rem)",
                    color: "var(--wedding-muted)",
                    letterSpacing: isEn ? "0.14em" : "0.06em",
                    marginTop: "0.1rem",
                  }}
                >
                  {isEn ? "Gampaha" : "ගම්පහ"}
                </p>
              </motion.button>
            </div>
          </div>

          <motion.div
            className="mt-8 sm:mt-12 flex flex-col items-center w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <motion.button
              onClick={() => scrollTo("rsvp-section")}
              className="flex flex-col items-center group focus:outline-none pb-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              aria-label={isEn ? "RSVP section" : "RSVP - ප්‍රතිචාරය"}
            >
              <span
                className="group-hover:text-wedding-primary-hover transition-colors duration-200 cursor-pointer"
                style={{
                  fontFamily: isEn
                    ? "var(--font-geist-sans)"
                    : "var(--font-sinhala)",
                  fontSize: "clamp(0.65rem, 1.5vw, 0.78rem)",
                  letterSpacing: "0.38em",
                  color: "var(--wedding-primary)",
                  textTransform: "uppercase" as const,
                  borderBottom: "1.5px solid var(--wedding-primary)",
                  paddingBottom: "3px",
                }}
              >
                {isEn ? "RSVP" : "RSVP - ප්‍රතිචාර දක්වන්න"}
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
                <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.8} />
              </motion.span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
