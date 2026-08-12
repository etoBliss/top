/**
 * emailjsService.js — thin wrapper around @emailjs/browser so the Admin page
 * stays declarative. The actual send happens from the browser because the
 * EmailJS service is configured with the campaign's public key + service id.
 *
 * Required env vars (set in .env.local or .env):
 *   VITE_EMAILJS_PUBLIC_KEY
 *   VITE_EMAILJS_SERVICE_ID
 *   VITE_EMAILJS_TEMPLATE_ID
 */

import emailjs from '@emailjs/browser';

const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

export function isConfigured() {
  return Boolean(PUBLIC_KEY && SERVICE_ID && TEMPLATE_ID);
}

/**
 * Send a single email to a single subscriber. The EmailJS template is expected
 * to expose {{to_email}}, {{to_name}}, {{subject}}, {{body}} variables.
 */
export async function sendOne({ toEmail, toName = '', subject, body }) {
  if (!isConfigured()) {
    throw new Error('EmailJS is not configured. Set VITE_EMAILJS_* in .env.local');
  }
  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      to_email: toEmail,
      to_name: toName,
      subject,
      body,
    },
    { publicKey: PUBLIC_KEY },
  );
}

/**
 * Fan-out to a list of subscribers with a small concurrency cap so we don't
 * blast EmailJS in parallel.
 */
export async function sendToAll(subscribers, { subject, body }, { concurrency = 4, onProgress } = {}) {
  let cursor = 0;
  let success = 0;
  let failed = 0;

  async function worker() {
    while (cursor < subscribers.length) {
      const i = cursor++;
      const sub = subscribers[i];
      try {
        await sendOne({ toEmail: sub.email || sub.id, toName: sub.year || '', subject, body });
        success++;
      } catch (e) {
        failed++;
        // eslint-disable-next-line no-console
        console.error('send failed for', sub.email || sub.id, e);
      }
      if (onProgress) onProgress({ i, total: subscribers.length, success, failed });
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, subscribers.length) }, () => worker());
  await Promise.all(workers);
  return { success, failed, total: subscribers.length };
}
