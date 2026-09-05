# Tasks List: 003-ProjectsSkills Implementation

- [ ] **Task 1: Data Structures & GitHub API Fetcher**
  - [ ] Create `src/data/skills.ts` with categories (`Programming Languages`, `Frameworks/Libraries`, `Tools`).
  - [ ] Create `src/data/projects.ts` with local project specs and screenshot gallery paths.
  - [ ] Create `src/lib/github.ts` to fetch repository stats safely.

- [ ] **Task 2: Skills Section Implementation**
  - [ ] Build `SkillsSection.tsx` with vertical timeline indicator line.
  - [ ] Implement `SkillsCategoryGroup.tsx` and `SkillItem.tsx`.
  - [ ] Add SVG/Lucide/SimpleIcon mapping for tech stack logos.

- [ ] **Task 3: Project Filter & Card Components**
  - [ ] Build `ProjectFilterBar.tsx` for client-side tag filtering.
  - [ ] Build `ProjectCard.tsx` with tech icon hover tooltips (`TailwindCSS`, `React`, `TypeScript`, etc.).
  - [ ] Attach GitHub live stats (stars/forks badges) to cards.

- [ ] **Task 4: Project Gallery Modal**
  - [ ] Build `ProjectModal.tsx` overlay for screenshot previews.
  - [ ] Implement keyboard navigation (`Esc` to close) and click-outside dismissal.

- [ ] **Task 5: Page Integration & Verification**
  - [ ] Add `<SkillsSection />` and `<ProjectsSection />` to `src/app/page.tsx`.
  - [ ] Test smooth scroll targets `#skills` and `#projects`.
  - [ ] Validate responsive grid layout on mobile and desktop viewports.