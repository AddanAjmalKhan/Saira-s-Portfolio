import { prisma } from "@/lib/prisma";
import type { MapLocation } from "@/lib/types";

// Centralised, typed content queries for the public site. Every page reads
// through these so a single DATABASE_URL drives the whole portfolio.

export async function getProfile() {
  return prisma.profile.findUnique({ where: { id: "profile" } });
}

export async function getNavItems() {
  return prisma.navItem.findMany({ orderBy: { order: "asc" } });
}

export async function getSocialLinks() {
  return prisma.socialLink.findMany({ orderBy: { order: "asc" } });
}

export async function getProjectLogos() {
  return prisma.projectLogo.findMany({ orderBy: { order: "asc" } });
}

export async function getQuickFacts() {
  return prisma.quickFact.findMany({ orderBy: { order: "asc" } });
}

export async function getEducation() {
  return prisma.education.findMany({ orderBy: { order: "asc" } });
}

export async function getExperience() {
  return prisma.experience.findMany({ orderBy: { order: "asc" } });
}

export async function getPublications() {
  return prisma.publication.findMany({ orderBy: { order: "asc" } });
}

export async function getTrainings() {
  return prisma.training.findMany({ orderBy: { order: "asc" } });
}

export async function getSkillGroups() {
  return prisma.skillGroup.findMany({ orderBy: { order: "asc" } });
}

export async function getLanguages() {
  return prisma.language.findMany({ orderBy: { order: "asc" } });
}

export async function getReferences() {
  return prisma.reference.findMany({ orderBy: { order: "asc" } });
}

export async function getHonours() {
  return prisma.honour.findMany({ orderBy: { order: "asc" } });
}

export async function getSummerSchools() {
  return prisma.summerSchool.findMany({ orderBy: { order: "asc" } });
}

export async function getConferences() {
  return prisma.conference.findMany({ orderBy: { order: "asc" } });
}

export async function getMemberships() {
  return prisma.membership.findMany({ orderBy: { order: "asc" } });
}

export async function getNews() {
  return prisma.newsItem.findMany({ orderBy: { order: "asc" } });
}

export async function getGallery() {
  return prisma.galleryImage.findMany({ orderBy: { order: "asc" } });
}

export async function getResearchInterests() {
  return prisma.researchInterest.findMany({ orderBy: { order: "asc" } });
}

export async function getCollaborations() {
  return prisma.collaboration.findMany({ orderBy: { order: "asc" } });
}

/** Map locations mapped to the shape the map components expect (id = slug, coordinates tuple). */
export async function getMapLocations(): Promise<MapLocation[]> {
  const rows = await prisma.mapLocation.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({
    id: r.slug,
    city: r.city,
    country: r.country,
    coordinates: [r.lng, r.lat],
    role: r.role,
    detail: r.detail,
    period: r.period,
  }));
}

/** Editable page text blocks, returned as a key -> block map for easy lookup. */
export async function getPageContent() {
  const rows = await prisma.pageContent.findMany();
  const map: Record<
    string,
    { eyebrow: string | null; heading: string | null; subheading: string | null; body: string | null }
  > = {};
  for (const r of rows)
    map[r.key] = { eyebrow: r.eyebrow, heading: r.heading, subheading: r.subheading, body: r.body };
  return map;
}
