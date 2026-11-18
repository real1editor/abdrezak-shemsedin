import type { Metadata } from "next";
import {
  credentials as masterCredentials,
  profile as masterProfile,
  projects as masterProjects,
} from "@/data/masterPortfolio";
import type { Credential, PillarId } from "@/data/masterPortfolio";
import { portfolioData as legacy } from "@/data/projects";
import type {
  CertificationItem,
  CourseFocus,
  Discipline,
  EducationItem,
  ExperienceItem,
  FaqItem,
  PortfolioData,
  ProjectItem,
  Skill,
  Socials,
  Tool,
} from "@/types/portfolio";

/* ==========================================================================
   SITE MODEL
   Master portfolio + six standalone domain portfolios.
   Every page reads a complete PortfolioData object. No page ever needs to
   know about a sibling domain unless it is the master gateway.
   ========================================================================== */

export type DomainSlug = "fullstack" | "ece" | "ai" | "ml-dl" | "data" | "video";
export type SiteSlug = "master" | DomainSlug;

export interface PortfolioMeta {
  slug: SiteSlug;
  isMaster: boolean;
  label: string;
  title: string;
  role: string;
  tagline: string;
  description: string;
  heroEyebrow: string;
  heroKicker: string;
  typewriterRoles: string[];
  skillLabels: {
    primary: string;
    ai: string;
    data: string;
    locked: string;
  };
  projectsBlurb: string;
  credentialsTitle: string;
  credentialsBlurb: string;
  showPillarFilters: boolean;
  showDomains: boolean;
  showSeoPages: boolean;
  resumeUrl: string;
  availability: string;
}

export interface PortfolioView {
  data: PortfolioData;
  credentials: Credential[];
  meta: PortfolioMeta;
}

interface SiteProject extends Omit<
  ProjectItem,
  "description" | "tags" | "liveUrl" | "githubUrl" | "highlights" | "architecture"
> {
  slug: string;
  year: string;
  status: string;
  summary: string;
  problem: string;
  solution: string;
  impact: string[];
  stack: string[];
  pillars: PillarId[];
  links: { label: string; href: string }[];
  architecture?: string[];
  featured?: boolean;
}

export const siteUrl = "https://abdrezak-shemsedin.vercel.app";

const socials: Socials = {
  github: "https://github.com/real1editor",
  linkedin: "https://www.linkedin.com/in/abdrezak-shemsedin",
  upwork: "https://www.upwork.com/freelancers/abdrezak",
  email: "real1editor@gmail.com",
  telegram: "https://t.me/real1editor",
  phone: "tel:+251947758994",
  facebook: "https://facebook.com/real1editor",
  instagram: "https://instagram.com/real1editor",
  tiktok: "https://tiktok.com/@real1editor",
  x: "https://x.com/real1editor",
};

const location = "Wolaita Sodo / Butajira, Ethiopia";
const profilePhoto = masterProfile.avatarUrl;
const languages = legacy.languages;
const conceptIcon = "/icons/skill.svg";

/* --------------------------------- Projects ------------------------------- */

function fromMaster(
  slug: string,
  extra: Pick<SiteProject, "category" | "thumb"> & Partial<SiteProject>,
): SiteProject {
  const project = masterProjects.find((item) => item.slug === slug);
  if (!project) throw new Error(`Unknown master project: ${slug}`);
  return {
    slug: project.slug,
    title: project.title,
    role: project.role,
    year: project.year,
    status: project.status,
    summary: project.summary,
    problem: project.problem,
    architecture: project.architecture,
    solution: project.solution,
    impact: project.impact,
    stack: project.stack,
    pillars: project.pillars,
    links: project.links,
    featured: project.featuredOnHub,
    ...extra,
  };
}

function fromLegacy(
  title: string,
  extra: {
    category: SiteProject["category"];
    pillars: PillarId[];
    year: string;
    problem: string;
    solution: string;
    status?: string;
    featured?: boolean;
  },
): SiteProject {
  const project = legacy.projects.find((item) => item.title === title);
  if (!project) throw new Error(`Unknown legacy project: ${title}`);
  const links: SiteProject["links"] = [];
  if (project.liveUrl && project.liveUrl !== "#") {
    links.push({ label: "Live", href: project.liveUrl });
  }
  if (project.githubUrl && project.githubUrl !== "#") {
    links.push({ label: "Source", href: project.githubUrl });
  }
  return {
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    title: project.title,
    category: extra.category,
    thumb: project.thumb,
    role: project.role ?? "Engineer",
    year: extra.year,
    status: extra.status ?? (links.length ? "Live" : "Production build"),
    summary: project.description,
    problem: extra.problem,
    architecture: project.architecture ?? [],
    solution: extra.solution,
    impact: project.highlights ?? [],
    stack: project.tags,
    pillars: extra.pillars,
    links,
    featured: extra.featured,
  };
}

export const siteProjects: SiteProject[] = [
  fromMaster("nurotewedede", {
    category: "web",
    thumb: "/projects/nurotewedede.jpg",
    featured: true,
  }),
  fromMaster("butajira-polytechnic-net", {
    category: "web",
    thumb: "/projects/butajira-net.svg",
    featured: true,
  }),
  fromMaster("biometric-attendance", {
    category: "ai",
    thumb: "/projects/biometric-attendance.svg",
    pillars: ["ml-dl", "ai", "fullstack", "data"],
    featured: true,
  }),
  fromMaster("real1editor-bot", {
    category: "web",
    thumb: "/projects/real1editor-bot.svg",
    featured: true,
  }),
  fromMaster("astropull-animation", {
    category: "video",
    thumb: "/projects/astropull.svg",
    pillars: ["video", "ml-dl"],
  }),
  fromMaster("rosemary-oil-promo", {
    category: "video",
    thumb: "/projects/rosemary-oil.svg",
  }),
  fromLegacy("Merkato", {
    category: "web",
    pillars: ["fullstack", "data"],
    year: "2025",
    problem:
      "Open-air marketplace sellers needed a digital storefront and order flow that could survive real inventory churn without a large engineering team.",
    solution:
      "A React and Node.js marketplace with vendor storefronts, live order tracking, and a PostgreSQL schema built around transactional consistency.",
  }),
  fromLegacy("Visit Wolaita", {
    category: "web",
    pillars: ["fullstack"],
    year: "2025",
    problem:
      "Wolaita's tourism offering was scattered across social posts and word of mouth, with no single place to explore destinations or plan a visit.",
    solution:
      "A Next.js tourism site with Mapbox geospatial guides, curated photo galleries, and a cultural heritage timeline built for mobile travelers.",
  }),
  fromLegacy("Real1Editor", {
    category: "web",
    pillars: ["fullstack", "video"],
    year: "2025",
    problem:
      "A freelance creative practice needed a fast, credible home that could present services, selected work, and a direct client-acquisition path.",
    solution:
      "A Next.js and Framer Motion portfolio with custom branding, semantic HTML, JSON-LD, and a modular inquiry funnel.",
  }),
  fromLegacy("CampusConnect", {
    category: "mobile",
    pillars: ["fullstack"],
    year: "2025",
    problem:
      "Students were tracking schedules, cancellations, and study groups across disconnected channels with no reliable offline fallback.",
    solution:
      "A React Native and Expo companion app with Supabase auth, offline-first caching, push notifications, and location-aware study group discovery.",
  }),
  fromLegacy("InsightBoard", {
    category: "data",
    pillars: ["data", "fullstack"],
    year: "2025",
    problem:
      "Business data lived in raw tables that non-technical teams could not read, and executive reporting required manual spreadsheet work every cycle.",
    solution:
      "A Next.js analytics dashboard with Python ingestion, Recharts drill-downs, role-based access, and one-click PDF/CSV exports.",
  }),
];

export function getDomainProjects(slug: DomainSlug): SiteProject[] {
  return siteProjects.filter((project) => project.pillars.includes(slug));
}

function toProjectItem(project: SiteProject): ProjectItem {
  const live = project.links.find((link) =>
    /live|watch|open|visit/i.test(link.label),
  );
  const source = project.links.find((link) => /source|github/i.test(link.label));
  return {
    title: project.title,
    description: project.summary,
    category: project.category,
    tags: project.stack,
    thumb: project.thumb,
    liveUrl: live?.href ?? "#",
    githubUrl: source?.href ?? "#",
    role: project.role,
    highlights: project.impact,
    architecture: project.architecture,
  };
}

/* ------------------------------- Credentials ------------------------------ */

export function getDomainCredentials(slug: DomainSlug): Credential[] {
  return masterCredentials.filter((credential) =>
    credential.pillarTags.includes(slug),
  );
}

function toCertifications(items: Credential[]): CertificationItem[] {
  return items.map((credential) => ({
    title: credential.title,
    issuer: credential.issuer,
    date: credential.issueDate,
    imageUrl: credential.verificationUrl?.startsWith("/certs/")
      ? credential.verificationUrl
      : "/icon.svg",
    link: credential.verificationUrl ?? "#",
  }));
}

/* ---------------------------------- Copy ---------------------------------- */

