import Sparkle from "./Sparkle";

interface PortraitProps {
  /** Path to a real photo in /public (e.g. "/portrait.jpg"). */
  src?: string;
  alt: string;
  className?: string;
  /** Small floating badge, e.g. a date or tagline. */
  badge?: string;
}

/**
 * Portrait card in the reference style. Renders a real photo when `src` is
 * provided, otherwise a designed monogram placeholder so the layout always
 * looks intentional. Drop a file at /public/portrait.jpg and pass src to swap.
 */
export default function Portrait({
  src,
  alt,
  className = "",
  badge,
}: PortraitProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gradient-to-br from-forest-600 to-forest-800 ring-1 ring-slate-200">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="grain relative flex h-full w-full flex-col items-center justify-center text-slate-900">
            <div className="bg-dot-grid-dark absolute inset-0 opacity-70" aria-hidden />
            <Sparkle
              size={32}
              className="absolute right-6 top-6 text-ochre-soft"
              animate
            />
            <span className="relative font-display text-[5.5rem] font-semibold leading-none text-slate-600">
              SA
            </span>
            <span className="relative mt-3 font-mono text-[0.65rem] uppercase tracking-ultra text-slate-600">
              Portrait
            </span>
          </div>
        )}
      </div>

      {badge && (
        <span className="absolute -left-3 bottom-10 rotate-[-4deg] rounded-full bg-white px-4 py-2 font-display text-sm font-semibold text-slate-900 shadow-lg ring-1 ring-slate-200">
          {badge}
        </span>
      )}
    </div>
  );
}
