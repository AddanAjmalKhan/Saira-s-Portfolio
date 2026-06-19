import { trainings } from "@/data/profile";
import Reveal from "@/components/ui/Reveal";
import Aurora from "@/components/ui/Aurora";
import { GlobeIcon } from "@/components/ui/icons";
import ResearchMapSection from "@/components/sections/ResearchMapSection";

export default function TrainingsPage() {
  return (
    <main className="min-h-screen bg-night pt-32 pb-20 sm:pt-40 relative overflow-hidden">
      <Aurora />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 relative z-10">
        <Reveal from="up">
          <span className="inline-flex items-center gap-2 font-mono text-[0.7rem] font-semibold uppercase tracking-ultra text-mint mb-4">
            <span className="h-px w-8 bg-current opacity-50" aria-hidden />
            Global Experience
          </span>
          <h1 className="mb-16 font-display text-4xl font-bold tracking-tight text-forest-900 sm:text-5xl">
            International <span className="text-mint">Trainings & Courses</span>
          </h1>
        </Reveal>
        
        <div className="grid gap-6 md:grid-cols-2">
          {trainings.map((training, index) => (
            <Reveal key={index} delay={index * 100} from="up" as="div" className="h-full">
              <div className="h-full flex flex-col justify-between bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-forest-100 hover:shadow-xl hover:border-mint/30 transition-all duration-300 group">
                <div>
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-mint/10 px-4 py-1.5 text-xs font-semibold text-mint group-hover:bg-mint group-hover:text-white transition-colors">
                    <GlobeIcon width={14} height={14} />
                    {training.country}
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-forest-900 leading-tight">{training.title}</h3>
                  <p className="mb-5 font-semibold text-forest-700 text-sm flex items-center gap-2">
                    <span className="w-4 h-px bg-forest-300"></span>
                    {training.institution}
                  </p>
                  {training.description && (
                    <p className="text-ink-soft text-base leading-relaxed mb-8">{training.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-auto pt-5 border-t border-forest-100/60 text-forest-500 text-sm font-semibold">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  {training.duration}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Research Map Section */}
      <div className="relative z-10 mt-24 sm:mt-32 border-t border-forest-100">
        <ResearchMapSection />
      </div>
    </main>
  );
}
