# Specification: MainLayout & Navigation

## 1. Overview
The `MainLayout` serves as the foundational visual and structural shell of the portfolio. It encompasses the responsive navigation header, the interactive toggle system, the typography styling for the hero section, and the command-line interface (CLI) input container. It sets the baseline dark/light mode architecture and establishes the visual brand guidelines (Black, Tech Blues, and Neutrals).

## 2. Visual & Brand Guidelines
- **Color Palette (Dark Mode - Default):** Use `/tailwind.config.json` colors
  - Background: Deep Charcoal / OLED Black (`0F0F0F` / `#0B0F19`)
  - Accent/Interactive: Electric Tech Blue (`#0231BD` or `#023BE6`)
  - Primary Typography: Soft White (`#F8F9FA`)
  - Secondary Elements / CLI Container: Muted Dark Grey (`#1E222B`)
Other colors are in `/tailwind.config.json`
- **Typography:** Modern sans-serif: Use `portfolio\src\assets\fonts\ElmsSans-VariableFont_wght.ttf` for titles and subtitles. Use `portfolio\src\assets\fonts\Inconsolata-VariableFont_wdth,wght.ttf` for text, paired with a monospace font for the CLI input `portfolio\src\assets\fonts\GeistPixel-Regular-VariableFont_ELSH.ttf`. Fonts are already installed in the PC, so do not install them again. 
- **Layout:** Unified border-radius strategy across the navigation bar elements and the CLI input bar to ensure visual harmony.

## 3. Functional Requirements
### 3.1 Header & Navigation
- **Logo Component:** Displays the custom "JM" branding. Must support SVG rendering to facilitate smooth transition animations. Logos are in `portfolio\src\assets\Logos`. Main Logo is `Logo_mixed_BLACK.svg`, other SVGs will use whenever changing the illumination of the App, or typing a command on the CLI.
- **Navigation Links:** Horizontal pill-shaped container hosting links: "Home", "About Me", "Projects/Skills", and "Exp.". Must be fully responsive (collapsing into a clean mobile layout).
- **Theme Switcher UI:** An "Off/On" toggle switch adjacent to navigation. Initial phase handles visual states; hooks into the theme management system. This button will use to change the illumination of the App (Black/White)

### 3.2 Hero Section Baseline
- **Main Heading:** "I'm JuanMa" utilizing heavy, high-contrast typography.
- **Subheading:** "Software & Automation developer".
- **Brand Visual Placement:** Desktop layout features the interactive "JM" (`Logo_mixed_BLACK.svg`) pixel grid logo on the right side of the hero canvas.

### 3.3 Command Line Interface (CLI) Input Bar
- Located prominently at the bottom of the landing view.
- Contains static placeholder text instructing users: `Type /pixel and look what happens...` and `Type /help to see what can you do`.
- Must be framed within an accessible input box styled dynamically to match the dark/light interface state.

## 3.4 Page Structure & Scroll Behavior
- **Scroll Philosophy:** The landing page is a single-page application (SPA) layout. The page must support smooth vertical scrolling.
- **Hero Section:** Serves as the landing view.
- **Section Reveal (Drafting):** Below the Hero section, implement "Draft Containers" for core sections. Each section should have a distinct visual background separation (Subtle shifts between `#000000` and `#0B0F19` to provide depth).
- **Required Sections:**
  - **About Me Summary:** A concise, high-impact summary block.
  - **Skills Overview:** A visual grid representation of primary skills.
  - **Experience Highlight:** A condensed timeline or feature card.
- **Navigation Interaction:** Clicking a link in the Navigation Bar must trigger a smooth scroll to the corresponding section ID (`#about`, `#skills`, `#exp`).

## 4. Technical Constraints
- **Logo Asset:** Transition raw `.png` logos into inline or component-driven SVGs to prevent quality loss during pixelation toggles.
- **Performance:** Ensure layout shifts (CLS) are minimized during initial load.
- **Atomic CSS:** Use Utility Classes

### 4.1. Acceptance Criteria
- [x] **Smooth Scrolling:** Clicking nav items smoothly scrolls the page to the target section.
- [x] **Section Separation:** Each section (About, Skills, Exp) is clearly defined and distinguishable during the scroll.
- [x] **Performance:** The "Draft" sections do not trigger layout shifts during load.
- [x] **Sticky Header:** The navigation bar remains sticky or accessible at the top of the viewport during the scroll process.

## 5. Technical Implementation Guidelines for Sections
- **Components:** Create individual components for each "Draft" in the Main page: `<AboutDraft />`, `<SkillsDraft />`, and `<ExperienceDraft />`. 
- **Layout:** Use `scroll-behavior: smooth;` in the CSS globals.
- **Containers:** Each section should be wrapped in a `<section>` tag with an appropriate ID for accessibility and navigation.
- **Responsiveness:** Ensure that the "Drafts" stack vertically on mobile and potentially change grid layouts on desktop.