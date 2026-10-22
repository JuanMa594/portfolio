export const CONTACT_LIMITS = {
  nameMin: 2,
  nameMax: 100,
  emailMax: 254,
  messageMin: 10,
  messageMax: 2000,
} as const;

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  /** Honeypot: real visitors never see it, so it must stay empty. */
  website: string;
}

export type ContactField = 'name' | 'email' | 'message';

export type ContactValidation =
  | { ok: true; data: ContactPayload }
  | { ok: false; errors: Partial<Record<ContactField, string>> };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asTrimmedString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

/** Shared by the form (instant feedback) and the API route (the client is never trusted). */
export function validateContact(input: unknown): ContactValidation {
  const raw = typeof input === 'object' && input !== null ? (input as Record<string, unknown>) : {};

  const data: ContactPayload = {
    name: asTrimmedString(raw.name),
    email: asTrimmedString(raw.email),
    message: asTrimmedString(raw.message),
    website: asTrimmedString(raw.website),
  };

  const errors: Partial<Record<ContactField, string>> = {};

  if (data.name.length < CONTACT_LIMITS.nameMin || data.name.length > CONTACT_LIMITS.nameMax) {
    errors.name = `Name must be ${CONTACT_LIMITS.nameMin}-${CONTACT_LIMITS.nameMax} characters.`;
  }

  if (!EMAIL_PATTERN.test(data.email) || data.email.length > CONTACT_LIMITS.emailMax) {
    errors.email = 'Enter a valid email address.';
  }

  if (data.message.length < CONTACT_LIMITS.messageMin || data.message.length > CONTACT_LIMITS.messageMax) {
    errors.message = `Message must be ${CONTACT_LIMITS.messageMin}-${CONTACT_LIMITS.messageMax} characters.`;
  }

  return Object.keys(errors).length > 0 ? { ok: false, errors } : { ok: true, data };
}
