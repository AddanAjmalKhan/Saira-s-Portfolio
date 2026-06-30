"use client";

import { useEffect } from "react";

/** Fires once per browser; the /api/track route dedupes via a cookie. */
export default function VisitorTracker() {
  useEffect(() => {
    fetch("/api/track", { method: "POST" }).catch(() => {});
  }, []);
  return null;
}
