import SubNav from './SubNav.jsx';

/**
 * PageShell — wraps every page route so they all share the same
 * top safe-area padding + a sticky SubNav with back/next.
 *
 * Use this from Bio, Stages, Honors, Roots.
 */
export default function PageShell({ children, subnav }) {
  return (
    <article className="surface-ink">
      {subnav && <SubNav {...subnav} />}
      {children}
    </article>
  );
}
