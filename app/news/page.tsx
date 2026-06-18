export default function NewsPage() {
  const news = [
    {
      date: "March 2026",
      title: "Started MSCA PhD Fellowship",
      category: "Career",
      description: "Began my journey as a Marie Skłodowska-Curie Fellow within the MSCA Natural Traces project at the National University of San Juan, Argentina, focusing on Air Forensics.",
      image: "academic"
    },
    {
      date: "February 2025",
      title: "Seed of Innovation Research Symposium",
      category: "Conference",
      description: "Participated in the Seed of Innovation Research Symposium organized by DAFNE department, University of Tuscia, Italy.",
      image: "conference"
    },
    {
      date: "September 2024",
      title: "Erasmus+ Scholarship Awarded",
      category: "Award",
      description: "Received the European Commission Scholarship to study my MSc 3rd Semester at the Hungarian University of Agriculture and Life Sciences.",
      image: "award"
    }
  ];

  return (
    <main className="min-h-screen bg-night pt-32 pb-20 sm:pt-40">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h1 className="mb-12 font-display text-4xl font-bold tracking-tight text-forest-900 sm:text-5xl">
          News & <span className="text-mint">Updates</span>
        </h1>
        
        <div className="grid gap-8">
          {news.map((item, index) => (
            <div key={index} className="group relative flex flex-col sm:flex-row gap-6 rounded-md border border-forest-50 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-mint/30">
              <div className="flex h-48 w-full shrink-0 items-center justify-center rounded-md bg-forest-50 sm:h-auto sm:w-48 text-mint group-hover:text-white group-hover:bg-mint transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/></svg>
              </div>
              <div className="flex flex-col justify-center">
                <div className="mb-2 flex items-center gap-3">
                  <span className="rounded-full bg-mint/10 px-3 py-1 text-xs font-semibold text-mint">{item.category}</span>
                  <span className="text-sm font-medium text-forest-700">{item.date}</span>
                </div>
                <h3 className="mb-3 text-xl font-bold text-forest-900 group-hover:text-mint transition-colors">{item.title}</h3>
                <p className="text-ink-soft leading-relaxed text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
