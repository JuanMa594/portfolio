import Image from 'next/image';
import type { IconType } from 'react-icons';
import type { StaticImageData } from 'next/image';

interface OrgLogoProps {
  logo?: StaticImageData;
  alt: string;
  fallbackIcon: IconType;
}

export function OrgLogo({ logo, alt, fallbackIcon: FallbackIcon }: OrgLogoProps) {
  if (!logo) {
    return (
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent">
        <FallbackIcon size={20} aria-hidden />
      </span>
    );
  }

  return (
    <Image
      src={logo}
      alt={alt}
      sizes="96px"
      placeholder="blur"
      className="h-12 w-auto shrink-0 rounded-xl border border-ink/10 object-contain"
    />
  );
}
