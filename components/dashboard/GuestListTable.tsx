"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

export type Guest = {
  _id: string;
  name: string;
  token: string;
  partySize?: number;
  side?: "bride" | "groom";
  rsvpStatus?: "default" | "invited" | "attending" | "declined";
};

type GuestListTableProps = {
  guests: Guest[];
  loading?: boolean;
  onAddGuest: () => void;
  onDeleteGuest: (guestId: string) => Promise<void> | void;
  onUpdateStatus: (
    guestId: string,
    status: "default" | "invited" | "attending" | "declined"
  ) => Promise<void> | void;
  onErrorMessage?: (message: string) => void;
};

export default function GuestListTable({
  guests,
  loading = false,
  onAddGuest,
  onDeleteGuest,
  onUpdateStatus,
  onErrorMessage,
}: GuestListTableProps) {
  const [search, setSearch] = useState("");
  const [sideFilter, setSideFilter] = useState<"all" | "bride" | "groom">(
    "all"
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filteredGuests = useMemo(() => {
    const q = search.trim().toLowerCase();

    return guests.filter((guest) => {
      const matchesSide =
        sideFilter === "all" ? true : guest.side === sideFilter;

      const matchesSearch =
        !q ||
        guest.name?.toLowerCase().includes(q) ||
        guest.token?.toLowerCase().includes(q) ||
        guest.side?.toLowerCase().includes(q);

      return matchesSide && matchesSearch;
    });
  }, [guests, search, sideFilter]);

  const getInviteLink = (token: string) => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/invite/${token}`;
    }

    return `/invite/${token}`;
  };

  const copyInviteLink = async (token: string, guestId: string) => {
    try {
      const link = getInviteLink(token);
      await navigator.clipboard.writeText(link);
      setCopiedId(guestId);
      setTimeout(() => setCopiedId(null), 1800);
    } catch (error) {
      console.error(error);
      onErrorMessage?.("Failed to copy invitation link.");
    }
  };

  const handleDelete = async (guestId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this guest?"
    );
    if (!confirmed) return;

    try {
      setDeletingId(guestId);
      await onDeleteGuest(guestId);
    } catch (error) {
      console.error(error);
      onErrorMessage?.("Failed to delete guest.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleStatusChange = async (
    guestId: string,
    status: "default" | "invited" | "attending" | "declined"
  ) => {
    try {
      setUpdatingId(guestId);
      await onUpdateStatus(guestId, status);
    } catch (error) {
      console.error(error);
      onErrorMessage?.("Failed to update RSVP status.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="rounded-[1.75rem] border border-[#eadfce] bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            variant={sideFilter === "all" ? "default" : "outline"}
            onClick={() => setSideFilter("all")}
          >
            All
          </Button>

          <Button
            type="button"
            variant={sideFilter === "bride" ? "default" : "outline"}
            onClick={() => setSideFilter("bride")}
          >
            Bride Side
          </Button>

          <Button
            type="button"
            variant={sideFilter === "groom" ? "default" : "outline"}
            onClick={() => setSideFilter("groom")}
          >
            Groom Side
          </Button>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            placeholder="Search by name, token, or side"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-sm rounded-full border border-[#e7d9c8] bg-[#fffdfa] px-4 py-3 text-sm text-[#2f2a24] outline-none transition focus:border-[#b08d57]"
          />

          <Button type="button" onClick={onAddGuest}>
            Add Guest
          </Button>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-[#efe3d4]">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-[#fcf7f0]">
              <tr className="text-left">
                <th className="px-4 py-4 text-sm font-medium text-[#77685a]">
                  Name
                </th>
                <th className="px-4 py-4 text-sm font-medium text-[#77685a]">
                  Side
                </th>
                <th className="px-4 py-4 text-sm font-medium text-[#77685a]">
                  Count
                </th>
                <th className="px-4 py-4 text-sm font-medium text-[#77685a]">
                  RSVP
                </th>
                <th className="px-4 py-4 text-sm font-medium text-[#77685a]">
                  Invitation Link
                </th>
                <th className="px-4 py-4 text-sm font-medium text-[#77685a]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-sm text-[#8a7a6a]"
                  >
                    Loading guests...
                  </td>
                </tr>
              ) : filteredGuests.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-sm text-[#8a7a6a]"
                  >
                    No guests found.
                  </td>
                </tr>
              ) : (
                filteredGuests.map((guest) => (
                  <tr
                    key={guest._id}
                    className="border-t border-[#f1e7da] align-top"
                  >
                    <td className="px-4 py-4 text-sm font-medium text-[#2f2a24]">
                      {guest.name}
                    </td>

                    <td className="px-4 py-4 text-sm text-[#5f5246] capitalize">
                      {guest.side || "-"}
                    </td>

                    <td className="px-4 py-4 text-sm text-[#5f5246]">
                      {guest.partySize ?? 1}
                    </td>

                    <td className="px-4 py-4">
                      <select
                        value={guest.rsvpStatus || "default"}
                        onChange={(e) =>
                          handleStatusChange(
                            guest._id,
                            e.target.value as
                              | "default"
                              | "invited"
                              | "attending"
                              | "declined"
                          )
                        }
                        disabled={updatingId === guest._id}
                        className="rounded-full border border-[#e7d9c8] bg-[#fffdfa] px-4 py-2 text-sm text-[#2f2a24] outline-none transition focus:border-[#b08d57]"
                      >
                        <option value="default">Default</option>
                        <option value="invited">Invited</option>
                        <option value="attending">Attending</option>
                        <option value="declined">Declined</option>
                      </select>
                    </td>

                    <td className="px-4 py-4">
                      <div className="max-w-[260px]">
                        <p className="truncate text-sm text-[#5f5246]">
                          {getInviteLink(guest.token)}
                        </p>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => copyInviteLink(guest.token, guest._id)}
                        >
                          {copiedId === guest._id ? "Copied" : "Copy Link"}
                        </Button>

                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => handleDelete(guest._id)}
                          disabled={deletingId === guest._id}
                        >
                          {deletingId === guest._id ? "Deleting..." : "Delete"}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}