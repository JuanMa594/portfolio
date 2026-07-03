# Specification: MainLayout & Navigation

## 1. Overview
The `MainLayout` serves as the foundational visual and structural shell of the portfolio. It encompasses the responsive navigation header, the interactive toggle system, the typography styling for the hero section, and the command-line interface (CLI) input container. It sets the baseline dark/light mode architecture and establishes the visual brand guidelines (Black, Tech Blues, and Neutrals).

## 2. Visual & Brand Guidelines
- **Color Palette (Dark Mode - Default):**
  - Background: Deep Charcoal / OLED Black (`#0B0F19` / `#000000`)
  - Accent/Interactive: Electric Tech Blue (`#00E5FF` or `#2F80ED`)
  - Primary Typography: Soft White (`#F8F9FA`)
  - Secondary Elements / CLI Container: Muted Dark Grey (`#1E222B`)
- **Typography:** Modern sans-serif (e.g., Inter, Roboto, or system-ui) paired with a monospace font for the CLI input (`Fira Code`, `JetBrains Mono`).
- **Layout:** Unified border-radius strategy across the navigation bar elements and the CLI input bar to ensure visual harmony.

## 3. Functional Requirements
### 3.1 Header & Navigation
- **Logo Component:** Displays the custom "JM" branding. Must support SVG rendering to facilitate smooth transition animations.
- **Navigation Links:** Horizontal pill-shaped container hosting links: "Home", "About Me", "Projects/Skills", and "Exp.". Must be fully responsive (collapsing into a clean mobile layout).
- **Theme Switcher UI:** An "Off/On" toggle switch adjacent to navigation. Initial phase handles visual states; hooks into the theme management system.

### 3.2 Hero Section Baseline
- **Main Heading:** "I'm JuanMa" utilizing heavy, high-contrast typography.
- **Subheading:** "Software & Automation developer".
- **Brand Visual Placement:** Desktop layout features the interactive "JM" pixel grid logo on the right side of the hero canvas.

### 3.3 Command Line Interface (CLI) Input Bar
- Located prominently at the bottom of the landing view.
- Contains static placeholder text instructing users: `Type /pixel and look what happens...` and `Type /help to see what can you do`.
- Must be framed within an accessible input box styled dynamically to match the dark/light interface state.

## 4. Technical Constraints
- **Logo Asset:** Transition raw `.png` logos into inline or component-driven SVGs to prevent quality loss during pixelation toggles.
- **Performance:** Ensure layout shifts (CLS) are minimized during initial load.