import { publications } from "@/data/profile";

export default function PublicationsPage() {
  return (
    <main className="min-h-screen bg-[#f6f8fb] pt-32 pb-20 sm:pt-40">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h1 className="mb-12 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Scientific Publications
        </h1>
        
        <div className="grid gap-6">
          {publications.map((pub, index) => (
            <div key={index} className="group relative rounded-md border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-900 hover:bg-slate-900">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 leading-snug transition-colors group-hover:text-white">
                    {pub.title}
                  </h3>
                  <p className="text-slate-600 mb-3 text-sm leading-relaxed transition-colors group-hover:text-slate-300">{pub.authors}</p>
                  <p className="text-mint text-sm font-medium transition-colors group-hover:text-mint/80">
                    <span className="italic">{pub.journal}</span>
                    {pub.volume && `, Vol: ${pub.volume}`}
                    {pub.issue && `, Issue: ${pub.issue}`}
                    {pub.pages && `, pp. ${pub.pages}`}
                    <span className="text-mint ml-2 transition-colors group-hover:text-mint/80">({pub.year})</span>
                  </p>
                </div>
                {pub.doi && (
                  <div className="shrink-0 mt-4 md:mt-0">
                    <a 
                      href={`https://doi.org/${pub.doi}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border-2 border-mint/20 bg-white px-4 py-2 text-sm font-semibold text-mint shadow-sm transition duration-300 ease-out hover:-translate-y-0.5 hover:!border-mint hover:!bg-mint hover:!text-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/30 group-hover:bg-white/10 group-hover:border-transparent group-hover:text-white"
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
