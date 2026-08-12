import TopNav from './TopNav.jsx';
import BottomDock from './BottomDock.jsx';
import AppFooter from './AppFooter.jsx';

export default function AppShell({ children }) {
  return (
    <div className="min-h-screen surface-ink">
      <TopNav />
      <main className="pt-[calc(env(safe-area-inset-top)+64px)] md:pt-[calc(env(safe-area-inset-top)+64px)]">
        {children}
      </main>
      <AppFooter />
      <BottomDock />
    </div>
  );
}
