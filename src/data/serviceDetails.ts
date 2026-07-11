import { Rocket, Globe, ShoppingCart, Layers, Cpu, Box, Workflow, Zap, Monitor, Server } from 'lucide-react';

export const serviceData: Record<string, any> = {
  'landing-pages': {
    title: 'LANDING PAGES',
    subtitle: 'HIGH-CONVERTING FUNNELS',
    desc: 'Visually stunning, hyper-optimized single-page websites designed specifically to capture leads, validate ideas, and drive immediate sales.',
    icon: Rocket,
    features: [
      { title: 'Conversion Tracking', desc: 'Integrated analytics and heatmaps to monitor every click.', status: 'active' },
      { title: 'A/B Testing Ready', desc: 'Built-in variants to continuously optimize your conversion rates.', status: 'active' },
      { title: 'Micro-Interactions', desc: 'Subtle motion design that guides the user\'s eye to the call-to-action.', status: 'active' },
      { title: 'Lightning Fast', desc: 'Pre-rendered static HTML that loads instantly anywhere.', status: 'active' },
    ],
    faqs: [
      {
        q: 'What is a landing page?',
        a: 'A landing page is a single, focused web page designed specifically for a marketing or advertising campaign. It\'s where a visitor "lands" after clicking on a link in an email, or ads from Google, Bing, YouTube, Facebook, Instagram, Twitter, or similar places in the web. Unlike regular web pages, which typically have many goals and encourage exploration, landing pages are designed with a single focus or goal, known as a call to action (or CTA).'
      },
      {
        q: 'How long does it take to build a landing page?',
        a: 'Typically, a high-converting landing page takes 1-2 weeks from concept to deployment, depending on the complexity of the design, copy, and tracking integration.'
      }
    ],
    
    plans: [
      {
        name: 'Starter Plan',
        price: '₹8,500',
        description: 'Ideal for small businesses in emerging markets (Gaya, Patna) establishing their digital footprint.',
        features: ['3-4 Web Pages', 'Mobile Responsive UI', 'Contact Form Integration', 'Basic On-Page SEO', 'Social Media Links'],
        highlight: false
      },
      {
        name: 'Professional Plan',
        price: '₹28,900',
        description: 'Comprehensive solution for growing brands across New Delhi and metro cities.',
        features: ['Up to 10 Web Pages', 'Custom UI/UX Design', 'CMS Integration', 'Speed & Performance Optimization', 'Advanced Analytics'],
        highlight: true
      },
      {
        name: 'Enterprise Plan',
        price: '₹47,000+',
        description: 'Fully custom architecture with advanced automation and integrations.',
        features: ['Unlimited / Dynamic Pages', 'Payment Gateway Integration', 'AI Automation & Agents', 'Custom Backend Systems', 'Priority Tech Support'],
        highlight: false
      }
    ],
    contactValue: 'Web App'
  },
  'business-website': {
    title: 'BUSINESS WEBSITES',
    subtitle: 'DIGITAL CORPORATE PRESENCE',
    desc: 'Professional, multi-page web presence to establish authority, showcase your company\'s services, and build trust with your clients.',
    icon: Globe,
    features: [
      { title: 'Content Management', desc: 'Easy-to-use headless CMS integrations (Sanity/Strapi) for your team.', status: 'active' },
      { title: 'SEO Optimization', desc: 'Technical SEO baked in for high Google rankings.', status: 'active' },
      { title: 'Client Portals', desc: 'Secure login areas for your clients to access their documents.', status: 'beta' },
      { title: 'Global CDN', desc: 'Fast delivery across edge networks globally.', status: 'active' },
    ],
    faqs: [
      {
        q: 'What is a Headless CMS?',
        a: 'A Headless Content Management System (CMS) is a back-end only content management system that acts primarily as a content repository. It makes content accessible via a RESTful API or GraphQL API for display on any device. This means we can build a super fast website using modern tools, while you still have an easy-to-use interface to update text and images.'
      },
      {
        q: 'What does Technical SEO mean?',
        a: 'Technical SEO refers to website and server optimizations that help search engine spiders crawl and index your site more effectively (to help improve organic rankings). This includes things like site speed, mobile-friendliness, structured data, and clean code.'
      }
    ],
    
    plans: [
      {
        name: 'Starter Plan',
        price: '₹8,500',
        description: 'Ideal for small businesses in emerging markets (Gaya, Patna) establishing their digital footprint.',
        features: ['3-4 Web Pages', 'Mobile Responsive UI', 'Contact Form Integration', 'Basic On-Page SEO', 'Social Media Links'],
        highlight: false
      },
      {
        name: 'Professional Plan',
        price: '₹28,900',
        description: 'Comprehensive solution for growing brands across New Delhi and metro cities.',
        features: ['Up to 10 Web Pages', 'Custom UI/UX Design', 'CMS Integration', 'Speed & Performance Optimization', 'Advanced Analytics'],
        highlight: true
      },
      {
        name: 'Enterprise Plan',
        price: '₹47,000+',
        description: 'Fully custom architecture with advanced automation and integrations.',
        features: ['Unlimited / Dynamic Pages', 'Payment Gateway Integration', 'AI Automation & Agents', 'Custom Backend Systems', 'Priority Tech Support'],
        highlight: false
      }
    ],
    contactValue: 'Web App'
  },
  'ecommerce': {
    title: 'E-COMMERCE',
    subtitle: 'SCALABLE ONLINE STORES',
    desc: 'Powerful digital storefronts with secure checkout, inventory management, and beautiful product displays optimized for revenue.',
    icon: ShoppingCart,
    features: [
      { title: 'Secure Checkout', desc: 'Stripe / PayPal integrations with PCI compliance.', status: 'active' },
      { title: 'Inventory Sync', desc: 'Real-time stock management and low-stock alerts.', status: 'active' },
      { title: 'Abandoned Cart', desc: 'Automated email sequences to recover lost sales.', status: 'maintenance' },
      { title: 'Dynamic Pricing', desc: 'Rules engines for bulk discounts and seasonal sales.', status: 'active' },
    ],
    faqs: [
      {
        q: 'What payment gateways do you support?',
        a: 'We primarily integrate Stripe and PayPal, which support all major credit cards and provide maximum security. We can also integrate region-specific payment processors if needed.'
      },
      {
        q: 'Can I manage my own inventory and products?',
        a: 'Yes, we provide you with a dashboard (either custom or through platforms like Shopify/WooCommerce) where you can easily add products, update prices, and track inventory without any coding knowledge.'
      }
    ],
    
    plans: [
      {
        name: 'Starter Plan',
        price: '₹8,500',
        description: 'Ideal for small businesses in emerging markets (Gaya, Patna) establishing their digital footprint.',
        features: ['3-4 Web Pages', 'Mobile Responsive UI', 'Contact Form Integration', 'Basic On-Page SEO', 'Social Media Links'],
        highlight: false
      },
      {
        name: 'Professional Plan',
        price: '₹28,900',
        description: 'Comprehensive solution for growing brands across New Delhi and metro cities.',
        features: ['Up to 10 Web Pages', 'Custom UI/UX Design', 'CMS Integration', 'Speed & Performance Optimization', 'Advanced Analytics'],
        highlight: true
      },
      {
        name: 'Enterprise Plan',
        price: '₹47,000+',
        description: 'Fully custom architecture with advanced automation and integrations.',
        features: ['Unlimited / Dynamic Pages', 'Payment Gateway Integration', 'AI Automation & Agents', 'Custom Backend Systems', 'Priority Tech Support'],
        highlight: false
      }
    ],
    contactValue: 'Web App'
  },
  'fullstack': {
    title: 'CUSTOM FULL-STACK',
    subtitle: 'END-TO-END SYSTEM ENGINEERING',
    desc: 'We engineer bulletproof, scalable applications starting from the database up to the interactive frontend. Designed for heavy traffic and unique ideas.',
    icon: Layers,
    features: [
      { title: 'Frontend Precision', desc: 'React / Next.js with extreme attention to fluid motion and rendering performance.', status: 'active' },
      { title: 'Backend APIs', desc: 'Node.js, Express, FastAPI. Built to handle secure and complex orchestration.', status: 'active' },
      { title: 'Database Modeling', desc: 'PostgreSQL or MongoDB. Structured schemas built for high-throughput queries.', status: 'maintenance' },
      { title: 'Authentication', desc: 'Secure JWT, OAuth integrations, and strict RBAC controls.', status: 'active' },
    ],
    faqs: [
      {
        q: 'What does "Full Stack" mean?',
        a: '"Full stack" refers to the entirety of a computer system or application. It includes the "frontend" (the parts of the website you see and interact with) and the "backend" (the servers, databases, and behind-the-scenes logic that make it all work). A custom full-stack app is built from the ground up for your specific idea.'
      },
      {
        q: 'Why would I need a custom app instead of a standard website?',
        a: 'Standard websites are great for displaying information. You need a custom web app when your users need to log in, interact with complex data, manipulate information, or when you are building a SaaS (Software as a Service) business.'
      },
      {
        q: 'What is a Database (PostgreSQL / MongoDB)?',
        a: 'A database is an organized collection of structured information, or data, typically stored electronically in a computer system. It\'s where all your users\' accounts, posts, and transactions are securely saved.'
      }
    ],
    
    plans: [
      {
        name: 'Starter Plan',
        price: '₹8,500',
        description: 'Ideal for small businesses in emerging markets (Gaya, Patna) establishing their digital footprint.',
        features: ['3-4 Web Pages', 'Mobile Responsive UI', 'Contact Form Integration', 'Basic On-Page SEO', 'Social Media Links'],
        highlight: false
      },
      {
        name: 'Professional Plan',
        price: '₹28,900',
        description: 'Comprehensive solution for growing brands across New Delhi and metro cities.',
        features: ['Up to 10 Web Pages', 'Custom UI/UX Design', 'CMS Integration', 'Speed & Performance Optimization', 'Advanced Analytics'],
        highlight: true
      },
      {
        name: 'Enterprise Plan',
        price: '₹47,000+',
        description: 'Fully custom architecture with advanced automation and integrations.',
        features: ['Unlimited / Dynamic Pages', 'Payment Gateway Integration', 'AI Automation & Agents', 'Custom Backend Systems', 'Priority Tech Support'],
        highlight: false
      }
    ],
    contactValue: 'Web App'
  },
  'ai-agents': {
    title: 'AI AGENTS',
    subtitle: 'AUTONOMOUS DIGITAL EMPLOYEES',
    desc: 'Autonomous AI workers that handle customer support, data entry, and continuous operational tasks 24/7. They read, think, and act.',
    icon: Cpu,
    features: [
      { title: 'Multi-Agent Teams', desc: 'LangGraph architecture where AI agents collaborate to solve complex problems.', status: 'beta' },
      { title: 'Memory Systems', desc: 'Long-term vector databases so agents remember past interactions.', status: 'active' },
      { title: 'Tool Usage', desc: 'Agents can securely query your database or trigger external APIs.', status: 'active' },
      { title: 'Human Handoff', desc: 'Seamless escalation to human operators when confidence is low.', status: 'active' },
    ],
    faqs: [
      {
        q: 'What is an AI Agent?',
        a: 'An AI Agent is a system powered by Large Language Models (like GPT-4 or Gemini) that doesn\'t just answer questions, but can actually "do" things. It can use tools, browse the web, read your databases, and take actions on your behalf—like a digital employee.'
      },
      {
        q: 'Will the AI hallucinate or give wrong answers to my customers?',
        a: 'We build strict "guardrails" and "human handoff" systems. The AI is constrained to only answer from your specific company data. If it doesn\'t know the answer or detects an angry customer, it automatically transfers the conversation to a human.'
      }
    ],
    
    plans: [
      {
        name: 'Starter Plan',
        price: '₹8,500',
        description: 'Ideal for small businesses in emerging markets (Gaya, Patna) establishing their digital footprint.',
        features: ['3-4 Web Pages', 'Mobile Responsive UI', 'Contact Form Integration', 'Basic On-Page SEO', 'Social Media Links'],
        highlight: false
      },
      {
        name: 'Professional Plan',
        price: '₹28,900',
        description: 'Comprehensive solution for growing brands across New Delhi and metro cities.',
        features: ['Up to 10 Web Pages', 'Custom UI/UX Design', 'CMS Integration', 'Speed & Performance Optimization', 'Advanced Analytics'],
        highlight: true
      },
      {
        name: 'Enterprise Plan',
        price: '₹47,000+',
        description: 'Fully custom architecture with advanced automation and integrations.',
        features: ['Unlimited / Dynamic Pages', 'Payment Gateway Integration', 'AI Automation & Agents', 'Custom Backend Systems', 'Priority Tech Support'],
        highlight: false
      }
    ],
    contactValue: 'AI Automation'
  },
  'ai-tools': {
    title: 'CUSTOM AI TOOLS',
    subtitle: 'SUPERCHARGE YOUR WORKFLOW',
    desc: 'Bespoke generative AI tools integrating GPT-4, Claude, or Gemini directly into your business processes for content generation, analysis, or internal use.',
    icon: Box,
    features: [
      { title: 'Custom Prompt Engines', desc: 'Hardcoded system instructions optimized for your specific business logic.', status: 'active' },
      { title: 'Document Parsing', desc: 'Upload PDFs or spreadsheets and let the AI extract insights instantly.', status: 'active' },
      { title: 'Data Privacy', desc: 'Secure proxy backends to ensure your data is never used for training.', status: 'maintenance' },
      { title: 'Streamed Responses', desc: 'Real-time typewriter effects for fast perceived performance.', status: 'active' },
    ],
    faqs: [
      {
        q: 'How is this different from just using ChatGPT?',
        a: 'While ChatGPT is a general-purpose chat tool, a Custom AI Tool is built specifically into your workflow. It has your business context pre-loaded, it can connect directly to your internal databases, and it ensures your company data remains private and isn\'t used to train public models.'
      },
      {
        q: 'Can the AI read my internal PDFs and spreadsheets?',
        a: 'Yes! We use a technique called RAG (Retrieval-Augmented Generation) which allows the AI to securely read, search, and understand your massive internal documents and answer questions based strictly on them.'
      }
    ],
    
    plans: [
      {
        name: 'Starter Plan',
        price: '₹8,500',
        description: 'Ideal for small businesses in emerging markets (Gaya, Patna) establishing their digital footprint.',
        features: ['3-4 Web Pages', 'Mobile Responsive UI', 'Contact Form Integration', 'Basic On-Page SEO', 'Social Media Links'],
        highlight: false
      },
      {
        name: 'Professional Plan',
        price: '₹28,900',
        description: 'Comprehensive solution for growing brands across New Delhi and metro cities.',
        features: ['Up to 10 Web Pages', 'Custom UI/UX Design', 'CMS Integration', 'Speed & Performance Optimization', 'Advanced Analytics'],
        highlight: true
      },
      {
        name: 'Enterprise Plan',
        price: '₹47,000+',
        description: 'Fully custom architecture with advanced automation and integrations.',
        features: ['Unlimited / Dynamic Pages', 'Payment Gateway Integration', 'AI Automation & Agents', 'Custom Backend Systems', 'Priority Tech Support'],
        highlight: false
      }
    ],
    contactValue: 'AI Automation'
  },
  'automation': {
    title: 'WORKFLOW AUTOMATION',
    subtitle: 'CONNECT & ORCHESTRATE',
    desc: 'Connect your favorite apps and automate repetitive tasks using secure APIs and webhook triggers. Stop doing manual data entry.',
    icon: Workflow,
    features: [
      { title: 'Webhook Listeners', desc: 'Instant triggers when events happen in Stripe, Shopify, or your CRM.', status: 'active' },
      { title: 'Data Transformation', desc: 'Parse and clean incoming data before sending it to the next step.', status: 'active' },
      { title: 'Error Recovery', desc: 'Automatic retries and alert systems if an API goes down.', status: 'beta' },
      { title: 'Third-Party Auth', desc: 'Secure OAuth token management for Zapier/Make alternatives.', status: 'active' },
    ],
    faqs: [
      {
        q: 'What is Workflow Automation?',
        a: 'Workflow automation is the process of using software to perform tasks that humans previously did manually. For example, automatically adding a new customer from your website into your CRM, sending them a welcome email, and notifying your team in Slack—all instantly and without human intervention.'
      },
      {
        q: 'What is an API?',
        a: 'An API (Application Programming Interface) is a way for two different software programs to talk to each other. We use APIs to connect your website with tools like Salesforce, Stripe, or Mailchimp so they can share data securely.'
      }
    ],
    
    plans: [
      {
        name: 'Starter Plan',
        price: '₹8,500',
        description: 'Ideal for small businesses in emerging markets (Gaya, Patna) establishing their digital footprint.',
        features: ['3-4 Web Pages', 'Mobile Responsive UI', 'Contact Form Integration', 'Basic On-Page SEO', 'Social Media Links'],
        highlight: false
      },
      {
        name: 'Professional Plan',
        price: '₹28,900',
        description: 'Comprehensive solution for growing brands across New Delhi and metro cities.',
        features: ['Up to 10 Web Pages', 'Custom UI/UX Design', 'CMS Integration', 'Speed & Performance Optimization', 'Advanced Analytics'],
        highlight: true
      },
      {
        name: 'Enterprise Plan',
        price: '₹47,000+',
        description: 'Fully custom architecture with advanced automation and integrations.',
        features: ['Unlimited / Dynamic Pages', 'Payment Gateway Integration', 'AI Automation & Agents', 'Custom Backend Systems', 'Priority Tech Support'],
        highlight: false
      }
    ],
    contactValue: 'AI Automation'
  },
  'cloud-hosting': {
    title: 'CLOUD HOSTING',
    subtitle: 'LIGHTNING FAST EDGE NETWORKS',
    desc: 'Global content delivery networks ensuring your website loads instantly from anywhere in the world. Secure, fast, and reliable.',
    icon: Zap,
    features: [
      { title: 'Global Edge CDN', desc: 'Assets served from the datacenter closest to your user.', status: 'active' },
      { title: 'DDoS Protection', desc: 'Enterprise-grade security against malicious bot traffic.', status: 'active' },
      { title: 'SSL Certificates', desc: 'Automated HTTPS encryption for all domains.', status: 'active' },
      { title: 'Analytics', desc: 'Real-time bandwidth and request monitoring dashboards.', status: 'active' },
    ],
    faqs: [
      {
        q: 'What is a CDN (Content Delivery Network)?',
        a: 'A CDN is a global network of servers. Instead of your website living on one computer in one city, copies of your website live all around the world. When a user visits your site, they download it from the server closest to them, making it load incredibly fast.'
      },
      {
        q: 'Why is site speed important?',
        a: 'Faster websites lead to higher conversion rates, better user experience, and higher rankings on Google. Users typically abandon a website if it takes more than 3 seconds to load.'
      }
    ],
    
    plans: [
      {
        name: 'Starter Plan',
        price: '₹8,500',
        description: 'Ideal for small businesses in emerging markets (Gaya, Patna) establishing their digital footprint.',
        features: ['3-4 Web Pages', 'Mobile Responsive UI', 'Contact Form Integration', 'Basic On-Page SEO', 'Social Media Links'],
        highlight: false
      },
      {
        name: 'Professional Plan',
        price: '₹28,900',
        description: 'Comprehensive solution for growing brands across New Delhi and metro cities.',
        features: ['Up to 10 Web Pages', 'Custom UI/UX Design', 'CMS Integration', 'Speed & Performance Optimization', 'Advanced Analytics'],
        highlight: true
      },
      {
        name: 'Enterprise Plan',
        price: '₹47,000+',
        description: 'Fully custom architecture with advanced automation and integrations.',
        features: ['Unlimited / Dynamic Pages', 'Payment Gateway Integration', 'AI Automation & Agents', 'Custom Backend Systems', 'Priority Tech Support'],
        highlight: false
      }
    ],
    contactValue: 'Other'
  },
  'web-apps': {
    title: 'WEB APPS DEPLOYMENT',
    subtitle: 'MODERN CI/CD PIPELINES',
    desc: 'Containerized CI/CD pipelines to seamlessly deploy and scale modern React and Node.js applications with zero-downtime.',
    icon: Monitor,
    features: [
      { title: 'GitHub Integration', desc: 'Auto-deploy on every push to your main branch.', status: 'active' },
      { title: 'Preview Environments', desc: 'Ephemeral staging URLs for every pull request.', status: 'beta' },
      { title: 'Log Streaming', desc: 'Real-time console logs piped to your dashboard.', status: 'active' },
      { title: 'Zero-Downtime', desc: 'Rolling updates ensure your users never see an error.', status: 'active' },
    ],
    faqs: [
      {
        q: 'What is CI/CD?',
        a: 'CI/CD stands for Continuous Integration and Continuous Deployment. It\'s an automated process where every time our developers write new code, the system automatically tests it for bugs and safely updates your live website without it ever going offline.'
      },
      {
        q: 'What does Zero-Downtime mean?',
        a: 'It means when we push an update to your app, your users never see a "Maintenance" screen. The old version keeps running until the new version is completely ready, and then traffic is instantly switched over.'
      }
    ],
    
    plans: [
      {
        name: 'Starter Plan',
        price: '₹8,500',
        description: 'Ideal for small businesses in emerging markets (Gaya, Patna) establishing their digital footprint.',
        features: ['3-4 Web Pages', 'Mobile Responsive UI', 'Contact Form Integration', 'Basic On-Page SEO', 'Social Media Links'],
        highlight: false
      },
      {
        name: 'Professional Plan',
        price: '₹28,900',
        description: 'Comprehensive solution for growing brands across New Delhi and metro cities.',
        features: ['Up to 10 Web Pages', 'Custom UI/UX Design', 'CMS Integration', 'Speed & Performance Optimization', 'Advanced Analytics'],
        highlight: true
      },
      {
        name: 'Enterprise Plan',
        price: '₹47,000+',
        description: 'Fully custom architecture with advanced automation and integrations.',
        features: ['Unlimited / Dynamic Pages', 'Payment Gateway Integration', 'AI Automation & Agents', 'Custom Backend Systems', 'Priority Tech Support'],
        highlight: false
      }
    ],
    contactValue: 'Other'
  },
  'vps': {
    title: 'VPS & DEDICATED',
    subtitle: 'RAW COMPUTING POWER',
    desc: 'Raw computing power. Fully managed virtual private servers for intensive enterprise workloads, databases, and heavy traffic.',
    icon: Server,
    features: [
      { title: 'Root Access', desc: 'Full SSH control over your Linux environment.', status: 'active' },
      { title: 'Dedicated Resources', desc: 'Guaranteed RAM and CPU cores, never shared.', status: 'active' },
      { title: 'Daily Backups', desc: 'Automated snapshots of your entire server state.', status: 'maintenance' },
      { title: 'Scaling Groups', desc: 'Load balancers routing traffic to multiple nodes.', status: 'active' },
    ],
    faqs: [
      {
        q: 'What is a VPS?',
        a: 'A Virtual Private Server (VPS) is a secure, isolated slice of a powerful physical server. Unlike shared hosting where you share resources with other websites, a VPS gives you guaranteed processing power and memory that belongs only to your application.'
      },
      {
        q: 'Do I need a Dedicated Server?',
        a: 'Dedicated servers are usually only necessary for enterprise-scale applications with massive databases and extremely high traffic volumes. For most modern web apps, a scalable VPS or Cloud infrastructure is more cost-effective and flexible.'
      }
    ],
    
    plans: [
      {
        name: 'Starter Plan',
        price: '₹8,500',
        description: 'Ideal for small businesses in emerging markets (Gaya, Patna) establishing their digital footprint.',
        features: ['3-4 Web Pages', 'Mobile Responsive UI', 'Contact Form Integration', 'Basic On-Page SEO', 'Social Media Links'],
        highlight: false
      },
      {
        name: 'Professional Plan',
        price: '₹28,900',
        description: 'Comprehensive solution for growing brands across New Delhi and metro cities.',
        features: ['Up to 10 Web Pages', 'Custom UI/UX Design', 'CMS Integration', 'Speed & Performance Optimization', 'Advanced Analytics'],
        highlight: true
      },
      {
        name: 'Enterprise Plan',
        price: '₹47,000+',
        description: 'Fully custom architecture with advanced automation and integrations.',
        features: ['Unlimited / Dynamic Pages', 'Payment Gateway Integration', 'AI Automation & Agents', 'Custom Backend Systems', 'Priority Tech Support'],
        highlight: false
      }
    ],
    contactValue: 'Other'
  }
};