const masterAbout = [
  "I am Abdrezak Shemsedin Hakimo — a fifth-year Electrical & Computer Engineering candidate at Wolaita Sodo University, graduating in 2027.",
  "I work across six connected disciplines: full-stack engineering, ECE infrastructure, AI systems, machine learning, data analysis, and creative video production. The common thread is building systems that survive real users.",
  "On the web side I ship production Next.js and Supabase platforms, Telegram Mini Apps, and Python/FastAPI services. On the engineering side I audit networks, model infrastructure assets, and build computer-vision pipelines.",
  "This master portfolio is the full record: every domain, every project, and every verified credential. Each domain also has its own standalone portfolio for clients who need one focused practice.",
  "I care about execution, clean data models, and work finished to the standard it deserves — Itqan.",
];

const masterWhatIBuild: Discipline[] = [
  {
    title: "Full-Stack Web & App Development",
    description:
      "Production web platforms, Android apps, e-commerce systems, and Telegram Mini Apps — typed end to end and deployed with a real operational path.",
  },
  {
    title: "AI Systems & Agent Engineering",
    description:
      "Agent orchestration, retrieval pipelines, prompt systems, evaluation, and AI security. Built for reliability after the demo, not just during it.",
  },
  {
    title: "Machine Learning & Computer Vision",
    description:
      "Applied ML with a vision bias: face recognition, feature extraction, model prototyping, and confidence-aware inference services.",
  },
  {
    title: "Data Analysis & Visualization",
    description:
      "Python wrangling, statistical summaries, dashboards, and the narrative that turns a table into a decision an executive can defend.",
  },
  {
    title: "ECE Networks & Infrastructure",
    description:
      "Campus network management, switch and port audits, structured cabling, Linux systems, and security fundamentals modelled as structured data.",
  },
  {
    title: "Creative Studio & Video Production",
    description:
      "Story-first short-form video, motion graphics, color, sound, and AI-assisted visuals — craft in service of retention and the message.",
  },
];

const masterCourseFocus: CourseFocus[] = [
  {
    title: "Software Systems",
    description:
      "Data structures, algorithms, and object-oriented design applied to products with clean, maintainable architecture.",
  },
  {
    title: "AI & Machine Learning",
    description:
      "Applied deep learning, NLP, and intelligent systems using TensorFlow, scikit-learn, OpenCV, and LLM APIs.",
  },
  {
    title: "Data Engineering & Analysis",
    description:
      "Signal and data processing, Python analytics, SQL modelling, and visualization with NumPy, Pandas, and Matplotlib.",
  },
  {
    title: "Computer Networks & Security",
    description:
      "Network architecture, structured cabling, operating systems, cybersecurity, and audit-grade infrastructure records.",
  },
  {
    title: "Hardware & Embedded Systems",
    description:
      "Digital logic, computer architecture, microcontrollers, and the physical layer beneath every software system.",
  },
  {
    title: "Visual Communication & Motion",
    description:
      "Storytelling, edit rhythm, motion design, color, and sound for short-form and instructional video.",
  },
];

const masterExperience: ExperienceItem[] = [
  {
    title: "Founder & Full-Stack Architect",
    company: "NuroTewedede",
    period: "2025 — Present",
    description:
      "Designed and shipped a direct producer-to-community commerce platform connecting regional woredas with neighborhood Iddir halls — schema, APIs, role-aware dashboards, and deployment.",
  },
  {
    title: "ICT & Networking Intern",
    company: "Butajira Polytechnic College",
    period: "2025",
    description:
      "Completed a solo three-month ICT and networking internship and delivered a network asset, switch, port, and cable infrastructure management system used for campus audits.",
  },
  {
    title: "Freelance Full-Stack Developer",
    company: "Self-employed",
    period: "2024 — Present",
    description:
      "Deliver web and mobile products for clients across commerce, tourism, and SaaS. Own requirements, architecture, implementation, QA, and launch.",
  },
  {
    title: "Creative Studio & Video Producer",
    company: "Self-employed",
    period: "2023 — Present",
    description:
      "Produce short-form commercial video and motion design: concept, edit, color, sound, captions, and platform-native delivery.",
  },
  {
    title: "Engineering & Data Projects",
    company: "Wolaita Sodo University",
    period: "2022 — Present",
    description:
      "Build student-focused applications, computer-vision systems, and Python data tooling alongside a Computer Engineering curriculum.",
  },
];

const masterFaq: FaqItem[] = [
  {
    question: "Who is Abdrezak Shemsedin?",
    answer:
      "Abdrezak Shemsedin Hakimo is an Ethiopian engineer and fifth-year Electrical & Computer Engineering candidate at Wolaita Sodo University (2027). He works across full-stack development, AI systems, machine learning, data, ECE infrastructure, and creative video production.",
  },
  {
    question: "What is this master portfolio?",
    answer:
      "It is the complete record of the work: six specialized domains, eleven projects, and thirty-five verified credentials. Each domain also has its own standalone portfolio at a dedicated path.",
  },
  {
    question: "What tech stack does he use?",
    answer:
      "Next.js, React, TypeScript, Tailwind CSS, Supabase/PostgreSQL, Node.js, Python, FastAPI, OpenCV, TensorFlow, PyTorch, scikit-learn, Pandas, CrewAI, LangChain, and the Adobe/CapCut production suite.",
  },
  {
    question: "Is he available for freelance work?",
    answer:
      "Yes — he is open to high-impact engineering roles, collaborations, and select freelance work. The fastest route is email or Telegram.",
  },
  {
    question: "Can I hire him for one discipline only?",
    answer:
      "Yes. Each domain portfolio is a complete, standalone presentation of that practice. A client can review only the relevant domain without navigating the rest of the ecosystem.",
  },
  {
    question: "How can I get in touch?",
    answer:
      "Email real1editor@gmail.com, message @real1editor on Telegram, or use the contact form on any portfolio page.",
  },
];

/* ------------------------------- Education -------------------------------- */

function educationFor(description: string): EducationItem[] {
  return legacy.education.map((item, index) =>
    index === 0 ? { ...item, description } : item,
  );
}

/* --------------------------------- Skills --------------------------------- */

const fullstackSkills = {
  primary: [
    { name: "Next.js", slug: "nextdotjs", level: 95 },
    { name: "React", slug: "react", level: 92 },
    { name: "TypeScript", slug: "typescript", level: 90 },
    { name: "Tailwind CSS", slug: "tailwindcss", level: 94 },
    { name: "JavaScript", slug: "javascript", level: 92 },
    { name: "Supabase", slug: "supabase", level: 88 },
    { name: "Node.js", slug: "nodedotjs", level: 85 },
    { name: "Python", slug: "python", level: 86 },
  ] satisfies Skill[],
  ai: [
    { name: "OpenAI API", slug: "openai", icon: "/icons/openai.svg", level: 78 },
    { name: "LangChain", slug: "langchain", level: 70 },
    { name: "Hugging Face", slug: "huggingface", level: 68 },
    { name: "TensorFlow", slug: "tensorflow", level: 70 },
    { name: "scikit-learn", slug: "scikitlearn", level: 72 },
  ] satisfies Skill[],
  data: [
    { name: "PostgreSQL", slug: "postgresql", level: 84 },
    { name: "Prisma", slug: "prisma", level: 80 },
    { name: "MongoDB", slug: "mongodb", level: 76 },
    { name: "Recharts", slug: "recharts", icon: "/icons/recharts.svg", level: 80 },
  ] satisfies Skill[],
  locked: [
    { name: "FastAPI", slug: "fastapi", level: 82 },
    { name: "Docker", slug: "docker", level: 70 },
    { name: "Expo", slug: "expo", level: 78 },
    { name: "Framer Motion", slug: "framer", level: 84 },
    { name: "Mapbox", slug: "mapbox", level: 72 },
    { name: "Telegram Bot API", slug: "telegram", level: 80 },
    { name: "Git", slug: "git", level: 90 },
    { name: "Vercel", slug: "vercel", level: 88 },
  ] satisfies Skill[],
};

const eceSkills = {
  primary: [
    { name: "Computer Networking", slug: "network", icon: conceptIcon, level: 90 },
    { name: "Network Automation", slug: "automation", icon: conceptIcon, level: 82 },
    { name: "Operating Systems", slug: "os", icon: conceptIcon, level: 84 },
    { name: "Hardware Architecture", slug: "hardware", icon: conceptIcon, level: 80 },
    { name: "Cybersecurity", slug: "security", icon: conceptIcon, level: 78 },
    { name: "Linux", slug: "linux", level: 82 },
    { name: "Python", slug: "python", level: 80 },
    { name: "C", slug: "c", level: 74 },
  ] satisfies Skill[],
  ai: [
    { name: "Computer Vision", slug: "vision", icon: conceptIcon, level: 72 },
    { name: "ML Foundations", slug: "ml", icon: conceptIcon, level: 70 },
    { name: "Edge AI", slug: "edge-ai", icon: conceptIcon, level: 62 },
  ] satisfies Skill[],
  data: [
    { name: "Asset Auditing", slug: "audit", icon: conceptIcon, level: 86 },
    { name: "PostgreSQL", slug: "postgresql", level: 76 },
    { name: "Excel Analytics", slug: "microsoftexcel", level: 78 },
  ] satisfies Skill[],
  locked: [
    { name: "Wireshark", slug: "wireshark", level: 78 },
    { name: "Cisco Packet Tracer", slug: "cisco", level: 82 },
    { name: "Kali Linux", slug: "kalilinux", level: 76 },
    { name: "Bash", slug: "gnubash", level: 78 },
    { name: "Git", slug: "git", level: 84 },
    { name: "Raspberry Pi", slug: "raspberrypi", level: 68 },
    { name: "Arduino", slug: "arduino", level: 70 },
    { name: "2FA & Access Control", slug: "2fa", icon: conceptIcon, level: 88 },
  ] satisfies Skill[],
};

