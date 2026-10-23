# Tasks List: 005-Contact Implementation

- [x] **Task 0: Blockers (developer)**
  - [x] Confirm the LinkedIn URL and email to publish (spec §5.1).
  - [x] Produce a web-ready CV, saved as `public/cv/JuanMa-CV.pdf` (spec §5.2). Published with the WhatsApp number as the only phone.
  - [x] Old Spanish CV removed from the working tree (it stays in `origin/dev` history until rewritten).
  - [x] Create the Resend API key and put the env vars in `.env.local` (spec §3.6).

- [x] **Task 1: Data & Shared Logic**
  - [x] Update `src/data/contact.ts` with the real values.
  - [x] Create `src/lib/contactValidation.ts` (types, limits, `validateContact`).

- [x] **Task 2: Toast & Download CV**
  - [x] Build `src/components/Contact/Toast.tsx` (aria-live, auto-dismiss, reduced motion).
  - [x] Build `src/components/DownloadCvButton.tsx`.

- [x] **Task 3: API Route**
  - [x] Get the developer's OK, then `bun add resend`.
  - [x] Create `src/app/api/contact/route.ts`: origin check, rate limit, body cap, validation, honeypot, Resend send, generic errors.
  - [x] Add `.env.example` with the four variable names (no values).

- [x] **Task 4: Contact Section**
  - [x] Build `ContactLinks.tsx`, `ContactForm.tsx` and `ContactSection.tsx` in `src/components/Contact/`.
  - [x] Delete the empty `src/components/Contact.tsx`.
  - [x] Add `<ContactSection />` after `<ExperienceEducationSection />` in `src/app/page.tsx`.

- [ ] **Task 5: Site Integrations**
  - [x] Add `Contact` to `NAV_ITEMS` in `Header.tsx`.
  - [x] Checked in headless Chrome: at the bottom of the page the hash is `#contact` and "Contact" is highlighted; scrolling up goes through `#exp`, `#projects` (also while on Skills, via `SECTION_ALIASES` in `Header.tsx`), `#about` and the bare URL for Home.
  - [x] Add `/contact` (+ `-info`) to `terminalCommands.ts` and to `/help`.
  - [x] Place `DownloadCvButton` in Hero, Experience & Education and Contact.

- [ ] **Task 6: Validation**
  - [x] `bun run lint` and `bun run build` pass.
  - [x] Happy path: a real submission was delivered to Gmail (confirmed by the developer).
  - [x] Server side via curl: invalid input / bad JSON / oversize / wrong content-type (`400`), foreign or missing origin (`403`), 4th submission (`429`), honeypot (`200`, nothing sent), missing env config (`500`, generic message).
  - [ ] Same checks through the form in the browser (inline errors, toast).
  - [x] Mobile (375 px, emulated): no horizontal overflow in Contact; fixed by `grid-cols-1` + `min-w-0` (without them the page was 564 px wide).
  - [ ] Dark/light mode and desktop visual check.

- [x] **Task 7: Docs**
  - [x] Move 005 to "Done" in `spec/constitution/roadmap.md`.
  - [x] Clear the "Pending" block in `spec/AGENTS.md`; update the API path in `spec/constitution/tech-stack.md`.
  - [x] Document the env vars in `README.md`.
