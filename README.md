# Portfolio

This project is a modern personal portfolio website built with Next.js, React, TypeScript, and Tailwind CSS. It showcases the developer's work, experience, skills, and contact information in a polished, responsive interface.

## Features

- Responsive layout for desktop and mobile
- Sections for projects, experience, skills, and contact
- Fast rendering and modern UI with Next.js
- Easy deployment to Vercel or other Node.js-compatible hosting platforms

## Getting started

1. Install dependencies:
   ```bash
   bun install
   ```

2. Run the development server:
   ```bash
  bun run dev
   ```

3. Open the app in your browser:
   ```text
   http://localhost:3000
   ```

## Production build

To prepare the app for deployment:

```bash
bun run build
```

To start the production server locally:

```bash
bun run start
```
For architecture and feature development, check the /spec folder.

## Deploying the project

### Vercel

- Push the repository to GitHub
- Import the project in Vercel
- Use the default Next.js build settings
- Deploy the project

### Other hosting platforms

- Build the app with `bun run build`
- Start it with `bun run start`
- Make sure the host supports Node.js applications

## Security note

Keep any API keys or sensitive values in environment variables and never commit them to the repository.

