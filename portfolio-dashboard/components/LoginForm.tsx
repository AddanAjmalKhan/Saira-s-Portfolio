"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm({ next }: { next?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Login failed.");
        return;
      }
      router.push(next || "/admin");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const fieldWrap =
    "rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2.5 transition focus-within:border-brand-light/60 focus-within:bg-white/[0.08]";
  const tinyLabel = "block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40";
  const fieldInput =
    "w-full border-0 bg-transparent p-0 text-sm font-medium text-white outline-none placeholder:text-white/30 focus:ring-0";

  return (
    <form onSubmit={onSubmit} className="space-y-3.5">
      {error && (
        <div className="rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2.5 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className={fieldWrap}>
        <label htmlFor="email" className={tinyLabel}>Email address</label>
        <input
          id="email"
          type="email"
          className={fieldInput}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          placeholder="you@example.com"
          required
        />
      </div>

      <div className={fieldWrap}>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className={tinyLabel}>Password</label>
          <button
            type="button"
            onClick={() => setShowPw((s) => !s)}
            className="text-[10px] font-semibold uppercase tracking-wider text-white/35 hover:text-white/70"
          >
            {showPw ? "Hide" : "Show"}
          </button>
        </div>
        <input
          id="password"
          type={showPw ? "text" : "password"}
          className={fieldInput}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          placeholder="••••••••"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="group mt-1 flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-sm font-bold text-[#161a36] shadow-lg transition hover:bg-white/90 disabled:opacity-70"
      >
        {loading ? "Logging in…" : "Log in"}
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-white transition-transform group-hover:translate-x-0.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </span>
      </button>

      <div className="pt-2 text-center">
        <button
          type="button"
          onClick={() => setShowForgot((s) => !s)}
          className="text-xs font-semibold uppercase tracking-wider text-white/40 hover:text-white/70"
        >
          Forgot your password?
        </button>
        {showForgot && (
          <p className="mx-auto mt-2 max-w-xs text-xs leading-relaxed text-white/40">
            Ask an administrator to reset it from the <span className="text-white/60">Users</span> screen
            (Edit → set a new password).
          </p>
        )}
      </div>
    </form>
  );
}
