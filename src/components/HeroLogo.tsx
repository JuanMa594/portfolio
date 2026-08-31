'use client';

import Image from 'next/image';
import { useTheme } from './ThemeContext';
import { useCosmetics } from './CosmeticsContext';
import { getLogoSrc } from './logoAssets';

export function HeroLogo() {
  const { theme } = useTheme();
  const { logoFontMode } = useCosmetics();

  return (
    <div className="flex items-center justify-center">
      <Image
        src={getLogoSrc(logoFontMode, theme)}
        alt="JM logo"
        className="h-64 w-64 object-contain sm:h-80 sm:w-80 lg:h-96 lg:w-96 animate-fade-in-up"
      />
    </div>
  );
}
