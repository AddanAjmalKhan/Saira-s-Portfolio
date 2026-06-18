import { profile } from "@/data/profile";

export default function ContactPage() {
    <main className="min-h-screen bg-night pt-32 pb-20 sm:pt-40">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h1 className="mb-4 font-display text-4xl font-bold tracking-tight text-forest-900 sm:text-5xl text-center">
          Dont worry for contact <br />
          <span className="text-mint">i`m available</span>
        </h1>
        <p className="mb-16 text-center text-ink-soft max-w-2xl mx-auto mt-6">
          Interested in academic collaboration, discussing research findings, or offering opportunities? Feel free to reach out.
        </p>
        
        <div className="grid gap-12 md:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-mint shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div>
                <h3 className="mb-1 text-lg font-bold text-forest-900">Phone</h3>
                <p className="text-ink-soft font-medium">{profile.phone}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-mint shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div>
                <h3 className="mb-1 text-lg font-bold text-forest-900">Email</h3>
                <a href={`mailto:${profile.email}`} className="text-ink-soft font-medium hover:text-mint">{profile.email}</a>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-mint shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <h3 className="mb-1 text-lg font-bold text-forest-900">Location</h3>
                <p className="text-ink-soft text-sm font-medium leading-relaxed">
                  Home: Santiago del Estero 639 Sur,<br/>J5400 San Juan (Argentina)
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 pt-4">
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-forest-900 shadow-sm transition-colors hover:bg-mint hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href={profile.researchgate} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-forest-900 shadow-sm transition-colors hover:bg-mint hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              </a>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="rounded-md bg-white p-8 shadow-sm border border-forest-50">
            <h3 className="mb-6 text-xl font-bold text-forest-900">Send a Message</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-forest-700">Name</label>
                <input type="text" id="name" className="w-full rounded-md border border-forest-100 bg-night px-4 py-3 text-forest-900 outline-none focus:border-mint focus:ring-1 focus:ring-mint" placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-forest-700">Email</label>
                <input type="email" id="email" className="w-full rounded-md border border-forest-100 bg-night px-4 py-3 text-forest-900 outline-none focus:border-mint focus:ring-1 focus:ring-mint" placeholder="your.email@example.com" />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-forest-700">Message</label>
                <textarea id="message" rows={4} className="w-full rounded-md border border-forest-100 bg-night px-4 py-3 text-forest-900 outline-none focus:border-mint focus:ring-1 focus:ring-mint" placeholder="Your message..."></textarea>
              </div>
              <button type="button" className="w-full rounded-md bg-mint px-4 py-3 font-semibold text-white transition-colors hover:bg-mint/90 shadow-sm mt-4">
                Contact Me Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
