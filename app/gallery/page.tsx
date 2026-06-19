export default function GalleryPage() {
  const images = [
    { src: "/images/conference1.jpg", caption: "International Conference on Forests in Women's Hands, Slovenia" },
    { src: "/images/lab1.jpg", caption: "DNA Extraction at Plant Pathology Lab, University of Tuscia" },
    { src: "/images/field1.jpg",  caption: "Climate Farm Demo Project, Slovenia" },
    { src: "/images/training1.jpg", caption: "Plant Health in the wake of AI Summer School, Italy" },
    { src: "/images/presentation.jpg", caption: "Research Presentation" },
    { src: "/images/lab2.jpg", caption: "Microbial Culture Maintenance" },
  ];

  return (
    <main className="min-h-screen bg-[#f6f8fb] pt-32 pb-20 sm:pt-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h1 className="mb-4 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl text-center">
          Academic <span className="text-mint">Gallery</span>
        </h1>
        <p className="text-center text-slate-600 mb-16 max-w-2xl mx-auto">
          A visual journey through my international research, laboratory work, conferences, and field experiences.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, index) => (
            <div key={index} className="group relative overflow-hidden rounded-md bg-white aspect-square border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="absolute inset-0 flex items-center justify-center text-mint bg-white group-hover:scale-105 transition-transform duration-500">
                {/* Fallback icon since actual images don't exist yet */}
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900 via-forest-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white font-medium text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {img.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
