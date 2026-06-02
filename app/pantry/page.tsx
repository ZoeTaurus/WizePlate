"use client";

import { useState } from "react";
import BottomNav from "../components/BottomNav";
import AppShell from "../components/AppShell";

type PantryItem = {
  id: number;
  name: string;
  emoji: string;
  quantity: string;
  status: "plenty" | "low" | "out";
  category: "Fridge" | "Pantry";
};

const statusConfig = {
  plenty: { label: "Plenty", dot: "#4A8C5C", bar: "#6AB87C", fill: 80 },
  low:    { label: "Low",    dot: "#B87A2A", bar: "#D9A84A", fill: 25 },
  out:    { label: "Out",    dot: "#A84040", bar: "#D97A7A", fill: 0  },
};

const emojiOptions = ["🥚","🥛","🧈","🧄","🍅","🥕","🧅","🥦","🍋","🍎","🫙","🧃","🥩","🍞","🧀","🍝","🍚","🫒"];

export default function PantryPage() {
  const [items, setItems] = useState<PantryItem[]>([]);
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [activeCategory, setActiveCategory] = useState<"All" | "Fridge" | "Pantry">("All");
  const [showAdd, setShowAdd] = useState(false);

  // Add item form state
  const [newName, setNewName]       = useState("");
  const [newQty, setNewQty]         = useState("");
  const [newEmoji, setNewEmoji]     = useState("🥚");
  const [newCategory, setNewCategory] = useState<"Fridge" | "Pantry">("Fridge");
  const [newStatus, setNewStatus]   = useState<"plenty" | "low" | "out">("plenty");

  const categories: ("All" | "Fridge" | "Pantry")[] = ["All", "Fridge", "Pantry"];
  const filtered = items.filter((i) => activeCategory === "All" || i.category === activeCategory);
  const outItems = items.filter((i) => i.status === "out");
  const lowItems = items.filter((i) => i.status === "low");

  const simulateScan = () => {
    setScanning(true);
    // Simulate adding a few items after scan
    setTimeout(() => {
      const scannedItems: PantryItem[] = [
        { id: Date.now() + 1, name: "Eggs",      emoji: "🥚", quantity: "6 left",   status: "low",    category: "Fridge" },
        { id: Date.now() + 2, name: "Milk",       emoji: "🥛", quantity: "Full",     status: "plenty", category: "Fridge" },
        { id: Date.now() + 3, name: "Butter",     emoji: "🧈", quantity: "Half",     status: "plenty", category: "Fridge" },
        { id: Date.now() + 4, name: "Olive Oil",  emoji: "🫒", quantity: "Low",      status: "low",    category: "Pantry" },
        { id: Date.now() + 5, name: "Rice",       emoji: "🍚", quantity: "Out",      status: "out",    category: "Pantry" },
      ];
      setItems((prev) => {
        const existingNames = new Set(prev.map((i) => i.name));
        return [...prev, ...scannedItems.filter((i) => !existingNames.has(i.name))];
      });
      setScanning(false);
      setScanned(true);
    }, 3000);
  };

  const addItem = () => {
    if (!newName.trim()) return;
    setItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newName.trim(),
        emoji: newEmoji,
        quantity: newQty || "1",
        status: newStatus,
        category: newCategory,
      },
    ]);
    setNewName(""); setNewQty(""); setNewEmoji("🥚"); setNewStatus("plenty");
    setShowAdd(false);
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <AppShell>
    <div className="flex flex-col flex-1 min-h-0 bg-[#F5ECD8]">

      {/* Header */}
      <div className="px-6 pt-14 pb-4 flex-shrink-0">
        <h1 className="text-[#3B2A1A] text-[26px] font-semibold leading-tight">Pantry & Fridge</h1>
        <p className="text-[#6B4C30] text-sm mt-0.5">
          {items.length === 0 ? "Nothing tracked yet" : `${items.length} item${items.length !== 1 ? "s" : ""} tracked`}
        </p>
      </div>

      {/* Scan zone */}
      <div className="px-6 mb-4 flex-shrink-0">
        <button
          onClick={simulateScan}
          disabled={scanning}
          className="w-full rounded-3xl overflow-hidden relative tappable"
          style={{
            background: scanning ? "#1A1A1A" : "linear-gradient(135deg, #2A2A2A, #3B2A1A)",
            height: "140px",
            boxShadow: "var(--shadow-lifted)",
          }}
        >
          {/* Corner brackets */}
          {(["top-3 left-3","top-3 right-3","bottom-3 left-3","bottom-3 right-3"] as const).map((pos, i) => (
            <div key={i} className={`absolute ${pos} w-6 h-6`}>
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d={i===0?"M0 12 L0 0 L12 0":i===1?"M24 12 L24 0 L12 0":i===2?"M0 12 L0 24 L12 24":"M24 12 L24 24 L12 24"}
                  stroke="#C4714A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
            </div>
          ))}
          {scanning ? (
            <>
              <div className="absolute left-0 right-0 h-0.5 scan-line"
                   style={{ background: "linear-gradient(90deg, transparent, #C4714A, transparent)", zIndex: 10 }} />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-20">
                <div className="w-6 h-6 border-2 border-[#C4714A] border-t-transparent rounded-full animate-spin" />
                <p className="text-white/80 text-xs font-medium">Identifying items...</p>
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
              <span className="text-4xl">{scanned ? "🔄" : "📷"}</span>
              <p className="text-white font-semibold text-sm mt-1">
                {scanned ? "Scan again" : "Scan fridge or pantry"}
              </p>
              <p className="text-white/50 text-xs">AI identifies what you have</p>
            </div>
          )}
        </button>
      </div>

      {/* Alerts */}
      {(outItems.length > 0 || lowItems.length > 0) && (
        <div className="mx-6 mb-3 flex-shrink-0 space-y-2">
          {outItems.length > 0 && (
            <div className="bg-[#F0CECE] rounded-2xl px-4 py-3 border border-[#D49090]">
              <p className="text-[#7A1010] font-semibold text-xs mb-2">Out of stock</p>
              <div className="flex flex-wrap gap-1.5">
                {outItems.map((item) => (
                  <span key={item.id} className="flex items-center gap-1 bg-white/70 rounded-full px-2.5 py-1 text-xs font-medium text-[#3B2A1A]">
                    {item.emoji} {item.name}
                    <span className="text-[#C4714A] ml-0.5 font-bold">+</span>
                  </span>
                ))}
              </div>
            </div>
          )}
          {lowItems.length > 0 && (
            <div className="bg-[#F0DDB8] rounded-2xl px-4 py-3 border border-[#D4A84A]">
              <p className="text-[#7A4A10] font-semibold text-xs mb-2">Running low</p>
              <div className="flex flex-wrap gap-1.5">
                {lowItems.map((item) => (
                  <span key={item.id} className="flex items-center gap-1 bg-white/70 rounded-full px-2.5 py-1 text-xs font-medium text-[#3B2A1A]">
                    {item.emoji} {item.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Category filter */}
      <div className="flex gap-2 px-6 mb-3 flex-shrink-0">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all tappable ${
              activeCategory === cat ? "bg-[#C4714A] text-white" : "bg-white text-[#6B4C30] border border-[#C4A882]"
            }`}
            style={activeCategory !== cat ? { boxShadow: "var(--shadow-card)" } : {}}>
            {cat}
          </button>
        ))}
        {/* Add manual button */}
        <button onClick={() => setShowAdd(true)}
          className="ml-auto px-3 py-1.5 rounded-full text-xs font-medium bg-[#C4714A] text-white tappable flex items-center gap-1">
          + Add
        </button>
      </div>

      {/* Empty state */}
      {items.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center px-8 pb-28 text-center">
          <span className="text-6xl mb-4 opacity-40">🧺</span>
          <p className="text-[#3B2A1A] font-semibold text-base">Your pantry is empty</p>
          <p className="text-[#6B4C30] text-sm mt-1 leading-relaxed">
            Scan your fridge or pantry above, or tap <strong>+ Add</strong> to track items manually.
          </p>
        </div>
      )}

      {/* Items list */}
      {items.length > 0 && (
        <div className="overflow-y-auto no-scrollbar pb-28 px-6 flex-1 space-y-2">
          {filtered.map((item) => {
            const s = statusConfig[item.status];
            return (
              <div key={item.id} className="bg-white rounded-2xl px-4 py-3.5 tappable"
                   style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F5ECD8] flex items-center justify-center text-xl flex-shrink-0">
                    {item.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[#3B2A1A] font-medium text-sm">{item.name}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.dot }} />
                          <span className="text-[10px] font-medium" style={{ color: s.dot }}>{s.label}</span>
                        </div>
                        <button onClick={() => removeItem(item.id)}
                                className="text-[#C4A882] text-xs hover:text-[#A84040] tappable">✕</button>
                      </div>
                    </div>
                    <div className="h-1.5 bg-[#EDE0CC] rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500"
                           style={{ width: `${s.fill}%`, backgroundColor: s.bar }} />
                    </div>
                    <p className="text-[10px] text-[#C4A882] mt-1">{item.quantity} · {item.category}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add item sheet */}
      {showAdd && (
        <div className="absolute inset-0 bg-black/30 z-40 flex items-end" onClick={() => setShowAdd(false)}>
          <div className="w-full bg-[#F5ECD8] rounded-t-3xl p-6 pb-10 space-y-4"
               onClick={(e) => e.stopPropagation()}>
            <div className="w-10 h-1 bg-[#C4A882] rounded-full mx-auto" />
            <h3 className="text-[#3B2A1A] font-semibold text-base">Add pantry item</h3>

            {/* Emoji picker */}
            <div>
              <p className="text-xs text-[#6B4C30] font-semibold uppercase tracking-wider mb-2">Icon</p>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {emojiOptions.map((em) => (
                  <button key={em} onClick={() => setNewEmoji(em)}
                    className={`flex-shrink-0 w-10 h-10 rounded-xl text-xl flex items-center justify-center tappable ${
                      newEmoji === em ? "bg-[#C4714A] shadow" : "bg-white border border-[#C4A882]"
                    }`}>
                    {em}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-[#6B4C30] font-semibold uppercase tracking-wider mb-1.5">Item name</p>
                <input value={newName} onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Garlic"
                  className="w-full bg-white border border-[#C4A882] rounded-xl px-3 py-2.5 text-[#3B2A1A] text-sm outline-none focus:border-[#C4714A]" />
              </div>
              <div>
                <p className="text-xs text-[#6B4C30] font-semibold uppercase tracking-wider mb-1.5">Quantity</p>
                <input value={newQty} onChange={(e) => setNewQty(e.target.value)}
                  placeholder="e.g. 2 heads"
                  className="w-full bg-white border border-[#C4A882] rounded-xl px-3 py-2.5 text-[#3B2A1A] text-sm outline-none focus:border-[#C4714A]" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-[#6B4C30] font-semibold uppercase tracking-wider mb-1.5">Location</p>
                <div className="flex gap-1.5">
                  {(["Fridge","Pantry"] as const).map((c) => (
                    <button key={c} onClick={() => setNewCategory(c)}
                      className={`flex-1 py-2 rounded-xl text-xs font-medium tappable ${
                        newCategory === c ? "bg-[#C4714A] text-white" : "bg-white border border-[#C4A882] text-[#6B4C30]"
                      }`}>{c}</button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-[#6B4C30] font-semibold uppercase tracking-wider mb-1.5">Status</p>
                <div className="flex gap-1">
                  {(["plenty","low","out"] as const).map((s) => (
                    <button key={s} onClick={() => setNewStatus(s)}
                      className={`flex-1 py-2 rounded-xl text-[10px] font-medium tappable capitalize ${
                        newStatus === s ? "bg-[#C4714A] text-white" : "bg-white border border-[#C4A882] text-[#6B4C30]"
                      }`}>{s}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-1">
              <button onClick={() => setShowAdd(false)}
                className="flex-1 py-3.5 rounded-2xl border border-[#C4A882] text-[#6B4C30] text-sm font-medium tappable">
                Cancel
              </button>
              <button onClick={addItem}
                className="flex-1 py-3.5 rounded-2xl bg-[#C4714A] text-white text-sm font-semibold tappable">
                Add item
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
    </AppShell>
  );
}
