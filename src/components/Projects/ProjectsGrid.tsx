'use client';

import type { FeaturedProject } from '../../lib/github';
import { getTechMeta } from '../../data/techIcons';
import { ProjectCard } from './ProjectCard';
import { ProjectFilters } from './ProjectFilters';
import { ALL_FILTER, useProjectsFilter } from './ProjectsFilterContext';

interface ProjectsGridProps {
  projects: FeaturedProject[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const { activeFilter } = useProjectsFilter();

  // Only techs shared by 2+ projects become filter chips; each card lists its own full stack.
  const projectCountByTag = new Map<string, number>();
  for (const project of projects) {
    for (const key of project.techKeys) {
      const label = getTechMeta(key).label;
      projectCountByTag.set(label, (projectCountByTag.get(label) ?? 0) + 1);
    }
  }
  const tags = [...projectCountByTag].filter(([, count]) => count > 1).map(([label]) => label);

  const visibleProjects =
    activeFilter === ALL_FILTER
      ? projects
      : projects.filter((project) => project.techKeys.some((key) => getTechMeta(key).label === activeFilter));

  return (
    <div className="flex flex-col gap-8">
      <ProjectFilters tags={tags} />

      {visibleProjects.length === 0 ? (
        <p className="text-sm text-muted">No projects match this filter yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
