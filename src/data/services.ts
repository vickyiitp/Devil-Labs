import { Layers, Cpu, Zap, Server, Globe, ShoppingCart, Rocket, Monitor, Workflow, Database, Shield, Box } from 'lucide-react';

export const serviceCategories = [
  {
    title: 'Create a Website',
    id: 'web-dev',
    items: [
      {
        title: 'Landing Pages',
        slug: 'landing-pages',
        desc: 'High-converting, visually stunning single-page websites designed to capture leads and drive sales.',
        icon: Rocket,
        simpleDesc: 'Perfect for marketing campaigns and new product launches.'
      },
      {
        title: 'Business Websites',
        slug: 'business-website',
        desc: 'Professional multi-page web presence to establish authority and showcase your company\'s services.',
        icon: Globe,
        simpleDesc: 'The digital storefront for your company.'
      },
      {
        title: 'E-Commerce',
        slug: 'ecommerce',
        desc: 'Scalable online stores with secure checkout, inventory management, and beautiful product displays.',
        icon: ShoppingCart,
        simpleDesc: 'Start selling your products online.'
      },
      {
        title: 'Custom Full-Stack',
        slug: 'fullstack',
        desc: 'Complex web applications with custom databases, user authentication, and advanced functionality.',
        icon: Layers,
        simpleDesc: 'For unique ideas that need custom coding and databases.'
      }
    ]
  },
  {
    title: 'AI & Automation',
    id: 'ai',
    items: [
      {
        title: 'AI Agents',
        slug: 'ai-agents',
        desc: 'Autonomous AI workers that handle customer support, data entry, and continuous operational tasks 24/7.',
        icon: Cpu,
        simpleDesc: 'Hire a digital employee that never sleeps.'
      },
      {
        title: 'AI Tools',
        slug: 'ai-tools',
        desc: 'Custom generative AI tools integrating GPT-4, Claude, or Gemini directly into your business processes.',
        icon: Box,
        simpleDesc: 'Supercharge your team with custom AI tools.'
      },
      {
        title: 'Workflow Automation',
        slug: 'automation',
        desc: 'Connect your favorite apps and automate repetitive tasks using secure APIs and webhook triggers.',
        icon: Workflow,
        simpleDesc: 'Stop doing repetitive manual work.'
      }
    ]
  },
  {
    title: 'Hosting & Infrastructure',
    id: 'hosting',
    items: [
      {
        title: 'Cloud Hosting',
        slug: 'cloud-hosting',
        desc: 'Lightning-fast edge networks ensuring your website loads instantly from anywhere in the world.',
        icon: Zap,
        simpleDesc: 'Fast, secure home for your basic websites.'
      },
      {
        title: 'Web Apps Deployment',
        slug: 'web-apps',
        desc: 'Containerized CI/CD pipelines to seamlessly deploy and scale modern React and Node.js applications.',
        icon: Monitor,
        simpleDesc: 'Professional deployment for complex software.'
      },
      {
        title: 'VPS & Dedicated',
        slug: 'vps',
        desc: 'Raw computing power. Fully managed virtual private servers for intensive enterprise workloads.',
        icon: Server,
        simpleDesc: 'Maximum power and control for your systems.'
      }
    ]
  }
];

export const getServiceBySlug = (slug: string) => {
  for (const category of serviceCategories) {
    for (const item of category.items) {
      if (item.slug === slug) return { ...item, category: category.title };
    }
  }
  return null;
};
