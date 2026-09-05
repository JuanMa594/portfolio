import { getTechMeta } from '../../data/techIcons';
import { MaskIcon } from '../MaskIcon';

interface SkillItemProps {
  techKey: string;
}

export function SkillItem({ techKey }: SkillItemProps) {
  const { label, icon: Icon, short, maskImage } = getTechMeta(techKey);

  return (
    <div className="group flex flex-col items-center gap-2 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-xl border border-ink/10 bg-surface text-muted transition group-hover:-translate-y-0.5 group-hover:border-accent/40 group-hover:text-accent">
        {Icon ? (
          <Icon size={26} aria-hidden />
        ) : maskImage ? (
          <MaskIcon src={maskImage} size={26} />
        ) : (
          <span className="font-mono text-xs font-semibold leading-none">{short ?? label}</span>
        )}
      </span>
      <span className="text-xs text-muted transition group-hover:text-ink">{label}</span>
    </div>
  );
}
