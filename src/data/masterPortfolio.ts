/* ==========================================================================
   ABDREZAK SHEMSEDIN — MASTER PORTFOLIO DATA CORE
   Single source of truth for the 6-pillar ecosystem, flagship systems, and
   the Credentials Vault. UI components must read from this file only.
   ========================================================================== */

/* ---------------------------------- Types --------------------------------- */

export type PillarId = "ece" | "fullstack" | "ai" | "ml-dl" | "data" | "video";
export type CredentialTag = PillarId | "vault";
export type CredentialFilter = "all" | CredentialTag;
export type SocialId =
  | "github"
  | "linkedin"
  | "credly"
  | "telegram"
  | "linktree"
  | "email";

export interface Education {
  degree: string;
  stream: string;
  institution: string;
  standing: string;
  expectedGraduation: string;
}

export interface SocialLink {
  id: SocialId;
  label: string;
  handle: string;
  href: string;
}

export interface Discipline {
  id: string;
  title: string;
  description: string;
  metric?: string;
  metricLabel?: string;
  href?: string;
}

export interface Profile {
  fullName: string;
  alias: string;
  initials: string;
  headline: string;
  shortHeadline: string;
  philosophy: string;
  philosophyPrinciples: string[];
  bio: string;
  location: string;
  availability: string;
  siteUrl: string;
  avatarUrl: string;
  education: Education;
  socials: SocialLink[];
  disciplines: Discipline[];
}

export interface Pillar {
  id: PillarId;
  order: number;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  coreCompetencies: string[];
  subSkills: string[];
}

export type ProjectStatus = "Live" | "Production build" | "Published";

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  role: string;
  status: ProjectStatus;
  summary: string;
  problem: string;
  architecture: string[];
  solution: string;
  impact: string[];
  stack: string[];
  pillars: PillarId[];
  featuredOnHub: boolean;
  links: ProjectLink[];
}

export interface Credential {
  id: string;
  title: string;
  issuer: string;
  /** Human-readable date shown in the UI. */
  issueDate: string;
  /** ISO date used for stable sorting. Approximate years use Jan 1. */
  issuedAt: string;
  pillarTags: CredentialTag[];
  /** true = surfaced on the matching pillar spoke; false = vault-only. */
  featuredInPillar: boolean;
  /** Public credential / badge identifier when one exists. */
  credentialId?: string;
  /** Direct verification link. Local certificate paths are also allowed. */
  verificationUrl?: string;
  verificationLabel: string;
  skills?: string[];
  /** Legacy portfolio certificates kept for completeness. */
  archived?: boolean;
}

/* --------------------------------- Profile -------------------------------- */

export const profile: Profile = {
  fullName: "Abdrezak Shemsedin Hakimo",
  alias: "real1editor",
  initials: "ASH",
  headline:
    "Electrical & Computer Engineering Candidate (2027) | Full-Stack, AI Systems & Data Engineer",
  shortHeadline: "ECE '27 · Full-Stack · AI Systems · Data",
  philosophy:
    "Relentless execution, grounded humility, and engineering excellence (Itqan). Building scalable software, intelligent agents, and visual stories that solve real-world problems.",
  philosophyPrinciples: [
    "Relentless execution over performative productivity.",
    "Grounded humility: measure the result, not the narrative.",
    "Itqan — finish the work to the standard it deserves.",
  ],
  bio: "Fifth-year Electrical & Computer Engineering candidate at Wolaita Sodo University, graduating in 2027. I build across the stack: production web platforms, AI agent systems, applied computer-vision pipelines, data products, and visual stories. My work is grounded in engineering fundamentals and judged by whether it solves a real problem.",
  location: "Wolaita Sodo / Butajira, Ethiopia",
  availability: "Open to high-impact engineering roles, collaborations, and select freelance work.",
  siteUrl: "https://abdrezak-shemsedin.vercel.app",
  avatarUrl:
    "https://res.cloudinary.com/thco145k/image/upload/f_auto,q_auto,w_900,h_1100,c_fill/photo_2026-08-31_12-22-01",
  education: {
    degree: "BSc in Electrical & Computer Engineering",
    stream: "Computer Stream",
    institution: "Wolaita Sodo University",
    standing: "5th Year Candidate",
    expectedGraduation: "2027",
  },
  socials: [
    {
      id: "github",
      label: "GitHub",
      handle: "@real1editor",
      href: "https://github.com/real1editor",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      handle: "in/abdrezak-shemsedin",
      href: "https://www.linkedin.com/in/abdrezak-shemsedin",
    },
    {
      id: "credly",
      label: "Credly",
      handle: "abdrezak-shemsedin",
      href: "https://www.credly.com/users/abdrezak-shemsedin",
    },
    {
      id: "telegram",
      label: "Telegram Bot",
      handle: "@real1editorbot",
      href: "https://t.me/real1editorbot",
    },
    {
      id: "linktree",
      label: "Linktree",
      handle: "real1editor",
      href: "https://linktr.ee/real1editor",
    },
    {
      id: "email",
      label: "Email",
      handle: "abdrezakonline@gmail.com",
      href: "mailto:abdrezakonline@gmail.com",
    },
  ],
  disciplines: [
    {
      id: "chess",
      title: "Tactical Chess",
      description:
        "Pattern recognition, calculation, and calm decision-making under a ticking clock — practiced on Lichess.",
      metric: "Lichess",
      metricLabel: "Active board",
      href: "https://lichess.org",
    },
    {
      id: "draughts",
      title: "Draughts",
      description:
        "Positional patience and forcing-line calculation. A second board for the same strategic muscle.",
      metric: "Board",
      metricLabel: "Discipline",
    },
    {
      id: "sudoku",
      title: "Sudoku & Logic Puzzles",
      description:
        "Constraint satisfaction without a keyboard. Daily reps for deduction, candidate elimination, and focus.",
      metric: "Daily",
      metricLabel: "Practice",
    },
    {
      id: "wingchun",
      title: "Wing Chun Conditioning",
      description:
        "Structural alignment, economy of motion, and consistent physical conditioning. Discipline that transfers to deep work.",
      metric: "Practice",
      metricLabel: "Physical",
    },
    {
      id: "typing",
      title: "Verified Touch Typing",
      description:
        "Ratatype Silver certificate. Speed is useful; accuracy is the standard.",
      metric: "47 WPM",
      metricLabel: "96.3% accuracy",
      href: "https://ratatype.com/C7013407EN_NEW",
    },
  ],
};

