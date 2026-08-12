import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="surface-ink flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <span className="eyebrow text-gold">404</span>
        <h1 className="mt-6 display-italic text-[48px] text-ivory md:text-[64px]">
          Off the path.
        </h1>
        <p className="mt-6 text-[15px] text-ivory-muted">
          The page you're looking for hasn't been built yet. Back to the
          campaign site?
        </p>
        <Link
          to="/"
          className="mt-10 inline-block font-mono-set text-[12px] font-semibold uppercase tracking-[0.22em] text-gold motion-safe hover:text-ivory"
        >
          ← Back to the TOP
        </Link>
      </div>
    </section>
  );
}
