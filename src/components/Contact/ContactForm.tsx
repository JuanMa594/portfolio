'use client';

import { useCallback, useState, type ChangeEvent, type FormEvent } from 'react';
import {
  CONTACT_LIMITS,
  validateContact,
  type ContactField,
  type ContactPayload,
} from '../../lib/contactValidation';
import { Toast, type ToastMessage } from './Toast';

const EMPTY_FORM: ContactPayload = { name: '', email: '', message: '', website: '' };
const GENERIC_ERROR = "Couldn't send your message. Please try again later.";

type FieldErrors = Partial<Record<ContactField, string>>;

const inputClasses =
  'w-full rounded-xl border border-ink/10 bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted/70 transition focus:border-accent/60 focus:outline-none aria-[invalid=true]:border-red-500/60';

export function ContactForm() {
  const [form, setForm] = useState<ContactPayload>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSending, setIsSending] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const closeToast = useCallback(() => setToast(null), []);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (name in errors) setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSending) return;

    const result = validateContact(form);
    if (!result.ok) {
      setErrors(result.errors);
      return;
    }

    setIsSending(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      });
      const body = (await response.json().catch(() => null)) as { ok: boolean; error?: string } | null;

      if (response.ok && body?.ok) {
        setForm(EMPTY_FORM);
        setErrors({});
        setToast({ type: 'success', message: "Message sent! I'll get back to you soon." });
      } else {
        setToast({ type: 'error', message: body?.error ?? GENERIC_ERROR });
      }
    } catch {
      setToast({ type: 'error', message: GENERIC_ERROR });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-5 rounded-2xl border border-ink/10 bg-surface/50 p-6 sm:p-8"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={CONTACT_LIMITS.nameMax}
            value={form.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            className={inputClasses}
          />
          {errors.name && (
            <p id="contact-name-error" className="text-xs text-red-500">
              {errors.name}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="contact-email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={CONTACT_LIMITS.emailMax}
            value={form.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            className={inputClasses}
          />
          {errors.email && (
            <p id="contact-email-error" className="text-xs text-red-500">
              {errors.email}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="contact-message" className="text-sm font-medium">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            maxLength={CONTACT_LIMITS.messageMax}
            value={form.message}
            onChange={handleChange}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
            className={`${inputClasses} resize-y`}
          />
          <div className="flex justify-between gap-4 text-xs">
            <p id="contact-message-error" className="text-red-500">
              {errors.message}
            </p>
            <span className="ml-auto text-muted">
              {form.message.length}/{CONTACT_LIMITS.messageMax}
            </span>
          </div>
        </div>

        {/* Honeypot: hidden from people and assistive tech, bots tend to fill it. */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          disabled={isSending}
          className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
          {isSending ? 'Sending…' : 'Send message'}
        </button>
      </form>

      {toast && <Toast type={toast.type} message={toast.message} onClose={closeToast} />}
    </>
  );
}
