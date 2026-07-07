# Implementation Plan: MainLayout Feature

## Phase 1: Environment Setup & Asset Optimization
1. Extract and convert the current "JM" logo variants from PNG to clean, optimized SVG path structures.
2. Setup fundamental project configuration, style variables (Tailwind configuration or CSS variables for custom blues/blacks), and font families.

## Phase 2: Structural Layout & Component Design
1. Build the global `MainLayout` container wrapping core page sections.
2. Implement the `Header` component with the brand logo, navigation pills, and the visual structure of the Theme Switcher.
3. Construct the `Hero` structure positioning the text block on the left and the SVG logo workspace on the right.
4. Integrate the bottom CLI interface container shell.

## Phase 3: Styling & Responsiveness
1. Apply the default dark-mode palette (`#0F0F0F`, `1A1A1A`, `#F8F9FA`, other colors are in `\tailwind.config.json`).
2. Harmonize `border-radius` variables across the navigation capsule and the CLI bar.
3. Configure fluid media queries for flawless presentation on tablet and mobile viewports.

## Phase 4: Quality Assurance & Review
1. Cross-browser validation (Chrome, Safari, Firefox, Edge, etc).
2. Validate semantic HTML layout accessibility (ARIA landmarks for header, nav, main).