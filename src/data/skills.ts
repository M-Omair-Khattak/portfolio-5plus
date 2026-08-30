import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa";
import {
  SiAnthropic,
  SiClaude,
  SiDjango,
  SiDocker,
  SiElasticsearch,
  SiFastapi,
  SiGit,
  SiGithubactions,
  SiGraphql,
  SiJavascript,
  SiLangchain,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiRubyonrails,
  SiStripe,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface TechStackItem {
  name: string;
  icon?: IconType;
  iconSrc?: string;
  color: string;
  /** Icon uses foreground color, adapts to light/dark theme (for black/white logos) */
  monochrome?: boolean;
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    name: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML/CSS", "Tailwind CSS", "Redux Toolkit", "TanStack", "Material UI", "Vue", "Nuxt"],
  },
  {
    id: "backend",
    name: "Backend",
    skills: ["Python", "Django", "Flask", "FastAPI", "Node.js", "Nest.js", "Express", "GraphQL", "REST APIs"],
  },
  {
    id: "automation",
    name: "Automation",
    skills: ["Playwright", "Selenium", "Retell", "RingCentral"],
  },
  {
    id: "cloud",
    name: "Cloud",
    skills: ["AWS", "S3", "RDS", "Lambda", "EC2", "Vercel", "Cloudflare CDN"],
  },
  {
    id: "ai",
    name: "AI & ML",
    skills: ["Claude API", "OpenAI API", "LangChain", "Generative AI", "Prompt Engineering", "Cursor", "Claude Code", "LLM Integration"],
  },
  {
    id: "databases",
    name: "Databases",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "DynamoDB", "Elasticsearch", "OpenSearch"],
  },
  {
    id: "devops",
    name: "DevOps",
    skills: ["Docker", "CI/CD", "GitHub Actions", "GitLab CI", "Nginx", "Celery", "Traefik"],
  },
  {
    id: "languages",
    name: "Languages",
    skills: ["Python", "TypeScript", "JavaScript", "SQL"],
  },
  {
    id: "frameworks",
    name: "Frameworks",
    skills: ["Next.js", "Django REST", "FastAPI", "Express", "Nest.js", "TanStack Router"],
  },
  {
    id: "tools",
    name: "Tools",
    skills: ["Git", "Jira", "Confluence", "Notion", "ClickUp", "Trello", "Figma", "Stripe", "Sentry", "SendGrid", "Swagger", "Jest/Vitest"],
  },
];

export const techStackItems: TechStackItem[] = [
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "React.js", icon: SiReact, color: "#087EA4" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000", monochrome: true },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "OpenAI", icon: SiOpenai, color: "#412991" },
  { name: "LangChain", icon: SiLangchain, color: "#1C3C3C" },
  { name: "Claude Code", icon: SiClaude, color: "#D97757" },
  { name: "Claude API", icon: SiAnthropic, color: "#D97757" },
  {
    name: "Cursor",
    iconSrc: "/images/tech/cursor.svg",
    color: "#000000",
    monochrome: true,
  },
  { name: "Django", icon: SiDjango, color: "#092E20", monochrome: true },
  { name: "FastAPI", icon: SiFastapi, color: "#009688" },
  {
    name: "NestJS",
    iconSrc: "/images/tech/nestjs.svg",
    color: "#E0234E",
  },
  {
    name: "TanStack",
    iconSrc: "/images/tech/tanstack.svg",
    color: "#000000",
    monochrome: true,
  },
  {
    name: "Playwright",
    iconSrc: "/images/tech/playwright.svg",
    color: "#2EAD33",
  },
  {
    name: "Flask",
    iconSrc: "/images/tech/flask.svg",
    color: "#000000",
    monochrome: true,
  },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Redis", icon: SiRedis, color: "#DC382D" },
  { name: "AWS", icon: FaAws, color: "#FF9900" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Stripe", icon: SiStripe, color: "#635BFF" },
  { name: "Elasticsearch", icon: SiElasticsearch, color: "#005571" },
  { name: "CI/CD", icon: SiGithubactions, color: "#2088FF" },
  { name: "Ruby on Rails", icon: SiRubyonrails, color: "#CC0000" },
  { name: "Vercel", icon: SiVercel, color: "#000000", monochrome: true },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Git", icon: SiGit, color: "#F05032" },
];

export const featuredToolkit = [
  "React.js",
  "Next.js",
  "OpenAI",
  "LangChain",
  "Claude Code",
  "Claude API",
  "Cursor",
].map((name) => techStackItems.find((item) => item.name === name)!);

/** @deprecated Use techStackItems instead */
export const techStackBadges = techStackItems.map((item) => item.name);