const aiSkills = {
  primary: [
    { name: "AI Agent Architecture", slug: "agents", icon: conceptIcon, level: 88 },
    { name: "CrewAI", slug: "crewai", icon: conceptIcon, level: 84 },
    { name: "LLM Performance", slug: "llm", icon: conceptIcon, level: 82 },
    { name: "Prompt Engineering", slug: "prompt", icon: conceptIcon, level: 90 },
    { name: "RAG Pipelines", slug: "rag", icon: conceptIcon, level: 82 },
    { name: "Model Evaluation", slug: "eval", icon: conceptIcon, level: 80 },
    { name: "AI Security", slug: "ai-security", icon: conceptIcon, level: 78 },
    { name: "Python", slug: "python", level: 86 },
  ] satisfies Skill[],
  ai: [
    { name: "OpenAI API", slug: "openai", icon: "/icons/openai.svg", level: 86 },
    { name: "LangChain", slug: "langchain", level: 78 },
    { name: "Hugging Face", slug: "huggingface", level: 74 },
    { name: "TensorFlow", slug: "tensorflow", level: 70 },
    { name: "PyTorch", slug: "pytorch", level: 68 },
    { name: "n8n", slug: "n8n", level: 76 },
  ] satisfies Skill[],
  data: [
    { name: "Vector Search", slug: "vector", icon: conceptIcon, level: 74 },
    { name: "PostgreSQL", slug: "postgresql", level: 78 },
    { name: "Supabase", slug: "supabase", level: 80 },
    { name: "Jupyter", slug: "jupyter", level: 82 },
  ] satisfies Skill[],
  locked: [
    { name: "FastAPI", slug: "fastapi", level: 82 },
    { name: "Next.js", slug: "nextdotjs", level: 84 },
    { name: "TypeScript", slug: "typescript", level: 82 },
    { name: "Docker", slug: "docker", level: 70 },
    { name: "Telegram Bot API", slug: "telegram", level: 80 },
    { name: "Git", slug: "git", level: 88 },
    { name: "Vercel", slug: "vercel", level: 84 },
    { name: "Notion", slug: "notion", level: 78 },
  ] satisfies Skill[],
};

const mlSkills = {
  primary: [
    { name: "Python", slug: "python", level: 88 },
    { name: "OpenCV", slug: "opencv", level: 86 },
    { name: "TensorFlow", slug: "tensorflow", level: 76 },
    { name: "PyTorch", slug: "pytorch", level: 72 },
    { name: "scikit-learn", slug: "scikitlearn", level: 80 },
    { name: "NumPy", slug: "numpy", level: 84 },
    { name: "Pandas", slug: "pandas", level: 82 },
    { name: "Matplotlib", slug: "matplotlib", icon: "/icons/matplotlib.svg", level: 80 },
  ] satisfies Skill[],
  ai: [
    { name: "Hugging Face", slug: "huggingface", level: 72 },
    { name: "Google Colab", slug: "googlecolab", level: 84 },
    { name: "Jupyter", slug: "jupyter", level: 86 },
    { name: "Model Evaluation", slug: "eval", icon: conceptIcon, level: 80 },
    { name: "Feature Extraction", slug: "features", icon: conceptIcon, level: 82 },
  ] satisfies Skill[],
  data: [
    { name: "Seaborn", slug: "seaborn", icon: "/icons/seaborn.svg", level: 78 },
    { name: "Data Modeling", slug: "data-model", icon: conceptIcon, level: 76 },
    { name: "Image Processing", slug: "image", icon: conceptIcon, level: 82 },
    { name: "PostgreSQL", slug: "postgresql", level: 72 },
  ] satisfies Skill[],
  locked: [
    { name: "FastAPI", slug: "fastapi", level: 80 },
    { name: "Docker", slug: "docker", level: 68 },
    { name: "Git", slug: "git", level: 86 },
    { name: "GitHub", slug: "github", level: 86 },
    { name: "Linux", slug: "linux", level: 78 },
    { name: "VS Code", slug: "visualstudiocode", icon: "/icons/visualstudiocode.svg", level: 88 },
  ] satisfies Skill[],
};

const dataSkills = {
  primary: [
    { name: "Python", slug: "python", level: 86 },
    { name: "Pandas", slug: "pandas", level: 86 },
    { name: "NumPy", slug: "numpy", level: 84 },
    { name: "Matplotlib", slug: "matplotlib", icon: "/icons/matplotlib.svg", level: 82 },
    { name: "Seaborn", slug: "seaborn", icon: "/icons/seaborn.svg", level: 80 },
    { name: "PostgreSQL", slug: "postgresql", level: 82 },
    { name: "Excel", slug: "microsoftexcel", level: 84 },
    { name: "Statistics", slug: "statistics", icon: conceptIcon, level: 78 },
  ] satisfies Skill[],
  ai: [
    { name: "scikit-learn", slug: "scikitlearn", level: 76 },
    { name: "Jupyter", slug: "jupyter", level: 86 },
    { name: "Google Colab", slug: "googlecolab", level: 82 },
    { name: "Data Modeling", slug: "data-model", icon: conceptIcon, level: 82 },
  ] satisfies Skill[],
  data: [
    { name: "Recharts", slug: "recharts", icon: "/icons/recharts.svg", level: 80 },
    { name: "Prisma", slug: "prisma", level: 78 },
    { name: "Supabase", slug: "supabase", level: 80 },
    { name: "Power BI", slug: "powerbi", level: 72 },
  ] satisfies Skill[],
  locked: [
    { name: "Git", slug: "git", level: 84 },
    { name: "GitHub", slug: "github", level: 84 },
    { name: "VS Code", slug: "visualstudiocode", icon: "/icons/visualstudiocode.svg", level: 86 },
    { name: "Docker", slug: "docker", level: 66 },
    { name: "Next.js", slug: "nextdotjs", level: 78 },
    { name: "TypeScript", slug: "typescript", level: 76 },
  ] satisfies Skill[],
};

const videoSkills = {
  primary: [
    { name: "Premiere Pro", slug: "adobepremierepro", level: 92 },
    { name: "After Effects", slug: "adobeaftereffects", level: 86 },
    { name: "CapCut Pro", slug: "capcut", level: 90 },
    { name: "Motion Graphics", slug: "motion", icon: conceptIcon, level: 84 },
    { name: "Color Grading", slug: "color", icon: conceptIcon, level: 82 },
    { name: "Sound Design", slug: "sound", icon: conceptIcon, level: 78 },
    { name: "Visual Storytelling", slug: "story", icon: conceptIcon, level: 88 },
    { name: "Short-Form Editing", slug: "shortform", icon: conceptIcon, level: 90 },
  ] satisfies Skill[],
  ai: [
    { name: "AI-Assisted Visuals", slug: "ai-visuals", icon: conceptIcon, level: 82 },
    { name: "Generative AI", slug: "genai", icon: conceptIcon, level: 78 },
    { name: "Canva Pro", slug: "canva", level: 88 },
    { name: "ChatGPT", slug: "openai", icon: "/icons/openai.svg", level: 80 },
  ] satisfies Skill[],
  data: [
    { name: "Retention Analysis", slug: "retention", icon: conceptIcon, level: 76 },
    { name: "YouTube Analytics", slug: "youtube", level: 78 },
    { name: "Audience Insights", slug: "audience", icon: conceptIcon, level: 72 },
  ] satisfies Skill[],
  locked: [
    { name: "Photoshop", slug: "adobephotoshop", level: 80 },
    { name: "Audition", slug: "adobeaudition", level: 72 },
    { name: "Figma", slug: "figma", level: 76 },
    { name: "Notion", slug: "notion", level: 78 },
    { name: "Google Drive", slug: "googledrive", level: 86 },
    { name: "YouTube Studio", slug: "youtube", level: 84 },
  ] satisfies Skill[],
};

function dedupeSkills(groups: Skill[][]): Skill[] {
  const seen = new Set<string>();
  return groups.flat().filter((skill) => {
    if (seen.has(skill.name)) return false;
    seen.add(skill.name);
    return true;
  });
}

