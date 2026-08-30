# Roadmap

Order and status of features. This view shows “what's done, what's next, and what's coming up.” Each entry points to its folder in `features/`.

## Done

1. **001 · MainLayout** — Complete: responsive header/nav with dark + light theme toggle, hero with CLI, and About/Skills/Experience draft sections wired to smooth-scroll nav anchors. Build and lint passing.

## Next


## Backlog / ideas 💡

2. **002 · About me Section** — Shows a bit of my information, including a photo of mine. The idea is to show that section in the home section, so when user click on the header´s option, it moothly goes down right to `About me` section. It could include a gallery of photos underneath mine one. 
3. **003 · Projects / Skills Section** — GitHub API integration, repository cards, and client-side filters by language and topic. Skill tags/badges grouped by category from `data/skills.ts`
4. **004 · Experience Section** — Static list of work experience rendered from `data/experience.ts`.
6. **005 · Contact Form** — Form submitted via a Vercel Serverless Function (Resend / EmailJS).
7. **006 · Glassmorphism Navbar** — Implement a fixed navigation bar with a `backdrop-blur` effect, an atmospheric gradient and a smooth-scroll system that responds to sections.
8. **007 · Testing Setup** — Configure Vitest (per `constitution/tech-stack.md`) and add a root `tests/` folder with initial coverage. Not urgent yet, but needed before feature work grows further.

> Each new feature is created as `features/NNN-feature-name/` with `spec.md`, `plan.md`, and `tasks.md` before any code is written.
