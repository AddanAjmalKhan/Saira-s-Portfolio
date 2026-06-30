import Hero from "@/components/sections/Hero";
import CurrentProjects from "@/components/sections/CurrentProjects";
import VisitorsStrip from "@/components/sections/VisitorsStrip";
import VisitorTracker from "@/components/VisitorTracker";
import { getProfile, getSocialLinks, getProjectLogos } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [profile, socials, projects] = await Promise.all([
    getProfile(),
    getSocialLinks(),
    getProjectLogos(),
  ]);
  if (!profile) return null;
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Hero profile={profile} socials={socials} />
        <CurrentProjects items={projects} />
      </div>
      <VisitorsStrip />
      <VisitorTracker />
    </>
  );
}
