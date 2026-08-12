import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppShell from './components/app/AppShell.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Landing from './pages/Landing.jsx';
import Bio from './pages/Bio.jsx';
import Stages from './pages/Stages.jsx';
import Honors from './pages/Honors.jsx';
import Roots from './pages/Roots.jsx';
import Admin from './pages/Admin.jsx';
import NotFound from './pages/NotFound.jsx';

function Site({ children }) {
  return <AppShell>{children}</AppShell>;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/"        element={<Site><Landing /></Site>} />
        <Route path="/leadership" element={<Site><Bio /></Site>} />
        <Route path="/exposure"   element={<Site><Stages /></Site>} />
        <Route path="/awards"     element={<Site><Honors /></Site>} />
        <Route path="/experience" element={<Site><Roots /></Site>} />
        <Route path="/admin"      element={<Admin />} />
        <Route path="*"           element={<Site><NotFound /></Site>} />
      </Routes>
    </BrowserRouter>
  );
}
