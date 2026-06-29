interface ProjectLogo {
  name: string;
  logoUrl: string;
  url?: string | null;
}

/**
 * Auto-scrolling "Current projects" logo strip on the home page. A bold fixed
 * label sits on the left; the logos loop seamlessly on the right (server
 * component, pure CSS — the track is duplicated so the -50% translate loops).
 */
export default function CurrentProjects({ items }: { items: ProjectLogo[] }) {
  if (!items.length) return null;

  // Repeat enough to fill wide screens, then the track is rendered twice.
  const repeat = Math.max(3, Math.ceil(12 / items.length));
  const track: ProjectLogo[] = Array.from({ length: repeat }).flatMap(() => items);

  return (
    <section className="relative shrink-0 border-t border-white/10 bg-white/[0.02] py-6">
      <div className="mx-auto flex max-w-container items-center px-6">
        <div className="mask-fade-x flex-1 overflow-hidden">
          <div className="flex w-max animate-marquee">
            {[0, 1].map((dup) => (
              <ul key={dup} className="flex items-center" aria-hidden={dup === 1}>
                {track.map((p, i) => {
                  const logo = (
                    <span className="flex h-12 w-28 items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.logoUrl}
                        alt={p.name}
                        className="max-h-12 max-w-full object-contain opacity-90 transition-opacity duration-300 hover:opacity-100"
                      />
                    </span>
                  );
                  return (
                    <li key={`${dup}-${i}`} className="flex items-center px-7">
                      {p.url ? (
                        <a href={p.url} target="_blank" rel="noopener noreferrer">
                          {logo}
                        </a>
                      ) : (
                        logo
                      )}
                    </li>
                  );
                })}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