const masterSkills = {
  primary: fullstackSkills.primary,
  ai: aiSkills.primary,
  data: dataSkills.primary,
  locked: dedupeSkills([
    eceSkills.primary,
    videoSkills.primary,
    fullstackSkills.locked,
    mlSkills.locked,
  ]).slice(0, 16),
};

/* ---------------------------------- Tools --------------------------------- */

const tool = (name: string, slug: string, icon?: string): Tool => ({
  name,
  slug,
  ...(icon ? { icon } : {}),
});

const masterTools: Tool[] = [
  tool("Git", "git"),
  tool("GitHub", "github"),
  tool("Vercel", "vercel"),
  tool("VS Code", "visualstudiocode", "/icons/visualstudiocode.svg"),
  tool("Node.js", "nodedotjs"),
  tool("Postman", "postman"),
  tool("Expo Go", "expo"),
  tool("Jupyter", "jupyter"),
  tool("OpenAI", "openai", "/icons/openai.svg"),
  tool("LangChain", "langchain"),
  tool("Hugging Face", "huggingface"),
  tool("n8n", "n8n"),
  tool("Cisco Packet Tracer", "cisco"),
  tool("Wireshark", "wireshark"),
  tool("Kali Linux", "kalilinux"),
  tool("Premiere Pro", "adobepremierepro"),
  tool("After Effects", "adobeaftereffects"),
  tool("CapCut", "capcut"),
  tool("Canva", "canva"),
  tool("Google Colab", "googlecolab"),
  tool("PostgreSQL", "postgresql"),
  tool("Excel", "microsoftexcel"),
  tool("Power BI", "powerbi"),
  tool("Figma", "figma"),
];

/* ------------------------------ Domain config ----------------------------- */

interface DomainDefinition {
  meta: PortfolioMeta;
  role: string;
  roleShort: string;
  bio: string;
  about: string[];
  heroBadge: { title: string; subtitle: string };
  whatIBuild: Discipline[];
  courseFocus: CourseFocus[];
  skills: { primary: Skill[]; ai: Skill[]; data: Skill[]; locked: Skill[] };
  tools: Tool[];
  experience: ExperienceItem[];
  education: EducationItem[];
  faq: FaqItem[];
  metrics: { value: string; label: string }[];
}

function buildMetrics(
  projectCount: number,
  credentialCount: number,
  third: { value: string; label: string },
): { value: string; label: string }[] {
  return [
    { value: String(projectCount).padStart(2, "0"), label: "Case studies" },
    { value: String(credentialCount), label: "Verified credentials" },
    third,
    { value: "2027", label: "Graduating · ECE WSU" },
  ];
}

