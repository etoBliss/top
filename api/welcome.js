import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);
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
  if (SITE_ORIGIN) {
    processed = processed.replace(/\/(preferences|unsubscribe)([^\s\n\r]*)/g, (m) => `${SITE_ORIGIN}${m}`);
    processed = processed.replace(/\/(cadence-logo-primary\.svg)/g, `${SITE_ORIGIN}/$1`);
  }
  processed = escapeHtml(processed);
  processed = processed.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
  if (SITE_ORIGIN) {
    const esc = SITE_ORIGIN.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const hostRe = new RegExp(`${esc}[^\s<]*`, 'g');
    processed = processed.replace(hostRe, (m) => `<a href="${m}" target="_blank" rel="noopener noreferrer">${m}</a>`);
  }
  processed = processed.replace(/\r?\n/g, '<br/>');
  return processed;
}

function renderHtml(body) {
  const tplPath = path.join(process.cwd(), 'public', 'email_template.html');
  let tpl = '';
  try { tpl = fs.readFileSync(tplPath, 'utf8'); } catch (e) {}
  tpl = tpl.replace(/{{SITE_ORIGIN}}/g, SITE_ORIGIN);
  const processed = linkifyAndResolve(body);
  tpl = tpl.replace(/{{BODY}}/g, processed);
  return tpl;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // DEBUG: log incoming headers/body to Vercel logs for troubleshooting
  try {
    const safeHeaders = { ...req.headers };
    if (safeHeaders.authorization) safeHeaders.authorization = '[REDACTED]';
    console.error('incoming welcome request', { headers: safeHeaders, body: req.body });
  } catch (logErr) {
    console.error('failed to log incoming request', logErr);
  }

  function extractEmail(req) {
    // 1) JSON body
    if (req.body && typeof req.body === 'object' && req.body.email) return String(req.body.email).trim();
    // 2) body as string (try parse)
    if (req.body && typeof req.body === 'string') {
      try {
        const parsed = JSON.parse(req.body);
        if (parsed.email) return String(parsed.email).trim();
      } catch (e) {
        // not JSON
        const m = req.body.match(/email=([^&]+)/);
        if (m) return decodeURIComponent(m[1]);
      }
    }
    // 3) query string
    if (req.query && req.query.email) return String(req.query.email).trim();
    // 4) header
    if (req.headers && (req.headers['x-email'] || req.headers['email'])) return String(req.headers['x-email'] || req.headers['email']).trim();
    return null;
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY missing in environment');
    return res.status(500).json({ error: 'RESEND_API_KEY is not configured' });
  }

  const email = extractEmail(req);
  const dept = (req.body && req.body.dept) || req.query?.dept || null;
  const source = (req.body && req.body.source) || req.query?.source || 'unknown';
  if (!email || !email.includes('@')) return res.status(400).json({ error: 'email required' });

  const subject = 'Welcome — you are subscribed to TOP updates';
  const body = `
    <p>Hi,</p>
    <p>Thanks for subscribing to TOP campaign updates. We'll send field dispatches, events, and ways to get involved.</p>
    <p>— TOP Campaign</p>
  `;

  try {
    const html = renderHtml(sanitizeHtml(body));
    const text = String(body).trim();
    let result;
    const headers = UNSUBSCRIBE_EMAIL
      ? { 'List-Unsubscribe': `<mailto:${UNSUBSCRIBE_EMAIL}>, <${SITE_ORIGIN}/unsubscribe>` }
      : {};

    if (resend?.batch && typeof resend.batch.send === 'function') {
      result = await resend.batch.send({ from: FROM_ADDRESS, to: [String(email).trim()], subject, text, html, headers });
    } else if (resend?.emails && typeof resend.emails.send === 'function') {
      result = await resend.emails.send({ from: FROM_ADDRESS, to: [String(email).trim()], subject, text, html, headers });
    } else if (typeof resend.send === 'function') {
      result = await resend.send({ from: FROM_ADDRESS, to: [String(email).trim()], subject, text, html, headers });
    } else if (resend?.messages && typeof resend.messages.send === 'function') {
      result = await resend.messages.send({ from: FROM_ADDRESS, to: [String(email).trim()], subject, text, html, headers });
    } else {
      console.error('Unsupported Resend SDK instance', Object.keys(resend || {}));
      throw new Error('Unsupported Resend SDK');
    }
    return res.status(200).json({ ok: true, result });
  } catch (e) {
    console.error('welcome send error', e);
    return res.status(500).json({ error: e instanceof Error ? e.message : String(e) });
  }
}
