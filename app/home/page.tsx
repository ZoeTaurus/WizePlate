"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";
import AppShell from "../components/AppShell";

const todaysPick = {
  name: "Pasta Aglio e Olio",
  emoji: "🍝",
  time: "20 min",
  difficulty: "Easy",
  desc: "Garlic, olive oil, and a little magic.",
};

const quickMeals = [
  { name: "Avocado Toast", time: "5 min", emoji: "🥑", bg: "#D4E8C4" },
  { name: "Scrambled Eggs", time: "8 min", emoji: "🍳", bg: "#F0E0C4" },
  { name: "Yogurt Bowl",    time: "3 min", emoji: "🫙", bg: "#C4D8E8" },
  { name: "Banana Pancakes",time: "15 min",emoji: "🥞", bg: "#E8C4D4" },
];

const recentMeals = [
  { name: "Chicken Stir Fry", emoji: "🍜", time: "25 min" },
  { name: "Banana Pancakes",  emoji: "🥞", time: "15 min" },
  { name: "Caesar Salad",     emoji: "🥗", time: "10 min" },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}
function getTip() {
  const h = new Date().getHours();
  if (h < 10) return "What's for breakfast?";
  if (h < 15) return "Lunch plans sorted?";
  return "What's cooking tonight?";
}

export default function Home() {
  const [greeting, setGreeting] = useState("Good morning");
  const [tip, setTip]           = useState("What's cooking?");

  useEffect(() => {
    setGreeting(getGreeting());
    setTip(getTip());
  }, []);

  return (
    <AppShell>
      {/* Header */}
      <div className="px-6 pt-14 pb-5 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#6B4C30] text-sm">{greeting},</p>
            <h1 className="text-[#3B2A1A] text-[26px] font-semibold leading-tight mt-0.5">
              {tip}
            </h1>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="w-11 h-11 rounded-full bg-[#C4714A] flex items-center justify-center text-white font-bold text-base"
                 style={{ boxShadow: "0 4px 12px rgba(196,113,74,0.4)" }}>
              Z
            </div>
            <span className="text-[10px] text-[#C4A882]">WizePlate</span>
          </div>
        </div>
      </div>

      <div className="overflow-y-auto no-scrollbar pb-28 space-y-6 flex-1">

        {/* Tonight's Pick hero */}
        <div className="px-6">
          <div className="rounded-3xl p-5 relative overflow-hidden tappable"
               style={{ background: "linear-gradient(135deg, #C4714A 0%, #8B4A2A 100%)",
                        boxShadow: "0 12px 32px rgba(196,113,74,0.35)" }}>
            <div className="absolute -right-4 -top-4 text-[100px] opacity-20 select-none leading-none">
              {todaysPick.emoji}
            </div>
            <div className="relative z-10">
              <span className="text-[11px] text-white/70 font-semibold uppercase tracking-widest">Tonight&apos;s Pick</span>
              <h2 className="text-white text-2xl font-semibold mt-1 leading-tight">{todaysPick.name}</h2>
              <p className="text-white/70 text-sm mt-1">{todaysPick.desc}</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-xs bg-white/20 text-white rounded-full px-3 py-1">{todaysPick.time}</span>
                <span className="text-xs bg-white/20 text-white rounded-full px-3 py-1">{todaysPick.difficulty}</span>
              </div>
              <div className="flex gap-2 mt-4">
                <Link href="/grocery">
                  <span className="inline-block text-xs bg-white text-[#C4714A] font-semibold rounded-full px-4 py-2 tappable">
                    Add to grocery list
                  </span>
                </Link>
                <Link href="/meals">
                  <span className="inline-block text-xs bg-white/20 text-white font-medium rounded-full px-4 py-2 tappable">
                    See recipe
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="px-6">
          <div className="grid grid-cols-3 gap-2.5">
            <Link href="/grocery">
              <div className="bg-[#EDE0CC] rounded-2xl p-3 border border-[#C4A882]/50 tappable text-center"
                   style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="text-2xl mb-1">🛒</div>
                <p className="text-[#3B2A1A] font-medium text-xs">Grocery</p>
              </div>
            </Link>
            <Link href="/pantry">
              <div className="bg-[#EDE0CC] rounded-2xl p-3 border border-[#C4A882]/50 tappable text-center"
                   style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="text-2xl mb-1">📷</div>
                <p className="text-[#3B2A1A] font-medium text-xs">Scan</p>
              </div>
            </Link>
            <Link href="/meals">
              <div className="bg-[#EDE0CC] rounded-2xl p-3 border border-[#C4A882]/50 tappable text-center"
                   style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="text-2xl mb-1">🎲</div>
                <p className="text-[#3B2A1A] font-medium text-xs">Random</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Quick & Easy */}
        <div>
          <div className="flex items-center justify-between px-6 mb-3">
            <h2 className="text-[#3B2A1A] font-semibold text-lg">Quick &amp; Easy</h2>
            <Link href="/meals" className="text-[#C4714A] text-sm font-medium">See all</Link>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar px-6 pb-1">
            {quickMeals.map((meal) => (
              <div key={meal.name}
                   className="flex-shrink-0 w-[130px] rounded-2xl p-3 tappable"
                   style={{ backgroundColor: meal.bg, boxShadow: "var(--shadow-card)" }}>
                <div className="text-4xl mb-3">{meal.emoji}</div>
                <p className="text-[#3B2A1A] font-semibold text-sm leading-tight">{meal.name}</p>
                <p className="text-[#6B4C30] text-xs mt-1">{meal.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recently made */}
        <div className="px-6">
          <h2 className="text-[#3B2A1A] font-semibold text-lg mb-3">Recently Made</h2>
          <div className="space-y-2">
            {recentMeals.map((meal) => (
              <div key={meal.name}
                   className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 tappable"
                   style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="w-10 h-10 rounded-xl bg-[#F5ECD8] flex items-center justify-center text-xl flex-shrink-0">
                  {meal.emoji}
                </div>
                <div className="flex-1">
                  <p className="text-[#3B2A1A] font-medium text-sm">{meal.name}</p>
                  <p className="text-[#6B4C30] text-xs">{meal.time}</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="#C4A882" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Household */}
        <div className="px-6">
          <div className="bg-white rounded-2xl p-4" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[#3B2A1A] font-semibold">Household</h2>
              <span className="text-xs text-[#C4714A] font-medium border border-[#C4714A]/40 rounded-full px-3 py-0.5 tappable">
                Manage
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {[["Z","#C4714A"],["A","#A85C38"],["M","#D9A87C"]].map(([init, color], i) => (
                  <div key={i}
                       className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                       style={{ backgroundColor: color }}>
                    {init}
                  </div>
                ))}
                <div className="w-9 h-9 rounded-full border-2 border-white bg-[#EDE0CC] flex items-center justify-center tappable">
                  <span className="text-[#6B4C30] text-sm font-bold">+</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <p className="text-xs text-[#6B4C30]">List syncing</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <BottomNav />
    </AppShell>
  );
}
