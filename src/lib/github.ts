import type { StaticImageData } from 'next/image';
import { FALLBACK_REPOS } from '../data/projects';
import { normalizeTechKey, TECH_META } from '../data/techIcons';
import { PROJECT_MEDIA, type GalleryImage } from '../data/projectMedia';

const GITHUB_USERNAME = 'JuanMa594';
// Avoid featuring the portfolio site inside its own Projects grid.
const SELF_REPO_NAME = 'portfolio';
const FEATURED_LIMIT = 6;
// Personal/notes repos that aren't real projects and shouldn't appear in the grid.
const EXCLUDED_REPO_NAMES = new Set(['exploring-n8n']);
// Forks are excluded by default, except these — projects worth showcasing despite
// starting from someone else's repo (e.g. a fork continued solo after a group project).
const ALLOWED_FORK_NAMES = new Set(['Hospital-JM-']);

export interface RawGithubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
  private: boolean;
  pushed_at: string;
}

export interface FeaturedProject {
  slug: string;
  name: string;
  description: string | null;
  githubUrl: string;
  liveUrl: string | null;
  techKeys: string[];
  stars: number;
  forks: number;
  updatedAt: string;
  logo?: StaticImageData;
  collaborationNote?: string;
  galleryImages: GalleryImage[];
}

function toFeaturedProject(repo: RawGithubRepo): FeaturedProject {
  const techKeys = [repo.language, ...repo.topics]
    .filter((value): value is string => Boolean(value))
    .map(normalizeTechKey)
    .filter((key, index, all) => key in TECH_META && all.indexOf(key) === index);

  const media = PROJECT_MEDIA[repo.name];

  return {
    slug: repo.name,
    name: repo.name,
    description: repo.description,
    githubUrl: repo.html_url,
    liveUrl: repo.homepage || null,
    techKeys,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    updatedAt: repo.pushed_at,
    logo: media?.logo,
    collaborationNote: media?.collaborationNote,
    galleryImages: media?.gallery ?? [],
  };
}

function pickFeatured(repos: RawGithubRepo[]): RawGithubRepo[] {
  return repos
    .filter((repo) => !EXCLUDED_REPO_NAMES.has(repo.name))
    .filter((repo) => !repo.fork || ALLOWED_FORK_NAMES.has(repo.name))
    .filter((repo) => !repo.archived && !repo.private && repo.name !== SELF_REPO_NAME)
    .sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count) return b.stargazers_count - a.stargazers_count;
      return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
    })
    .slice(0, FEATURED_LIMIT);
}

async function fetchLiveRepos(): Promise<RawGithubRepo[] | null> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed&direction=desc`,
      {
        headers: { Accept: 'application/vnd.github+json' },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return Array.isArray(data) ? (data as RawGithubRepo[]) : null;
  } catch {
    return null;
  }
}

export async function getFeaturedProjects(): Promise<FeaturedProject[]> {
  const liveRepos = await fetchLiveRepos();
  const repos = liveRepos ?? FALLBACK_REPOS;
  return pickFeatured(repos).map(toFeaturedProject);
}
