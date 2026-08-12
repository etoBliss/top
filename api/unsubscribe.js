import { URL } from 'url';

const FB_CONFIG = {
  apiKey: process.env.VITE_FB_API_KEY || '',
  authDomain: process.env.VITE_FB_AUTH_DOMAIN || '',
  projectId: process.env.VITE_FB_PROJECT_ID || '',
  storageBucket: process.env.VITE_FB_STORAGE_BUCKET || '',
  messagingSenderId: process.env.VITE_FB_SENDER_ID || '',
  appId: process.env.VITE_FB_APP_ID || '',
};

const SITE_ORIGIN = process.env.SITE_ORIGIN || '';

function renderPage() {
  const escapedSite = SITE_ORIGIN || '';
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Unsubscribe — TOP Campaign</title>
    <style>
      body{font-family:Inter,system-ui,Arial,Helvetica,sans-serif;background:#FAF8F4;color:#0A0A0A;margin:0}
      .wrap{max-width:680px;margin:36px auto;padding:20px}
      .card{background:#fff;padding:22px;border-radius:10px;box-shadow:0 6px 20px rgba(10,10,10,0.06)}
      input{width:100%;padding:10px;border:1px solid #e6e6e6;border-radius:6px}
      button{background:#C9A227;border:none;padding:10px 14px;border-radius:6px;color:#081014;font-weight:700}
    </style>
  </head>
  <body>
    <div class="wrap">
      <div style="text-align:center;margin-bottom:18px;">
        <img src="${escapedSite}/logo.jpeg" alt="TOP" width="96" style="border-radius:8px;" />
      </div>
      <div class="card">
        <h2>Unsubscribe from TOP Campaign updates</h2>
        <p>Enter the email you want to unsubscribe and we'll remove it from our list.</p>
        <form id="form">
          <label style="display:block;margin-bottom:8px;font-size:13px;color:#555">Email address</label>
          <input id="email" type="email" required placeholder="you@example.com" />
          <div style="margin-top:12px;display:flex;gap:10px;align-items:center">
            <button id="submit">Unsubscribe</button>
            <span id="status" style="color:#666;font-size:13px"></span>
          </div>
        </form>
        <p style="margin-top:12px;color:#777;font-size:13px">Or reply to your email with the word <strong>unsubscribe</strong> and we'll remove you manually.</p>
      </div>
    </div>

    <script type="module">
      import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js';
      import { getFirestore, doc, setDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';

      const firebaseConfig = ${JSON.stringify(FB_CONFIG)};
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);

      const form = document.getElementById('form');
      const emailInput = document.getElementById('email');
      const status = document.getElementById('status');

      async function unsubscribe(email) {
        const key = String(email).trim().toLowerCase();
        if (!key || !key.includes('@')) throw new Error('Invalid email');
        const ref = doc(db, 'subscribers', key);
        await setDoc(ref, { email: key, unsubscribed: true, unsubscribedAt: serverTimestamp(), source: 'self-unsubscribe' }, { merge: true });
      }

      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        status.textContent = '';
        try {
          const email = emailInput.value;
          status.textContent = 'Working…';
          await unsubscribe(email);
          // redirect to confirmation page on success (include email for personalization)
          const dest = `${escapedSite}/unsubscribe/confirmed?email=${encodeURIComponent(email)}`;
          window.location.href = dest;
        } catch (err) {
          console.error(err);
          status.textContent = err?.message || 'Unsubscribe failed.';
        }
      });
    </script>
  </body>
</html>`;
}

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(renderPage());
    return;
  }
  res.setHeader('Allow', 'GET');
  res.status(405).json({ error: 'Method not allowed' });
}
