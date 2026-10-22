import type { IconType } from 'react-icons';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { CONTACT, getContactHref, type ContactKind } from '../../data/contact';

const ICONS: Record<ContactKind, IconType> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  email: MdEmail,
};

export function ContactLinks() {
  return (
    <ul className="flex flex-col gap-3">
      {CONTACT.map((link) => {
        const Icon = ICONS[link.kind];
        const isExternal = link.kind !== 'email';

        return (
          <li key={link.kind}>
            <a
              href={getContactHref(link)}
              {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-surface p-4 transition hover:border-accent/40"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ink/10 bg-background text-accent">
                <Icon size={18} aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium">{link.label}</span>
                <span className="block truncate text-sm text-muted">{link.value}</span>
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