/* --------------------------------- Pillars -------------------------------- */

export const pillarOrder = [
  "ece",
  "fullstack",
  "ai",
  "ml-dl",
  "data",
  "video",
] as const satisfies readonly PillarId[];

export const pillars: Pillar[] = [
  {
    id: "ece",
    order: 1,
    title: "Electrical & Computer Engineering",
    shortTitle: "ECE",
    tagline: "Networks, infrastructure, and the systems beneath the software.",
    description:
      "An engineering foundation applied to the physical and logical layers: campus networks, hardware architecture, operating systems, cybersecurity, and audit-grade infrastructure records.",
    coreCompetencies: [
      "Computer Networking",
      "Network Automation",
      "Operating Systems",
      "Hardware Architecture",
      "Cybersecurity",
    ],
    subSkills: [
      "Structured Cabling",
      "Port & Switch Mapping",
      "Asset Auditing",
      "Linux / Kali WSL2",
      "2FA",
    ],
  },
  {
    id: "fullstack",
    order: 2,
    title: "Full-Stack Web & App Development",
    shortTitle: "Full-Stack",
    tagline: "From database schema to shipped interface.",
    description:
      "Production web and mobile products built with strict types, clean data models, and deployment discipline. The goal is not a demo — it is a system people can rely on.",
    coreCompetencies: [
      "Next.js",
      "TypeScript",
      "React",
      "Supabase / PostgreSQL",
      "FastAPI",
      "Android Development",
    ],
    subSkills: [
      "Tailwind CSS",
      "Telegram Bot API & Mini Apps",
      "REST APIs",
      "Git / GitHub CI-CD",
      "QA Software Testing",
    ],
  },
  {
    id: "ai",
    order: 3,
    title: "AI Systems & Agent Engineering",
    shortTitle: "AI Systems",
    tagline: "Agentic systems designed for reliability, not demos.",
    description:
      "AI architecture with guardrails: agent orchestration, retrieval pipelines, evaluation, prompt systems, LLM performance, and security. Built to survive real users and real failure modes.",
    coreCompetencies: [
      "AI Agent Architecture",
      "CrewAI",
      "LLM Performance Engineering",
      "Prompt Engineering",
      "AI Security & Ethics",
    ],
    subSkills: [
      "RAG Pipelines",
      "Model Evaluation",
      "ChatGPT Engineering",
      "Workflow Automation",
    ],
  },
  {
    id: "ml-dl",
    order: 4,
    title: "Machine Learning & Deep Learning",
    shortTitle: "ML / DL",
    tagline: "Perception, recognition, and models that hold up outside the notebook.",
    description:
      "Applied machine learning with a computer-vision bias: face recognition, feature extraction, model prototyping, and evaluation. Notebook experiments are only the beginning.",
    coreCompetencies: [
      "Python",
      "OpenCV",
      "ML Foundations",
      "Computer Vision",
      "Data Modeling",
    ],
    subSkills: [
      "Biometric Recognition",
      "Google Colab",
      "Feature Extraction",
      "Model Prototyping",
    ],
  },
  {
    id: "data",
    order: 5,
    title: "Data Analysis & Visualization",
    shortTitle: "Data",
    tagline: "Raw signals converted into decisions executives can defend.",
    description:
      "Python-driven analysis and clear visual communication: wrangling, statistics, dashboards, and the narrative that turns a table into a decision.",
    coreCompetencies: [
      "Python Data Analytics",
      "Data Visualization",
      "Statistical Analysis",
      "Data Wrangling",
    ],
    subSkills: [
      "Pandas",
      "Matplotlib / Seaborn",
      "Dashboard Design",
      "Excel Analytics",
    ],
  },
  {
    id: "video",
    order: 6,
    title: "Creative Studio & Video Production",
    shortTitle: "Creative Studio",
    tagline: "Story-first motion, edit, and sound built for retention.",
    description:
      "Full-cycle creative production: concept, edit, motion graphics, color, sound, and AI-assisted visuals. Craft in service of the message, not decoration.",
    coreCompetencies: [
      "Adobe Premiere Pro",
      "After Effects",
      "Motion Graphics",
      "CapCut Pro",
      "Visual Storytelling",
    ],
    subSkills: [
      "Color Grading",
      "Sound Design",
      "Short-Form Retention Editing",
      "AI-Assisted Visuals",
      "Canva Pro",
    ],
  },
];

