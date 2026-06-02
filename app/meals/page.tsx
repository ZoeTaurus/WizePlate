"use client";

import React, { useState } from "react";
import BottomNav from "../components/BottomNav";
import AppShell from "../components/AppShell";

type Meal = {
  id: number;
  name: string;
  emoji: string;
  time: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  saved: boolean;
  desc: string;
};

const allMeals: Meal[] = [
  { id: 1, name: "Avocado Toast", emoji: "🥑", time: "5 min", difficulty: "Easy", tags: ["Vegan", "Quick"], saved: true, desc: "Crushed avo, lemon, chili flakes on sourdough." },
  { id: 2, name: "Scrambled Eggs", emoji: "🍳", time: "8 min", difficulty: "Easy", tags: ["Vegetarian", "Quick"], saved: false, desc: "Buttery, soft eggs — slow and low is the secret." },
  { id: 3, name: "Greek Yogurt Bowl", emoji: "🫙", time: "3 min", difficulty: "Easy", tags: ["Vegetarian", "No Cook"], saved: true, desc: "Honey, granola, mixed berries on thick yogurt." },
  { id: 4, name: "Pasta Aglio e Olio", emoji: "🍝", time: "20 min", difficulty: "Medium", tags: ["Vegan"], saved: false, desc: "Garlic, olive oil, parsley — simple perfection." },
  { id: 5, name: "Chicken Stir Fry", emoji: "🍜", time: "25 min", difficulty: "Medium", tags: ["High Protein"], saved: true, desc: "Ginger, soy, sesame. Done in one pan." },
  { id: 6, name: "Banana Pancakes", emoji: "🥞", time: "15 min", difficulty: "Easy", tags: ["Vegetarian", "Sweet"], saved: false, desc: "2 ingredients. Banana + egg. Surprisingly delicious." },
  { id: 7, name: "Caesar Salad", emoji: "🥗", time: "10 min", difficulty: "Easy", tags: ["Vegetarian"], saved: true, desc: "Crunchy romaine, parmesan, anchovy dressing." },
  { id: 8, name: "Beef Tacos", emoji: "🌮", time: "30 min", difficulty: "Medium", tags: ["High Protein"], saved: false, desc: "Spiced beef, fresh salsa, lime crema." },
];

const difficultyColor: Record<string, React.CSSProperties> = {
  Easy:   { backgroundColor: "#D4E8D4", color: "#2A5A2A" },
  Medium: { backgroundColor: "#F0DDB8", color: "#7A4A10" },
  Hard:   { backgroundColor: "#F0CECE", color: "#7A1010" },
};

const filters = ["All", "Easy", "Quick", "Vegan", "Vegetarian", "High Protein"];

