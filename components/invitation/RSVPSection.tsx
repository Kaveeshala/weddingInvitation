"use client";

import { motion } from "framer-motion";
import CountdownTimer from "./CountdownTimer";

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
}

export default function RSVPSection({
  submitted,
  form,
  setForm,
  handleSubmit,
  weddingDate,
}: RSVPSectionProps) {
  return (
    <>
      <motion.section
        id="rsvp-section"
        className="px-6 py-16 flex flex-col items-center gap-6 text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.7 }}
      >
        <p
          className="text-wedding-muted text-sm max-w-xs"
          style={{
            fontFamily: "var(--font-sinhala)",
            lineHeight: 1.8,
          }}
        >
          අපගේ මෙම සුවිශේෂී දිනයට ඔබගේ පැමිණීම අපට මහත් සතුටක් වේ.
        </p>

        <div className="w-full max-w-md rounded-3xl bg-wedding-surface shadow-xl border border-wedding-border p-6 sm:p-8 text-left">
          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <div className="w-16 h-16 rounded-full bg-wedding-highlight flex items-center justify-center text-2xl">
                🌸
              </div>

              <p
                className="text-wedding-primary"
                style={{
                  fontFamily: "var(--font-sinhala)",
                  fontSize: "clamp(1.3rem, 4vw, 1.8rem)",
                  fontWeight: 600,
                }}
              >
                ස්තූතියි, {form.name}!
              </p>

              <p
                className="text-wedding-muted text-sm"
                style={{
                  fontFamily: "var(--font-sinhala)",
                  lineHeight: 1.7,
                }}
              >
                {form.attending === "yes"
                  ? "ඔබ සමඟ සැමරීම ගැන අපට ඉතා සතුටුයි! 💛"
                  : "ඔබ නොමැතිකම අපට ඉතා දැනෙනු ඇත. දැනුම් දීම ගැන ස්තූතියි."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="text-center mb-1">
                <p
                  className="text-wedding-primary text-xs uppercase"
                  style={{
                    fontFamily: "var(--font-sinhala)",
                    letterSpacing: "0.1em",
                  }}
                >
                  ඔබගේ ප්‍රතිචාරය
                </p>
                <h2
                  className="text-wedding-heading mt-2"
                  style={{
                    fontFamily: "var(--font-sinhala)",
                    fontSize: "clamp(1.4rem, 4vw, 1.8rem)",
                    fontWeight: 600,
                  }}
                >
                  සහභාගිත්ව දැනුම්දීම
                </h2>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="rsvp-name"
                  className="text-xs uppercase text-wedding-muted"
                  style={{
                    fontFamily: "var(--font-sinhala)",
                    letterSpacing: "0.1em",
                  }}
                >
                  ඔබගේ සම්පූර්ණ නම
                </label>
                <input
                  id="rsvp-name"
                  type="text"
                  required
                  placeholder="උදා: නිමල් පෙරේරා"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  className="w-full rounded-xl border border-wedding-border bg-white px-4 py-3 text-sm text-wedding-heading placeholder:text-wedding-muted/50 focus:outline-none focus:border-wedding-primary focus:ring-2 focus:ring-wedding-primary/20 transition-all"
                />
              </div>

              <fieldset>
                <legend
                  className="text-xs uppercase text-wedding-muted mb-2"
                  style={{
                    fontFamily: "var(--font-sinhala)",
                    letterSpacing: "0.1em",
                  }}
                >
                  ඔබ සහභාගි වේද?
                </legend>

                <div className="flex gap-3">
                  {[
                    { v: "yes", l: "ඔව්" },
                    { v: "no", l: "නැත" },
                  ].map(({ v, l }) => (
                    <label
                      key={v}
                      className={`flex-1 rounded-xl border py-3 px-4 text-center cursor-pointer text-xs transition-all ${form.attending === v
                          ? "border-wedding-primary bg-wedding-highlight text-wedding-primary"
                          : "border-wedding-border bg-white text-wedding-muted hover:border-wedding-primary"
                        }`}
                      style={{
                        fontFamily: "var(--font-sinhala)",
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
                      fontFamily: "var(--font-sinhala)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    සහභාගි වන අය ගණන
                  </label>
                  <select
                    id="rsvp-guests"
                    value={form.guests}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, guests: e.target.value }))
                    }
                    className="w-full rounded-xl border border-wedding-border bg-white px-4 py-3 text-sm text-wedding-heading focus:outline-none focus:border-wedding-primary focus:ring-2 focus:ring-wedding-primary/20"
                  >
                    {["1", "2", "3", "4"].map((n) => (
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
                  fontFamily: "var(--font-sinhala)",
                  letterSpacing: "0.08em",
                }}
              >
                ප්‍රතිචාරය යවන්න
              </button>
            </form>
          )}
        </div>
      </motion.section>

      {/* Countdown Timer */}
      <motion.div
        id="countdown-section"
        className="px-6 pb-12 flex justify-center"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.75 }}
      >
        <div className="w-full max-w-xs rounded-[28px] bg-wedding-surface border border-wedding-border shadow-xl px-6 py-8 flex flex-col items-center justify-center">
          <CountdownTimer targetDate={weddingDate} />
        </div>
      </motion.div>

      <motion.footer
        className="py-10 text-center border-t border-wedding-border"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <p
          className="text-wedding-primary"
          style={{
            fontFamily: "var(--font-sinhala)",
            fontSize: "clamp(1.5rem, 4vw, 2rem)",
            fontWeight: 500,
          }}
        >
          දිල්මා සහ ඉසුරු
        </p>
        <p className="text-wedding-muted text-xs tracking-widest mt-1 uppercase">
          2027 ජනවාරි 28
        </p>
        <div className="mt-4 flex justify-center gap-3">
          {["♡", "✦", "♡"].map((s, i) => (
            <span key={i} className="text-wedding-primary text-sm">
              {s}
            </span>
          ))}
        </div>
      </motion.footer>
    </>
  );
}