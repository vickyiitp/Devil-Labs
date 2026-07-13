import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Home, ArrowLeft } from 'lucide-react';
import { getServiceBySlug } from '../data/services';
import { CLIENT_PROJECTS, DEMO_PROJECTS } from '../data/projects';
import { articles } from '../data/insights';

interface BreadcrumbItem {
  name: string;
  path: string;
  clickable: boolean;
}

interface BreadcrumbProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export default function Breadcrumb({ currentPath, navigate }: BreadcrumbProps) {
  const [items, setItems] = useState<BreadcrumbItem[]>([]);
  const [origin, setOrigin] = useState('https://devil-labs.com');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  useEffect(() => {
    // Generate breadcrumbs based on path & search params
    const pathname = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);
    const queryId = searchParams.get('id');

    const list: BreadcrumbItem[] = [
      { name: 'HOME', path: '/', clickable: true }
    ];

    if (pathname === '/' || pathname === '') {
      // Don't show breadcrumbs on homepage to keep landing clean
      setItems([]);
      return;
    }

    if (pathname === '/services') {
      list.push({ name: 'SERVICES', path: '/services', clickable: false });
    } else if (pathname.startsWith('/services/')) {
      list.push({ name: 'SERVICES', path: '/services', clickable: true });
      const slug = pathname.split('/')[2];
      const service = getServiceBySlug(slug);
      if (service) {
        list.push({ name: service.title.toUpperCase(), path: `/services/${slug}`, clickable: false });
      } else {
        list.push({ name: slug.replace(/-/g, ' ').toUpperCase(), path: `/services/${slug}`, clickable: false });
      }
    } else if (pathname === '/work') {
      list.push({ name: 'PORTFOLIO', path: '/work', clickable: !queryId });
      if (queryId) {
        const projId = parseInt(queryId);
        const allProjects = [...CLIENT_PROJECTS, ...DEMO_PROJECTS];
        const proj = allProjects.find(p => p.id === projId);
        if (proj) {
          list.push({ name: proj.title.replace(' // ', ' — ').toUpperCase(), path: `/work?id=${queryId}`, clickable: false });
        } else {
          list.push({ name: `PROJECT #${queryId}`, path: `/work?id=${queryId}`, clickable: false });
        }
      }
    } else if (pathname === '/about') {
      list.push({ name: 'ABOUT', path: '/about', clickable: false });
    } else if (pathname === '/pricing') {
      list.push({ name: 'PRICING', path: '/pricing', clickable: false });
    } else if (pathname === '/contact') {
      list.push({ name: 'CONTACT', path: '/contact', clickable: false });
    } else if (pathname === '/process') {
      list.push({ name: 'METHODOLOGY', path: '/process', clickable: false });
    } else if (pathname === '/insights') {
      list.push({ name: 'INSIGHTS', path: '/insights', clickable: !queryId });
      if (queryId) {
        const artId = parseInt(queryId);
        const art = articles.find(a => a.id === artId);
        if (art) {
          list.push({ name: art.title.toUpperCase(), path: `/insights?id=${queryId}`, clickable: false });
        } else {
          list.push({ name: `ARTICLE #${queryId}`, path: `/insights?id=${queryId}`, clickable: false });
        }
      }
    } else if (pathname.startsWith('/legal/')) {
      list.push({ name: 'LEGAL', path: '/legal/terms', clickable: true });
      const sub = pathname.split('/')[2];
      if (sub === 'privacy') {
        list.push({ name: 'PRIVACY POLICY', path: '/legal/privacy', clickable: false });
      } else if (sub === 'terms') {
        list.push({ name: 'TERMS & REFUNDS', path: '/legal/terms', clickable: false });
      } else if (sub === 'msa') {
        list.push({ name: 'MSA & NDA', path: '/legal/msa', clickable: false });
      } else {
        list.push({ name: sub.toUpperCase(), path: pathname, clickable: false });
      }
    } else {
      // General fallback
      const segments = pathname.split('/').filter(Boolean);
      let currentAccPath = '';
      segments.forEach((seg, idx) => {
        currentAccPath += `/${seg}`;
        const isLast = idx === segments.length - 1;
        list.push({
          name: seg.replace(/-/g, ' ').toUpperCase(),
          path: currentAccPath,
          clickable: !isLast
        });
      });
    }

    setItems(list);
  }, [currentPath]);

  if (items.length === 0) return null;

  // Generate structured data for BreadcrumbList Schema.org
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': `${origin}${item.path}`
    }))
  };

  return (
    <div id="breadcrumb-navigation-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-4 font-mono text-[10px] tracking-wider text-gray-500 relative z-30 select-none">
      {/* Schema.org Injection for SEO crawlers */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>

      <div className="flex flex-wrap items-center gap-1.5 md:gap-2 border-b border-white/5 pb-3">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <div key={item.path} className="flex items-center gap-1.5 md:gap-2">
              {index > 0 && <ChevronRight size={10} className="text-gray-700 shrink-0" />}
              {index === 0 ? (
                <button
                  id="breadcrumb-btn-home"
                  onClick={() => navigate('/')}
                  className="flex items-center gap-1 hover:text-white transition-colors duration-200 cursor-pointer text-gray-400 font-bold"
                >
                  <Home size={10} className="shrink-0" />
                  <span>{item.name}</span>
                </button>
              ) : item.clickable ? (
                <button
                  id={`breadcrumb-btn-${index}`}
                  onClick={() => navigate(item.path)}
                  className="hover:text-white transition-colors duration-200 cursor-pointer text-gray-400 font-bold hover:underline decoration-violet-500/50 underline-offset-4"
                >
                  {item.name}
                </button>
              ) : (
                <span className="text-white font-medium truncate max-w-[200px] sm:max-w-[400px] md:max-w-none">
                  {item.name}
                </span>
              )}
            </div>
          );
        })}

        {/* Back navigation button helper for deep views */}
        {items.length > 2 && (
          <button
            id="breadcrumb-back-helper-btn"
            onClick={() => {
              const previousPath = items[items.length - 2].path;
              navigate(previousPath);
            }}
            className="ml-auto flex items-center gap-1 text-[9px] font-bold text-violet-400/80 hover:text-violet-400 hover:underline transition-all cursor-pointer bg-violet-500/5 border border-violet-500/10 hover:border-violet-500/20 px-2.5 py-1 rounded-full shrink-0"
          >
            <ArrowLeft size={8} />
            <span>RETURN TO {items[items.length - 2].name}</span>
          </button>
        )}
      </div>
    </div>
  );
}
