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
  existingCategories?: string[];
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
  existingCategories = [],
}: EditGuestModalProps) {
  const [form, setForm] = useState({
    name: "",
    partySize: 1,
    side: "bride" as "bride" | "groom" | "both",
    englishGreeting: "None",
    sinhalaGreeting: "None",
    englishTitle1: "Mr.",
    englishName1: "",
    showSecondName: false,
    englishTitle2: "Mrs.",
    englishName2: "",
    sinhalaName1: "",
    sinhalaTitle1: "මහතා",
    showSecondSinhalaName: false,
    sinhalaName2: "",
    sinhalaTitle2: "මිය",
    category: "Uncategorized",
  });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [isNewCategory, setIsNewCategory] = useState(false);

  useEffect(() => {
    if (guest) {
      let title1 = "Mr.";
      let name1 = "";
      let showSecond = false;
      let title2 = "Mrs.";
      let name2 = "";

      if (guest.englishName) {
        const parts = guest.englishName.split("&").map((s) => s.trim());
        if (parts.length > 0 && parts[0]) {
          const p1 = parts[0];
          const match1 = p1.match(/^(Mr\.|Mrs\.|Miss|Ms\.)\s+(.*)/i);
          if (match1) {
            title1 = match1[1].charAt(0).toUpperCase() + match1[1].slice(1).toLowerCase();
            name1 = match1[2].trim();
          } else {
            name1 = p1;
          }
        }

        if (parts.length > 1 && parts[1]) {
          showSecond = true;
          const p2 = parts[1];
          if (p2.toLowerCase() === "family") {
            title2 = "Family";
          } else {
            const match2 = p2.match(/^(Mr\.|Mrs\.|Miss|Ms\.)\s+(.*)/i);
            if (match2) {
              title2 = match2[1].charAt(0).toUpperCase() + match2[1].slice(1).toLowerCase();
              name2 = match2[2].trim();
            } else {
              name2 = p2;
            }
          }
        }
      }

      let sTitle1 = "මහතා";
      let sName1 = "";
      let sShowSecond = false;
      let sTitle2 = "මිය";
      let sName2 = "";

      if (guest.sinhalaName) {
        const parts = guest.sinhalaName.split("සහ").map((s) => s.trim());
        if (parts.length > 0 && parts[0]) {
          const p1 = parts[0];
          const titleMatch = p1.match(/(මයා|මිය|මෙනවිය|මහතා|යුවළ)$/);
          if (titleMatch) {
            sTitle1 = titleMatch[1];
            sName1 = p1.replace(titleMatch[1], "").trim();
          } else {
            sName1 = p1;
          }
        }
        
        if (parts.length > 1 && parts[1]) {
          sShowSecond = true;
          const p2 = parts[1];
          if (p2 === "යුවළ") {
            sTitle2 = "යුවළ";
          } else {
            const titleMatch = p2.match(/(මයා|මිය|මෙනවිය|මහතා|යුවළ)$/);
            if (titleMatch) {
              sTitle2 = titleMatch[1];
              sName2 = p2.replace(titleMatch[1], "").trim();
            } else {
              sName2 = p2;
            }
          }
        }
      }

      setForm({
        name: guest.name,
        partySize: guest.partySize || 1,
        side: guest.side || "bride",
        englishGreeting: guest.englishGreeting || "None",
        sinhalaGreeting: guest.sinhalaGreeting || "None",
        englishTitle1: title1,
        englishName1: name1,
        showSecondName: showSecond,
        englishTitle2: title2,
        englishName2: name2,
        sinhalaName1: sName1,
        sinhalaTitle1: sTitle1,
        showSecondSinhalaName: sShowSecond,
        sinhalaName2: sName2,
        sinhalaTitle2: sTitle2,
        category: guest.category || "Uncategorized",
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
      let constructedEnglishName = "";
      if (form.englishName1) {
        constructedEnglishName = `${form.englishTitle1} ${form.englishName1}`.trim();
        if (form.showSecondName) {
          if (form.englishTitle2 === "Family") {
            constructedEnglishName += " & Family";
          } else if (form.englishName2) {
            constructedEnglishName += ` & ${form.englishTitle2} ${form.englishName2.trim()}`;
          }
        }
      }

      let constructedSinhalaName = "";
      if (form.sinhalaName1) {
        constructedSinhalaName = `${form.sinhalaName1.trim()} ${form.sinhalaTitle1}`;
        if (form.showSecondSinhalaName) {
          if (form.sinhalaTitle2 === "යුවළ") {
            constructedSinhalaName += " සහ යුවළ";
          } else if (form.sinhalaName2) {
            constructedSinhalaName += ` සහ ${form.sinhalaName2.trim()} ${form.sinhalaTitle2}`;
          }
        }
      }

      const payload = {
        name,
        partySize,
        side: form.side,
        englishGreeting: form.englishGreeting,
        sinhalaGreeting: form.sinhalaGreeting,
        englishName: constructedEnglishName.replace(/([^\s])&/g, '$1 &').replace(/&([^\s])/g, '& $1'),
        sinhalaName: constructedSinhalaName.replace(/([^\s])සහ/g, '$1 සහ').replace(/සහ([^\s])/g, 'සහ $1'),
        category: form.category,
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
      <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-[2rem] border border-[#eadfce] bg-white p-6 shadow-2xl">
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
              Reference Name (For dashboard)
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
            <label className="mb-2 block text-sm font-medium text-[#5f5246]">
              English Display Name (Optional)
            </label>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2 items-center">
                <select
                  value={form.englishTitle1}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, englishTitle1: e.target.value }))
                  }
                  className="cursor-pointer rounded-2xl border border-[#e7d9c8] bg-[#fffdfa] px-4 py-3 text-sm text-[#2f2a24] outline-none transition focus:border-[#b08d57] w-24"
                >
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Miss">Miss</option>
                  <option value="Ms.">Ms.</option>
                </select>
                <input
                  type="text"
                  value={form.englishName1}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, englishName1: e.target.value }))
                  }
                  placeholder="First Name"
                  className="flex-1 rounded-2xl border border-[#e7d9c8] bg-[#fffdfa] px-4 py-3 text-sm text-[#2f2a24] outline-none transition focus:border-[#b08d57]"
                />
              </div>

              {!form.showSecondName ? (
                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({ ...prev, showSecondName: true }))
                  }
                  className="cursor-pointer text-sm text-[#b08d57] font-medium text-left hover:underline w-fit"
                >
                  + Add another name
                </button>
              ) : (
                <div className="flex gap-2 items-center">
                  <select
                    value={form.englishTitle2}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, englishTitle2: e.target.value }))
                    }
                    className="cursor-pointer rounded-2xl border border-[#e7d9c8] bg-[#fffdfa] px-4 py-3 text-sm text-[#2f2a24] outline-none transition focus:border-[#b08d57] w-28"
                  >
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Miss">Miss</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Family">Family</option>
                  </select>
                  {form.englishTitle2 !== "Family" && (
                    <input
                      type="text"
                      value={form.englishName2}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, englishName2: e.target.value }))
                      }
                      placeholder="Second Name"
                      className="flex-1 rounded-2xl border border-[#e7d9c8] bg-[#fffdfa] px-4 py-3 text-sm text-[#2f2a24] outline-none transition focus:border-[#b08d57]"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        showSecondName: false,
                        englishName2: "",
                        englishTitle2: "Mrs.",
                      }))
                    }
                    className="cursor-pointer text-sm text-red-500 hover:underline px-2"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#5f5246]">
              Sinhala Display Name (Optional)
            </label>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={form.sinhalaName1}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, sinhalaName1: e.target.value }))
                  }
                  placeholder="First Name"
                  className="flex-1 rounded-2xl border border-[#e7d9c8] bg-[#fffdfa] px-4 py-3 text-sm text-[#2f2a24] outline-none transition focus:border-[#b08d57]"
                />
                <select
                  value={form.sinhalaTitle1}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, sinhalaTitle1: e.target.value }))
                  }
                  className="cursor-pointer rounded-2xl border border-[#e7d9c8] bg-[#fffdfa] px-4 py-3 text-sm text-[#2f2a24] outline-none transition focus:border-[#b08d57] w-28"
                >
                  <option value="මහතා">මහතා</option>
                  <option value="මයා">මයා</option>
                  <option value="මිය">මිය</option>
                  <option value="මෙනවිය">මෙනවිය</option>
                  <option value="යුවළ">යුවළ</option>
                </select>
              </div>

              {!form.showSecondSinhalaName ? (
                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({ ...prev, showSecondSinhalaName: true }))
                  }
                  className="cursor-pointer text-sm text-[#b08d57] font-medium text-left hover:underline w-fit"
                >
                  + Add another name
                </button>
              ) : (
                <div className="flex gap-2 items-center">
                  <span className="text-[#5f5246] text-sm">සහ</span>
                  {form.sinhalaTitle2 !== "යුවළ" && (
                    <input
                      type="text"
                      value={form.sinhalaName2}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, sinhalaName2: e.target.value }))
                      }
                      placeholder="Second Name"
                      className="flex-1 rounded-2xl border border-[#e7d9c8] bg-[#fffdfa] px-4 py-3 text-sm text-[#2f2a24] outline-none transition focus:border-[#b08d57]"
                    />
                  )}
                  <select
                    value={form.sinhalaTitle2}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, sinhalaTitle2: e.target.value }))
                    }
                    className="cursor-pointer rounded-2xl border border-[#e7d9c8] bg-[#fffdfa] px-4 py-3 text-sm text-[#2f2a24] outline-none transition focus:border-[#b08d57] w-28"
                  >
                    <option value="මහතා">මහතා</option>
                    <option value="මයා">මයා</option>
                    <option value="මිය">මිය</option>
                    <option value="මෙනවිය">මෙනවිය</option>
                    <option value="යුවළ">යුවළ</option>
                  </select>
                  <button
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        showSecondSinhalaName: false,
                        sinhalaName2: "",
                        sinhalaTitle2: "මිය",
                      }))
                    }
                    className="cursor-pointer text-sm text-red-500 hover:underline px-2"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="edit-category"
              className="mb-2 block text-sm font-medium text-[#5f5246]"
            >
              Category (e.g., Family, Friends)
            </label>
            {!isNewCategory ? (
              <select
                id="edit-category"
                value={existingCategories.includes(form.category) ? form.category : "new_custom_category"}
                onChange={(e) => {
                  if (e.target.value === "new_custom_category") {
                    setIsNewCategory(true);
                    setForm((prev) => ({ ...prev, category: "" }));
                  } else {
                    setForm((prev) => ({ ...prev, category: e.target.value }));
                  }
                }}
                className="cursor-pointer w-full rounded-2xl border border-[#e7d9c8] bg-[#fffdfa] px-4 py-3 text-sm text-[#2f2a24] outline-none transition focus:border-[#b08d57]"
              >
                {existingCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
                <option value="new_custom_category" className="font-semibold text-[#b08d57]">
                  + Add New Category
                </option>
              </select>
            ) : (
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={form.category}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, category: e.target.value }))
                  }
                  placeholder="Enter new category"
                  className="flex-1 rounded-2xl border border-[#e7d9c8] bg-[#fffdfa] px-4 py-3 text-sm text-[#2f2a24] outline-none transition focus:border-[#b08d57]"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => {
                    setIsNewCategory(false);
                    setForm((prev) => ({
                      ...prev,
                      category: existingCategories[0] || "Uncategorized",
                    }));
                  }}
                  className="cursor-pointer text-sm text-red-500 hover:underline px-2"
                >
                  Cancel
                </button>
              </div>
            )}
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
              className="cursor-pointer w-full rounded-2xl border border-[#e7d9c8] bg-[#fffdfa] px-4 py-3 text-sm text-[#2f2a24] outline-none transition focus:border-[#b08d57]"
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



          <div>
            <label
              htmlFor="edit-sinhalaGreeting"
              className="mb-2 block text-sm font-medium text-[#5f5246]"
            >
              Sinhala Greeting
            </label>
            <select
              id="edit-sinhalaGreeting"
              value={form.sinhalaGreeting}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  sinhalaGreeting: e.target.value,
                }))
              }
              className="cursor-pointer w-full rounded-2xl border border-[#e7d9c8] bg-[#fffdfa] px-4 py-3 text-sm text-[#2f2a24] outline-none transition focus:border-[#b08d57]"
              required
            >
              <option value="None">None</option>
              <option value="ඔබට">ඔබට</option>
              <option value="ඔබ දෙපලට">ඔබ දෙපලට</option>
              <option value="ඇතුළු පවුලේ සැමට">ඇතුළු පවුලේ සැමට</option>
            </select>
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
