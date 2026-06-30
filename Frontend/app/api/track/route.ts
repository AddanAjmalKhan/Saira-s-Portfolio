import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Ignore crawlers / preview bots so the counts reflect real people.
const BOT_RE =
  /bot|crawl|spider|slurp|bing|google|baidu|yandex|duckduck|facebook|embedly|preview|monitor|curl|wget|headless|lighthouse|pingdom|uptime|vercel-screenshot/i;

export async function POST(req: NextRequest) {
  const ua = req.headers.get("user-agent") || "";
  if (BOT_RE.test(ua)) return NextResponse.json({ ok: true, skipped: "bot" });

  // Count each browser once (unique visitors, not page views).
  if (req.cookies.get("vw_seen")) return NextResponse.json({ ok: true, skipped: "seen" });

  // Vercel injects the visitor's country on the live site — accurate and free.
  let country = (req.headers.get("x-vercel-ip-country") || "").toUpperCase();

  // Local dev fallback (no Vercel geo header): look up this machine's country.
  if (!country && process.env.NODE_ENV !== "production") {
    try {
      const r = await fetch("https://ipapi.co/country/", { cache: "no-store" });
      country = (await r.text()).trim().toUpperCase();
    } catch {}
  }

  if (!/^[A-Z]{2}$/.test(country)) return NextResponse.json({ ok: true, skipped: "no-country" });

  try {
    await prisma.countryVisit.upsert({
      where: { country },
      update: { count: { increment: 1 } },
      create: { country, count: 1 },
    });
  } catch {}

  const res = NextResponse.json({ ok: true, country });
  res.cookies.set("vw_seen", "1", {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: "/",
    sameSite: "lax",
  });
  return res;
}
