# Specification: 003-ProjectsSkills Section

## 1. Overview
The `003-ProjectsSkills` feature provides a dual-purpose showcase on the main landing page:
1. **Projects Grid:** Displays highlighted repositories dynamically enriched via GitHub API (or fallback local dataset) using sleek cards, interactive tech stack icons, filtering, and optional modal preview galleries.
2. **Skills Timeline & Grid:** Visualizes technical competencies organized cleanly in a vertical categorized layout (Languages, Frameworks/Libraries, Tools) matching the clean dark-mode aesthetic.

## 2. Visual & Architectural Integration
- **Placement:** Positioned below `#about` section in `src/app/page.tsx`.
- **Target Anchors:** `#projects` and `#skills` for smooth top-navigation scrolling.
- **Color Palette & UI System:**
  - Background: OLED Black (`#0F0F0F`) with subtle card borders. Use `src\app\globals.css` colors.
  - Accents: Electric Tech Blue for active filter tags, timeline nodes, and primary links. Use `src\app\globals.css` colors.
  - Card Layout: Minimalist rounded containers (`rounded-2xl`) featuring project avatar, title, tech stack badge row with tooltips, brief description, and external action links (GitHub / Live Demo).

## 3. Functional Requirements

### 3.1 Skills Section (`#skills`)
- **Categorized Vertical Timeline Grid:**
  - Displays a vertical accent line with node markers for each group:
    - `Programming Languages` (Python, SQL, C#, Java, JavaScript, TypeScript)
    - `Frameworks & Libraries` (Next.JS, React, Streamlit, .Net, Tailwind CSS, FastApi, Bootstrap, PySide, Pytorch, SQLite)
    - `Tools & Automation` (Docker, n8n, Git, Github, VSCode, SQL Server, PostgreSQL, Vercel, Postman, Power Platform, Claude Code/Codex/Opencode)
  - Grid items feature clean vector icons + technology labels below them (aligned with screenshot `assets\Captura de pantalla 2026-07-02 084250.png`).

### 3.2 Projects Showcase & Filters (`#projects`)
- **Filter Bar:** Interactive pill/badge buttons allowing instant client-side filtering by topic/technology (e.g., `All`, `TypeScript`, `React`, `Automation`, `Python`).
- **Terminal:** Hero´s terminal could get syncronized (for example, /projects --filter=react execution on terminal would scroll down and filter automatically this section).
- **Project Cards Structure:**
  - Top row: Project Icon/Avatar + Title + GitHub Stars/Forks count.
  - Tech Stack Row: Vector icon badges corresponding to technologies used (with tooltip on hover showing name, e.g., "TailwindCSS").
  - Body: Short, high-impact description.
  - Footer: Direct action buttons for GitHub repository and Live Site / Modal Preview.
- **Project Preview Modal (Gallery):**
  - Clicking on a project card or preview icon opens a lightweight, non-intrusive modal showing a gallery of screenshot previews without breaking the page's minimal layout.

### 3.3 GitHub API Integration & Fallback
- Service module to fetch dynamic metadata (stars, forks, open issues, default branch) from GitHub REST API (`/users/{username}/repos` or specific repo routes).
- Graceful client-side fallback/hydration using local mock data (`src/data/projects.ts`) in case of API rate limits or offline development.

## 4. Acceptance Criteria
- [ ] `#projects` and `#skills` links in Navbar smoothly scroll to their respective viewports.
- [ ] Skill icons render with clear typography and vertical category grouping without layout shifts.
- [ ] Project filters immediately update the displayed card list without full page reloads.
- [ ] Hovering over tech stack icons in project cards reveals technology name tooltips.
- [ ] Clicking a project with previews opens a clean responsive modal gallery.
- [ ] GitHub API fetches live metrics seamlessly with zero layout flicker (fallback data active if API fails).