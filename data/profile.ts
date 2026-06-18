import type { Profile, NavItem, Reference } from "@/lib/types";

export const profile = {
  name: "Saira Adnan",
  title: "PhD Researcher in Air Forensics",
  affiliation: "National University of San Juan, Argentina",
  tagline: "Combining human and non-human environmental DNA (eDNA) to read the stories the air carries.",
  summary: "Marie Skłodowska-Curie Fellow and molecular biologist working at the intersection of forensic genetics, plant pathology and bioinformatics. I build genomes, trace pathogens and turn environmental signals into evidence — from peach-tree pathosystems in Italy to air-borne eDNA in Argentina.",
  nationality: "Pakistani",
  location: "San Juan, Argentina",
  email: "s.adnan@unsj-cuim.edu.ar",
  phone: "+54 9 2646 707615",
  linkedin: "https://www.linkedin.com/in/saira1997/",
  researchgate: "https://www.researchgate.net/profile/Saira-Adnan-4",
  project: { name: "MSCA Natural Traces", url: "https://naturaltraces.com/" },
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Education", href: "/education" },
  { label: "Research Interests", href: "/research" },
  { label: "Publications", href: "/publications" },
  { label: "International Trainings", href: "/trainings" },
  { label: "News & Updates", href: "/news" },
  { label: "Research Collaborations", href: "/collaborations" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export const education = [
  {
    degree: "Doctor of Philosophy in Biology (Air Forensics)",
    university: "National University of San Juan, Argentina",
    period: "01/03/2026 – till date",
    description: "Marie Skłodowska-Curie Fellow within the project MSCA Natural Traces. Thesis: Air Forensics: Combining human and non-human environmental DNA (eDNA).",
    location: "Argentina"
  },
  {
    degree: "Master of Science in Plant Biotechnology for Food and Global Health",
    university: "University of Tuscia, Italy",
    period: "01/10/2023 – 23/09/2025",
    description: "Grade: 110/110 with Honour. Thesis: Genomic Insights into Diaporthe amygdali Pathogenicity on Peach Trees. Investigated genomic features utilizing NGS and third-generation sequencing.",
    location: "Italy"
  },
  {
    degree: "Erasmus+ Semester Exchange",
    university: "Hungarian University of Agriculture and Life Sciences, Hungary",
    period: "01/09/2024 – 30/01/2025",
    description: "Received European Commission Scholarship to study MSc 3rd Semester. Major Subjects: Plant Physiology, Stress Biology, Genetics.",
    location: "Hungary"
  },
  {
    degree: "Bachelor of Science in Zoology",
    university: "Government College Women University Sialkot, Pakistan",
    period: "01/09/2015 – 24/07/2019",
    description: "Specialization Project: Identified helminth parasites from livestock fecal samples using microscopic diagnostic techniques.",
    location: "Pakistan"
  },
  {
    degree: "Bachelor of Education",
    university: "Allama Iqbal Open University, Islamabad, Pakistan",
    period: "01/10/2019 – 21/01/2022",
    description: "Major Subjects: Research Methods, Educational Statistics, Human Development, Curriculum Development.",
    location: "Pakistan"
  }
];

export const publications = [
  {
    title: "Green synthesis of carbon dots employing beetroot for the evaluation of antibacterial activity",
    authors: "Shahzadi, M., Adnan, S., Ahmad, N., Ijaz, A., and Yousaf, A.",
    journal: "Advances in Food Sciences",
    volume: "46",
    pages: "38-47",
    year: "2024"
  },
  {
    title: "Effect of Bio Preservatives on the Shelf Life of Tomato Fruit (Lycopersicon esculentum Mill)",
    authors: "Nasar, S., Bashir, I., Muawiya, M.A., Khattak, M.A., Saira., Yousaf, S., and Yousaf, A.",
    journal: "Journal of Xi'an Shiyou University, Natural Sciences Edition",
    volume: "66",
    issue: "05",
    year: "2023",
    doi: "10.17605/OSF.IO/CEWFG"
  },
  {
    title: "Physico-Mechanical Properties of Shisham (Dalbergia sissoo) wood grown in Khyber Pakhtunkhwa, Pakistan",
    authors: "Hussain, M., Shah, S.M.A., Ahmad, S., Yousaf, A., Shaukat, S., Yousaf, S., Ahmed, S.W., Saira., Rauf, Z., and Afzal, Q.U.A.",
    journal: "Journal of Xi'an Shiyou University, Natural Sciences Edition",
    volume: "66",
    issue: "03",
    year: "2023",
    doi: "10.17605/OSF.IO/AQMD9"
  },
  {
    title: "Challenges and Opportunities for ecotourism in District Jaffna, Sri Lanka",
    authors: "Aloysius, N., Yousaf, A., Saira., and Saba, M.",
    journal: "Journal of Wildlife and Ecology",
    volume: "4",
    pages: "122-129",
    year: "2020"
  }
];

export const trainings = [
  {
    country: "Australia",
    institution: "Plant Health Australia",
    title: "Hitchhiker Pests, Green life Retailer Pests and Diseases, Plant Biosecurity, Plant Surveillance",
    duration: "2025"
  },
  {
    country: "USA",
    institution: "American Phytopathological Society",
    title: "High Throughput Sequencing",
    duration: "2025"
  },
  {
    country: "Austria",
    institution: "University of Graz",
    title: "Microbiome & Health, Molecular Biology Laboratory Course II",
    duration: "2025"
  },
  {
    country: "UK",
    institution: "Center for forest protection",
    title: "Resilience fundamentals, tree health and non-native pests and pathogens",
    duration: "2025"
  },
  {
    country: "Slovenia",
    institution: "Slovenian Forestry Institute",
    title: "Climate-friendly agricultural practices (International Summer School)",
    duration: "2024",
    description: "Funded by European project LIFE IP CARE4CLIMATE. Studied organic farming and greenhouse gas emission reduction strategies."
  },
  {
    country: "Italy",
    institution: "Swedish University of Agricultural Sciences / UNITUS",
    title: "Plant Health in the wake of AI (International Summer School)",
    duration: "2024",
    description: "Studied plant resistance breeding, plant protection, and bioinformatics tools for disease diagnostics."
  }
];

export const skills = [
  "RStudio", "Linux", "HPC systems", "Databases", "Sanger Sequencing and Data Analysis", "De Novo Hybrid Assembly",
  "Genome and Functional Annotation", "Python (Basics)", "Graphic Designing", "Video Editing", "InkScape", "Canva", "Mendeley"
];

export const references = [
  {
    name: "Prof. Henk R. Braig",
    role: "Associate Professor (PhD Supervisor)",
    affiliation: "Institute and Museum of Natural Sciences, National University of San Juan, Argentina",
    email: "henkbraig@unsj-cuim.edu.ar",
  },
  {
    name: "Dr. Leonardo Diaz Nieto",
    role: "Associate Professor (PhD Supervisor)",
    affiliation: "Institute and Museum of Natural Sciences, National University of San Juan, Argentina",
    email: "ldiaznieto@unsj-cuim.edu.ar",
  },
];

export const quickFacts = [
  { label: "Current role", value: "Marie Skłodowska-Curie PhD Fellow" },
  { label: "Field", value: "Air Forensics · eDNA · Genomics" },
  { label: "Based in", value: "San Juan, Argentina" },
  { label: "Languages", value: "Urdu · English · Italian" },
];
