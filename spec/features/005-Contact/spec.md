# Specification: 005-Contact Section

## 1. Overview
The `005-Contact` feature adds the last section of the page, **Contact**, so a recruiter or developer can reach JuanMa594 without leaving the site. It combines:
- **Contact links** to GitHub, LinkedIn and email (`mailto:`), sourced from `src/data/contact.ts`.
- **A contact form** (name, email, message) delivered to JuanMa594's inbox through a Next.js Route Handler that sends the email with **Resend**.
- **A reusable "Download CV" button**, shown in the Hero, in Experience & Education and in Contact.

It also wires the section into the rest of the site: a "Contact" item in the Header nav, a `/contact` terminal command and a success/error toast for the form.

This folds in the three "Pending" items listed in `spec/AGENTS.md` (Contact section, CV download, contact data).

## 2. Visual & Architectural Integration
- **Placement:** Last section in `src/app/page.tsx`, after `#exp`.
- **Target Anchor:** `id="contact"` (used by the Header nav, the URL hash sync and the terminal `/contact` command).
- **Color Palette & Styling:**
  - Background: the default page background (`bg-background`), so it alternates with the `#0B0F19` / `#FFF5EB` background of `#exp`.
  - Cards, inputs and buttons reuse the existing theme tokens (`bg-surface`, `border-ink/10`, `text-muted`, `accent`). No new colors; works in dark and light mode.
- **Layout:** two columns from `md` (left: heading, short pitch, contact link cards and the CV button; right: the form). Single column on mobile, links first.
- **Animations:** fade-in on scroll reusing `src/components/Experience/Reveal.tsx`, hover transitions on cards/buttons, honoring `prefers-reduced-motion`.

## 3. Functional Requirements

### 3.1 Contact Links
- One card/link per entry in `CONTACT` (`src/data/contact.ts`): GitHub, LinkedIn, Email. `contact.ts` is the single source of truth; the terminal `/contact` command reads it too.
- Email opens `mailto:`; GitHub and LinkedIn open in a new tab (`target="_blank" rel="noopener noreferrer"`).
- Each link shows its `react-icons` icon (already installed).
- The `TODO` placeholders for LinkedIn and email must be replaced with real values before shipping (see §5).

### 3.2 Contact Form
- Fields: **Name** (required, 2–100 chars), **Email** (required, valid format, ≤ 254 chars), **Message** (required, 10–2000 chars).
- Client-side validation with inline error messages under each field; the same rules are enforced again on the server (the client is never trusted).
- A hidden **honeypot** field: submissions that fill it are silently accepted (return success) but not sent.
- Submit button is disabled and shows a loading state while sending; the form clears on success.
- On success/failure a **toast** is shown (see §3.5). Error messages are generic and never expose tokens, emails, stack traces or Resend error details (constitution "Harsh Limits").

### 3.3 Email Delivery (Route Handler + Resend)
- `POST /api/contact` implemented as a Next.js Route Handler (`src/app/api/contact/route.ts`), running server-side so the API key is never sent to the browser.
- Sends a **plain-text** email (no HTML built from user input → no injection) to `CONTACT_TO_EMAIL`, with the visitor's address as `reply_to` so JuanMa594 can answer directly.
- **Security** (required by `constitution/tech-stack.md`: "No anonymous access to sensitive endpoints — serverless contact function must validate origin/rate-limit"):
  - **Origin check:** reject requests whose `Origin` header is not the site URL (`SITE_URL`) or `http://localhost:3000` in development → `403`.
  - **Rate limit:** max 3 submissions per IP per 10 minutes → `429`. Best-effort in-memory store (resets per serverless instance); acceptable for a portfolio, noted as a known limitation.
  - **Payload validation:** JSON body only, size-capped, same rules as §3.2 → `400` on failure.
  - No `console.log` of the visitor's data or the API key; log only a generic error tag.
- Responses: `{ ok: true }` on success, `{ ok: false, error: '<generic message>' }` otherwise.

### 3.4 Download CV Button
- One component (`DownloadCvButton`) reused in three places: Hero (next to the terminal), Experience & Education (under the heading) and Contact (left column).
- Plain `<a href="/cv/<file>.pdf" download>`; no JavaScript needed.
- **Blocked until the PDF is web-ready** (see §5): the current file is not suitable to publish as-is.

### 3.5 Site Integrations
- **Header:** new nav item `{ name: 'Contact', href: '#contact' }`. Because the section is the last one, it must be able to reach the observer's active band (`-40% / -50%` rootMargin), so the URL hash and the nav highlight switch to `#contact` at the bottom of the page.
- **Terminal:** `/contact` scrolls to `#contact`; `/contact -info` prints the contact links from `CONTACT`. Listed in `/help`.
- **Toast:** small client component, no new library; auto-dismisses after ~4 s, `role="status"` / `aria-live="polite"`, dismissible, reduced-motion aware.

### 3.6 Configuration
Environment variables, set in `.env.local` locally and in the Vercel dashboard in production (`.env*` is already git-ignored):

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key (server-only) |
| `CONTACT_TO_EMAIL` | Inbox that receives the messages |
| `CONTACT_FROM_EMAIL` | Sender address; `onboarding@resend.dev` until a domain is verified in Resend |
| `SITE_URL` | Production origin allowed by the origin check |

None of them use the `NEXT_PUBLIC_` prefix.

## 4. Acceptance Criteria
- [ ] `#contact` section renders after `#exp` in `src/app/page.tsx`, responsive (2 columns from `md`, 1 on mobile), correct in dark and light mode.
- [ ] Contact links come only from `src/data/contact.ts`; no `TODO` values remain.
- [ ] A valid submission arrives in `CONTACT_TO_EMAIL` as plain text with `reply_to` set to the visitor's email, and a success toast is shown.
- [ ] Invalid input shows inline errors and is also rejected by the server with `400`.
- [ ] Requests from a foreign origin get `403`; a 4th submission from the same IP within 10 minutes gets `429`; a filled honeypot sends nothing.
- [ ] No API key, visitor data or stack trace reaches the browser or the production logs.
- [ ] "Download CV" works in Hero, Experience & Education and Contact, and downloads the approved PDF.
- [ ] Header shows "Contact"; scrolling to the bottom highlights it and sets the URL to `/#contact`.
- [ ] `/contact` and `/contact -info` work in the terminal and appear in `/help`.
- [ ] `bun run lint` and `bun run build` pass.

## 5. Open Items (must be resolved before shipping)
1. **Real LinkedIn URL and email** for `contact.ts`. The current CV lists `www.linkedin.com/in/juan-manuel-usuga-galeano-00073437a` and `jmusuga1122@gmail.com`; confirm they are the ones to publish.
2. **CV PDF is not web-ready.** `public/cv/JuanMa Hoja de Vida.pdf`:
   - exposes two personal phone numbers, and the **names and phone numbers of two third-party references**, who have not agreed to be published on a public site;
   - is in Spanish, while site content is English-only (`spec/AGENTS.md`);
   - is outdated: it does not include the Summa SCI apprenticeship shown in `#exp`.
   Needed: an English, up-to-date version without phone numbers or references, saved with a space-free name (e.g. `public/cv/JuanMa-CV.pdf`). The current file is already pushed on `origin/dev`; decide whether to remove it from the repo.
3. **Resend account:** create the API key; optionally verify a domain to send from a custom address.

## 6. Out of Scope
- CAPTCHA (honeypot + rate limit is enough for now).
- A persistent/distributed rate limiter (e.g. Upstash) — would add a dependency and a service.
- Storing messages in a database (mission.md: no own database).
- Auto-reply email to the visitor.
