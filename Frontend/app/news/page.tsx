import { getNews, getPageContent } from "@/lib/content";
import ImageRow from "@/components/ui/ImageRow";

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const [news, pages] = await Promise.all([getNews(), getPageContent()]);
  const block = pages["news"];

  return (
    <main className="min-h-screen pt-32 pb-20 sm:pt-40">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h1 className="mb-12 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {block?.heading ? (
            block.heading
          ) : (
            <>
              News & <span className="text-gradient">Updates</span>
            </>
          )}
        </h1>

        <div className="grid gap-8">
          {news.map((item, index) => (
            <div key={index} className="group relative flex flex-col gap-6 card-modern p-6 sm:flex-row">
              <div className="relative flex h-48 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-cyan-400/10 sm:h-auto sm:w-48 text-cyan-300 transition-colors group-hover:bg-brand-grad group-hover:text-white">
                {item.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.imageUrl} alt={item.title} className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/></svg>
                )}
              </div>
              <div className="flex flex-col justify-center">
                <div className="mb-2 flex items-center gap-3">
                  <span className="chip-grad">{item.category}</span>
                  <span className="text-sm font-medium text-cyan-300">{item.date}</span>
                </div>
                <h3 className="mb-3 text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{item.description}</p>
                <ImageRow images={item.images} className="mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
