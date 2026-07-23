"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type BudgetItem = {
  _id: string;
  name: string;
  price: number;
};

type BudgetCategory = {
  _id: string;
  name: string;
  items: BudgetItem[];
};

type BudgetResponse = {
  success: boolean;
  budget?: {
    targetBudget: number;
    categories: BudgetCategory[];
  };
  message?: string;
};

export default function BudgetPage() {
  const [targetBudget, setTargetBudget] = useState(0);
  const [categories, setCategories] = useState<BudgetCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [editingTarget, setEditingTarget] = useState(false);
  const [targetInput, setTargetInput] = useState("0");

  const [newCategory, setNewCategory] = useState("");
  const [itemForms, setItemForms] = useState<
    Record<string, { name: string; price: string }>
  >({});

  const fetchBudget = async () => {
    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("/api/budget", { cache: "no-store" });
      const data: BudgetResponse = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to load budget");
      }

      setTargetBudget(data.budget?.targetBudget || 0);
      setTargetInput(String(data.budget?.targetBudget || 0));
      setCategories(data.budget?.categories || []);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load budget.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudget();
  }, []);

  const spentAmount = useMemo(() => {
    return categories.reduce((categoryTotal, category) => {
      return (
        categoryTotal +
        category.items.reduce((itemTotal, item) => itemTotal + Number(item.price || 0), 0)
      );
    }, 0);
  }, [categories]);

  const remainingAmount = useMemo(() => {
    return targetBudget - spentAmount;
  }, [targetBudget, spentAmount]);

  const getCategoryTotal = (category: BudgetCategory) => {
    return category.items.reduce((sum, item) => sum + Number(item.price || 0), 0);
  };

  const updateTargetBudget = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/budget", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          targetBudget: Number(targetInput) || 0,
        }),
      });

      const data: BudgetResponse = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update target budget");
      }

      setTargetBudget(Number(targetInput) || 0);
      setEditingTarget(false);
      setMessage("Target budget updated successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Failed to update target budget.");
    }
  };

  const addCategory = async (e: FormEvent) => {
    e.preventDefault();

    if (!newCategory.trim()) return;

    try {
      const res = await fetch("/api/budget/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newCategory.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to add category");
      }

      setNewCategory("");
      setMessage("Category added successfully.");
      await fetchBudget();
    } catch (error) {
      console.error(error);
      setMessage("Failed to add category.");
    }
  };

  const addItem = async (categoryId: string, e: FormEvent) => {
    e.preventDefault();

    const form = itemForms[categoryId] || { name: "", price: "" };

    if (!form.name.trim() || !form.price.trim()) return;

    try {
      const res = await fetch(`/api/budget/category/${categoryId}/item`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          price: Number(form.price) || 0,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to add item");
      }

      setItemForms((prev) => ({
        ...prev,
        [categoryId]: { name: "", price: "" },
      }));

      setMessage("Item added successfully.");
      await fetchBudget();
    } catch (error) {
      console.error(error);
      setMessage("Failed to add item.");
    }
  };

  return (
    <div className="space-y-8">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <BudgetCard
          label="Target Budget"
          value={targetBudget}
          tone="neutral"
        />
        <BudgetCard
          label="Spent Amount"
          value={spentAmount}
          tone="rose"
        />
        <BudgetCard
          label="Remaining Amount"
          value={remainingAmount}
          tone="green"
        />
      </section>

      <section className="rounded-[1.75rem] border border-[#eadfce] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#b08d57]">
              Budget Settings
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-[#2f2a24]">
              Manage your wedding budget
            </h2>
          </div>

          {!editingTarget ? (
            <button
              type="button"
              onClick={() => setEditingTarget(true)}
              className="cursor-pointer rounded-full bg-[#b08d57] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#9a7847]"
            >
              Change Target Budget
            </button>
          ) : null}
        </div>

        {editingTarget ? (
          <form
            onSubmit={updateTargetBudget}
            className="mt-6 flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="number"
              min={0}
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              className="w-full rounded-2xl border border-[#e7d9c8] bg-[#fffdfa] px-4 py-3 text-sm text-[#2f2a24] outline-none transition focus:border-[#b08d57]"
              placeholder="Enter target budget"
            />
            <button
              type="submit"
              className="cursor-pointer rounded-full bg-[#b08d57] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#9a7847]"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setEditingTarget(false);
                setTargetInput(String(targetBudget));
              }}
              className="cursor-pointer rounded-full border border-[#dbc7ae] bg-white px-5 py-3 text-sm font-medium text-[#6f5f51] transition hover:border-[#b08d57] hover:text-[#b08d57]"
            >
              Cancel
            </button>
          </form>
        ) : null}
      </section>

      <section className="rounded-[1.75rem] border border-[#eadfce] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#b08d57]">
              Categories
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-[#2f2a24]">
              Add categories and items
            </h3>
          </div>
        </div>

        <form onSubmit={addCategory} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Add category name"
            className="w-full rounded-2xl border border-[#e7d9c8] bg-[#fffdfa] px-4 py-3 text-sm text-[#2f2a24] outline-none transition focus:border-[#b08d57]"
          />
          <button
            type="submit"
            className="cursor-pointer rounded-full bg-[#b08d57] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#9a7847]"
          >
            Add Category
          </button>
        </form>

        {message ? (
          <p className="mt-4 text-sm text-[#7a6755]">{message}</p>
        ) : null}

        {loading ? (
          <p className="mt-8 text-sm text-[#8a7a6a]">Loading budget data...</p>
        ) : categories.length === 0 ? (
          <p className="mt-8 text-sm text-[#8a7a6a]">
            No categories added yet.
          </p>
        ) : (
          <div className="mt-8 space-y-6">
            {categories.map((category) => (
              <div
                key={category._id}
                className="rounded-[1.5rem] border border-[#efe3d4] bg-[#fffdfa] p-5"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h4 className="text-xl font-semibold text-[#2f2a24]">
                      {category.name}
                    </h4>
                    <p className="mt-1 text-sm text-[#8a7a6a]">
                      Total: Rs. {getCategoryTotal(category).toLocaleString()}
                    </p>
                  </div>
                </div>

                <form
                  onSubmit={(e) => addItem(category._id, e)}
                  className="mt-5 grid gap-3 md:grid-cols-[1fr_180px_auto]"
                >
                  <input
                    type="text"
                    placeholder="Item name"
                    value={itemForms[category._id]?.name || ""}
                    onChange={(e) =>
                      setItemForms((prev) => ({
                        ...prev,
                        [category._id]: {
                          ...prev[category._id],
                          name: e.target.value,
                          price: prev[category._id]?.price || "",
                        },
                      }))
                    }
                    className="rounded-2xl border border-[#e7d9c8] bg-white px-4 py-3 text-sm text-[#2f2a24] outline-none transition focus:border-[#b08d57]"
                  />

                  <input
                    type="number"
                    min={0}
                    step="0.01"
                    placeholder="Price"
                    value={itemForms[category._id]?.price || ""}
                    onChange={(e) =>
                      setItemForms((prev) => ({
                        ...prev,
                        [category._id]: {
                          ...prev[category._id],
                          name: prev[category._id]?.name || "",
                          price: e.target.value,
                        },
                      }))
                    }
                    className="rounded-2xl border border-[#e7d9c8] bg-white px-4 py-3 text-sm text-[#2f2a24] outline-none transition focus:border-[#b08d57]"
                  />

                  <button
                    type="submit"
                    className="cursor-pointer rounded-full bg-[#b08d57] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#9a7847]"
                  >
                    Add Item
                  </button>
                </form>

                <div className="mt-5 overflow-hidden rounded-[1.25rem] border border-[#efe3d4]">
                  <table className="min-w-full border-collapse">
                    <thead className="bg-[#fcf7f0]">
                      <tr className="text-left">
                        <th className="px-4 py-3 text-sm font-medium text-[#77685a]">
                          Item
                        </th>
                        <th className="px-4 py-3 text-sm font-medium text-[#77685a]">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.items.length === 0 ? (
                        <tr>
                          <td
                            colSpan={2}
                            className="px-4 py-6 text-sm text-[#8a7a6a]"
                          >
                            No items added yet.
                          </td>
                        </tr>
                      ) : (
                        category.items.map((item) => (
                          <tr key={item._id} className="border-t border-[#f1e7da]">
                            <td className="px-4 py-3 text-sm text-[#2f2a24]">
                              {item.name}
                            </td>
                            <td className="px-4 py-3 text-sm text-[#5f5246]">
                              Rs. {Number(item.price).toLocaleString()}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function BudgetCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "neutral" | "green" | "rose";
}) {
  const toneStyles = {
    neutral: "from-[#f5ede3] to-[#fffdf9] text-[#2f2a24]",
    green: "from-[#e8f4ea] to-[#f9fffa] text-[#2d7a46]",
    rose: "from-[#f8e8e8] to-[#fffafb] text-[#b45252]",
  };

  return (
    <div
      className={`rounded-[1.75rem] border border-[#eadfce] bg-gradient-to-br ${toneStyles[tone]} p-6 shadow-sm`}
    >
      <p className="text-sm font-medium text-[#8a7a6a]">{label}</p>
      <p className="mt-4 text-4xl font-semibold">
        Rs. {value.toLocaleString()}
      </p>
    </div>
  );
}