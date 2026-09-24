"use client";

import { useEffect, useMemo, useState } from "react";
import AddGuestModal from "@/components/dashboard/AddGuestModal";
import EditGuestModal from "@/components/dashboard/EditGuestModal";
import EditDrinksModal from "@/components/dashboard/EditDrinksModal";
import GuestListTable, { Guest } from "@/components/dashboard/GuestListTable";
import StatsCard from "@/components/dashboard/StatsCard";

type GuestsResponse = {
  success: boolean;
  guests?: Guest[];
  message?: string;
};

export default function GuestsPage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditDrinksModalOpen, setIsEditDrinksModalOpen] = useState(false);
  const [guestToEdit, setGuestToEdit] = useState<Guest | null>(null);
  const [guestToEditDrinks, setGuestToEditDrinks] = useState<Guest | null>(null);

  const fetchGuests = async () => {
    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("/api/guest", { cache: "no-store" });
      const data: GuestsResponse = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to load guests");
      }

      setGuests(data.guests || []);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load guests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  const handleEditGuest = (guest: Guest) => {
    setGuestToEdit(guest);
    setIsEditModalOpen(true);
  };

  const handleEditDrinks = (guest: Guest) => {
    setGuestToEditDrinks(guest);
    setIsEditDrinksModalOpen(true);
  };

  const handleDeleteGuest = async (guestId: string) => {
    try {
      const res = await fetch(`/api/guest/${guestId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to delete guest");
      }

      setMessage("Guest deleted successfully.");
      await fetchGuests();
    } catch (error) {
      console.error(error);
      setMessage("Failed to delete guest.");
      throw error;
    }
  };

  const handleUpdateStatus = async (
    guestId: string,
    status: "default" | "invited" | "attending" | "declined"
  ) => {
    try {
      const res = await fetch(`/api/guest/${guestId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rsvpStatus: status }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update guest");
      }

      setMessage("RSVP status updated successfully.");
      await fetchGuests();
    } catch (error) {
      console.error(error);
      setMessage("Failed to update RSVP status.");
      throw error;
    }
  };

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

    const groomSide = guests.filter(
      (guest) => guest.side === "groom"
    ).reduce((acc, guest) => acc + (guest.partySize ?? 1), 0);
    const brideSide = guests.filter(
      (guest) => guest.side === "bride"
    ).reduce((acc, guest) => acc + (guest.partySize ?? 1), 0);
    const bothSides = guests.filter(
      (guest) => guest.side === "both"
    ).reduce((acc, guest) => acc + (guest.partySize ?? 1), 0);

    const totalLiquor = guests.reduce((acc, guest) => acc + (guest.liquorCount ?? 0), 0);
    const totalBeer = guests.reduce((acc, guest) => acc + (guest.beerCount ?? 0), 0);

    return { totalGuests, attending, declined, invited, groomSide, brideSide, bothSides, totalLiquor, totalBeer };
  }, [guests]);

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set((guests.map((g) => g.category).filter(Boolean) as string[]))
    );
    if (!unique.includes("Uncategorized")) {
      unique.unshift("Uncategorized");
    }
    return unique;
  }, [guests]);

  return (
    <div className="space-y-8">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard label="Total" value={totals.totalGuests} tone="neutral" />
        <StatsCard label="Attending" value={totals.attending} tone="green" />
        <StatsCard label="Invited" value={totals.invited} tone="amber" />
        <StatsCard label="Declined" value={totals.declined} tone="rose" />
      </section>

      <section className="grid gap-4 sm:grid-cols-3 xl:grid-cols-5">
        <StatsCard label="Bride Side" value={totals.brideSide} tone="neutral" />
        <StatsCard label="Groom Side" value={totals.groomSide} tone="neutral" />
        <StatsCard label="Both Sides" value={totals.bothSides} tone="neutral" />
        <StatsCard label="Total Liquor" value={totals.totalLiquor} tone="neutral" />
        <StatsCard label="Total Beer" value={totals.totalBeer} tone="neutral" />
      </section>

      {message ? (
        <p className="text-sm text-[#7a6755]">{message}</p>
      ) : null}

      <GuestListTable
        guests={guests}
        loading={loading}
        onAddGuest={() => setIsModalOpen(true)}
        onDeleteGuest={handleDeleteGuest}
        onUpdateStatus={handleUpdateStatus}
        onEditGuest={handleEditGuest}
        onEditDrinks={handleEditDrinks}
        onErrorMessage={setMessage}
      />

      <AddGuestModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onGuestAdded={fetchGuests}
        onSuccessMessage={setMessage}
        onErrorMessage={setMessage}
        existingCategories={categories}
      />

      <EditGuestModal
        open={isEditModalOpen}
        guest={guestToEdit}
        onClose={() => {
          setIsEditModalOpen(false);
          setGuestToEdit(null);
        }}
        onGuestUpdated={fetchGuests}
        onSuccessMessage={setMessage}
        onErrorMessage={setMessage}
        existingCategories={categories}
      />

      <EditDrinksModal
        open={isEditDrinksModalOpen}
        guest={guestToEditDrinks}
        onClose={() => {
          setIsEditDrinksModalOpen(false);
          setGuestToEditDrinks(null);
        }}
        onGuestUpdated={fetchGuests}
        onSuccessMessage={setMessage}
        onErrorMessage={setMessage}
      />
    </div>
  );
}