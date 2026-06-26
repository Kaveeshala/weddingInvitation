"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CountdownTimer from "../../components/CountdownTimer";
import RSVPModal from "../../components/RSVPModal";

export default function InvitationPage() {
  const [rsvpOpen, setRsvpOpen] = useState(false);

  const weddingDate = new Date("2027-01-28T00:00:00+05:30");

  return (
    <>
      <main
        className="min-h-screen w-full"
        style={{
          background: "linear-gradient(170deg, #fdf8f2 0%, #f4ece0 50%, #fdf8f2 100%)",
        }}
      >
        {/* Wedding Card */}
        <section className="px-4 pt-16 pb-6 flex flex-col items-center">
          <motion.div
            className="w-full max-w-lg bg-[#fdf8f2] rounded-[28px] shadow-2xl overflow-hidden border border-[#e8d5c4]"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="w-full h-2 bg-gradient-to-r from-[#b08d57] via-[#e8cc9a] to-[#b08d57]" />

            <div className="px-6 sm:px-8 py-10 sm:py-12 flex flex-col items-center text-center">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="text-[#8f6b3d] mb-6"
                style={{
                  fontFamily: "var(--font-sinhala)",
                  fontSize: "clamp(1.4rem, 4vw, 2rem)",
                  lineHeight: 1.5,
                  letterSpacing: "0.02em",
                }}
              >
                ශ්‍රී සුභ මංගලම්
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25, duration: 0.7 }}
                className="mb-7"
              >
                <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-[6px] border-[#f6eadb] shadow-lg">
                  <img
                    src="/images/wedding_image3.jpeg"
                    alt="Wedding couple"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="flex flex-col items-center gap-2"
              >
                <p
                  className="text-[#5e4630]"
                  style={{
                    fontFamily: "var(--font-sinhala)",
                    fontSize: "clamp(1.6rem, 5vw, 2.4rem)",
                    fontWeight: 600,
                  }}
                >
                  දිල්මා
                </p>

                <p
                  className="text-[#b08d57]"
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "clamp(1.2rem, 4vw, 1.6rem)",
                    lineHeight: 1,
                  }}
                >
                  &
                </p>

                <p
                  className="text-[#5e4630]"
                  style={{
                    fontFamily: "var(--font-sinhala)",
                    fontSize: "clamp(1.6rem, 5vw, 2.4rem)",
                    fontWeight: 600,
                  }}
                >
                  ඉසුරු
                </p>
              </motion.div>

              <div className="w-24 h-px bg-[#d9c2a6] my-7" />

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="flex flex-col items-center gap-3"
              >
                <p
                  className="text-[#8f6b3d]"
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "clamp(1.4rem, 4vw, 2rem)",
                    letterSpacing: "0.06em",
                    fontWeight: 500,
                  }}
                >
                  2027-01-28
                </p>

                <p
                  className="text-[#8a7a6d]"
                  style={{
                    fontFamily: "var(--font-sinhala)",
                    fontSize: "clamp(1rem, 3vw, 1.2rem)",
                  }}
                >
                  දින
                </p>

                <p
                  className="text-[#2c2c2c]"
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "clamp(1.4rem, 4vw, 2rem)",
                    fontWeight: 500,
                  }}
                >
                  Arcadia Grand Hotel
                </p>
              </motion.div>
            </div>

            <div className="w-full h-2 bg-gradient-to-r from-[#b08d57] via-[#e8cc9a] to-[#b08d57]" />
          </motion.div>
        </section>

        {/* Countdown */}
        <motion.section
          className="px-4 py-12 flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <p
            className="text-[#8a7a6d] text-xs"
            style={{
              fontFamily: "var(--font-sinhala)",
              letterSpacing: "0.2em",
            }}
          >
            සදාකාලික බැඳීමට තව
          </p>
          <CountdownTimer targetDate={weddingDate} />
        </motion.section>

        {/* RSVP */}
        <motion.section
          className="px-6 py-16 flex flex-col items-center gap-6 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
        >
          <p
            className="text-[#8a7a6d] text-sm max-w-xs"
            style={{
              fontFamily: "var(--font-sinhala)",
              lineHeight: 1.8,
            }}
          >
            අපගේ මෙම සුවිශේෂී දිනයට ඔබගේ පැමිණීම අපට මහත් සතුටක් වේ.
          </p>

          <motion.button
            onClick={() => setRsvpOpen(true)}
            className="px-10 py-4 rounded-full text-sm uppercase text-white font-medium"
            style={{
              background: "linear-gradient(135deg, #b08d57, #d4aa7d)",
              fontFamily: "var(--font-geist-sans)",
              letterSpacing: "0.18em",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            RSVP Now
          </motion.button>
        </motion.section>

        {/* Footer */}
        <motion.footer
          className="py-10 text-center border-t border-[#e8d5c4]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <p
            className="text-[#b08d57]"
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
              fontWeight: 500,
            }}
          >
            Dilma & Isuru
          </p>
          <p className="text-[#8a7a6d] text-xs tracking-widest mt-1 uppercase">
            28 January 2027
          </p>
          <div className="mt-4 flex justify-center gap-3">
            {["♡", "✦", "♡"].map((s, i) => (
              <span key={i} className="text-[#d4aa7d] text-sm">
                {s}
              </span>
            ))}
          </div>
        </motion.footer>
      </main>

      {rsvpOpen && <RSVPModal onClose={() => setRsvpOpen(false)} />}
    </>
  );
}