export default function MealsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [meals, setMeals] = useState(allMeals);
  const [randomMeal, setRandomMeal] = useState<Meal | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [importUrl, setImportUrl] = useState("");

  const filtered = meals.filter((m) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Easy") return m.difficulty === "Easy";
    if (activeFilter === "Quick") return parseInt(m.time) <= 10;
    return m.tags.includes(activeFilter);
  });

  const pickRandom = () => {
    if (spinning) return;
    setSpinning(true);
    setRandomMeal(null);
    const easyMeals = meals.filter((m) => m.difficulty === "Easy");
    let count = 0;
    const flicker = setInterval(() => {
      setRandomMeal(easyMeals[Math.floor(Math.random() * easyMeals.length)]);
      count++;
      if (count >= 6) {
        clearInterval(flicker);
        setSpinning(false);
      }
    }, 120);
  };

  const toggleSave = (id: number) => {
    setMeals((prev) => prev.map((m) => (m.id === id ? { ...m, saved: !m.saved } : m)));
  };

  return (
    <AppShell>
    <div className="flex flex-col flex-1 min-h-0 bg-[#F5ECD8]">
      {/* Header */}
      <div className="px-6 pt-14 pb-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[#3B2A1A] text-[26px] font-semibold leading-tight">Meals</h1>
            <p className="text-[#6B4C30] text-sm mt-0.5">{meals.filter((m) => m.saved).length} saved</p>
          </div>
          <button
            onClick={() => setShowImport(true)}
            className="flex items-center gap-1.5 bg-white border border-[#C4A882] rounded-full px-3.5 py-2 text-xs font-medium text-[#3B2A1A] tappable"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            📥 Import recipe
          </button>
        </div>
      </div>

      {/* Random picker */}
      <div className="px-6 mb-4 flex-shrink-0">
        <div className="bg-white rounded-3xl p-4 border border-[#C4A882]/40" style={{ boxShadow: "var(--shadow-card)" }}>
          {randomMeal ? (
            <div className="pop-in">
              <div className="flex items-start gap-3">
                <span className="text-5xl">{randomMeal.emoji}</span>
                <div className="flex-1">
                  <p className="text-[10px] text-[#C4714A] font-semibold uppercase tracking-wider">Tonight&apos;s Random Pick</p>
                  <p className="text-[#3B2A1A] font-semibold text-base mt-0.5">{randomMeal.name}</p>
                  <p className="text-[#6B4C30] text-xs mt-0.5">{randomMeal.desc}</p>
                  <div className="flex gap-1.5 mt-2">
                    <span className="text-[10px] bg-[#EDE0CC] text-[#6B4C30] rounded-full px-2.5 py-0.5">{randomMeal.time}</span>
                    <span
                      className="text-[10px] rounded-full px-2.5 py-0.5"
                      style={difficultyColor[randomMeal.difficulty]}
                    >
                      {randomMeal.difficulty}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button className="flex-1 py-2.5 rounded-xl bg-[#C4714A] text-white text-xs font-semibold tappable">
                  Add to grocery list
                </button>
                <button
                  onClick={pickRandom}
                  className="py-2.5 px-3 rounded-xl bg-[#EDE0CC] text-[#6B4C30] text-xs font-medium tappable"
                >
                  🎲 Again
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={pickRandom}
              className="w-full flex items-center justify-center gap-2 py-2 tappable"
            >
              <span className={`text-2xl ${spinning ? "animate-spin" : ""}`}>🎲</span>
              <span className="text-[#3B2A1A] font-semibold text-sm">Pick a random meal for me</span>
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar px-6 pb-3 flex-shrink-0">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all tappable ${
              activeFilter === f
                ? "bg-[#C4714A] text-white"
                : "bg-white text-[#6B4C30] border border-[#C4A882]"
            }`}
            style={activeFilter !== f ? { boxShadow: "var(--shadow-card)" } : {}}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Meal list */}
      <div className="overflow-y-auto no-scrollbar pb-28 px-6 flex-1 space-y-3">
        {filtered.map((meal) => {
          const dc = difficultyColor[meal.difficulty];
          return (
            <div
              key={meal.id}
              className="bg-white rounded-2xl p-4 tappable"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#F5ECD8] flex items-center justify-center text-3xl flex-shrink-0">
                  {meal.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#3B2A1A] font-semibold text-sm">{meal.name}</p>
                  <p className="text-[#6B4C30] text-xs mt-0.5 leading-relaxed">{meal.desc}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    <span className="text-[10px] bg-[#EDE0CC] text-[#6B4C30] rounded-full px-2 py-0.5">{meal.time}</span>
                    <span className="text-[10px] rounded-full px-2 py-0.5" style={dc}>{meal.difficulty}</span>
                    {meal.tags.map((tag) => (
                      <span key={tag} className="text-[10px] bg-[#EDE0CC] text-[#6B4C30] rounded-full px-2 py-0.5">{tag}</span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleSave(meal.id); }}
                  className="mt-0.5 tappable flex-shrink-0"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={meal.saved ? "#C4714A" : "none"}>
                    <path d="M19 21L12 16L5 21V5C5 3.9 5.9 3 7 3H17C18.1 3 19 3.9 19 5V21Z"
                      stroke="#C4714A" strokeWidth="1.8" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <button className="mt-3 w-full py-2 rounded-xl bg-[#F5ECD8] text-[#C4714A] text-xs font-semibold tappable border border-[#C4A882]/40">
                + Add ingredients to grocery list
              </button>
            </div>
          );
        })}
      </div>

      {/* Import modal */}
      {showImport && (
        <div className="absolute inset-0 bg-black/40 z-50 flex items-end" onClick={() => setShowImport(false)}>
          <div
            className="w-full bg-[#F5ECD8] rounded-t-3xl p-6 pb-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-[#C4A882] rounded-full mx-auto mb-5" />
            <h2 className="text-[#3B2A1A] font-semibold text-xl mb-1">Import Recipe</h2>
            <p className="text-[#6B4C30] text-sm mb-4">Paste any recipe URL — we&apos;ll pull the ingredients automatically.</p>
            <input
              autoFocus
              value={importUrl}
              onChange={(e) => setImportUrl(e.target.value)}
              placeholder="https://..."
              className="w-full bg-white border border-[#C4A882] rounded-2xl px-4 py-3.5 text-[#3B2A1A] text-sm outline-none placeholder-[#C4A882]"
              style={{ boxShadow: "var(--shadow-card)" }}
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => { setShowImport(false); setImportUrl(""); }}
                className="flex-1 py-3.5 rounded-2xl border border-[#C4A882] text-[#6B4C30] text-sm font-medium tappable"
              >
                Cancel
              </button>
              <button
                onClick={() => { setShowImport(false); setImportUrl(""); }}
                className="flex-1 py-3.5 rounded-2xl bg-[#C4714A] text-white text-sm font-semibold tappable"
              >
                Import
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
