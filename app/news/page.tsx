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
  const getIcon = (imageName: string) => {
    switch (imageName) {
      case "academic":
        return <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>;
      case "conference":
        return <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
      case "award":
        return <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>;
      default:
        return <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/></svg>;
    }
  };

  return (
    <main className="min-h-screen bg-[#f6f8fb] pt-32 pb-20 sm:pt-40">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h1 className="mb-12 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          News & Updates
        </h1>
        
        <div className="grid gap-8">
          {news.map((item, index) => (
            <div key={index} className="group relative flex flex-col sm:flex-row gap-6 rounded-md border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-900 hover:bg-slate-900">
              <div className="flex h-48 w-full shrink-0 items-center justify-center rounded-md bg-mint/10 sm:h-auto sm:w-48 text-mint group-hover:text-white group-hover:bg-white/10 transition-colors">
                 {getIcon(item.image)}
              </div>
              <div className="flex flex-col justify-center">
                <div className="mb-2 flex items-center gap-3">
                  <span className="rounded-full bg-mint/10 px-3 py-1 text-xs font-semibold text-mint transition-colors group-hover:bg-white/10 group-hover:text-white">{item.category}</span>
                  <span className="text-sm font-medium text-mint transition-colors group-hover:text-mint/80">{item.date}</span>
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-white">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm transition-colors group-hover:text-slate-300">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
