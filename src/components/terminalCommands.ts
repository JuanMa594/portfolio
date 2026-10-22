import { CONTACT } from '../data/contact';
import { QUOTES } from '../data/quotes';
import { ABOUT_BIO } from '../data/about';
import { SKILL_CATEGORIES } from '../data/skills';
import { EXPERIENCE } from '../data/experience';
import { EDUCATION } from '../data/education';
import { getTechMeta, normalizeTechKey } from '../data/techIcons';
import type { useCosmetics } from './CosmeticsContext';
import type { Theme } from './logoAssets';

type Cosmetics = ReturnType<typeof useCosmetics>;

export interface ParsedCommand {
  name: string;
  flags: string[];
  args: string[];
}

export interface CommandContext {
  cosmetics: Cosmetics;
  theme: Theme;
  toggleTheme: () => void;
  scrollToSection: (id: string) => void;
  triggerMatrix: () => void;
  setProjectFilter: (filter: string) => void;
}

export type CommandOutput = string | string[] | void;

export interface CommandDef {
  description: string;
  run: (parsed: ParsedCommand, ctx: CommandContext) => CommandOutput;
}

export function parseInput(raw: string): ParsedCommand {
  const tokens = raw.trim().split(/\s+/).filter(Boolean);
  const [first, ...rest] = tokens;
  const name = (first ?? '').replace(/^\/+/, '').toLowerCase();
  const flags = rest.filter((t) => t.startsWith('-')).map((t) => t.replace(/^-+/, '').toLowerCase());
  const args = rest.filter((t) => !t.startsWith('-'));
  return { name, flags, args };
}

function makeSectionCommand(id: string, description: string, infoLines: string[]): CommandDef {
  return {
    description,
    run: (parsed, ctx) => {
      if (parsed.flags.includes('info') || parsed.flags.includes('top')) {
        return infoLines;
      }
      ctx.scrollToSection(id);
      return `Scrolling to #${id}...`;
    },
  };
}

const coffeeCmd: CommandDef = {
  description: '/coffee — brewing status',
  run: () => [
    '      ( (',
    '       ) )',
    '    ........',
    "    |      |]",
    '    \\      /',
    "     `----'",
    'Converting coffee into code... Status: 100% loaded.',
  ],
};

export const COMMANDS: Record<string, CommandDef> = {
  help: {
    description: '/help — list available commands',
    run: (_parsed, ctx) => {
      const lines = [
        'Available commands:',
        '  /home, /about, /skills, /projects, /exp   -> add -info for a summary (default scrolls there)',
        '  /whoami, /contact, /quote, /coffee (/brew), /sudo, /theme',
        '  /clear (/cls), /matrix, /accent',
      ];

      const { logoFontMode, accentVariant } = ctx.cosmetics;
      if (logoFontMode === 'normal') {
        lines.push('  /pixel   -> pixel font + pixel logo (unlocks /serif)');
      } else if (logoFontMode === 'pixel') {
        lines.push('  /serif   -> normal font + serif logo');
      }
      if (logoFontMode !== 'normal' || accentVariant !== 'default') {
        lines.push('  /reset   -> restore logo, font & accent to normal');
      }

      return lines;
    },
  },

  home: makeSectionCommand('home', '/home — scroll to the top', [
    "JuanMa's portfolio — home base. Try /about, /skills or /exp for more.",
  ]),
  about: makeSectionCommand('about', '/about [-info] — scroll to About Me, or print a summary', [
    'About Me:',
    ABOUT_BIO.intro,
    ...ABOUT_BIO.paragraphs,
  ]),
  skills: makeSectionCommand('skills', '/skills [-info] — scroll to Skills, or print a summary', [
    'Skills:',
    ...SKILL_CATEGORIES.map((cat) => `  ${cat.title.padEnd(24)} (${cat.keys.length})`),
  ]),
  projects: {
    description: '/projects [-info] [--filter=tag] — scroll to Projects, or list highlighted projects',
    run: (parsed, ctx) => {
      if (parsed.flags.includes('info')) {
        return ["Top Projects — a few things I've built:", `Check ${CONTACT[0].value} in the meantime.`];
      }

      const filterFlag = parsed.flags.find((flag) => flag.startsWith('filter='));
      if (filterFlag) {
        const rawValue = filterFlag.slice('filter='.length);
        const label = getTechMeta(normalizeTechKey(rawValue)).label;
        ctx.setProjectFilter(label);
        ctx.scrollToSection('projects');
        return `Filtering projects by "${label}"...`;
      }

      ctx.scrollToSection('projects');
      return 'Scrolling to #projects...';
    },
  },
  exp: makeSectionCommand('exp', '/exp [-info] — scroll to Experience & Education, or print a summary', [
    'Experience:',
    ...EXPERIENCE.map((job) => `  ${job.role} — ${job.company} (${job.dateRange})`),
    'Education:',
    ...EDUCATION.map((study) => `  ${study.degree} — ${study.institution} (${study.dateRange})`),
  ]),

  whoami: {
    description: '/whoami — who runs this terminal',
    run: () => 'JuanMa — Software & Automation developer.',
  },
  contact: {
    description: '/contact — professional ways to reach me (GitHub, LinkedIn, email)',
    run: () => CONTACT.map((link) => `${link.label}: ${link.value}`),
  },
  quote: {
    description: '/quote — a random programming/automation quote',
    run: () => {
      const q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
      return [`"${q.text}"`, `— ${q.author}`];
    },
  },
  coffee: coffeeCmd,
  brew: coffeeCmd,
  sudo: {
    description: '/sudo — nice try',
    run: () => 'Permission denied: you are not root here. Nice try though.',
  },
  theme: {
    description: '/theme — toggle dark/light mode',
    run: (_parsed, ctx) => {
      ctx.toggleTheme();
      return 'Switching theme...';
    },
  },

  pixel: {
    description: '/pixel — switch to a pixel font + pixel logo',
    run: (_parsed, ctx) => {
      if (ctx.cosmetics.logoFontMode === 'pixel') {
        return 'Already in pixel mode. Try /serif or /reset.';
      }
      ctx.cosmetics.setLogoFontMode('pixel');
      return 'Pixel mode activated — font and logo swapped. Try /serif next.';
    },
  },
  serif: {
    description: '/serif — restore the normal font, switch to the serif logo',
    run: (_parsed, ctx) => {
      if (ctx.cosmetics.logoFontMode === 'serif') {
        return 'Already in serif mode. Try /reset to go back to normal.';
      }
      ctx.cosmetics.setLogoFontMode('serif');
      return 'Serif mode activated — logo swapped, font restored. Try /reset to undo.';
    },
  },
  reset: {
    description: '/reset — restore logo, font and accent to defaults',
    run: (_parsed, ctx) => {
      ctx.cosmetics.reset();
      return 'Everything reset to normal.';
    },
  },
  accent: {
    description: '/accent — cycle through blue accent shades',
    run: (_parsed, ctx) => {
      const next = ctx.cosmetics.cycleAccent();
      return `Accent shade set to "${next}".`;
    },
  },
  matrix: {
    description: '/matrix — a brief digital rain effect',
    run: (_parsed, ctx) => {
      const reduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) {
        return 'Matrix visualizer skipped — reduced motion is enabled on your system.';
      }
      ctx.triggerMatrix();
      return 'Matrix visualizer activated.';
    },
  },
};
