"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";

type AddGuestModalProps = {
  open: boolean;
  onClose: () => void;
  onGuestAdded?: () => Promise<void> | void;
  onSuccessMessage?: (message: string) => void;
  onErrorMessage?: (message: string) => void;
};

type CreateGuestResponse = {
  success: boolean;
  message?: string;
};

const initialForm = {
  name: "",
  partySize: 1,
  side: "bride" as "bride" | "groom",
};

export default function AddGuestModal({
  open,
  onClose,
  onGuestAdded,
  onSuccessMessage,
  onErrorMessage,
}: AddGuestModalProps) {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  if (!open) return null;

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

      const res = await fetch("/api/guest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data: CreateGuestResponse = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to create guest");
      }

      setForm(initialForm);
      onSuccessMessage?.("Guest added successfully.");
      await onGuestAdded?.();
      onClose();
    } catch (error) {
      console.error(error);
      onErrorMessage?.("Failed to add guest.");
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
              Add Guest
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-[#2f2a24]">
              Create a new guest
            </h3>
          </div>

          <Button type="button" variant="outline" onClick={onClose} className="cursor-pointer">
            Close
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-[#5f5246]"
            >
              Guest name
            </label>
            <input
              id="name"
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
              htmlFor="side"
              className="mb-2 block text-sm font-medium text-[#5f5246]"
            >
              Guest side
            </label>
            <select
              id="side"
              value={form.side}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  side: e.target.value as "bride" | "groom",
                }))
              }
              className="w-full rounded-2xl border border-[#e7d9c8] bg-[#fffdfa] px-4 py-3 text-sm text-[#2f2a24] outline-none transition focus:border-[#b08d57]"
              required
            >
              <option value="bride">Bride Side</option>
              <option value="groom">Groom Side</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="partySize"
              className="mb-2 block text-sm font-medium text-[#5f5246]"
            >
              Party size
            </label>
            <input
              id="partySize"
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
            <Button type="button" variant="outline" onClick={onClose} className="cursor-pointer">
              Cancel
            </Button>

            <Button type="submit" disabled={submitting} className="cursor-pointer">
              {submitting ? "Adding..." : "Add Guest"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}