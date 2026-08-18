import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import Logo from '../components/Logo.jsx';
import laumsaUrl from '../assets/laumsa-logo.png';

function LaumsaImage({ size = 64, className = '' }) {
  return (
    <img
      src={laumsaUrl}
      alt="LAUMSA logo"
      width={size}
      height={size}
      className={`block rounded-full ${className}`}
      style={{ width: size, height: size }}
    />
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
    <div className="page-gutter pb-24 sm:pb-32">
      {/* ───── Header — fluid, stacked on mobile, in-line on tablet+ ───── */}
      <header className="mx-auto mt-10 max-w-5xl sm:mt-12 md:mt-16">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          {/* Brand cluster: two logos + title — wraps cleanly on small screens */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <span className="hidden md:inline-flex shrink-0"><Logo size={56} /></span>
            <span className="md:hidden shrink-0"><Logo size={48} /></span>
            <span className="hidden md:inline-flex shrink-0"><LaumsaImage size={56} /></span>
            <span className="md:hidden shrink-0"><LaumsaImage size={48} /></span>

            <div className="min-w-0">
              <div className="eyebrow text-ivory-faint">
                Ladoke Akintola University Medical Students’ Association
              </div>
              <h1 className="section-title mt-1 text-[28px] leading-[1.05] sm:text-[40px] md:text-[52px]">
                The <span className="text-gold">TOP</span> Mandate
              </h1>
            </div>
          </div>

          <Link
            to="/"
            className="self-start font-mono-set text-[11px] uppercase tracking-[0.22em] text-ivory-faint motion-safe hover:text-ivory sm:self-auto"
          >
            Back home
          </Link>
        </div>
      </header>

      {/* ───── Main — single fluid container ───── */}
      <main className="mx-auto mt-10 max-w-5xl sm:mt-12 md:mt-16">
        {/* Vision & Mission */}
        <section className="bento grain p-6 sm:p-10 md:p-14 lg:p-16">
          <h2 className="font-display text-[20px] italic text-ivory sm:text-[22px] md:text-[26px]">
            Vision & Mission
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ivory-muted max-w-prose sm:mt-6 sm:text-[17px]">
            The vision (T - Transform, O - Organize &amp; Coordinate, P -
            Proficiency &amp; Multi-dimensional). Mission: To make each
            LAUMSAite self-sufficient enough to get LAUMSA to the TOP.
          </p>
        </section>

        {/* TOP letters grid: 1 col mobile, 3 col md+ */}
        <section className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-3 md:gap-8">
          {[
            { letter: 'T', label: 'Transform', body: 'Transform the Association by transforming LAUMSAites.' },
            { letter: 'O', label: 'Organize & Coordinate', body: 'Organize and coordinate a safe community that feels like home.' },
            { letter: 'P', label: 'Proficiency & Multi-dimensional', body: 'Build proficient, multi-dimensional members of the Association.' },
          ].map((it) => (
            <article
              key={it.letter}
              className="bento grain p-6 sm:p-8 md:p-10"
            >
              <div className="font-display text-[44px] italic leading-none text-gold sm:text-[52px]">
                {it.letter}
              </div>
              <h3 className="eyebrow mt-3 text-ivory-faint sm:mt-4">{it.label}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-ivory-muted sm:mt-4 sm:text-[15px]">
                {it.body}
              </p>
            </article>
          ))}
        </section>

        {/* Ten Pillars: single-column on mobile, two-up from md+ */}
        <section className="mt-12 md:mt-16">
          <header className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
            <h2 className="section-title text-[26px] text-ivory sm:text-[30px] md:text-[36px]">
              The 10 Core Pillars
            </h2>
            <span className="font-mono-set text-[10px] uppercase tracking-[0.22em] text-ivory-faint">
              Mandate
            </span>
          </header>

          <ol className="mt-6 grid gap-4 sm:mt-8 sm:gap-6 md:grid-cols-2 md:gap-6">
            {PILLARS.map((p) => (
              <li
                key={p.n}
                className="bento grain p-5 sm:p-8 md:p-10"
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="font-display text-[34px] font-semibold leading-none text-gold/90 sm:text-[40px]">
                    {p.n}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-[17px] text-ivory sm:text-[18px] md:text-[19px]">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-ivory-muted sm:mt-3 sm:text-[15px]">
                      {p.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Invitation callout: stacks on mobile, side-by-side content row on sm+ */}
        <section className="mt-12 md:mt-16">
          <div className="bento grain relative overflow-hidden border border-white/6 bg-black/5 p-6 sm:p-8 md:p-10 lg:p-12">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-gold/30 bg-gold/10 text-gold">
                <Sparkles size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-[20px] text-ivory sm:text-[22px] md:text-[24px]">
                  An invitation
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ivory-muted sm:text-[15px] md:text-[16px]">
                  This presentation is an official invitation to all
                  LAUMSAites: come and sit with me at the TOP by casting your
                  vote on the election day. The vision is brighter when sat
                  at the TOP - let’s take LAUMSA to the TOP.
                </p>
                <p className="mt-4 font-display text-[16px] italic text-ivory sm:text-[18px]">
                  Thank you very much.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3">
              <Link
                to="/"
                className="inline-flex items-center justify-center bg-ink px-5 py-3 font-mono-set text-[11px] font-semibold uppercase tracking-[0.22em] text-ivory sm:text-[12px]"
              >
                Back home
              </Link>
              <Link
                to="/leadership"
                className="inline-flex items-center justify-center border border-ivory/40 px-5 py-3 font-mono-set text-[11px] font-semibold uppercase tracking-[0.22em] text-ivory sm:text-[12px]"
              >
                Read the bio
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
