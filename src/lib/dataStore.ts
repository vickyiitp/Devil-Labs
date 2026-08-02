export interface ProjectItem {
  id: string;
  title: string;
  domain: 'AI' | 'Web' | 'Infrastructure' | string;
  client: string;
  category: string;
  industry: string;
  isPro: boolean;
  image: string;
  thumbnail?: string;
  icon?: any;
  section?: 'demo' | 'client' | string;
  tech: string;
  link: string;
  driveLink: string;
  featuredHome: boolean;
  status: 'published' | 'draft' | 'archived';
  description: string;
  likes: string;
  views: string;
  createdAt: string;
}

export interface ProductItem {
  id: string;
  title: string;
  name?: string;
  slug: string;
  priceUSD: number;
  priceINR: number;
  price?: number;
  category: string;
  industry: string;
  description: string;
  desc?: string;
  features: string[];
  image: string;
  driveLink: string;
  downloadUrl?: string;
  screenshotText?: string;
  screenshotTheme?: string;
  pricing?: { single: number; team: number };
  license?: string;
  licenseType: 'Commercial' | 'Standard' | 'Enterprise';
  docsUrl?: string;
  rating?: string;
  salesCount?: string;
  featuredHome: boolean;
  status: 'active' | 'draft' | 'archived';
  createdAt: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  industry: string;
  type: 'Article' | 'Guide' | 'Whitepaper' | 'Template' | string;
  readTime: string;
  author: string;
  date: string;
  description: string;
  desc?: string;
  summary?: string;
  content: string;
  image: string;
  driveLink: string;
  publicLink?: string;
  downloadable?: boolean;
  featuredHome: boolean;
  status: 'published' | 'draft';
  createdAt: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  feedback: string;
  rating: number;
  avatar: string;
  category: string;
  industry: string;
  featuredHome: boolean;
  createdAt: string;
}

export interface VisitorLog {
  id: string;
  timestamp: string;
  location: string;
  pageVisited: string;
  duration: string;
  action: string;
}

export interface ExitPointMetric {
  path: string;
  pageName: string;
  exitCount: number;
  stopRate: string;
  avgDuration: string;
  trend: 'up' | 'down' | 'stable';
}

export interface AnalyticsData {
  totalVisitors: number;
  totalPageViews: number;
  bounceRate: string;
  conversionRate: string;
  leadInquiriesCount: number;
  exitPoints: ExitPointMetric[];
  recentLogs: VisitorLog[];
}

export interface GitHubConfig {
  token: string;
  repo: string;
  branch: string;
  lastSynced: string | null;
}

export interface DataStoreState {
  projects: ProjectItem[];
  products: ProductItem[];
  blogs: ResourceItem[];
  testimonials: TestimonialItem[];
  categories: string[];
  industries: string[];
  analytics: AnalyticsData[];
  githubConfig: GitHubConfig;
}

const STORAGE_KEY = 'devil_labs_data_store_v2';

// INITIAL SEED DATA
const INITIAL_CATEGORIES = [
  'AI & Automation',
  'SaaS & Business',
  'EdTech & Learning',
  'Real Estate & Agency',
  'FinTech & Finance',
  'Utilities & Tools',
  'Cloud Infrastructure'
];

const INITIAL_INDUSTRIES = [
  'FinTech',
  'Healthcare',
  'Education',
  'E-Commerce',
  'Real Estate',
  'Logistics',
  'Media & Gaming',
  'Cybersecurity'
];

const INITIAL_PROJECTS: ProjectItem[] = [];

const INITIAL_PRODUCTS: ProductItem[] = [];

const INITIAL_BLOGS: ResourceItem[] = [];

const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'testi-1',
    name: 'Aarav Sharma',
    role: 'VP of Product',
    company: 'FinPulse Systems',
    feedback: 'Devil Labs delivered our enterprise AI portal in under 3 weeks with pristine code quality. Their speed and precision are unparalleled in India.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    category: 'FinTech & Finance',
    industry: 'FinTech',
    featuredHome: true,
    createdAt: '2026-01-28'
  },
  {
    id: 'testi-2',
    name: 'Elena Rostova',
    role: 'CTO',
    company: 'Vanguard Global',
    feedback: 'The WhatsApp CRM engine built by Vicky & team streamlined our lead capture by 400%. The architecture is bulletproof.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    category: 'SaaS & Business',
    industry: 'Logistics',
    featuredHome: true,
    createdAt: '2026-02-02'
  },
  {
    id: 'testi-3',
    name: 'Dr. Rahul Mehta',
    role: 'Founder',
    company: 'HealthAura Tech',
    feedback: 'Flawless execution! Their AI HIPAA compliant health portal surpassed our strict security requirements while offering a gorgeous luxury UI.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    category: 'AI & Automation',
    industry: 'Healthcare',
    featuredHome: true,
    createdAt: '2026-02-14'
  }
];

