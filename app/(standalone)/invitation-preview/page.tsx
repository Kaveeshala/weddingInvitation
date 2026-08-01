"use client";

import { useState } from "react";
import InvitationHeroCard from "@/components/invitation/InvitationHeroCard";
import RSVPSection from "@/components/invitation/RSVPSection";
import { LanguageProvider } from "@/components/invitation/InvitationLanguageContext";
import LanguageToggle from "@/components/invitation/LanguageToggle";

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
    <LanguageProvider>
      <main className="relative min-h-screen bg-[#fdf8f2]">
        <LanguageToggle />

        <section className="min-h-screen">
          <InvitationHeroCard />
        </section>

        <RSVPSection
          submitted={submitted}
          form={form}
          setForm={setForm}
          handleSubmit={handleSubmit}
          weddingDate={weddingDate}
          maxGuests={2}
        />
      </main>
    </LanguageProvider>
  );
}