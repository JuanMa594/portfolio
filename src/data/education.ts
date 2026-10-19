import type { EducationItem } from '../types/experience';
import itmLogo from '../assets/experience/itm.jpg';
import senaLogo from '../assets/experience/sena.jpg';
import liceoLogo from '../assets/experience/liceo-antioqueno.jpg';

// Reverse chronological order.
export const EDUCATION: EducationItem[] = [
  {
    id: 'itm',
    degree: 'Technologist in Software Development',
    institution: 'Institución Universitaria ITM',
    dateRange: '2023 – Present',
    type: 'higher_ed',
    description: 'Currently studying.',
    logo: itmLogo,
    current: true,
  },
  {
    id: 'sena',
    degree: 'Systems Technician',
    institution: 'SENA',
    dateRange: '2021 – 2022',
    type: 'technical',
    description: 'Technical program completed alongside high school.',
    logo: senaLogo,
  },
  {
    id: 'liceo-antioqueno',
    degree: 'High School Diploma',
    institution: 'Liceo Antioqueño',
    dateRange: '2017 – 2022',
    type: 'high_school',
    description: 'Grades 6 to 11.',
    logo: liceoLogo,
  },
];
