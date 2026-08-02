export interface Step {
  id: string;
  title: string;
  desc: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  metric: string;
  projectType: string;
}

export interface Article {
  id: number;
  tag: string;
  title: string;
  excerpt: string;
  readTime: string;
  content: string;
}

export const steps: Step[] = [
  {
    id: "01",
    title: "System Design",
    desc: "Architecture & DB modeling. We lay the structural foundation before a single line of code is written.",
  },
  {
    id: "02",
    title: "The Build Sprint",
    desc: "AI-assisted rapid full-stack development. We use autonomous agents for extreme velocity.",
  },
  {
    id: "03",
    title: "Hardening",
    desc: "Security, QA, and manual polish. Stress-testing edge cases and refining the experience.",
  },
  {
    id: "04",
    title: "Deployment",
    desc: "Cloud scaling on Render/Vercel. Zero-downtime releases and continuous integration.",
  }
];

export const testimonials: Testimonial[] = [
  {
    quote: "Devil Labs delivered our complete CRM platform in less than three weeks. Their agentic workflow speed is legendary. The system runs on a highly secured stack without any maintenance overhead.",
    author: "Marcus Vance",
    role: "VP of Product",
    company: "Aura // Health Portal",
    metric: "DELIVERY: 18 DAYS",
    projectType: "Full-Stack + AI",
  },
  {
    quote: "Outstanding architecture and brutalist aesthetics. We moved from concept to deployment with zero tech debt. They engineered an AI automated workflow that acts as our core logic broker.",
    author: "Sarah Jenkins",
    role: "CTO",
    company: "GeniusMVA // AI Analytics",
    metric: "STABILITY: 100.00%",
    projectType: "Autonomous AI System",
  },
  {
    quote: "A masterclass in rapid engineering. Handing off our database modeling and API integrations to Devil Labs cut down our time-to-market by 4 months. Unparalleled professionalism.",
    author: "Nikhil Roy",
    role: "Founder",
    company: "Nexus // Enterprise CRM",
    metric: "REDUCTION: 4 MONTHS",
    projectType: "Database Modeling & API Setup",
  }
];

export const articles: Article[] = [];
