import { useEffect } from 'react';
import { getServiceBySlug } from '../data/services';

export default function SEO({ path }: { path: string }) {
  useEffect(() => {
    let title = "Devil Labs | Best AI Automation & Software Agency in Gaya, Patna & Bihar";
    let description = "Devil Labs (devillabs.dev) is Bihar's premier tech architecture firm & top IT service provider in Gaya, Patna, and India. Expert custom web development, autonomous AI agents, and custom AI tools engineered by Vicky (vickyiitp.tech).";
    let keywords = "Devil Labs, devillabs.dev, devillabs, Devil Labs Bihar, Devil Labs Gaya, devillabs Gaya, devillabs Bihar, vickyiitp, vickyiitp.tech, Vicky Kumar IIT Patna, best IT services Gaya, best software company Bihar, AI automation Gaya, web development Bihar, custom web design Patna, software development company Gaya, AI consulting Bihar, startup software developer India, React full-stack developer Bihar, web developer Gaya, Patna software company, Gaya IT company";
    let ogType = "website";
    let ogImage = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"; // A high-tech aesthetic placeholder

    const cleanPath = path.split('?')[0];

    switch (cleanPath) {
      case '/':
        title = "Devil Labs | Best AI Automation & Software Agency in Gaya, Patna & Bihar";
        description = "Bihar's leading software development and AI engineering firm in Gaya, Patna, India. We design high-performance custom websites, AI agents, and secure cloud environments to supercharge modern enterprises at devillabs.dev.";
        break;
      case '/services':
        title = "AI Automation & Custom Web Development Services in Gaya, Patna, Bihar | Devil Labs";
        description = "Professional IT services in Bihar and India: landing pages, business websites, e-commerce, custom full-stack solutions, AI agents, cloud hosting, and secure workflow automation at devillabs.dev.";
        keywords = "IT services Gaya, web development Bihar, software company Gaya, AI agents India, web design Gaya, e-commerce developer Bihar, VPS hosting Bihar, workflow automation India, devillabs.dev";
        break;
      case '/work':
        title = "Our Engineered Works & Case Studies | Devil Labs Bihar";
        description = "Explore custom full-stack applications, real-world AI agent integrations, and scalable web solutions executed by Devil Labs for enterprises in Bihar and globally.";
        keywords = "Devil Labs portfolio, custom web apps Bihar, fullstack projects, AI agent developer, software client list India, devillabs.dev";
        break;
      case '/about':
        title = "About Devil Labs | Bihar's Leading Tech Architects & Founder Vicky (vickyiitp.tech)";
        description = "Founded by Vicky Kumar (vickyiitp.tech, IIT Patna pedigree), Devil Labs (devillabs.dev) is Gaya's premier software lab. Delivering elite software engineering, high-performance architectures, and cyber-secure designs.";
        keywords = "Vicky Kumar IIT Patna, vickyiitp, vickyiitp.tech, Devil Labs founder, top IT agency Gaya, software development Bihar, elite programmers Gaya, devillabs.dev";
        break;
      case '/process':
        title = "The Architectural Process | High-Performance Tech Sprints - Devil Labs";
        description = "Discover our zero-tech-debt deployment cycle. From scope definition to local execution and live system uplink, engineered for speed and flawless scalability.";
        keywords = "agile development Gaya, software sprint process, code delivery pipeline, rapid software engineering India, devillabs.dev";
        break;
      case '/insights':
        title = "Lab Notes & Tech Insights | AI & Web Engineering in India";
        description = "Read our latest technical insights on generative AI, React best practices, serverless scaling, and local IT opportunities in Bihar and Gaya.";
        keywords = "tech blog Bihar, AI trends Gaya, web development tutorials India, software architecture notes, devillabs.dev";
        break;
      case '/pricing':
        title = "Transparent Engineering Rates & Project Tiers | Devil Labs";
        description = "Clear investment options for professional custom websites, AI agency workflows, and dedicated server-side architecture sprinters. Optimized value for Indian and global brands.";
        keywords = "web design price Gaya, AI agent development cost, software developer rates Bihar, enterprise IT pricing India, devillabs.dev";
        break;
      case '/contact':
        title = "Initialize Project | Top Web & AI Specialists in Gaya, Bihar";
        description = "Begin the dialogue with Devil Labs. Send your custom specs to get custom estimates for top-tier software engineering in Bihar and across India.";
        keywords = "hire web developers Gaya, contact software company Bihar, custom software quotes India, devillabs.dev";
        break;
      case '/legal/privacy':
        title = "Privacy & Encryption Protocols | Devil Labs";
        description = "Our strict data collection rules, client confidentiality agreements, and system privacy protocols.";
        break;
      case '/legal/terms':
        title = "Terms & Refund Parameters | Devil Labs";
        description = "Agreement terms of digital delivery, warranties, and deployment conditions for Devil Labs.";
        break;
      case '/legal/msa':
        title = "Master Services Agreement & NDA parameters | Devil Labs";
        description = "Standard corporate engagement protocols, proprietary rights, and nondisclosure commitments.";
        break;
      default:
        if (cleanPath.startsWith('/services/')) {
          const slug = cleanPath.split('/')[2];
          const service = getServiceBySlug(slug);
          if (service) {
            title = `${service.title} | Expert ${service.category} in Gaya, Bihar, India - Devil Labs`;
            description = `${service.desc} Professional deployment of ${service.title.toLowerCase()} systems with elite standard support. Led by Vicky (vickyiitp.tech).`;
            keywords = `${service.title.toLowerCase()} Gaya, custom ${service.title.toLowerCase()} Bihar, ${service.title.toLowerCase()} agency India, Devil Labs ${service.slug}`;
          } else {
            title = "Specialist Tech Service | Devil Labs India";
            description = "High-performance software consulting and technical architectures by Devil Labs Gaya, Bihar.";
          }
        }
        break;
    }

    // 1. Title
    document.title = title;

    // Helper to update or create meta tags
    const updateOrCreateMeta = (nameOrProperty: string, value: string, isProperty = false) => {
      const attributeName = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attributeName}="${nameOrProperty}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, nameOrProperty);
        document.head.appendChild(element);
      }
      element.setAttribute('content', value);
    };

    // 2. Standard Meta
    updateOrCreateMeta('description', description);
    updateOrCreateMeta('keywords', keywords);
    updateOrCreateMeta('author', "Vicky Kumar (vickyiitp.tech)");
    updateOrCreateMeta('robots', "index, follow");

    // 3. OpenGraph
    updateOrCreateMeta('og:title', title, true);
    updateOrCreateMeta('og:description', description, true);
    updateOrCreateMeta('og:type', ogType, true);
    updateOrCreateMeta('og:url', window.location.href, true);
    updateOrCreateMeta('og:image', ogImage, true);
    updateOrCreateMeta('og:site_name', "Devil Labs", true);

    // 4. Twitter Cards
    updateOrCreateMeta('twitter:card', "summary_large_image");
    updateOrCreateMeta('twitter:title', title);
    updateOrCreateMeta('twitter:description', description);
    updateOrCreateMeta('twitter:image', ogImage);

    // 5. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', window.location.href);

    // 6. Sitemap Link
    let sitemapLink = document.querySelector('link[rel="sitemap"]');
    if (!sitemapLink) {
      sitemapLink = document.createElement('link');
      sitemapLink.setAttribute('rel', 'sitemap');
      sitemapLink.setAttribute('type', 'application/xml');
      sitemapLink.setAttribute('title', 'Sitemap');
      document.head.appendChild(sitemapLink);
    }
    sitemapLink.setAttribute('href', `${window.location.origin}/sitemap.xml`);

    // 7. Schema.org JSON-LD Structured Data
    let schemaScript = document.getElementById('seo-jsonld-schema');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.setAttribute('id', 'seo-jsonld-schema');
      schemaScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(schemaScript);
    }

    let schemaData: any = null;

    if (cleanPath === '/') {
      schemaData = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": `${window.location.origin}/#organization`,
        "name": "Devil Labs",
        "alternateName": "Devil Labs Bihar",
        "url": window.location.origin,
        "logo": ogImage,
        "description": description,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Sector 01",
          "addressLocality": "Gaya",
          "addressRegion": "Bihar",
          "postalCode": "823001",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "24.7955",
          "longitude": "84.9994"
        },
        "telephone": "+918102099678",
        "priceRange": "$$",
        "founder": {
          "@type": "Person",
          "@id": "https://vickyiitp.tech/#person",
          "name": "Vicky Kumar",
          "url": "https://vickyiitp.tech"
        },
        "sameAs": [
          "https://instagram.com/devil_labs",
          "https://linkedin.com/company/devil-labs"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+918102099678",
          "contactType": "customer service",
          "areaServed": ["IN", "Bihar", "Gaya"],
          "availableLanguage": ["en", "hi"]
        }
      };
    } else if (cleanPath === '/about') {
      schemaData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": "https://vickyiitp.tech/#person",
        "name": "Vicky Kumar",
        "url": "https://vickyiitp.tech",
        "jobTitle": "Founder & Chief Technology Architect",
        "worksFor": {
          "@type": "ProfessionalService",
          "@id": `${window.location.origin}/#organization`,
          "name": "Devil Labs",
          "url": window.location.origin
        },
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "Indian Institute of Technology Patna",
          "alternateName": "IIT Patna"
        },
        "sameAs": [
          "https://linkedin.com/in/vickyiitp",
          "https://github.com/vickyiitp",
          "https://vickyiitp.tech",
          "https://instagram.com/devil_labs"
        ],
        "description": "Elite software engineer, full-stack tech architect, and founder of Devil Labs, leading digital acceleration in Bihar and India."
      };
    }

    if (schemaData) {
      schemaScript.textContent = JSON.stringify(schemaData);
    } else {
      schemaScript.remove();
    }

  }, [path]);

  return null;
}
