import { getCountryVisits, getVisitorWidget } from "@/lib/content";

let regionNames: Intl.DisplayNames | null = null;
function countryName(code: string) {
  try {
    regionNames ||= new Intl.DisplayNames(["en"], { type: "region" });
    return regionNames.of(code.toUpperCase()) || code;
  } catch {
    return code;
  }
}

export default async function VisitorsStrip() {
  const [widget, visits] = await Promise.all([getVisitorWidget(), getCountryVisits()]);

  // Hidden from the dashboard, or no data yet → render nothing.
  if (widget && widget.enabled !== "on") return null;
  if (visits.length === 0) return null;

  const total = visits.reduce((s, v) => s + v.count, 0);
  const top = visits.slice(0, 12);
  const heading = widget?.heading || "Viewed from around the world";

  return (
    <section className="border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-cyan-300">
            <span className="h-px w-6 bg-cyan-400/60" aria-hidden />
            Audience
            <span className="h-px w-6 bg-cyan-400/60" aria-hidden />
          </span>
          <h2 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">{heading}</h2>
          <p className="mt-2 text-sm text-slate-400">
            {total.toLocaleString()} {total === 1 ? "visit" : "visits"} from {visits.length}{" "}
            {visits.length === 1 ? "country" : "countries"}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {top.map((v) => (
            <div
              key={v.country}
              className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-sm transition-colors hover:border-cyan-400/30"
            >
              <span className="text-sm font-medium text-white">{countryName(v.country)}</span>
              <span className="rounded-full bg-cyan-400/15 px-2 py-0.5 text-xs font-semibold text-cyan-300">
                {v.count.toLocaleString()} {v.count === 1 ? "person" : "people"}
              </span>
            </div>
          ))}
        </div>

        {visits.length > top.length && (
          <p className="mt-4 text-center text-xs text-slate-500">
            and {visits.length - top.length} more {visits.length - top.length === 1 ? "country" : "countries"}…
          </p>
        )}
      </div>
    </section>
  );
}
