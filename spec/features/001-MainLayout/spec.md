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

## 4. Technical Constraints
- **Logo Asset:** Transition raw `.png` logos into inline or component-driven SVGs to prevent quality loss during pixelation toggles.
- **Performance:** Ensure layout shifts (CLS) are minimized during initial load.