/* --------------------------------- Projects ------------------------------- */

export const projects: Project[] = [
  {
    slug: "nurotewedede",
    title: "NuroTewedede",
    category: "Civic Commerce Platform",
    year: "2026",
    role: "Founder & Full-Stack Architect",
    status: "Live",
    summary:
      "A full-stack platform connecting regional farming woredas directly to neighborhood Iddir halls to mitigate food inflation in Ethiopia.",
    problem:
      "Regional producers and neighborhood Iddir halls were separated by layers of intermediaries, opaque pricing, and fragmented supply signals. The result was avoidable food inflation for households and weak bargaining power for farmers.",
    architecture: [
      "Next.js App Router and TypeScript front end with a low-friction, mobile-first ordering flow.",
      "Supabase / PostgreSQL schema modeling woredas, producers, halls, listings, and orders with row-level access rules.",
      "Role-aware dashboards for producers and hall coordinators, with server-side validation and realtime inventory updates.",
    ],
    solution:
      "A direct producer-to-hall marketplace that replaces the informal chain with a transparent digital procurement flow — from woreda listing to hall order.",
    impact: [
      "Establishes a direct trade channel between woreda producers and neighborhood Iddir halls.",
      "Reduces intermediary markup and makes local food pricing more legible.",
      "Gives community institutions a repeatable digital procurement workflow.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL"],
    pillars: ["fullstack", "data"],
    featuredOnHub: true,
    links: [
      { label: "Live platform", href: "https://nurotewedede.vercel.app" },
    ],
  },
  {
    slug: "butajira-polytechnic-net",
    title: "Butajira Polytechnic Net Management",
    category: "ICT Operations System",
    year: "2025",
    role: "Solo Developer — 3-Month ICT & Networking Internship",
    status: "Live",
    summary:
      "Enterprise web app built during a solo 3-month ICT & Networking internship to track and audit campus switches, cables, and ports.",
    problem:
      "Campus network assets were tracked across disconnected spreadsheets and memory. Port ownership, cable runs, switch inventory, and audit history were slow to verify and easy to lose.",
    architecture: [
      "Next.js and TypeScript operations console backed by Supabase / PostgreSQL.",
      "Relational asset graph: campus → building → rack → switch → port → cable → endpoint.",
      "Audit-ready records for port status, switch inventory, cable runs, and asset ownership.",
    ],
    solution:
      "A single network-management workspace where physical infrastructure is modeled as structured data and every port has a traceable record.",
    impact: [
      "Replaced fragmented spreadsheets with one auditable source of truth.",
      "Made switch, cable, and port audits repeatable instead of tribal knowledge.",
      "Delivered end-to-end within a solo three-month internship window.",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Network Auditing",
    ],
    pillars: ["ece", "fullstack"],
    featuredOnHub: true,
    links: [
      {
        label: "Live system",
        href: "https://butajira-polytechnic-net.vercel.app",
      },
    ],
  },
  {
    slug: "biometric-attendance",
    title: "Biometric Face Recognition Attendance System",
    category: "Applied ML System",
    year: "2026",
    role: "ML & Backend Engineer",
    status: "Production build",
    summary:
      "Real-time facial recognition attendance pipeline built with Python, OpenCV, and FastAPI.",
    problem:
      "Manual attendance is slow, proxy-prone, and difficult to audit. Institutions need a fast check-in path with a verifiable record behind every entry.",
    architecture: [
      "Python and OpenCV capture pipeline with face detection, alignment, and embedding extraction.",
      "FastAPI inference service exposing enrollment and recognition endpoints.",
      "Attendance ledger with timestamped match events, confidence thresholds, and reviewable records.",
    ],
    solution:
      "A real-time recognition pipeline that turns a camera stream into a clean attendance event — with explicit confidence handling instead of silent guesses.",
    impact: [
      "Removes manual roll-call friction from attendance capture.",
      "Creates auditable, timestamped records for every recognized entry.",
      "Establishes a reusable computer-vision pipeline for future biometric systems.",
    ],
    stack: [
      "Python",
      "OpenCV",
      "FastAPI",
      "NumPy",
      "Computer Vision",
      "REST APIs",
    ],
    pillars: ["ml-dl", "ai", "fullstack"],
    featuredOnHub: true,
    links: [],
  },
  {
    slug: "real1editor-bot",
    title: "@real1editorbot & Telegram Mini App",
    category: "Automation Product",
    year: "2026",
    role: "Bot & Mini App Developer",
    status: "Live",
    summary:
      "Interactive Telegram bot and embedded web Mini App for mobile workflow automation.",
    problem:
      "Mobile workflows are fragmented across apps and tabs. Users need fast, conversational access to tools without installing and learning another native app.",
    architecture: [
      "Telegram Bot API command layer with persistent per-user state and guarded command handlers.",
      "Embedded Telegram Mini App built with Next.js, TypeScript, and the Telegram WebApp SDK.",
      "Automation jobs routed to serverless endpoints with idempotent handlers and explicit failure states.",
    ],
    solution:
      "A conversational front door plus an embedded Mini App: quick actions happen in chat, richer workflows open inside Telegram.",
    impact: [
      "Ships a mobile workflow surface with zero app-store install friction.",
      "Combines conversational speed with a real web UI for complex actions.",
      "Provides a reusable bot-and-Mini-App pattern for future automation products.",
    ],
    stack: [
      "Telegram Bot API",
      "Telegram Mini Apps",
      "Next.js",
      "TypeScript",
      "Serverless",
    ],
    pillars: ["fullstack", "ai"],
    featuredOnHub: true,
    links: [{ label: "Open the bot", href: "https://t.me/real1editorbot" }],
  },
  {
    slug: "astropull-animation",
    title: "Astropull Animation Video",
    category: "Motion Production",
    year: "2026",
    role: "Motion Designer & Editor",
    status: "Published",
    summary:
      "Full-cycle motion production and AI-assisted visual storytelling for a short-form animation piece.",
    problem:
      "A concept needed a polished visual narrative without a full studio pipeline or a large production team.",
    architecture: [
      "Script, storyboard, and shot planning before a single frame was animated.",
      "After Effects and Premiere Pro compositing, timing, sound design, and final grade.",
      "AI-assisted visual generation used as a supporting asset layer — never as a substitute for story.",
    ],
    solution:
      "A complete short-form animation pipeline owned end-to-end: concept, visual system, motion, sound, and delivery.",
    impact: [
      "Delivered a complete animation from concept to publish.",
      "Proved a lean, AI-assisted production workflow without sacrificing finish.",
      "Expanded the creative studio capability beyond editing into full motion design.",
    ],
    stack: [
      "Adobe Premiere Pro",
      "After Effects",
      "Motion Graphics",
      "AI-Assisted Visuals",
    ],
    pillars: ["video"],
    featuredOnHub: false,
    links: [
      { label: "Watch on YouTube", href: "https://youtu.be/Sl0Jd4F4Gyg" },
    ],
  },
  {
    slug: "rosemary-oil-promo",
    title: "Rosemary Oil Company Promo",
    category: "Commercial Creative",
    year: "2026",
    role: "Editor & Creative Producer",
    status: "Published",
    summary:
      "Commercial social media ad creative for a rosemary oil brand.",
    problem:
      "A natural-products brand needed scroll-stopping social creative that communicated product value quickly and felt premium on a phone screen.",
    architecture: [
      "Short-form concept and hook design built around the first three seconds.",
      "CapCut Pro and Premiere edit with color grading, sound design, and clean captions.",
      "Platform-native aspect ratios and retention-first pacing for social feeds.",
    ],
    solution:
      "A compact commercial edit that pairs product close-ups with a clear visual rhythm and a direct call to action.",
    impact: [
      "Delivered publish-ready commercial creative for social distribution.",
      "Built a repeatable short-form ad workflow from concept to final cut.",
      "Extended the studio portfolio into brand and product storytelling.",
    ],
    stack: ["CapCut Pro", "Premiere Pro", "Color Grading", "Sound Design"],
    pillars: ["video"],
    featuredOnHub: false,
    links: [
      { label: "Watch on YouTube", href: "https://youtu.be/tt7q2jvk6-A" },
    ],
  },
];