const INITIAL_ANALYTICS: AnalyticsData = {
  totalVisitors: 42850,
  totalPageViews: 184200,
  bounceRate: '24.8%',
  conversionRate: '8.4%',
  leadInquiriesCount: 142,
  exitPoints: [
    { path: '/pricing', pageName: 'Pricing & Plans', exitCount: 1420, stopRate: '34.2%', avgDuration: '1m 45s', trend: 'down' },
    { path: '/services', pageName: 'Services & Capabilities', exitCount: 910, stopRate: '22.1%', avgDuration: '2m 10s', trend: 'stable' },
    { path: '/projects', pageName: 'Projects Showcase', exitCount: 780, stopRate: '18.5%', avgDuration: '3m 15s', trend: 'up' },
    { path: '/products', pageName: 'Digital Products Store', exitCount: 620, stopRate: '14.8%', avgDuration: '2m 30s', trend: 'stable' },
    { path: '/contact', pageName: 'Contact & Inquiry Form', exitCount: 410, stopRate: '10.4%', avgDuration: '4m 05s', trend: 'up' }
  ],
  recentLogs: [
    { id: 'log-1', timestamp: '2 mins ago', location: 'Bengaluru, India', pageVisited: '/products', duration: '3m 12s', action: 'Clicked "Buy Devil Engine Kit"' },
    { id: 'log-2', timestamp: '5 mins ago', location: 'San Francisco, USA', pageVisited: '/projects', duration: '4m 45s', action: 'Opened GeniusMVA Live Demo' },
    { id: 'log-3', timestamp: '12 mins ago', location: 'London, UK', pageVisited: '/pricing', duration: '1m 20s', action: 'Switched currency to USD' },
    { id: 'log-4', timestamp: '18 mins ago', location: 'Mumbai, India', pageVisited: '/services', duration: '2m 50s', action: 'Submitted Custom AI Project Inquiry' },
    { id: 'log-5', timestamp: '25 mins ago', location: 'Singapore', pageVisited: '/resources', duration: '5m 10s', action: 'Downloaded Gemini Whitepaper PDF' }
  ]
};

const DEFAULT_GH_TOKEN = (import.meta.env?.VITE_GITHUB_TOKEN as string) || '';
const DEFAULT_GH_REPO = (import.meta.env?.VITE_GITHUB_REPO as string) || 'vickyiitp/Devil-Labs';
const DEFAULT_GH_BRANCH = (import.meta.env?.VITE_GITHUB_BRANCH as string) || 'main';

const INITIAL_GITHUB_CONFIG: GitHubConfig = {
  token: DEFAULT_GH_TOKEN,
  repo: DEFAULT_GH_REPO,
  branch: DEFAULT_GH_BRANCH,
  lastSynced: null
};

// LOAD OR INITIALIZE STORE
function getInitialStore(): DataStoreState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        projects: parsed.projects || INITIAL_PROJECTS,
        products: parsed.products || INITIAL_PRODUCTS,
        blogs: parsed.blogs || INITIAL_BLOGS,
        testimonials: parsed.testimonials || INITIAL_TESTIMONIALS,
        categories: parsed.categories || INITIAL_CATEGORIES,
        industries: parsed.industries || INITIAL_INDUSTRIES,
        analytics: parsed.analytics || [INITIAL_ANALYTICS],
        githubConfig: {
          token: parsed.githubConfig?.token || DEFAULT_GH_TOKEN,
          repo: parsed.githubConfig?.repo || DEFAULT_GH_REPO,
          branch: parsed.githubConfig?.branch || DEFAULT_GH_BRANCH,
          lastSynced: parsed.githubConfig?.lastSynced || null
        }
      };
    }
  } catch (e) {
    console.error('Failed to parse data store from localStorage', e);
  }
  return {
    projects: INITIAL_PROJECTS,
    products: INITIAL_PRODUCTS,
    blogs: INITIAL_BLOGS,
    testimonials: INITIAL_TESTIMONIALS,
    categories: INITIAL_CATEGORIES,
    industries: INITIAL_INDUSTRIES,
    analytics: [INITIAL_ANALYTICS],
    githubConfig: INITIAL_GITHUB_CONFIG
  };
}

let memoryStore: DataStoreState = getInitialStore();
const listeners = new Set<() => void>();

