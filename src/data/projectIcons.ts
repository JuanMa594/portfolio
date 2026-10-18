import type { IconType } from 'react-icons';
import { FaFutbol, FaToriiGate } from 'react-icons/fa';
import { MdMovie } from 'react-icons/md';
import { PiHospitalFill } from 'react-icons/pi';
import { SlEqualizer } from 'react-icons/sl';

/**
 * Header icons for projects without a logo image, keyed by project slug. Kept apart from
 * FeaturedProject because component functions can't cross the server -> client boundary.
 */
export const PROJECT_ICONS: Record<string, IconType> = {
  'Kyoto-website': FaToriiGate,
  Streaming: SlEqualizer,
  FutStats: FaFutbol,
  'Hospital-JM-': PiHospitalFill,
  LaHuesera: MdMovie,
};
