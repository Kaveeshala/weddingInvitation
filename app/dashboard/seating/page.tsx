"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

type Guest = {
  id: string;
  name: string;
  partySize: number;
};

type TableItem = {
  id: string;
  label: string;
  capacity: number;
};

type SeatingResponse = {
  success: boolean;
  guests?: any[];
  seatingPlan?: {
    tableCount: number;
    tables: TableItem[];
    assignments: { guestId: string; tableId: string }[];
  };
  message?: string;
};

const INITIAL_VISIBLE_COUNT = 10;

export default function SeatingPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [tableCount, setTableCount] = useState(0);
  const [tables, setTables] = useState<TableItem[]>([]);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [assignments, setAssignments] = useState<Record<string, string>>({});

  const [showAllTables, setShowAllTables] = useState(false);
  const [showAllGuests, setShowAllGuests] = useState(false);
  const [showAllTableViews, setShowAllTableViews] = useState(false);

  const fetchSeatingData = async () => {
    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("/api/seating", {
        method: "GET",
        cache: "no-store",
      });

      const data: SeatingResponse = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to load seating data");
      }

      const normalizedGuests =
        data.guests?.map((guest: any) => ({
          id: String(guest._id),
          name: guest.name,
          partySize: Number(guest.partySize) || 1,
        })) || [];

      const normalizedAssignments =
        data.seatingPlan?.assignments?.reduce(
          (acc, item) => {
            acc[item.guestId] = item.tableId;
            return acc;
          },
          {} as Record<string, string>
        ) || {};

      setGuests(normalizedGuests);
      setTableCount(data.seatingPlan?.tableCount || 0);
      setTables(data.seatingPlan?.tables || []);
      setAssignments(normalizedAssignments);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load seating data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeatingData();
  }, []);

  const visibleTables = useMemo(() => {
    return showAllTables ? tables : tables.slice(0, INITIAL_VISIBLE_COUNT);
  }, [tables, showAllTables]);

  const visibleGuests = useMemo(() => {
    return showAllGuests ? guests : guests.slice(0, INITIAL_VISIBLE_COUNT);
  }, [guests, showAllGuests]);

  const visibleTableViews = useMemo(() => {
    return showAllTableViews ? tables : tables.slice(0, INITIAL_VISIBLE_COUNT);
  }, [tables, showAllTableViews]);

  const buildTablesFromCount = (count: number) => {
    return Array.from({ length: count }, (_, index) => {
      const existing = tables[index];
      return {
        id: existing?.id || `table-${index + 1}`,
        label: `Table ${String(index + 1).padStart(2, "0")}`,
        capacity: existing?.capacity || 0,
      };
    });
  };

  const handleCreateOrUpdateTables = async () => {
    try {
      setSaving(true);
      setMessage("");

      const count = Math.max(0, Number(tableCount) || 0);
      const generatedTables = buildTablesFromCount(count);

      const validTableIds = new Set(generatedTables.map((table) => table.id));

      const filteredAssignments = Object.fromEntries(
        Object.entries(assignments).filter(([, tableId]) =>
          validTableIds.has(tableId)
        )
      );

      const payloadAssignments = Object.entries(filteredAssignments).map(
        ([guestId, tableId]) => ({
          guestId,
          tableId,
        })
      );

      const res = await fetch("/api/seating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tableCount: count,
          tables: generatedTables,
          assignments: payloadAssignments,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to save tables");
      }

      setTables(generatedTables);
      setAssignments(filteredAssignments);
      setMessage("Tables saved successfully.");
      await fetchSeatingData();
    } catch (error) {
      console.error(error);
      setMessage("Failed to save tables.");
    } finally {
      setSaving(false);
    }
  };

  const updateCapacity = (tableId: string, value: number) => {
    setTables((prev) =>
      prev.map((table) =>
        table.id === tableId
          ? { ...table, capacity: Math.max(0, Number(value) || 0) }
          : table
      )
    );
  };

  const getAssignedGuestsForTable = (tableId: string) => {
    return guests.filter((guest) => assignments[guest.id] === tableId);
  };

  const getUsedSeats = (tableId: string) => {
    return getAssignedGuestsForTable(tableId).reduce(
      (sum, guest) => sum + guest.partySize,
      0
    );
  };

  const canAssignGuestToTable = (guest: Guest, tableId: string) => {
    const table = tables.find((t) => t.id === tableId);
    if (!table) return false;

    const currentAssignedTable = assignments[guest.id];
    const currentUsedSeats = getUsedSeats(tableId);

    const adjustedUsedSeats =
      currentAssignedTable === tableId
        ? currentUsedSeats
        : currentUsedSeats + guest.partySize;

    return adjustedUsedSeats <= table.capacity;
  };

  const handleAssignGuest = (guestId: string, tableId: string) => {
    const guest = guests.find((g) => g.id === guestId);
    if (!guest || !tableId) return;

    if (!canAssignGuestToTable(guest, tableId)) {
      alert("This table does not have enough seats for this guest/group.");
      return;
    }

    setAssignments((prev) => ({
      ...prev,
      [guestId]: tableId,
    }));
  };

  const removeAssignment = (guestId: string) => {
    setAssignments((prev) => {
      const updated = { ...prev };
      delete updated[guestId];
      return updated;
    });
  };

  const saveSeatingPlan = async () => {
    try {
      setSaving(true);
      setMessage("");

      const payloadAssignments = Object.entries(assignments).map(
        ([guestId, tableId]) => ({
          guestId,
          tableId,
        })
      );

      const res = await fetch("/api/seating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tableCount,
          tables,
          assignments: payloadAssignments,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to save seating plan");
      }

      setMessage("Seating plan saved successfully.");
      await fetchSeatingData();
    } catch (error) {
      console.error(error);
      setMessage("Failed to save seating plan.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-[#eadfce] bg-white p-8 shadow-sm">
        <p className="text-xs uppercase tracking-[0.28em] text-[#b08d57]">
          Seat Management
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#2f2a24] sm:text-4xl">
          Create tables and assign guests
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[#76685a]">
          Save the number of tables, update seat counts, assign guests, and view
          the guest list for each table.
        </p>
      </section>

      <section className="rounded-[1.75rem] border border-[#eadfce] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="w-full max-w-xs">
              <label className="mb-2 block text-sm font-medium text-[#5f5246]">
                Number of tables
              </label>
              <input
                type="number"
                min={1}
                value={tableCount || ""}
                onChange={(e) => setTableCount(Number(e.target.value))}
                placeholder="Enter number of tables"
                className="w-full rounded-2xl border border-[#e7d9c8] bg-[#fffdfa] px-4 py-3 text-sm text-[#2f2a24] outline-none transition focus:border-[#b08d57]"
              />
            </div>

            <Button
              type="button"
              onClick={handleCreateOrUpdateTables}
              disabled={saving}
              className="px-5 py-3"
            >
              {saving ? "Saving..." : "Create / Update Tables"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={saveSeatingPlan}
              disabled={saving}
              className="px-5 py-3"
            >
              {saving ? "Saving..." : "Save All Changes"}
            </Button>
          </div>
        </div>

        {message ? (
          <p className="mt-4 text-sm text-[#7a6755]">{message}</p>
        ) : null}

        {tables.length > 0 && (
          <>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {visibleTables.map((table) => (
                <div
                  key={table.id}
                  className="rounded-[1.5rem] border border-[#efe3d4] bg-[#fcf8f3] p-5"
                >
                  <p className="text-sm font-semibold text-[#2f2a24]">
                    {table.label}
                  </p>

                  <label className="mt-4 mb-2 block text-sm text-[#6f5f51]">
                    Number of seats
                  </label>

                  <input
                    type="number"
                    min={0}
                    value={table.capacity}
                    onChange={(e) =>
                      updateCapacity(table.id, Number(e.target.value))
                    }
                    className="w-full rounded-xl border border-[#e7d9c8] bg-white px-4 py-3 text-sm text-[#2f2a24] outline-none transition focus:border-[#b08d57]"
                  />

                  <p className="mt-3 text-xs text-[#8a7a6a]">
                    Used seats: {getUsedSeats(table.id)} / {table.capacity}
                  </p>
                </div>
              ))}
            </div>

            {tables.length > INITIAL_VISIBLE_COUNT ? (
              <div className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAllTables((prev) => !prev)}
                >
                  {showAllTables ? "Show Less Tables" : "Show More Tables"}
                </Button>
              </div>
            ) : null}
          </>
        )}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[1.75rem] border border-[#eadfce] bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.24em] text-[#b08d57]">
            Assign Guests
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-[#2f2a24]">
            Assign each guest to a table
          </h3>

          {loading ? (
            <p className="mt-6 text-sm text-[#8a7a6a]">Loading guests...</p>
          ) : (
            <>
              <div className="mt-6 space-y-4">
                {visibleGuests.map((guest) => {
                  const assignedTableId = assignments[guest.id] || "";
                  const assignedTable = tables.find(
                    (t) => t.id === assignedTableId
                  );

                  return (
                    <div
                      key={guest.id}
                      className="rounded-[1.25rem] border border-[#efe3d4] bg-[#fcf8f3] p-4"
                    >
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="font-medium text-[#2f2a24]">
                            {guest.name}
                          </p>
                          <p className="text-sm text-[#8a7a6a]">
                            Party size: {guest.partySize}
                          </p>
                        </div>

                        <div className="flex flex-col gap-2 md:min-w-[220px]">
                          <select
                            value={assignedTableId}
                            onChange={(e) =>
                              handleAssignGuest(guest.id, e.target.value)
                            }
                            className="rounded-xl border border-[#e7d9c8] bg-white px-4 py-3 text-sm text-[#2f2a24] outline-none transition focus:border-[#b08d57]"
                          >
                            <option value="">Select table</option>
                            {tables.map((table) => {
                              const disabled =
                                !canAssignGuestToTable(guest, table.id) &&
                                assignedTableId !== table.id;

                              return (
                                <option
                                  key={table.id}
                                  value={table.id}
                                  disabled={disabled}
                                >
                                  {table.label} ({getUsedSeats(table.id)}/
                                  {table.capacity})
                                </option>
                              );
                            })}
                          </select>

                          {assignedTable ? (
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => removeAssignment(guest.id)}
                            >
                              Remove from {assignedTable.label}
                            </Button>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {guests.length > INITIAL_VISIBLE_COUNT ? (
                <div className="mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAllGuests((prev) => !prev)}
                  >
                    {showAllGuests ? "Show Less Guests" : "Show More Guests"}
                  </Button>
                </div>
              ) : null}
            </>
          )}
        </div>

        <div className="rounded-[1.75rem] border border-[#eadfce] bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.24em] text-[#b08d57]">
            Table View
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-[#2f2a24]">
            View guests by table
          </h3>

          <div className="mt-6 space-y-4">
            {tables.length === 0 ? (
              <p className="text-sm text-[#8a7a6a]">
                Create tables first to see the table view.
              </p>
            ) : (
              visibleTableViews.map((table) => {
                const assignedGuests = getAssignedGuestsForTable(table.id);

                return (
                  <div
                    key={table.id}
                    className="rounded-[1.25rem] border border-[#efe3d4] bg-[#fcf8f3] p-5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-[#2f2a24]">
                        {table.label}
                      </p>
                      <span className="rounded-full bg-white px-3 py-1 text-xs text-[#6f5f51]">
                        {getUsedSeats(table.id)} / {table.capacity} seats
                      </span>
                    </div>

                    {assignedGuests.length === 0 ? (
                      <p className="mt-3 text-sm text-[#8a7a6a]">
                        No guests assigned yet.
                      </p>
                    ) : (
                      <ul className="mt-4 space-y-2">
                        {assignedGuests.map((guest) => (
                          <li
                            key={guest.id}
                            className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm"
                          >
                            <span className="text-[#2f2a24]">{guest.name}</span>
                            <span className="text-[#8a7a6a]">
                              {guest.partySize} seat(s)
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {tables.length > INITIAL_VISIBLE_COUNT ? (
            <div className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAllTableViews((prev) => !prev)}
              >
                {showAllTableViews ? "Show Less Tables" : "Show More Tables"}
              </Button>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}