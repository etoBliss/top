import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase project config is provided via .env.local
// Copy .env.example -> .env.local and fill in your project's web app credentials.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_SENDER_ID,
  appId: import.meta.env.VITE_FB_APP_ID,
};

/**
 * True when every required Firebase env var is present and non-empty.
 * When false, the public site still works - only /admin surfaces a notice.
 */
export function isFirebaseConfigured() {
  return Object.values(firebaseConfig).every((v) => typeof v === 'string' && v.trim() !== '');
}

let app = null;
let auth = null;
let db = null;

if (isFirebaseConfigured()) {
  // Avoid double-init under HMR / Strict Mode.
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} else if (import.meta.env.DEV) {
  // Surface the misconfiguration early so it's obvious in the console.
  // eslint-disable-next-line no-console
  console.warn(
    '[firebase] VITE_FB_* env vars are missing. Public site still works; /admin and newsletter signup will be disabled until .env.local is filled in.',
  );
}

export { app, auth, db };
export default app;
