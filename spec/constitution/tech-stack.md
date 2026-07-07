# Tech Stack and Conventions

## Technologies

- **Language:** TypeScript (primary) + JS
- **Framework / runtime:** Next JS
- **Styling:** Tailwind CSS
- **Data Source:** GitHub REST API v3 (public)
- **Tests:** Vitest
- **Build tool:** Vite
- **Hosting:** Vercel

### Libraries
Install if it´s not yet
- **Animations:** Framer Motion, GSAP
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui, Material UI (MUI)
- **State Manage:** Zustand, Redux Toolkit

## Files / Key Modules

```
src/
├── components/
│    ├── Navbar.tsx
│    ├── Hero.tsx
│    └── Projects/
│    │  ├── ProjectCard.tsx
│    │  ├── ProjectFilters.tsx
│    │  └── ProjectsSection.tsx
│    ├── Experience.tsx
│    ├── Skills.tsx
│    └── Contact.tsx
└── hooks/
│    ├── useGitHubRepos.ts   # It will call to /api/github instead of api.github.com directamente
...
└── types/
│    ├── github.ts           # GitHub API response types
└── data/
│    ├── experience.ts       # static experience data
│    └── skills.ts           # static skills data
└── api/                      # Vercel Serverless Functions Folder
│    ├── github.ts             # Retrieve the repos securely using the hidden TOKEN
│    └── contact.ts            # Submit the form (Resend / EmailJS)
└── App.tsx
└── main.tsx
```

## Commands

- `bun dev` — starts the local dev environment.
- `bun add ` — adds a package to the project
- `bun run test` — runs Vitest tests.
- `bun run lint` — checks code style with ESLint.
- `bun build` — compiles for production.

## Data Models / Domains

- `GitHubRepo` — fields: `name`, `description`, `html_url`, `language`, `stargazers_count`, `topics: string[]`, `fork: boolean`. Source: GitHub API. `fork` controls default visibility filter.
- `ExperienceEntry` — fields: `company: string`, `role: string`, `dateRange: string`, `bullets: string[]`. Static data in `data/experience.ts`.
- `Skill` — fields: `name: string`, `category: 'Frontend' | 'Backend' | 'Tools' | string`. Static data in `data/skills.ts`.

## Conventions

- **Naming:** `camelCase` for functions and variables; `PascalCase` for React/TypeScript/Next components and types.
- **Tests:** Create a `tests/` folder at the root if it doesn't exist; all test files go there.
- **Environments:** Split dev / staging / prod via Vite's `import.meta.env`.
- **Config:** Secure by default — defense in depth; sensitive values only in `.env`.
- **Security:** Prevent XSS (no `dangerouslySetInnerHTML` with untrusted data), no command injection.
- **Typing:** All data structures typed with TypeScript interfaces/types — no `any`.
- **Component pattern:** One component per file; props typed via `interface Props`.
- **API calls:** All GitHub fetches inside `useGitHubRepos.ts`; no fetch calls directly in components.

## Visual Style

- **Theme:** Dark mode only — deep dark background (`#0F0F0F`), subtle borders (other main colors are in `/tailwind.config.json` file, in the root of the project).
- **Accent color:** Blue spectrum (`#0231BD`, the other blues are in `/tailwind.config.json` file, in the root of the project).
- **Typography:** Single sans-serif — Inter (via Google Fonts or Fontsource).
- **Layout:** Single-page, scroll-based; responsive from 320 px mobile to 1440 px desktop.
- **Animations:** Subtle only — hover state transitions, fade-in on scroll; no heavy motion.

## Harsh Limits

- **No dependencies without notice** — never install a library without informing the developer first.
- **No secrets in repo** — `VITE_GITHUB_TOKEN` and any other sensitive value lives only in `.env*` files, which are git-ignored.
- **No `.env*` committed** — `.env`, `.env.local`, `.env.production` must be in `.gitignore`.
- **No anonymous access to sensitive endpoints** — serverless contact function must validate origin/rate-limit.
- **Structured logs only** — no `console.log` with sensitive data in production builds.
- **Hide sensitive data on errors** — catch blocks must not expose tokens, emails, or stack traces to the UI.
- **No arbitrary command execution** — no `eval`, no `exec` of user-supplied strings.
- **No credential storage in code** — hardcoded tokens or passwords are forbidden.