const domainDefinitions: Record<DomainSlug, DomainDefinition> = {
  fullstack: {
    meta: {
      slug: "fullstack",
      isMaster: false,
      label: "Full-Stack",
      title: "Full-Stack Web & App Development",
      role: "Full-Stack Developer",
      tagline: "From database schema to shipped interface.",
      description:
        "Production web and mobile products built with strict types, clean data models, and deployment discipline. The goal is not a demo — it is a system people can rely on.",
      heroEyebrow: "Full-Stack Web & App Development",
      heroKicker: "Full-Stack Engineer",
      typewriterRoles: [
        "Next.js & Supabase Architect",
        "Full-Stack Web Builder",
        "Python & API Developer",
        "Telegram Mini App Developer",
        "Android & Mobile Builder",
      ],
      skillLabels: {
        primary: "Core web stack",
        ai: "AI integration",
        data: "Data layer",
        locked: "Additional engineering",
      },
      projectsBlurb:
        "Selected full-stack work across commerce, campus infrastructure, automation, tourism, mobile, and analytics.",
      credentialsTitle: "Full-Stack Credentials",
      credentialsBlurb:
        "Verified programming, Android, responsive web, JavaScript, and secure-systems training.",
      showPillarFilters: false,
      showDomains: false,
      showSeoPages: false,
      resumeUrl: "/fullstack/resume",
      availability: "Available for full-stack projects",
    },
    role: "Full-Stack Developer",
    roleShort: "Full-Stack",
    bio: "I build production web and mobile products end to end — typed Next.js front ends, Supabase/PostgreSQL data models, FastAPI services, and Telegram Mini Apps. I care about the unglamorous parts: validation, auth, deployment, and a UI that stays fast on a phone.",
    about: [
      "I am a full-stack developer and fifth-year Computer Engineering student at Wolaita Sodo University, graduating in 2027.",
      "My core stack is Next.js, React, TypeScript, Tailwind CSS, Supabase/PostgreSQL, Node.js, and Python/FastAPI. I also ship Android apps and Telegram Mini Apps.",
      "I have built a civic commerce platform, a campus network management system, a Telegram bot and Mini App, e-commerce storefronts, a tourism site, and analytics dashboards.",
      "I own the whole path: requirements, schema, API, UI, QA, and deployment. The result is a product someone can operate without me in the room.",
    ],
    heroBadge: {
      title: "Full-Stack Engineering",
      subtitle: "Next.js · Supabase · FastAPI",
    },
    whatIBuild: [
      {
        title: "Web Platforms",
        description:
          "End-to-end Next.js applications with typed data models, authentication, role-aware dashboards, and production deployment.",
      },
      {
        title: "Mobile & Mini Apps",
        description:
          "Android apps with Expo and React Native, plus Telegram Mini Apps that put a real web UI inside a chat workflow.",
      },
      {
        title: "Commerce & SaaS",
        description:
          "Catalogues, carts, orders, payments, inventory, and admin surfaces built on a schema that can survive real traffic.",
      },
    ],
    courseFocus: [
      {
        title: "Software Systems",
        description:
          "Data structures, algorithms, and object-oriented design applied to maintainable product architecture.",
      },
      {
        title: "Databases & APIs",
        description:
          "Relational modelling, row-level access rules, REST design, validation, and server-side business logic.",
      },
      {
        title: "Human-Centered Interfaces",
        description:
          "Responsive layout, accessibility, interaction feedback, and performance budgets for real devices.",
      },
    ],
    skills: fullstackSkills,
    tools: [
      tool("Git", "git"),
      tool("GitHub", "github"),
      tool("Vercel", "vercel"),
      tool("VS Code", "visualstudiocode", "/icons/visualstudiocode.svg"),
      tool("Node.js", "nodedotjs"),
      tool("Postman", "postman"),
      tool("Expo Go", "expo"),
      tool("Jupyter", "jupyter"),
    ],
    experience: [
      {
        title: "Founder & Full-Stack Architect",
        company: "NuroTewedede",
        period: "2025 — Present",
        description:
          "Designed and shipped a direct producer-to-community commerce platform: schema, APIs, role-aware dashboards, and deployment.",
      },
      {
        title: "Software Developer — ICT & Networking Internship",
        company: "Butajira Polytechnic College",
        period: "2025",
        description:
          "Built a network asset and cable infrastructure management system during a solo three-month internship.",
      },
      {
        title: "Freelance Full-Stack Developer",
        company: "Self-employed",
        period: "2024 — Present",
        description:
          "Deliver web and mobile products for clients across commerce, tourism, and SaaS — from requirements to launch.",
      },
      {
        title: "Engineering & Data Projects",
        company: "Wolaita Sodo University",
        period: "2022 — Present",
        description:
          "Build student-focused applications and data tooling alongside a Computer Engineering curriculum.",
      },
    ],
    education: educationFor(
      "Specializing in computer engineering with a focus on software systems, databases, AI/ML, and applied data engineering. Graduating 2027.",
    ),
    faq: [
      {
        question: "What kind of full-stack work do you take on?",
        answer:
          "Web platforms, e-commerce and SaaS products, internal operations tools, Telegram Mini Apps, and Android apps. I work best when the scope includes the database and deployment, not just the UI.",
      },
      {
        question: "What is your core stack?",
        answer:
          "Next.js, React, TypeScript, Tailwind CSS, Supabase/PostgreSQL, Node.js, Python, and FastAPI, with Android/Expo and Telegram Mini Apps when the product needs them.",
      },
      {
        question: "Can you take a project from idea to launch?",
        answer:
          "Yes. I handle requirements, data modelling, API design, implementation, QA, and deployment. You get a working product and the operational notes to run it.",
      },
      {
        question: "Do you work with existing codebases?",
        answer:
          "Yes. I audit the current structure first, then make focused changes with tests and a clear rollback path instead of a risky rewrite.",
      },
      {
        question: "How do we start?",
        answer:
          "Send a short brief through the contact form or email real1editor@gmail.com. I will reply with scope, timeline, and the decisions we need to lock first.",
      },
    ],
    metrics: buildMetrics(8, getDomainCredentials("fullstack").length, {
      value: "8+",
      label: "Frameworks in production",
    }),
  },
  ece: {
    meta: {
      slug: "ece",
      isMaster: false,
      label: "ECE",
      title: "Electrical & Computer Engineering",
      role: "Computer Engineering Student & Infrastructure Engineer",
      tagline: "Networks, infrastructure, and the systems beneath the software.",
      description:
        "An engineering foundation applied to the physical and logical layers: campus networks, hardware architecture, operating systems, cybersecurity, and audit-grade infrastructure records.",
      heroEyebrow: "Electrical & Computer Engineering",
      heroKicker: "ECE & Infrastructure Engineer",
      typewriterRoles: [
        "Network & Infrastructure Engineer",
        "Computer Engineering Student",
        "Campus Network Auditor",
        "Linux & Security Practitioner",
        "Hardware-to-Software Engineer",
      ],
      skillLabels: {
        primary: "Engineering core",
        ai: "Applied systems",
        data: "Audit & records",
        locked: "Field toolkit",
      },
      projectsBlurb:
        "Infrastructure and applied systems work: campus network management, structured cabling audits, and port-level infrastructure records.",
      credentialsTitle: "ECE Credentials",
      credentialsBlurb:
        "Verified cybersecurity, digital safety, two-factor authentication, and AI/ML foundations training.",
      showPillarFilters: false,
      showDomains: false,
      showSeoPages: false,
      resumeUrl: "/ece/resume",
      availability: "Available for infrastructure & systems work",
    },
    role: "Computer Engineering Student & Infrastructure Engineer",
    roleShort: "ECE",
    bio: "I work at the layer beneath the software: campus networks, switch and port inventories, cable infrastructure, Linux systems, and security fundamentals. I model physical infrastructure as structured, auditable data.",
    about: [
      "I am a fifth-year Electrical & Computer Engineering candidate at Wolaita Sodo University, graduating in 2027.",
      "My ECE work spans computer networking, network automation, operating systems, hardware architecture, and cybersecurity.",
      "During a solo three-month ICT and networking internship at Butajira Polytechnic College, I built a network asset and cable infrastructure management system used to audit switches, ports, and cable runs.",
      "I work comfortably in Linux and Kali (WSL2), document infrastructure precisely, and treat security as a design constraint rather than a checklist.",
    ],
    heroBadge: {
      title: "ECE & Infrastructure",
      subtitle: "Networks · Systems · Security",
    },
    whatIBuild: [
      {
        title: "Network Management Systems",
        description:
          "Web-based operations consoles that model campuses, buildings, racks, switches, ports, cables, and endpoints as one auditable graph.",
      },
      {
        title: "Infrastructure Audits",
        description:
          "Structured cabling inventories, port mapping, asset ownership records, and repeatable audit workflows that replace spreadsheets.",
      },
      {
        title: "Secure Systems",
        description:
          "Linux-based tooling, access control, 2FA, and security-first configuration for systems that cannot afford casual assumptions.",
      },
    ],
    courseFocus: [
      {
        title: "Computer Networks",
        description:
          "OSI and TCP/IP layers, switching and routing, structured cabling, subnetting, and network troubleshooting.",
      },
      {
        title: "Hardware & Architecture",
        description:
          "Digital logic, computer organization, microcontrollers, and the physical constraints behind software performance.",
      },
      {
        title: "Operating Systems & Security",
        description:
          "Process and memory models, Linux administration, access control, 2FA, and defensive security fundamentals.",
      },
    ],
    skills: eceSkills,
    tools: [
      tool("Cisco Packet Tracer", "cisco"),
      tool("Wireshark", "wireshark"),
      tool("Kali Linux", "kalilinux"),
      tool("Linux", "linux"),
      tool("Git", "git"),
      tool("GitHub", "github"),
      tool("VS Code", "visualstudiocode", "/icons/visualstudiocode.svg"),
      tool("Postman", "postman"),
    ],
    experience: [
      {
        title: "ICT & Networking Intern",
        company: "Butajira Polytechnic College",
        period: "2025",
        description:
          "Completed a solo three-month internship and delivered a network asset, switch, port, and cable infrastructure management system used for campus audits.",
      },
      {
        title: "Network & Infrastructure Projects",
        company: "Wolaita Sodo University",
        period: "2022 — Present",
        description:
          "Applied coursework in networking, operating systems, hardware architecture, and cybersecurity to practical campus systems.",
      },
      {
        title: "Freelance Systems Developer",
        company: "Self-employed",
        period: "2024 — Present",
        description:
          "Build the software layer around physical operations: asset inventories, audit records, dashboards, and secure internal tools.",
      },
    ],
    education: educationFor(
      "Computer Engineering stream with a focus on networks, operating systems, hardware architecture, cybersecurity, and the software that operates physical infrastructure. Graduating 2027.",
    ),
    faq: [
      {
        question: "What ECE work have you delivered?",
        answer:
          "A campus network asset and cable infrastructure management system for Butajira Polytechnic College, delivered during a solo three-month ICT and networking internship, plus applied computer-vision and embedded coursework.",
      },
      {
        question: "Do you work on physical network infrastructure?",
        answer:
          "Yes. I map switches, ports, racks, cable runs, and endpoints, then turn that inventory into structured records that can be audited and updated.",
      },
      {
        question: "What security experience do you have?",
        answer:
          "Cybersecurity fundamentals, Linux and Kali practice, two-factor authentication, access control, and secure configuration. I treat security as a constraint on the design, not an afterthought.",
      },
      {
        question: "Can you build the software for an infrastructure team?",
        answer:
          "Yes. That is the intersection I work in: network operations plus full-stack software. The output is usually an internal console or audit system tailored to the team's actual workflow.",
      },
      {
        question: "How do we start?",
        answer:
          "Send the scope through the contact form or email real1editor@gmail.com. For infrastructure work, a short description of the sites, assets, and current tracking method is enough to begin.",
      },
    ],
    metrics: buildMetrics(3, getDomainCredentials("ece").length, {
      value: "5",
      label: "Core engineering areas",
    }),
  },
  ai: {
    meta: {
      slug: "ai",
      isMaster: false,
      label: "AI Systems",
      title: "AI Systems & Agent Engineering",
      role: "AI Systems & Agent Engineer",
      tagline: "Agentic systems designed for reliability, not demos.",
      description:
        "AI architecture with guardrails: agent orchestration, retrieval pipelines, evaluation, prompt systems, LLM performance, and security. Built to survive real users and real failure modes.",
      heroEyebrow: "AI Systems & Agent Engineering",
      heroKicker: "AI Systems Engineer",
      typewriterRoles: [
        "AI Agent Architect",
        "LLM Systems Engineer",
        "RAG & Evaluation Engineer",
        "Prompt Systems Designer",
        "AI Security Practitioner",
      ],
      skillLabels: {
        primary: "AI systems core",
        ai: "Models & tooling",
        data: "Retrieval & data",
        locked: "Delivery stack",
      },
      projectsBlurb:
        "Agentic automation and applied AI systems: a Telegram bot and Mini App, a real-time vision pipeline, and AI-assisted motion production.",
      credentialsTitle: "AI Systems Credentials",
      credentialsBlurb:
        "O'Reilly AI engineering badges, Udacity AI, INSA cyber training, the Udara agentic workshop, and Florida University YEEAP.",
      showPillarFilters: false,
      showDomains: false,
      showSeoPages: false,
      resumeUrl: "/ai/resume",
      availability: "Available for AI systems work",
    },
    role: "AI Systems & Agent Engineer",
    roleShort: "AI Systems",
    bio: "I design agentic systems with guardrails: retrieval pipelines, tool use, evaluation, prompt systems, and failure handling. The goal is an AI product that behaves predictably after the demo.",
    about: [
      "I am an AI systems engineer and fifth-year Computer Engineering student at Wolaita Sodo University, graduating in 2027.",
      "I work with agent orchestration, CrewAI, RAG pipelines, prompt engineering, LLM performance, evaluation, and AI security.",
      "I have shipped a Telegram bot and Mini App, built a computer-vision attendance pipeline, and completed a large body of O'Reilly AI engineering coursework with verified Credly badges.",
      "I treat prompts as code, retrieval as a data problem, and evaluation as the only honest measure of an AI system.",
    ],
    heroBadge: {
      title: "AI Systems & Agents",
      subtitle: "CrewAI · RAG · Evaluation",
    },
    whatIBuild: [
      {
        title: "Agent Systems",
        description:
          "Multi-step agents with explicit tools, state, guardrails, retries, and failure paths — not a single prompt wrapped in a chat bubble.",
      },
      {
        title: "Retrieval & Knowledge Assistants",
        description:
          "RAG pipelines with clean chunking, metadata, retrieval evaluation, and answers that cite the source instead of guessing.",
      },
      {
        title: "AI Automation",
        description:
          "Workflow automation that connects LLMs to real operations through APIs, webhooks, and idempotent serverless jobs.",
      },
    ],
    courseFocus: [
      {
        title: "AI Engineering",
        description:
          "Agent architecture, tool use, orchestration patterns, prompt systems, and the engineering discipline around probabilistic models.",
      },
      {
        title: "LLM Systems",
        description:
          "Retrieval, context management, latency and cost trade-offs, model evaluation, and production monitoring.",
      },
      {
        title: "AI Safety & Security",
        description:
          "Prompt injection, data privacy, access boundaries, responsible AI, and guardrails that fail closed.",
      },
    ],
    skills: aiSkills,
    tools: [
      tool("OpenAI", "openai", "/icons/openai.svg"),
      tool("LangChain", "langchain"),
      tool("Hugging Face", "huggingface"),
      tool("n8n", "n8n"),
      tool("Jupyter", "jupyter"),
      tool("Google Colab", "googlecolab"),
      tool("GitHub", "github"),
      tool("Vercel", "vercel"),
    ],
    experience: [
      {
        title: "AI Systems & Agent Projects",
        company: "Independent",
        period: "2025 — Present",
        description:
          "Design and ship agentic automation, retrieval pipelines, and evaluation harnesses, including a Telegram bot and Mini App.",
      },
      {
        title: "AI Engineering Track",
        company: "O'Reilly Media",
        period: "2026",
        description:
          "Completed thirteen verified AI engineering badges covering agents, CrewAI, LLM performance, prompt engineering, security, and evaluation.",
      },
      {
        title: "Agentic AI Workshop — 97% Score",
        company: "The Udara Project",
        period: "2026",
        description:
          "Completed an applied agentic AI workshop with a 97% assessment score and a working agent workflow.",
      },
      {
        title: "Engineering & Data Projects",
        company: "Wolaita Sodo University",
        period: "2022 — Present",
        description:
          "Applied AI, computer vision, and data coursework alongside a Computer Engineering curriculum.",
      },
    ],
    education: educationFor(
      "Computer Engineering stream with applied work in AI systems, machine learning, computer vision, and secure software. Graduating 2027.",
    ),
    faq: [
      {
        question: "What kind of AI systems do you build?",
        answer:
          "Agentic workflows, retrieval-augmented assistants, automation products, and evaluation harnesses. The emphasis is on systems that keep working when the model is wrong or the input is messy.",
      },
      {
        question: "Which AI tools do you use?",
        answer:
          "OpenAI APIs, LangChain, CrewAI, Hugging Face, n8n, TensorFlow, PyTorch, and Python. I choose the smallest stack that can be evaluated and operated reliably.",
      },
      {
        question: "How do you evaluate an AI system?",
        answer:
          "I define the task and failure modes first, build a representative evaluation set, measure retrieval and answer quality, and track latency and cost. A demo is not evidence.",
      },
      {
        question: "Can you integrate AI into an existing product?",
        answer:
          "Yes. I start with the data and the workflow, add the smallest useful model surface, and keep the integration behind clear interfaces so it can be replaced or disabled safely.",
      },
      {
        question: "How do we start?",
        answer:
          "Send the use case and the data you already have through the contact form or email real1editor@gmail.com. I will reply with the smallest reliable architecture and an evaluation plan.",
      },
    ],
    metrics: buildMetrics(3, getDomainCredentials("ai").length, {
      value: "13",
      label: "O'Reilly AI badges",
    }),
  },
  "ml-dl": {
    meta: {
      slug: "ml-dl",
      isMaster: false,
      label: "ML / DL",
      title: "Machine Learning & Deep Learning",
      role: "Machine Learning & Computer Vision Engineer",
      tagline: "Perception, recognition, and models that hold up outside the notebook.",
      description:
        "Applied machine learning with a computer-vision bias: face recognition, feature extraction, model prototyping, and evaluation. Notebook experiments are only the beginning.",
      heroEyebrow: "Machine Learning & Deep Learning",
      heroKicker: "ML & Computer Vision Engineer",
      typewriterRoles: [
        "Computer Vision Engineer",
        "Applied ML Engineer",
        "Deep Learning Practitioner",
        "Face Recognition Builder",
        "Model Evaluation Engineer",
      ],
      skillLabels: {
        primary: "ML & vision core",
        ai: "Training & evaluation",
        data: "Data & imaging",
        locked: "Engineering toolkit",
      },
      projectsBlurb:
        "Applied ML work with a computer-vision bias: a real-time recognition pipeline and AI-assisted visual generation.",
      credentialsTitle: "ML / DL Credentials",
      credentialsBlurb:
        "Verified machine learning, generative AI, computer vision, and AI fundamentals training.",
      showPillarFilters: false,
      showDomains: false,
      showSeoPages: false,
      resumeUrl: "/ml-dl/resume",
      availability: "Available for ML & vision work",
    },
    role: "Machine Learning & Computer Vision Engineer",
    roleShort: "ML / DL",
    bio: "I build applied machine learning with a computer-vision bias: face recognition, feature extraction, model prototyping, and evaluation. Notebooks are where a model starts, not where it ships.",
    about: [
      "I am a machine learning engineer and fifth-year Computer Engineering student at Wolaita Sodo University, graduating in 2027.",
      "My work centers on computer vision and applied deep learning: OpenCV capture pipelines, face detection and alignment, embedding extraction, and confidence-aware recognition.",
      "I have built a real-time biometric attendance system with Python, OpenCV, and FastAPI, and completed ML/GenAI coursework through O'Reilly, Udacity, and Florida University Southeast.",
      "I care about data quality, evaluation, and the failure modes that never appear in a clean demo.",
    ],
    heroBadge: {
      title: "Applied ML & Vision",
      subtitle: "OpenCV · TensorFlow · PyTorch",
    },
    whatIBuild: [
      {
        title: "Computer Vision Systems",
        description:
          "Camera capture, detection, alignment, embedding extraction, and recognition pipelines built for real lighting and real faces.",
      },
      {
        title: "Recognition & Verification",
        description:
          "Biometric matching with explicit confidence thresholds, reviewable records, and a clear path for ambiguous cases.",
      },
      {
        title: "Model Prototyping & Evaluation",
        description:
          "Dataset preparation, baseline models, metric selection, error analysis, and the decision to ship or stop.",
      },
    ],
    courseFocus: [
      {
        title: "Machine Learning Foundations",
        description:
          "Supervised and unsupervised learning, feature engineering, model selection, and honest evaluation.",
      },
      {
        title: "Deep Learning",
        description:
          "Neural network fundamentals, convolutional architectures, training loops, and transfer learning.",
      },
      {
        title: "Computer Vision",
        description:
          "Image processing, detection, alignment, embeddings, and recognition systems with OpenCV.",
      },
    ],
    skills: mlSkills,
    tools: [
      tool("Jupyter", "jupyter"),
      tool("Google Colab", "googlecolab"),
      tool("TensorFlow", "tensorflow"),
      tool("PyTorch", "pytorch"),
      tool("GitHub", "github"),
      tool("VS Code", "visualstudiocode", "/icons/visualstudiocode.svg"),
      tool("Git", "git"),
      tool("Postman", "postman"),
    ],
    experience: [
      {
        title: "ML & Computer Vision Projects",
        company: "Independent",
        period: "2025 — Present",
        description:
          "Build recognition pipelines, evaluation harnesses, and applied deep-learning prototypes with Python, OpenCV, and FastAPI.",
      },
      {
        title: "AI/ML Coursework",
        company: "O'Reilly · Udacity · Florida University Southeast",
        period: "2025 — 2026",
        description:
          "Completed verified ML, generative AI, and applied AI training, including a six-week YEEAP program.",
      },
      {
        title: "Engineering & Data Projects",
        company: "Wolaita Sodo University",
        period: "2022 — Present",
        description:
          "Applied machine learning, signal processing, and data coursework alongside a Computer Engineering curriculum.",
      },
    ],
    education: educationFor(
      "Computer Engineering stream with applied machine learning, computer vision, signal processing, and model evaluation. Graduating 2027.",
    ),
    faq: [
      {
        question: "What ML work have you built?",
        answer:
          "A real-time biometric face recognition attendance system using Python, OpenCV, and FastAPI, with detection, alignment, embedding extraction, confidence thresholds, and an auditable attendance ledger.",
      },
      {
        question: "Which frameworks do you use?",
        answer:
          "Python, OpenCV, TensorFlow, PyTorch, scikit-learn, NumPy, Pandas, Matplotlib, and Seaborn, with Jupyter and Google Colab for experimentation.",
      },
      {
        question: "How do you handle model failure?",
        answer:
          "I set confidence thresholds, log ambiguous matches for review, and design the product so a low-confidence result is visible instead of silently accepted.",
      },
      {
        question: "Can you productionize a model?",
        answer:
          "Yes. I wrap inference in a FastAPI service, validate inputs, define the response contract, and keep the model replaceable behind a stable interface.",
      },
      {
        question: "How do we start?",
        answer:
          "Send the problem, the data you have, and the decision the model should support. Email real1editor@gmail.com or use the contact form.",
      },
    ],
    metrics: buildMetrics(2, getDomainCredentials("ml-dl").length, {
      value: "5",
      label: "Vision specializations",
    }),
  },
  data: {
    meta: {
      slug: "data",
      isMaster: false,
      label: "Data",
      title: "Data Analysis & Visualization",
      role: "Data Analyst & Visualization Engineer",
      tagline: "Raw signals converted into decisions executives can defend.",
      description:
        "Python-driven analysis and clear visual communication: wrangling, statistics, dashboards, and the narrative that turns a table into a decision.",
      heroEyebrow: "Data Analysis & Visualization",
      heroKicker: "Data Analyst & Visualization Engineer",
      typewriterRoles: [
        "Python Data Analyst",
        "Dashboard & Visualization Builder",
        "Data Wrangling Specialist",
        "Statistics & Reporting Analyst",
        "Decision-Support Engineer",
      ],
      skillLabels: {
        primary: "Analysis core",
        ai: "Modeling & notebooks",
        data: "Visualization & BI",
        locked: "Delivery stack",
      },
      projectsBlurb:
        "Analytics and data-product work: dashboards, marketplace data models, infrastructure records, attendance data, and commerce analytics.",
      credentialsTitle: "Data Credentials",
      credentialsBlurb:
        "Verified data analysis, Python analytics, visualization, and machine-learning foundations training.",
      showPillarFilters: false,
      showDomains: false,
      showSeoPages: false,
      resumeUrl: "/data/resume",
      availability: "Available for data & analytics work",
    },
    role: "Data Analyst & Visualization Engineer",
    roleShort: "Data",
    bio: "I turn raw operational data into decisions: Python wrangling, statistical summaries, dashboards, and a narrative an executive can defend. The chart is only useful if it changes a decision.",
    about: [
      "I am a data analyst and fifth-year Computer Engineering student at Wolaita Sodo University, graduating in 2027.",
      "I work with Python, Pandas, NumPy, Matplotlib, Seaborn, SQL/PostgreSQL, Excel, and dashboard tooling.",
      "My projects include an analytics dashboard with role-based access and exportable reports, marketplace and network-asset data models, and attendance data from a computer-vision pipeline.",
      "I start with the question, clean the data in the open, and finish with a recommendation — not just a chart.",
    ],
    heroBadge: {
      title: "Data & Visualization",
      subtitle: "Python · SQL · Dashboards",
    },
    whatIBuild: [
      {
        title: "Analytics Dashboards",
        description:
          "Role-aware dashboards with drill-down filters, clear metric definitions, and exports that survive a real reporting cycle.",
      },
      {
        title: "Data Pipelines",
        description:
          "Python ingestion and cleaning, SQL modelling, validation checks, and repeatable transformations instead of one-off spreadsheets.",
      },
      {
        title: "Decision Reports",
        description:
          "Statistical summaries and visual narratives that state the finding, the uncertainty, and the recommended action.",
      },
    ],
    courseFocus: [
      {
        title: "Statistics & Analysis",
        description:
          "Descriptive statistics, distributions, hypothesis testing, and the discipline to separate signal from noise.",
      },
      {
        title: "Data Engineering",
        description:
          "Relational modelling, SQL, ingestion pipelines, data quality checks, and reproducible transformations.",
      },
      {
        title: "Visualization & Communication",
        description:
          "Chart selection, dashboard layout, annotation, and the narrative that makes a number actionable.",
      },
    ],
    skills: dataSkills,
    tools: [
      tool("Jupyter", "jupyter"),
      tool("Google Colab", "googlecolab"),
      tool("PostgreSQL", "postgresql"),
      tool("Excel", "microsoftexcel"),
      tool("Recharts", "recharts", "/icons/recharts.svg"),
      tool("GitHub", "github"),
      tool("VS Code", "visualstudiocode", "/icons/visualstudiocode.svg"),
      tool("Git", "git"),
    ],
    experience: [
      {
        title: "Data Analytics & Visualization Projects",
        company: "Independent",
        period: "2025 — Present",
        description:
          "Build dashboards, data models, and Python analysis pipelines for commerce, infrastructure, and attendance data.",
      },
      {
        title: "Data Analytics Trainee",
        company: "INFNOVA & Orange Digital Center",
        period: "2025",
        description:
          "Completed applied training in data analytics and visualization using Python.",
      },
      {
        title: "Engineering & Data Projects",
        company: "Wolaita Sodo University",
        period: "2022 — Present",
        description:
          "Applied data analysis, signal processing, and Python tooling alongside a Computer Engineering curriculum.",
      },
    ],
    education: educationFor(
      "Computer Engineering stream with applied statistics, data analysis, signal processing, and Python engineering. Graduating 2027.",
    ),
    faq: [
      {
        question: "What data work do you take on?",
        answer:
          "Exploratory analysis, data cleaning, SQL modelling, dashboard design, reporting automation, and decision-support documents. I work best when the question is clear and the data is real.",
      },
      {
        question: "Which tools do you use?",
        answer:
          "Python, Pandas, NumPy, Matplotlib, Seaborn, SQL/PostgreSQL, Excel, Recharts, Power BI, and Jupyter/Colab.",
      },
      {
        question: "Can you build a dashboard for a team?",
        answer:
          "Yes. I define the metrics with the team first, then build the data model, the dashboard, and the export/reporting path so it stays useful after launch.",
      },
      {
        question: "Do you clean messy data?",
        answer:
          "Yes. I document the cleaning decisions, validate the result, and keep the transformation reproducible so the numbers can be defended later.",
      },
      {
        question: "How do we start?",
        answer:
          "Send the question, the data sources, and who will use the output. Email real1editor@gmail.com or use the contact form.",
      },
    ],
    metrics: buildMetrics(5, getDomainCredentials("data").length, {
      value: "4",
      label: "Core analysis tools",
    }),
  },
  video: {
    meta: {
      slug: "video",
      isMaster: false,
      label: "Creative Studio",
      title: "Creative Studio & Video Production",
      role: "Video Editor & Motion Designer",
      tagline: "Story-first motion, edit, and sound built for retention.",
      description:
        "Full-cycle creative production: concept, edit, motion graphics, color, sound, and AI-assisted visuals. Craft in service of the message, not decoration.",
      heroEyebrow: "Creative Studio & Video Production",
      heroKicker: "Video Editor & Motion Designer",
      typewriterRoles: [
        "Short-Form Video Editor",
        "Motion Graphics Designer",
        "Commercial Creative Producer",
        "Color & Sound Finisher",
        "AI-Assisted Visual Storyteller",
      ],
      skillLabels: {
        primary: "Production core",
        ai: "AI-assisted creative",
        data: "Audience & retention",
        locked: "Studio toolkit",
      },
      projectsBlurb:
        "Creative production work: a full motion-design animation and a commercial social campaign, plus brand and web creative.",
      credentialsTitle: "Creative Studio Credentials",
      credentialsBlurb:
        "Verified video production, online course video, and multimedia development training.",
      showPillarFilters: false,
      showDomains: false,
      showSeoPages: false,
      resumeUrl: "/video/resume",
      availability: "Available for video & motion work",
    },
    role: "Video Editor & Motion Designer",
    roleShort: "Creative Studio",
    bio: "I produce story-first short-form video: concept, edit, motion graphics, color, sound, and AI-assisted visuals. Craft serves retention and the message — not decoration.",
    about: [
      "I am a video editor, motion designer, and fifth-year Computer Engineering student at Wolaita Sodo University, graduating in 2027.",
      "I run the full creative cycle: script and storyboard, edit, motion graphics, color grading, sound design, captions, and platform-native delivery.",
      "My work includes a full motion-production animation (Astropull) and a commercial social campaign for a rosemary oil brand, plus coursework in video for online learning and multimedia development.",
      "I use Premiere Pro, After Effects, CapCut Pro, and Canva, with AI-assisted visuals used as a supporting layer — never as a substitute for story.",
    ],
    heroBadge: {
      title: "Creative Studio",
      subtitle: "Premiere · After Effects · CapCut",
    },
    whatIBuild: [
      {
        title: "Short-Form Commercials",
        description:
          "Hook-first social edits with clean pacing, captions, color, and sound — built for the first three seconds and the full watch.",
      },
      {
        title: "Motion & Animation",
        description:
          "Storyboards, animated systems, transitions, and compositing that carry a concept instead of decorating it.",
      },
      {
        title: "Brand & Course Video",
        description:
          "Product storytelling, instructional video, and brand pieces with a consistent visual language across platforms.",
      },
    ],
    courseFocus: [
      {
        title: "Visual Storytelling",
        description:
          "Structure, pacing, shot selection, and the narrative decisions that happen before the timeline.",
      },
      {
        title: "Motion Design",
        description:
          "Keyframes, easing, typography in motion, compositing, and graphics that clarify rather than distract.",
      },
      {
        title: "Color & Sound",
        description:
          "Grade, contrast, texture, sound design, music editing, and the finish that makes an edit feel deliberate.",
      },
    ],
    skills: videoSkills,
    tools: [
      tool("Premiere Pro", "adobepremierepro"),
      tool("After Effects", "adobeaftereffects"),
      tool("CapCut", "capcut"),
      tool("Canva", "canva"),
      tool("Photoshop", "adobephotoshop"),
      tool("Audition", "adobeaudition"),
      tool("Figma", "figma"),
      tool("YouTube Studio", "youtube"),
    ],
    experience: [
      {
        title: "Motion Designer & Editor",
        company: "Astropull Animation",
        period: "2026",
        description:
          "Owned the full short-form animation pipeline: concept, storyboard, visual system, motion, sound, and delivery.",
      },
      {
        title: "Editor & Creative Producer",
        company: "Rosemary Oil Campaign",
        period: "2026",
        description:
          "Produced a commercial social campaign with hook design, color grading, sound design, captions, and platform-native delivery.",
      },
      {
        title: "Freelance Creative Studio",
        company: "Self-employed",
        period: "2023 — Present",
        description:
          "Deliver short-form video, motion graphics, and brand creative for clients across product and service categories.",
      },
    ],
    education: educationFor(
      "Computer Engineering stream combined with applied visual communication, multimedia development, and video production coursework. Graduating 2027.",
    ),
    faq: [
      {
        question: "What kind of video work do you produce?",
        answer:
          "Short-form social commercials, motion graphics and animation, product and brand pieces, and instructional video. I handle concept, edit, motion, color, sound, and delivery.",
      },
      {
        question: "Which tools do you use?",
        answer:
          "Adobe Premiere Pro, After Effects, CapCut Pro, Photoshop, Audition, Canva, and Figma, with AI-assisted visuals used as a supporting layer.",
      },
      {
        question: "Can you handle a project from concept to final cut?",
        answer:
          "Yes. I start with the objective and the hook, build a storyboard or shot plan, edit, finish color and sound, and deliver platform-ready exports.",
      },
      {
        question: "How fast can you turn around a short-form edit?",
        answer:
          "It depends on footage and revisions, but a focused short-form piece usually moves from brief to first cut in a few days. We agree on the scope and revision rounds before starting.",
      },
      {
        question: "How do we start?",
        answer:
          "Send the brief, references, footage status, and deadline through the contact form or email real1editor@gmail.com.",
      },
    ],
    metrics: buildMetrics(3, getDomainCredentials("video").length, {
      value: "4",
      label: "Production tools",
    }),
  },
};

