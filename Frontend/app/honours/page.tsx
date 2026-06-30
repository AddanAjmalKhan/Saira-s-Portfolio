import { getHonours, getPageContent } from "@/lib/content";
import ImageRow from "@/components/ui/ImageRow";

export const dynamic = "force-dynamic";

export default async function HonoursPage() {
  const [honours, pages] = await Promise.all([getHonours(), getPageContent()]);
  const block = pages["honours"];

  return (
    <main className="min-h-screen pt-32 pb-20 sm:pt-40">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {(block?.eyebrow ?? "Recognition") && (
          <span className="mb-3 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-cyan-300">
            <span className="h-px w-6 bg-cyan-400/60" aria-hidden />
            {block?.eyebrow ?? "Recognition"}
          </span>
        )}
        <h1 className="mb-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {block?.heading ? (
            block.heading
          ) : (
            <>
              Honours &amp; <span className="text-gradient">Awards</span>
            </>
          )}
        </h1>
        {block?.subheading && (
          <p className="mb-12 max-w-2xl text-lg text-slate-300">{block.subheading}</p>
        )}

        <div className={`grid gap-8 ${block?.subheading ? "" : "mt-12"}`}>
          {honours.length === 0 ? (
            <p className="text-slate-400">No honours yet.</p>
          ) : (
            honours.map((item, index) => (
              <div key={index} className="group relative flex flex-col gap-6 card-modern p-6 sm:flex-row">
                <div className="relative flex h-48 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-cyan-400/10 text-cyan-300 transition-colors group-hover:bg-brand-grad group-hover:text-white sm:h-auto sm:w-48">
                  {item.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.imageUrl} alt={item.title} className="absolute inset-0 h-full w-full object-cover" />
                  ) : (
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" />
                      <path d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3M10 15h4M9 20h6M12 13v2" />
                    </svg>
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="chip-grad">Award</span>
                    <span className="text-sm font-medium text-cyan-300">{item.year}</span>
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-cyan-300">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{item.detail}</p>
                  <ImageRow images={item.images} className="mt-4" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
