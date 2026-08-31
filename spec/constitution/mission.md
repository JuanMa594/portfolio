# Mission

Personal developer portfolio for JuanMa594, showcasing GitHub projects, experience, and skills. Built with React + TypeScript and deployed on Vercel.

## What We Built

A personal web portfolio that centralizes JuanMa594’s professional identity: his real projects (fetched live from GitHub), work experience, and technical skills—all on a single, modern, and fast website.

_Key product features:_

1. **Project Showcase** — Uses the GitHub API to display public repositories, filterable by language and topic; excludes forks by default.
2. **Professional Profile** — Static sections for work experience (company, role, dates, responsibilities) and skills grouped by category.
3. **Contact Form** — A form (name, email, message) submitted via a serverless function on Vercel.
4. **Interactive Terminal** — A CLI-style command bar in the hero section with real section navigation (`-info` summaries or scroll-to on commands like `/about`, `/skills`, `/exp`), and a set of personality/easter-egg commands (logo + font swap chain via `/pixel`/`/serif`/`/reset`, blue-shade accent cycling via `/accent`, `/matrix`, `/quote`, `/coffee`, `/whoami`, `/socials`, `/sudo`) that give the site a distinct developer-tool identity.
5. **About Me Section** — A personal introduction below the hero (`#about`): a profile card with bio and photo, plus a hover/tap photo gallery of personal interests, giving visitors a sense of who's behind the portfolio beyond the resume facts.

## Who It’s For

- **Recruiters and hiring managers** looking for quick, verifiable evidence of JuanMa594’s technical work.
- **Other developers** who want to view open-source projects or collaborate.
- **JuanMa594 (author)** as a public professional presence and hub for his online identity.

## Principles

- **Speed over complexity** — A single data load (GitHub API on build), with no over-fetching or unnecessary layers.
- **Code as the source of truth** — Projects come directly from GitHub; there is no duplicate or out-of-sync content.
- **Clean and focused visual design** — Dark mode by default with a light mode toggle, a single typeface, minimal animations; the focus is on 

## What It IS NOT


- It is not a blog or a CMS; there are no articles, posts, or content editor.
- It is not multilingual (v1 is only in Spanish/English mixed depending on the section; no formal i18n).
- It does not have a light mode by default; it is dark by design, but the whole app, could change to a light mode by switching a button..
- It is not an application with authentication, its own database, or an admin panel.
- It does not aim to cover all social media platforms; links are limited to GitHub, LinkedIn, and email.