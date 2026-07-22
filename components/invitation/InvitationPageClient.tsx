"use client";

import { useState } from "react";
import InvitationHeroCard from "@/components/invitation/InvitationHeroCard";
import RSVPSection from "@/components/invitation/RSVPSection";

interface InvitationPageClientProps {
  guest: {
    name: string;
    token: string;
    partySize: number;
    rsvpStatus: "pending" | "accepted" | "declined";
  };
}

export default function InvitationPageClient({
  guest,
}: InvitationPageClientProps) {
  const weddingDate = new Date("2027-01-28T00:00:00+05:30");

  const [submitted, setSubmitted] = useState(guest.rsvpStatus !== "pending");
  const [form, setForm] = useState({
    name: guest.name,
    attending: guest.rsvpStatus === "declined" ? "no" : "yes",
    guests: String(guest.partySize),
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/rsvp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: guest.token,
        attending: form.attending,
        guests: form.guests,
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
    <main className="relative w-full overflow-hidden bg-wedding-bg">
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
        />
      </div>
    </main>
  );
}