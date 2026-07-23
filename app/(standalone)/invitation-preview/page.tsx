"use client";

import { useState } from "react";
import InvitationHeroCard from "@/components/invitation/InvitationHeroCard";
import RSVPSection from "@/components/invitation/RSVPSection";

export default function InvitationPreviewPage() {
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
    <main className="min-h-screen bg-[#fdf8f2]">
      <section className="min-h-screen">
        <InvitationHeroCard />
      </section>

      <RSVPSection
        submitted={submitted}
        form={form}
        setForm={setForm}
        handleSubmit={handleSubmit}
        weddingDate={weddingDate}
      />
    </main>
  );
}