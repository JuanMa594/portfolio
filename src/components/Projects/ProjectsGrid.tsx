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

  const tags = Array.from(
    new Set(projects.flatMap((project) => project.techKeys.map((key) => getTechMeta(key).label)))
  );

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
