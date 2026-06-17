export interface NavItem {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  summary: string;
  nationality: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  researchgate: string;
  project: { name: string; url: string };
}

export interface TimelineEntry {
  period: string;
  title: string;
  organisation: string;
  location: string;
  grade?: string;
  highlights: string[];
  tags?: string[];
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface Publication {
  authors: string;
  year: string;
  title: string;
  venue: string;
  doi?: string;
}

export interface Honour {
  title: string;
  detail: string;
  year: string;
}

export interface SummerSchool {
  period: string;
  title: string;
  host: string;
  location: string;
  highlights: string[];
}

export interface ConferenceItem {
  date: string;
  title: string;
  organiser: string;
}

export interface Membership {
  name: string;
  detail?: string;
}

export interface Reference {
  name: string;
  role: string;
  affiliation: string;
  email: string;
}

export interface MapLocation {
  id: string;
  city: string;
  country: string;
  coordinates: [number, number]; // [longitude, latitude]
  role: string;
  detail: string;
  period: string;
}
