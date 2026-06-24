import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import LoginForm from "@/components/LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const session = await getSession();
  const { next } = await searchParams;
  if (session) redirect(next || "/admin");

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#161a36] px-4 py-10">
      {/* Decorative background shapes */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {/* large rounded pill shapes */}
        <div className="absolute -right-24 top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rotate-45 rounded-[6rem] bg-white/[0.03]" />
        <div className="absolute right-[-6rem] top-[-6rem] h-[26rem] w-[26rem] rotate-45 rounded-[5rem] bg-white/[0.025]" />
        <div className="absolute -bottom-28 -left-24 h-[26rem] w-[26rem] rounded-full bg-white/[0.03]" />
        <div className="absolute bottom-10 left-[-3rem] h-40 w-40 rounded-full border border-white/[0.04]" />
        {/* brand glow */}
        <div className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(13,148,136,0.16),transparent_60%)]" />
        {/* little plus marks */}
        <span className="absolute left-[10%] top-[12%] text-2xl font-light text-white/15">✦</span>
        <span className="absolute left-[6%] top-[40%] h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="absolute left-[14%] top-[26%] text-xl font-light text-white/10">✚</span>
        <span className="absolute right-[14%] bottom-[18%] text-xl font-light text-white/10">✚</span>
      </div>

      <div className="relative w-full max-w-md animate-fade-in-up">
        {/* Wordmark */}
        <div className="mb-7 flex flex-col items-center text-center">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-glow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5Z" /><path d="m2 17 10 5 10-5" /><path d="m2 12 10 5 10-5" /></svg>
            </span>
            <span className="text-2xl font-bold tracking-tight text-white">
              Portfolio <span className="text-brand-light">Dashboard</span>
            </span>
          </div>
        </div>

        {/* Frosted card */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-7 shadow-2xl backdrop-blur-xl sm:p-8">
          <LoginForm next={next} />
        </div>

        <p className="mt-6 text-center text-xs text-white/30">
          Protected area · authorized users only
        </p>
      </div>
    </main>
  );
}
