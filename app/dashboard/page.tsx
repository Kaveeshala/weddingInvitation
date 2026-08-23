"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";



const quickLinks = [
  {
    href: "/dashboard/guests",
    title: "Guest Management",
    description: "Add guests, edit details, and generate invitation links.",
  },
  {
    href: "/dashboard/rsvps",
    title: "RSVP Results",
    description: "See who is attending, pending, or declined.",
  },
  {
    href: "/dashboard/invitations",
    title: "Invitation Card",
    description: "Preview your wedding invitation inside the dashboard.",
  },
];

export default function DashboardPage() {
  const weddingDate = useMemo(() => new Date("2027-01-28T00:00:00+05:30"), []);

  const [guests, setGuests] = useState<any[]>([]);

  const fetchGuests = async () => {
    try {
      const res = await fetch("/api/guest", { cache: "no-store" });
      const data = await res.json();
      if (res.ok && data.success) {
        setGuests(data.guests || []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  const totals = useMemo(() => {
    const totalGuests = guests.reduce((acc, guest) => acc + (guest.partySize ?? 1), 0);
    const attending = guests.filter(
      (guest) => guest.rsvpStatus === "attending"
    ).reduce((acc, guest) => acc + (guest.partySize ?? 1), 0);
    const declined = guests.filter(
      (guest) => guest.rsvpStatus === "declined"
    ).reduce((acc, guest) => acc + (guest.partySize ?? 1), 0);
    const invited = guests.filter(
      (guest) => !guest.rsvpStatus || guest.rsvpStatus === "invited"
    ).reduce((acc, guest) => acc + (guest.partySize ?? 1), 0);

    return { totalGuests, attending, declined, invited };
  }, [guests]);

  const dynamicStats = useMemo(() => [
    {
      label: "Total Guests",
      value: String(totals.totalGuests),
      note: "All invited guests",
      accent: "from-[#f5ede3] to-[#fffdf9]",
      text: "text-[#2f2a24]",
    },
    {
      label: "Attending",
      value: String(totals.attending),
      note: "Confirmed attendees",
      accent: "from-[#e8f4ea] to-[#f9fffa]",
      text: "text-[#2d7a46]",
    },
    {
      label: "Pending",
      value: String(totals.invited),
      note: "Waiting for response",
      accent: "from-[#f8f0dd] to-[#fffdf7]",
      text: "text-[#b7791f]",
    },
    {
      label: "Declined",
      value: String(totals.declined),
      note: "Unable to attend",
      accent: "from-[#f8e8e8] to-[#fffafb]",
      text: "text-[#b45252]",
    },
  ], [totals]);

  const getTimeLeft = () => {
    const now = new Date().getTime();
    const target = weddingDate.getTime();
    const difference = target - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      ),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[2rem] border border-[#eadfce] bg-gradient-to-br from-[#fffdf9] via-[#fdf8f2] to-[#f7efe6] px-8 py-10 shadow-sm">
        <p className="text-xs uppercase tracking-[0.28em] text-[#b08d57]">
          Wedding Dashboard
        </p>

        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#2f2a24] sm:text-3xl">
          Manage your wedding guests and RSVPs
        </h2>

        <p className="mt-4 max-w-3xl text-base leading-7 text-[#726457]">
          This dashboard is only for the couple to manage guest details, track
          RSVP responses, and preview the invitation card in one place.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/dashboard/guests"
            className="rounded-full bg-[#b08d57] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#9a7847]"
          >
            Manage Guests
          </Link>

          <Link
            href="/dashboard/invitations"
            className="rounded-full border border-[#dbc7ae] bg-white px-5 py-3 text-sm font-medium text-[#6f5f51] transition hover:border-[#b08d57] hover:text-[#b08d57]"
          >
            View Invitation Card
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dynamicStats.map((item) => (
          <div
            key={item.label}
            className={`rounded-[1.75rem] border border-[#eadfce] bg-gradient-to-br ${item.accent} p-6 shadow-sm`}
          >
            <p className="text-sm font-medium text-[#8a7a6a]">{item.label}</p>
            <p className={`mt-4 text-4xl font-semibold ${item.text}`}>
              {item.value}
            </p>
            <p className="mt-2 text-sm text-[#9a8d81]">{item.note}</p>
          </div>
        ))}
      </section>

      <section className="py-8 my-8">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#b08d57]">
            Counting down to the big day
          </p>
          <h3 className="mt-2 text-xl font-medium tracking-wide text-[#2f2a24]">
            28 January 2027
          </h3>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4 sm:gap-8 md:gap-12">
          <CountdownItem label="Days" value={timeLeft.days} />
          <span className="pb-6 text-3xl font-light text-[#dbc7ae] sm:pb-8 sm:text-5xl">:</span>
          <CountdownItem label="Hours" value={timeLeft.hours} />
          <span className="pb-6 text-3xl font-light text-[#dbc7ae] sm:pb-8 sm:text-5xl">:</span>
          <CountdownItem label="Minutes" value={timeLeft.minutes} />
          <span className="pb-6 text-3xl font-light text-[#dbc7ae] sm:pb-8 sm:text-5xl">:</span>
          <CountdownItem label="Seconds" value={timeLeft.seconds} />
        </div>
      </section>
    </div>
  );
}

function CountdownItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex min-w-[3rem] flex-col items-center sm:min-w-[4rem] md:min-w-[5rem]">
      <span className="text-4xl font-light tracking-tight text-[#2f2a24] sm:text-6xl md:text-7xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-2 text-[9px] uppercase tracking-[0.2em] text-[#8a7a6a] sm:mt-4 sm:text-[11px]">
        {label}
      </span>
    </div>
  );
}
