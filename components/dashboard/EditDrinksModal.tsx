"use client";

import { FormEvent, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Guest } from "./GuestListTable";

type EditDrinksModalProps = {
  open: boolean;
  guest: Guest | null;
  onClose: () => void;
  onGuestUpdated?: () => Promise<void> | void;
  onSuccessMessage?: (message: string) => void;
  onErrorMessage?: (message: string) => void;
};

type UpdateGuestResponse = {
  success: boolean;
  message?: string;
};

export default function EditDrinksModal({
  open,
  guest,
  onClose,
  onGuestUpdated,
  onSuccessMessage,
  onErrorMessage,
}: EditDrinksModalProps) {
  const [liquorCount, setLiquorCount] = useState(0);
  const [beerCount, setBeerCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (guest) {
      setLiquorCount(guest.liquorCount || 0);
      setBeerCount(guest.beerCount || 0);
    }
  }, [guest]);

  if (!open || !guest) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);

    if (liquorCount < 0 || beerCount < 0) {
      setFormError("Counts cannot be negative.");
      setSubmitting(false);
      return;
    }

    try {
      const payload = {
        liquorCount,
        beerCount,
      };

      const res = await fetch(`/api/guest/${guest._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data: UpdateGuestResponse = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update drinks count");
      }

      onSuccessMessage?.("Drinks count updated successfully.");
      await onGuestUpdated?.();
      onClose();
    } catch (error) {
      console.error(error);
      onErrorMessage?.("Failed to update drinks count.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/35 px-4">
      <div className="w-full max-w-sm rounded-[2rem] border border-[#eadfce] bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#b08d57]">
              Drinks
            </p>
            <h3 className="mt-2 text-xl font-semibold text-[#2f2a24]">
              {guest.name}
            </h3>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="liquorCount"
              className="mb-2 block text-sm font-medium text-[#5f5246]"
            >
              Liquor Count
            </label>
            <input
              id="liquorCount"
              type="number"
              min={0}
              value={liquorCount}
              onChange={(e) => setLiquorCount(Number(e.target.value) || 0)}
              className="w-full rounded-2xl border border-[#e7d9c8] bg-[#fffdfa] px-4 py-3 text-sm text-[#2f2a24] outline-none transition focus:border-[#b08d57]"
            />
          </div>

          <div>
            <label
              htmlFor="beerCount"
              className="mb-2 block text-sm font-medium text-[#5f5246]"
            >
              Beer Count
            </label>
            <input
              id="beerCount"
              type="number"
              min={0}
              value={beerCount}
              onChange={(e) => setBeerCount(Number(e.target.value) || 0)}
              className="w-full rounded-2xl border border-[#e7d9c8] bg-[#fffdfa] px-4 py-3 text-sm text-[#2f2a24] outline-none transition focus:border-[#b08d57]"
            />
          </div>

          {formError ? (
            <p className="text-sm text-red-600">{formError}</p>
          ) : null}

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="cursor-pointer px-5 py-3 h-auto">
              Cancel
            </Button>

            <Button type="submit" disabled={submitting} className="cursor-pointer px-5 py-3 h-auto">
              {submitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
