import type { StaticImageData } from 'next/image';

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  dateRange: string;
  /** Key achievements, 2-3 short sentences. */
  bullets: string[];
  /** Keys of TECH_META. */
  techKeys: string[];
  /** Company mark; a generic icon is shown when missing. */
  logo?: StaticImageData;
}

export type EducationType = 'higher_ed' | 'technical' | 'high_school';

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  dateRange: string;
  type: EducationType;
  description: string;
  /** Institution mark; a generic icon is shown when missing. */
  logo?: StaticImageData;
  /** Still in progress: gets the glowing timeline node. */
  current?: boolean;
}
