'use client';

import { ALL_FILTER, useProjectsFilter } from './ProjectsFilterContext';

interface ProjectFiltersProps {
  tags: string[];
}

export function ProjectFilters({ tags }: ProjectFiltersProps) {
  const { activeFilter, setActiveFilter } = useProjectsFilter();
  const options = [ALL_FILTER, ...tags];

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((tag) => {
        const isActive = activeFilter === tag;

        return (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveFilter(tag)}
            className={`rounded-full border px-4 py-1.5 font-mono text-xs transition ${
              isActive
                ? 'border-accent/60 bg-accent/15 text-accent'
                : 'border-ink/10 text-muted hover:border-accent/30 hover:text-ink'
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
