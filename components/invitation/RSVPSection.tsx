"use client";

import { motion } from "framer-motion";
import CountdownTimer from "./CountdownTimer";
import LiveLocationSection from "./LiveLocationSection";
import FloralDivider from "../FloralDivider";
import { useLanguage } from "./InvitationLanguageContext";

interface RSVPFormState {
  name: string;
  attending: string;
  guests: string;
  message: string;
}

interface RSVPSectionProps {
  submitted: boolean;
  form: RSVPFormState;
  setForm: React.Dispatch<React.SetStateAction<RSVPFormState>>;
  handleSubmit: (e: React.FormEvent) => void;
  weddingDate: Date;
  maxGuests: number;
}

export default function RSVPSection({
  submitted,
  form,
  setForm,
  handleSubmit,
  weddingDate,
  maxGuests,
}: RSVPSectionProps) {
  const { language } = useLanguage();
  const isEn = language === "en";

  const guestOptions = Array.from(
    { length: Math.max(1, maxGuests) },
    (_, index) => String(index + 1)
  );

  return (
    <>
      <motion.section
        id="rsvp-section"
        className="px-6 py-16 flex flex-col items-center gap-6 text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.7 }}
        style={{
          background:
            "linear-gradient(180deg, rgba(253, 248, 242, 1) 0%, rgba(251, 244, 234, 0.96) 58%, rgba(248, 238, 227, 0.92) 100%)",
        }}
      >
        <p
          className="text-wedding-muted text-sm max-w-xs"
          style={{
            fontFamily: isEn
              ? "var(--font-geist-sans)"
              : "var(--font-sinhala)",
            lineHeight: 1.8,
          }}
        >
          {isEn
            ? "We would be honored by your presence on our special day."
            : "අපගේ මෙම සුවිශේෂී දිනයට ඔබගේ පැමිණීම අපට මහත් සතුටක් වේ."}
        </p>

        <div
          className="w-full max-w-md rounded-3xl p-6 sm:p-8 text-left"
          style={{
            background: "rgba(255,255,255,0.62)",
            boxShadow: "0 18px 45px rgba(124, 92, 61, 0.10)",
            backdropFilter: "blur(6px)",
          }}
        >
          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <p
                className="text-wedding-primary"
                style={{
                  fontFamily: isEn
                    ? "var(--font-geist-sans)"
                    : "var(--font-sinhala)",
                  fontSize: "clamp(1.3rem, 4vw, 1.8rem)",
                  fontWeight: 600,
                }}
              >
                {isEn ? `Thank you, ${form.name}!` : `ස්තූතියි, ${form.name}!`}
              </p>

              <p
                className="text-wedding-muted text-sm"
                style={{
                  fontFamily: isEn
                    ? "var(--font-geist-sans)"
                    : "var(--font-sinhala)",
                  lineHeight: 1.7,
                }}
              >
                {form.attending === "yes"
                  ? isEn
                    ? "We are delighted to celebrate with you! 💛"
                    : "ඔබ සමඟ සැමරීම ගැන අපට ඉතා සතුටුයි! 💛"
                  : isEn
                  ? "We will miss you. Thank you for letting us know."
                  : "ඔබ නොමැතිකම අපට ඉතා දැනෙනු ඇත. දැනුම් දීම ගැන ස්තූතියි."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="text-center mb-1">
                <p
                  className="text-wedding-primary text-xs uppercase"
                  style={{
                    fontFamily: isEn
                      ? "var(--font-geist-sans)"
                      : "var(--font-sinhala)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {isEn ? "YOUR RESPONSE" : "ඔබගේ ප්‍රතිචාරය"}
                </p>
                <h2
                  className="text-wedding-heading mt-2"
                  style={{
                    fontFamily: isEn
                      ? "var(--font-geist-sans)"
                      : "var(--font-sinhala)",
                    fontSize: "clamp(1.4rem, 4vw, 1.8rem)",
                    fontWeight: 600,
                  }}
                >
                  {isEn ? "RSVP & Attendance" : "සහභාගිත්ව දැනුම්දීම"}
                </h2>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="rsvp-name"
                  className="text-xs uppercase text-wedding-muted"
                  style={{
                    fontFamily: isEn
                      ? "var(--font-geist-sans)"
                      : "var(--font-sinhala)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {isEn ? "YOUR FULL NAME" : "ඔබගේ සම්පූර්ණ නම"}
                </label>
                <input
                  id="rsvp-name"
                  type="text"
                  required
                  placeholder={isEn ? "e.g. Nimal Perera" : "උදා: නිමල් පෙරේරා"}
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  className="w-full rounded-xl bg-white/90 px-4 py-3 text-sm text-wedding-heading placeholder:text-wedding-muted/50 focus:outline-none focus:ring-2 focus:ring-wedding-primary/20 transition-all"
                />
              </div>

              <fieldset>
                <legend
                  className="text-xs uppercase text-wedding-muted mb-2"
                  style={{
                    fontFamily: isEn
                      ? "var(--font-geist-sans)"
                      : "var(--font-sinhala)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {isEn ? "WILL YOU ATTEND?" : "ඔබ සහභාගි වේද?"}
                </legend>

                <div className="flex gap-3">
                  {[
                    { v: "yes", l: isEn ? "Yes" : "ඔව්" },
                    { v: "no", l: isEn ? "No" : "නැත" },
                  ].map(({ v, l }) => (
                    <label
                      key={v}
                      className={`flex-1 rounded-xl py-3 px-4 text-center cursor-pointer text-xs transition-all ${
                        form.attending === v
                          ? "bg-white text-wedding-primary shadow-[0_8px_20px_rgba(176,141,87,0.12)]"
                          : "bg-white/70 text-wedding-muted hover:bg-white/90"
                      }`}
                      style={{
                        fontFamily: isEn
                          ? "var(--font-geist-sans)"
                          : "var(--font-sinhala)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      <input
                        type="radio"
                        name="attending"
                        value={v}
                        checked={form.attending === v}
                        onChange={() =>
                          setForm((p) => ({ ...p, attending: v }))
                        }
                        className="sr-only"
                      />
                      {l}
                    </label>
                  ))}
                </div>
              </fieldset>

              {form.attending === "yes" && (
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="rsvp-guests"
                    className="text-xs uppercase text-wedding-muted"
                    style={{
                      fontFamily: isEn
                        ? "var(--font-geist-sans)"
                        : "var(--font-sinhala)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {isEn ? "NUMBER OF GUESTS" : "සහභාගි වන අය ගණන"}
                  </label>
                  <select
                    id="rsvp-guests"
                    value={form.guests}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, guests: e.target.value }))
                    }
                    className="w-full rounded-xl bg-white/90 px-4 py-3 text-sm text-wedding-heading focus:outline-none focus:ring-2 focus:ring-wedding-primary/20"
                  >
                    {guestOptions.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-4 rounded-xl text-sm uppercase text-white font-medium hover:scale-[1.02] active:scale-[0.98] transition-transform"
                style={{
                  background: "var(--wedding-gradient)",
                  fontFamily: isEn
                    ? "var(--font-geist-sans)"
                    : "var(--font-sinhala)",
                  letterSpacing: "0.08em",
                }}
              >
                {isEn ? "Submit RSVP" : "ප්‍රතිචාරය යවන්න"}
              </button>
            </form>
          )}
        </div>
      </motion.section>

      <LiveLocationSection mapUrl="https://maps.app.goo.gl/nQwefdQxfgSRFoyw9" />

      <motion.section
        id="countdown-section"
        className="px-4 sm:px-6 py-14 sm:py-16 flex justify-center"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.75 }}
        style={{
          background:
            "linear-gradient(180deg, rgba(244, 232, 208, 0.78) 0%, rgba(247, 237, 226, 0.94) 48%, rgba(253, 248, 242, 1) 100%)",
        }}
      >
        <div className="w-full max-w-5xl flex justify-center">
          <CountdownTimer targetDate={weddingDate} />
        </div>
      </motion.section>

      <motion.footer
        className="py-12 text-center bg-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <div className="mb-6 flex justify-center">
          <FloralDivider />
        </div>

        <p
          style={{
            fontFamily: isEn
              ? "var(--font-geist-sans)"
              : "var(--font-sinhala)",
            fontSize: "clamp(1rem, 2.3vw, 1.15rem)",
            color: "var(--wedding-heading)",
            fontWeight: 400,
            letterSpacing: "0.01em",
          }}
        >
          {isEn
            ? "We can't wait to celebrate with you"
            : "ඔබ සැම සමඟ මෙම ප්‍රීතිය සැමරීමට අප නොඉවසිල්ලෙන් පසුවෙමු"}
        </p>

        <p
          className="mt-3"
          style={{
            fontFamily: isEn
              ? "var(--font-geist-sans)"
              : "var(--font-sinhala)",
            fontSize: "clamp(0.82rem, 2vw, 0.95rem)",
            color: "var(--wedding-muted)",
            letterSpacing: "0.06em",
            lineHeight: 1.8,
          }}
        >
          {isEn
            ? "Thursday, January 28, 2027 • Royal Arcade, Udugampola"
            : "2027 ජනවාරි 28 බ්‍රහස්පතින්දා • රෝයල් ආකේඩ්, උඩුගම්පොළ"}
        </p>

        <div className="mt-6 flex justify-center">
          <div
            className="h-px w-16 sm:w-20"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(176,141,87,0.85) 50%, transparent 100%)",
            }}
          />
        </div>

        <p
          className="mt-5"
          style={{
            fontFamily: isEn
              ? "'Courgette', cursive"
              : "var(--font-sinhala)",
            fontSize: "clamp(1.35rem, 3.5vw, 1.8rem)",
            color: "var(--wedding-primary)",
            fontWeight: 500,
            letterSpacing: isEn ? "normal" : "0.05em",
          }}
        >
          {isEn ? "Isuru & Dilma" : "ඉසුරු & දිල්මා"}
        </p>
        
        <p
          className="mt-3 text-center"
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
            color: "var(--wedding-muted)",
            letterSpacing: "0.08em",
          }}
        >
          {isEn ? "Contact: " : "අමතන්න: "}
          0701299542 | 0767896996 | 0752813417
        </p>
      </motion.footer>
    </>
  );
}