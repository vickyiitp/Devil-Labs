import { useEffect } from 'react';
import { getServiceBySlug, serviceCategories } from '../data/services';
import { articles } from '../data/insights';

export default function SEO({ path }: { path: string }) {
  useEffect(() => {
    let title = "Devil Labs | Official Website | Top AI Automation & Full-Stack Web Development Agency";
    let description = "Devil Labs (devillabs.dev) is the official website of India's premier web development agency and AI automation engineering firm. Founded by Vicky Kumar (vickyiitp.tech, CS IIT Patna alumnus) for custom web apps, autonomous AI agents, enterprise software & SaaS.";
    let keywords = "Devil Labs, devillabs, devils lab, devil lab, devillab, devil-labs, devillabs.dev, devil labs official site, devil labs agency, devil labs web agency, devil labs website, devil labs ai, devil labs iit patna, vicky kumar iit patna, vickyiitp, vickyiitp.tech, Software Product Studio, AI Product Studio, custom software development India, AI applications Bihar, SaaS products, workflow automation Gaya Patna";
    let ogType = "website";
    let ogImage = "https://github.com/Devil-Labs.png?size=400";

    const cleanPath = path.split('?')[0];
    const queryParams = new URLSearchParams(path.split('?')[1] || '');
    const insightIdStr = queryParams.get('id');

    switch (cleanPath) {
      case '/':
        title = "Devil Labs | Official Website | Top AI Automation & Full-Stack Web Agency (IIT Patna Engineers)";
        description = "Official website of Devil Labs (devillabs.dev) - India's #1 web development & AI automation agency. Engineered by Vicky Kumar (vickyiitp.tech, IIT Patna) for high-performance React/Next.js platforms, autonomous AI agents & cloud infrastructure.";
        keywords = "devil labs, devillabs, devils lab, devil lab, devillab, devil-labs, devillabs.dev, devil labs official site, devil labs agency, devil labs web agency, devil labs website, devil labs ai, devil labs iit patna, vicky kumar iit patna, vickyiitp, top web agency India, custom software engineering Bihar, AI automation agency Gaya Patna, best software company Gaya, web development agency India, AI agent developer India";
        break;
      case '/products':
        title = "Official Products & AI Tools | Developer Software Suites | Devil Labs (devillabs.dev)";
        description = "Explore SaaS platforms, autonomous AI agent tools, developer suites, and software templates engineered by Devil Labs. Production-ready digital systems built by IIT Patna engineers.";
        keywords = "Devil Labs products, devillabs products, AI tools India, SaaS products Bihar, developer templates, AI software applications, vickyiitp products, devillabs.dev, AI agent tools, developer software suites";
        break;
      case '/services':
        title = "Web Development & AI Automation Services | Devil Labs Official (devillabs.dev)";
        description = "End-to-end software engineering services: Custom Full-Stack Web Apps (React, Next.js, Node.js), Autonomous AI Agent Workflows, Enterprise DevOps, Cloud Infrastructure, and WhatsApp Automation.";
        keywords = "Devil Labs services, web development agency India, software company Bihar, AI agents India, web design Gaya Patna, e-commerce developer Bihar, VPS hosting Bihar, workflow automation India, devillabs.dev, custom web development, full stack developer India, WhatsApp automation agency";
        break;
      case '/solutions':
        title = "Enterprise Tech Solutions & System Pipelines | Devil Labs AI Studio (devillabs.dev)";
        description = "Tailored digital architectures for fintech, e-commerce, healthcare, and high-scale SaaS startups. Zero-tech-debt custom software systems by Devil Labs.";
        keywords = "Devil Labs enterprise solutions, AI system architecture, scalable web apps, custom software Bihar, devillabs.dev, fintech software India, healthcare AI India, SaaS architecture, enterprise automation";
        break;
      case '/work':
      case '/projects':
        title = "Official Portfolio & Client Case Studies | Devil Labs (devillabs.dev)";
        description = "Browse real-world software builds, AI agent deployments, web platforms, and client case studies engineered and scaled by Devil Labs.";
        keywords = "Devil Labs portfolio, Devil Labs projects, custom web apps Bihar, fullstack projects, AI agent developer, software client list India, devillabs.dev, case studies, client work";
        break;
      case '/about':
      case '/company':
        title = "About Devil Labs | Official Web Agency | Founded by Vicky Kumar (IIT Patna)";
        description = "Founded by Vicky Kumar (vickyiitp.tech, CS IIT Patna alumnus), Devil Labs is an elite Software & AI Product Studio building state-of-the-art digital applications, SaaS tools, and AI systems.";
        keywords = "Vicky Kumar IIT Patna, vickyiitp, vickyiitp.tech, Devil Labs founder, Devil Labs official team, top IT agency Gaya Patna Bihar, elite software engineers India, devillabs.dev, IIT Patna software engineer, Devil Labs about";
        break;
      case '/resources':
        title = "Developer Resources & System Tech Guides | Devil Labs (devillabs.dev)";
        description = "Access developer tools, architectural benchmarks, system documentation, and tech guides from Devil Labs Software & AI Product Studio.";
        keywords = "Devil Labs resources, devillabs.dev, developer resources, AI guides, software templates, tech documentation, vicky kumar iit patna, developer tools India";
        break;
      case '/process':
        title = "Engineering Pipeline & Sprint Process | Devil Labs (devillabs.dev)";
        description = "Our zero-tech-debt architectural sprint pipeline: Consultation ➜ Prototyping ➜ Interactive Demo ➜ Production Uplink in weeks.";
        keywords = "Devil Labs process, devillabs.dev, agile development Gaya, software sprint process, code delivery pipeline, rapid software engineering India, vicky kumar iit patna, MVP delivery process";
        break;
      case '/insights':
        if (insightIdStr) {
          const insightId = parseInt(insightIdStr, 10);
          const article = articles.find(a => a.id === insightId);
          if (article) {
            title = `${article.title} | Devil Labs Insights (devillabs.dev)`;
            description = `${article.excerpt} ${article.content.substring(0, 100)}... Engineered by Devil Labs (devillabs.dev).`;
            keywords = `${article.tag.replace(/[\[\]]/g, '')}, ${article.title.toLowerCase().split(' ').slice(0, 5).join(', ')}, Devil Labs, devillabs.dev, tech insights, vickyiitp, AI engineering research`;
            break;
          }
        }
        title = "Tech Insights & AI Engineering Research | Devil Labs (devillabs.dev)";
        description = "Technical deep dives on autonomous AI agents, React 19 performance, latency optimization, and full-stack software architecture by Devil Labs.";
        keywords = "Devil Labs insights, devillabs.dev, tech blog Bihar, AI trends Gaya, web development tutorials India, software architecture notes, vicky kumar iit patna, AI engineering research";
        break;
      case '/pricing':
        title = "Transparent Investment Tiers & Sprint Pricing | Devil Labs (devillabs.dev)";
        description = "Fixed-fee pricing tiers for MVP builds, full-stack AI applications, and enterprise software retainers with 100% source code ownership.";
        keywords = "Devil Labs pricing, devillabs.dev, web design price Gaya, AI agent development cost, software developer rates Bihar, enterprise IT pricing India, vicky kumar iit patna, MVP cost India, web app pricing";
        break;
      case '/contact':
        title = "Initialize Project | Contact Devil Labs Official (devillabs.dev)";
        description = "Connect directly with founder Vicky Kumar (IIT Patna) and integration engineers at Devil Labs. Instant intake for custom software and AI applications.";
        keywords = "Devil Labs contact, devillabs.dev, hire web developers Gaya, contact software company Bihar, custom software quotes India, vicky kumar iit patna, hire AI developer India, get software quote";
        break;
      case '/faq':
        title = "Frequently Asked Questions | Devil Labs Official (devillabs.dev)";
        description = "Find answers to common questions about Devil Labs services, pricing, delivery timelines, AI automation capabilities, and project engagement process.";
        keywords = "Devil Labs FAQ, devillabs.dev FAQ, Devil Labs questions, AI automation FAQ, web development questions, software agency FAQ India";
        break;
      case '/legal/privacy':
        title = "Privacy Policy & Encryption Security | Devil Labs (devillabs.dev)";
        description = "Data privacy policies, client NDA protection, and security protocols at Devil Labs (devillabs.dev).";
        break;
      case '/legal/terms':
        title = "Terms of Service & Refund Parameters | Devil Labs (devillabs.dev)";
        description = "Service agreement terms, delivery guarantees, and operational parameters for Devil Labs (devillabs.dev).";
        break;
      case '/legal/msa':
        title = "Master Services Agreement & NDA Protocols | Devil Labs (devillabs.dev)";
        description = "Corporate engagement terms, IP ownership transfer, and non-disclosure commitments at Devil Labs (devillabs.dev).";
        break;
      default:
        if (cleanPath.startsWith('/services/')) {
          const slug = cleanPath.split('/')[2];
          const service = getServiceBySlug(slug);
          if (service) {
            title = `${service.title} Services | ${service.category} | Devil Labs (devillabs.dev)`;
            description = `${service.desc} Custom engineering of ${service.title.toLowerCase()} systems by Devil Labs Product Studio, founded by Vicky Kumar (vickyiitp.tech, IIT Patna).`;
            keywords = `Devil Labs ${service.title.toLowerCase()}, ${service.title.toLowerCase()} agency India, custom ${service.title.toLowerCase()} Bihar, ${service.title.toLowerCase()} development Gaya Patna, Devil Labs ${service.slug}, devillabs.dev ${service.slug}, ${service.category.toLowerCase()} services India`;
          } else {
            title = "Specialist Systems & AI Service | Devil Labs (devillabs.dev)";
            description = "High-performance software consulting and technical architectures by Devil Labs Product Studio.";
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
    updateOrCreateMeta('author', "Devil Labs - Vicky Kumar (vickyiitp.tech, IIT Patna)");
    updateOrCreateMeta('robots', "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");

    // 3. OpenGraph
    updateOrCreateMeta('og:title', title, true);
    updateOrCreateMeta('og:description', description, true);
    updateOrCreateMeta('og:type', ogType, true);
    updateOrCreateMeta('og:url', window.location.origin + cleanPath, true);
    updateOrCreateMeta('og:image', ogImage, true);
    updateOrCreateMeta('og:site_name', "Devil Labs Official", true);
    updateOrCreateMeta('og:locale', "en_US", true);

    // 4. Twitter Cards
    updateOrCreateMeta('twitter:card', "summary_large_image");
    updateOrCreateMeta('twitter:title', title);
    updateOrCreateMeta('twitter:description', description);
    updateOrCreateMeta('twitter:image', ogImage);
    updateOrCreateMeta('twitter:creator', "@devillabs");

    // 5. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', window.location.origin + cleanPath);

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

    const baseUrl = window.location.origin;
    const currentUrl = baseUrl + cleanPath;

    // Base organization (Organization + SoftwareCompany + ProfessionalService + LocalBusiness)
    const orgSchema: Record<string, any> = {
      "@type": ["Organization", "SoftwareCompany", "ProfessionalService", "LocalBusiness"],
      "@id": `${baseUrl}/#organization`,
      "name": "Devil Labs",
      "legalName": "Devil Labs Software & AI Product Studio",
      "alternateName": [
        "devillabs",
        "devils lab",
        "devil lab",
        "devillab",
        "devil-labs",
        "devillabs.dev",
        "Devil Labs Official Website",
        "Devil Labs Agency",
        "Devil Labs Web Agency",
        "Devil Labs AI",
        "Devil Labs IIT Patna",
        "Devil Labs India",
        "Devil Labs Bihar",
        "Devil Labs Gaya",
        "Devil Labs Patna",
        "Devil Labs Gaya Patna Bihar"
      ],
      "disambiguatingDescription": "Devil Labs (devillabs.dev) is India's premier software product studio & AI automation engineering firm founded by Vicky Kumar (vickyiitp.tech, IIT Patna). It builds custom full-stack web applications, autonomous AI agents, enterprise SaaS, and cloud infrastructure. It is NOT affiliated with Dark Labs sports supplements (Devil Test), guitar impulse response (IR) packs, or non-profit entities.",
      "url": baseUrl,
      "mainEntityOfPage": `${baseUrl}/`,
      "logo": ogImage,
      "image": ogImage,
      "description": "Devil Labs (devillabs.dev) is the official website of India's premier tech architecture firm & top software agency. Founded by Vicky Kumar (vickyiitp.tech, CS IIT Patna alumnus), specializing in custom full-stack web applications, autonomous AI agents, enterprise software, SaaS products, and cloud infrastructure.",
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
      "email": "devil.labs.contact@gmail.com",
      "areaServed": [
        { "@type": "AdministrativeArea", "name": "Gaya" },
        { "@type": "AdministrativeArea", "name": "Patna" },
        { "@type": "AdministrativeArea", "name": "Bihar" },
        { "@type": "AdministrativeArea", "name": "India" },
        { "@type": "Country", "name": "United States" },
        { "@type": "Country", "name": "United Kingdom" },
        { "@type": "Country", "name": "United Arab Emirates" },
        { "@type": "Country", "name": "Singapore" },
        { "@type": "Country", "name": "Australia" }
      ],
      "subOrganization": [
        {
          "@type": "LocalBusiness",
          "name": "Devil Labs Gaya Headquarters",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Sector 01",
            "addressLocality": "Gaya",
            "addressRegion": "Bihar",
            "postalCode": "823001",
            "addressCountry": "IN"
          },
          "telephone": "+918102099678"
        },
        {
          "@type": "LocalBusiness",
          "name": "Devil Labs Patna Branch",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Boring Road",
            "addressLocality": "Patna",
            "addressRegion": "Bihar",
            "postalCode": "800001",
            "addressCountry": "IN"
          },
          "telephone": "+918102099678"
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Devil Labs Software Engineering & AI Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Autonomous AI Agent Workflows",
              "description": "Custom enterprise AI agents powered by LLMs (Gemini, OpenAI, Claude) for automated workflows, customer service, lead generation, and real-time CRM data enrichment."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Custom Full-Stack Web Development",
              "description": "High-performance React 19/Next.js frontends and Node.js backends with zero-tech-debt architecture, 95+ Lighthouse speed scores, and 100% source code ownership."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "WhatsApp Automation & CRM Integrations",
              "description": "Intelligent messaging pipelines and automated marketing funnels connecting Meta WhatsApp Cloud API directly to internal business systems."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Cloud Architecture & VPS DevOps",
              "description": "Secure virtual private server deployments, containerized Docker/Cloud Run scaling, CI/CD pipelines, and proactive performance monitoring."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "E-Commerce Platform Development",
              "description": "Scalable online stores with secure checkout, inventory management, payment gateway integration, and beautiful product displays."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "SaaS Product Architecture & MVP Sprints",
              "description": "Rapid MVP delivery in 2-4 weeks with scalable multi-tenant SaaS architectures, user authentication, billing integration, and cloud deployment."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Landing Page & Business Website Design",
              "description": "High-converting single-page and multi-page business websites with modern design, SEO optimization, and mobile-first responsive layouts."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Custom AI Tools & Generative AI Applications",
              "description": "Bespoke generative AI tools integrating GPT-4, Claude, or Gemini directly into your business processes for content generation, data analysis, and decision support."
            }
          }
        ]
      },
      "knowsAbout": [
        "AI Agent Development",
        "Autonomous AI Agents",
        "Web Development",
        "Custom Software Engineering",
        "Enterprise DevOps",
        "Full-Stack Development",
        "SaaS Development",
        "WhatsApp Automation",
        "Next.js Development",
        "Node.js Backend",
        "React Development",
        "TypeScript",
        "Cloud Infrastructure",
        "Docker Containerization",
        "Google Cloud Run",
        "E-Commerce Development",
        "CRM Integration",
        "Workflow Automation",
        "Lead Generation Systems",
        "Marketing Automation",
        "API Integration",
        "Dashboard Development",
        "Data Visualization",
        "Chatbot Development",
        "Digital Transformation"
      ],
      "founder": {
        "@type": "Person",
        "@id": "https://vickyiitp.tech/#person"
      },
      "sameAs": [
        "https://instagram.com/devillabs",
        "https://linkedin.com/company/devillabs",
        "https://github.com/Devil-Labs",
        "https://vickyiitp.tech"
      ]
    };

    // Founder Person Schema
    const personSchema = {
      "@type": "Person",
      "@id": "https://vickyiitp.tech/#person",
      "name": "Vicky Kumar",
      "url": "https://vickyiitp.tech",
      "jobTitle": "Founder & Chief Technology Architect",
      "worksFor": {
        "@id": `${baseUrl}/#organization`
      },
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Indian Institute of Technology Patna",
        "alternateName": "IIT Patna",
        "url": "https://www.iitp.ac.in/"
      },
      "sameAs": [
        "https://linkedin.com/in/vickyiitp",
        "https://github.com/vickyiitp",
        "https://vickyiitp.tech",
        "https://instagram.com/devillabs"
      ],
      "description": "Elite software engineer, full-stack tech architect, Computer Science alumnus of IIT Patna, and founder of Devil Labs (devillabs.dev), leading AI automation & digital acceleration in India."
    };

    // WebSite schema with SearchAction (Sitelinks Search Box)
    const websiteSchema = {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      "url": baseUrl,
      "name": "Devil Labs | Official Website",
      "alternateName": ["devillabs", "devillabs.dev", "Devil Labs Agency", "Devil Labs Web Agency"],
      "publisher": { "@id": `${baseUrl}/#organization` },
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${baseUrl}/services?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };

    // Breadcrumbs list
    const breadcrumbList: any[] = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      }
    ];

    let pageSegment = cleanPath.substring(1);
    if (pageSegment) {
      if (pageSegment.startsWith('services/')) {
        breadcrumbList.push({
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": `${baseUrl}/services`
        });
        const slug = pageSegment.split('/')[1];
        const service = getServiceBySlug(slug);
        breadcrumbList.push({
          "@type": "ListItem",
          "position": 3,
          "name": service ? service.title : slug.toUpperCase(),
          "item": `${baseUrl}/services/${slug}`
        });
      } else if (pageSegment.startsWith('legal/')) {
        breadcrumbList.push({
          "@type": "ListItem",
          "position": 2,
          "name": "Legal",
          "item": `${baseUrl}/legal`
        });
        const subPage = pageSegment.split('/')[1];
        const nameMap: Record<string, string> = { privacy: "Privacy Policy", terms: "Terms of Service", msa: "Master Services Agreement" };
        breadcrumbList.push({
          "@type": "ListItem",
          "position": 3,
          "name": nameMap[subPage] || subPage.toUpperCase(),
          "item": `${baseUrl}/${pageSegment}`
        });
      } else {
        const nameMap: Record<string, string> = {
          services: "Services", products: "Products", solutions: "Solutions",
          work: "Portfolio", projects: "Projects", about: "About", company: "About",
          pricing: "Pricing", contact: "Contact", process: "Process",
          insights: "Insights", resources: "Resources", faq: "FAQ"
        };
        breadcrumbList.push({
          "@type": "ListItem",
          "position": 2,
          "name": nameMap[pageSegment] || pageSegment.charAt(0).toUpperCase() + pageSegment.slice(1),
          "item": `${baseUrl}/${pageSegment}`
        });
      }
    }

    const breadcrumbSchema = {
      "@type": "BreadcrumbList",
      "@id": `${currentUrl}/#breadcrumb`,
      "itemListElement": breadcrumbList
    };

    // Build the @graph array
    const graph: any[] = [
      {
        "@type": "WebPage",
        "@id": `${currentUrl}/#webpage`,
        "url": currentUrl,
        "name": title,
        "description": description,
        "isPartOf": { "@id": `${baseUrl}/#website` },
        "about": { "@id": `${baseUrl}/#organization` },
        "breadcrumb": { "@id": `${currentUrl}/#breadcrumb` }
      },
      websiteSchema,
      breadcrumbSchema,
      orgSchema,
      personSchema
    ];

    // FAQ / AEO / GEO Schema Graph for Search Engines & AI Overviews
    if (cleanPath === '/' || cleanPath === '/pricing' || cleanPath === '/about' || cleanPath === '/services' || cleanPath === '/faq') {
      const faqSchema = {
        "@type": "FAQPage",
        "@id": `${currentUrl}/#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is devillabs.dev?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "devillabs.dev is the official website of Devil Labs, India's premier Software & AI Product Studio. Founded by Vicky Kumar (Computer Science alumnus, IIT Patna), Devil Labs builds high-performance custom web applications, autonomous AI agents, enterprise SaaS systems, and cloud infrastructure."
            }
          },
          {
            "@type": "Question",
            "name": "Who founded Devil Labs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Devil Labs was founded by Vicky Kumar (vickyiitp.tech), a software engineer and Computer Science alumnus from the Indian Institute of Technology Patna (IIT Patna). He serves as the Founder & Chief Technology Architect."
            }
          },
          {
            "@type": "Question",
            "name": "Who is the best software development company and IT agency in Gaya and Bihar?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Devil Labs (devillabs.dev) is Bihar's #1 tech architecture firm and top-rated software agency based in Gaya and Patna. Founded by Vicky Kumar (CS alumnus, IIT Patna), Devil Labs engineers custom full-stack web applications, autonomous AI agents, WhatsApp automation, and cloud infrastructure with zero tech debt."
            }
          },
          {
            "@type": "Question",
            "name": "What services does Devil Labs offer for startups and enterprises?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Devil Labs provides end-to-end digital solutions including: 1) Custom Full-Stack Web Development (React, Next.js, Node.js), 2) Autonomous AI Agents (Gemini API, OpenAI, Claude), 3) WhatsApp CRM & Workflow Automation, 4) Cloud Architecture & DevOps (Docker, Google Cloud Run), 5) E-Commerce Platforms, 6) SaaS Product Architecture, 7) Landing Pages & Business Websites, 8) Custom AI Tools & Generative AI Applications, 9) Dashboard & Data Visualization Development, 10) Lead Generation & Marketing Automation Systems."
            }
          },
          {
            "@type": "Question",
            "name": "Why choose Devil Labs over other IT agencies in India?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Unlike traditional agencies that deploy slow WordPress templates, Devil Labs builds custom React/Next.js platforms backed by IIT Patna computer science rigor. We provide 100% source code ownership, fixed-fee sprint pricing, 95+ Google Lighthouse speed scores, direct founder architectural guidance, and zero retainer traps."
            }
          },
          {
            "@type": "Question",
            "name": "Who owns the code and intellectual property upon project delivery?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You do. Devil Labs operates as a work-for-hire project studio. Upon project completion, 100% of intellectual property, source code, database schemas, and cloud deployment keys are transferred directly to your organization with full documentation."
            }
          },
          {
            "@type": "Question",
            "name": "Does Devil Labs serve international clients outside India?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. While headquartered in Gaya, Bihar, Devil Labs executes high-velocity remote software sprints for enterprise clients and startups across the US, UK, UAE, Singapore, Australia, and globally."
            }
          },
          {
            "@type": "Question",
            "name": "How can businesses contact Devil Labs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can connect with Devil Labs via WhatsApp (+91 81020 99678), email (devil.labs.contact@gmail.com), or by submitting your project specs through the instant project intake wizard at https://devillabs.dev/contact."
            }
          },
          {
            "@type": "Question",
            "name": "What is the average project delivery timeline at Devil Labs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Devil Labs delivers full-featured MVPs and custom software platforms in 2 to 4 weeks, powered by rapid context-aware sprint cycles and pre-optimized cloud server architectures."
            }
          },
          {
            "@type": "Question",
            "name": "What technologies does Devil Labs use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Devil Labs uses React 19, TypeScript, Next.js, Node.js, Express, Docker, Google Cloud Run, Vercel, PostgreSQL, MongoDB, Redis, Google Gemini API, OpenAI API, Claude API, WhatsApp Cloud API, D3.js, Recharts, and TailwindCSS among other modern technologies."
            }
          }
        ]
      };
      graph.push(faqSchema);
    }

    // Service specific schema with expanded areaServed
    if (cleanPath.startsWith('/services/')) {
      const slug = cleanPath.split('/')[2];
      const service = getServiceBySlug(slug);
      if (service) {
        const serviceSchema = {
          "@type": "Service",
          "@id": `${currentUrl}/#service`,
          "name": service.title,
          "description": service.desc,
          "category": service.category,
          "provider": { "@id": `${baseUrl}/#organization` },
          "areaServed": [
            { "@type": "AdministrativeArea", "name": "Gaya" },
            { "@type": "AdministrativeArea", "name": "Patna" },
            { "@type": "AdministrativeArea", "name": "Bihar" },
            { "@type": "Country", "name": "India" },
            { "@type": "Country", "name": "United States" },
            { "@type": "Country", "name": "United Kingdom" },
            { "@type": "Country", "name": "United Arab Emirates" }
          ]
        };
        graph.push(serviceSchema);
      }
    }

    // Services overview page: inject all service schemas for full indexability
    if (cleanPath === '/services') {
      for (const category of serviceCategories) {
        for (const item of category.items) {
          graph.push({
            "@type": "Service",
            "@id": `${baseUrl}/services/${item.slug}/#service`,
            "name": item.title,
            "description": item.desc,
            "category": category.title,
            "url": `${baseUrl}/services/${item.slug}`,
            "provider": { "@id": `${baseUrl}/#organization` },
            "areaServed": { "@type": "Country", "name": "India" }
          });
        }
      }
    }

    const finalSchema = {
      "@context": "https://schema.org",
      "@graph": graph
    };

    schemaScript.textContent = JSON.stringify(finalSchema, null, 2);

  }, [path]);

  return null;
}
