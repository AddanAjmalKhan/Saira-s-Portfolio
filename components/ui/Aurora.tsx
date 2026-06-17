interface AuroraProps {
  /** Lower = more subtle. */
  intensity?: "subtle" | "bold";
}

/**
 * Animated aurora backdrop — three blurred colour fields drifting on
 * independent loops. Pure CSS, renders on the server.
 */
export default function Aurora({ intensity = "bold" }: AuroraProps) {
  const opacity = intensity === "bold" ? "opacity-100" : "opacity-60";
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${opacity}`}
      aria-hidden
    >
      <div className="absolute -left-1/4 top-[-20%] h-[42rem] w-[42rem] animate-aurora rounded-full bg-mint/25 blur-[120px]" />
      <div className="absolute right-[-15%] top-[10%] h-[38rem] w-[38rem] animate-aurora-slow rounded-full bg-amber/20 blur-[130px]" />
      <div className="absolute bottom-[-25%] left-1/3 h-[40rem] w-[40rem] animate-float rounded-full bg-forest-500/30 blur-[140px]" />
    </div>
  );
}
