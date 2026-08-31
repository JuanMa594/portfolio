# Specification: 002-AboutMe Section

## 1. Overview
The `AboutMe` feature introduces a dedicated section on the main landing page designed to give visitors a personal and professional introduction. It features a primary profile card (combining a bio, high-contrast imagery, and key traits) along with an interactive image gallery directly underneath to showcase personal highlights, hobbies, or milestone moments.

## 2. Visual & Architectural Integration
- **Placement:** Positioned directly below the `Hero` section on the main page (`src/app/page.tsx`).
- **Target Anchor:** Accessible via `#about` ID to support smooth scrolling from the top navigation menu.
- **Color Palette & Styling:**
  - Background: Deep Charcoal (`#0B0F19`) for Dark mode. Light Mode: Soft Peach(`#FFF5EB`) to provide thermal contrast
  - Text: Soft White for readability on dark mode; On light mode could be a Slate Black (`#0F172A`); Tech Blue for highlights/accent borders. Use colors that are already at `src\app\globals.css` or add the ones that are necessary like Slate Black.
  - Border Radius: Standardized pill or subtle rounded corners matching the `MainLayout` UI system.

## 3. Functional Requirements
### 3.1 Primary Bio Block
- **Main Photo:** Displays a high-resolution, optimized primary profile image with subtle hover/glow effects or borders aligned with the tech theme. Use the `assets\This_is_ME.png` photo alligned at the right side of the section
- **Bio Content:** Displays a short, high-impact summary covering professional background (Software & Automation), passion for tech, and personal ethos.
- **Key Stats/Tags:** Optional quick-badge row (e.g., "Full-Stack", "Automation", "Problem Solver").
- **Text content:** I am going to add all the information and data manually, but create the placeholders, and some hints of what should be in each part.

### 3.2 Interactive Image Gallery & Hover Overlay
- Located directly below the main bio container.
- **Content Focus:** Showcase personal interests, and active lifestyle elements without disclosing private family/personal data.
- **Grid Layout:** Responsive multi-column layout (1 column on mobile, 2–3 on tablet/desktop).
- **Interactivity:**
  - Smooth image loading (skeleton placeholder or blur effect).
  - Subtle zoom/scale effect on cursor hover.
  - Optional lightbox view or smooth modal expansion when clicking an image.
- **Card Interactivity (Hover Effect):**
  - **Scale Transition:** On cursor hover, the image performs a smooth, subtle zoom scale (e.g., `scale-105`).
  - **Caption Overlay:** An animated dark gradient layer appears from the bottom featuring a title, tag, and brief description (e.g., "Scuba Diving — Focus & Depth", "Electronic Music — Energy & Rhythm").
  - **Aesthetics:** Rounded corners with a subtle tech-blue border glow on hover state. Maybe the border in color blue is not necesary, but make the card looks aesthetic.

### 3.3 Navigation & Smooth Scroll Integration
- The parent container must have `id="about"`.
- Clicking the "About Me" button in the `Navbar` smoothly animates the viewport to this section without full page reloads.

## 4. Acceptance Criteria
- [ ] Navigating to `#about` via the header link scrolls smoothly to the `AboutMe` section.
- [ ] Main profile photo and bio text render crisp and correctly across all screen sizes.
- [ ] Gallery images adapt dynamically to different viewports without breaking aspect ratios.
- [ ] All image assets utilize Next.js `<Image />` optimization (or equivalent lazy-loading for fast CLS/LCP performance).