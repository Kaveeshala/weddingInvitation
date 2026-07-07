"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetDate: Date;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const calculateDaysLeft = () => {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;
    const days = Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24)));
    return days;
  };

  const formatWeddingDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [daysLeft, setDaysLeft] = useState(calculateDaysLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setDaysLeft(calculateDaysLeft());
    }, 1000 * 60);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex flex-col items-center text-center">
      <div className="inline-flex items-center justify-center rounded-2xl border border-wedding-border bg-wedding-highlight px-5 py-3 shadow-sm">
        <p
          className="text-wedding-primary"
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "clamp(0.82rem, 2vw, 0.98rem)",
            fontWeight: 500,
            letterSpacing: "0.16em",
          }}
        >
          {formatWeddingDate(targetDate)}
        </p>
      </div>

      <p
        className="mt-5 text-wedding-heading"
        style={{
          fontFamily: "var(--font-geist-sans)",
          fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
          fontWeight: 500,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        අවසන් ගණන් කිරීම
      </p>

      <p
        className="mt-4 text-wedding-primary leading-none"
        style={{
          fontFamily: "var(--font-geist-sans)",
          fontSize: "clamp(3.2rem, 10vw, 5.2rem)",
          fontWeight: 600,
        }}
      >
        {daysLeft}
      </p>

      <p
        className="text-wedding-muted mt-2"
        style={{
          fontFamily: "var(--font-sinhala)",
          fontSize: "1rem",
          letterSpacing: "0.08em",
        }}
      >
        දින
      </p>

      <p
        className="mt-4 max-w-[18rem] text-wedding-muted"
        style={{
          fontFamily: "var(--font-geist-sans)",
          fontSize: "clamp(0.92rem, 2.2vw, 1rem)",
          lineHeight: 1.8,
          fontStyle: "italic",
        }}
      >
        ගෙවෙන හැම දිනකම අනන්තය කරා හදවතක් ළඟා කරන්නේය.
      </p>
    </div>
  );
}