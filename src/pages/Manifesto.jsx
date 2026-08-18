import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Quote } from 'lucide-react';
import Logo from '../components/Logo.jsx';
import laumsaUrl from '../assets/laumsa-logo.png';

function LaumsaImage({ size = 64 }) {
  return (
    <img src={laumsaUrl} alt="LAUMSA logo" width={size} height={size} className="block rounded-full" style={{ width: size, height: size }} />
  );
}

const PILLARS = [
  { n: '01', title: 'Inclusive Community', body: 'Bring dormant societies and committees back; monthly welfare visits; work with Welfare Director; monitor executives; and run social, community-driven bonding events.' },
  { n: '02', title: 'Revenue Generation', body: 'Launch “OperationRaiseFunds”; seek resources from State officials; partner with businesses; and sell association merchandise.' },
  { n: '03', title: 'Academic Development', body: 'Work with VP1/VP2 to improve tutorials, secure Simulation Centre access, provide recorded tutorial sessions, and maintain an academic drive.' },
  { n: '04', title: 'Research Development', body: 'Introduce monthly research classes for pre-clinical years with VP2 and LAUMED Journal Club; raise baseline research literacy.' },
  { n: '05', title: 'Scholarship & Career Development', body: 'Set up a Scholarship & Career Opportunities Committee; run virtual and physical workshops; and organise a major Leadership Summit.' },
  { n: '06', title: 'Association Outlook', body: 'Secure an Association Secretariat; rebrand LAUMSA; build an official website; produce ID cards and branded materials.' },
  { n: '07', title: 'Adequate Welfarism', body: 'Partner with the Department of Psychiatry for therapeutic support; provide sports and community partnerships like 6amRunClub.' },
  { n: '08', title: 'Fair Representation', body: 'Ensure fair opportunity at LAUMSA, NiMSA, FAMSA, IFMSA levels; host webinars with veterans to share insights.' },
  { n: '09', title: 'Partnerships & Sponsorships', body: 'Use networks to secure partnerships and sponsorships from state officials, companies, and neighbouring MSAs.' },
  { n: '10', title: 'Better Alumni Relationship', body: 'Create LARAC to reach out to alumni, build a database, and run quarterly alumni webinars.' },
];

export default function Manifesto() {
  return (
    <div className="page-gutter pb-32">
      <header className="mx-auto max-w-5xl mt-16">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <Logo size={56} />
            <div className="flex items-center gap-3">
              <LaumsaImage size={56} />
              <div>
                <div className="eyebrow text-ivory-faint">Ladoke Akintola University Medical Students’ Association</div>
                <h1 className="section-title mt-2 text-[36px] sm:text-[48px]">The <span className="text-gold">TOP</span> Mandate</h1>
              </div>
            </div>
          </div>
          <Link to="/" className="font-mono-set text-[12px] uppercase tracking-[0.22em] text-ivory-faint">Back home</Link>
        </div>
      </header>

      <main className="mx-auto mt-12 max-w-5xl">
        <section className="bento grain p-10 md:p-16">
          <h2 className="font-display text-[22px] italic text-ivory">Vision & Mission</h2>
          <p className="mt-6 text-[17px] leading-relaxed text-ivory-muted max-w-prose mx-auto">The vision (T - Transform, O - Organize & Coordinate, P - Proficiency & Multi-dimensional). Mission: To make each LAUMSAite self-sufficient enough to get LAUMSA to the TOP.</p>
        </section>

        <section className="mt-10 grid gap-8 md:grid-cols-3">
          <div className="bento grain p-8 md:p-10">
            <h3 className="eyebrow text-ivory-faint">T - Transform</h3>
            <p className="mt-3 text-ivory-muted leading-relaxed">Transform the Association by transforming LAUMSAites.</p>
          </div>
          <div className="bento grain p-8 md:p-10">
            <h3 className="eyebrow text-ivory-faint">O - Organize & Coordinate</h3>
            <p className="mt-3 text-ivory-muted leading-relaxed">Organize and coordinate a safe community that feels like home.</p>
          </div>
          <div className="bento grain p-8 md:p-10">
            <h3 className="eyebrow text-ivory-faint">P - Proficiency & Multi-dimensional</h3>
            <p className="mt-3 text-ivory-muted leading-relaxed">Build proficient, multi-dimensional members of the Association.</p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="section-title text-[30px] text-ivory">The 10 Core Pillars</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-2">
            {PILLARS.map((p) => (
              <li key={p.n} className="bento grain p-8 md:p-10">
                <div className="flex items-start gap-6">
                  <div className="font-display text-[40px] text-gold/90 font-semibold leading-none">{p.n}</div>
                  <div>
                    <h3 className="font-display text-[18px] text-ivory">{p.title}</h3>
                    <p className="mt-3 text-ivory-muted leading-relaxed text-[15px] max-w-prose">{p.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14">
          <div className="bento grain p-10 relative overflow-hidden border border-white/6 bg-black/5">
            <div className="flex items-start gap-6">
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-gold/30 bg-gold/10 text-gold">
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="font-display text-[22px] text-ivory">An invitation</h3>
                <p className="mt-3 text-ivory-muted">This presentation is an official invitation to all LAUMSAites: come and sit with me at the TOP by casting your vote on the election day. The vision is brighter when sat at the TOP - let’s take LAUMSA to the TOP.</p>
                <p className="mt-4 font-display text-[18px] italic text-ivory">Thank you very much.</p>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <Link to="/" className="bg-ink px-5 py-3 font-mono-set text-[12px] font-semibold uppercase tracking-[0.22em] text-ivory">Back home</Link>
              <Link to="/leadership" className="border border-ivory/40 px-5 py-3 font-mono-set text-[12px] font-semibold uppercase tracking-[0.22em] text-ivory">Read the bio</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
