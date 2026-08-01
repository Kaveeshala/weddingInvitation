"use client";

import { useState } from "react";
import InvitationHeroCard from "@/components/invitation/InvitationHeroCard";
import RSVPSection from "@/components/invitation/RSVPSection";
import { LanguageProvider } from "@/components/invitation/InvitationLanguageContext";
import LanguageToggle from "@/components/invitation/LanguageToggle";

interface InvitationPageClientProps {
  guest: {
    name: string;
    token: string;
    partySize: number;
    rsvpStatus: "default" | "invited" | "attending" | "declined";
    responseMessage?: string;
    respondedGuestCount?: number;
  };
}

export default function InvitationPageClient({
  guest,
}: InvitationPageClientProps) {
  const weddingDate = new Date("2027-01-28T00:00:00+05:30");

  const alreadySubmitted =
    guest.rsvpStatus === "attending" || guest.rsvpStatus === "declined";

  const maxGuests = Math.max(1, guest.partySize || 1);
  const initialGuests = Math.min(
    Math.max(1, guest.respondedGuestCount || guest.partySize || 1),
    maxGuests
  );

  const [submitted, setSubmitted] = useState(alreadySubmitted);
  const [form, setForm] = useState({
    name: guest.name,
    attending: guest.rsvpStatus === "declined" ? "no" : "yes",
    guests: String(initialGuests),
    message: guest.responseMessage || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (guest.token === "preview") {
      setSubmitted(true);
      return;
    }

    const selectedGuests = Math.min(
      maxGuests,
      Math.max(1, Number(form.guests) || 1)
    );

    const res = await fetch("/api/rsvp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: guest.token,
        attending: form.attending,
        guests: selectedGuests,
        message: form.message,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to submit RSVP");
      return;
    }

    setSubmitted(true);
  };

  return (
    <LanguageProvider>
      <main className="relative w-full overflow-hidden bg-wedding-bg">
        <LanguageToggle />

        <section className="min-h-screen w-full flex items-center justify-center">
          <InvitationHeroCard guestName={guest.name} />
        </section>

        <div className="relative z-10">
          <RSVPSection
            submitted={submitted}
            form={form}
            setForm={setForm}
            handleSubmit={handleSubmit}
            weddingDate={weddingDate}
            maxGuests={maxGuests}
          />
        </div>
      </main>
    </LanguageProvider>
  );
}