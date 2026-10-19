# Tasks List: 004-ExperienceEducation Implementation

- [x] **Task 1: Data Structures & Mock Files**
  - [x] Create `src/types/experience.ts` with TypeScript interfaces for work and education items.
  - [x] Create `src/data/experience.ts` with 1 professional experience entry placeholder.
  - [x] Create `src/data/education.ts` with 3 education items (Associate Degree, Technical High School, High School Diploma).

- [x] **Task 2: Timeline Component Development**
  - [x] Build the cards with glowing node indicator (current study) and accent colors.
  - [x] Build `EducationTimeline.tsx` to handle the rail and list rendering.
  - [x] Build `ExperienceEducationSection.tsx` as the master stacked layout (plus `ExperienceCard`, `EducationCard`, `OrgLogo`, `Reveal`).

- [x] **Task 3: Page Integration & Cleanup**
  - [x] Replace `ExperienceDraft` with `ExperienceEducationSection` in `src/app/page.tsx`.
  - [x] Ensure section has `id="experience"` attached to its root element.
  - [ ] Verify smooth navigation target from header links (browser check pending; the id `exp` is unchanged).

- [x] **Task 4: Responsive & Visual Validation**
  - [ ] Validate the 3-across education row on desktop and the single column on mobile (visual check pending).
  - [ ] Verify readability and contrast across Dark and Light mode tokens (visual check pending).