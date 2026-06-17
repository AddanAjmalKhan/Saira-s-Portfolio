interface OutlineStackProps {
  word: string;
  /** Number of faded outlined echoes beneath the solid word. */
  echoes?: number;
  /** Colour treatment of the solid (top) word. */
  tone?: "cream" | "ochre";
  className?: string;
  /** Overlap between stacked lines (negative margin), in em. */
  overlap?: number;
}

/**
 * The signature display motif: a solid word followed by progressively
 * fainter outlined echoes — e.g. PORTFOLIO / FOLIO / FOLIO.
 */
export default function OutlineStack({
  word,
  echoes = 3,
  tone = "cream",
  className = "",
  overlap = 0.18,
}: OutlineStackProps) {
  const solid = tone === "ochre" ? "text-gradient" : "text-cream";
  const stroke = tone === "ochre" ? "text-stroke-ochre" : "text-stroke";

  return (
    <div
      className={`select-none font-display font-semibold uppercase leading-[0.82] tracking-tightest ${className}`}
      aria-label={word}
    >
      <span className={`block ${solid}`}>{word}</span>
      {Array.from({ length: echoes }).map((_, i) => (
        <span
          key={i}
          aria-hidden
          className={`block ${stroke}`}
          style={{
            marginTop: `-${overlap}em`,
            opacity: Math.max(0.08, 0.6 - i * 0.18),
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}
