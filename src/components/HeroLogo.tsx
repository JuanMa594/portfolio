'use client';

import Image from 'next/image';
import { useTheme } from './ThemeContext';
import LogoForDark from '../assets/Logos/Logo_mixed_BLACK.svg';
import LogoForLight from '../assets/Logos/Logo_mixed_WHITE.svg';

export function HeroLogo() {
  const { theme } = useTheme();

  return (
    <div className="flex items-center justify-center">
      <Image
        src={theme === 'dark' ? LogoForDark : LogoForLight}
        alt="JM logo"
        className="h-64 w-64 object-contain sm:h-80 sm:w-80 lg:h-96 lg:w-96 animate-fade-in-up"
      />
    </div>
  );
}
