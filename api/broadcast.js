import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_KEY = process.env.RESEND_ADMIN_KEY || '';
const FROM_ADDRESS = process.env.RESEND_FROM || 'topcampaign@theoluwadolapopopoola.com';
const SITE_ORIGIN = process.env.SITE_ORIGIN || '';

let UNSUBSCRIBE_EMAIL = process.env.RESEND_UNSUBSCRIBE_EMAIL || '';
if (!UNSUBSCRIBE_EMAIL && SITE_ORIGIN) {
  try {
    const u = new URL(SITE_ORIGIN);
    UNSUBSCRIBE_EMAIL = `unsubscribe@${u.hostname}`;
  } catch (e) {
    // ignore
  }
}

function sanitizeHtml(html) {
  // Lightweight sanitizer: strip <script> tags
  return String(html).replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function linkifyAndResolve(body) {
  let processed = String(body || '');
  // If SITE_ORIGIN is configured, rewrite common relative paths to full absolute URLs
  if (SITE_ORIGIN) {
    processed = processed.replace(/\/(preferences|unsubscribe)([^\s\n\r]*)/g, (m) => `${SITE_ORIGIN}${m}`);
    processed = processed.replace(/\/(cadence-logo-primary\.svg)/g, `${SITE_ORIGIN}/$1`);
  }

  // Escape HTML to avoid injection, then convert recognized URLs into anchor tags
  processed = escapeHtml(processed);

  // Linkify absolute http(s) URLs
  processed = processed.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');

  // Linkify SITE_ORIGIN based links (if set)
  if (SITE_ORIGIN) {
    const esc = SITE_ORIGIN.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const hostRe = new RegExp(`${esc}[^\s<]*`, 'g');
    processed = processed.replace(hostRe, (m) => `<a href="${m}" target="_blank" rel="noopener noreferrer">${m}</a>`);
  }

  // Preserve line breaks
  processed = processed.replace(/\r?\n/g, '<br/>');
  return processed;
}

function renderHtml(body) {
  const tplPath = path.join(process.cwd(), 'public', 'email_template.html');
  let tpl = '';
  try { tpl = fs.readFileSync(tplPath, 'utf8'); } catch (e) {}
  tpl = tpl.replace(/{{SITE_ORIGIN}}/g, SITE_ORIGIN);
  const processed = linkifyAndResolve(body);
  // Inject processed body HTML into the template placeholder
  tpl = tpl.replace(/{{BODY}}/g, processed);
  return tpl;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'RESEND_API_KEY is not configured' });
  }

  if (!ADMIN_KEY) {
    return res.status(500).json({ error: 'RESEND_ADMIN_KEY is not configured' });
  }

  const clientKey = req.headers['x-admin-key'] || '';
  if (clientKey !== ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { subject, body, emails } = req.body || {};
  if (!subject || !body || !Array.isArray(emails) || emails.length === 0) {
    return res.status(400).json({ error: 'subject, body, and emails are required' });
  }

  const recipients = emails.map((email) => String(email || '').trim()).filter(Boolean);
  if (recipients.length === 0) {
    return res.status(400).json({ error: 'emails list required' });
  }

  try {
    const html = renderHtml(sanitizeHtml(body));

    const text = String(body).trim();
    let result;
    const headers = UNSUBSCRIBE_EMAIL
      ? { 'List-Unsubscribe': `<mailto:${UNSUBSCRIBE_EMAIL}>, <${SITE_ORIGIN}/unsubscribe>` }
      : {};

    if (resend?.emails && typeof resend.emails.send === 'function') {
      result = await resend.emails.send({
        from: FROM_ADDRESS,
        to: recipients,
        subject: String(subject),
        text,
        html,
        headers,
      });
    } else if (typeof resend.send === 'function') {
      result = await resend.send({
        from: FROM_ADDRESS,
        to: recipients,
        subject: String(subject),
        text,
        html,
        headers,
      });
    } else {
      console.error('Unsupported Resend SDK instance', Object.keys(resend || {}));
      throw new Error('Unsupported Resend SDK. Please upgrade the Resend package or update the function implementation.');
    }

    return res.status(200).json({ ok: true, result });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
