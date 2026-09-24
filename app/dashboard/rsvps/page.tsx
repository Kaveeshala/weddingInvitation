"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Lock, Unlock } from "lucide-react";

type Guest = {
  _id: string;
  name: string;
  partySize?: number;
  rsvpStatus?: "pending" | "attending" | "declined";
  respondedGuestCount?: number;
  side?: "bride" | "groom" | "both";
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
  const [sideFilter, setSideFilter] = useState<"all" | "bride" | "groom" | "both">("all");
  const [rsvpFilter, setRsvpFilter] = useState<"all" | "attending" | "declined" | "pending">("all");
  const [unlockedId, setUnlockedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleStatusChange = async (guestId: string, newStatus: string) => {
    try {
      setUpdatingId(guestId);
      const res = await fetch(`/api/guest/${guestId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rsvpStatus: newStatus }),
      });
      
      if (!res.ok) throw new Error("Failed to update status");
      
      setGuests(prev => prev.map(g => g._id === guestId ? { ...g, rsvpStatus: newStatus as any } : g));
      setUnlockedId(null);
    } catch(error) {
      console.error(error);
      setMessage("Failed to update RSVP status.");
    } finally {
      setUpdatingId(null);
    }
  };

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
    return guests
      .filter((guest) => sideFilter === "all" || guest.side === sideFilter)
      .map((guest) => {
      const status = guest.rsvpStatus || "pending";

      let finalCount = guest.partySize ?? 1;
      if (status === "attending" && guest.respondedGuestCount !== undefined && guest.respondedGuestCount > 0) {
        finalCount = guest.respondedGuestCount;
      }

      return {
        _id: guest._id,
        name: guest.name,
        count: finalCount,
        answer:
          status === "attending"
            ? "Yes"
            : status === "declined"
              ? "No"
              : "Pending",
        status,
      };
    })
    .filter((row) => {
      if (rsvpFilter === "all") return true;
      if (rsvpFilter === "attending") return row.answer === "Yes";
      if (rsvpFilter === "declined") return row.answer === "No";
      if (rsvpFilter === "pending") return row.answer === "Pending";
      return true;
    });
  }, [guests, sideFilter, rsvpFilter]);

  const totals = useMemo(() => {
    const yesCount = rsvpRows
      .filter((guest) => guest.answer === "Yes")
      .reduce((acc, guest) => acc + guest.count, 0);
    const noCount = rsvpRows
      .filter((guest) => guest.answer === "No")
      .reduce((acc, guest) => acc + guest.count, 0);
    const pendingCount = rsvpRows
      .filter((guest) => guest.answer === "Pending")
      .reduce((acc, guest) => acc + guest.count, 0);
    const total = rsvpRows.reduce((acc, guest) => acc + guest.count, 0);

    return {
      yesCount,
      noCount,
      pendingCount,
      total,
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
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#b08d57]">
              RSVP Results Table
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="button"
              variant={sideFilter === "all" ? "default" : "outline"}
              onClick={() => setSideFilter("all")}
              className="cursor-pointer px-5 py-3 h-auto text-sm"
            >
              All
            </Button>

            <Button
              type="button"
              variant={sideFilter === "bride" ? "default" : "outline"}
              onClick={() => setSideFilter("bride")}
              className="cursor-pointer px-5 py-3 h-auto text-sm"
            >
              Bride Side
            </Button>

            <Button
              type="button"
              variant={sideFilter === "groom" ? "default" : "outline"}
              onClick={() => setSideFilter("groom")}
              className="cursor-pointer px-5 py-3 h-auto text-sm"
            >
              Groom Side
            </Button>

            <Button
              type="button"
              variant={sideFilter === "both" ? "default" : "outline"}
              onClick={() => setSideFilter("both")}
              className="cursor-pointer px-5 py-3 h-auto text-sm"
            >
              Both Sides
            </Button>

            <div className="hidden sm:block h-8 w-px bg-[#e7d9c8] mx-1"></div>

            <select
              value={rsvpFilter}
              onChange={(e) => setRsvpFilter(e.target.value as any)}
              className="cursor-pointer rounded-[0.5rem] border border-[#e7d9c8] bg-white px-4 py-3 text-sm text-[#2f2a24] outline-none transition focus:border-[#b08d57]"
            >
              <option value="all">All RSVPs</option>
              <option value="attending">Yes (Attending)</option>
              <option value="declined">No (Declined)</option>
              <option value="pending">Pending</option>
            </select>
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
                  <th className="px-4 py-4 text-sm font-bold text-[#77685a]">
                    Name
                  </th>
                  <th className="px-4 py-4 text-sm font-bold text-[#77685a]">
                    Count
                  </th>
                  <th className="px-4 py-4 text-sm font-bold text-[#77685a]">
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
                        <div className="flex items-center gap-2">
                          {unlockedId === guest._id ? (
                            <select
                              value={guest.status === "attending" ? "attending" : guest.status === "declined" ? "declined" : "default"}
                              onChange={(e) => handleStatusChange(guest._id, e.target.value)}
                              disabled={updatingId === guest._id}
                              className="cursor-pointer rounded-full border border-[#e7d9c8] bg-[#fffdfa] px-3 py-1 text-sm text-[#2f2a24] outline-none transition focus:border-[#b08d57]"
                            >
                              <option value="default">Pending</option>
                              <option value="attending">Yes</option>
                              <option value="declined">No</option>
                            </select>
                          ) : (
                            <AnswerBadge answer={guest.answer} />
                          )}
                          
                          <button
                            type="button"
                            onClick={() => setUnlockedId(unlockedId === guest._id ? null : guest._id)}
                            className="cursor-pointer p-1.5 text-[#a89b8d] hover:text-[#2f2a24] transition-colors rounded-full hover:bg-[#fcf7f0]"
                            title={unlockedId === guest._id ? "Lock" : "Unlock to edit"}
                          >
                            {unlockedId === guest._id ? <Unlock size={16} /> : <Lock size={16} />}
                          </button>
                          {updatingId === guest._id && <span className="text-xs text-[#a89b8d]">Saving...</span>}
                        </div>
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
