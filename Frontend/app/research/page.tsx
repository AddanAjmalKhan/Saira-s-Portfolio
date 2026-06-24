import { getResearchInterests, getPageContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function ResearchInterestsPage() {
  const [interests, pages] = await Promise.all([getResearchInterests(), getPageContent()]);
  const block = pages["research"];

  const IconMap = ({ name, className }: { name: string, className?: string }) => {
    switch (name) {
      case "dna": return <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m8 22 8-20"/><path d="M16 22 8 2"/><path d="M12 2v20"/><path d="M4 6h16"/><path d="M4 10h16"/><path d="M4 14h16"/><path d="M4 18h16"/></svg>;
      case "leaf": return <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>;
      case "database": return <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>;
      case "shield": return <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
      default: return <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>;
    }
  };

  return (
    <main className="min-h-screen bg-[#f6f8fb] pt-32 pb-20 sm:pt-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            {block?.heading ? block.heading : (<>Research <span className="text-gradient">Interests</span></>)}
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            {block?.subheading ??
              "Focusing on the intersection of air forensics, genomics, and plant pathology to solve real-world biological challenges."}
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {interests.map((item, index) => (
            <div key={index} className="group relative card-modern p-10 text-center hover:bg-brand-grad hover:[box-shadow:0_22px_50px_-22px_rgba(8,145,178,0.45)]">
              <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-mint/20 text-mint transition-colors group-hover:border-white/30 group-hover:text-white bg-transparent">
                <IconMap name={item.icon} className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-xl font-bold text-slate-900 group-hover:text-white transition-colors">{item.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600 group-hover:text-white/90 transition-colors">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
