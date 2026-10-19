import { FiBriefcase, FiMapPin } from 'react-icons/fi';
import type { ExperienceItem } from '../../types/experience';
import { TechBadge } from '../TechBadge';
import { OrgLogo } from './OrgLogo';

interface ExperienceCardProps {
  item: ExperienceItem;
}

export function ExperienceCard({ item }: ExperienceCardProps) {
  return (
    <article className="flex flex-col gap-5 rounded-2xl border border-ink/10 bg-surface p-6 transition hover:border-accent/40 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <OrgLogo logo={item.logo} alt={`${item.company} logo`} fallbackIcon={FiBriefcase} />
          <div>
            <h4 className="text-lg font-semibold">{item.role}</h4>
            <p className="text-sm text-muted">{item.company}</p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-1 text-xs text-muted sm:items-end">
          <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-accent">
            {item.dateRange}
          </span>
          <span className="flex items-center gap-1">
            <FiMapPin aria-hidden /> {item.location}
          </span>
        </div>
      </div>

      <ul className="flex flex-col gap-2 text-sm leading-6 text-muted">
        {item.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-3">
            <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {bullet}
          </li>
        ))}
      </ul>

      {item.techKeys.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {item.techKeys.map((key) => (
            <TechBadge key={key} techKey={key} />
          ))}
        </div>
      )}
    </article>
  );
}
