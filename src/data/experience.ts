import type { ExperienceItem } from '../types/experience';
import summaLogo from '../assets/experience/summa.jpg';

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 'summa-sci',
    role: 'Technology Apprentice',
    company: 'Summa SCI',
    location: 'Sabaneta, Colombia',
    dateRange: 'Apr 2026 – Oct 2026 · 6 months',
    bullets: [
      'Automated manual processes with Power Automate flows, freeing the team from repetitive tasks.',
      'Built macros and automated scripts that let the team query data and fill Excel fields faster, with fewer typos and a traceable result.',
      'Developed AI tools with Copilot Studio and local AI models that analyze Excel files, or meeting transcriptions in depth and generate diagrams and flows from the results.',
    ],
    techKeys: ['powerplatform', 'localllms', 'excel', 'python', 'sqlite'],
    logo: summaLogo,
  },
];
