import type { StaticImageData } from 'next/image';

import MixedBlack from '../assets/Logos/Logo_mixed_BLACK.svg';
import MixedWhite from '../assets/Logos/Logo_mixed_WHITE.svg';
import SerifBlack from '../assets/Logos/Logo_serif_BLACK.svg';
import SerifWhite from '../assets/Logos/Logo_serif_WHITE.svg';
import PixelBlack from '../assets/Logos/Logo_pixel_BLACK.svg';
import PixelWhite from '../assets/Logos/Logo_pixel_WHITE.svg';

export type LogoFontMode = 'normal' | 'pixel' | 'serif';
export type Theme = 'dark' | 'light';

const LOGO_VARIANTS: Record<LogoFontMode, Record<Theme, StaticImageData>> = {
  normal: { dark: MixedBlack, light: MixedWhite },
  pixel: { dark: PixelBlack, light: PixelWhite },
  serif: { dark: SerifBlack, light: SerifWhite },
};

export function getLogoSrc(mode: LogoFontMode, theme: Theme): StaticImageData {
  return LOGO_VARIANTS[mode][theme];
}
