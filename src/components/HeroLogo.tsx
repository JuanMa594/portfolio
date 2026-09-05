'use client';

import { AnimatedLogo } from './AnimatedLogo';

export function HeroLogo() {
  return (
    <div className="flex items-center justify-center">
      <AnimatedLogo
        alt="JM logo"
        wrapperClassName="h-64 w-64 sm:h-80 sm:w-80 lg:h-96 lg:w-96 animate-fade-in-up"
        gap={4}
      />
    </div>
  );
}
