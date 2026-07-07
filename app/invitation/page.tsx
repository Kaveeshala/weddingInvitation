"use client";

import { useState } from "react";
import InvitationHeroCard from "../../components/invitation/InvitationHeroCard";
import RSVPSection from "../../components/invitation/RSVPSection";

export default function InvitationPage() {
  const weddingDate = new Date("2027-01-28T00:00:00+05:30");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    attending: "yes",
    guests: "1",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="relative w-full overflow-hidden bg-wedding-bg">
      {/* Hero card takes full screen */}
      <section className="min-h-screen w-full flex items-center justify-center">
        <InvitationHeroCard />
      </section>

      {/* RSVP section below */}
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