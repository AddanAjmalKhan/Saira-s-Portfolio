import { education } from "@/data/profile";

export default function EducationPage() {
  return (
    <main className="min-h-screen bg-night pt-32 pb-20 sm:pt-40">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h1 className="mb-12 font-display text-4xl font-bold tracking-tight text-forest-900 sm:text-5xl">
          Academic <span className="text-mint">Education</span>
        </h1>
        
        <div className="relative border-l-2 border-mint/30 pl-8 space-y-12">
          {education.map((item, index) => (
            <div key={index} className="relative group bg-white p-8 rounded-md shadow-sm border border-forest-50 hover:shadow-md transition-shadow">
              <div className="absolute -left-[41px] top-8 h-5 w-5 rounded-full border-4 border-night bg-mint transition-transform group-hover:scale-125" />
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
                <h3 className="text-xl font-bold text-forest-900">{item.degree}</h3>
                <span className="text-mint text-sm font-semibold tracking-wider">
                  {item.period}
                </span>
              </div>
              <h4 className="text-lg font-medium text-forest-700 mb-3">{item.university} — {item.location}</h4>
              <p className="text-ink-soft leading-relaxed text-base">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
