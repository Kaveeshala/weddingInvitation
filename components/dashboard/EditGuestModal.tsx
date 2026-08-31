"use client";

import { FormEvent, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Guest } from "./GuestListTable";

type EditGuestModalProps = {
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

export default function EditGuestModal({
  open,
  guest,
  onClose,
  onGuestUpdated,
  onSuccessMessage,
  onErrorMessage,
}: EditGuestModalProps) {
  const [form, setForm] = useState({
    name: "",
    partySize: 1,
    side: "bride" as "bride" | "groom" | "both",
  });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (guest) {
      setForm({
        name: guest.name,
        partySize: guest.partySize || 1,
        side: guest.side || "bride",
      });
    }
  }, [guest]);

  if (!open || !guest) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);

    const name = form.name.trim();
    const partySize = Number(form.partySize);

    if (!name || !form.side || !partySize || partySize < 1) {
      setFormError("Please fill all fields correctly.");
      setSubmitting(false);
      return;
    }

    try {
      const payload = {
        name,
        partySize,
        side: form.side,
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
        throw new Error(data.message || "Failed to update guest");
      }

      onSuccessMessage?.("Guest updated successfully.");
      await onGuestUpdated?.();
      onClose();
    } catch (error) {
      console.error(error);
      onErrorMessage?.("Failed to update guest.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/35 px-4">
      <div className="w-full max-w-xl rounded-[2rem] border border-[#eadfce] bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#b08d57]">
              Edit Guest
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-[#2f2a24]">
              Update guest details
            </h3>
          </div>

          <Button type="button" variant="outline" onClick={onClose} className="cursor-pointer px-5 py-3 h-auto">
            Close
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="edit-name"
              className="mb-2 block text-sm font-medium text-[#5f5246]"
            >
              Guest name
            </label>
            <input
              id="edit-name"
              type="text"
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Mr & Mrs Fernando"
              className="w-full rounded-2xl border border-[#e7d9c8] bg-[#fffdfa] px-4 py-3 text-sm text-[#2f2a24] outline-none transition focus:border-[#b08d57]"
              required
            />
          </div>

          <div>
            <label
              htmlFor="edit-side"
              className="mb-2 block text-sm font-medium text-[#5f5246]"
            >
              Guest side
            </label>
            <select
              id="edit-side"
              value={form.side}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  side: e.target.value as "bride" | "groom" | "both",
                }))
              }
              className="w-full rounded-2xl border border-[#e7d9c8] bg-[#fffdfa] px-4 py-3 text-sm text-[#2f2a24] outline-none transition focus:border-[#b08d57]"
              required
            >
              <option value="bride">Bride Side</option>
              <option value="groom">Groom Side</option>
              <option value="both">Both Sides</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="edit-partySize"
              className="mb-2 block text-sm font-medium text-[#5f5246]"
            >
              Party size
            </label>
            <input
              id="edit-partySize"
              type="number"
              min={1}
              value={form.partySize}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  partySize: Number(e.target.value) || 1,
                }))
              }
              className="w-full rounded-2xl border border-[#e7d9c8] bg-[#fffdfa] px-4 py-3 text-sm text-[#2f2a24] outline-none transition focus:border-[#b08d57]"
              required
            />
          </div>

          {formError ? (
            <p className="text-sm text-red-600">{formError}</p>
          ) : null}

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="cursor-pointer px-5 py-3 h-auto">
              Cancel
            </Button>

            <Button type="submit" disabled={submitting} className="cursor-pointer px-5 py-3 h-auto">
              {submitting ? "Updating..." : "Update Guest"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
