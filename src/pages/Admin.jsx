import { useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../firebase/config.js';
import { getSubscribers, getSends, recordSend } from '../firebase/subscribers.js';
import { LogOut, Mail, Users, Send, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function Admin() {
  if (!isFirebaseConfigured()) {
    return <NotConfiguredNotice />;
  }
  return <AdminGate />;
}

function AdminGate() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setAuthLoading(false);
      return () => {};
    }
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return unsub;
  }, []);

  if (authLoading) {
    return (
      <Shell>
        <p className="text-ivory-muted">Loading…</p>
      </Shell>
    );
  }
  if (!user) return <Login />;
  return <Dashboard user={user} onSignOut={() => signOut(auth)} />;
}

/* ───────────────────────────── Not configured notice ───────────────────────────── */

function NotConfiguredNotice() {
  return (
    <Shell>
      <span className="eyebrow text-gold">Admin</span>
      <h1 className="display-italic mt-6 text-[40px] text-ivory md:text-[60px]">
        Not configured yet.
      </h1>
      <p className="mt-3 max-w-md text-[14px] text-ivory-muted">
        The admin dashboard needs your Firebase project credentials before it can load.
      </p>

      <div className="mt-10 border-l-2 border-gold/60 bg-gold/10 p-5">
        <p className="flex items-start gap-3 text-[13px] leading-relaxed text-ivory">
          <AlertTriangle size={16} className="mt-0.5 shrink-0 text-gold" />
          <span>
            Add the file{' '}
            <code className="text-gold">.env.local</code> to the project root, paste
            the six{' '}
            <code className="text-gold">VITE_FB_*</code> values from{' '}
            <em>Firebase Console &rarr; Project settings &rarr; Your apps</em>, and
            restart <code className="text-gold">npm run dev</code>. The .env.example
            file shows the full list of keys you need.
          </span>
        </p>
      </div>

      <p className="mt-12 text-[11px] uppercase tracking-[0.22em] text-ivory-faint">
        <a href="/" className="hover:text-gold">← back to campaign</a>
      </p>
    </Shell>
  );
}

/* ───────────────────────────── Shell ───────────────────────────── */

function Shell({ children }) {
  return (
    <main className="surface-ink min-h-screen px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-5xl">{children}</div>
    </main>
  );
}

/* ───────────────────────────── Login ───────────────────────────── */

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr('');
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (e2) {
      const code = e2?.code ? `${e2.code}` : '';
      const msg = e2?.message ? `${e2.message}` : 'Login failed.';
      setErr(code ? `${code}: ${msg}` : msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Shell>
      <span className="eyebrow text-gold">Admin</span>
      <h1 className="display-italic mt-6 text-[40px] text-ivory md:text-[60px]">
        Sign in.
      </h1>
      <p className="mt-3 max-w-md text-[14px] text-ivory-muted">
        Restricted to campaign staff. Wrong tab?{' '}
        <a href="/" className="underline underline-offset-4 hover:text-gold">
          Back to the site
        </a>
        .
      </p>

      <form onSubmit={onSubmit} className="mt-12 max-w-sm space-y-6">
        <label className="block">
          <span className="font-mono-set text-[10px] uppercase tracking-[0.22em] text-gold">
            Email
          </span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full border-b border-line bg-transparent px-1 py-2 text-[15px] text-ivory outline-none placeholder:text-ivory-faint focus:border-ivory motion-safe"
          />
        </label>
        <label className="block">
          <span className="font-mono-set text-[10px] uppercase tracking-[0.22em] text-gold">
            Password
          </span>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full border-b border-line bg-transparent px-1 py-2 text-[15px] text-ivory outline-none placeholder:text-ivory-faint focus:border-ivory motion-safe"
          />
        </label>
        <button
          type="submit"
          disabled={busy}
          className="font-mono-set text-[12px] font-semibold uppercase tracking-[0.22em] text-gold motion-safe hover:text-ivory disabled:opacity-50"
        >
          {busy ? '…' : 'Sign in →'}
        </button>
        {err && <p className="text-[12px] text-crimson-end">{err}</p>}
      </form>
    </Shell>
  );
}

