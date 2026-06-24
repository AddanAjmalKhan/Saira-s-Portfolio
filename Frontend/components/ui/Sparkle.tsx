interface SparkleProps {
  className?: string;
  size?: number;
  /** Adds a gentle twinkle animation. */
  animate?: boolean;
}

/**
 * Four-point star sparkle — the decorative motif used across the site.
 */
export default function Sparkle({
  className = "",
  size = 24,
  animate = false,
}: SparkleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={`${animate ? "animate-twinkle" : ""} ${className}`}
    >
      <path d="M12 0c.6 6.1 5.9 11.4 12 12-6.1.6-11.4 5.9-12 12-.6-6.1-5.9-11.4-12-12C6.1 11.4 11.4 6.1 12 0Z" />
    </svg>
  );
}
