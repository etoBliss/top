import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_ADDRESS = process.env.RESEND_FROM || 'topcampaign@theoluwadolapopopoola.com';
const SITE_ORIGIN = process.env.SITE_ORIGIN || '';

function sanitizeHtml(html) {
  return String(html).replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
}

function renderHtml(body) {
  const headerPath = path.join(process.cwd(), 'public', 'email_header.html');
  const footerPath = path.join(process.cwd(), 'public', 'email_footer.html');
  let header = '';
  let footer = '';
  try { header = fs.readFileSync(headerPath, 'utf8'); } catch (e) {}
  try { footer = fs.readFileSync(footerPath, 'utf8'); } catch (e) {}
  header = header.replace(/{{SITE_ORIGIN}}/g, SITE_ORIGIN);
  footer = footer.replace(/{{SITE_ORIGIN}}/g, SITE_ORIGIN);
  return `${header}\n<div>${body}</div>\n${footer}`;
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
    const result = await resend.batch.send({
      from: FROM_ADDRESS,
      to: [String(email).trim()],
      subject,
      html,
    });
    return res.status(200).json({ ok: true, result });
  } catch (e) {
    console.error('welcome send error', e);
    return res.status(500).json({ error: e instanceof Error ? e.message : String(e) });
  }
}