/* ------------------------------- Master data ------------------------------ */

export const masterMeta: PortfolioMeta = {
  slug: "master",
  isMaster: true,
  label: "Master Portfolio",
  title: "Full-Stack, AI Systems, Data & Creative Engineering",
  role: "Full-Stack Developer · AI Systems · ECE",
  tagline: "Six specialized domains. One engineering standard.",
  description:
    "The complete portfolio of Abdrezak Shemsedin: full-stack engineering, ECE infrastructure, AI systems, machine learning, data analysis, and creative video production.",
  heroEyebrow: "Master Portfolio · Six Domains",
  heroKicker: "Ethiopian Engineer",
  typewriterRoles: [
    "Full-Stack Developer",
    "AI Systems Engineer",
    "ECE & Infrastructure Engineer",
    "Machine Learning Engineer",
    "Data Analyst",
    "Creative Video Producer",
  ],
  skillLabels: {
    primary: "Core development stack",
    ai: "AI / Machine Learning stack",
    data: "Python data & analysis stack",
    locked: "Additional engineering & creative",
  },
  projectsBlurb:
    "Eleven projects across six domains — commerce, infrastructure, AI, vision, data, and creative production.",
  credentialsTitle: "Credentials",
  credentialsBlurb:
    "Thirty-five verified records: O'Reilly Credly badges, Udacity nanodegrees, e-SHE coursework, Coursera, INSA, INFNOVA, and archive certificates.",
  showPillarFilters: true,
  showDomains: true,
  showSeoPages: true,
  resumeUrl: "/resume",
  availability: "Available for new projects",
};

