import { Cpu, Layout, Globe, BrainCircuit, GraduationCap, Building2, Terminal, Code2, Heart } from 'lucide-react';

export interface Project {
  id: number;
  domain?: string;
  title: string;
  client: string;
  category: string;
  isPro?: boolean;
  thumbnail: string;
  icon: any;
  tech: string;
  link: string;
  inDevelopment?: boolean;
  likes?: string;
  views?: string;
}

export const CLIENT_PROJECTS: Project[] = [
  {
    id: 101,
    domain: "Web",
    title: 'Nexus // Enterprise CRM',
    client: 'Confidential (FinTech)',
    category: 'SaaS & Business',
    isPro: true,
    thumbnail: 'from-violet-900/40 to-black',
    icon: Building2,
    tech: 'React / Node',
    link: 'https://nexus-crm-dev.client.app',
    inDevelopment: true
  },
  {
    id: 102,
    domain: "AI",
    title: 'Aura // Health Portal',
    client: 'Confidential (Healthcare)',
    category: 'AI & Automation',
    isPro: true,
    thumbnail: 'from-emerald-900/40 to-black',
    icon: Heart,
    tech: 'AI / HIPAA',
    link: 'https://aura-portal.client.app',
    inDevelopment: true
  },
  {
    id: 103,
    domain: "Infrastructure",
    title: 'Vanguard // Analytics',
    client: 'Confidential (Logistics)',
    category: 'SaaS & Business',
    isPro: true,
    thumbnail: 'from-fuchsia-900/40 to-black',
    icon: BrainCircuit,
    tech: 'Data / Dashboards',
    link: 'https://vanguard-analytics.client.app',
    inDevelopment: true
  }
];

