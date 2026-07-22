"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((distance / (1000 * 60)) % 60),
      seconds: Math.floor((distance / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const items = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINUTES", value: timeLeft.minutes },
    { label: "SECONDS", value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-5xl">
      <div className="flex flex-col items-center">
        <p
          className="mb-6 sm:mb-8"
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "clamp(0.8rem, 2vw, 1rem)",
            letterSpacing: "0.32em",
            color: "var(--wedding-muted)",
            textTransform: "uppercase",
          }}
        >
          COUNTING DOWN
        </p>

        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-x-1 sm:gap-x-3 md:gap-x-5 text-center w-full">
          {items.map((item, index) => (
            <div key={item.label} className="contents">
              <div className="flex flex-col items-center min-w-0">
                <p
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "clamp(1.7rem, 5.4vw, 5rem)",
                    fontWeight: 300,
                    lineHeight: 1,
                    color: "var(--wedding-primary)",
                    textShadow: "0 0 18px rgba(176, 141, 87, 0.12)",
                  }}
                >
                  {String(item.value).padStart(2, "0")}
                </p>

                <div
                  className="mt-2 h-px w-8 sm:w-12 md:w-20"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, var(--wedding-primary), transparent)",
                    opacity: 0.65,
                  }}
                />

                <p
                  className="mt-2 sm:mt-3"
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "clamp(0.5rem, 1.25vw, 0.92rem)",
                    letterSpacing: "0.16em",
                    color: "var(--wedding-muted)",
                  }}
                >
                  {item.label}
                </p>
              </div>

              {index < items.length - 1 && (
                <div className="flex justify-center items-center">
                  <span
                    className="rounded-full"
                    style={{
                      width: "clamp(6px, 1.2vw, 10px)",
                      height: "clamp(6px, 1.2vw, 10px)",
                      background:
                        "radial-gradient(circle at 30% 30%, var(--wedding-highlight), var(--wedding-primary))",
                      boxShadow: "0 0 10px rgba(176, 141, 87, 0.28)",
                      opacity: 0.95,
                    }}
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}