/* ------------------------------- Credentials ------------------------------ */
/*
  HOW TO APPEND A NEW CREDENTIAL
  --------------------------------------------------------------------------
  1. Copy any object below.
  2. Give it a unique kebab-case `id`.
  3. Set `pillarTags` to one or more of: ece | fullstack | ai | ml-dl | data |
     video | vault.
  4. Set `featuredInPillar: true` to surface it on the matching spoke page,
     or false to keep it vault-only.
  5. Add the public `credentialId` and a direct `verificationUrl` when one
     exists. Never invent a verification link.
  6. Keep `issuedAt` as an ISO date for stable sorting; `issueDate` is the
     human-readable label rendered in the vault.
  The UI, filters, counts, and pillar pages update automatically.
*/

export const credentials: Credential[] = [
  /* -------------------- Spoke-featured: AI / ML / Credly ------------------- */
  {
    id: "oreilly-ml-data-science-genai",
    title: "ML, Data Science & GenAI",
    issuer: "O'Reilly Media",
    issueDate: "22 May 2026",
    issuedAt: "2026-05-22",
    pillarTags: ["ml-dl", "data", "ai"],
    featuredInPillar: true,
    credentialId: "98950b0f-6345-4756-903d-d30cc597caf0",
    verificationUrl:
      "https://www.credly.com/badges/98950b0f-6345-4756-903d-d30cc597caf0",
    verificationLabel: "Verify on Credly",
    skills: ["Python", "Machine Learning", "Data Science", "Generative AI"],
  },
  {
    id: "oreilly-ai-engineering-masterclass",
    title: "AI Engineering Masterclass",
    issuer: "O'Reilly Media",
    issueDate: "07 May 2026",
    issuedAt: "2026-05-07",
    pillarTags: ["ai"],
    featuredInPillar: true,
    credentialId: "c7b43b17-e0da-4f4d-89e9-3baedf7c30c5",
    verificationUrl:
      "https://www.credly.com/badges/c7b43b17-e0da-4f4d-89e9-3baedf7c30c5",
    verificationLabel: "Verify on Credly",
    skills: ["AI Engineering", "Python", "TensorFlow", "PyTorch"],
  },
  {
    id: "oreilly-effective-chatgpt-prompts",
    title: "Effective ChatGPT Prompts",
    issuer: "O'Reilly Media",
    issueDate: "15 Apr 2026",
    issuedAt: "2026-04-15",
    pillarTags: ["ai"],
    featuredInPillar: true,
    credentialId: "c077e548-a7a8-44bf-8d7b-af7071272a46",
    verificationUrl:
      "https://www.credly.com/badges/c077e548-a7a8-44bf-8d7b-af7071272a46",
    verificationLabel: "Verify on Credly",
    skills: ["Prompt Engineering", "ChatGPT", "LLMs"],
  },
  {
    id: "oreilly-ai-agents-basics-advanced",
    title: "AI Agents: Basics to Advanced",
    issuer: "O'Reilly Media",
    issueDate: "09 Mar 2026",
    issuedAt: "2026-03-09",
    pillarTags: ["ai"],
    featuredInPillar: true,
    credentialId: "f9975f12-4910-4e9d-866b-24149fd03114",
    verificationUrl:
      "https://www.credly.com/badges/f9975f12-4910-4e9d-866b-24149fd03114",
    verificationLabel: "Verify on Credly",
    skills: ["AI Agents", "n8n", "Workflow Automation"],
  },
  {
    id: "oreilly-ai-ml-foundations",
    title: "AI & ML Foundations",
    issuer: "O'Reilly Media",
    issueDate: "25 Feb 2026",
    issuedAt: "2026-02-25",
    pillarTags: ["ece", "ai", "ml-dl"],
    featuredInPillar: true,
    credentialId: "e541fd6d-84fe-484e-b161-34e8a4b4bbc3",
    verificationUrl:
      "https://www.credly.com/badges/e541fd6d-84fe-484e-b161-34e8a4b4bbc3",
    verificationLabel: "Verify on Credly",
    skills: ["AI", "Machine Learning", "Python", "TensorFlow"],
  },
  {
    id: "oreilly-ai-security-ethics",
    title: "AI Security & Ethics",
    issuer: "O'Reilly Media",
    issueDate: "20 Feb 2026",
    issuedAt: "2026-02-20",
    pillarTags: ["ai"],
    featuredInPillar: true,
    credentialId: "719d0670-f8ec-4bcf-ac35-d012397826e9",
    verificationUrl:
      "https://www.credly.com/badges/719d0670-f8ec-4bcf-ac35-d012397826e9",
    verificationLabel: "Verify on Credly",
    skills: ["AI Security", "Responsible AI", "Data Privacy"],
  },
  {
    id: "oreilly-ai-agents-crewai",
    title: "AI Agents with CrewAI",
    issuer: "O'Reilly Media",
    issueDate: "18 Feb 2026",
    issuedAt: "2026-02-18",
    pillarTags: ["ai"],
    featuredInPillar: true,
    credentialId: "be973005-d399-46e4-b95a-64c1fbea559f",
    verificationUrl:
      "https://www.credly.com/badges/be973005-d399-46e4-b95a-64c1fbea559f",
    verificationLabel: "Verify on Credly",
    skills: ["CrewAI", "AI Agents", "LLMs"],
  },
  {
    id: "oreilly-chatgpt-engineering",
    title: "ChatGPT Engineering",
    issuer: "O'Reilly Media",
    issueDate: "01 Feb 2026",
    issuedAt: "2026-02-01",
    pillarTags: ["ai"],
    featuredInPillar: true,
    credentialId: "89e425b7-2a3d-4c86-943b-44b9e3c99639",
    verificationUrl:
      "https://www.credly.com/badges/89e425b7-2a3d-4c86-943b-44b9e3c99639",
    verificationLabel: "Verify on Credly",
    skills: ["Prompt Engineering", "ChatGPT", "Workflow Automation"],
  },
  {
    id: "oreilly-chatgpt-engineering-essentials",
    title: "ChatGPT Engineering Essentials",
    issuer: "O'Reilly Media",
    issueDate: "31 Jan 2026",
    issuedAt: "2026-01-31",
    pillarTags: ["ai"],
    featuredInPillar: true,
    credentialId: "cf03588f-fab1-48a3-a8ae-0a7c8ca60339",
    verificationUrl:
      "https://www.credly.com/badges/cf03588f-fab1-48a3-a8ae-0a7c8ca60339",
    verificationLabel: "Verify on Credly",
    skills: ["Prompt Engineering", "ChatGPT", "Generative AI"],
  },
  {
    id: "oreilly-llms-prompt-engineering",
    title: "LLMs and Prompt Engineering",
    issuer: "O'Reilly Media",
    issueDate: "29 Jan 2026",
    issuedAt: "2026-01-29",
    pillarTags: ["ai"],
    featuredInPillar: true,
    credentialId: "70848d86-16c3-4ac3-87bc-dbafb9170a3a",
    verificationUrl:
      "https://www.credly.com/badges/70848d86-16c3-4ac3-87bc-dbafb9170a3a",
    verificationLabel: "Verify on Credly",
    skills: ["LLMs", "Prompt Engineering", "NLP"],
  },
  {
    id: "oreilly-llm-performance-engineering",
    title: "LLM Performance Engineering",
    issuer: "O'Reilly Media",
    issueDate: "25 Jan 2026",
    issuedAt: "2026-01-25",
    pillarTags: ["ai"],
    featuredInPillar: true,
    credentialId: "7a168268-33d4-4cf2-848f-cd9f9ae2a501",
    verificationUrl:
      "https://www.credly.com/badges/7a168268-33d4-4cf2-848f-cd9f9ae2a501",
    verificationLabel: "Verify on Credly",
    skills: ["LLM Performance", "Model Evaluation", "Optimization"],
  },
  {
    id: "oreilly-generative-ai-basics",
    title: "Generative AI Basics",
    issuer: "O'Reilly Media",
    issueDate: "23 Jan 2026",
    issuedAt: "2026-01-23",
    pillarTags: ["ai", "ml-dl"],
    featuredInPillar: true,
    credentialId: "a8c2aa80-e1cb-4c2a-a29f-f0edf22a7947",
    verificationUrl:
      "https://www.credly.com/badges/a8c2aa80-e1cb-4c2a-a29f-f0edf22a7947",
    verificationLabel: "Verify on Credly",
    skills: ["Generative AI", "AI Fundamentals"],
  },
  {
    id: "oreilly-generative-ai-intro",
    title: "Generative AI Intro",
    issuer: "O'Reilly Media",
    issueDate: "23 Jan 2026",
    issuedAt: "2026-01-23",
    pillarTags: ["ai", "ml-dl"],
    featuredInPillar: true,
    credentialId: "71b23a1c-92c6-4b76-b314-5d2cdee04ff5",
    verificationUrl:
      "https://www.credly.com/badges/71b23a1c-92c6-4b76-b314-5d2cdee04ff5",
    verificationLabel: "Verify on Credly",
    skills: ["Generative AI", "AI Fundamentals"],
  },

  /* --------------------------- Udacity Nanodegrees ------------------------- */
  {
    id: "udacity-data-analysis-fundamentals",
    title: "Data Analysis Fundamentals Nanodegree",
    issuer: "Udacity",
    issueDate: "08 Feb 2026",
    issuedAt: "2026-02-08",
    pillarTags: ["data"],
    featuredInPillar: true,
    credentialId: "1ea3f2ba-052a-11f1-8956-ab19658074e8",
    verificationUrl:
      "https://udacity.com/certificate/e/1ea3f2ba-052a-11f1-8956-ab19658074e8",
    verificationLabel: "Verify on Udacity",
    skills: ["Python", "Pandas", "Data Analysis"],
  },
  {
    id: "udacity-android-developer-fundamentals",
    title: "Android Developer Fundamentals Nanodegree",
    issuer: "Udacity",
    issueDate: "21 May 2026",
    issuedAt: "2026-05-21",
    pillarTags: ["fullstack"],
    featuredInPillar: true,
    credentialId: "e6c5c088-54f9-11f1-a16a-e3941183f4f7",
    verificationUrl:
      "https://udacity.com/certificate/e/e6c5c088-54f9-11f1-a16a-e3941183f4f7",
    verificationLabel: "Verify on Udacity",
    skills: ["Android", "Kotlin", "Mobile Development"],
  },
  {
    id: "udacity-ai-fundamentals",
    title: "AI Fundamentals Nanodegree",
    issuer: "Udacity",
    issueDate: "22 Dec 2025",
    issuedAt: "2025-12-22",
    pillarTags: ["ai", "ml-dl"],
    featuredInPillar: true,
    credentialId: "82b115d4-df5b-11f0-9cfb-0f2aedf4692b",
    verificationUrl:
      "https://udacity.com/certificate/e/82b115d4-df5b-11f0-9cfb-0f2aedf4692b",
    verificationLabel: "Verify on Udacity",
    skills: ["AI", "Machine Learning", "Python"],
  },
  {
    id: "udacity-programming-fundamentals",
    title: "Programming Fundamentals Nanodegree",
    issuer: "Udacity",
    issueDate: "08 Feb 2026",
    issuedAt: "2026-02-08",
    pillarTags: ["fullstack"],
    featuredInPillar: true,
    credentialId: "5b87dbfc-0529-11f1-8cbd-fb4ee07d1612",
    verificationUrl:
      "https://udacity.com/certificate/e/5b87dbfc-0529-11f1-8cbd-fb4ee07d1612",
    verificationLabel: "Verify on Udacity",
    skills: ["Programming", "Python", "Problem Solving"],
  },

  /* --------------------- Spoke-featured: programs / labs ------------------- */
  {
    id: "insa-cyber-talent-summer-camp-2026",
    title: "INSA Cyber Talent Summer Camp 2026",
    issuer: "INSA — Information Network Security Administration",
    issueDate: "2026",
    issuedAt: "2026-08-01",
    pillarTags: ["fullstack", "ai"],
    featuredInPillar: true,
    verificationLabel: "Program record",
    skills: ["Cybersecurity", "AI", "Secure Systems"],
  },
  {
    id: "udara-agentic-ai-workshop",
    title: "Agentic AI Workshop — 97% Score",
    issuer: "The Udara Project",
    issueDate: "2026",
    issuedAt: "2026-06-01",
    pillarTags: ["ai"],
    featuredInPillar: true,
    credentialId: "cmriv5kh207w1l4l7mg8xjsk7",
    verificationLabel: "Credential ID",
    skills: ["AI Agents", "Agentic Workflows", "AI Systems"],
  },
  {
    id: "florida-university-yeeap-ai",
    title: "YEEAP — 6-Week AI Training",
    issuer: "Florida University Southeast",
    issueDate: "2026",
    issuedAt: "2026-03-01",
    pillarTags: ["ai", "ml-dl"],
    featuredInPillar: true,
    verificationLabel: "Program record",
    skills: ["AI", "Machine Learning", "Applied AI"],
  },
  {
    id: "infnova-orange-data-analytics-python",
    title: "Data Analytics & Visualization Using Python",
    issuer: "INFNOVA & Orange Digital Center",
    issueDate: "2025",
    issuedAt: "2025-09-01",
    pillarTags: ["data"],
    featuredInPillar: true,
    verificationLabel: "Program record",
    skills: ["Python", "Data Analytics", "Visualization"],
  },
  {
    id: "edinburgh-coursera-video-online-courses",
    title: "How to Create Video for Online Courses",
    issuer: "University of Edinburgh / Coursera",
    issueDate: "2025",
    issuedAt: "2025-05-01",
    pillarTags: ["video"],
    featuredInPillar: true,
    credentialId: "AK6GW6RVVE7S",
    verificationUrl: "https://coursera.org/verify/AK6GW6RVVE7S",
    verificationLabel: "Verify on Coursera",
    skills: ["Video Production", "Online Learning", "Visual Communication"],
  },
  {
    id: "eshe-ops103-multimedia-development",
    title: "OPS103 — Multimedia Development",
    issuer: "e-SHE",
    issueDate: "2024",
    issuedAt: "2024-10-01",
    pillarTags: ["video"],
    featuredInPillar: true,
    verificationLabel: "Program record",
    skills: ["Multimedia", "Digital Content", "Visual Production"],
  },
  {
    id: "eshe-ce106-keeping-yourself-safe-online",
    title: "CE106 — Keeping Yourself Safe Online",
    issuer: "e-SHE",
    issueDate: "2024",
    issuedAt: "2024-08-01",
    pillarTags: ["ece"],
    featuredInPillar: true,
    verificationLabel: "Program record",
    skills: ["Cybersecurity", "Digital Safety", "2FA"],
  },

  /* ------------------------- Vault-only credentials ----------------------- */
  {
    id: "ratatype-silver-typing",
    title: "Ratatype Silver Typing Certificate",
    issuer: "Ratatype",
    issueDate: "Aug 2024",
    issuedAt: "2024-08-01",
    pillarTags: ["vault"],
    featuredInPillar: false,
    credentialId: "C7013407EN_NEW",
    verificationUrl: "https://ratatype.com/C7013407EN_NEW",
    verificationLabel: "Verify on Ratatype",
    skills: ["Touch Typing", "47 WPM", "96.3% Accuracy"],
  },
  {
    id: "eshe-dls106-ai-essentials",
    title: "DLS106 — AI Essentials",
    issuer: "e-SHE",
    issueDate: "2024",
    issuedAt: "2024-09-01",
    pillarTags: ["vault", "ai"],
    featuredInPillar: false,
    verificationLabel: "Program record",
    skills: ["AI Fundamentals", "Generative AI"],
  },
  {
    id: "eshe-dls104-writing-ms-word",
    title: "DLS104 — Writing Well Using MS Word",
    issuer: "e-SHE",
    issueDate: "2024",
    issuedAt: "2024-07-01",
    pillarTags: ["vault"],
    featuredInPillar: false,
    verificationLabel: "Program record",
    skills: ["Technical Writing", "Microsoft Word"],
  },
  {
    id: "eshe-dls105-presenting-powerpoint",
    title: "DLS105 — Presenting Using PowerPoint",
    issuer: "e-SHE",
    issueDate: "2024",
    issuedAt: "2024-07-01",
    pillarTags: ["vault"],
    featuredInPillar: false,
    verificationLabel: "Program record",
    skills: ["Presentation Design", "Communication"],
  },
  {
    id: "eshe-dls101-outlook-essentials",
    title: "DLS101 — Outlook Essentials",
    issuer: "e-SHE",
    issueDate: "2024",
    issuedAt: "2024-06-01",
    pillarTags: ["vault"],
    featuredInPillar: false,
    verificationLabel: "Program record",
    skills: ["Email Management", "Microsoft Outlook"],
  },
  {
    id: "eshe-dls102-video-conferencing-teams",
    title: "DLS102 — Video Conferencing with Teams",
    issuer: "e-SHE",
    issueDate: "2024",
    issuedAt: "2024-06-01",
    pillarTags: ["vault"],
    featuredInPillar: false,
    verificationLabel: "Program record",
    skills: ["Microsoft Teams", "Remote Collaboration"],
  },
  {
    id: "eshe-2fa101-two-factor-authentication",
    title: "2FA101 — Two-Factor Authentication",
    issuer: "e-SHE",
    issueDate: "2024",
    issuedAt: "2024-05-01",
    pillarTags: ["vault", "ece"],
    featuredInPillar: false,
    verificationLabel: "Program record",
    skills: ["2FA", "Account Security", "Cybersecurity"],
  },

  /* ---------------- Archive: pre-2026 certificates on file ---------------- */
  {
    id: "freecodecamp-data-analytics-python",
    title: "Data Analytics with Python",
    issuer: "freeCodeCamp",
    issueDate: "2024",
    issuedAt: "2024-04-01",
    pillarTags: ["vault", "data"],
    featuredInPillar: false,
    verificationUrl: "/certs/data-analytics.png",
    verificationLabel: "View certificate",
    skills: ["Python", "Data Analysis"],
    archived: true,
  },
  {
    id: "freecodecamp-responsive-web-design",
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    issueDate: "2023",
    issuedAt: "2023-09-01",
    pillarTags: ["vault", "fullstack"],
    featuredInPillar: false,
    verificationUrl: "/certs/responsive-web.png",
    verificationLabel: "View certificate",
    skills: ["HTML", "CSS", "Responsive Design"],
    archived: true,
  },
  {
    id: "freecodecamp-javascript-algorithms",
    title: "JavaScript Algorithms & Data Structures",
    issuer: "freeCodeCamp",
    issueDate: "2023",
    issuedAt: "2023-10-01",
    pillarTags: ["vault", "fullstack"],
    featuredInPillar: false,
    verificationUrl: "/certs/js-algorithms.png",
    verificationLabel: "View certificate",
    skills: ["JavaScript", "Algorithms", "Data Structures"],
    archived: true,
  },
  {
    id: "cisco-cybersecurity-fundamentals",
    title: "Cybersecurity Fundamentals",
    issuer: "Cisco Networking Academy",
    issueDate: "2024",
    issuedAt: "2024-03-01",
    pillarTags: ["vault", "ece"],
    featuredInPillar: false,
    verificationUrl: "/certs/cybersecurity.png",
    verificationLabel: "View certificate",
    skills: ["Cybersecurity", "Network Security"],
    archived: true,
  },
];

