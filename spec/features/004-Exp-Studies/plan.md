# Implementation Plan: 004-ExperienceEducation Feature

## Phase 1: Data Modeling
1. Create TypeScript interfaces for timeline items:
   - `ExperienceItem`: `id`, `role`, `company`, `location`, `dateRange`, `bullets[]` (achievements), `techKeys[]`, optional `logo`.
   - `EducationItem`: `id`, `degree`, `institution`, `dateRange`, `type` ('higher_ed' | 'technical' | 'high_school'), `description`, optional `logo`, optional `current`.
   - Field names follow `constitution/tech-stack.md` (`company`, `role`, `dateRange`, `bullets`), extended with the rest.
2. Populate `src/data/experience.ts` with 1 work entry and `src/data/education.ts` with the 3 academic milestones.

## Phase 2: Component Architecture
All in `src/components/Experience/`:
1. **`ExperienceEducationSection.tsx`:** wrapper with `id="exp"`, header and sub-headline.
2. **`ExperienceCard.tsx`:** full-width featured card (logo, role, company, dates, bullets, tech badges).
3. **`EducationTimeline.tsx`:** rail + nodes (horizontal from `md`, vertical on mobile) wrapping the cards; the current entry's node glows.
4. **`EducationCard.tsx`:** logo, type badge, degree, institution, description, dates.
5. **`OrgLogo.tsx`:** logo image with a generic icon fallback.
6. **`Reveal.tsx`:** fade-in-on-scroll wrapper (IntersectionObserver, reduced-motion aware).
Shared: `src/components/TechBadge.tsx` (also used by `ProjectCard`).

## Phase 3: Integration & Responsive Polish
1. Remove `ExperienceDraft` and import `<ExperienceEducationSection />` into `src/app/page.tsx`.
2. Tailwind grid (`md:grid-cols-3`) for the education row; the terminal `/exp -info` reads from the data files.
3. Ensure dark mode styles align with the blue accent design system.