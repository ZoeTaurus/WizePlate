"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    router.push("/home");
  };

  return (
    <div
      className="min-h-svh flex flex-col items-center justify-center px-6 py-12"
      style={{ background: "linear-gradient(160deg, #F5ECD8 0%, #EDE0CC 100%)" }}
    >
      <div className="w-full max-w-sm fade-up">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-14 h-14 rounded-[20px] bg-[#C4714A] flex items-center justify-center mb-3"
               style={{ boxShadow: "0 8px 24px rgba(196,113,74,0.35)" }}>
            <span className="text-2xl">🍽</span>
          </div>
          <h1 className="text-2xl font-bold text-[#3B2A1A]" style={{ fontFamily: "var(--font-lora)" }}>
            Wize<span className="text-[#C4714A]">Plate</span>
          </h1>
          <p className="text-[#6B4C30] text-sm mt-1">Welcome back</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-[#6B4C30] uppercase tracking-wider block mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full bg-white border border-[#C4A882] rounded-2xl px-4 py-3.5 text-[#3B2A1A] text-sm outline-none placeholder-[#C4A882] focus:border-[#C4714A] transition-colors"
              style={{ boxShadow: "var(--shadow-card)" }}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#6B4C30] uppercase tracking-wider block mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-white border border-[#C4A882] rounded-2xl px-4 py-3.5 text-[#3B2A1A] text-sm outline-none placeholder-[#C4A882] focus:border-[#C4714A] transition-colors"
              style={{ boxShadow: "var(--shadow-card)" }}
            />
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-xs text-[#C4714A] font-medium">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl text-white font-semibold text-sm mt-2 tappable flex items-center justify-center gap-2"
            style={{
              background: "linear-gradient(135deg, #C4714A, #A85C38)",
              boxShadow: "0 8px 24px rgba(196,113,74,0.35)",
              opacity: loading ? 0.8 : 1,
            }}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Signing in...
              </>
            ) : "Sign in"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-[#C4A882]/40" />
          <span className="text-xs text-[#C4A882]">or</span>
          <div className="flex-1 h-px bg-[#C4A882]/40" />
        </div>

        {/* Sign up link */}
        <p className="text-center text-sm text-[#6B4C30]">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[#C4714A] font-semibold">
            Sign up free
          </Link>
        </p>

        <div className="mt-6 text-center">
          <Link href="/" className="text-xs text-[#C4A882]">← Back to home</Link>
        </div>
      </div>
    </div>
  );
}
