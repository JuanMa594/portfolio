import { Resend } from 'resend';
import { validateContact } from '../../../lib/contactValidation';
import { isRateLimited } from '../../../lib/rateLimit';

const MAX_BODY_BYTES = 10_000;
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

function reply(status: number, body: { ok: true } | { ok: false; error: string }) {
  return Response.json(body, { status });
}

function allowedOrigins(): string[] {
  const origins: string[] = [];
  const siteUrl = process.env.SITE_URL?.trim().replace(/\/+$/, '');
  if (siteUrl) origins.push(siteUrl);
  if (process.env.NODE_ENV !== 'production') origins.push('http://localhost:3000');
  return origins;
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return forwarded || request.headers.get('x-real-ip') || 'unknown';
}

// Headers must never carry line breaks coming from user input.
function toSingleLine(value: string): string {
  return value.replace(/[\r\n]+/g, ' ');
}

export async function POST(request: Request) {
  // Fails closed: with no SITE_URL in production nothing is allowed.
  const origin = request.headers.get('origin');
  if (!origin || !allowedOrigins().includes(origin)) {
    return reply(403, { ok: false, error: 'Forbidden.' });
  }

  if (isRateLimited(getClientIp(request), RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)) {
    return reply(429, { ok: false, error: 'Too many messages. Please try again in a few minutes.' });
  }

  if (!request.headers.get('content-type')?.includes('application/json')) {
    return reply(400, { ok: false, error: 'Invalid request.' });
  }

  const declaredLength = Number(request.headers.get('content-length') ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return reply(400, { ok: false, error: 'Invalid request.' });
  }

  const rawBody = await request.text();
  if (rawBody.length > MAX_BODY_BYTES) {
    return reply(400, { ok: false, error: 'Invalid request.' });
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawBody);
  } catch {
    return reply(400, { ok: false, error: 'Invalid request.' });
  }

  const result = validateContact(parsed);
  if (!result.ok) {
    return reply(400, { ok: false, error: 'Please check the highlighted fields.' });
  }

  // Bots fill the hidden field: pretend it worked so they don't adapt, but send nothing.
  if (result.data.website) {
    return reply(200, { ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error('contact:missing_config');
    return reply(500, { ok: false, error: "Couldn't send your message. Please try again later." });
  }

  try {
    const { name, email, message } = result.data;
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to,
      replyTo: email,
      subject: `Portfolio contact — ${toSingleLine(name)}`,
      text: `From: ${toSingleLine(name)} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error('contact:send_failed');
      return reply(500, { ok: false, error: "Couldn't send your message. Please try again later." });
    }
  } catch {
    console.error('contact:send_failed');
    return reply(500, { ok: false, error: "Couldn't send your message. Please try again later." });
  }

  return reply(200, { ok: true });
}
