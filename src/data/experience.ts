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
      'Built document-management and reporting apps for the GI and GH teams, merging loose Python scripts into one tool that finds files and generates folders and Excel reports from the database.',
      'Developed local-AI tools: a slide generator based on the corporate template, and a meeting assistant with transcription, diarization and Q&A.',
      'Created a multi-agent app that turns a Teams transcript into a process discovery card, KPIs, risks, automation ideas and a BPMN diagram.',
      'Built a Copilot Studio agent for internal documentation and process questions.',
      'Automated manual work with Power Automate flows, macros and scripts, with fewer typos and traceable results.',
    ],
    techKeys: ['powerplatform', 'localllms', 'excel', 'python', 'sqlite', 'pytorch', 'chromadb'],
    logo: summaLogo,
  },
];
