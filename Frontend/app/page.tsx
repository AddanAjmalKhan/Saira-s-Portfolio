import Hero from "@/components/sections/Hero";
import { getProfile } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const profile = await getProfile();
  if (!profile) return null;
  return <Hero profile={profile} />;
}
