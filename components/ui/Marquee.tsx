interface MarqueeProps {
  items: string[];
  reverse?: boolean;
  className?: string;
}

/**
 * Pure-CSS infinite marquee (server component). The track is duplicated so the
 * -50% keyframe translate produces a seamless loop.
 */
export default function Marquee({
  items,
  reverse = false,
  className = "",
}: MarqueeProps) {
  return (
    <div className={`mask-fade-x overflow-hidden ${className}`}>
      <div
        className={`flex w-max ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {[0, 1].map((dup) => (
          <ul key={dup} className="flex items-center" aria-hidden={dup === 1}>
            {items.map((item, i) => (
              <li key={`${dup}-${i}`} className="flex items-center">
                <span className="px-6 font-display text-2xl font-medium text-slate-600 sm:text-3xl">
                  {item}
                </span>
                <span className="text-mint" aria-hidden>
                  ✦
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
