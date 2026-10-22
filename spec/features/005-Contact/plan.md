# Implementation Plan: 005-Contact Feature

## Decisions
- **Next.js Route Handler instead of `src/api/`.** The constitution's tree (`src/api/contact.ts`) is from the Vite plan; in the App Router the Vercel serverless function is `src/app/api/contact/route.ts`. Same role, framework-native location.
- **Route Handler over a Server Action.** An explicit `POST` endpoint makes the origin check, status codes (`400/403/429`) and manual testing (curl) straightforward.
- **Resend SDK** (`resend` package) is the only new dependency. Per the "No dependencies without notice" limit, it is installed only after the developer confirms (Task 3).
- **No validation library.** Rules are few, so they live in one hand-written, shared module used by both client and server — no `zod`.
- **No toast library.** A ~40-line client component is enough.
- **In-memory rate limit.** Good enough for a low-traffic portfolio; a distributed store is out of scope.

## Phase 1: Data & Shared Logic
1. `src/data/contact.ts`: fill in the real LinkedIn URL and email (blocked by spec §5.1); add an optional `href` per link (`mailto:` for email) and an icon key so the section and the terminal share it.
2. `src/lib/contactValidation.ts`: `ContactPayload` type (`name`, `email`, `message`, `website` honeypot), limits as constants, and `validateContact(input): { ok: true, data } | { ok: false, errors: Record<field, string> }`. Pure function, imported by the form and the route.

## Phase 2: API Route
`src/app/api/contact/route.ts`:
1. **Origin check:** compare `request.headers.get('origin')` with `process.env.SITE_URL` (plus `http://localhost:3000` when `NODE_ENV !== 'production'`) → `403`.
2. **Rate limit:** module-level `Map<ip, timestamps[]>`, IP from `x-forwarded-for` (first value) / `x-real-ip`; 3 per 10 min → `429`.
3. **Body:** require `content-type: application/json`, cap the raw body size (~10 KB), `JSON.parse` in try/catch → `400`.
4. **Validate** with `validateContact` → `400`. **Honeypot** filled → return `{ ok: true }` without sending.
5. **Send** with `new Resend(process.env.RESEND_API_KEY).emails.send({ from, to, replyTo, subject: 'Portfolio contact — <name>', text })`.
6. Missing env vars or a Resend error → `500` with a generic message; log only a tag such as `contact:send_failed` (no payload, no key).

## Phase 3: Components
All new section components in `src/components/Contact/` (the empty `src/components/Contact.tsx` is deleted):
1. **`ContactSection.tsx`** (server): `id="contact"`, heading, short pitch, two-column grid, wraps content in `Reveal`.
2. **`ContactLinks.tsx`** (server): cards from `CONTACT` with `react-icons` (`FaGithub`, `FaLinkedin`, `MdEmail`).
3. **`ContactForm.tsx`** (`'use client'`): controlled inputs, client validation with `validateContact`, honeypot visually hidden (`sr-only` + `tabIndex={-1}` + `autoComplete="off"`), `fetch('/api/contact')`, loading state, fires the toast.
4. **`Toast.tsx`** (`'use client'`): presentational, receives `{ type: 'success' | 'error', message }` and `onClose`; timer-based auto-dismiss.
5. **`src/components/DownloadCvButton.tsx`** (shared, server): `<a download>` styled as a secondary button; CV path in one constant.

## Phase 4: Integration
1. `src/app/page.tsx`: add `<ContactSection />` after `<ExperienceEducationSection />`.
2. `Header.tsx`: add `Contact` to `NAV_ITEMS`. The URL hash sync from the previous fix picks it up automatically. Give the section enough height (e.g. `min-h-[60vh]` or bottom padding) so it can enter the observer's active band at the bottom of the page.
3. `terminalCommands.ts`: `contact: makeSectionCommand('contact', …, CONTACT lines)`; add `/contact` to `/help`.
4. `DownloadCvButton` in `Hero.tsx`, `ExperienceEducationSection.tsx` and `ContactSection.tsx`.
5. `.env.example` (committed, no values) listing the four variables so the setup is documented; real values in `.env.local` and Vercel.

## Phase 5: Verification & Docs
1. `bun run lint`, `bun run build`.
2. Manual checks: happy path (email arrives), invalid input, honeypot, `403` via curl with a fake `Origin`, `429` after 3 submissions, dark/light, mobile/desktop, `/contact` in the terminal, URL hash at the bottom.
3. Update `spec/constitution/roadmap.md` (005 → Done), the "Pending" block in `spec/AGENTS.md`, the API tree in `tech-stack.md` (`src/app/api/contact/route.ts`) and the README (env vars).
