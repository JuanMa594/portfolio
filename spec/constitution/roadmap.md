# Roadmap

Order and status of features. This view shows “what's done, what's next, and what's coming up.” Each entry points to its folder in `features/`.

## Done

1. **001 · MainLayout** — Complete: responsive header/nav with dark + light theme toggle, hero with CLI, and About/Skills/Experience draft sections wired to smooth-scroll nav anchors. Build and lint passing.
2. **001.5 · Interactive Terminal Command System** — Complete: replaced the hero terminal's static text-response map with a real command registry (`src/components/terminalCommands.ts`). Section commands (`/home`, `/about`, `/skills`, `/projects`, `/exp`) scroll by default and print an `-info` summary on flag (also fixes the old `/projects → #projects` id mismatch, both `/skills` and `/projects` now correctly target `#skills`); the About/Skills/Projects `-info` output is clearly-marked stub copy to be replaced once features 002–004 ship real content. Added a `/pixel → /serif → /reset` logo+font easter-egg chain (`CosmeticsContext`, `logoAssets.ts`, all 6 existing logo SVG variants now wired in) and a blue-shade-only `/accent` cycle (stays inside mission.md's "one accent color, blues" principle — no constitution changes needed). Plus personality commands: `/whoami`, `/socials`, `/quote`, `/coffee`/`/brew`, `/sudo`, `/theme`, `/clear`/`/cls`, and a contained `/matrix` digital-rain effect (respects `prefers-reduced-motion` and the "subtle animations only" rule). No new dependencies added. `/socials` ships with a placeholder LinkedIn URL/email in `src/data/socials.ts` — needs the real values filled in before shipping.
4. **003 · Projects / Skills Section** — Complete: projects grid merging the curated list (`data/projects.ts`, `data/projectMedia.ts`) with live stars/forks from GitHub (`lib/github.ts`), client-side filters and a screenshot modal, plus a skills section grouped by category. Task checklist in `features/003-Projects-Skills/tasks.md` not yet ticked.
5. **004 · Experience & Education Section** — Complete: `id="exp"` stacked layout with a featured experience card and a three-entry education timeline, data in `data/experience.ts` and `data/education.ts`. Visual checks (desktop/mobile, dark/light) still open in `features/004-Exp-Studies/tasks.md`.
3. **002 · About Me Section** — Complete: replaced the `AboutDraft` stub with a real `id="about"` section (`src/components/About/AboutMeSection.tsx`) — a `ProfileCard` (profile photo, bio, and tag badges) and a responsive `PhotoGallery` of 5 hobby photos underneath, each `GalleryCard` revealing a title/category/description caption on hover (desktop) or tap (mobile, no separate lightbox for this pass). All copy in `src/data/about.ts` (`ABOUT_BIO`, `PROFILE_TAGS`, `GALLERY_ITEMS`) is bracketed-hint placeholder text pending the real bio/captions. Photo assets moved from a repo-root scratch folder into `src/assets/about/` (Next static imports, `next/image` blur-up placeholders, no new dependencies). The terminal's `/about -info` now reads from `ABOUT_BIO` instead of its own hardcoded stub, so it stays in sync once the real copy is filled in.

## Next

1. **005 · Contact Section** — Spec ready in `features/005-Contact/`: social links + contact form sent through a Next.js Route Handler with Resend (origin check, rate limit, honeypot), a reusable "Download CV" button (Hero, Experience & Education, Contact), a "Contact" nav item, a `/contact` terminal command and a success/error toast. Blocked on: real LinkedIn/email values and a web-ready CV PDF (see spec §5).

## Backlog / ideas 💡

6. **006 · Glassmorphism Navbar** — Implement a fixed navigation bar with a `backdrop-blur` effect, an atmospheric gradient and a smooth-scroll system that responds to sections.
8. **007 · Testing Setup** — Configure Vitest (per `constitution/tech-stack.md`) and add a root `tests/` folder with initial coverage. Not urgent yet, but needed before feature work grows further.

> Each new feature is created as `features/NNN-feature-name/` with `spec.md`, `plan.md`, and `tasks.md` before any code is written.
