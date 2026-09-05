export interface SkillCategory {
  title: string;
  keys: string[];
}

// `keys` map into TECH_META (see ./techIcons) for the icon + display label.
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming Languages',
    keys: ['python', 'sql', 'csharp', 'java', 'javascript', 'typescript'],
  },
  {
    title: 'Frameworks & Libraries',
    keys: [
      'nextjs',
      'react',
      'streamlit',
      'net',
      'tailwindcss',
      'fastapi',
      'bootstrap',
      'pyside',
      'pytorch',
      'sqlite',
    ],
  },
  {
    title: 'Tools & Automation',
    keys: [
      'docker',
      'n8n',
      'git',
      'github',
      'bun',
      'vscode',
      'sqlserver',
      'postgresql',
      'vercel',
      'postman',
      'powerplatform',
      'claudecode',
      'codex',
      'opencode',
    ],
  },
];
