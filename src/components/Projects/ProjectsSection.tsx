import { getFeaturedProjects } from '../../lib/github';
import { ProjectsGrid } from './ProjectsGrid';

export async function ProjectsSection() {
  const projects = await getFeaturedProjects();

  return (
    <section id="projects" className="px-5 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-semibold sm:text-4xl">Projects</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">
          A few things I&apos;ve built, pulled live from GitHub.
        </p>

        <div className="mt-12">
          <ProjectsGrid projects={projects} />
        </div>
      </div>
    </section>
  );
}
