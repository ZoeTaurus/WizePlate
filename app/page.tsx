"use client";

import Link from "next/link";

const floaters = [
  { emoji: "🥑", top: "6%",  left: "7%",   size: 52, rot: -18, dur: "5s",  delay: "0s"    },
  { emoji: "🍳", top: "10%", right: "9%",   size: 44, rot:  22, dur: "6s",  delay: "0.8s"  },
  { emoji: "🍝", top: "28%", left: "4%",    size: 38, rot: -8,  dur: "4.5s",delay: "1.2s"  },
  { emoji: "🧄", top: "22%", right: "5%",   size: 36, rot:  15, dur: "5.5s",delay: "0.4s"  },
  { emoji: "🍅", top: "60%", left: "5%",    size: 42, rot: -25, dur: "4s",  delay: "2s"    },
  { emoji: "🥗", top: "65%", right: "6%",   size: 46, rot:  10, dur: "6.5s",delay: "0.6s"  },
  { emoji: "🧈", top: "80%", left: "10%",   size: 34, rot: -12, dur: "5s",  delay: "1.5s"  },
  { emoji: "🫙", top: "78%", right: "10%",  size: 38, rot:  18, dur: "4.8s",delay: "1s"    },
];

const features = [
  { icon: "📷", label: "Scan your fridge & pantry with AI" },
  { icon: "🎲", label: "Plan meals in seconds, no stress" },
  { icon: "🛒", label: "Auto-build your grocery list" },
  { icon: "👨‍👩‍👧", label: "Share with your whole household" },
];

export default function LaunchPage() {
  return (
    <div
      className="relative min-h-svh overflow-hidden flex flex-col items-center justify-between"
      style={{ background: "linear-gradient(160deg, #F5ECD8 0%, #EDE0CC 55%, #D9C4A8 100%)" }}
    >
      {/* Floating food emojis */}
      {floaters.map((f, i) => (
        <span
          key={i}
          className="absolute select-none pointer-events-none float"
          style={{
            top: f.top,
            left: "left" in f ? f.left : undefined,
            right: "right" in f ? f.right : undefined,
            fontSize: f.size,
            opacity: 0.18,
            "--r": `${f.rot}deg`,
            "--dur": f.dur,
            animationDelay: f.delay,
          } as React.CSSProperties}
        >
          {f.emoji}
        </span>
      ))}

      {/* Top spacer */}
      <div />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center px-8 text-center max-w-sm mx-auto">
        {/* Logo */}
        <div className="fade-up mb-2">
          <div className="w-20 h-20 rounded-[28px] bg-[#C4714A] flex items-center justify-center shadow-lg mb-4 mx-auto"
               style={{ boxShadow: "0 12px 40px rgba(196,113,74,0.4)" }}>
            <span className="text-4xl">🍽</span>
          </div>
          <h1
            className="text-5xl font-bold text-[#3B2A1A] tracking-tight leading-none"
            style={{ fontFamily: "var(--font-lora)" }}
          >
            Wize<span className="text-[#C4714A]">Plate</span>
          </h1>
        </div>

        <p className="fade-up-delay-1 text-[#6B4C30] text-lg mt-3 leading-relaxed font-medium">
          Smarter grocery shopping,<br />stress-free meal planning.
        </p>

        {/* Feature list */}
        <div className="fade-up-delay-2 mt-8 w-full space-y-3">
          {features.map((f) => (
            <div
              key={f.label}
              className="flex items-center gap-3 bg-white/50 rounded-2xl px-4 py-3 text-left"
              style={{ backdropFilter: "blur(8px)" }}
            >
              <span className="text-xl flex-shrink-0">{f.icon}</span>
              <span className="text-[#3B2A1A] text-sm font-medium">{f.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA buttons */}
      <div className="fade-up-delay-3 relative z-10 w-full max-w-sm mx-auto px-8 pb-12 pt-8 space-y-3">
        <Link href="/signup" className="block">
          <div
            className="w-full py-4 rounded-2xl text-white font-semibold text-base text-center tappable"
            style={{
              background: "linear-gradient(135deg, #C4714A, #A85C38)",
              boxShadow: "0 8px 24px rgba(196,113,74,0.4)",
            }}
          >
            Get started — it&apos;s free
          </div>
        </Link>
        <Link href="/login" className="block">
          <div className="w-full py-4 rounded-2xl text-[#3B2A1A] font-medium text-base text-center border border-[#C4A882] bg-white/60 tappable"
               style={{ backdropFilter: "blur(8px)" }}>
            Sign in
          </div>
        </Link>
        <p className="text-center text-xs text-[#C4A882] pt-1">
          No credit card required. Always free to start.
        </p>
      </div>
    </div>
  );
}
