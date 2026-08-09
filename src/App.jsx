import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import CTAPanels from './components/CTAPanels.jsx';
import FlagQuote from './components/FlagQuote.jsx';
import MeetTop from './components/MeetTop.jsx';
import Record from './components/Record.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <div className="surface-ink">
      <Header />
      <main>
        <Hero />
        <CTAPanels />
        <FlagQuote />
        <MeetTop />
        <Record />
      </main>
      <Footer />
    </div>
  );
}
