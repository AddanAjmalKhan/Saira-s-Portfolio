import Link from "next/link";
import { getCollaborations, getPageContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function CollaborationsPage() {
  const [currentProjects, pages] = await Promise.all([getCollaborations(), getPageContent()]);
  const intro = pages["collaborations"];
  const cta = pages["collaborations-cta"];

  return (
    <main className="min-h-screen bg-[#f6f8fb] pt-32 pb-20 sm:pt-40">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h1 className="mb-6 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          {intro?.heading ? intro.heading : (<>Research <span className="text-gradient">Collaborations</span></>)}
        </h1>
        <p className="mb-16 text-lg text-slate-600 max-w-3xl">
          {intro?.subheading ??
            "I actively collaborate with universities, research institutes, and international organizations to advance science in air forensics, plant pathology, and genomic surveillance."}
        </p>
        
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-8 text-2xl font-bold text-slate-900 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mint"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              Current Collaborations
            </h2>
            <div className="space-y-6">
              {currentProjects.map((project, index) => (
                <div key={index} className="card-modern p-6">
                  <h3 className="mb-2 text-xl font-semibold text-mint">{project.title}</h3>
                  <p className="mb-3 text-sm font-medium text-slate-900">{project.partner}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="card-modern flex flex-col items-center justify-center p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-mint mb-6"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">{cta?.heading ?? "Open for Collaboration"}</h2>
            <p className="mb-8 text-slate-600">
              {cta?.body ??
                "Interested in partnering on projects related to eDNA, plant pathology, bioinformatics, or biosecurity? Let's explore how we can work together."}
            </p>
            <Link href="/contact" className="btn-grad px-8">
              Contact for Collaboration
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
