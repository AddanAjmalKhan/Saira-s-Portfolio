import type { Profile, NavItem, Reference } from "@/lib/types";

export const profile: Profile = {
  name: "Saira Adnan",
  title: "PhD Researcher in Air Forensics",
  tagline:
    "Combining human and non-human environmental DNA (eDNA) to read the stories the air carries.",
  summary:
    "Marie Skłodowska-Curie Fellow and molecular biologist working at the intersection of forensic genetics, plant pathology and bioinformatics. I build genomes, trace pathogens and turn environmental signals into evidence — from peach-tree pathosystems in Italy to air-borne eDNA in Argentina.",
  nationality: "Pakistani",
  location: "San Juan, Argentina",
  email: "s.adnan@unsj-cuim.edu.ar",
  phone: "+54 9 2646 707615",
  linkedin: "https://www.linkedin.com/in/saira1997/",
  researchgate: "https://www.researchgate.net/profile/Saira-Adnan-4",
  project: { name: "MSCA Natural Traces", url: "https://naturaltraces.com/" },
};

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Journey", href: "#journey" },
  { label: "Skills", href: "#skills" },
  { label: "Publications", href: "#publications" },
  { label: "Contact", href: "#contact" },
];

export const references: Reference[] = [
  {
    name: "Prof. Henk R. Braig",
    role: "Associate Professor — PhD Supervisor",
    affiliation:
      "Institute and Museum of Natural Sciences, National University of San Juan, Argentina",
    email: "henkbraig@unsj-cuim.edu.ar",
  },
  {
    name: "Dr. Leonardo Diaz Nieto",
    role: "Associate Professor — PhD Supervisor",
    affiliation:
      "Institute and Museum of Natural Sciences, National University of San Juan, Argentina",
    email: "ldiaznieto@unsj-cuim.edu.ar",
  },
];

export const quickFacts = [
  { label: "Current role", value: "Marie Skłodowska-Curie PhD Fellow" },
  { label: "Field", value: "Air Forensics · eDNA · Genomics" },
  { label: "Based in", value: "San Juan, Argentina" },
  { label: "Languages", value: "Urdu · English · Italian" },
];
