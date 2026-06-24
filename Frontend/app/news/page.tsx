import { getNews, getPageContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const [news, pages] = await Promise.all([getNews(), getPageContent()]);
  const block = pages["news"];

  return (
    <main className="min-h-screen bg-[#f6f8fb] pt-32 pb-20 sm:pt-40">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h1 className="mb-12 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          {block?.heading ? (
            block.heading
          ) : (
            <>
              News & <span className="text-mint">Updates</span>
            </>
          )}
        </h1>
        
        <div className="grid gap-8">
          {news.map((item, index) => (
            <div key={index} className="group relative flex flex-col sm:flex-row gap-6 rounded-md border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-mint/30">
              <div className="relative flex h-48 w-full shrink-0 items-center justify-center overflow-hidden rounded-md bg-mint/10 sm:h-auto sm:w-48 text-mint group-hover:text-white group-hover:bg-mint transition-colors">
                {item.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.imageUrl} alt={item.title} className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/></svg>
                )}
              </div>
              <div className="flex flex-col justify-center">
                <div className="mb-2 flex items-center gap-3">
                  <span className="rounded-full bg-mint/10 px-3 py-1 text-xs font-semibold text-mint">{item.category}</span>
                  <span className="text-sm font-medium text-mint">{item.date}</span>
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900 group-hover:text-mint transition-colors">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