/* --------------------------------- Helpers -------------------------------- */

export const credentialTagLabels: Record<CredentialTag, string> = {
  ece: "ECE",
  fullstack: "Full-Stack",
  ai: "AI",
  "ml-dl": "ML / DL",
  data: "Data",
  video: "Video",
  vault: "Vault",
};

export const credentialFilters: { id: CredentialFilter; label: string }[] = [
  { id: "all", label: "ALL" },
  { id: "ece", label: "ECE" },
  { id: "fullstack", label: "FULLSTACK" },
  { id: "ai", label: "AI" },
  { id: "ml-dl", label: "ML-DL" },
  { id: "data", label: "DATA" },
  { id: "video", label: "VIDEO" },
  { id: "vault", label: "VAULT" },
];

export const featuredProjects = projects.filter((project) => project.featuredOnHub);

export const spokeCredentials = credentials.filter(
  (credential) => credential.featuredInPillar,
);

export const vaultOnlyCredentials = credentials.filter((credential) =>
  credential.pillarTags.includes("vault"),
);

export const recentCredentials = [...credentials]
  .sort((a, b) => b.issuedAt.localeCompare(a.issuedAt))
  .slice(0, 4);

export function getPillarById(id: string): Pillar | undefined {
  return pillars.find((pillar) => pillar.id === id);
}

export function getSocialHref(id: SocialId): string {
  return profile.socials.find((social) => social.id === id)?.href ?? profile.siteUrl;
}

export function getPillarProjects(pillarId: PillarId): Project[] {
  return projects.filter((project) => project.pillars.includes(pillarId));
}

export function getPillarCredentials(pillarId: PillarId): Credential[] {
  return credentials.filter(
    (credential) =>
      credential.featuredInPillar &&
      credential.pillarTags.includes(pillarId),
  );
}

export function getCredentialCountForPillar(pillarId: PillarId): number {
  return getPillarCredentials(pillarId).length;
}
