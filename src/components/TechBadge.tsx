import { getTechMeta } from '../data/techIcons';
import { MaskIcon } from './MaskIcon';

interface TechBadgeProps {
  techKey: string;
}

export function TechBadge({ techKey }: TechBadgeProps) {
  const { label, icon: Icon, maskImage, short } = getTechMeta(techKey);

  return (
    <span
      title={label}
      className="flex h-7 w-7 items-center justify-center rounded-lg border border-ink/10 bg-background text-muted"
    >
      {Icon ? (
        <Icon size={14} aria-hidden />
      ) : maskImage ? (
        <MaskIcon src={maskImage} size={14} />
      ) : (
        <span className="font-mono text-[9px]">{short ?? label.slice(0, 2)}</span>
      )}
    </span>
  );
}
