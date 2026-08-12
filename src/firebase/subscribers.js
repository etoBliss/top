/**
 * subscribers.js — Firestore-backed newsletter subscriber API.
 *
 * Collections:
 *   /subscribers/{email}    doc id = lowercased email (acts as natural dedup)
 *      fields: email, year?, joinedAt, source ('hero' | 'footer' | etc.)
 *   /sends/{sendId}         log of every newsletter dispatch
 *      fields: subject, body, count, sentBy, sentAt, status
 */

import {
  doc,
  setDoc,
  getDocs,
  serverTimestamp,
  collection,
  addDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config.js';

export class NotConfiguredError extends Error {
  constructor() {
    super(
      "Newsletter isn't configured yet. Add your Firebase project creds to .env.local and restart Vite.",
    );
    this.name = 'NotConfiguredError';
    this.code = 'not-configured';
  }
}

function normalise(email) {
  return String(email || '').trim().toLowerCase();
}

function ensureConfigured() {
  if (!isFirebaseConfigured()) throw new NotConfiguredError();
}

/**
 * Subscribe an email. Idempotent — repeated submissions just update the
 * `joinedAt` field. Returns { ok, email }.
 */
export async function subscribeEmail(email, year = null, source = 'hero') {
  const key = normalise(email);
  if (!key || !key.includes('@')) {
    throw new Error('Please enter a valid email.');
  }
  ensureConfigured();
  const ref = doc(db, 'subscribers', key);
  const payload = {
    email: key,
    joinedAt: serverTimestamp(),
    source,
  };
  if (year) payload.year = year;
  await setDoc(ref, payload, { merge: true });
  return { ok: true, email: key };
}

export async function getSubscribers() {
  ensureConfigured();
  const snap = await getDocs(query(collection(db, 'subscribers'), orderBy('joinedAt', 'desc')));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getSends() {
  ensureConfigured();
  const snap = await getDocs(query(collection(db, 'sends'), orderBy('sentAt', 'desc')));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * Send a newsletter. The actual mail dispatch is performed by the host page
 * (EmailJS browser SDK or similar). This helper just logs the send to Firestore
 * so admin has an audit trail. Returns the new send's id + the subscriber list
 * snapshot used.
 */
export async function recordSend({ subject, body, count, sentBy }) {
  const ref = await addDoc(collection(db, 'sends'), {
    subject,
    body,
    count,
    sentBy,
    sentAt: serverTimestamp(),
    status: 'sent',
  });
  return ref.id;
}
