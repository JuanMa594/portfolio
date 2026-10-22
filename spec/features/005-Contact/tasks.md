# Tasks List: 005-Contact Implementation

- [ ] **Task 0: Blockers (developer)**
  - [ ] Confirm the LinkedIn URL and email to publish (spec §5.1).
  - [ ] Produce a web-ready CV: English, up to date, no phone numbers, no references; save as `public/cv/JuanMa-CV.pdf` (spec §5.2).
  - [ ] Decide whether to remove `public/cv/JuanMa Hoja de Vida.pdf` from the repo.
  - [ ] Create the Resend API key and put the env vars in `.env.local` (spec §3.6).

- [ ] **Task 1: Data & Shared Logic**
  - [ ] Update `src/data/contact.ts` with the real values, `href` and icon key.
  - [ ] Create `src/lib/contactValidation.ts` (types, limits, `validateContact`).

- [ ] **Task 2: Toast & Download CV**
  - [ ] Build `src/components/Contact/Toast.tsx` (aria-live, auto-dismiss, reduced motion).
  - [ ] Build `src/components/DownloadCvButton.tsx`.

- [ ] **Task 3: API Route**
  - [ ] Get the developer's OK, then `bun add resend`.
  - [ ] Create `src/app/api/contact/route.ts`: origin check, rate limit, body cap, validation, honeypot, Resend send, generic errors.
  - [ ] Add `.env.example` with the four variable names (no values).

- [ ] **Task 4: Contact Section**
  - [ ] Build `ContactLinks.tsx`, `ContactForm.tsx` and `ContactSection.tsx` in `src/components/Contact/`.
  - [ ] Delete the empty `src/components/Contact.tsx`.
  - [ ] Add `<ContactSection />` after `<ExperienceEducationSection />` in `src/app/page.tsx`.

- [ ] **Task 5: Site Integrations**
  - [ ] Add `Contact` to `NAV_ITEMS` in `Header.tsx`; check the hash becomes `#contact` at the bottom of the page.
  - [ ] Add `/contact` (+ `-info`) to `terminalCommands.ts` and to `/help`.
  - [ ] Place `DownloadCvButton` in Hero, Experience & Education and Contact.

- [ ] **Task 6: Validation**
  - [ ] `bun run lint` and `bun run build` pass.
  - [ ] Happy path: the email arrives as plain text with the right `reply_to`; success toast shows.
  - [ ] Invalid input (client and server `400`), foreign origin (`403`), 4th submission (`429`), honeypot (nothing sent).
  - [ ] Dark/light mode and mobile/desktop visual check.

- [ ] **Task 7: Docs**
  - [ ] Move 005 to "Done" in `spec/constitution/roadmap.md`.
  - [ ] Clear the "Pending" block in `spec/AGENTS.md`; update the API path in `spec/constitution/tech-stack.md`.
  - [ ] Document the env vars in `README.md`.
