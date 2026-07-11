import { useState, useEffect } from 'react';
import Navigation, { Footer } from './components/Navigation';
import LandingPage from './pages/LandingPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import ProcessPage from './pages/ProcessPage';
import InsightsPage from './pages/InsightsPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import MSAPage from './pages/MSAPage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import SkeletonLoader from './components/SkeletonLoader';
import BackgroundEffects from './components/BackgroundEffects';
import ScrollProgress from './components/ScrollProgress';
import CommandPalette from './components/CommandPalette';
import SEO from './components/SEO';
import FloatingContact from './components/FloatingContact';
import { DebugProvider } from './components/DebugContext';
import { CurrencyProvider } from './contexts/CurrencyContext';

function usePath() {
  const [path, setPath] = useState(window.location.pathname || '/');
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string) => {
    if (to === path) return;
    setIsNavigating(true);
    window.history.pushState({}, '', to);
    setPath(to);
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // Simulate data fetching delay to show skeleton
    setTimeout(() => {
      setIsNavigating(false);
    }, 800); // 800ms loading state
  };

  return [path, navigate, isNavigating] as const;
}

export default function App() {
  const [currentPath, navigate, isNavigating] = usePath();

  const renderPage = () => {
    if (isNavigating) return <SkeletonLoader />;

    switch (currentPath) {
      case '/':
        return <LandingPage navigate={navigate} />;
      case '/services':
        return <ServicesPage navigate={navigate} />;
      case '/work':
        return <ProjectsPage navigate={navigate} />;
      case '/about':
        return <AboutPage navigate={navigate} />;
      case '/pricing':
        return <PricingPage navigate={navigate} />;
      case '/contact':
        return <ContactPage navigate={navigate} />;
      case '/process':
        return <ProcessPage navigate={navigate} />;
      case '/insights':
        return <InsightsPage navigate={navigate} />;
      case '/legal/privacy':
        return <PrivacyPage navigate={navigate} />;
      case '/legal/terms':
        return <TermsPage navigate={navigate} />;
      case '/legal/msa':
        return <MSAPage navigate={navigate} />;
      default:
        if (currentPath.startsWith('/services/')) {
          return <ServiceDetailPage navigate={navigate} slug={currentPath.split('/')[2]} />;
        }
        return <LandingPage navigate={navigate} />;
    }
  };

  return (
    <CurrencyProvider>
      <DebugProvider>
        <div id="devil-labs-app-shell" className="min-h-screen bg-[#050505] text-white flex flex-col justify-between selection:bg-violet-500/30 selection:text-white">
        <SEO path={currentPath} />
        <ScrollProgress />
        <BackgroundEffects />
        <CommandPalette navigate={navigate} />
        
        <div className="relative z-10" data-debug="MAIN_CONTENT_WRAPPER" data-x="0" data-y="32">
          {/* Navigation Header */}
          <div data-debug="NAVIGATION" data-x="0" data-y="32">
            <Navigation currentPath={currentPath} navigate={navigate} />
          </div>

          {/* Dynamic Main Page Container */}
          <main id="main-content" className="flex-grow" data-debug="PAGE_ROOT" data-x="0" data-y="100">
            {renderPage()}
          </main>
        </div>

        {/* Footer Element */}
        <div data-debug="FOOTER" data-x="0" data-y="100%">
          <Footer navigate={navigate} />
        </div>
        <FloatingContact />
      </div>
    </DebugProvider>
    </CurrencyProvider>
  );
}
