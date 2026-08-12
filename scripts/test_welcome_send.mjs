import fs from 'fs';
import path from 'path';
import { Resend } from 'resend';

function readEnv(envPath) {
  const txt = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
  const lines = txt.split(/\r?\n/);
  const env = {};
  for (const l of lines) {
    const m = l.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) env[m[1]] = m[2];
  }
  return env;
}

function sanitizeHtml(html) {
  return String(html).replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
}

function renderHtml(body, siteOrigin) {
  const headerPath = path.join(process.cwd(), 'public', 'email_header.html');
  const footerPath = path.join(process.cwd(), 'public', 'email_footer.html');
  let header = '';
  let footer = '';
  try { header = fs.readFileSync(headerPath, 'utf8'); } catch (e) {}
  try { footer = fs.readFileSync(footerPath, 'utf8'); } catch (e) {}
  header = header.replace(/{{SITE_ORIGIN}}/g, siteOrigin || '');
  footer = footer.replace(/{{SITE_ORIGIN}}/g, siteOrigin || '');
  return `${header}\n<div>${body}</div>\n${footer}`;
}

async function main() {
  const args = process.argv.slice(2);
  if (!args[0]) {
    console.error('Usage: node scripts/test_welcome_send.mjs recipient@example.com');
    process.exit(1);
  }
  const to = args[0];

  const env = readEnv(path.join(process.cwd(), '.env.local'));
  const key = env.RESEND_API_KEY || process.env.RESEND_API_KEY;
  if (!key) {
    console.error('RESEND_API_KEY not found in .env.local or environment');
    process.exit(1);
  }

  const resend = new Resend(key);
  const from = env.RESEND_FROM || process.env.RESEND_FROM || 'topcampaign@theoluwadolapopopoola.com';
  const siteOrigin = env.SITE_ORIGIN || process.env.SITE_ORIGIN || '';

  const subject = 'Welcome — TOP campaign updates';
  const body = `
    <p>Hi,</p>
    <p>Thanks for subscribing to TOP campaign updates. We'll send field dispatches, events, and ways to get involved.</p>
    <p>— TOP Campaign</p>
  `;

  try {
    const html = renderHtml(sanitizeHtml(body), siteOrigin);
    console.log('Sending test welcome to', to);
    let result;
    // Support multiple versions of the Resend SDK API
    if (resend?.batch && typeof resend.batch.send === 'function') {
      result = await resend.batch.send({ from, to: [to], subject, html });
    } else if (resend?.emails && typeof resend.emails.send === 'function') {
      result = await resend.emails.send({ from, to: [to], subject, html });
    } else if (typeof resend.send === 'function') {
      result = await resend.send({ from, to: [to], subject, html });
    } else if (resend?.messages && typeof resend.messages.send === 'function') {
      result = await resend.messages.send({ from, to: [to], subject, html });
    } else {
      console.error('Unsupported Resend SDK instance. Available keys:', Object.keys(resend));
      process.exit(3);
    }
    console.log('Send result:', result);
    process.exit(0);
  } catch (e) {
    console.error('Send failed:', e instanceof Error ? e.message : String(e));
    process.exit(2);
  }
}

main();
