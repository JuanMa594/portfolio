import type { StaticImageData } from 'next/image';

interface MaskIconProps {
  src: StaticImageData;
  size: number;
  className?: string;
}

/**
 * Renders a transparent-background raster mark as a solid `currentColor` glyph, using
 * the image's alpha channel as a CSS mask. Lets logos without a single-color vector
 * icon (see techIcons.ts `maskImage`) match the muted/accent treatment of the rest.
 */
export function MaskIcon({ src, size, className }: MaskIconProps) {
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 bg-current ${className ?? ''}`}
      style={{
        width: size,
        height: size,
        WebkitMaskImage: `url(${src.src})`,
        maskImage: `url(${src.src})`,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
    />
  );
}
