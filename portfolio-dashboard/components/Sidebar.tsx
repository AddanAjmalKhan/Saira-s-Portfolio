"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { resources, GROUP_ORDER } from "@/lib/resources";

// Small inline icons per sidebar group.
const groupIcon: Record<string, React.ReactNode> = {
  Identity: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
  ),
  Background: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
  ),
  Research: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
  ),
  Achievements: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>
  ),
  "Content pages": (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>
  ),
};

export default function Sidebar({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname();

  const byGroup: Record<string, { slug: string; label: string; singleton?: boolean }[]> = {};
  for (const r of Object.values(resources)) {
    (byGroup[r.group] ||= []).push({ slug: r.slug, label: r.labelPlural, singleton: r.singleton });
  }

  function hrefFor(r: { slug: string; singleton?: boolean }) {
    return r.singleton ? `/admin/${r.slug}/edit` : `/admin/${r.slug}`;
  }
  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  const linkBase = "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors";
  const active = "bg-brand-light/15 font-medium text-brand-light";
  const idle = "text-white/55 hover:bg-white/[0.06] hover:text-white";

  return (
    <aside className="relative z-10 flex w-64 shrink-0 flex-col overflow-y-auto border-r border-white/10 bg-white/[0.03] backdrop-blur-xl">
      <div className="border-b border-white/10 px-5 py-4">
        <Link href="/admin" className="flex items-center">
          <span className="text-lg font-bold tracking-tight text-white">
            Portfolio <span className="text-brand-light">CMS</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 space-y-6 px-3 py-5 text-sm">
        <Link
          href="/admin"
          className={`${linkBase} ${pathname === "/admin" ? active : idle}`}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" /><rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" /></svg>
          Overview
        </Link>

        {GROUP_ORDER.map((group) => {
          const items = byGroup[group];
          if (!items?.length) return null;
          return (
            <div key={group}>
              <p className="mb-1.5 flex items-center gap-2 border-b border-white/10 px-3 pb-2 text-[12px] font-bold uppercase tracking-wider text-white/80">
                <span className="text-brand-light">{groupIcon[group]}</span>
                {group}
              </p>
              <div className="space-y-0.5">
                {items.map((r) => {
                  const on = isActive(`/admin/${r.slug}`);
                  return (
                    <Link key={r.slug} href={hrefFor(r)} className={`${linkBase} ${on ? active : idle}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${on ? "bg-brand-light" : "bg-white/20"}`} />
                      {r.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}

        {isAdmin && (
          <div>
            <p className="mb-1.5 flex items-center gap-2 border-b border-white/10 px-3 pb-2 text-[12px] font-bold uppercase tracking-wider text-white/80">
              <span className="text-brand-light"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /></svg></span>
              Admin
            </p>
            <Link href="/admin/users" className={`${linkBase} ${isActive("/admin/users") ? active : idle}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${isActive("/admin/users") ? "bg-brand-light" : "bg-white/20"}`} />
              Users
            </Link>
          </div>
        )}
      </nav>

      <div className="border-t border-white/10 px-5 py-3 text-[11px] text-white/30">
        Portfolio CMS · v1.0
      </div>
    </aside>
  );
}
