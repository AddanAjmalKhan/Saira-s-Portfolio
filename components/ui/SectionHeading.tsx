import Reveal from "./Reveal";

interface SectionHeadingProps {
  index?: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}

export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
}: SectionHeadingProps) {
  const isDark = tone === "dark";
  const alignment =
    align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <Reveal className={`flex max-w-3xl flex-col ${alignment}`}>
      <div className="flex items-center gap-4">
        {index && (
          <span
            className={`font-mono text-xs font-medium tracking-widest ${
              isDark ? "text-mint" : "text-mint-deep"
            }`}
          >
            {index}
          </span>
        )}
        <span
          className={`inline-flex items-center gap-2 font-mono text-[0.7rem] font-semibold uppercase tracking-ultra ${
            isDark ? "text-amber-soft" : "text-amber-deep"
          }`}
        >
          <span className="h-px w-8 bg-current opacity-50" aria-hidden />
          {eyebrow}
        </span>
      </div>

      <h2
        className={`mt-5 font-display text-[2.1rem] font-semibold leading-[1.04] tracking-tightest sm:text-5xl md:text-6xl ${
          isDark ? "text-cream" : "text-ink"
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-6 text-base leading-relaxed sm:text-lg ${
            isDark ? "text-cream/70" : "text-ink-soft"
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
