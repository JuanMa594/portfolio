import { DownloadCvButton } from '../DownloadCvButton';
import { Reveal } from '../Experience/Reveal';
import { ContactForm } from './ContactForm';
import { ContactLinks } from './ContactLinks';

export function ContactSection() {
  return (
    // min-h keeps the last section tall enough to reach the Header's active-section band at the bottom of the page.
    <section id="contact" className="relative min-h-[70vh] px-5 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-semibold sm:text-4xl">Contact</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">
          Got a project, an opportunity or just a question? Send me a message or reach out directly.
        </p>

        {/* grid-cols-1 is minmax(0, 1fr): without it the column grows to the longest unbreakable text (the LinkedIn URL) and overflows phones. */}
        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
          <Reveal className="flex min-w-0 flex-col items-start gap-6">
            <div className="w-full">
              <ContactLinks />
            </div>
            <DownloadCvButton />
          </Reveal>

          <Reveal delay={100} className="min-w-0">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
