"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <>
      <button
        onClick={() => setConfirming(true)}
        className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.08] px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
      >
        Sign out
      </button>

      {confirming && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => !loading && setConfirming(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#1b2046] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-rose-500/15 text-rose-300">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-white">Sign out?</h2>
            <p className="mt-1 text-sm text-white/60">
              Are you sure you want to log out of the dashboard?
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setConfirming(false)}
                disabled={loading}
                className="btn border border-white/15 bg-white/[0.06] text-white/90 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={logout}
                disabled={loading}
                className="btn border border-rose-400/30 bg-rose-500/20 text-rose-100 hover:bg-rose-500/30"
              >
                {loading ? "Signing out…" : "Log out"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
