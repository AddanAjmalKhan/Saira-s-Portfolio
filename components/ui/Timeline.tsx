import type { TimelineEntry } from "@/lib/types";
import Reveal from "./Reveal";
import Sparkle from "./Sparkle";

interface TimelineProps {
  entries: TimelineEntry[];
  tone?: "light" | "dark";
}

export default function Timeline({ entries, tone = "light" }: TimelineProps) {
  const isDark = tone === "dark";

  return (
    <ol
      className={`relative space-y-12 border-l pl-8 sm:pl-12 ${
        isDark ? "border-cream/20" : "border-forest-200"
      }`}
    >
      <span
        className="absolute -left-px top-0 h-full w-px bg-gradient-to-b from-ochre-soft via-ochre to-transparent opacity-70"
        aria-hidden
      />
      {entries.map((entry, i) => (
        <Reveal
          as="li"
          key={`${entry.title}-${entry.period}`}
          from="up"
          delay={i * 60}
          className="relative"
        >
          {/* Star node marker */}
          <span
            className={`absolute -left-[42px] top-1 sm:-left-[58px] ${
              isDark ? "text-ochre-soft" : "text-ochre"
            }`}
            aria-hidden
          >
            <Sparkle size={18} />
          </span>

          <span
            className={`font-mono text-xs font-medium uppercase tracking-widest ${
              isDark ? "text-ochre-soft" : "text-amber-deep"
            }`}
          >
            {entry.period}
          </span>

          <h3
            className={`mt-2 font-display text-2xl font-semibold leading-tight ${
              isDark ? "text-cream" : "text-ink"
            }`}
          >
            {entry.title}
          </h3>

          <p
            className={`mt-1 text-sm font-medium ${
              isDark ? "text-cream/70" : "text-forest-700"
            }`}
          >
            {entry.organisation}
            <span className={isDark ? "text-cream/45" : "text-ink-soft/60"}>
              {" "}
              · {entry.location}
            </span>
          </p>

          {entry.grade && (
            <p
              className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                isDark
                  ? "bg-cream/15 text-cream"
                  : "bg-ochre/15 text-amber-deep"
              }`}
            >
              ★ {entry.grade}
            </p>
          )}

          <ul className="mt-4 space-y-2">
            {entry.highlights.map((point, j) => (
              <li
                key={j}
                className={`relative pl-5 text-sm leading-relaxed ${
                  isDark ? "text-cream/75" : "text-ink-soft"
                }`}
              >
                <span
                  className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-ochre"
                  aria-hidden
                />
                {point}
              </li>
            ))}
          </ul>

          {entry.tags && entry.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                    isDark
                      ? "bg-ink/40 text-cream/85 ring-1 ring-inset ring-cream/10"
                      : "bg-cream text-ink-soft ring-1 ring-inset ring-ink/10"
                  }`}
                >
                  #{tag.replace(/\s+/g, "")}
                </span>
              ))}
            </div>
          )}
        </Reveal>
      ))}
    </ol>
  );
}
