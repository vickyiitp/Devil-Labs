import * as fs from 'fs';
import * as path from 'path';
import { serviceCategories } from './src/data/services';
import { CLIENT_PROJECTS, DEMO_PROJECTS } from './src/data/projects';
import { articles } from './src/data/insights';

interface SearchRecord {
  title: string;
  path: string;
  category: 'Pages' | 'Services' | 'Projects' | 'Insights';
  description: string;
  tags: string[];
}

function updateFreshnessSignals() {
  const nowISO = new Date().toISOString();
  const dateOnly = nowISO.split('T')[0];
  const publicDir = path.join(process.cwd(), 'public');

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 1. Regenerate Sitemap with build date
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://devillabs.dev/</loc><lastmod>${dateOnly}</lastmod><changefreq>daily</changefreq><priority>1.00</priority></url>
  <url><loc>https://devillabs.dev/services</loc><lastmod>${dateOnly}</lastmod><changefreq>weekly</changefreq><priority>0.95</priority></url>
  <url><loc>https://devillabs.dev/products</loc><lastmod>${dateOnly}</lastmod><changefreq>weekly</changefreq><priority>0.90</priority></url>
  <url><loc>https://devillabs.dev/solutions</loc><lastmod>${dateOnly}</lastmod><changefreq>weekly</changefreq><priority>0.90</priority></url>
  <url><loc>https://devillabs.dev/projects</loc><lastmod>${dateOnly}</lastmod><changefreq>weekly</changefreq><priority>0.90</priority></url>
  <url><loc>https://devillabs.dev/work</loc><lastmod>${dateOnly}</lastmod><changefreq>weekly</changefreq><priority>0.85</priority></url>
  <url><loc>https://devillabs.dev/about</loc><lastmod>${dateOnly}</lastmod><changefreq>weekly</changefreq><priority>0.90</priority></url>
  <url><loc>https://devillabs.dev/pricing</loc><lastmod>${dateOnly}</lastmod><changefreq>weekly</changefreq><priority>0.90</priority></url>
  <url><loc>https://devillabs.dev/contact</loc><lastmod>${dateOnly}</lastmod><changefreq>monthly</changefreq><priority>0.85</priority></url>
  <url><loc>https://devillabs.dev/process</loc><lastmod>${dateOnly}</lastmod><changefreq>monthly</changefreq><priority>0.80</priority></url>
  <url><loc>https://devillabs.dev/insights</loc><lastmod>${dateOnly}</lastmod><changefreq>daily</changefreq><priority>0.80</priority></url>
  <url><loc>https://devillabs.dev/resources</loc><lastmod>${dateOnly}</lastmod><changefreq>weekly</changefreq><priority>0.80</priority></url>
  <url><loc>https://devillabs.dev/faq</loc><lastmod>${dateOnly}</lastmod><changefreq>weekly</changefreq><priority>0.80</priority></url>
  <url><loc>https://devillabs.dev/services/landing-pages</loc><lastmod>${dateOnly}</lastmod><changefreq>monthly</changefreq><priority>0.80</priority></url>
  <url><loc>https://devillabs.dev/services/business-website</loc><lastmod>${dateOnly}</lastmod><changefreq>monthly</changefreq><priority>0.80</priority></url>
  <url><loc>https://devillabs.dev/services/ecommerce</loc><lastmod>${dateOnly}</lastmod><changefreq>monthly</changefreq><priority>0.80</priority></url>
  <url><loc>https://devillabs.dev/services/fullstack</loc><lastmod>${dateOnly}</lastmod><changefreq>monthly</changefreq><priority>0.80</priority></url>
  <url><loc>https://devillabs.dev/services/ai-agents</loc><lastmod>${dateOnly}</lastmod><changefreq>monthly</changefreq><priority>0.85</priority></url>
  <url><loc>https://devillabs.dev/services/ai-tools</loc><lastmod>${dateOnly}</lastmod><changefreq>monthly</changefreq><priority>0.85</priority></url>
  <url><loc>https://devillabs.dev/services/automation</loc><lastmod>${dateOnly}</lastmod><changefreq>monthly</changefreq><priority>0.85</priority></url>
  <url><loc>https://devillabs.dev/services/cloud-hosting</loc><lastmod>${dateOnly}</lastmod><changefreq>monthly</changefreq><priority>0.75</priority></url>
  <url><loc>https://devillabs.dev/services/web-apps</loc><lastmod>${dateOnly}</lastmod><changefreq>monthly</changefreq><priority>0.75</priority></url>
  <url><loc>https://devillabs.dev/services/vps</loc><lastmod>${dateOnly}</lastmod><changefreq>monthly</changefreq><priority>0.75</priority></url>
  <url><loc>https://devillabs.dev/legal/privacy</loc><lastmod>${dateOnly}</lastmod><changefreq>yearly</changefreq><priority>0.30</priority></url>
  <url><loc>https://devillabs.dev/legal/terms</loc><lastmod>${dateOnly}</lastmod><changefreq>yearly</changefreq><priority>0.30</priority></url>
  <url><loc>https://devillabs.dev/legal/msa</loc><lastmod>${dateOnly}</lastmod><changefreq>yearly</changefreq><priority>0.30</priority></url>
</urlset>`;

  fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
  console.log(`Updated sitemap.xml with lastmod date: ${dateOnly}`);
}

function generateIndex() {
  console.log('Generating Search Index & Freshness Signals...');

  updateFreshnessSignals();

  const records: SearchRecord[] = [];

  // 1. Static Pages
  const staticPages: { title: string; path: string; description: string; tags: string[] }[] = [
    {
      title: 'Home / Operator Console',
      path: '/',
      description: 'Devil Labs operator console. High-performance software engineering, bespoke AI systems, and containerized cloud deployment services in Patna & Gaya, India.',
      tags: ['home', 'landing', 'main', 'devil labs', 'console', 'patna', 'bihar', 'gaya', 'india', 'tech architecture']
    },
    {
      title: 'Services Overview',
      path: '/services',
      description: 'Explore our full spectrum of services, ranging from custom landing pages and scalable SaaS products to secure DevOps setups and autonomous AI agents.',
      tags: ['services', 'overview', 'capabilities', 'what we do', 'landing pages', 'saas', 'crm', 'vps', 'hosting']
    },
    {
      title: 'Methodology & Process',
      path: '/process',
      description: 'Discover our four-step high-velocity system design and build sprint: from architecture modeling, AI-assisted development, security hardening, to cloud scaling.',
      tags: ['process', 'methodology', 'sprint', 'design', 'hardening', 'qa', 'ci/cd', 'deployment', 'velocity']
    },
    {
      title: 'Lab Notes & Insights',
      path: '/insights',
      description: 'Deep technical research papers and engineering logs on microservices, prompt injection safety, streaming state management, and the Vibe Coding shift.',
      tags: ['insights', 'articles', 'blog', 'papers', 'research', 'security', 'state management', 'vibe coding', 'prompt injection']
    },
    {
      title: 'Pricing & Estimates',
      path: '/pricing',
      description: 'View our transparent, high-performance pricing plans for Startups and Enterprises. Get immediate estimates for single-page applications, MVP prototypes, and full-scale AI systems.',
      tags: ['pricing', 'plans', 'cost', 'estimates', 'startup', 'enterprise', 'mvp', 'retainer', 'calculator']
    },
    {
      title: 'Contact Us',
      path: '/contact',
      description: 'Get in touch with Devil Labs. Send an encrypted transmission to secure your next rapid development deployment slot.',
      tags: ['contact', 'email', 'form', 'telegram', 'hire us', 'gaya', 'bihar', 'office', 'consultation']
    }
  ];

  for (const page of staticPages) {
    records.push({
      title: page.title,
      path: page.path,
      category: 'Pages',
      description: page.description,
      tags: page.tags
    });
  }

  // 2. Services
  for (const category of serviceCategories) {
    for (const item of category.items) {
      records.push({
        title: `${item.title} // Service`,
        path: `/services/${item.slug}`,
        category: 'Services',
        description: `${item.desc} ${item.simpleDesc}`,
        tags: [
          item.slug,
          category.title.toLowerCase(),
          'service',
          item.title.toLowerCase(),
          ...(item.desc.toLowerCase().split(/\s+/).filter(w => w.length > 4)),
          ...(item.simpleDesc.toLowerCase().split(/\s+/).filter(w => w.length > 4))
        ]
      });
    }
  }

  // 3. Projects
  const allProjects = [...CLIENT_PROJECTS, ...DEMO_PROJECTS];
  for (const project of allProjects) {
    const typeLabel = project.id >= 100 ? 'Client Project' : 'Demo Project';
    records.push({
      title: `${project.title.replace(' // ', ' — ')} (${typeLabel})`,
      path: `/work?id=${project.id}`,
      category: 'Projects',
      description: `Deployed tech architecture under domain ${project.domain || 'Web'}. Powered by ${project.tech}. Built for ${project.client}.`,
      tags: [
        'project',
        project.title.toLowerCase(),
        project.tech.toLowerCase(),
        project.client.toLowerCase(),
        project.category.toLowerCase(),
        ...(project.domain ? [project.domain.toLowerCase()] : [])
      ]
    });
  }

  // 4. Insights / Articles
  for (const article of articles) {
    records.push({
      title: `${article.title} ${article.tag}`,
      path: `/insights?id=${article.id}`,
      category: 'Insights',
      description: `${article.excerpt} ${article.content.slice(0, 150)}...`,
      tags: [
        'article',
        'insight',
        article.title.toLowerCase(),
        article.tag.toLowerCase(),
        ...(article.excerpt.toLowerCase().split(/\s+/).filter(w => w.length > 4))
      ]
    });
  }

  const publicDir = path.join(process.cwd(), 'public');
  const outputPath = path.join(publicDir, 'search.json');
  fs.writeFileSync(outputPath, JSON.stringify(records, null, 2), 'utf8');
  console.log(`Successfully generated search index with ${records.length} records inside: ${outputPath}`);
}

generateIndex();
