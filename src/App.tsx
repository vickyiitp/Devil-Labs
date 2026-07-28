import { useState, useEffect, useRef, ReactNode } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import Navigation, { Footer } from './components/Navigation';
import ClayTopicShowcase from './components/ClayTopicShowcase';
import LandingPage from './pages/LandingPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import ProcessInsightsPage from './pages/ProcessInsightsPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import MSAPage from './pages/MSAPage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import SolutionsPage from './pages/SolutionsPage';
import ResourcesPage from './pages/ResourcesPage';
import SkeletonLoader from './components/SkeletonLoader';
import BackgroundEffects from './components/BackgroundEffects';
import ScrollProgress from './components/ScrollProgress';
import CommandPalette from './components/CommandPalette';
import SEO from './components/SEO';
import FloatingContact from './components/FloatingContact';
import Breadcrumb from './components/Breadcrumb';
import { DebugProvider } from './components/DebugContext';
import { CurrencyProvider } from './contexts/CurrencyContext';
import InitializeModal from './components/InitializeModal';

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


function ScrollSection({ children, className = "" }: { children: ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.5"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);
  
  return (
    <motion.div ref={ref} style={{ opacity, y, scale }} className={`w-full relative z-10 ${className}`}>
      {children}
    </motion.div>
  );
}

export default function App() {
  const [currentPath, navigate, isNavigating] = usePath();
  const [isInitializeModalOpen, setIsInitializeModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenModal = () => setIsInitializeModalOpen(true);
    window.addEventListener('open-initialize-modal', handleOpenModal);
    return () => window.removeEventListener('open-initialize-modal', handleOpenModal);
  }, []);

  const renderPage = () => {
    if (isNavigating) return <SkeletonLoader />;

    const pathname = currentPath.split('?')[0];

    switch (pathname) {
      case '/':
        return <LandingPage navigate={navigate} />;
      case '/services':
        return <ServicesPage navigate={navigate} />;
      case '/products':
        return <ProductsPage navigate={navigate} />;
      case '/solutions':
        return <SolutionsPage navigate={navigate} />;
      case '/work':
      case '/projects':
        return <ProjectsPage navigate={navigate} />;
      case '/resources':
        return <ResourcesPage navigate={navigate} />;
      case '/about':
      case '/company':
        return <AboutPage navigate={navigate} />;
      case '/pricing':
        return <PricingPage navigate={navigate} />;
      case '/contact':
        return <ContactPage navigate={navigate} />;
      case '/process':
      case '/insights':
        return <ProcessInsightsPage navigate={navigate} />;
      case '/legal/privacy':
        return <PrivacyPage navigate={navigate} />;
      case '/legal/terms':
        return <TermsPage navigate={navigate} />;
      case '/legal/msa':
        return <MSAPage navigate={navigate} />;
      default:
        if (pathname.startsWith('/services/')) {
          return <ServiceDetailPage navigate={navigate} slug={pathname.split('/')[2]} />;
        }
        return <LandingPage navigate={navigate} />;
    }
  };

  return (
    <CurrencyProvider>
      <DebugProvider>
        <div id="devil-labs-app-shell" className="min-h-screen bg-[#050505] text-stone-100 flex flex-col justify-between selection:bg-violet-500/30 selection:text-white">
        <SEO path={currentPath} />
        <ScrollProgress />
        <BackgroundEffects />
        <CommandPalette navigate={navigate} />
        
        {/* Navigation Header - Fixed at root level for immediate clickability & visibility */}
        <Navigation currentPath={currentPath} navigate={navigate} />

        <div className="relative z-10">
          {/* Navigational Breadcrumb Trail */}
          <Breadcrumb currentPath={currentPath} navigate={navigate} />

          {/* Dynamic Main Page Container */}
          <main id="main-content" className="flex-grow">
            <ScrollSection>
              <AnimatePresence mode="wait">
              <motion.div
                key={currentPath + (isNavigating ? '-loading' : '-ready')}
                initial={{ opacity: 0, scale: 0.97, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.02, y: -15 }}
                transition={{ 
                  duration: 0.45, 
                  ease: [0.16, 1, 0.3, 1] // Custom ultra-smooth cubic bezier mimicking premium desktop OS shells
                }}
                className="w-full flex-grow flex flex-col justify-between"
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          
            </ScrollSection>
          </main>
        </div>

        {/* Curated Claymorphic Design Disciplines Section (Sleek Pre-Footer Showcase) */}
        {!['/legal/privacy', '/legal/terms', '/legal/msa'].includes(currentPath) && (
          <ScrollSection>
            <ClayTopicShowcase />
          </ScrollSection>
        )}

        {/* Footer Element with Scroll-Triggered Reveal Animation */}
        <ScrollSection>
          <Footer navigate={navigate} />
        </ScrollSection>
        <FloatingContact />
        <InitializeModal 
          isOpen={isInitializeModalOpen} 
          onClose={() => setIsInitializeModalOpen(false)} 
          navigate={navigate} 
        />
      </div>
    </DebugProvider>
    </CurrencyProvider>
  );
}