export const masterSiteData: PortfolioData = {
  firstName: "Abdrezak",
  lastName: "Shemsedin",
  name: "Abdrezak Shemsedin",
  shortName: "Abdrezak Shemsedin",
  initials: "AS",
  role: masterMeta.role,
  roleShort: "Full-Stack · AI · ECE",
  bio: "I am an Ethiopian engineer building across the stack: production web platforms, AI agent systems, applied computer-vision pipelines, data products, network infrastructure, and visual stories. My work is grounded in engineering fundamentals and judged by whether it solves a real problem.",
  profilePhoto,
  about: masterAbout,
  availability: masterMeta.availability,
  location,
  resumeUrl: masterMeta.resumeUrl,
  socials,
  heroBadge: {
    title: "Six domains · One engineer",
    subtitle: "Full-Stack · AI · ECE · Data · Video",
  },
  metrics: [
    { value: "06", label: "Specialized domains" },
    { value: String(siteProjects.length), label: "Projects & case studies" },
    { value: String(masterCredentials.length), label: "Verified credentials" },
    { value: "05", label: "Languages spoken" },
  ],
  languages,
  whatIBuild: masterWhatIBuild,
  courseFocus: masterCourseFocus,
  seoPages: legacy.seoPages,
  skills: masterSkills,
  tools: masterTools,
  experience: masterExperience,
  education: educationFor(
    "Specializing in computer engineering with a focus on software systems, networks, AI/ML, and applied data engineering. Graduating 2027.",
  ),
  certifications: toCertifications(masterCredentials),
  projects: siteProjects.map(toProjectItem),
  faq: masterFaq,
};

