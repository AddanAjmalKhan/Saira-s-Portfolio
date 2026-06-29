import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { getProfile, getNavItems, getSocialLinks } from "@/lib/content";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const dynamic = "force-dynamic";

const inter = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  const name = profile?.name ?? "Portfolio";
  const title = profile?.title ?? "";
  return {
    title: title ? `${name} — ${title}` : name,
    description: profile?.summary,
    keywords: [
      name,
      "Air Forensics",
      "environmental DNA",
      "eDNA",
      "genomics",
      "plant pathology",
      "bioinformatics",
      "Marie Skłodowska-Curie",
    ],
    authors: [{ name }],
    openGraph: {
      title: title ? `${name} — ${title}` : name,
      description: profile?.tagline,
      type: "profile",
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, navItems, socials] = await Promise.all([
    getProfile(),
    getNavItems(),
    getSocialLinks(),
  ]);
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable}`}
    >
      <body className="flex min-h-screen flex-col" suppressHydrationWarning>
        <Navbar navItems={navItems} />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer navItems={navItems} profile={profile} socials={socials} />
      </body>
    </html>
  );
}
