import { profile } from "@/data/profile";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f6f8fb] pt-32 pb-20 sm:pt-40">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h1 className="mb-4 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl text-center">
          Dont worry for contact <br />
          <span className="text-mint">i`m available</span>
        </h1>
        <p className="mb-16 text-center text-slate-600 max-w-2xl mx-auto mt-6">
          Interested in academic collaboration, discussing research findings, or offering opportunities? Feel free to reach out.
        </p>
        
        {/* Contact cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Phone */}
          <a
            href={`tel:${profile.phone.replace(/\s/g, "")}`}
            className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mint/10 text-mint transition-colors group-hover:bg-mint group-hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <h3 className="mt-5 text-xs font-bold uppercase tracking-widest text-slate-600">Phone</h3>
            <p className="mt-1 font-semibold text-slate-900">{profile.phone}</p>
          </a>

          {/* Email */}
          <a
            href={`mailto:${profile.email}`}
            className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mint/10 text-mint transition-colors group-hover:bg-mint group-hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <h3 className="mt-5 text-xs font-bold uppercase tracking-widest text-slate-600">Email</h3>
            <p className="mt-1 break-all font-semibold text-slate-900 transition-colors group-hover:text-mint">{profile.email}</p>
          </a>

          {/* Location */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:col-span-2 lg:col-span-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mint/10 text-mint">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <h3 className="mt-5 text-xs font-bold uppercase tracking-widest text-slate-600">Location</h3>
            <p className="mt-1 font-semibold leading-relaxed text-slate-900">
              Santiago del Estero 639 Sur,<br />J5400 San Juan, Argentina
            </p>
          </div>
        </div>

        {/* Socials */}
        <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-600">Find me online</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-mint/10 px-5 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-mint hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              LinkedIn
            </a>
            <a
              href={profile.researchgate}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-mint/10 px-5 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-mint hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              ResearchGate
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2.5 rounded-full bg-mint/10 px-5 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-mint hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              Email
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
