export interface ProjectEntry {
  /** Stable id: keys PROJECT_MEDIA and PROJECT_ICONS. */
  slug: string;
  name: string;
  description: string;
  /** GitHub repo name, used to enrich the card with live stars/forks. Null when the repo is private. */
  repo: string | null;
  githubUrl: string | null;
  liveUrl: string | null;
  /** Keys of TECH_META: languages first, then frameworks, libraries and tools. */
  techKeys: string[];
}

/**
 * Hand-curated list of the projects shown in the Projects grid, in display order.
 * Everything but stars/forks comes from here; see getFeaturedProjects for the live part.
 */
export const PROJECTS: ProjectEntry[] = [
  {
    slug: 'Kyoto-website',
    name: 'Kyoto Website',
    description:
      'Immersive, scroll-driven 3D website about Kyoto, built with React Three Fiber, hand-written GLSL shaders and GSAP, with a synthesized Web Audio soundscape and multi-language support.',
    repo: 'Kyoto-website',
    githubUrl: 'https://github.com/JuanMa594/kyoto-website',
    liveUrl: null,
    techKeys: [
      'typescript',
      'nextjs',
      'react',
      'threejs',
      'r3f',
      'glsl',
      'gsap',
      'zustand',
      'nextintl',
      'tailwindcss',
      'bun',
    ],
  },
  {
    slug: 'Streaming',
    name: 'Streaming',
    description:
      'Music streaming app with search, library, playlists, listening statistics and themes, built as a Bun monorepo with a React + Vite frontend and a Hono + SQLite backend.',
    repo: null,
    githubUrl: null,
    liveUrl: null,
    techKeys: [
      'typescript',
      'bun',
      'react',
      'vite',
      'tailwindcss',
      'tanstackrouter',
      'tanstackquery',
      'zustand',
      'radixui',
      'lucide',
      'hono',
      'zod',
      'drizzle',
      'sqlite',
    ],
  },
  {
    slug: 'FutStats',
    name: 'FutStats',
    description:
      'A multi-league sports app (scores, standings, rosters, and leaders) built using the Free API Live Football Data on RapidAPI, which is a wrapper for FotMob.',
    repo: 'mundial-app',
    githubUrl: 'https://github.com/JuanMa594/mundial-app',
    liveUrl: null,
    techKeys: ['typescript', 'nextjs', 'react', 'tailwindcss', 'tanstackquery', 'bun'],
  },
  {
    slug: 'Hospital-JM-',
    name: 'Hospital-JM',
    description:
      'API and frontend for comprehensive medication inventory management, with a focus on traceability, stock/expiration alerts, and clean architecture.',
    repo: 'Hospital-JM-',
    githubUrl: 'https://github.com/JuanMa594/Hospital-JM-',
    liveUrl: 'https://hospital-jm.vercel.app',
    techKeys: ['python', 'csharp', 'html', 'css'],
  },
  {
    slug: 'ProyectoRickYMorty',
    name: 'ProyectoRickYMorty',
    description:
      'This project is an interactive web application developed in Blazor .NET 10 that uses the Rick and Morty API to display information about the characters from the series. The application allows users to explore characters, filter them by different criteria, and vote using a "like/dislike" system.',
    repo: 'ProyectoRickYMorty',
    githubUrl: 'https://github.com/JuanMa594/ProyectoRickYMorty',
    liveUrl: null,
    techKeys: ['csharp', 'html', 'blazor', 'net', 'bootstrap'],
  },
  {
    slug: 'LaHuesera',
    name: 'La Huesera',
    description:
      'ASP.NET web application for managing data from the "La Huesera" application using a data model generated with Entity Framework.',
    repo: 'LaHuesera',
    githubUrl: 'https://github.com/JuanMa594/LaHuesera',
    liveUrl: null,
    techKeys: ['csharp', 'javascript', 'html', 'css', 'net', 'entityframework', 'bootstrap', 'jquery', 'nuget'],
  },
];
