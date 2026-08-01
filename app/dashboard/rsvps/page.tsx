"use client";

import { useEffect, useMemo, useState } from "react";

type Guest = {
  _id: string;
  name: string;
  partySize?: number;
  rsvpStatus?: "pending" | "attending" | "declined";
  respondedGuestCount?: number;
};

type GuestsResponse = {
  success: boolean;
  guests?: Guest[];
  message?: string;
};

export default function RSVPsPage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchGuests = async () => {
    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("/api/guest", {
        cache: "no-store",
      });

      const data: GuestsResponse = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to load RSVP data");
      }

      setGuests(data.guests || []);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load RSVP data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  const rsvpRows = useMemo(() => {
    return guests.map((guest) => {
      const status = guest.rsvpStatus || "pending";

      return {
        _id: guest._id,
        name: guest.name,
        count: guest.respondedGuestCount ?? guest.partySize ?? 1,
        answer:
          status === "attending"
            ? "Yes"
            : status === "declined"
              ? "No"
              : "Pending",
        status,
      };
    });
  }, [guests]);

  const totals = useMemo(() => {
    const yesCount = rsvpRows.filter((guest) => guest.answer === "Yes").length;
    const noCount = rsvpRows.filter((guest) => guest.answer === "No").length;
    const pendingCount = rsvpRows.filter(
      (guest) => guest.answer === "Pending",
    ).length;

    return {
      yesCount,
      noCount,
      pendingCount,
      total: rsvpRows.length,
    };
  }, [rsvpRows]);

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-[#eadfce] bg-white p-8 shadow-sm">
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#2f2a24] sm:text-3xl">
          Guest RSVP responses
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            label="Total Guests"
            value={totals.total}
            tone="neutral"
          />
          <SummaryCard label="Yes" value={totals.yesCount} tone="green" />
          <SummaryCard label="No" value={totals.noCount} tone="rose" />
          <SummaryCard
            label="Pending"
            value={totals.pendingCount}
            tone="amber"
          />
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-[#eadfce] bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#b08d57]">
              RSVP Results Table
            </p>
            
          </div>
        </div>

        {message ? (
          <p className="mt-4 text-sm text-[#7a6755]">{message}</p>
        ) : null}

        <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-[#efe3d4]">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead className="bg-[#fcf7f0]">
                <tr className="text-left">
                  <th className="px-4 py-4 text-sm font-medium text-[#77685a]">
                    Name
                  </th>
                  <th className="px-4 py-4 text-sm font-medium text-[#77685a]">
                    Count
                  </th>
                  <th className="px-4 py-4 text-sm font-medium text-[#77685a]">
                    Yes / No
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-10 text-center text-sm text-[#8a7a6a]"
                    >
                      Loading RSVP results...
                    </td>
                  </tr>
                ) : rsvpRows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-10 text-center text-sm text-[#8a7a6a]"
                    >
                      No RSVP data found.
                    </td>
                  </tr>
                ) : (
                  rsvpRows.map((guest) => (
                    <tr
                      key={guest._id}
                      className="border-t border-[#f1e7da] align-middle"
                    >
                      <td className="px-4 py-4 text-sm font-medium text-[#2f2a24]">
                        {guest.name}
                      </td>

                      <td className="px-4 py-4 text-sm text-[#5f5246]">
                        {guest.count}
                      </td>

                      <td className="px-4 py-4">
                        <AnswerBadge answer={guest.answer} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "neutral" | "green" | "amber" | "rose";
}) {
  const toneStyles = {
    neutral: "bg-[#fcf7f0] text-[#2f2a24]",
    green: "bg-[#eef8ef] text-[#2d7a46]",
    amber: "bg-[#fff7e8] text-[#b7791f]",
    rose: "bg-[#fdeeee] text-[#b45252]",
  };

  return (
    <div className={`rounded-[1.5rem] p-4 ${toneStyles[tone]}`}>
      <p className="text-xs uppercase tracking-[0.18em] opacity-70">{label}</p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </div>
  );
}

function AnswerBadge({ answer }: { answer: string }) {
  const styles: Record<string, string> = {
    Yes: "border-[#b9debf] bg-[#eef8ef] text-[#2d7a46]",
    No: "border-[#e7b7b7] bg-[#fdeeee] text-[#b45252]",
    Pending: "border-[#f0d9a6] bg-[#fff7e8] text-[#b7791f]",
  };

  const badgeStyle = styles[answer] || "border-[#e7d9c8] bg-[#fcf8f3] text-[#6f5f51]";

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${badgeStyle}`}
    >
      {answer}
    </span>
  );
}
