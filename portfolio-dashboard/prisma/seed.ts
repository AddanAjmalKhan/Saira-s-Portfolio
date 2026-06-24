/**
 * Seed the database with the portfolio's current content + the first admin user.
 *
 * Content is seeded only when the database is empty (safe to re-run — it will
 * not overwrite edits). The admin user is always upserted from env vars.
 *
 * Run with:  npm run db:seed   (or: npx prisma db seed)
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seedAdmin() {
  const email = (process.env.SEED_ADMIN_EMAIL || "addenajmalkhanpk@gmail.com").toLowerCase().trim();
  const password = process.env.SEED_ADMIN_PASSWORD || "changeme12345";
  const name = process.env.SEED_ADMIN_NAME || "Adden Ajmal Khan";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, name, passwordHash, role: "ADMIN" },
  });
  console.log(`✓ Admin user ready: ${email}`);
}

async function seedContent() {
  const existing = await prisma.profile.findUnique({ where: { id: "profile" } });
  if (existing) {
    console.log("• Content already present — skipping content seed.");
    return;
  }

  // ---- Profile (singleton) -------------------------------------------------
  await prisma.profile.create({
    data: {
      id: "profile",
      name: "Saira Adnan",
      title: "PhD Researcher in Air Forensics",
      affiliation: "National University of San Juan, Argentina",
      tagline:
        "Combining human and non-human environmental DNA (eDNA) to read the stories the air carries.",
      summary:
        "Marie Skłodowska-Curie Fellow and molecular biologist working at the intersection of forensic genetics, plant pathology and bioinformatics. I build genomes, trace pathogens and turn environmental signals into evidence — from peach-tree pathosystems in Italy to air-borne eDNA in Argentina.",
      nationality: "Pakistani",
      location: "San Juan, Argentina",
      email: "sairazoologist97@gmail.com",
      phone: "+54 9 2646 707615",
      linkedin: "https://www.linkedin.com/in/saira1997/",
      researchgate: "https://www.researchgate.net/profile/Saira-Adnan-4",
      projectName: "MSCA Natural Traces",
      projectUrl: "https://naturaltraces.com/",
      profileImageUrl: null,
    },
  });

  // ---- Quick facts ---------------------------------------------------------
  await prisma.quickFact.createMany({
    data: [
      { label: "Current role", value: "Marie Skłodowska-Curie PhD Fellow", order: 1 },
      { label: "Field", value: "Air Forensics · eDNA · Genomics", order: 2 },
      { label: "Based in", value: "San Juan, Argentina", order: 3 },
      { label: "Languages", value: "Urdu · English · Italian", order: 4 },
    ],
  });

  // ---- Navigation ----------------------------------------------------------
  await prisma.navItem.createMany({
    data: [
      { label: "Home", href: "/", order: 1 },
      { label: "Education", href: "/education", order: 2 },
      { label: "Research Interests", href: "/research", order: 3 },
      { label: "Publications", href: "/publications", order: 4 },
      { label: "International Trainings", href: "/trainings", order: 5 },
      { label: "News & Updates", href: "/news", order: 6 },
      { label: "Research Collaborations", href: "/collaborations", order: 7 },
      { label: "Gallery", href: "/gallery", order: 8 },
      { label: "Contact", href: "/contact", order: 9 },
    ],
  });

  // ---- Education -----------------------------------------------------------
  await prisma.education.createMany({
    data: [
      {
        title: "PhD in Biology (Air Forensics)",
        organisation: "National University of San Juan",
        location: "San Juan, Argentina",
        period: "Mar 2026 — Present",
        degree: "Doctor of Philosophy in Biology (Air Forensics)",
        university: "National University of San Juan, Argentina",
        description:
          "Marie Skłodowska-Curie Fellow within the project MSCA Natural Traces. Thesis: Air Forensics: Combining human and non-human environmental DNA (eDNA).",
        tags: ["MSCA Fellow", "eDNA", "Forensics"],
        highlights: [
          "Marie Skłodowska-Curie Fellow within the MSCA Natural Traces project.",
          "Thesis: Air Forensics — Combining human and non-human environmental DNA (eDNA).",
        ],
        order: 1,
      },
      {
        title: "MSc in Plant Biotechnology for Food & Global Health",
        organisation: "University of Tuscia",
        location: "Viterbo, Italy",
        period: "Oct 2023 — Sep 2025",
        grade: "110/110 with Honour",
        degree: "Master of Science in Plant Biotechnology for Food and Global Health",
        university: "University of Tuscia, Italy",
        description:
          "Grade: 110/110 with Honour. Thesis: Genomic Insights into Diaporthe amygdali Pathogenicity on Peach Trees. Investigated genomic features utilizing NGS and third-generation sequencing.",
        tags: ["Genomics", "Bioinformatics"],
        highlights: [
          "Thesis: Genomic Insights into Diaporthe amygdali Pathogenicity on Peach Trees.",
          "Produced the first genome sequence of D. amygdali from peach trees using next- and third-generation sequencing.",
          "Identified key virulence factors and potential targets for disease management in host–pathogen interactions.",
          "Major subjects: Bioinformatics, Plant genomes & chromosome manipulation, Plant genomics & stress responses, Forest biotechnology.",
        ],
        order: 2,
      },
      {
        title: "Erasmus+ Semester Exchange",
        organisation: "Hungarian University of Agriculture & Life Sciences (MATE)",
        location: "Hungary",
        period: "Sep 2024 — Jan 2025",
        degree: "Erasmus+ Semester Exchange",
        university: "Hungarian University of Agriculture and Life Sciences, Hungary",
        description:
          "Received European Commission Scholarship to study MSc 3rd Semester. Major Subjects: Plant Physiology, Stress Biology, Genetics.",
        tags: ["Erasmus+", "Genetics"],
        highlights: [
          "European Commission scholarship for the MSc 3rd semester.",
          "Subjects: Plant Physiology & Stress Biology, Population & Evolution Genetics, RStudio, Cereal biotechnology, Environmental Chemistry.",
        ],
        order: 3,
      },
      {
        title: "BSc in Zoology",
        organisation: "Government College Women University Sialkot",
        location: "Sialkot, Pakistan",
        period: "Sep 2015 — Jul 2019",
        degree: "Bachelor of Science in Zoology",
        university: "Government College Women University Sialkot, Pakistan",
        description:
          "Specialization Project: Identified helminth parasites from livestock fecal samples using microscopic diagnostic techniques.",
        tags: ["Parasitology", "Microscopy"],
        highlights: [
          "Specialization project: identified helminth parasites from livestock faecal samples using microscopic diagnostics.",
          "Integrated morphological characterisation with preliminary bioinformatics tools to support parasitic disease surveillance.",
        ],
        order: 4,
      },
      {
        title: "Bachelor of Education (B.Ed)",
        organisation: "Allama Iqbal Open University",
        location: "Islamabad, Pakistan",
        period: "Oct 2019 — Jan 2022",
        degree: "Bachelor of Education",
        university: "Allama Iqbal Open University, Islamabad, Pakistan",
        description:
          "Major Subjects: Research Methods, Educational Statistics, Human Development, Curriculum Development",
        tags: ["Pedagogy", "Research methods"],
        highlights: [
          "Major subjects: Research Methods in Education, Educational Statistics, Human Development, Curriculum Development, Assessment & Evaluation.",
        ],
        order: 5,
      },
    ],
  });

  // ---- Experience ----------------------------------------------------------
  await prisma.experience.createMany({
    data: [
      {
        period: "Feb 2025 — Jul 2025",
        title: "Master Research",
        organisation: "Dept. of Agriculture & Forest Sciences, University of Tuscia",
        location: "Viterbo, Italy",
        tags: ["Genome assembly", "Annotation", "HPC"],
        highlights: [
          "Performed DNA extraction, quality assessment and hybrid genome assembly using Illumina and PacBio reads.",
          "Conducted structural and functional genome annotation with MAKER, SNAP and AUGUSTUS pipelines.",
          "Identified virulence-related genes and secondary-metabolite clusters using bioinformatics tools.",
          "Ran comparative genomics and phylogenetics on Diaporthe amygdali with OrthoFinder.",
          "Analysed data on Linux-based HPC systems and visualised results in RStudio.",
        ],
        order: 1,
      },
      {
        period: "Jul 2024 — Aug 2024",
        title: "Research Internship — Plant Pathology Lab",
        organisation: "Dept. of Agriculture & Forest Sciences, University of Tuscia",
        location: "Viterbo, Italy",
        tags: ["DNA extraction", "PCR", "Microbiology"],
        highlights: [
          "Researched the health and resilience of peach trees against Diaporthe amygdali.",
          "Extracted and analysed pathogen DNA via the CTAB method, amplicon purification and quantification.",
          "Molecular characterisation by amplifying ITS, Histone, Beta-tubulin, Elongation Factor and Calmodulin regions.",
          "Maintained microbial cultures, prepared growth media and recorded colony growth patterns.",
        ],
        order: 2,
      },
      {
        period: "Feb 2022 — Sep 2023",
        title: "Lecturer",
        organisation: "Apex Group of Colleges, Pasrur Campus",
        location: "Sialkot, Pakistan",
        tags: ["Teaching", "Mentorship"],
        highlights: [
          "Delivered lectures and practicals in Biology, Chemistry and Botany.",
          "Conveyed complex technical concepts to students from diverse backgrounds.",
          "Mentored students with feedback and individualised academic support.",
        ],
        order: 3,
      },
      {
        period: "Feb 2020 — Jan 2022",
        title: "Lecturer",
        organisation: "Stars High School & College, Shehzada Pasrur",
        location: "Sialkot, Pakistan",
        tags: ["Teaching"],
        highlights: [
          "Conducted lectures and practicals in Biology and Chemistry.",
          "Collaborated with colleagues on teaching issues and extracurricular activities.",
        ],
        order: 4,
      },
      {
        period: "Sep 2019 — Jan 2020",
        title: "Biology Teacher",
        organisation: "Green Field School System, Shehzada Pasrur",
        location: "Sialkot, Pakistan",
        tags: ["Teaching"],
        highlights: [
          "Planned lessons and led discussions to assess and adapt learning techniques.",
          "Communicated with students and parents on performance, goal-setting and progress.",
        ],
        order: 5,
      },
      {
        period: "Feb 2019 — Jul 2019",
        title: "Internship",
        organisation: "Haripur Forest Division",
        location: "Haripur, Pakistan",
        tags: ["Forestry", "Pest detection", "Conservation"],
        highlights: [
          "Identified plant stress, disease symptoms and pest presence in field assessments, supported by bioinformatics tools.",
          "Monitored plant health and prepared progress reports on afforestation and environmental impact.",
          "Supported forest nurseries under the 10-Billion Trees Afforestation Project for biodiversity conservation.",
          "Ran awareness campaigns on sustainable forestry, wildlife protection and natural-resource conservation.",
        ],
        order: 6,
      },
    ],
  });

  // ---- Publications --------------------------------------------------------
  await prisma.publication.createMany({
    data: [
      {
        authors: "Shahzadi, M., Adnan, S., Ahmad, N., Ijaz, A., & Yousaf, A.",
        year: "2024",
        title:
          "Green synthesis of carbon dots employing beetroot for the evaluation of antibacterial activity",
        venue: "Advances in Food Sciences, Vol. 46, pp. 38–47",
        journal: "Advances in Food Sciences",
        volume: "46",
        pages: "38-47",
        order: 1,
      },
      {
        authors:
          "Nasar, S., Bashir, I., Muawiya, M. A., Khattak, M. A., Saira, Yousaf, S., & Yousaf, A.",
        year: "2023",
        title:
          "Effect of bio-preservatives on the shelf life of tomato fruit (Lycopersicon esculentum Mill)",
        venue: "Journal of Xi'an Shiyou University, Natural Sciences Edition, Vol. 66(05)",
        journal: "Journal of Xi'an Shiyou University, Natural Sciences Edition",
        volume: "66",
        issue: "05",
        doi: "https://doi.org/10.17605/OSF.IO/CEWFG",
        order: 2,
      },
      {
        authors:
          "Hussain, M., Shah, S. M. A., Ahmad, S., Yousaf, A., Shaukat, S., Yousaf, S., Ahmed, S. W., Saira, Rauf, Z., & Afzal, Q. U. A.",
        year: "2023",
        title:
          "Physico-mechanical properties of Shisham (Dalbergia sissoo) wood grown in Khyber Pakhtunkhwa, Pakistan",
        venue: "Journal of Xi'an Shiyou University, Natural Sciences Edition, Vol. 66(03)",
        journal: "Journal of Xi'an Shiyou University, Natural Sciences Edition",
        volume: "66",
        issue: "03",
        doi: "https://doi.org/10.17605/OSF.IO/AQMD9",
        order: 3,
      },
      {
        authors: "Aloysius, N., Yousaf, A., Saira, & Saba, M.",
        year: "2020",
        title: "Challenges and opportunities for ecotourism in District Jaffna, Sri Lanka",
        venue: "Journal of Wildlife and Ecology, Vol. 4, pp. 122–129",
        journal: "Journal of Wildlife and Ecology",
        volume: "4",
        pages: "122-129",
        order: 4,
      },
    ],
  });

  // ---- Trainings -----------------------------------------------------------
  await prisma.training.createMany({
    data: [
      { title: "Hitchhiker Pests", institution: "Plant Health Australia", country: "Australia", duration: "2025", order: 1 },
      { title: "High Throughput Sequencing", institution: "American Phytopathological Society", country: "USA", duration: "2025", order: 2 },
      { title: "Microbiome & Health", institution: "University of Graz", country: "Austria", duration: "2025", order: 3 },
      { title: "Molecular Biology Laboratory Course II", institution: "University of Graz", country: "Austria", duration: "2025", order: 4 },
      { title: "Resilience Fundamentals, Tree Health & Non-native Pests", institution: "Centre for Forest Protection", country: "UK", duration: "2025", order: 5 },
      { title: "Green Life Retailer Pests & Diseases", institution: "Plant Health Australia", country: "Australia", duration: "2025", order: 6 },
      { title: "Biosecurity Surveillance: Protecting Australia's Forests", institution: "Forest Watch Australia", country: "Australia", duration: "2025", order: 7 },
      { title: "Plant Biosecurity in Australia", institution: "Plant Health Australia", country: "Australia", duration: "2025", order: 8 },
      { title: "Plant Surveillance", institution: "Plant Health Australia", country: "Australia", duration: "2025", order: 9 },
      { title: "Creative Writing", institution: "DigiSkills, Government of Pakistan", country: "Pakistan", duration: "2021", order: 10 },
    ],
  });

  // ---- Skill groups --------------------------------------------------------
  await prisma.skillGroup.createMany({
    data: [
      {
        title: "Scientific & Laboratory",
        order: 1,
        items: [
          "Culture media preparation, isolation & subculturing of plant pathogens",
          "Handling of microbes & maintaining viable cultures",
          "Morpho-molecular identification of fungal pathogens",
          "DNA / RNA extraction",
          "PCR & gel electrophoresis",
          "Microscopy & phenotyping",
          "Sequence alignment, genome annotation & phylogenetics",
          "Statistical analysis",
          "Manuscript submission & peer-review process",
          "Literature searching, critical evaluation & scientific writing",
        ],
      },
      {
        title: "Technical & Digital",
        order: 2,
        items: [
          "RStudio",
          "Linux",
          "HPC systems",
          "Biological databases",
          "Sanger sequencing & analysis",
          "De novo hybrid assembly",
          "Genome & functional annotation",
          "Python (basics)",
          "Microsoft Office suite",
          "InkScape",
          "Canva",
          "Mendeley",
          "Graphic design",
          "Video editing",
        ],
      },
    ],
  });

  // ---- Languages -----------------------------------------------------------
  await prisma.language.createMany({
    data: [
      { name: "Urdu", level: "Mother tongue", value: 100, order: 1 },
      { name: "English", level: "Proficient", value: 90, order: 2 },
      { name: "Italian", level: "Basics", value: 35, order: 3 },
    ],
  });

  // ---- References ----------------------------------------------------------
  await prisma.reference.createMany({
    data: [
      {
        name: "Prof. Henk R. Braig",
        role: "Associate Professor (PhD Supervisor)",
        affiliation:
          "Institute and Museum of Natural Sciences, National University of San Juan, Argentina",
        email: "henkbraig@unsj-cuim.edu.ar",
        order: 1,
      },
      {
        name: "Dr. Leonardo Diaz Nieto",
        role: "Associate Professor (PhD Supervisor)",
        affiliation:
          "Institute and Museum of Natural Sciences, National University of San Juan, Argentina",
        email: "ldiaznieto@unsj-cuim.edu.ar",
        order: 2,
      },
    ],
  });

  // ---- Honours -------------------------------------------------------------
  await prisma.honour.createMany({
    data: [
      { title: "Marie Skłodowska-Curie PhD Scholarship", detail: "Funded under the MSCA Natural Traces project.", year: "2026", order: 1 },
      { title: "Erasmus+ Scholarship", detail: "Awarded by the European Commission for a semester exchange.", year: "2024", order: 2 },
      { title: "International Merit Scholarship", detail: "For the master's degree at the University of Tuscia, Italy.", year: "2023", order: 3 },
      { title: "9th Position — Scholarship Examination", detail: "Private Schools Association, District Sialkot, Pakistan.", year: "2012", order: 4 },
      { title: "Merit Award — Laptop & Solar Panel", detail: "Awarded on merit by the Government of Punjab, Pakistan.", year: "2012", order: 5 },
    ],
  });

  // ---- Summer schools ------------------------------------------------------
  await prisma.summerSchool.createMany({
    data: [
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
        order: 1,
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
        order: 2,
      },
    ],
  });

  // ---- Conferences ---------------------------------------------------------
  await prisma.conference.createMany({
    data: [
      { date: "7 Mar 2025", title: "Seminar — Combined Strategies to Promote Multitrophic Interaction in Biocontrol", organiser: "DAFNE Department, University of Tuscia, Italy", order: 1 },
      { date: "21 Feb 2025", title: "Seed of Innovation Research Symposium", organiser: "DAFNE Department, University of Tuscia, Italy", order: 2 },
      { date: "12 Feb 2025", title: "Workshop — Biology & Application of Extracellular Vesicles", organiser: "DAFNE Department, University of Tuscia, Italy", order: 3 },
      { date: "17 Nov 2022", title: "International Conference on Forests in Women's Hands", organiser: "Slovenian Forestry Institute, Slovenia", order: 4 },
      { date: "21 Oct 2022", title: "Workshop — International Cooperation under the SAFE-Med Project", organiser: "DAFNE Department, University of Tuscia, Italy", order: 5 },
    ],
  });

  // ---- Memberships ---------------------------------------------------------
  await prisma.membership.createMany({
    data: [
      {
        name: "European Cooperation in Science & Technology (COST)",
        detail:
          "Member — COST Action CA24152: Epitranscriptomics & ncRNAs for climate-change-resilient and sustainable crops (EPICROPS).",
        order: 1,
      },
      { name: "International Society for Forensic Genetics (ISFG)", detail: null, order: 2 },
    ],
  });

  // ---- Map locations -------------------------------------------------------
  await prisma.mapLocation.createMany({
    data: [
      { slug: "san-juan", city: "San Juan", country: "Argentina", lng: -68.54, lat: -31.54, role: "PhD — Air Forensics", detail: "Marie Skłodowska-Curie Fellow, National University of San Juan.", period: "2026 — Present", order: 1 },
      { slug: "viterbo", city: "Viterbo", country: "Italy", lng: 12.1, lat: 42.42, role: "MSc & Genomics Research", detail: "Diaporthe amygdali genome assembly at the University of Tuscia.", period: "2023 — 2025", order: 2 },
      { slug: "pieve-tesino", city: "Pieve Tesino", country: "Italy", lng: 11.62, lat: 46.07, role: "Summer School", detail: "Plant Health in the Wake of AI (SLU / UNITUS / ELLS).", period: "2024", order: 3 },
      { slug: "godollo", city: "Gödöllő", country: "Hungary", lng: 19.36, lat: 47.6, role: "Erasmus+ Exchange", detail: "Genetics & plant stress biology at MATE University.", period: "2024 — 2025", order: 4 },
      { slug: "murska-sobota", city: "Murska Sobota", country: "Slovenia", lng: 16.16, lat: 46.66, role: "Summer School", detail: "Climate-Friendly Agricultural Practices, Slovenian Forestry Institute.", period: "2024", order: 5 },
      { slug: "graz", city: "Graz", country: "Austria", lng: 15.44, lat: 47.07, role: "Advanced Training", detail: "Microbiome & Molecular Biology Laboratory courses, University of Graz.", period: "2025", order: 6 },
      { slug: "sialkot", city: "Sialkot", country: "Pakistan", lng: 74.53, lat: 32.49, role: "Bachelor of Science in Zoology", detail: "Government College Women University Sialkot. Identified helminth parasites from livestock fecal samples.", period: "2015 — 2019", order: 7 },
      { slug: "islamabad", city: "Islamabad", country: "Pakistan", lng: 73.04, lat: 33.68, role: "Bachelor of Education", detail: "Allama Iqbal Open University. Major Subjects: Research Methods, Educational Statistics, Human Development.", period: "2019 — 2022", order: 8 },
      { slug: "haripur", city: "Haripur", country: "Pakistan", lng: 72.93, lat: 33.99, role: "Forestry Internship", detail: "Forest pest detection under the 10-Billion Trees Afforestation Project.", period: "2019", order: 9 },
    ],
  });

  // ---- News ----------------------------------------------------------------
  await prisma.newsItem.createMany({
    data: [
      {
        date: "March 2026",
        title: "Started MSCA PhD Fellowship",
        category: "Career",
        description:
          "Began my journey as a Marie Skłodowska-Curie Fellow within the MSCA Natural Traces project at the National University of San Juan, Argentina, focusing on Air Forensics.",
        order: 1,
      },
      {
        date: "February 2025",
        title: "Seed of Innovation Research Symposium",
        category: "Conference",
        description:
          "Participated in the Seed of Innovation Research Symposium organized by DAFNE department, University of Tuscia, Italy.",
        order: 2,
      },
      {
        date: "September 2024",
        title: "Erasmus+ Scholarship Awarded",
        category: "Award",
        description:
          "Received the European Commission Scholarship to study my MSc 3rd Semester at the Hungarian University of Agriculture and Life Sciences.",
        order: 3,
      },
    ],
  });

  // ---- Gallery (captions; images can be uploaded later in the dashboard) ---
  await prisma.galleryImage.createMany({
    data: [
      { imageUrl: "/images/conference1.jpg", caption: "International Conference on Forests in Women's Hands, Slovenia", order: 1 },
      { imageUrl: "/images/lab1.jpg", caption: "DNA Extraction at Plant Pathology Lab, University of Tuscia", order: 2 },
      { imageUrl: "/images/field1.jpg", caption: "Climate Farm Demo Project, Slovenia", order: 3 },
      { imageUrl: "/images/training1.jpg", caption: "Plant Health in the wake of AI Summer School, Italy", order: 4 },
      { imageUrl: "/images/presentation.jpg", caption: "Research Presentation", order: 5 },
      { imageUrl: "/images/lab2.jpg", caption: "Microbial Culture Maintenance", order: 6 },
    ],
  });

  // ---- Research interests --------------------------------------------------
  await prisma.researchInterest.createMany({
    data: [
      { title: "Air Forensics & eDNA", description: "Combining human and non-human environmental DNA (eDNA) to read the stories the air carries, identifying pathogens and biological materials.", icon: "dna", order: 1 },
      { title: "Plant Pathology & Genomics", description: "Investigating the genomic features and molecular mechanisms underlying pathogenicity of pathogens like Diaporthe amygdali on peach trees.", icon: "leaf", order: 2 },
      { title: "Bioinformatics", description: "Utilizing next-generation and third-generation sequencing, genome annotation, structural annotation, and phylogenetic analysis to understand organisms.", icon: "database", order: 3 },
      { title: "Biosecurity & Surveillance", description: "Protecting forests and agriculture from hitchhiker pests, foreign pathogens, and promoting resilient ecosystems through molecular monitoring.", icon: "shield", order: 4 },
    ],
  });

  // ---- Collaborations ------------------------------------------------------
  await prisma.collaboration.createMany({
    data: [
      { title: "MSCA Natural Traces", partner: "National University of San Juan, Argentina", description: "Air Forensics project combining human and non-human environmental DNA.", order: 1 },
      { title: "Genomic Insights into Diaporthe amygdali", partner: "University of Tuscia, Italy", description: "Investigating genomic features and molecular mechanisms underlying pathogenicity on peach trees.", order: 2 },
    ],
  });

  // ---- Page text blocks ----------------------------------------------------
  await prisma.pageContent.createMany({
    data: [
      { key: "research", heading: "Research Interests", subheading: "Focusing on the intersection of air forensics, genomics, and plant pathology to solve real-world biological challenges.", body: null },
      { key: "gallery", heading: "Academic Gallery", subheading: "A visual journey through my international research, laboratory work, conferences, and field experiences.", body: null },
      { key: "news", heading: "News & Updates", subheading: null, body: null },
      { key: "collaborations", heading: "Research Collaborations", subheading: "I actively collaborate with universities, research institutes, and international organizations to advance science in air forensics, plant pathology, and genomic surveillance.", body: null },
      { key: "collaborations-cta", heading: "Open for Collaboration", subheading: null, body: "Interested in partnering on projects related to eDNA, plant pathology, bioinformatics, or biosecurity? Let's explore how we can work together." },
    ],
  });

  console.log("✓ Content seeded.");
}

async function main() {
  await seedAdmin();
  await seedContent();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
