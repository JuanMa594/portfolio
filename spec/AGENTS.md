# Portfolio — Specification

## Overview
Personal developer portfolio for JuanMa594, showcasing GitHub projects, experience, and skills. Built with React + TypeScript and deployed on Vercel.

---

## Tech Stack

| Layer       | Choice                        |
|-------------|-------------------------------|
| Framework   | Next JS                       |
| Language    | TypeScript (primary) + JS     |
| Styling     | Tailwind CSS                  |
| Data source | GitHub REST API v3 (public)   |
| Hosting     | Vercel                        |
| Build tool  | Vite                          |

---

## Design System

- **Theme:** Dark mode only (no toggle required)
- **Style:** Minimal, clean, modern
- **Typography:** Elms-Sans font 
- **Color palette:** Dark backgrounds, subtle borders, one accent color, blues
- **Animations:** Eye-catching — only subtle, minimal transitions in some places(hover, fade-in on scroll)

---

## Sections

### 1. Hero / About Me
- Short intro (name, role, one-liner bio)
- Links: GitHub profile, LinkedIn, email

### 2. Projects / Skills
- Data source: GitHub API → `GET /users/JuanMa594/repos`
- Cards display: repo name, description, primary language, stars, link to repo
- **Filters (Projects section only):**
  - By programming language
  - By topic/tag (uses GitHub repo topics)
- Filters are client-side (no extra API calls after initial fetch)
- Exclude forked repos by default (toggle optional)
#### Skills:
- Visual list of technologies grouped by category (e.g. Frontend, Backend, Tools)
- No progress bars — just clean tags/badges

### 3. Experience
- Static data (hardcoded or from a local JSON/TS file)
- Each entry: company, role, date range, bullet points of responsibilities


### 4. Contact
- Simple form: name, email, message
- Submission via a serverless function (Vercel Function) or third-party service (e.g. Resend, EmailJS)

---

## GitHub API Integration

- Endpoint: `https://api.github.com/users/JuanMa594/repos?per_page=100&sort=updated`
- Auth: optional GitHub token via environment variable (`VITE_GITHUB_TOKEN`) to raise rate limit from 60 to 5000 req/hr
- Data fetched once on page load, cached in component state
- Fields used: `name`, `description`, `html_url`, `language`, `stargazers_count`, `topics`, `fork`

---

## Project Structure

```
spec/
├── constitution/            ← project stable rules (they change a bit)
│   ├── mission.md           ← what´re building and for whom
│   ├── tech-stack.md        ← conventions, techs and limits
│   └── roadmap.md           ← feature orders
└── features/                ← folder by feature
    └── NNN-feature-name/
        ├── spec.md          ← what does it do + acceptance criteria
        ├── plan.md          ← how it´s implemented
        └── tasks.md         ← tasks checklist
src/
├── components/
│    ├── Navbar.tsx
│    ├── Hero.tsx
│    └── Projects/
│    │  ├── Skills.tsx
│    │  ├── ProjectCard.tsx
│    │  ├── ProjectFilters.tsx
│    │  └── ProjectsSection.tsx
│    ├── Experience.tsx
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
└── README.md                 # Oficial README of the project. Update whenever making an update.
└── .gitignore             # Dependecies/libraries to ignore when making a Git commit
└── main.tsx
└── tailwind.config.json
```

---

## Routing
- Single-page app, no router needed
- Navigation via smooth scroll to section anchors
---

## Agent Core Directives & Execution Pipeline

### 1. Pre-Execution Protocol (Mandatory Reading)
Before analyzing, proposing, or writing any code, scripts, or architectural changes, the agent MUST explicitly read all markdown documentation located within the root `/spec/constitution` directory. 
- You are strictly prohibited from generating output or code solutions until the workspace rules, coding standards, and compliance metrics defined in `/spec/constitution` have been ingested.
- If the `/spec/constitution` folder is empty or missing, immediately halt execution and request the user to initialize the baseline project rules.

### 2. Operational Hierarchy & Rule Compliance
- **Supreme Authority:** The instructions, design system tokens, linting configurations, and workflows defined within `/spec/constitution` override any generic AI training defaults, external documentation, or third-party boilerplate styles.
- **Zero-Deviation Policy:** Any code generation that violates the architecture, security baselines, or style rules found in the constitution will be considered a broken build. 

### 3. Verification Step
In your first response of a development session, briefly state which files from the `/spec/constitution` directory you reviewed to confirm compliance (e.g., *"Verified against /constitution/roadmap.md"*).

### Project Intelligence Location
- **System Rules:** All global project rules, stack limitations, and branding constants are stored in `/spec/constitution/`.
- **Active Feature Documentation:** All current task details (spec, plan, and tasks) are located in `/spec/features/`.
- **Roadmap:** Always when finish a feature development, update the `/spec/roadmap.md` to know the state of the project
- **Always read these before starting a task.**
---

## New feature Flow

1. Create `features/NNN-feature-Name/` with the next free-number (`001`, `002`, …).
2. Write `spec.md`: what does it do, why and measurable acceptance criteria
3. Write `plan.md`: technique focus and decitions, respecting `constitution/tech-stack.md`.
4. Break down on `tasks.md` and track the progress.
5. Implement and enssurance (build/tests/lint o lo que defina la constitución).
6. update `constitution/roadmap.md` (Move the feature to "Done").
Keynote: Constitution rules; so if a feature compete with `mission.md` or `tech-stack.md`, feature is going back and redefine, not constitution
---


## Deployment

- Platform: Vercel
- Trigger: push to `main` branch auto-deploys
- Environment variable: `VITE_GITHUB_TOKEN` set in Vercel dashboard

---

## Out of Scope (v1)
- Blog / articles section
- Light mode toggle
- Multi-language (i18n)
- CMS integration

