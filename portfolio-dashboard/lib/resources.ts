// Central registry describing every editable content type.
// The list pages, edit forms, and CRUD API routes are all generated from this,
// so changing a field is a one-line edit here.

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "url"
  | "email"
  | "list" // string[] (add/remove rows)
  | "image" // Cloudinary upload + URL (single)
  | "images" // string[] of image URLs (multiple uploads)
  | "select";

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[]; // for select
  placeholder?: string;
  help?: string;
  /** Show this field as a column in the list table. */
  listColumn?: boolean;
}

export interface ResourceDef {
  slug: string; // URL + API segment
  model: string; // Prisma delegate name (camelCase)
  label: string; // singular
  labelPlural: string;
  group: string; // sidebar grouping
  fields: FieldDef[];
  /** Singleton resources have exactly one row and no create/delete. */
  singleton?: boolean;
  singletonId?: string;
}

const orderField: FieldDef = {
  name: "order",
  label: "Display order",
  type: "number",
  help: "Lower numbers appear first.",
};

export const resources: Record<string, ResourceDef> = {
  profile: {
    slug: "profile",
    model: "profile",
    label: "Profile",
    labelPlural: "Profile",
    group: "Identity",
    singleton: true,
    singletonId: "profile",
    fields: [
      { name: "name", label: "Full name", type: "text", required: true, listColumn: true },
      { name: "title", label: "Title / role", type: "text", required: true },
      { name: "affiliation", label: "Affiliation", type: "text", required: true },
      { name: "tagline", label: "Tagline", type: "textarea", required: true },
      { name: "summary", label: "Summary / bio", type: "textarea", required: true },
      { name: "nationality", label: "Nationality", type: "text", required: true },
      { name: "location", label: "Location", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone", type: "text", required: true },
      { name: "linkedin", label: "LinkedIn URL", type: "url" },
      { name: "researchgate", label: "ResearchGate URL", type: "url" },
      { name: "projectName", label: "Project name", type: "text" },
      { name: "projectUrl", label: "Project URL", type: "url" },
      { name: "profileImageUrl", label: "Profile photo", type: "image" },
    ],
  },

  quickFacts: {
    slug: "quickFacts",
    model: "quickFact",
    label: "Quick fact",
    labelPlural: "Quick facts",
    group: "Identity",
    fields: [
      { name: "label", label: "Label", type: "text", required: true, listColumn: true },
      { name: "value", label: "Value", type: "text", required: true, listColumn: true },
      orderField,
    ],
  },

  navItems: {
    slug: "navItems",
    model: "navItem",
    label: "Navigation item",
    labelPlural: "Navigation",
    group: "Identity",
    fields: [
      { name: "label", label: "Label", type: "text", required: true, listColumn: true },
      { name: "href", label: "Link (href)", type: "text", required: true, listColumn: true, placeholder: "/about" },
      orderField,
    ],
  },

  socialLinks: {
    slug: "socialLinks",
    model: "socialLink",
    label: "Social link",
    labelPlural: "Social links",
    group: "Identity",
    fields: [
      { name: "label", label: "Label", type: "text", required: true, listColumn: true, placeholder: "LinkedIn" },
      { name: "url", label: "URL", type: "text", required: true, listColumn: true, placeholder: "https://… or mailto:you@example.com" },
      {
        name: "icon",
        label: "Built-in icon",
        type: "select",
        options: ["linkedin", "researchgate", "email", "github", "twitter", "orcid", "scholar", "website"],
        listColumn: true,
        help: "Used if no custom logo is uploaded. Choose 'website' for a generic link icon.",
      },
      { name: "iconUrl", label: "Custom logo (optional)", type: "image", help: "Upload a logo to override the built-in icon." },
      orderField,
    ],
  },

  education: {
    slug: "education",
    model: "education",
    label: "Education entry",
    labelPlural: "Education",
    group: "Background",
    fields: [
      { name: "title", label: "Degree / title", type: "text", required: true, listColumn: true },
      { name: "organisation", label: "Institution", type: "text", required: true, listColumn: true },
      { name: "period", label: "Period", type: "text", required: true, listColumn: true, placeholder: "Oct 2023 — Sep 2025" },
      { name: "location", label: "Location", type: "text", required: true },
      { name: "logoUrl", label: "University logo", type: "image", help: "Upload the institution's logo (shown on the Education page)." },
      { name: "grade", label: "Grade", type: "text", placeholder: "110/110 with Honour" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "highlights", label: "Highlights", type: "list" },
      { name: "tags", label: "Tags", type: "list" },
      { name: "degree", label: "Degree (alt label)", type: "text", help: "Optional alternate label used on some pages." },
      { name: "university", label: "University (alt label)", type: "text", help: "Optional alternate label used on some pages." },
      orderField,
    ],
  },

  experience: {
    slug: "experience",
    model: "experience",
    label: "Experience entry",
    labelPlural: "Experience",
    group: "Background",
    fields: [
      { name: "title", label: "Role / title", type: "text", required: true, listColumn: true },
      { name: "organisation", label: "Organisation", type: "text", required: true, listColumn: true },
      { name: "period", label: "Period", type: "text", required: true, listColumn: true },
      { name: "location", label: "Location", type: "text", required: true },
      { name: "highlights", label: "Highlights", type: "list" },
      { name: "tags", label: "Tags", type: "list" },
      orderField,
    ],
  },

  publications: {
    slug: "publications",
    model: "publication",
    label: "Publication",
    labelPlural: "Publications",
    group: "Research",
    fields: [
      { name: "title", label: "Title", type: "textarea", required: true, listColumn: true },
      { name: "authors", label: "Authors", type: "textarea", required: true },
      { name: "year", label: "Year", type: "text", required: true, listColumn: true },
      { name: "venue", label: "Venue (display string)", type: "text", required: true, help: "e.g. Journal of X, Vol. 46, pp. 38–47" },
      { name: "journal", label: "Journal", type: "text" },
      { name: "volume", label: "Volume", type: "text" },
      { name: "issue", label: "Issue", type: "text" },
      { name: "pages", label: "Pages", type: "text" },
      { name: "doi", label: "DOI / link", type: "text" },
      orderField,
    ],
  },

  trainings: {
    slug: "trainings",
    model: "training",
    label: "Training",
    labelPlural: "Trainings",
    group: "Research",
    fields: [
      { name: "title", label: "Title", type: "textarea", required: true, listColumn: true },
      { name: "institution", label: "Institution", type: "text", listColumn: true },
      { name: "country", label: "Country", type: "text", listColumn: true },
      { name: "duration", label: "Year / duration", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "images", label: "Images (up to 3)", type: "images", help: "Optional photos shown with this entry." },
      orderField,
    ],
  },

  skillGroups: {
    slug: "skillGroups",
    model: "skillGroup",
    label: "Skill group",
    labelPlural: "Skill groups",
    group: "Background",
    fields: [
      { name: "title", label: "Group title", type: "text", required: true, listColumn: true },
      { name: "items", label: "Skills", type: "list" },
      orderField,
    ],
  },

  languages: {
    slug: "languages",
    model: "language",
    label: "Language",
    labelPlural: "Languages",
    group: "Background",
    fields: [
      { name: "name", label: "Language", type: "text", required: true, listColumn: true },
      { name: "level", label: "Level", type: "text", required: true, listColumn: true, placeholder: "Proficient" },
      { name: "value", label: "Proficiency (0-100)", type: "number", required: true },
      orderField,
    ],
  },

  references: {
    slug: "references",
    model: "reference",
    label: "Reference",
    labelPlural: "References",
    group: "Background",
    fields: [
      { name: "name", label: "Name", type: "text", required: true, listColumn: true },
      { name: "role", label: "Role", type: "text", required: true },
      { name: "affiliation", label: "Affiliation", type: "textarea", required: true },
      { name: "email", label: "Email", type: "email", required: true, listColumn: true },
      orderField,
    ],
  },

  honours: {
    slug: "honours",
    model: "honour",
    label: "Honour / award",
    labelPlural: "Honours & awards",
    group: "Achievements",
    fields: [
      { name: "title", label: "Title", type: "text", required: true, listColumn: true },
      { name: "detail", label: "Detail", type: "textarea", required: true },
      { name: "year", label: "Year", type: "text", required: true, listColumn: true },
      { name: "imageUrl", label: "Logo / main image", type: "image" },
      { name: "images", label: "More images (up to 3)", type: "images", help: "Optional extra photos shown with this award." },
      orderField,
    ],
  },

  summerSchools: {
    slug: "summerSchools",
    model: "summerSchool",
    label: "Summer school",
    labelPlural: "Summer schools",
    group: "Achievements",
    fields: [
      { name: "title", label: "Title", type: "text", required: true, listColumn: true },
      { name: "host", label: "Host", type: "text", required: true, listColumn: true },
      { name: "location", label: "Location", type: "text", required: true },
      { name: "period", label: "Period", type: "text", required: true },
      { name: "highlights", label: "Highlights", type: "list" },
      { name: "images", label: "Images (up to 3)", type: "images", help: "Optional photos shown with this entry." },
      orderField,
    ],
  },

  conferences: {
    slug: "conferences",
    model: "conference",
    label: "Conference / event",
    labelPlural: "Conferences & events",
    group: "Achievements",
    fields: [
      { name: "title", label: "Title", type: "textarea", required: true, listColumn: true },
      { name: "organiser", label: "Organiser", type: "text", required: true, listColumn: true },
      { name: "date", label: "Date", type: "text", required: true, listColumn: true },
      { name: "images", label: "Images (up to 3)", type: "images", help: "Optional photos shown with this entry." },
      orderField,
    ],
  },

  memberships: {
    slug: "memberships",
    model: "membership",
    label: "Membership",
    labelPlural: "Memberships",
    group: "Achievements",
    fields: [
      { name: "name", label: "Organisation", type: "text", required: true, listColumn: true },
      { name: "detail", label: "Detail", type: "textarea" },
      orderField,
    ],
  },

  mapLocations: {
    slug: "mapLocations",
    model: "mapLocation",
    label: "Map location",
    labelPlural: "Map locations",
    group: "Research",
    fields: [
      { name: "city", label: "City", type: "text", required: true, listColumn: true },
      { name: "country", label: "Country", type: "text", required: true, listColumn: true },
      { name: "slug", label: "Slug (unique id)", type: "text", required: true, placeholder: "san-juan" },
      { name: "lng", label: "Longitude", type: "number", required: true },
      { name: "lat", label: "Latitude", type: "number", required: true },
      { name: "role", label: "Role", type: "text", required: true },
      { name: "detail", label: "Detail", type: "textarea", required: true },
      { name: "period", label: "Period", type: "text", required: true },
      orderField,
    ],
  },

  news: {
    slug: "news",
    model: "newsItem",
    label: "News item",
    labelPlural: "News & updates",
    group: "Content pages",
    fields: [
      { name: "title", label: "Title", type: "text", required: true, listColumn: true },
      { name: "category", label: "Category", type: "text", required: true, listColumn: true, placeholder: "Career / Award / Conference" },
      { name: "date", label: "Date", type: "text", required: true, listColumn: true, placeholder: "March 2026" },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "imageUrl", label: "Main image", type: "image" },
      { name: "images", label: "More images (up to 3)", type: "images", help: "Optional extra photos shown with this update." },
      orderField,
    ],
  },

  gallery: {
    slug: "gallery",
    model: "galleryImage",
    label: "Gallery image",
    labelPlural: "Gallery",
    group: "Content pages",
    fields: [
      { name: "imageUrl", label: "Image", type: "image", required: true },
      { name: "caption", label: "Caption", type: "text", required: true, listColumn: true },
      orderField,
    ],
  },

  researchInterests: {
    slug: "researchInterests",
    model: "researchInterest",
    label: "Research interest",
    labelPlural: "Research interests",
    group: "Content pages",
    fields: [
      { name: "title", label: "Title", type: "text", required: true, listColumn: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "icon", label: "Icon", type: "select", options: ["dna", "leaf", "database", "shield"], required: true },
      orderField,
    ],
  },

  collaborations: {
    slug: "collaborations",
    model: "collaboration",
    label: "Collaboration",
    labelPlural: "Collaborations",
    group: "Content pages",
    fields: [
      { name: "title", label: "Title", type: "text", required: true, listColumn: true },
      { name: "partner", label: "Partner", type: "text", required: true, listColumn: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      orderField,
    ],
  },

  projectLogos: {
    slug: "projectLogos",
    model: "projectLogo",
    label: "Project logo",
    labelPlural: "Project logos (home strip)",
    group: "Content pages",
    fields: [
      { name: "name", label: "Name", type: "text", required: true, listColumn: true, help: "Used as the logo's alt text." },
      { name: "logoUrl", label: "Logo", type: "image", required: true },
      { name: "url", label: "Link (optional)", type: "url" },
      orderField,
    ],
  },

  projects: {
    slug: "projects",
    model: "project",
    label: "Project",
    labelPlural: "Projects",
    group: "Content pages",
    fields: [
      { name: "name", label: "Project name", type: "text", required: true, listColumn: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "logoUrl", label: "Project logo", type: "image" },
      { name: "url", label: "Link (optional)", type: "url" },
      { name: "images", label: "Pictures", type: "images", help: "Project photos / screenshots (shown in a gallery)." },
      orderField,
    ],
  },

  visitorWidget: {
    slug: "visitorWidget",
    model: "visitorWidget",
    label: "Visitors widget",
    labelPlural: "Visitors widget",
    group: "Content pages",
    singleton: true,
    singletonId: "visitor",
    fields: [
      { name: "heading", label: "Section heading", type: "text", required: true },
      {
        name: "enabled",
        label: "Show on home page",
        type: "select",
        options: ["on", "off"],
        required: true,
        help: "Shows the 'viewed from around the world' strip above the footer on the home page.",
      },
    ],
  },

  countryVisits: {
    slug: "countryVisits",
    model: "countryVisit",
    label: "Visitor stat",
    labelPlural: "Visitor stats (by country)",
    group: "Content pages",
    fields: [
      { name: "country", label: "Country code", type: "text", required: true, listColumn: true, help: "ISO 2-letter code, e.g. AU, IT, PK." },
      { name: "count", label: "Visitors", type: "number", required: true, listColumn: true },
    ],
  },

  pageContent: {
    slug: "pageContent",
    model: "pageContent",
    label: "Page text block",
    labelPlural: "Page text blocks",
    group: "Content pages",
    fields: [
      { name: "key", label: "Key (page id)", type: "text", required: true, listColumn: true, help: "Identifier used by the site (e.g. education, publications). Don't change existing keys." },
      { name: "eyebrow", label: "Eyebrow (small label above heading)", type: "text" },
      { name: "heading", label: "Heading", type: "text", listColumn: true },
      { name: "subheading", label: "Subheading / intro", type: "textarea" },
      { name: "body", label: "Body", type: "textarea" },
    ],
  },
};

export const LIST_FIELD = "list";

/** Sidebar groups in display order. */
export const GROUP_ORDER = [
  "Identity",
  "Background",
  "Research",
  "Achievements",
  "Content pages",
];

export function getResource(slug: string): ResourceDef | undefined {
  return resources[slug];
}

export function isArrayField(f: FieldDef): boolean {
  return f.type === "list" || f.type === "images";
}

export function isNumberField(f: FieldDef): boolean {
  return f.type === "number";
}