function notifyListeners() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memoryStore));
  } catch (e) {
    console.error('LocalStorage save failed', e);
  }
  listeners.forEach(fn => fn());

  // Auto-sync to GitHub if PAT token is configured
  if (memoryStore.githubConfig?.token) {
    dataStore.syncToGitHub().catch(err => {
      console.warn('Auto GitHub Sync Error:', err?.message || err);
    });
  }
}

export const dataStore = {
  getStore(): DataStoreState {
    return memoryStore;
  },

  subscribe(callback: () => void) {
    listeners.add(callback);
    return () => listeners.delete(callback);
  },

  resetToSeed() {
    memoryStore = {
      projects: INITIAL_PROJECTS,
      products: INITIAL_PRODUCTS,
      blogs: INITIAL_BLOGS,
      testimonials: INITIAL_TESTIMONIALS,
      categories: INITIAL_CATEGORIES,
      industries: INITIAL_INDUSTRIES,
      analytics: [INITIAL_ANALYTICS],
      githubConfig: INITIAL_GITHUB_CONFIG
    };
    notifyListeners();
  },

  // PROJECTS CRUD
  getProjects() {
    return memoryStore.projects;
  },
  getFeaturedProjects() {
    return memoryStore.projects.filter(p => p.featuredHome && p.status === 'published');
  },
  saveProject(proj: Partial<ProjectItem> & { title: string }) {
    if (proj.id) {
      memoryStore.projects = memoryStore.projects.map(p =>
        p.id === proj.id ? { ...p, ...proj } as ProjectItem : p
      );
    } else {
      const newProj: ProjectItem = {
        id: 'proj-' + Date.now(),
        title: proj.title,
        domain: proj.domain || 'AI',
        client: proj.client || 'Client',
        category: proj.category || memoryStore.categories[0],
        industry: proj.industry || memoryStore.industries[0],
        isPro: proj.isPro ?? true,
        image: proj.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
        tech: proj.tech || 'React / Node',
        link: proj.link || 'https://github.com/Devil-Labs',
        driveLink: proj.driveLink || '',
        featuredHome: proj.featuredHome ?? false,
        status: proj.status || 'published',
        description: proj.description || '',
        likes: proj.likes || '10',
        views: proj.views || '100',
        createdAt: new Date().toISOString().split('T')[0]
      };
      memoryStore.projects.unshift(newProj);
    }
    notifyListeners();
  },
  deleteProject(id: string) {
    memoryStore.projects = memoryStore.projects.filter(p => p.id !== id);
    notifyListeners();
  },

  // PRODUCTS CRUD
  getProducts() {
    return memoryStore.products;
  },
  getFeaturedProducts() {
    return memoryStore.products.filter(p => p.featuredHome && p.status === 'active');
  },
  saveProduct(prod: Partial<ProductItem> & { title: string }) {
    if (prod.id) {
      memoryStore.products = memoryStore.products.map(p =>
        p.id === prod.id ? { ...p, ...prod } as ProductItem : p
      );
    } else {
      const newProd: ProductItem = {
        id: 'prod-' + Date.now(),
        title: prod.title,
        slug: prod.slug || prod.title.toLowerCase().replace(/\s+/g, '-'),
        priceUSD: prod.priceUSD || 99,
        priceINR: prod.priceINR || 3999,
        category: prod.category || memoryStore.categories[0],
        industry: prod.industry || memoryStore.industries[0],
        description: prod.description || '',
        features: prod.features || ['Full Source Code', 'Documentation', '1 Year Updates'],
        image: prod.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
        driveLink: prod.driveLink || '',
        featuredHome: prod.featuredHome ?? false,
        status: prod.status || 'active',
        licenseType: prod.licenseType || 'Commercial',
        createdAt: new Date().toISOString().split('T')[0]
      };
      memoryStore.products.unshift(newProd);
    }
    notifyListeners();
  },
  deleteProduct(id: string) {
    memoryStore.products = memoryStore.products.filter(p => p.id !== id);
    notifyListeners();
  },

  // BLOGS CRUD
  getBlogs() {
    return memoryStore.blogs;
  },
  getFeaturedBlogs() {
    return memoryStore.blogs.filter(b => b.featuredHome && b.status === 'published');
  },
  saveBlog(blog: Partial<ResourceItem> & { title: string }) {
    if (blog.id) {
      memoryStore.blogs = memoryStore.blogs.map(b =>
        b.id === blog.id ? { ...b, ...blog } as ResourceItem : b
      );
    } else {
      const newBlog: ResourceItem = {
        id: 'blog-' + Date.now(),
        title: blog.title,
        slug: blog.slug || blog.title.toLowerCase().replace(/\s+/g, '-'),
        category: blog.category || memoryStore.categories[0],
        industry: blog.industry || memoryStore.industries[0],
        type: blog.type || 'Guide',
        readTime: blog.readTime || '5 min read',
        author: blog.author || 'Devil Labs Team',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        description: blog.description || '',
        content: blog.content || '',
        image: blog.image || 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80',
        driveLink: blog.driveLink || '',
        featuredHome: blog.featuredHome ?? false,
        status: blog.status || 'published',
        createdAt: new Date().toISOString().split('T')[0]
      };
      memoryStore.blogs.unshift(newBlog);
    }
    notifyListeners();
  },
  deleteBlog(id: string) {
    memoryStore.blogs = memoryStore.blogs.filter(b => b.id !== id);
    notifyListeners();
  },

  // TESTIMONIALS CRUD
  getTestimonials() {
    return memoryStore.testimonials;
  },
  getFeaturedTestimonials() {
    return memoryStore.testimonials.filter(t => t.featuredHome);
  },
  saveTestimonial(testi: Partial<TestimonialItem> & { name: string; feedback: string }) {
    if (testi.id) {
      memoryStore.testimonials = memoryStore.testimonials.map(t =>
        t.id === testi.id ? { ...t, ...testi } as TestimonialItem : t
      );
    } else {
      const newTesti: TestimonialItem = {
        id: 'testi-' + Date.now(),
        name: testi.name,
        role: testi.role || 'Client',
        company: testi.company || 'Enterprise',
        feedback: testi.feedback,
        rating: testi.rating || 5,
        avatar: testi.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        category: testi.category || memoryStore.categories[0],
        industry: testi.industry || memoryStore.industries[0],
        featuredHome: testi.featuredHome ?? true,
        createdAt: new Date().toISOString().split('T')[0]
      };
      memoryStore.testimonials.unshift(newTesti);
    }
    notifyListeners();
  },
  deleteTestimonial(id: string) {
    memoryStore.testimonials = memoryStore.testimonials.filter(t => t.id !== id);
    notifyListeners();
  },

  // CATEGORIES & INDUSTRIES
  addCategory(name: string) {
    if (name && !memoryStore.categories.includes(name)) {
      memoryStore.categories.push(name);
      notifyListeners();
    }
  },
  deleteCategory(name: string) {
    memoryStore.categories = memoryStore.categories.filter(c => c !== name);
    notifyListeners();
  },
  addIndustry(name: string) {
    if (name && !memoryStore.industries.includes(name)) {
      memoryStore.industries.push(name);
      notifyListeners();
    }
  },
  deleteIndustry(name: string) {
    memoryStore.industries = memoryStore.industries.filter(i => i !== name);
    notifyListeners();
  },

  // GITHUB TOKEN SYNC
  saveGitHubConfig(config: GitHubConfig) {
    memoryStore.githubConfig = config;
    notifyListeners();
  },

  async syncToGitHub(): Promise<{ success: boolean; message: string }> {
    const { token, repo, branch } = memoryStore.githubConfig;
    if (!token) {
      return { success: false, message: 'Please provide a valid GitHub Personal Access Token (PAT) first.' };
    }

    try {
      const path = 'devil_labs_data.json';
      const cleanRepo = repo.replace('https://github.com/', '').replace('.git', '');
      const url = `https://api.github.com/repos/${cleanRepo}/contents/${path}`;
      const contentBase64 = btoa(unescape(encodeURIComponent(JSON.stringify(memoryStore, null, 2))));

      // Check if file exists to get SHA
      let sha: string | undefined = undefined;
      try {
        const getRes = await fetch(`${url}?ref=${branch || 'main'}`, {
          headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        });
        if (getRes.ok) {
          const getData = await getRes.json();
          sha = getData.sha;
        }
      } catch (e) {
        // file doesn't exist yet
      }

      const bodyData: any = {
        message: `[Devil Labs Admin Sync] Update data.json (${new Date().toLocaleString()})`,
        content: contentBase64,
        branch: branch || 'main'
      };
      if (sha) bodyData.sha = sha;

      const putRes = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify(bodyData)
      });

      if (!putRes.ok) {
        const errJson = await putRes.json().catch(() => ({}));
        throw new Error(errJson.message || `GitHub API error (${putRes.status})`);
      }

      memoryStore.githubConfig.lastSynced = new Date().toLocaleString();
      notifyListeners();
      return { success: true, message: `Successfully committed and pushed data to GitHub repository ${cleanRepo}!` };
    } catch (err: any) {
      console.error('GitHub Sync Failed:', err);
      return { success: false, message: err.message || 'Failed to push to GitHub.' };
    }
  }
};
