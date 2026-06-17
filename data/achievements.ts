import type {
  Honour,
  SummerSchool,
  ConferenceItem,
  Membership,
} from "@/lib/types";

export const honours: Honour[] = [
  {
    title: "Marie Skłodowska-Curie PhD Scholarship",
    detail: "Funded under the MSCA Natural Traces project.",
    year: "2026",
  },
  {
    title: "Erasmus+ Scholarship",
    detail: "Awarded by the European Commission for a semester exchange.",
    year: "2024",
  },
  {
    title: "International Merit Scholarship",
    detail: "For the master's degree at the University of Tuscia, Italy.",
    year: "2023",
  },
  {
    title: "9th Position — Scholarship Examination",
    detail: "Private Schools Association, District Sialkot, Pakistan.",
    year: "2012",
  },
  {
    title: "Merit Award — Laptop & Solar Panel",
    detail: "Awarded on merit by the Government of Punjab, Pakistan.",
    year: "2012",
  },
];

export const summerSchools: SummerSchool[] = [
  {
    period: "15 — 19 Jul 2024",
    title: "Climate-Friendly Agricultural Practices",
    host: "Slovenian Forestry Institute",
    location: "Murska Sobota, Slovenia",
    highlights: [
      "Scholarship funded by the European project LIFE IP CARE4CLIMATE.",
      "Studied organic farming, greenhouse-gas reduction and plant & soil health strategies.",
      "Field visits to Rakičan, Farm Cigut and the Climate Farm Demo project.",
      "Presented a group project on converting conventional farms to organic systems.",
    ],
  },
  {
    period: "15 — 21 Jun 2024",
    title: "Plant Health in the Wake of AI",
    host: "Swedish University of Agricultural Sciences / UNITUS / ELLS",
    location: "Pieve Tesino, Italy",
    highlights: [
      "Explored plant resistance breeding, plant protection and bioinformatics for disease diagnostics.",
      "Presented a case study on organic breeding of carrots resistant to Alternaria dauci.",
      "Knowledge exchange on AI applications in plant health with experts and peers.",
      "Field visits to NaturGresta and Bio Beltrami farms.",
    ],
  },
];

export const conferences: ConferenceItem[] = [
  {
    date: "7 Mar 2025",
    title: "Seminar — Combined Strategies to Promote Multitrophic Interaction in Biocontrol",
    organiser: "DAFNE Department, University of Tuscia, Italy",
  },
  {
    date: "21 Feb 2025",
    title: "Seed of Innovation Research Symposium",
    organiser: "DAFNE Department, University of Tuscia, Italy",
  },
  {
    date: "12 Feb 2025",
    title: "Workshop — Biology & Application of Extracellular Vesicles",
    organiser: "DAFNE Department, University of Tuscia, Italy",
  },
  {
    date: "17 Nov 2022",
    title: "International Conference on Forests in Women's Hands",
    organiser: "Slovenian Forestry Institute, Slovenia",
  },
  {
    date: "21 Oct 2022",
    title: "Workshop — International Cooperation under the SAFE-Med Project",
    organiser: "DAFNE Department, University of Tuscia, Italy",
  },
];

export const memberships: Membership[] = [
  {
    name: "European Cooperation in Science & Technology (COST)",
    detail:
      "Member — COST Action CA24152: Epitranscriptomics & ncRNAs for climate-change-resilient and sustainable crops (EPICROPS).",
  },
  {
    name: "International Society for Forensic Genetics (ISFG)",
  },
];