/* ───────────────────────────── Dashboard ───────────────────────────── */

function Dashboard({ user, onSignOut }) {
  const [subscribers, setSubscribers] = useState([]);
  const [sends, setSends] = useState([]);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);
    try {
      const [s, h] = await Promise.all([getSubscribers(), getSends()]);
      setSubscribers(s);
      setSends(h);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <Shell>
      <header className="flex items-start justify-between gap-6">
        <div>
          <span className="eyebrow text-gold">Admin</span>
          <h1 className="display-italic mt-4 text-[40px] text-ivory md:text-[52px]">
            Dashboard.
          </h1>
          <p className="mt-2 flex items-center gap-2 text-[12px] text-ivory-muted">
            <ShieldCheck size={14} className="text-gold" />
            Signed in as <span className="text-ivory">{user.email}</span>
          </p>
        </div>
        <button
          type="button"
          onClick={onSignOut}
          className="flex items-center gap-2 font-mono-set text-[11px] uppercase tracking-[0.22em] text-ivory-muted hover:text-ivory motion-safe"
        >
          <LogOut size={14} />
          Sign out
        </button>
      </header>

      <section className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <SubscribersPanel subscribers={subscribers} loading={loading} />
        <ComposePanel subscribers={subscribers} onSent={refresh} />
      </section>

      <section className="mt-16">
        <span className="eyebrow text-gold">Send history</span>
        <ul className="mt-6 divide-y divide-line">
          {sends.length === 0 && !loading && (
            <li className="py-6 text-[13px] text-ivory-muted">
              No campaigns sent yet — write one above and ship it.
            </li>
          )}
          {sends.map((s) => (
            <li key={s.id} className="grid gap-2 py-5 md:grid-cols-[1fr_auto]">
              <div>
                <p className="font-mono-set text-[13px] uppercase tracking-[0.16em] text-ivory">
                  {s.subject}
                </p>
                <p className="mt-1 text-[13px] text-ivory-muted">
                  {s.body?.slice(0, 120)}
                  {s.body && s.body.length > 120 ? '…' : ''}
                </p>
              </div>
              <div className="font-mono-set text-[10px] uppercase tracking-[0.22em] text-ivory-faint md:text-right">
                <p>to {s.count || 0} subscribers</p>
                <p className="mt-1">
                  {s.sentAt?.toDate ? s.sentAt.toDate().toLocaleString() : ''}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <footer className="mt-20 border-t border-line pt-6 text-[11px] uppercase tracking-[0.22em] text-ivory-faint">
        <a href="/" className="hover:text-gold">← back to campaign</a>
      </footer>
    </Shell>
  );
}

/* ───────────────────────────── Subscribers panel ───────────────────────────── */

function SubscribersPanel({ subscribers, loading }) {
  const [q, setQ] = useState('');
  const filtered = q
    ? subscribers.filter((s) =>
        (s.email || s.id || '').toLowerCase().includes(q.toLowerCase()),
      )
    : subscribers;

  function exportCSV() {
    const rows = [
      ['email', 'joinedAt', 'source', 'year'],
      ...subscribers.map((s) => [
        s.email || s.id || '',
        s.joinedAt?.toDate ? s.joinedAt.toDate().toISOString() : '',
        s.source || '',
        s.year || '',
      ]),
    ];
    const csv = rows
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `top-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="border border-line p-6 md:p-8">
      <div className="flex items-center justify-between gap-4">
        <span className="flex items-center gap-2 eyebrow text-gold">
          <Users size={12} className="text-gold" />
          Subscribers · {subscribers.length}
        </span>
        <button
          type="button"
          onClick={exportCSV}
          className="font-mono-set text-[11px] uppercase tracking-[0.22em] text-ivory-muted hover:text-ivory motion-safe"
        >
          Export CSV
        </button>
      </div>

      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Filter by email…"
        aria-label="Filter subscribers"
        className="mt-6 w-full border-b border-line bg-transparent px-1 py-2 text-[14px] text-ivory outline-none placeholder:text-ivory-faint focus:border-ivory motion-safe"
      />

      <ul className="mt-6 max-h-[420px] divide-y divide-line overflow-auto">
        {loading && <li className="py-6 text-[13px] text-ivory-muted">Loading…</li>}
        {!loading && filtered.length === 0 && (
          <li className="py-6 text-[13px] text-ivory-muted">
            No subscribers yet — share the campaign page to start collecting.
          </li>
        )}
        {filtered.map((s, i) => (
          <li key={s.id || i} className="flex items-baseline justify-between gap-3 py-3">
            <span className="truncate text-[14px] text-ivory">
              {s.email || s.id}
            </span>
            <span className="shrink-0 font-mono-set text-[10px] uppercase tracking-[0.22em] text-ivory-faint">
              {s.source || 'hero'}
              {s.year ? ` · ${s.year}` : ''}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const TEMPLATES = [
  {
    id: 'launchCountdown',
    label: 'Launch countdown',
    subject: 'Countdown to TOP Campaign launch - 72 hours to go',
    body: `Hello,

  The countdown is on. In just three days the campaign goes live, and we need every supporter ready.

  Please keep an eye on your inbox for the next dispatch - new actions, event updates, and ways to help turn momentum into impact.

  - TOP Campaign`,
  },
  {
    id: 'finalReminder',
    label: 'Final reminder',
    subject: 'Final reminder: countdown to campaign launch',
    body: `Hi there,

  This is your last reminder before launch day. The countdown is ticking, and your support matters now more than ever.

  Share the campaign, invite friends, and stand by for the first major update.

  - TOP Campaign`,
  },
  {
    id: 'countdownPreview',
    label: 'Countdown preview',
    subject: 'Preview inside: campaign countdown updates',
    body: `Hello,

  A fresh dispatch is ready with the countdown energy: the campaign is closing in fast.

  Expect a short series of high-impact updates, invitations, and milestone announcements before launch.

  - TOP Campaign`,
  },
  {
    id: 'launchReadiness',
    label: 'Launch readiness',
    subject: 'Launch readiness: one final countdown update',
    body: `Hello,

  The launch window is approaching, and this final countdown update is built to keep the team ready.

  If you want to join the core actions, now is the time to check your inbox, share the campaign, and stay tuned for launch day instructions.

  - TOP Campaign`,
  },
];

/* ───────────────────────────── Compose / Send ───────────────────────────── */

function ComposePanel({ subscribers, onSent }) {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0].id);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(null);
  const [feedback, setFeedback] = useState('');
  const adminKey = import.meta.env.VITE_RESEND_BROADCAST_KEY;
  const configured = Boolean(adminKey);

  const canSend = subscribers.length > 0 && subject.trim() && body.trim();

  async function send() {
    if (!canSend) return;
    if (!configured) {
      setFeedback('No mail transport configured. Set VITE_RESEND_BROADCAST_KEY in .env.local.');
      return;
    }
    setBusy(true);
    setFeedback('');
    setProgress({ sent: 0, failed: 0, total: subscribers.length });

    try {
      const headers = {
        'Content-Type': 'application/json',
        'x-admin-key': adminKey,
      };
      const r = await fetch('/api/broadcast', {
        method: 'POST',
        headers,
        body: JSON.stringify({ subject: subject.trim(), body: body.trim(), emails: subscribers.map((s) => s.email || s.id) }),
      });
      if (!r.ok) throw new Error(await r.text());
      const res = await r.json();
      await recordSend({
        subject: subject.trim(),
        body: body.trim(),
        count: res.sent || 0,
        sentBy: 'admin',
      });
      setSubject('');
      setBody('');
      setFeedback(
        `Sent ${res.sent || res.success || 0} of ${res.total || res.total || 0} emails${
          (res.failed || 0) ? ` · ${res.failed || 0} failed` : ''
        }.`,
      );
      onSent?.();
    } catch (e) {
      setFeedback(e?.message || 'Send failed.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="border border-line p-6 md:p-8">
      <span className="flex items-center gap-2 eyebrow text-gold">
        <Mail size={12} className="text-gold" />
        Compose
      </span>

      {!configured && (
        <p className="mt-4 border-l-2 border-gold/60 bg-gold/10 px-3 py-2 text-[12px] text-ivory-muted">
          Mail is not configured — set <code className="text-gold">VITE_RESEND_BROADCAST_KEY</code> in <code className="text-gold">.env.local</code> and deploy the Vercel serverless function.
          The admin page sends broadcasts to <code className="text-gold">/api/broadcast</code>.
        </p>
      )}

      <div className="mt-6 grid gap-4 md:grid-cols-[1.2fr_auto]">
        <label className="block">
          <span className="font-mono-set text-[10px] uppercase tracking-[0.22em] text-gold">
            Template
          </span>
          <select
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            className="mt-2 w-full border-b border-line bg-transparent px-1 py-2 text-[14px] text-ivory outline-none focus:border-ivory motion-safe"
          >
            {TEMPLATES.map((template) => (
              <option key={template.id} value={template.id}>
                {template.label}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={() => {
            const template = TEMPLATES.find((item) => item.id === selectedTemplate);
            if (template) {
              setSubject(template.subject);
              setBody(template.body);
            }
          }}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-white/5 px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-gold transition hover:bg-white/10"
        >
          Load template
        </button>
      </div>

      <p className="mt-3 max-w-xl text-[12px] leading-relaxed text-ivory-muted">
        Tip: keep subject lines clear, send from a verified campaign domain, and include a plain-text fallback. That reduces spam risk and helps the email land more reliably.
      </p>

      <label className="mt-6 block">
        <span className="font-mono-set text-[10px] uppercase tracking-[0.22em] text-gold">
          Subject
        </span>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="A line that lands in the inbox"
          className="mt-2 w-full border-b border-line bg-transparent px-1 py-2 text-[15px] text-ivory outline-none placeholder:text-ivory-faint focus:border-ivory motion-safe"
        />
      </label>

      <label className="mt-6 block">
        <span className="font-mono-set text-[10px] uppercase tracking-[0.22em] text-gold">
          Body
        </span>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write the message. Plain text - line breaks are preserved."
          rows={9}
          className="mt-2 w-full resize-y border border-line bg-transparent p-3 text-[14px] leading-relaxed text-ivory outline-none placeholder:text-ivory-faint focus:border-ivory motion-safe"
        />
      </label>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono-set text-[11px] uppercase tracking-[0.22em] text-ivory-faint">
          → will send to <span className="text-gold">{subscribers.length}</span> subscribers
        </p>
        <button
          type="button"
          onClick={send}
          disabled={!canSend || busy}
          className="flex items-center gap-2 bg-gold px-5 py-3 font-mono-set text-[12px] font-semibold uppercase tracking-[0.22em] text-ink motion-safe hover:bg-ivory disabled:opacity-50"
        >
          <Send size={14} />
          {busy ? 'Sending…' : 'Send'}
        </button>
      </div>

      {progress && busy && (
        <div className="mt-5">
          <div className="h-1 w-full bg-ink-soft">
            <div
              className="h-full bg-gold motion-safe"
              style={{
                width: `${Math.round(
                  ((progress.sent + progress.failed) / Math.max(progress.total, 1)) * 100,
                )}%`,
              }}
            />
          </div>
          <p className="mt-2 font-mono-set text-[10px] uppercase tracking-[0.22em] text-ivory-faint">
            Sent {progress.sent} · failed {progress.failed} · of {progress.total}
          </p>
        </div>
      )}
      {feedback && (
        <p className="mt-5 text-[12px] text-ivory-muted">{feedback}</p>
      )}
    </div>
  );
}
