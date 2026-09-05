# Implementation Plan: 003-ProjectsSkills Feature

## Phase 1: Data Modeling & API Layer
1. Build `src/data/skills.ts` containing categorized technology arrays (icon identifier, label, proficiency/category).
2. Build `src/data/projects.ts` containing project definitions (slug, title, description, techStack keys, githubRepo, liveUrl, galleryImages).
3. Implement `src/lib/github.ts` API fetcher to retrieve repo metrics (stars, forks, description) with caching and rate-limit handling.

## Phase 2: Component Architecture
1. **Skills Sub-system (`src/components/Skills/`):**
   - `SkillsSection.tsx`: Main section container (`id="skills"`) with section title.
   - `SkillsCategoryGroup.tsx`: Vertical node timeline layout for each tech group.
   - `SkillItem.tsx`: Individual icon + label card with hover lighting.
2. **Projects Sub-system (`src/components/Projects/`):**
   - `ProjectsSection.tsx`: Main section wrapper (`id="projects"`).
   - `ProjectFilterBar.tsx`: Filter tags/buttons state controller.
   - `ProjectCard.tsx`: Card component matching screenshot spec (avatar, title, tech icons with tooltips, footer links).
   - `ProjectModal.tsx`: Accessible gallery modal for screenshot previews.

## Phase 3: Integration & State Management
1. Integrate `SkillsSection` and `ProjectsSection` into `src/app/page.tsx`.
2. Connect client-side state for tag filtering (`activeFilter`).
3. Wire up smooth scroll anchors to global navigation.

## Phase 4: Polish, Responsiveness & Accessibility
1. Ensure full responsiveness across 320px to 1440px displays.
2. Verify dark/light contrast compliance and tooltip positioning.