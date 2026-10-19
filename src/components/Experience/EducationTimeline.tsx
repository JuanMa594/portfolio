import type { EducationItem } from '../../types/experience';
import { EducationCard } from './EducationCard';
import { Reveal } from './Reveal';

interface EducationTimelineProps {
  items: EducationItem[];
}

// Vertical rail on mobile, horizontal rail above the cards from md up; nodes sit on the rail.
export function EducationTimeline({ items }: EducationTimelineProps) {
  return (
    <ol className="relative grid gap-6 md:grid-cols-3">
      <span
        aria-hidden
        className="absolute bottom-0 left-[7px] top-0 w-px bg-ink/15 md:bottom-auto md:left-0 md:right-0 md:top-[7px] md:h-px md:w-auto"
      />

      {items.map((item, index) => (
        <li key={item.id} className="relative pl-8 md:pl-0 md:pt-8">
          <span
            aria-hidden
            className={`absolute left-0 top-1 h-3.5 w-3.5 rounded-full border-2 md:top-0 ${
              item.current
                ? 'border-accent bg-accent shadow-[0_0_12px_2px] shadow-accent/60'
                : 'border-ink/30 bg-background'
            }`}
          />
          <Reveal delay={index * 120} className="h-full">
            <EducationCard item={item} />
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
