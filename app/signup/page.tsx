"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
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
          <p className="text-[#6B4C30] text-sm mt-1">Create your free account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-[#6B4C30] uppercase tracking-wider block mb-1.5">
              Your name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex"
              required
              className="w-full bg-white border border-[#C4A882] rounded-2xl px-4 py-3.5 text-[#3B2A1A] text-sm outline-none placeholder-[#C4A882] focus:border-[#C4714A] transition-colors"
              style={{ boxShadow: "var(--shadow-card)" }}
            />
          </div>
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
              placeholder="At least 8 characters"
              required
              minLength={8}
              className="w-full bg-white border border-[#C4A882] rounded-2xl px-4 py-3.5 text-[#3B2A1A] text-sm outline-none placeholder-[#C4A882] focus:border-[#C4714A] transition-colors"
              style={{ boxShadow: "var(--shadow-card)" }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl text-white font-semibold text-sm mt-1 tappable flex items-center justify-center gap-2"
            style={{
              background: "linear-gradient(135deg, #C4714A, #A85C38)",
              boxShadow: "0 8px 24px rgba(196,113,74,0.35)",
              opacity: loading ? 0.8 : 1,
            }}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating account...
              </>
            ) : "Create account"}
          </button>
        </form>

        <p className="text-center text-[10px] text-[#C4A882] mt-3 leading-relaxed">
          By signing up you agree to our Terms of Service<br />and Privacy Policy.
        </p>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-[#C4A882]/40" />
          <span className="text-xs text-[#C4A882]">already have an account?</span>
          <div className="flex-1 h-px bg-[#C4A882]/40" />
        </div>

        <Link href="/login" className="block w-full py-3.5 rounded-2xl text-[#3B2A1A] font-medium text-sm text-center border border-[#C4A882] bg-white/60 tappable"
              style={{ backdropFilter: "blur(8px)" }}>
          Sign in instead
        </Link>

        <div className="mt-5 text-center">
          <Link href="/" className="text-xs text-[#C4A882]">← Back to home</Link>
        </div>
      </div>
    </div>
  );
}
