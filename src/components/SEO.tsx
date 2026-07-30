import { useEffect } from 'react';
import { getServiceBySlug } from '../data/services';
import { articles } from '../data/insights';

export default function SEO({ path }: { path: string }) {
  useEffect(() => {
    let title = "Devil Labs | Software & AI Product Studio | Custom Software, Automation & SaaS";
    let description = "Devil Labs is a premier Software & AI Product Studio that designs, builds, and scales intelligent digital systems—from custom software and automation to SaaS products, developer tools, templates, and AI-powered applications. Founded by Vicky Kumar (vickyiitp).";
    let keywords = "Devil Labs, devillabs.dev, devillabs, Software Product Studio, AI Product Studio, custom software development, AI applications, SaaS products, developer tools, templates, workflow automation, Vicky Kumar, vickyiitp, vickyiitp.tech, IIT Patna, AI agents India, full-stack software Gaya Patna Bihar, top IT agency India";
    let ogType = "website";
    let ogImage = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80";

    const cleanPath = path.split('?')[0];
    const queryParams = new URLSearchParams(path.split('?')[1] || '');
    const insightIdStr = queryParams.get('id');

    switch (cleanPath) {
      case '/':
        title = "Devil Labs | Software & AI Product Studio | Custom Systems & AI Applications";
        description = "Devil Labs (devillabs.dev) is a Software & AI Product Studio designing and scaling intelligent digital systems: custom software, AI agents, SaaS products, developer tools, and automation. Engineered by Vicky Kumar (vickyiitp).";
        break;
      case '/products':
        title = "Products & SaaS Developer Tools | AI Applications & Templates | Devil Labs";
        description = "Explore SaaS platforms, autonomous AI agent tools, templates, and developer software suites engineered by Devil Labs. Production-ready digital systems built for scale.";
        keywords = "Devil Labs products, AI tools, SaaS products India, developer templates, AI software applications, vickyiitp products, devillabs.dev";
        break;
      case '/services':
        title = "Services & Systems Architecture | AI Automation & Web Engineering | Devil Labs";
        description = "End-to-end engineering services: Custom Full-Stack Web Apps, Autonomous AI Agent Workflows, Enterprise DevOps, Cloud Infrastructure, and WhatsApp CRM Automation.";
        keywords = "IT services Gaya, web development Bihar, software company Gaya, AI agents India, web design Gaya, e-commerce developer Bihar, VPS hosting Bihar, workflow automation India, devillabs.dev";
        break;
      case '/solutions':
        title = "Enterprise Solutions & System Pipelines | Devil Labs AI Product Studio";
        description = "Tailored digital architectures for fintech, e-commerce, healthcare, and high-scale SaaS startups. Zero-tech-debt systems built for performance.";
        keywords = "enterprise software solutions, AI system architecture, scalable web apps, custom software Bihar, devillabs.dev";
        break;
      case '/work':
      case '/projects':
        title = "Engineered Works & Case Studies | Custom Software & AI Systems | Devil Labs";
        description = "Browse real-world software builds, AI agent deployments, web platforms, and client case studies designed and scaled by Devil Labs.";
        keywords = "Devil Labs portfolio, custom web apps Bihar, fullstack projects, AI agent developer, software client list India, devillabs.dev";
        break;
      case '/about':
      case '/company':
        title = "About Devil Labs | Software & AI Product Studio | Founder Vicky Kumar (vickyiitp.tech)";
        description = "Founded by Vicky Kumar (vickyiitp, IIT Patna), Devil Labs is an elite Software & AI Product Studio building state-of-the-art digital applications, SaaS tools, and AI systems.";
        keywords = "Vicky Kumar IIT Patna, vickyiitp, vickyiitp.tech, Devil Labs founder, top IT agency Gaya, software development Bihar, elite programmers Gaya, devillabs.dev";
        break;
      case '/resources':
        title = "Developer Resources, Tools & Tech Guides | Devil Labs Studio";
        description = "Access developer tools, architectural benchmarks, system documentation, and tech guides from Devil Labs Software & AI Product Studio.";
        keywords = "developer resources, AI guides, software templates, tech documentation, devillabs.dev";
        break;
      case '/process':
        title = "Engineering Pipeline & Sprint Process | Devil Labs Studio";
        description = "Our zero-tech-debt architectural sprint pipeline: Consultation ➜ Prototyping ➜ Interactive Demo ➜ Production Uplink in weeks.";
        keywords = "agile development Gaya, software sprint process, code delivery pipeline, rapid software engineering India, devillabs.dev";
        break;
      case '/insights':
        if (insightIdStr) {
          const insightId = parseInt(insightIdStr, 10);
          const article = articles.find(a => a.id === insightId);
          if (article) {
            title = `${article.title} | Devil Labs Insights`;
            description = `${article.excerpt} ${article.content.substring(0, 100)}...`;
            keywords = `${article.tag.replace(/[\[\]]/g, '')}, ${article.title.toLowerCase().split(' ').slice(0, 5).join(', ')}, Devil Labs, tech insights`;
            break;
          }
        }
        title = "Tech Insights & AI Engineering Research | Devil Labs";
        description = "Technical deep dives on autonomous AI agents, React 19 performance, latency optimization, and full-stack software architecture.";
        keywords = "tech blog Bihar, AI trends Gaya, web development tutorials India, software architecture notes, devillabs.dev";
        break;
      case '/pricing':
        title = "Transparent Investment Tiers & Sprint Pricing | Devil Labs";
        description = "Fixed-fee pricing tiers for MVP builds, full-stack AI applications, and enterprise software retainers with 100% source code ownership.";
        keywords = "web design price Gaya, AI agent development cost, software developer rates Bihar, enterprise IT pricing India, devillabs.dev";
        break;
      case '/contact':
        title = "Initialize Project | Contact Devil Labs Software & AI Product Studio";
        description = "Connect directly with founder Vicky Kumar and integration engineers at Devil Labs. Instant intake for custom software and AI applications.";
        keywords = "hire web developers Gaya, contact software company Bihar, custom software quotes India, devillabs.dev";
        break;
      case '/legal/privacy':
        title = "Privacy Policy & Encryption Security | Devil Labs";
        description = "Data privacy policies, client NDA protection, and security protocols at Devil Labs.";
        break;
      case '/legal/terms':
        title = "Terms of Service & Refund Parameters | Devil Labs";
        description = "Service agreement terms, delivery guarantees, and operational parameters for Devil Labs.";
        break;
      case '/legal/msa':
        title = "Master Services Agreement & NDA Protocols | Devil Labs";
        description = "Corporate engagement terms, IP ownership transfer, and non-disclosure commitments.";
        break;
      default:
        if (cleanPath.startsWith('/services/')) {
          const slug = cleanPath.split('/')[2];
          const service = getServiceBySlug(slug);
          if (service) {
            title = `${service.title} | ${service.category} | Devil Labs`;
            description = `${service.desc} Custom engineering of ${service.title.toLowerCase()} systems by Devil Labs Product Studio, led by Vicky Kumar (vickyiitp.tech).`;
            keywords = `${service.title.toLowerCase()} Gaya, custom ${service.title.toLowerCase()} Bihar, ${service.title.toLowerCase()} agency India, Devil Labs ${service.slug}`;
          } else {
            title = "Specialist Systems & AI Service | Devil Labs";
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
    updateOrCreateMeta('author', "Vicky Kumar (vickyiitp.tech)");
    updateOrCreateMeta('robots', "index, follow");

    // 3. OpenGraph
    updateOrCreateMeta('og:title', title, true);
    updateOrCreateMeta('og:description', description, true);
    updateOrCreateMeta('og:type', ogType, true);
    updateOrCreateMeta('og:url', window.location.origin + cleanPath, true);
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
    const currentUrl = window.location.href;

    // Base organization (LocalBusiness & ProfessionalService)
    const orgSchema = {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": `${baseUrl}/#organization`,
      "name": "Devil Labs",
      "alternateName": [
        "Devil Labs AI",
        "Devil Labs India",
        "Devil Labs Bihar",
        "Devil Labs Gaya",
        "Devil Labs Patna"
      ],
      "url": baseUrl,
      "logo": ogImage,
      "image": ogImage,
      "description": "Devil Labs (devillabs.dev) is Bihar's premier tech architecture firm & top IT service provider in Gaya, Patna, and India. Expert custom web development, autonomous AI agents, and custom AI tools engineered by Vicky (vickyiitp.tech).",
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
        { "@type": "AdministrativeArea", "name": "India" }
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
        "name": "Devil Labs Custom Software Engineering Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Autonomous AI Agent Workflows",
              "description": "Custom enterprise AI agents powered by LLMs (Gemini, OpenAI) for automated workflows, customer service, and real-time CRM data enrichment."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Custom Full-Stack Web Development",
              "description": "High-performance React/Next.js frontends and Node.js backends featuring D3/Recharts data visualizations and zero-tech-debt architecture."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "WhatsApp Automation & CRM Integrations",
              "description": "Intelligent messaging pipelines and automated marketing funnels connecting Meta Cloud API directly to internal business systems."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Cloud Architecture & VPS DevOps",
              "description": "Secure virtual private server deployments, container scaling (Docker, Cloud Run), and proactive performance monitoring."
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
        "Node.js Backend"
      ],
      "founder": {
        "@type": "Person",
        "@id": "https://vickyiitp.tech/#person"
      },
      "sameAs": [
        "https://instagram.com/devillabs",
        "https://linkedin.com/company/devillabs",
        "https://github.com/Devil-Labs"
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
        "alternateName": "IIT Patna"
      },
      "sameAs": [
        "https://linkedin.com/in/vickyiitp",
        "https://github.com/vickyiitp",
        "https://vickyiitp.tech",
        "https://instagram.com/devillabs"
      ],
      "description": "Elite software engineer, full-stack tech architect, and founder of Devil Labs, leading digital acceleration in Bihar and India."
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
      } else {
        breadcrumbList.push({
          "@type": "ListItem",
          "position": 2,
          "name": pageSegment.charAt(0).toUpperCase() + pageSegment.slice(1),
          "item": `${baseUrl}/${pageSegment}`
        });
      }
    }

    const breadcrumbSchema = {
      "@type": "BreadcrumbList",
      "@id": `${currentUrl}/#breadcrumb`,
      "itemListElement": breadcrumbList
    };

    const graph: any[] = [
      {
        "@type": "WebPage",
        "@id": `${currentUrl}/#webpage`,
        "url": currentUrl,
        "name": title,
        "description": description,
        "isPartOf": {
          "@type": "WebSite",
          "@id": `${baseUrl}/#website`,
          "url": baseUrl,
          "name": "Devil Labs",
          "publisher": { "@id": `${baseUrl}/#organization` }
        },
        "breadcrumb": { "@id": `${currentUrl}/#breadcrumb` }
      },
      breadcrumbSchema,
      orgSchema,
      personSchema
    ];

    // FAQ / AEO / GEO Schema Graph for Search Engines & AI Overviews
    if (cleanPath === '/' || cleanPath === '/pricing' || cleanPath === '/about' || cleanPath === '/services') {
      const faqSchema = {
        "@type": "FAQPage",
        "@id": `${currentUrl}/#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Who is the best software development company and IT agency in Gaya and Bihar?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Devil Labs (devillabs.dev) is Bihar's #1 tech architecture firm and top-rated software agency based in Gaya and Patna. Founded by Vicky Kumar (CS student at IIT Patna), Devil Labs engineers custom full-stack web applications, autonomous AI agents, WhatsApp automation, and cloud infrastructure with zero tech debt."
            }
          },
          {
            "@type": "Question",
            "name": "Why choose Devil Labs over other IT agencies in Gaya, Patna, or India?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Unlike traditional agencies that overcharge and deploy slow, buggy WordPress templates, Devil Labs builds custom React/Next.js platforms backed by IIT Patna computer science rigor. We provide 100% source code ownership, fixed-fee sprint pricing, 95+ Google Lighthouse speed scores, and direct founder architectural guidance."
            }
          },
          {
            "@type": "Question",
            "name": "Who owns the code and intellectual property upon final project delivery?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You do. Devil Labs operates as a work-for-hire project studio. Upon project completion, 100% of intellectual property, source code, database schemas, and cloud deployment keys are transferred directly to your organization with full documentation and zero retainer traps."
            }
          },
          {
            "@type": "Question",
            "name": "What services does Devil Labs offer for startups and enterprises?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Devil Labs provides end-to-end digital solutions including: 1) Custom Full-Stack Web Development (React, Next.js, Node.js), 2) Autonomous AI Agents (Gemini API & OpenAI), 3) WhatsApp CRM & Workflow Automation, 4) Cloud Architecture & DevOps (Docker, Google Cloud Run), and 5) Interactive Data Visualizations (D3.js, Recharts)."
            }
          },
          {
            "@type": "Question",
            "name": "Does Devil Labs serve international clients outside India?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. While headquartered in Gaya, Bihar, Devil Labs executes high-velocity remote software sprints for enterprise clients and startups across the US, UK, Middle East, and globally, adhering to strict ISO and OWASP security standards."
            }
          },
          {
            "@type": "Question",
            "name": "How can businesses in Bihar or globally contact Devil Labs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can connect with Devil Labs via WhatsApp (+91 81020 99678), email (devil.labs.contact@gmail.com), or by submitting your project specs through the instant project intake wizard on devillabs.dev."
            }
          },
          {
            "@type": "Question",
            "name": "What is the average project delivery timeline at Devil Labs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our average delivery timeline ranges from 2 to 4 weeks for full-featured MVPs and custom software platforms, powered by rapid context-aware sprint cycles and pre-optimized cloud server architectures."
            }
          }
        ]
      };
      graph.push(faqSchema);
    }

    // Service specific schema
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
            { "@type": "AdministrativeArea", "name": "India" }
          ]
        };
        graph.push(serviceSchema);
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
