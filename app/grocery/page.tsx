"use client";

import { useState } from "react";
import BottomNav from "../components/BottomNav";
import AppShell from "../components/AppShell";

type Item = {
  id: number;
  name: string;
  qty: string;
  category: string;
  checked: boolean;
  addedBy: string;
  color: string;
};

const initialItems: Item[] = [
  { id: 1, name: "Olive Oil", qty: "1 bottle", category: "Pantry", checked: false, addedBy: "Z", color: "#C4714A" },
  { id: 2, name: "Eggs", qty: "12", category: "Dairy", checked: false, addedBy: "A", color: "#A85C38" },
  { id: 3, name: "Chicken Breast", qty: "500g", category: "Meat", checked: false, addedBy: "Z", color: "#C4714A" },
  { id: 4, name: "Cherry Tomatoes", qty: "1 punnet", category: "Produce", checked: true, addedBy: "M", color: "#D9A87C" },
  { id: 5, name: "Garlic", qty: "1 head", category: "Produce", checked: false, addedBy: "Z", color: "#C4714A" },
  { id: 6, name: "Pasta", qty: "500g", category: "Pantry", checked: true, addedBy: "A", color: "#A85C38" },
  { id: 7, name: "Parmesan", qty: "100g", category: "Dairy", checked: false, addedBy: "Z", color: "#C4714A" },
];

const categoryEmoji: Record<string, string> = {
  Pantry: "🫙",
  Dairy: "🥛",
  Meat: "🥩",
  Produce: "🥦",
};

export default function GroceryPage() {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [newItem, setNewItem] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const toggle = (id: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const addItem = () => {
    if (!newItem.trim()) return;
    setItems((prev) => [
      { id: Date.now(), name: newItem.trim(), qty: "1", category: "Pantry", checked: false, addedBy: "Z", color: "#C4714A" },
      ...prev,
    ]);
    setNewItem("");
    setShowAdd(false);
  };

  const unchecked = items.filter((i) => !i.checked);
  const checked = items.filter((i) => i.checked);
  const allDone = unchecked.length === 0;
  const progress = items.length > 0 ? (checked.length / items.length) * 100 : 0;

  return (
    <AppShell>
    <div className="flex flex-col flex-1 min-h-0 bg-[#F5ECD8]">
      {/* Header */}
      <div className="px-6 pt-14 pb-4 flex-shrink-0">
        <h1 className="text-[#3B2A1A] text-[26px] font-semibold leading-tight">Grocery List</h1>
        <p className="text-[#6B4C30] text-sm mt-0.5">
          {allDone ? "All done! Great shopping 🎉" : `${unchecked.length} item${unchecked.length !== 1 ? "s" : ""} left`}
        </p>
      </div>

      {/* Progress */}
      <div className="px-6 mb-5 flex-shrink-0">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-xs text-[#6B4C30]">{checked.length} of {items.length} checked off</p>
          <p className="text-xs font-semibold text-[#C4714A]">{Math.round(progress)}%</p>
        </div>
        <div className="h-2.5 bg-[#EDE0CC] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: allDone
                ? "linear-gradient(90deg, #4A8C5C, #6AB87C)"
                : "linear-gradient(90deg, #C4714A, #D9A87C)",
            }}
          />
        </div>
      </div>

      {/* All done celebration */}
      {allDone && (
        <div className="mx-6 mb-4 bg-[#D4E8D4] rounded-2xl p-4 border border-[#A8C4A8] flex items-center gap-3 pop-in">
          <span className="text-3xl">🎉</span>
          <div>
            <p className="text-[#2A5A2A] font-semibold text-sm">Shopping complete!</p>
            <p className="text-[#4A7A4A] text-xs">Everything&apos;s crossed off the list.</p>
          </div>
        </div>
      )}

      {/* Items list */}
      <div className="overflow-y-auto no-scrollbar pb-32 px-6 flex-1">
        <div className="space-y-2">
          {unchecked.map((item) => (
            <GroceryItem key={item.id} item={item} onToggle={toggle} />
          ))}
        </div>

        {checked.length > 0 && !allDone && (
          <div className="mt-5">
            <p className="text-xs text-[#C4A882] font-semibold uppercase tracking-wider mb-2">Done</p>
            <div className="space-y-2">
              {checked.map((item) => (
                <GroceryItem key={item.id} item={item} onToggle={toggle} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add item sheet */}
      {showAdd && (
        <div className="absolute inset-0 bg-black/30 z-40 flex items-end" onClick={() => setShowAdd(false)}>
          <div
            className="w-full bg-[#F5ECD8] rounded-t-3xl p-6 pb-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-[#C4A882] rounded-full mx-auto mb-5" />
            <h3 className="text-[#3B2A1A] font-semibold text-base mb-3">Add to list</h3>
            <input
              autoFocus
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addItem()}
              placeholder="e.g. Almond milk, 2 lemons..."
              className="w-full bg-white border border-[#C4A882] rounded-2xl px-4 py-3.5 text-[#3B2A1A] placeholder-[#C4A882] outline-none text-sm"
              style={{ boxShadow: "var(--shadow-card)" }}
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowAdd(false)}
                className="flex-1 py-3.5 rounded-2xl border border-[#C4A882] text-[#6B4C30] text-sm font-medium tappable"
              >
                Cancel
              </button>
              <button
                onClick={addItem}
                className="flex-1 py-3.5 rounded-2xl bg-[#C4714A] text-white text-sm font-semibold tappable"
              >
                Add item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FAB */}
      {!showAdd && (
        <button
          onClick={() => setShowAdd(true)}
          className="absolute bottom-24 right-5 w-14 h-14 bg-[#C4714A] rounded-full flex items-center justify-center text-white text-3xl font-light tappable z-30"
          style={{ boxShadow: "var(--shadow-lifted)" }}
        >
          +
        </button>
      )}

      <BottomNav />
    </div>
    </AppShell>
  );
}

function GroceryItem({ item, onToggle }: { item: Item; onToggle: (id: number) => void }) {
  return (
    <button
      onClick={() => onToggle(item.id)}
      className={`w-full flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 text-left tappable transition-opacity duration-300 ${item.checked ? "item-checked" : ""}`}
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {/* Checkbox */}
      <div
        className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
          item.checked ? "border-[#C4714A] bg-[#C4714A]" : "border-[#C4A882]"
        }`}
      >
        {item.checked && (
          <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
            <path d="M1 4.5L4 7.5L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>

      {/* Category emoji */}
      <span className="text-lg flex-shrink-0">{categoryEmoji[item.category] ?? "🛒"}</span>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium transition-all ${item.checked ? "line-through text-[#C4A882]" : "text-[#3B2A1A]"}`}>
          {item.name}
        </p>
        <p className="text-xs text-[#C4A882] mt-0.5">{item.qty}</p>
      </div>

      {/* Added by */}
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
        style={{ backgroundColor: item.color }}
      >
        {item.addedBy}
      </div>
    </button>
  );
}
