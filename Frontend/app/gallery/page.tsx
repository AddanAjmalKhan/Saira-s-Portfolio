import { getGallery, getPageContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const [images, pages] = await Promise.all([getGallery(), getPageContent()]);
  const block = pages["gallery"];

  return (
    <main className="min-h-screen pt-32 pb-20 sm:pt-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h1 className="mb-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl text-center">
          {block?.heading ? block.heading : (<>Academic <span className="text-gradient">Gallery</span></>)}
        </h1>
        <p className="text-center text-slate-300 mb-16 max-w-2xl mx-auto">
          {block?.subheading ??
            "A visual journey through my international research, laboratory work, conferences, and field experiences."}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, index) => (
            <div key={index} className="group relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-xl">
              <div className="absolute inset-0 flex items-center justify-center text-cyan-300/60 bg-white/[0.02] group-hover:scale-105 transition-transform duration-500">
                {/^https?:\/\//i.test(img.imageUrl) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={img.imageUrl} alt={img.caption} className="h-full w-full object-cover" />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                )}
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
