import { trainings } from "@/data/profile";

export default function TrainingsPage() {
  return (
    <main className="min-h-screen bg-night pt-32 pb-20 sm:pt-40">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h1 className="mb-12 font-display text-4xl font-bold tracking-tight text-forest-900 sm:text-5xl">
          International <span className="text-mint">Trainings & Courses</span>
        </h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          {trainings.map((training, index) => (
            <div key={index} className="flex flex-col justify-between rounded-md border border-forest-50 bg-white p-8 transition-transform hover:-translate-y-1 hover:border-mint/30 shadow-sm hover:shadow-md">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-forest-50 px-3 py-1 text-xs font-semibold text-mint">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                  {training.country}
                </div>
                <h3 className="mb-2 text-xl font-bold text-forest-900">{training.title}</h3>
                <p className="mb-4 font-medium text-forest-700 text-sm">{training.institution}</p>
                {training.description && (
                  <p className="text-ink-soft text-sm leading-relaxed mb-6">{training.description}</p>
                )}
              </div>
              <div className="flex items-center gap-2 mt-auto pt-4 border-t border-forest-50 text-forest-700 text-sm font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                {training.duration}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
