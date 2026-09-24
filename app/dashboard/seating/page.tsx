"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Guest = {
  id: string;
  name: string;
  partySize: number;
  category?: string;
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

const FIXED_TABLE_COUNT = 20;
const FIXED_TABLE_CAPACITY = 10;

const getCategoryColor = (category: string) => {
  const colors = [
    "bg-blue-100 text-blue-700 border-blue-200",
    "bg-green-100 text-green-700 border-green-200",
    "bg-purple-100 text-purple-700 border-purple-200",
    "bg-pink-100 text-pink-700 border-pink-200",
    "bg-yellow-100 text-yellow-800 border-yellow-300",
    "bg-indigo-100 text-indigo-700 border-indigo-200",
    "bg-red-100 text-red-700 border-red-200",
    "bg-teal-100 text-teal-700 border-teal-200",
    "bg-orange-100 text-orange-700 border-orange-200",
    "bg-cyan-100 text-cyan-700 border-cyan-200",
  ];
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

export default function SeatingPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [tables, setTables] = useState<TableItem[]>([]);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [assignments, setAssignments] = useState<Record<string, string>>({});

  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [activeTableId, setActiveTableId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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
        data.guests
          ?.filter((guest: any) => guest.rsvpStatus === "attending")
          ?.map((guest: any) => {
            let finalPartySize = Number(guest.partySize) || 1;
            if (guest.respondedGuestCount !== undefined && guest.respondedGuestCount > 0) {
              finalPartySize = Number(guest.respondedGuestCount);
            }
            
            return {
              id: String(guest._id),
              name: guest.name,
              partySize: finalPartySize,
              category: guest.category || "Uncategorized",
            };
          }) || [];

      const normalizedAssignments =
        data.seatingPlan?.assignments?.reduce(
          (acc, item) => {
            acc[item.guestId] = item.tableId;
            return acc;
          },
          {} as Record<string, string>
        ) || {};

      setGuests(normalizedGuests);
      
      const initialTables = Array.from({ length: FIXED_TABLE_COUNT }, (_, i) => ({
        id: `table-${i + 1}`,
        label: `Table ${i + 1}`,
        capacity: FIXED_TABLE_CAPACITY,
      }));
      
      setTables(initialTables);
      
      const validTableIds = new Set(initialTables.map(t => t.id));
      const filteredAssignments = Object.fromEntries(
        Object.entries(normalizedAssignments).filter(([, tableId]) => validTableIds.has(tableId as string))
      );
      
      setAssignments(filteredAssignments);
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
      alert("This table does not have enough seats for this guest's party size.");
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
          tableCount: FIXED_TABLE_COUNT,
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

  const handleSeatClick = (tableId: string, seatGuest: Guest & { isLeader: boolean } | null) => {
    if (seatGuest) {
      if (window.confirm(`Remove ${seatGuest.name} from this table?`)) {
        removeAssignment(seatGuest.id);
      }
    } else {
      setActiveTableId(tableId);
      setAssignModalOpen(true);
    }
  };

  const downloadCSV = () => {
    let csvContent = "Table,Guest Name,Seats Taken\n";
    
    tables.forEach(table => {
      const assignedGuests = getAssignedGuestsForTable(table.id);
      if (assignedGuests.length > 0) {
        assignedGuests.forEach(guest => {
          const escapedName = guest.name.replace(/"/g, '""');
          csvContent += `"${table.label}","${escapedName}",${guest.partySize}\n`;
        });
      } else {
        csvContent += `"${table.label}","(Empty)",0\n`;
      }
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "wedding_seating_plan.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between rounded-[2rem] border border-[#eadfce] bg-white p-8 shadow-sm">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[#b08d57]">
            Seat Management
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#2f2a24]">
            Visual Seating Chart
          </h2>
          <p className="mt-2 text-sm text-[#76685a]">
            Click an empty seat (+) to assign a guest. Click an occupied seat to remove them.
          </p>
        </div>
        <div className="flex flex-col items-end">
          <Button
            type="button"
            onClick={saveSeatingPlan}
            disabled={saving}
            className="px-8 py-3 text-base h-auto cursor-pointer"
          >
            {saving ? "Saving..." : "Save Seating Plan"}
          </Button>
          {message && <p className="mt-2 text-sm text-[#7a6755]">{message}</p>}
        </div>
      </section>

      {loading ? (
        <div className="rounded-[1.75rem] border border-[#eadfce] bg-white p-12 shadow-sm text-center">
          <p className="text-sm text-[#8a7a6a]">Loading visual seating chart...</p>
        </div>
      ) : (
        <div className="rounded-[1.75rem] border border-[#eadfce] bg-white p-8 shadow-sm">
          <div className="grid gap-x-8 gap-y-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-6">
            {tables.map((table) => {
              const assignedGuests = getAssignedGuestsForTable(table.id);
              const seats = new Array(FIXED_TABLE_CAPACITY).fill(null);
              let seatIndex = 0;
              
              assignedGuests.forEach(guest => {
                for (let i = 0; i < guest.partySize; i++) {
                  if (seatIndex < FIXED_TABLE_CAPACITY) {
                    seats[seatIndex] = { ...guest, isLeader: i === 0 };
                    seatIndex++;
                  }
                }
              });

              return (
                <div key={table.id} className="relative w-72 h-72 mx-auto flex items-center justify-center">
                  {/* Table Center */}
                  <div className="w-28 h-28 rounded-full bg-[#fcf7f0] border-2 border-[#eadfce] flex flex-col items-center justify-center shadow-inner z-10">
                    <span className="font-semibold text-[#2f2a24] text-lg">{table.label}</span>
                    <span className="text-xs text-[#8a7a6a] mt-1">{getUsedSeats(table.id)}/{table.capacity}</span>
                  </div>
                  
                  {/* Seats */}
                  {seats.map((seatGuest, i) => {
                    const angle = (i * (360 / FIXED_TABLE_CAPACITY) - 90) * (Math.PI / 180);
                    const radius = 42; // 42% from center
                    const left = 50 + radius * Math.cos(angle);
                    const top = 50 + radius * Math.sin(angle);

                    return (
                      <div
                        key={i}
                        onClick={() => handleSeatClick(table.id, seatGuest)}
                        className={`absolute flex flex-col items-center justify-center w-14 h-14 rounded-full border border-[#e7d9c8] -translate-x-1/2 -translate-y-1/2 text-center leading-tight transition-all shadow-sm cursor-pointer hover:scale-110 z-20 ${
                          seatGuest 
                            ? "bg-[#eef8ef] border-[#b9debf] text-[#2d7a46] hover:bg-[#dceddd]" 
                            : "bg-white text-[#b08d57] hover:bg-[#fcf7f0]"
                        }`}
                        style={{ top: `${top}%`, left: `${left}%` }}
                        title={seatGuest ? seatGuest.name : "Assign Guest"}
                      >
                        {seatGuest ? (
                          <span className="text-[9px] font-semibold px-1 truncate w-full text-center block" title={seatGuest.name}>
                            {seatGuest.name.slice(0, 8)}{seatGuest.name.length > 8 ? ".." : ""}
                          </span>
                        ) : (
                          <span className="text-xl font-light">+</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* List View and Download */}
      <section className="rounded-[1.75rem] border border-[#eadfce] bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-[#2f2a24]">
              Table Assignments List
            </h3>
            <p className="mt-1 text-sm text-[#76685a]">
              A complete list of guests assigned to each table.
            </p>
          </div>
          <Button type="button" onClick={downloadCSV} className="cursor-pointer">
            Download CSV
          </Button>
        </div>

        <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-[#efe3d4]">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse bg-white">
              <thead className="bg-white">
                <tr className="text-left border-b border-[#f1e7da]">
                  <th className="px-4 py-4 text-sm font-bold text-[#77685a]">
                    Table
                  </th>
                  <th className="px-4 py-4 text-sm font-bold text-[#77685a]">
                    Guest Name
                  </th>
                  <th className="px-4 py-4 text-sm font-bold text-[#77685a]">
                    Seats Taken
                  </th>
                </tr>
              </thead>
              <tbody>
                {tables.map(table => {
                  const assignedGuests = getAssignedGuestsForTable(table.id);
                  if (assignedGuests.length === 0) {
                    return (
                      <tr key={table.id} className="border-t border-[#f1e7da]">
                        <td className="px-4 py-4 text-sm font-semibold text-[#5f5246] border-r border-[#f1e7da] bg-white align-top">
                          {table.label}
                        </td>
                        <td className="px-4 py-4 text-sm text-[#8a7a6a] italic">
                          No guests assigned
                        </td>
                        <td className="px-4 py-4 text-sm text-[#8a7a6a]">-</td>
                      </tr>
                    );
                  }

                  return assignedGuests.map((guest, index) => (
                    <tr key={`${table.id}-${guest.id}`} className="border-t border-[#f1e7da]">
                      {index === 0 && (
                        <td
                          rowSpan={assignedGuests.length}
                          className="px-4 py-4 text-sm font-semibold text-[#5f5246] border-r border-[#f1e7da] bg-white align-top min-w-[140px]"
                        >
                          {table.label}
                          <div className="text-xs font-normal text-[#8a7a6a] mt-1">
                            {getUsedSeats(table.id)}/{table.capacity} filled
                          </div>
                        </td>
                      )}
                      <td className="px-4 py-4 text-sm font-medium text-[#2f2a24]">
                        {guest.name}
                      </td>
                      <td className="px-4 py-4 text-sm text-[#5f5246]">
                        {guest.partySize}
                      </td>
                    </tr>
                  ));
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Assign Modal */}
      {assignModalOpen && activeTableId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-[2rem] border border-[#eadfce] bg-white p-6 shadow-2xl">
            <h3 className="text-xl font-semibold text-[#2f2a24]">
              Assign Guest to {tables.find(t => t.id === activeTableId)?.label}
            </h3>
            
            <div className="mt-4">
              <input
                type="text"
                placeholder="Search guests by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-[#e7d9c8] bg-[#fffdfa] px-4 py-3 text-sm text-[#2f2a24] outline-none transition focus:border-[#b08d57]"
              />
            </div>
            
            <div className="mt-4 max-h-[50vh] overflow-y-auto space-y-2 pr-2">
              {guests.length === 0 && <p className="text-sm text-[#8a7a6a]">No guests found.</p>}
              {guests
                .filter(g => g.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .sort((a, b) => {
                  const aAssigned = assignments[a.id] ? 1 : 0;
                  const bAssigned = assignments[b.id] ? 1 : 0;
                  if (aAssigned !== bAssigned) return aAssigned - bAssigned;
                  return a.name.localeCompare(b.name);
                })
                .map((guest) => {
                const currentTableId = assignments[guest.id];
                const currentTable = tables.find(t => t.id === currentTableId);
                const disabled = !canAssignGuestToTable(guest, activeTableId) && currentTableId !== activeTableId;
                
                return (
                  <div key={guest.id} className="flex items-center justify-between p-3 rounded-xl border border-[#efe3d4] bg-[#fcf8f3]">
                    <div>
                      <p className="font-medium text-[#2f2a24]">
                        {guest.name}
                        {guest.category && guest.category !== "Uncategorized" && (
                          <span className={`ml-2 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase ${getCategoryColor(guest.category)}`}>
                            {guest.category}
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-[#8a7a6a] mt-1">
                        Party size: {guest.partySize} 
                        {currentTable ? ` • Currently on ${currentTable.label}` : " • Unassigned"}
                      </p>
                    </div>
                    {currentTableId === activeTableId ? (
                      <span className="text-xs font-medium text-[#b08d57] px-2">Already here</span>
                    ) : (
                      <Button
                        type="button"
                        variant={disabled ? "outline" : "default"}
                        disabled={disabled}
                        onClick={() => {
                          handleAssignGuest(guest.id, activeTableId);
                          setAssignModalOpen(false);
                          setActiveTableId(null);
                        }}
                        className="h-auto py-2 px-4 text-xs cursor-pointer"
                      >
                        {disabled ? "Not enough seats" : "Assign"}
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setAssignModalOpen(false);
                  setActiveTableId(null);
                  setSearchQuery("");
                }}
                className="cursor-pointer px-6 h-auto py-2"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}