function buildDomainData(slug: DomainSlug): PortfolioData {
  const definition = domainDefinitions[slug];
  const projects = getDomainProjects(slug);
  const credentials = getDomainCredentials(slug);
  return {
    firstName: "Abdrezak",
    lastName: "Shemsedin",
    name: "Abdrezak Shemsedin",
    shortName: "Abdrezak Shemsedin",
    initials: "AS",
    role: definition.role,
    roleShort: definition.roleShort,
    bio: definition.bio,
    profilePhoto,
    about: definition.about,
    availability: definition.meta.availability,
    location,
    resumeUrl: definition.meta.resumeUrl,
    socials,
    heroBadge: definition.heroBadge,
    metrics: definition.metrics,
    languages,
    whatIBuild: definition.whatIBuild,
    courseFocus: definition.courseFocus,
    seoPages: [],
    skills: definition.skills,
    tools: definition.tools,
    experience: definition.experience,
    education: definition.education,
    certifications: toCertifications(credentials),
    projects: projects.map(toProjectItem),
    faq: definition.faq,
  };
}

export const domainMetas: Record<DomainSlug, PortfolioMeta> = {
  fullstack: domainDefinitions.fullstack.meta,
  ece: domainDefinitions.ece.meta,
  ai: domainDefinitions.ai.meta,
  "ml-dl": domainDefinitions["ml-dl"].meta,
  data: domainDefinitions.data.meta,
  video: domainDefinitions.video.meta,
};

export const domainOrder: DomainSlug[] = [
  "fullstack",
  "ece",
  "ai",
  "ml-dl",
  "data",
  "video",
];

export const domainList: PortfolioMeta[] = domainOrder.map(
  (slug) => domainMetas[slug],
);

export interface DomainCard {
  slug: DomainSlug;
  label: string;
  title: string;
  tagline: string;
  description: string;
  role: string;
  projectCount: number;
  credentialCount: number;
}

export function getDomainCards(): DomainCard[] {
  return domainOrder.map((slug) => {
    const meta = domainMetas[slug];
    return {
      slug,
      label: meta.label,
      title: meta.title,
      tagline: meta.tagline,
      description: meta.description,
      role: meta.role,
      projectCount: getDomainProjects(slug).length,
      credentialCount: getDomainCredentials(slug).length,
    };
  });
}

const domainDataCache = new Map<DomainSlug, PortfolioData>();

export function getDomainData(slug: DomainSlug): PortfolioData {
  const cached = domainDataCache.get(slug);
  if (cached) return cached;
  const data = buildDomainData(slug);
  domainDataCache.set(slug, data);
  return data;
}

export function isDomainSlug(value: string): value is DomainSlug {
  return (domainOrder as string[]).includes(value);
}

export function getMasterView(): PortfolioView {
  return {
    data: masterSiteData,
    credentials: masterCredentials,
    meta: masterMeta,
  };
}

export function getDomainView(slug: DomainSlug): PortfolioView {
  return {
    data: getDomainData(slug),
    credentials: getDomainCredentials(slug),
    meta: domainMetas[slug],
  };
}

export function getDomainProjectCount(slug: DomainSlug): number {
  return getDomainProjects(slug).length;
}

export function getDomainCredentialCount(slug: DomainSlug): number {
  return getDomainCredentials(slug).length;
}

/* -------------------------------- Metadata -------------------------------- */

export function getDomainMetadata(slug: DomainSlug): Metadata {
  const meta = domainMetas[slug];
  const data = getDomainData(slug);
  const url = `${siteUrl}/${slug}`;
  const title = `${meta.title} — Abdrezak Shemsedin`;
  const description = `${meta.description} ${data.role} based in ${location}.`;
  return {
    title: meta.title,
    description,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title,
      description,
      url,
      siteName: "Abdrezak Shemsedin",
      type: "profile",
      locale: "en_US",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
      creator: "@real1editor",
    },
  };
}

export function getDomainResumeMetadata(slug: DomainSlug): Metadata {
  const meta = domainMetas[slug];
  return {
    title: `${meta.label} Resume`,
    description: `Print-ready ${meta.title.toLowerCase()} resume for Abdrezak Shemsedin.`,
    alternates: { canonical: `/${slug}/resume` },
  };
}
