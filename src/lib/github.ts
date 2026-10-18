import type { StaticImageData } from 'next/image';
import { PROJECTS, type ProjectEntry } from '../data/projects';
import { PROJECT_MEDIA, type GalleryImage } from '../data/projectMedia';

const GITHUB_USERNAME = 'JuanMa594';

export interface RawGithubRepo {
  name: string;
  stargazers_count: number;
  forks_count: number;
}

export interface FeaturedProject {
  slug: string;
  name: string;
  description: string;
  /** Null when the repo is private. */
  githubUrl: string | null;
  liveUrl: string | null;
  techKeys: string[];
  /** Undefined for private repos, which have no public stats. */
  stars?: number;
  forks?: number;
  logo?: StaticImageData;
  collaborationNote?: string;
  galleryImages: GalleryImage[];
}

function toFeaturedProject(project: ProjectEntry, repo: RawGithubRepo | undefined): FeaturedProject {
  const media = PROJECT_MEDIA[project.slug];
  const isPublic = project.repo !== null;

  return {
    slug: project.slug,
    name: project.name,
    description: project.description,
    githubUrl: project.githubUrl,
    liveUrl: project.liveUrl,
    techKeys: project.techKeys,
    stars: isPublic ? (repo?.stargazers_count ?? 0) : undefined,
    forks: isPublic ? (repo?.forks_count ?? 0) : undefined,
    logo: media?.logo,
    collaborationNote: media?.collaborationNote,
    galleryImages: media?.gallery ?? [],
  };
}

async function fetchLiveRepos(): Promise<RawGithubRepo[]> {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`, {
      headers: { Accept: 'application/vnd.github+json' },
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const data = await res.json();
    return Array.isArray(data) ? (data as RawGithubRepo[]) : [];
  } catch {
    return [];
  }
}

export async function getFeaturedProjects(): Promise<FeaturedProject[]> {
  const liveRepos = await fetchLiveRepos();
  const reposByName = new Map(liveRepos.map((repo) => [repo.name, repo]));

  return PROJECTS.map((project) =>
    toFeaturedProject(project, project.repo ? reposByName.get(project.repo) : undefined)
  );
}