export const DEMO_PROJECTS: Project[] = [
  // AI & Automation
  {
    id: 1,
    domain: "AI",
    title: 'GeniusMVA // AI Analytics',
    client: 'Demo',
    category: 'AI & Automation',
    likes: '842',
    views: '15k',
    isPro: true,
    thumbnail: 'from-fuchsia-900/40 to-black',
    icon: BrainCircuit,
    tech: 'AI / Vision',
    link: 'https://geniusmva.web.app/'
  },
  {
    id: 2,
    domain: "AI",
    title: 'ThreadGenius // AI Content',
    client: 'Demo',
    category: 'AI & Automation',
    likes: '621',
    views: '9.2k',
    isPro: true,
    thumbnail: 'from-violet-900/40 to-black',
    icon: Cpu,
    tech: 'OpenAI / Social',
    link: 'https://threadgenius-8f84w.web.app/'
  },
  {
    id: 3,
    domain: "AI",
    title: 'SkillSculpt AI // Learning',
    client: 'Demo',
    category: 'AI & Automation',
    likes: '459',
    views: '7.8k',
    isPro: true,
    thumbnail: 'from-blue-900/40 to-black',
    icon: GraduationCap,
    tech: 'AI / EdTech',
    link: 'https://skillsculpt-ai-7hilu.web.app/'
  },
  {
    id: 4,
    domain: "AI",
    title: 'DevilFintech AI // FinTech Advisor',
    client: 'Demo',
    category: 'AI & Automation',
    likes: '312',
    views: '5k',
    isPro: false,
    thumbnail: 'from-emerald-900/40 to-black',
    icon: BrainCircuit,
    tech: 'Chatbot / AI',
    link: 'https://devilfintech-ai.vercel.app'
  },
  {
    id: 5,
    domain: "AI",
    title: 'NoDepression AI // Wellness',
    client: 'Demo',
    category: 'AI & Automation',
    likes: '891',
    views: '12.4k',
    isPro: true,
    thumbnail: 'from-sky-900/40 to-black',
    icon: Heart,
    tech: 'HealthTech / AI',
    link: 'https://no-depression-ai.vercel.app'
  },
  {
    id: 6,
    domain: "AI",
    title: 'Resume AI // Builder',
    client: 'Demo',
    category: 'AI & Automation',
    likes: '1.2k',
    views: '22k',
    isPro: true,
    thumbnail: 'from-violet-900/40 to-black',
    icon: Code2,
    tech: 'AI / PDF',
    link: 'https://resume-vickyiitp.vercel.app'
  },

  // EdTech & Learning
  {
    id: 7,
    domain: "Web",
    title: 'Quiz App // Interactive',
    client: 'Demo',
    category: 'EdTech & Learning',
    likes: '234',
    views: '3.1k',
    isPro: false,
    thumbnail: 'from-yellow-900/40 to-black',
    icon: GraduationCap,
    tech: 'Education / Web',
    link: 'https://quiz-app-client-plum.vercel.app/'
  },
  {
    id: 8,
    domain: "Web",
    title: 'EduStream // Classes App',
    client: 'Demo',
    category: 'EdTech & Learning',
    likes: '645',
    views: '8.4k',
    isPro: true,
    thumbnail: 'from-orange-900/40 to-black',
    icon: Globe,
    tech: 'Streaming / LMS',
    link: 'https://edu-stream-classes-app-for-cochin.vercel.app'
  },
  {
    id: 9,
    domain: "Web",
    title: 'Cosmic Genesis // EdArt',
    client: 'Demo',
    category: 'EdTech & Learning',
    likes: '912',
    views: '14k',
    isPro: true,
    thumbnail: 'from-purple-900/40 to-black',
    icon: Layout,
    tech: 'Art / Code',
    link: 'https://cosmic-genesis.vercel.app'
  },
  {
    id: 10,
    domain: "Web",
    title: 'TypeX // Typing AI',
    client: 'Demo',
    category: 'EdTech & Learning',
    likes: '456',
    views: '6.2k',
    isPro: false,
    thumbnail: 'from-slate-900/40 to-black',
    icon: Terminal,
    tech: 'Typing / Utility',
    link: 'https://typexvickyiitp.netlify.app/'
  },

  // SaaS & Business
  {
    id: 11,
    domain: "Web",
    title: 'Hisaab // Payments',
    client: 'Demo',
    category: 'SaaS & Business',
    likes: '534',
    views: '9k',
    isPro: true,
    thumbnail: 'from-green-900/40 to-black',
    icon: Layout,
    tech: 'SaaS / WhatsApp',
    link: 'https://hisaab-lac.vercel.app'
  },
  {
    id: 12,
    domain: "Web",
    title: 'Invoice Flow // Automation',
    client: 'Demo',
    category: 'SaaS & Business',
    likes: '213',
    views: '4k',
    isPro: false,
    thumbnail: 'from-blue-900/40 to-black',
    icon: Globe,
    tech: 'Invoicing / B2B',
    link: 'https://invoice-flow-automation-tool.vercel.app'
  },
  {
    id: 13,
    domain: "Web",
    title: 'ShivaTri // Startups',
    client: 'Demo',
    category: 'SaaS & Business',
    likes: '432',
    views: '6.8k',
    isPro: true,
    thumbnail: 'from-red-900/40 to-black',
    icon: Building2,
    tech: 'Legal / Utility',
    link: 'https://shiva-tri.vercel.app'
  },
  {
    id: 14,
    domain: "Web",
    title: 'Bio-Hub // Linktree',
    client: 'Demo',
    category: 'SaaS & Business',
    likes: '654',
    views: '11k',
    isPro: false,
    thumbnail: 'from-pink-900/40 to-black',
    icon: Globe,
    tech: 'Social / Links',
    link: 'https://bio-hub-demo.vercel.app'
  },
  {
    id: 15,
    domain: "Infrastructure",
    title: 'DevScript // Tool Hub',
    client: 'Demo',
    category: 'SaaS & Business',
    likes: '1.5k',
    views: '30k',
    isPro: true,
    thumbnail: 'from-zinc-900/40 to-black',
    icon: Terminal,
    tech: 'PWA / DevTools',
    link: 'https://dev-script-two.vercel.app'
  },
  {
    id: 16,
    domain: "Web",
    title: 'QR Menu Generator // Tools',
    client: 'Demo',
    category: 'SaaS & Business',
    likes: '342',
    views: '5k',
    isPro: false,
    thumbnail: 'from-gray-900/40 to-black',
    icon: Layout,
    tech: 'QR / Utility',
    link: 'https://qr-menu-generator-demo.vercel.app'
  },
  {
    id: 17,
    domain: "Web",
    title: 'Developer Portfolio // Portfolio',
    client: 'Demo',
    category: 'SaaS & Business',
    likes: '821',
    views: '13k',
    isPro: true,
    thumbnail: 'from-indigo-900/40 to-black',
    icon: Code2,
    tech: 'Portfolio / Web',
    link: 'https://developer-portfolio-bpgc.vercel.app'
  },

  // Real Estate & Agency
  {
    id: 18,
    domain: "Web",
    title: 'Prop View // Real Estate',
    client: 'Demo',
    category: 'Real Estate & Agency',
    likes: '512',
    views: '7.4k',
    isPro: true,
    thumbnail: 'from-rose-900/40 to-black',
    icon: Building2,
    tech: 'Real Estate / UI',
    link: 'https://prop-view-demo.vercel.app'
  },
  {
    id: 19,
    domain: "Web",
    title: 'Menu Craft // Hospitality',
    client: 'Demo',
    category: 'Real Estate & Agency',
    likes: '289',
    views: '4.5k',
    isPro: false,
    thumbnail: 'from-orange-900/40 to-black',
    icon: Layout,
    tech: 'Hospitality / Book',
    link: 'https://menu-craft-demo.vercel.app'
  },
  {
    id: 20,
    domain: "Web",
    title: 'Kishan Farm // E-Commerce',
    client: 'Demo',
    category: 'Real Estate & Agency',
    likes: '621',
    views: '10k',
    isPro: true,
    thumbnail: 'from-green-900/40 to-black',
    icon: Globe,
    tech: 'AgriTech / Web',
    link: 'https://kishan-farm.vercel.app'
  },
  {
    id: 21,
    domain: "Web",
    title: 'Fit Launch // Agency',
    client: 'Demo',
    category: 'Real Estate & Agency',
    likes: '445',
    views: '8.1k',
    isPro: false,
    thumbnail: 'from-blue-900/40 to-black',
    icon: Layout,
    tech: 'Fitness / Landing',
    link: 'https://fit-launch-demo.vercel.app'
  },
  {
    id: 22,
    domain: "Web",
    title: 'Indigo Lens // 3D Agency',
    client: 'Demo',
    category: 'Real Estate & Agency',
    likes: '891',
    views: '16k',
    isPro: true,
    thumbnail: 'from-violet-900/40 to-black',
    icon: Globe,
    tech: '3D / WebGL',
    link: 'https://indigolens-demo.netlify.app/'
  },

  // Utilities & Games
  {
    id: 23,
    domain: "Web",
    title: 'MindSpark Hub // Games',
    client: 'Demo',
    category: 'Utilities & Games',
    likes: '743',
    views: '12k',
    isPro: false,
    thumbnail: 'from-cyan-900/40 to-black',
    icon: Code2,
    tech: 'Gaming / JS',
    link: 'https://mindsparkhub-vickyiitp.netlify.app/'
  },
  {
    id: 24,
    domain: "Web",
    title: 'Timer & Stopwatch // Tool',
    client: 'Demo',
    category: 'Utilities & Games',
    likes: '122',
    views: '2k',
    isPro: false,
    thumbnail: 'from-gray-900/40 to-black',
    icon: Terminal,
    tech: 'Utility / Clock',
    link: 'https://timer-stopwatch-vickyiitp.netlify.app/'
  },
  {
    id: 25,
    domain: "Infrastructure",
    title: 'RapidGrab Video // Download',
    client: 'Demo',
    category: 'Utilities & Games',
    likes: '534',
    views: '9.3k',
    isPro: true,
    thumbnail: 'from-red-900/40 to-black',
    icon: Globe,
    tech: 'Media / Downloader',
    link: 'https://rapidgrab.onrender.com/'
  },
  {
    id: 26,
    domain: "Web",
    title: 'Valentine Day Gift // Fun',
    client: 'Demo',
    category: 'Utilities & Games',
    likes: '892',
    views: '18k',
    isPro: false,
    thumbnail: 'from-pink-900/40 to-black',
    icon: Heart,
    tech: 'Interactive / Fun',
    link: 'https://valentine-day-gift-inky.vercel.app'
  }
];

export const CATEGORIES = [
  "All",
  "AI",
  "Web",
  "Infrastructure"
];
