import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { resources, GROUP_ORDER } from "@/lib/resources";

export const dynamic = "force-dynamic";

export default async function AdminOverview() {
  const counts: Record<string, number> = {};
  await Promise.all(
    Object.values(resources)
      .filter((r) => !r.singleton)
      .map(async (r) => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          counts[r.slug] = await (prisma as any)[r.model].count();
        } catch {
          counts[r.slug] = 0;
        }
      }),
  );

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-white">Welcome back 👋</h1>
        <p className="mt-1 text-sm text-white/50">
          Manage every section of your portfolio. Changes appear on the public site instantly.
        </p>
      </div>

      {GROUP_ORDER.map((group) => {
        const items = Object.values(resources).filter((r) => r.group === group);
        if (!items.length) return null;
        return (
          <section key={group} className="mb-9">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
              {group}
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {items.map((r) => (
                <Link
                  key={r.slug}
                  href={r.singleton ? `/admin/${r.slug}/edit` : `/admin/${r.slug}`}
                  className="group relative rounded-2xl border border-white/10 bg-white/[0.05] p-4 shadow-xl backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-brand-light/40 hover:bg-white/[0.08]"
                >
                  <div className="relative">
                    <span className="text-sm font-medium text-white/75">{r.labelPlural}</span>
                    <div className="mt-3 flex items-end justify-between">
                      <span className="text-2xl font-bold text-white">
                        {r.singleton ? (
                          <span className="text-base font-semibold text-brand-light">Edit</span>
                        ) : (
                          counts[r.slug] ?? 0
                        )}
                      </span>
                      <span className="text-brand-light opacity-0 transition-opacity group-hover:opacity-100">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
