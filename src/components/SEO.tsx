import { useEffect } from 'react';
import { getServiceBySlug } from '../data/services';
import { articles } from '../data/insights';

export default function SEO({ path }: { path: string }) {
  useEffect(() => {
    let title = "Devil Labs | Best AI Automation & Software Agency in Gaya, Patna & Bihar";
    let description = "Devil Labs (devillabs.dev) is Bihar's premier tech architecture firm & top IT service provider in Gaya, Patna, and India. Expert custom web development, autonomous AI agents, and custom AI tools engineered by Vicky (vickyiitp.tech).";
    let keywords = "Devil Labs, devillabs.dev, devillabs, Devil Labs Bihar, Devil Labs Gaya, devillabs Gaya, devillabs Bihar, vickyiitp, vickyiitp.tech, Vicky Kumar IIT Patna, best IT services Gaya, best software company Bihar, AI automation Gaya, web development Bihar, custom web design Patna, software development company Gaya, AI consulting Bihar, startup software developer India, React full-stack developer Bihar, web developer Gaya, Patna software company, Gaya IT company";
    let ogType = "website";
    let ogImage = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"; // A high-tech aesthetic placeholder

    const cleanPath = path.split('?')[0];
    const queryParams = new URLSearchParams(path.split('?')[1] || '');
    const insightIdStr = queryParams.get('id');

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

    // FAQ schema for Pricing page
    if (cleanPath === '/pricing') {
      const faqSchema = {
        "@type": "FAQPage",
        "@id": `${currentUrl}/#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Who owns the code upon final deployment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You do. Devil Labs operates as a work-for-hire project studio. Upon final clearance of your project invoice, 100% of intellectual property, code assets, database schemas, and associated server scripts are written directly to your secure repository."
            }
          },
          {
            "@type": "Question",
            "name": "What is your average timeline for an MVP Build?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We average 2 to 4 weeks. By employing a context-aware development process (using advanced LLM accelerators like Cursor) and pre-optimized server configurations, we deliver pixel-perfect React frontends with incredible speed."
            }
          },
          {
            "@type": "Question",
            "name": "Are third-party API costs (like Gemini or OpenAI) included in the tier?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. All custom external integrations require you to register billing credentials directly. Our server-side configurations are structured to accept standard client keys via your environment files (.env) to maintain full server key privacy."
            }
          },
          {
            "@type": "Question",
            "name": "How do you handle post-launch maintenance?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We include post-launch support with all individual builds (14 days for MVP, 30 days for Full-Stack + AI). If you require continuous system upgrades, telemetry audits, and maintenance, you can seamlessly migrate to our Retainer / Dedicated Team model."
            }
          },
          {
            "@type": "Question",
            "name": "What services do you provide for startup technology and enterprise software in India?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "As Bihar's premier tech architecture firm based in Gaya, we offer full-spectrum software development services for startups and enterprises across India (including Patna, Gaya, and major hubs like Bangalore and Delhi). Our offerings range from high-conversion landing pages, professional business websites, and scalable e-commerce systems to complex full-stack web applications, AI agents, WhatsApp automation, and custom CRM integrations."
            }
          },
          {
            "@type": "Question",
            "name": "Do you specialize in Next.js and React full-stack SaaS development?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Our core engineering workflow leverages React, Next.js, and high-performance server-side architectures. We design lightweight, high-speed dashboards, SaaS platforms, and secure multi-user environments with robust backend systems, D3/Recharts data visualizations, and containerized Cloud Run, Render, or Vercel deployments."
            }
          },
          {
            "@type": "Question",
            "name": "How do your autonomous AI Agents and Business Automation workflows work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We engineer autonomous AI agents and automated workflows utilizing the Google GenAI SDK (Gemini API) and OpenAI APIs. Our systems handle automated data categorization, intelligent CRM routing, real-time lead generation, and custom WhatsApp automation triggers—helping Indian and global businesses run complex workflows 24/7 without manual intervention."
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer professional SEO services and page performance optimization?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely. Our UX engineering process is optimized for Core Web Vitals, targeting a Lighthouse Performance score of 95+. We integrate structured JSON-LD schema tags, semantic heading hierarchies, responsive layouts, image compression, and route prefetching, ensuring high rankings in both Google Search results and AI-powered Search Overview services (AEO/GEO) like ChatGPT, Claude, and Perplexity."
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
