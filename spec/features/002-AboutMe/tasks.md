# Tasks List: 002-AboutMe Implementation

- [ ] **Task 1: Data & Asset Management**
  - [ ] Place primary profile photo and gallery images in `src/assets/images/about/`.
  - [ ] Create `src/data/about.ts` with structured types for bio text, social highlights, and gallery metadata.

- [ ] **Task 2: Profile & Bio Component Development**
  - [ ] Build `ProfileCard.tsx` with responsive layout (text + image).
  - [ ] Integrate primary profile photo with Next.js `<Image />` or optimized picture tag.
  - [ ] Add tech-blue accent glows or borders around the main profile image.

- [ ] **Task 3: Photo Gallery Implementation & Hover Overlay Implementation**
  - [ ] Build `PhotoGallery.tsx` component.
  - [ ] Implement responsive grid (1 col mobile, 3 cols desktop).
  - [ ] Add smooth CSS hover transitions (scale/glow effects).
  - [ ] Define dynamic gallery array in `src/data/about.ts` (diving, music, coffee).
  - [ ] Build `GalleryCard.tsx` with image scale animation on hover.
  - [ ] Implement text description overlay sliding/fading in on hover.
  - [ ] Ensure touch-device compatibility (clicking toggles overlay on mobile/tablets).

- [ ] **Task 4: Page Integration & Smooth Scroll**
  - [ ] Import `AboutMeSection.tsx` into `src/app/page.tsx`.
  - [ ] Attach `id="about"` to the section wrapper.
  - [ ] Test header link navigation to confirm smooth scrolling behavior.

- [ ] **Task 5: Responsive Polish & Validation**
  - [ ] Validate visual harmony with dark theme (`#0B0F19` / `#000000`).
  - [ ] Verify image lazy loading and performance.
  - [ ] Update feature status in `spec/constitution/roadmap.md`.