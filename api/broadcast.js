import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_KEY = process.env.RESEND_ADMIN_KEY || '';
const FROM_ADDRESS = process.env.RESEND_FROM || 'topcampaign@theoluwadolapopopoola.com';
const SITE_ORIGIN = process.env.SITE_ORIGIN || '';

function sanitizeHtml(html) {
  // Lightweight sanitizer: strip <script> tags
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

    let result;
    if (resend?.emails && typeof resend.emails.send === 'function') {
      result = await resend.emails.send({
        from: FROM_ADDRESS,
        to: recipients,
        subject: String(subject),
        html,
      });
    } else if (typeof resend.send === 'function') {
      result = await resend.send({
        from: FROM_ADDRESS,
        to: recipients,
        subject: String(subject),
        html,
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
