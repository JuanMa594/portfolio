import type { IconType } from 'react-icons';
import type { StaticImageData } from 'next/image';
import {
  SiBlazor,
  SiBootstrap,
  SiClaudecode,
  SiCss,
  SiDocker,
  SiDotnet,
  SiDrizzle,
  SiFastapi,
  SiGit,
  SiGithub,
  SiGreensock,
  SiHono,
  SiHtml5,
  SiJavascript,
  SiJquery,
  SiLucide,
  SiN8N,
  SiNextdotjs,
  SiNuget,
  SiOpencode,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiPytorch,
  SiQt,
  SiRadixui,
  SiReact,
  SiReactquery,
  SiSqlite,
  SiStreamlit,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVercel,
  SiVite,
  SiZod,
  SiBun,
} from 'react-icons/si';
import { VscVscodeInsiders } from 'react-icons/vsc';
import { DiMsqlServer } from 'react-icons/di';
import { FaJava } from "react-icons/fa";
import { PiMicrosoftExcelLogoFill } from 'react-icons/pi';
import codexMark from '../assets/techIcons/codex.png';
import powerPlatformMark from '../assets/techIcons/power-platform.png';
import chromadbMark from '../assets/techIcons/chroma.png';

export interface TechMeta {
  label: string;
  icon?: IconType;
  /**
   * Transparent-background raster mark, recolored to the current text color via a CSS
   * mask (see MaskIcon) — used when no single-color vector icon exists for the tool.
   */
  maskImage?: StaticImageData;
  /** Compact glyph for icon-less entries, shown inside the fixed-size icon tile. */
  short?: string;
}

/**
 * Normalizes a free-form tech name (a skill label or a GitHub repo `language`/topic
 * string) into the lookup key used by TECH_META, so both data sources share one
 * icon dictionary instead of maintaining separate icon maps.
 */
export function normalizeTechKey(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/#/g, 'sharp')
    .replace(/\+\+/g, 'pp')
    .replace(/[^a-z0-9]/g, '');
}

// Not every tool has a single-color vector mark available. Trademark-restricted logos
// like C# fall back to a short text badge; Codex/Power Platform/ChromaDB use `maskImage`
// instead, since no matching icon exists in the icon-font libraries above.
export const TECH_META: Record<string, TechMeta> = {
  python: { label: 'Python', icon: SiPython },
  sql: { label: 'SQL', short: 'SQL' },
  csharp: { label: 'C#', short: 'C#' },
  java: { label: 'Java', icon: FaJava },
  javascript: { label: 'JavaScript', icon: SiJavascript },
  typescript: { label: 'TypeScript', icon: SiTypescript },
  html: { label: 'HTML5', icon: SiHtml5 },
  css: { label: 'CSS3', icon: SiCss },

  nextjs: { label: 'Next.js', icon: SiNextdotjs },
  react: { label: 'React', icon: SiReact },
  streamlit: { label: 'Streamlit', icon: SiStreamlit },
  net: { label: '.NET', icon: SiDotnet },
  tailwindcss: { label: 'Tailwind CSS', icon: SiTailwindcss },
  fastapi: { label: 'FastAPI', icon: SiFastapi },
  bootstrap: { label: 'Bootstrap', icon: SiBootstrap },
  pyside: { label: 'PySide', icon: SiQt },
  pytorch: { label: 'PyTorch', icon: SiPytorch },
  sqlite: { label: 'SQLite', icon: SiSqlite },
  chromadb: { label: 'ChromaDB', maskImage: chromadbMark },
  blazor: { label: 'Blazor', icon: SiBlazor },
  entityframework: { label: 'Entity Framework', short: 'EF' },
  jquery: { label: 'jQuery', icon: SiJquery },
  nuget: { label: 'NuGet', icon: SiNuget },
  vite: { label: 'Vite', icon: SiVite },
  threejs: { label: 'Three.js', icon: SiThreedotjs },
  r3f: { label: 'React Three Fiber', short: 'R3F' },
  glsl: { label: 'GLSL', short: 'GLSL' },
  gsap: { label: 'GSAP', icon: SiGreensock },
  zustand: { label: 'Zustand', short: 'Zu' },
  nextintl: { label: 'next-intl', short: 'i18n' },
  tanstackquery: { label: 'TanStack Query', icon: SiReactquery },
  tanstackrouter: { label: 'TanStack Router', short: 'TSR' },
  radixui: { label: 'Radix UI', icon: SiRadixui },
  lucide: { label: 'Lucide', icon: SiLucide },
  hono: { label: 'Hono', icon: SiHono },
  zod: { label: 'Zod', icon: SiZod },
  drizzle: { label: 'Drizzle ORM', icon: SiDrizzle },
  copilotstudio: { label: 'Copilot Studio', short: 'CS' },
  localllms: { label: 'Local LLMs', short: 'LLM' },
  excel: { label: 'Excel', icon: PiMicrosoftExcelLogoFill },

  docker: { label: 'Docker', icon: SiDocker },
  n8n: { label: 'n8n', icon: SiN8N },
  git: { label: 'Git', icon: SiGit },
  github: { label: 'GitHub', icon: SiGithub },
  bun: { label: 'Bun', icon: SiBun },
  vscode: { label: 'VS Code', icon: VscVscodeInsiders },
  sqlserver: { label: 'SQL Server', icon: DiMsqlServer },
  postgresql: { label: 'PostgreSQL', icon: SiPostgresql },
  vercel: { label: 'Vercel', icon: SiVercel },
  postman: { label: 'Postman', icon: SiPostman },
  powerplatform: { label: 'Power Platform', maskImage: powerPlatformMark },
  claudecode: { label: 'Claude Code', icon: SiClaudecode },
  codex: { label: 'Codex', maskImage: codexMark },
  opencode: { label: 'OpenCode', icon: SiOpencode },
};

export function getTechMeta(key: string): TechMeta {
  return TECH_META[key] ?? { label: key };
}
