"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  {
    href: "/home",
    label: "Home",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z"
          fill={active ? "#C4714A" : "none"}
          stroke={active ? "#C4714A" : "#C4A882"}
          strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/grocery",
    label: "Grocery",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M6 2L3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6L18 2H6Z"
          fill={active ? "#C4714A" : "none"}
          stroke={active ? "#C4714A" : "#C4A882"}
          strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M3 6H21" stroke={active ? "#C4714A" : "#C4A882"} strokeWidth="1.8" />
        <path d="M16 10C16 12.21 14.21 14 12 14C9.79 14 8 12.21 8 10"
          stroke={active ? "white" : "#C4A882"} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/meals",
    label: "Meals",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M18 8h1a4 4 0 010 8h-1"
          stroke={active ? "#C4714A" : "#C4A882"} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"
          fill={active ? "#C4714A" : "none"}
          stroke={active ? "#C4714A" : "#C4A882"} strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M6 1v3M10 1v3M14 1v3"
          stroke={active ? "#C4714A" : "#C4A882"} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/pantry",
    label: "Pantry",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3"
          fill={active ? "#C4714A" : "none"}
          stroke={active ? "#C4714A" : "#C4A882"} strokeWidth="1.8" />
        <path d="M3 9H21"  stroke={active ? "white" : "#C4A882"} strokeWidth="1.8" />
        <path d="M3 15H21" stroke={active ? "white" : "#C4A882"} strokeWidth="1.8" />
        <path d="M9 9V21"  stroke={active ? "white" : "#C4A882"} strokeWidth="1.8" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="absolute bottom-0 left-0 right-0 border-t border-[#EDE0CC] px-2 pb-6 pt-2 z-50"
      style={{
        background: "rgba(245,236,216,0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      <div className="flex justify-around items-center">
        {tabs.map((tab) => {
          const active = pathname === tab.href;
          return (
            <Link key={tab.href} href={tab.href}
                  className="flex flex-col items-center gap-1 px-4 py-1 tappable">
              <div className="relative">
                {tab.icon(active)}
                {active && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C4714A]" />
                )}
              </div>
              <span className="text-[10px] font-medium"
                    style={{ color: active ? "#C4714A" : "#C4A882" }}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
