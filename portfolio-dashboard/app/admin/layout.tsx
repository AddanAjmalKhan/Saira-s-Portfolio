import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import Sidebar from "@/components/Sidebar";
import LogoutButton from "@/components/LogoutButton";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="app-bg relative flex h-screen overflow-hidden text-slate-200">
      <Sidebar isAdmin={session.role === "ADMIN"} />

      <div className="relative z-10 flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-6 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gradient text-white shadow-soft">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-white">{session.name}</p>
              <p className="text-xs text-white/40">
                {session.email}
                <span className="ml-2 rounded-full bg-brand-light/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-light">
                  {session.role}
                </span>
              </p>
            </div>
          </div>
          <LogoutButton />
        </header>
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="animate-fade-in-up">{children}</div>
        </main>
      </div>
    </div>
  );
}
