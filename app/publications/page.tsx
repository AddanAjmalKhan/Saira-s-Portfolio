import { publications } from "@/data/profile";

export default function PublicationsPage() {
  return (
    <main className="min-h-screen bg-night pt-32 pb-20 sm:pt-40">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h1 className="mb-12 font-display text-4xl font-bold tracking-tight text-forest-900 sm:text-5xl">
          Scientific <span className="text-mint">Publications</span>
        </h1>
        
        <div className="grid gap-6">
          {publications.map((pub, index) => (
            <div key={index} className="group relative rounded-md border border-forest-50 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-mint/30">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-forest-900 mb-2 leading-snug group-hover:text-mint transition-colors">
                    {pub.title}
                  </h3>
                  <p className="text-ink-soft mb-3 text-sm leading-relaxed">{pub.authors}</p>
                  <p className="text-forest-700 text-sm font-medium">
                    <span className="italic">{pub.journal}</span>
                    {pub.volume && `, Vol: ${pub.volume}`}
                    {pub.issue && `, Issue: ${pub.issue}`}
                    {pub.pages && `, pp. ${pub.pages}`}
                    <span className="text-mint ml-2">({pub.year})</span>
                  </p>
                </div>
                {pub.doi && (
                  <div className="shrink-0 mt-4 md:mt-0">
                    <a 
                      href={`https://doi.org/${pub.doi}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md border-2 border-mint/20 px-4 py-2 text-sm font-semibold text-mint transition-colors hover:bg-mint hover:text-white hover:border-mint"
                    >
                      DOI Link
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
