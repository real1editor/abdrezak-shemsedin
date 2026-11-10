export interface Socials {
  github: string;
  linkedin: string;
  upwork: string;
  email: string;
  telegram: string;
  phone: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  x: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface Language {
  name: string;
  native: string;
  level: string;
  reading: number;
  writing: number;
  listening: number;
  speaking: number;
  tag: string;
}

export interface Discipline {
  title: string;
  description: string;
}

export interface CourseFocus {
  title: string;
  description: string;
}

export interface SeoPageLink {
  title: string;
  description: string;
  href: string;
}

export interface Skill {
  name: string;
  slug: string;
  level?: number;
  icon?: string;
}

export interface Tool {
  name: string;
  slug: string;
  icon?: string;
}

export interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface EducationItem {
  title: string;
  degree: string;
  period: string;
  description: string;
  status: "current" | "completed";
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  imageUrl: string;
  link: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  category: "web" | "data" | "mobile";
  tags: string[];
  thumb: string;
  liveUrl: string;
  githubUrl: string;
  role?: string;
  highlights?: string[];
  architecture?: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface HeroBadge {
  title: string;
  subtitle: string;
}

export interface SkillsGroup {
  primary: Skill[];
  ai: Skill[];
  data: Skill[];
  locked: Skill[];
}

export interface PortfolioData {
  firstName: string;
  lastName: string;
  name: string;
  shortName: string;
  initials: string;
  role: string;
  roleShort: string;
  bio: string;
  profilePhoto: string;
  about: string[];
  availability: string;
  location: string;
  resumeUrl: string;
  socials: Socials;
  heroBadge: HeroBadge;
  metrics: Metric[];
  languages: Language[];
  whatIBuild: Discipline[];
  courseFocus: CourseFocus[];
  seoPages: SeoPageLink[];
  skills: SkillsGroup;
  tools: Tool[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  projects: ProjectItem[];
  faq: FaqItem[];
}
