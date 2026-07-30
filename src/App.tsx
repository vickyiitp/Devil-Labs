import { useState, useEffect, useRef, ReactNode, lazy, Suspense } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import Navigation, { Footer } from './components/Navigation';
import ClayTopicShowcase from './components/ClayTopicShowcase';
import LandingPage from './pages/LandingPage';
import SkeletonLoader from './components/SkeletonLoader';
import BackgroundEffects from './components/BackgroundEffects';
import ScrollProgress from './components/ScrollProgress';
import CommandPalette from './components/CommandPalette';
import SEO from './components/SEO';
import FloatingContact from './components/FloatingContact';
import { DebugProvider } from './components/DebugContext';
import { CurrencyProvider } from './contexts/CurrencyContext';
import InitializeModal from './components/InitializeModal';
import ErrorBoundary from './components/ErrorBoundary';

// Code split all secondary routes for fast initial page load & high Lighthouse score
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ProcessInsightsPage = lazy(() => import('./pages/ProcessInsightsPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const MSAPage = lazy(() => import('./pages/MSAPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const SolutionsPage = lazy(() => import('./pages/SolutionsPage'));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));

function usePath() {
  const [path, setPath] = useState(window.location.pathname || '/');

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string) => {
    if (to === path) return;
    window.history.pushState({}, '', to);
    setPath(to);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return [path, navigate] as const;
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
  const [currentPath, navigate] = usePath();
  const [isInitializeModalOpen, setIsInitializeModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenModal = () => setIsInitializeModalOpen(true);
    window.addEventListener('open-initialize-modal', handleOpenModal);
    window.addEventListener('open-inquiry-modal', handleOpenModal);
    return () => {
      window.removeEventListener('open-initialize-modal', handleOpenModal);
      window.removeEventListener('open-inquiry-modal', handleOpenModal);
    };
  }, []);

  const renderPage = () => {
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
      case '/admin':
        return <AdminPage navigate={navigate} />;
      default:
        if (pathname.startsWith('/services/')) {
          return <ServiceDetailPage navigate={navigate} slug={pathname.split('/')[2]} />;
        }
        return <LandingPage navigate={navigate} />;
    }
  };

  return (
    <ErrorBoundary>
      <CurrencyProvider>
        <DebugProvider>
          <div id="devil-labs-app-shell" className="min-h-screen bg-[#050505] text-stone-100 flex flex-col justify-between selection:bg-violet-500/30 selection:text-white">
          <SEO path={currentPath} />
          <ScrollProgress />
          <BackgroundEffects />
          <CommandPalette navigate={navigate} />
          
          {/* Navigation Header - Fixed at root level for immediate clickability & visibility */}
          <Navigation currentPath={currentPath} navigate={navigate} />

          <div className="relative z-10 flex-grow">
            {/* Dynamic Main Page Container */}
            <main id="main-content" className="flex-grow">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPath}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ 
                    duration: 0.25, 
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="w-full flex-grow flex flex-col justify-between"
                >
                  <Suspense fallback={<SkeletonLoader />}>
                    {renderPage()}
                  </Suspense>
                </motion.div>
              </AnimatePresence>
            </main>
          </div>

          {/* Curated Claymorphic Design Disciplines Section (Sleek Pre-Footer Showcase) */}
          {!['/legal/privacy', '/legal/terms', '/legal/msa'].includes(currentPath) && (
            <ClayTopicShowcase />
          )}

          {/* Footer Element with Scroll-Triggered Reveal Animation */}
          <Footer navigate={navigate} />

          <FloatingContact />
          <InitializeModal 
            isOpen={isInitializeModalOpen} 
            onClose={() => setIsInitializeModalOpen(false)} 
            navigate={navigate} 
          />
        </div>
      </DebugProvider>
      </CurrencyProvider>
    </ErrorBoundary>
  );
}
