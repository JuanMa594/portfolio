# Specification: 004-ExperienceEducation Section

## 1. Overview
The `004-ExperienceEducation` feature replaces the temporary `ExperienceDraft` placeholder on the main landing page with a refined section (stacked layout: one featured experience card above a three-card education timeline) titled **Experience & Education**. It highlights professional work history alongside formal academic qualifications, technical certifications, and ongoing software development studies.

## 2. Visual & Architectural Integration
- **Placement:** Last section in `src/app/page.tsx`, after `#skills`.
- **Target Anchor:** Keeps the existing `id="exp"` (used by the Header nav and the terminal `/exp` command), so neither needs changes.
- **Color Palette & Styling:**
  - Background: same as `#about` — `#0B0F19` in dark mode and `#FFF5EB` in light mode (via the `[:root.light_&]` variant); the content uses the regular theme tokens.
  - Cards & Timeline: reuse the existing theme tokens (`bg-surface`, `border-ink/10`, `text-muted`, `accent`), same as the Projects cards, so both dark and light mode work. No new colors.

## 3. Functional Requirements

### 3.1 Stacked Layout (decided over a 2-column split)
A 1-vs-3 split would leave the left column mostly empty and a one-node timeline looks odd, so the blocks are stacked.
- **Top: Professional Experience** — one full-width featured card per entry.
  - Displays: logo, Role, Company, Location, Date Range, 2–3 achievement bullets (`bullets`) and tech badges (`techKeys`).
  - Entry: **Technology Apprentice · Summa SCI** (Sabaneta, Apr–Oct 2026, 6 months).
- **Bottom: Education** — a rail with nodes (horizontal from `md`, vertical on mobile) and one card per entry, reverse chronological:
  1. **Technologist in Software Development** — Institución Universitaria ITM, 2023 – Present (current node glows).
  2. **Systems Technician** — SENA, 2021 – 2022 (done alongside high school; counts as its own qualification).
  3. **High School Diploma** — Liceo Antioqueño, 2017 – 2022 (grades 6–11).
  - Displays: logo, type badge, degree, institution, description, dates.
- Each company/school shows its logo from `src/assets/experience/` (original colors kept); a generic icon is the fallback.
- All content is in English.

### 3.2 Dynamic Data Structure
- Decouples UI from content using structured data arrays in `src/data/experience.ts` and `src/data/education.ts` (allowing simple editing of company names, dates, and bullet points without modifying TSX components).

### 3.3 Visual Timeline Node Animations
- Subtle fade-in on scroll (IntersectionObserver) and hover border transitions, CSS only, honoring `prefers-reduced-motion`. No new dependencies.

## 4. Acceptance Criteria
- [ ] Section replaces `ExperienceDraft` smoothly on `src/app/page.tsx` with the anchor `id="exp"`.
- [ ] Displays 1 Work Experience entry and 3 Education entries correctly categorized.
- [ ] Responsive: education cards are 3 across with a horizontal rail from `md`, and a single column with a vertical rail on mobile.
- [ ] All data is sourced from `src/data/experience.ts` and `src/data/education.ts`.