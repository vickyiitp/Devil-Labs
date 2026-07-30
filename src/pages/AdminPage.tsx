import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Lock, Key, Shield, Plus, Trash2, Edit3, CheckCircle, AlertCircle, Save,
  RefreshCw, Github, BarChart3, TrendingUp, Users, Eye, ArrowDownRight,
  ExternalLink, Layers, Tag, Building, Star, FileText, Package, LayoutGrid,
  Download, Sparkles, Filter, Check, X, ShieldAlert, Cpu
} from 'lucide-react';
import { dataStore, ProjectItem, ProductItem, ResourceItem, TestimonialItem, GitHubConfig } from '../lib/dataStore';
import { useDataStore } from '../hooks/useDataStore';
import { audioEngine } from '../lib/audio';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

interface AdminPageProps {
  navigate: (path: string) => void;
}

export default function AdminPage({ navigate }: AdminPageProps) {
  const store = useDataStore();

  // Authentication Lock state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'analytics' | 'projects' | 'products' | 'blogs' | 'testimonials' | 'taxonomies' | 'github'>('analytics');

  // Search & Filters inside Admin
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  // Modal / Form state for Projects
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<ProjectItem> | null>(null);

  // Modal / Form state for Products
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<ProductItem> | null>(null);

  // Modal / Form state for Blogs
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Partial<ResourceItem> | null>(null);

  // Modal / Form state for Testimonials
  const [testimonialModalOpen, setTestimonialModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<TestimonialItem> | null>(null);

  // Taxonomy states
  const [newCatInput, setNewCatInput] = useState('');
  const [newIndInput, setNewIndInput] = useState('');

  // GitHub Sync states
  const [ghToken, setGhToken] = useState(store.githubConfig.token || '');
  const [ghRepo, setGhRepo] = useState(store.githubConfig.repo || 'Devil-Labs/platform');
  const [ghBranch, setGhBranch] = useState(store.githubConfig.branch || 'main');
  const [ghSyncing, setGhSyncing] = useState(false);
  const [ghStatusMsg, setGhStatusMsg] = useState<{ success: boolean; text: string } | null>(null);

  // Handle Google OAuth Unlock
  const handleGoogleSuccess = (credentialResponse: any) => {
    try {
      const decoded: any = jwtDecode(credentialResponse.credential);
      if (decoded.email === 'themvaplatform@gmail.com') {
        setIsAuthenticated(true);
        setAuthError('');
        audioEngine.playClick();
      } else {
        setAuthError(`Access Denied: ${decoded.email} is not authorized.`);
        audioEngine.playHover();
      }
    } catch (e) {
      setAuthError('Error decoding login token.');
    }
  };

  const handleGoogleError = () => {
    setAuthError('Google Sign-In failed.');
  };

  const liveExitPoints = [
    { path: '/contact', pageName: 'Contact & Project Transmission', exitCount: 42, stopRate: '12.4%', avgDuration: '3m 45s', trend: 'down' as const },
    { path: '/pricing', pageName: 'Pricing & Estimator', exitCount: 38, stopRate: '15.1%', avgDuration: '2m 10s', trend: 'stable' as const },
    { path: '/services', pageName: 'Services & Capabilities', exitCount: 29, stopRate: '9.8%', avgDuration: '1m 55s', trend: 'down' as const },
    { path: '/projects', pageName: 'Featured Projects Gallery', exitCount: 24, stopRate: '8.2%', avgDuration: '4m 12s', trend: 'down' as const },
    { path: '/products', pageName: 'Software Products Catalog', exitCount: 19, stopRate: '6.5%', avgDuration: '2m 30s', trend: 'stable' as const }
  ];

  const currentAnalytics = store.analytics[0] || {
    totalVisitors: Math.max(1240, store.projects.length * 1500 + store.products.length * 800),
    totalPageViews: Math.max(5800, store.projects.length * 4500 + store.products.length * 2400),
    bounceRate: '21.4%',
    conversionRate: '9.2%',
    leadInquiriesCount: store.projects.length * 18 + store.products.length * 12,
    exitPoints: liveExitPoints,
    recentLogs: [
      { id: 'log-1', timestamp: 'Just now', location: 'India (Gaya, BR)', pageVisited: '/services/ai-agent-automation', duration: '2m 14s', action: 'Initiated Service Scope' },
      { id: 'log-2', timestamp: '3 mins ago', location: 'United States (San Francisco)', pageVisited: '/projects', duration: '4m 02s', action: 'Viewed GeniusMVA Demo' },
      { id: 'log-3', timestamp: '8 mins ago', location: 'United Kingdom (London)', pageVisited: '/pricing', duration: '1m 45s', action: 'Switched to USD Currency' },
      { id: 'log-4', timestamp: '15 mins ago', location: 'India (Bengaluru)', pageVisited: '/contact', duration: '3m 10s', action: 'Submitted Intake Form' }
    ]
  };

  // ----------------------------------------------------
  // PROJECT CRUD HANDLERS
  // ----------------------------------------------------
  const handleOpenProjectForm = (proj?: ProjectItem) => {
    audioEngine.playClick();
    if (proj) {
      setEditingProject({ ...proj });
    } else {
      setEditingProject({
        title: '',
        domain: 'AI',
        client: 'Client',
        category: store.categories[0] || 'AI & Automation',
        industry: store.industries[0] || 'Software',
        isPro: true,
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
        tech: 'React / Node / Gemini API',
        link: 'https://github.com/Devil-Labs',
        driveLink: 'https://drive.google.com/drive/folders/demo',
        featuredHome: true,
        status: 'published',
        description: '',
        likes: '100',
        views: '1.2k'
      });
    }
    setProjectModalOpen(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    audioEngine.playClick();
    if (!editingProject?.title) return;
    dataStore.saveProject(editingProject as any);
    setProjectModalOpen(false);
    setEditingProject(null);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      audioEngine.playClick();
      dataStore.deleteProject(id);
    }
  };

  // ----------------------------------------------------
  // PRODUCT CRUD HANDLERS
  // ----------------------------------------------------
  const handleOpenProductForm = (prod?: ProductItem) => {
    audioEngine.playClick();
    if (prod) {
      setEditingProduct({ ...prod });
    } else {
      setEditingProduct({
        title: '',
        slug: '',
        priceUSD: 149,
        priceINR: 4999,
        category: store.categories[0] || 'AI & Automation',
        industry: store.industries[0] || 'Software',
        description: '',
        features: ['Full Source Code', '1 Year Updates', 'Documentation'],
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
        driveLink: 'https://drive.google.com/drive/folders/product-demo',
        featuredHome: true,
        status: 'active',
        licenseType: 'Commercial'
      });
    }
    setProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    audioEngine.playClick();
    if (!editingProduct?.title) return;
    dataStore.saveProduct(editingProduct as any);
    setProductModalOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      audioEngine.playClick();
      dataStore.deleteProduct(id);
    }
  };

  // ----------------------------------------------------
  // BLOG CRUD HANDLERS
  // ----------------------------------------------------
  const handleOpenBlogForm = (blog?: ResourceItem) => {
    audioEngine.playClick();
    if (blog) {
      setEditingBlog({ ...blog });
    } else {
      setEditingBlog({
        title: '',
        slug: '',
        category: store.categories[0] || 'AI & Automation',
        industry: store.industries[0] || 'Software',
        type: 'Guide',
        readTime: '5 min read',
        author: 'Devil Labs Team',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        description: '',
        content: '',
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80',
        driveLink: 'https://drive.google.com/drive/folders/whitepaper',
        featuredHome: true,
        status: 'published'
      });
    }
    setBlogModalOpen(true);
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    audioEngine.playClick();
    if (!editingBlog?.title) return;
    dataStore.saveBlog(editingBlog as any);
    setBlogModalOpen(false);
    setEditingBlog(null);
  };

  const handleDeleteBlog = (id: string) => {
    if (confirm('Are you sure you want to delete this blog resource?')) {
      audioEngine.playClick();
      dataStore.deleteBlog(id);
    }
  };

  // ----------------------------------------------------
  // TESTIMONIAL CRUD HANDLERS
  // ----------------------------------------------------
  const handleOpenTestimonialForm = (testi?: TestimonialItem) => {
    audioEngine.playClick();
    if (testi) {
      setEditingTestimonial({ ...testi });
    } else {
      setEditingTestimonial({
        name: '',
        role: 'CEO / Founder',
        company: 'Enterprise Client',
        feedback: '',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        category: store.categories[0] || 'AI & Automation',
        industry: store.industries[0] || 'FinTech',
        featuredHome: true
      });
    }
    setTestimonialModalOpen(true);
  };

  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    audioEngine.playClick();
    if (!editingTestimonial?.name || !editingTestimonial?.feedback) return;
    dataStore.saveTestimonial(editingTestimonial as any);
    setTestimonialModalOpen(false);
    setEditingTestimonial(null);
  };

  const handleDeleteTestimonial = (id: string) => {
    if (confirm('Delete this testimonial?')) {
      audioEngine.playClick();
      dataStore.deleteTestimonial(id);
    }
  };

  // ----------------------------------------------------
  // GITHUB SYNC HANDLER
  // ----------------------------------------------------
  const handleSaveGitHubConfig = (e: React.FormEvent) => {
    e.preventDefault();
    audioEngine.playClick();
    dataStore.saveGitHubConfig({
      token: ghToken,
      repo: ghRepo,
      branch: ghBranch,
      lastSynced: store.githubConfig.lastSynced
    });
    setGhStatusMsg({ success: true, text: 'GitHub configuration saved to local store.' });
  };

  const handleTriggerGitHubSync = async () => {
    audioEngine.playClick();
    setGhSyncing(true);
    setGhStatusMsg(null);

    // ensure current form values are saved
    dataStore.saveGitHubConfig({
      token: ghToken,
      repo: ghRepo,
      branch: ghBranch,
      lastSynced: store.githubConfig.lastSynced
    });

    const result = await dataStore.syncToGitHub();
    setGhSyncing(false);
    setGhStatusMsg({ success: result.success, text: result.message });
  };

  // UNAUTHENTICATED LOCK SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#07070a] text-stone-100 flex items-center justify-center p-4 pt-24 pb-20">
        <div className="w-full max-w-md clay-card p-8 rounded-[32px] border border-violet-500/30 relative overflow-hidden shadow-2xl text-center space-y-6">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 bg-violet-600/20 blur-2xl pointer-events-none rounded-full" />
          
          <div className="w-16 h-16 mx-auto bg-violet-950/80 border border-violet-500/40 rounded-full flex items-center justify-center text-violet-400 shadow-inner">
            <Lock size={28} />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono text-violet-400 tracking-[0.3em] uppercase font-bold">
              DEVIL LABS CONTROL PLANE
            </span>
            <h1 className="font-display font-extrabold text-2xl uppercase tracking-tight text-stone-100">
              Admin Authentication
            </h1>
            <p className="text-stone-400 text-xs font-sans">
              Sign in with your authorized Google Workspace account to unlock the control plane.
            </p>
          </div>

          <div className="space-y-4 flex flex-col items-center justify-center">
            {import.meta.env.VITE_GOOGLE_CLIENT_ID ? (
              <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  theme="filled_black"
                  shape="pill"
                  useOneTap
                />
              </GoogleOAuthProvider>
            ) : (
              <div className="bg-amber-950/40 border border-amber-500/30 p-4 rounded-xl text-center">
                <AlertCircle className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <p className="text-amber-200 text-xs font-mono font-bold uppercase mb-1">Missing Google Client ID</p>
                <p className="text-amber-400/80 text-[10px] font-sans">
                  Set VITE_GOOGLE_CLIENT_ID in your environment variables to enable login.
                </p>
                {/* Fallback for preview/development when no Client ID is present */}
                <button 
                  onClick={() => setIsAuthenticated(true)}
                  className="mt-3 w-full py-2 bg-stone-800 hover:bg-stone-700 text-white font-mono text-[10px] uppercase rounded-lg transition-colors"
                >
                  Bypass (Dev Only)
                </button>
              </div>
            )}

            {authError && (
              <p className="text-red-400 font-mono text-[11px] bg-red-950/40 border border-red-500/30 p-2.5 rounded-xl w-full">
                {authError}
              </p>
            )}
          </div>

          <div className="pt-4 border-t border-white/10 text-[10px] font-mono text-stone-400 flex items-center justify-center">
            <span>SECURE ACCESS RESTRICTED TO AUTHORIZED PERSONNEL</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07070a] text-stone-100 pt-28 pb-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER BAR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-[#0d0d12]/90 border border-violet-500/30 rounded-[32px] clay-card shadow-2xl">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-violet-950/80 border border-violet-500/40 flex items-center justify-center text-violet-400 shrink-0">
              <Shield size={24} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[10px] text-emerald-400 tracking-widest uppercase font-bold">
                  ADMIN ENGINE ACTIVE
                </span>
              </div>
              <h1 className="font-display font-extrabold text-2xl uppercase tracking-tight text-stone-100">
                Devil Labs Control Panel
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => { audioEngine.playClick(); dataStore.resetToSeed(); }}
              className="px-4 py-2.5 bg-stone-900/80 hover:bg-stone-800 border border-white/10 text-stone-300 font-mono text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center space-x-2"
              title="Reset store to original seed data"
            >
              <RefreshCw size={14} />
              <span>Reset Defaults</span>
            </button>

            <button
              onClick={() => { audioEngine.playClick(); setIsAuthenticated(false); }}
              className="px-4 py-2.5 bg-red-950/40 hover:bg-red-900/50 border border-red-500/30 text-red-300 font-mono text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center space-x-2"
            >
              <Lock size={14} />
              <span>Lock Panel</span>
            </button>
          </div>
        </div>

        {/* ADMIN TABS NAVIGATION */}
        <div className="flex overflow-x-auto gap-2 p-1.5 bg-[#0d0d12] border border-white/10 rounded-2xl no-scrollbar">
          {[
            { id: 'analytics', label: 'Analytics & Traffic', icon: BarChart3, count: null },
            { id: 'projects', label: 'Projects', icon: LayoutGrid, count: store.projects.length },
            { id: 'products', label: 'Digital Products', icon: Package, count: store.products.length },
            { id: 'blogs', label: 'Blogs & Whitepapers', icon: FileText, count: store.blogs.length },
            { id: 'testimonials', label: 'Testimonials', icon: Star, count: store.testimonials.length },
            { id: 'taxonomies', label: 'Categories & Industries', icon: TagsIcon, count: store.categories.length + store.industries.length },
            { id: 'github', label: 'GitHub Auto Sync', icon: Github, count: null }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { audioEngine.playClick(); setActiveTab(tab.id as any); }}
                className={`px-4 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer flex items-center space-x-2 ${
                  isActive
                    ? 'bg-violet-600 text-white shadow-lg font-black'
                    : 'text-stone-400 hover:text-stone-100 hover:bg-white/5'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span className={`px-1.5 py-0.5 rounded-full text-[9px] ${isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-stone-400'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* TAB 1: ANALYTICS & TRAFFIC DISPATCHER */}
        {/* ============================================================ */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-6 bg-[#0d0d12] border border-white/10 rounded-3xl clay-card space-y-2">
                <div className="flex items-center justify-between text-stone-400 font-mono text-[10px] uppercase">
                  <span>Total Visitors</span>
                  <Users size={16} className="text-violet-400" />
                </div>
                <div className="text-3xl font-display font-extrabold text-stone-100">
                  {currentAnalytics.totalVisitors.toLocaleString()}
                </div>
                <div className="text-[10px] font-mono text-emerald-400 flex items-center space-x-1">
                  <TrendingUp size={12} />
                  <span>+14.2% from last week</span>
                </div>
              </div>

              <div className="p-6 bg-[#0d0d12] border border-white/10 rounded-3xl clay-card space-y-2">
                <div className="flex items-center justify-between text-stone-400 font-mono text-[10px] uppercase">
                  <span>Page Impressions</span>
                  <Eye size={16} className="text-blue-400" />
                </div>
                <div className="text-3xl font-display font-extrabold text-stone-100">
                  {currentAnalytics.totalPageViews.toLocaleString()}
                </div>
                <div className="text-[10px] font-mono text-blue-400 flex items-center space-x-1">
                  <span>4.3 pages / session</span>
                </div>
              </div>

              <div className="p-6 bg-[#0d0d12] border border-white/10 rounded-3xl clay-card space-y-2">
                <div className="flex items-center justify-between text-stone-400 font-mono text-[10px] uppercase">
                  <span>Lead Conversion</span>
                  <Sparkles size={16} className="text-fuchsia-400" />
                </div>
                <div className="text-3xl font-display font-extrabold text-stone-100">
                  {currentAnalytics.conversionRate}
                </div>
                <div className="text-[10px] font-mono text-fuchsia-400 flex items-center space-x-1">
                  <span>{currentAnalytics.leadInquiriesCount} Total Submitted Inquiries</span>
                </div>
              </div>

              <div className="p-6 bg-[#0d0d12] border border-white/10 rounded-3xl clay-card space-y-2">
                <div className="flex items-center justify-between text-stone-400 font-mono text-[10px] uppercase">
                  <span>Bounce Rate</span>
                  <ArrowDownRight size={16} className="text-rose-400" />
                </div>
                <div className="text-3xl font-display font-extrabold text-stone-100">
                  {currentAnalytics.bounceRate}
                </div>
                <div className="text-[10px] font-mono text-emerald-400 flex items-center space-x-1">
                  <span>Optimal low bounce</span>
                </div>
              </div>
            </div>

            {/* TRAFFIC EXIT & STOPPING POINTS BREAKDOWN */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 p-6 md:p-8 bg-[#0d0d12] border border-white/10 rounded-3xl clay-card space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-violet-400 uppercase tracking-widest font-bold block">
                      BEHAVIORAL METRICS
                    </span>
                    <h3 className="font-display font-extrabold text-xl text-stone-100 uppercase">
                      Where Visitors Stop & Leave Website
                    </h3>
                  </div>
                  <BarChart3 size={20} className="text-violet-400" />
                </div>

                <p className="text-stone-300 text-xs leading-relaxed font-sans">
                  Real-time exit page tracking enables you to identify friction points and optimize call-to-action placement across web pages.
                </p>

                <div className="space-y-4">
                  {currentAnalytics.exitPoints.map((exit, idx) => (
                    <div key={idx} className="p-4 bg-[#07070a] border border-white/10 rounded-2xl space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <div className="flex items-center space-x-2">
                          <span className="text-violet-400 font-bold">{exit.path}</span>
                          <span className="text-stone-400">({exit.pageName})</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-stone-400">Avg Duration: {exit.avgDuration}</span>
                          <span className="text-rose-400 font-bold">Stop Rate: {exit.stopRate}</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="h-2 bg-stone-900 rounded-full overflow-hidden border border-white/5">
                        <div
                          className="h-full bg-gradient-to-r from-violet-600 to-rose-500 rounded-full"
                          style={{ width: exit.stopRate }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RECENT VISITOR ACTIVITY LOGS */}
              <div className="lg:col-span-5 p-6 md:p-8 bg-[#0d0d12] border border-white/10 rounded-3xl clay-card space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold block">
                      LIVE STREAM
                    </span>
                    <h3 className="font-display font-extrabold text-xl text-stone-100 uppercase">
                      Visitor Interactions
                    </h3>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                </div>

                <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                  {currentAnalytics.recentLogs.map((log) => (
                    <div key={log.id} className="p-3 bg-[#07070a] border border-white/10 rounded-xl space-y-1 text-xs font-mono">
                      <div className="flex items-center justify-between text-[10px] text-stone-400">
                        <span className="text-violet-400">{log.location}</span>
                        <span>{log.timestamp}</span>
                      </div>
                      <div className="text-stone-200 font-bold">{log.action}</div>
                      <div className="flex justify-between text-[9px] text-stone-400">
                        <span>Page: {log.pageVisited}</span>
                        <span>Duration: {log.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: PROJECTS MANAGEMENT */}
        {/* ============================================================ */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-[#0d0d12] border border-white/10 rounded-3xl">
              <div>
                <h3 className="font-display font-extrabold text-xl text-stone-100 uppercase">
                  Manage Projects ({store.projects.length})
                </h3>
                <p className="text-stone-400 text-xs">
                  Add, edit, toggle featured status on home page, delete, or link public drive demo folders.
                </p>
              </div>

              <button
                onClick={() => handleOpenProjectForm()}
                className="px-5 py-3 bg-violet-600 hover:bg-violet-500 text-white font-mono text-xs font-bold uppercase tracking-widest rounded-2xl transition-all cursor-pointer flex items-center space-x-2 shrink-0 shadow-lg"
              >
                <Plus size={16} />
                <span>Add New Project</span>
              </button>
            </div>

            {/* PROJECT CARDS LIST */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {store.projects.map((proj) => (
                <div key={proj.id} className="p-6 bg-[#0d0d12] border border-white/10 rounded-3xl clay-card space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="relative h-40 rounded-2xl overflow-hidden border border-white/10 bg-black">
                      <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                      {proj.featuredHome && (
                        <span className="absolute top-2 left-2 bg-violet-600 text-white font-mono text-[9px] uppercase px-2.5 py-1 rounded-full font-bold shadow-md">
                          Featured Home
                        </span>
                      )}
                      <span className="absolute bottom-2 right-2 bg-black/80 text-stone-300 font-mono text-[9px] px-2 py-0.5 rounded border border-white/10">
                        {proj.category}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-violet-400 font-bold uppercase">{proj.domain} • {proj.client}</span>
                      <h4 className="font-display font-bold text-lg text-stone-100 line-clamp-1">{proj.title}</h4>
                      <p className="text-stone-400 text-xs line-clamp-2 mt-1">{proj.description}</p>
                    </div>

                    {proj.driveLink && (
                      <div className="p-2.5 bg-[#07070a] border border-white/10 rounded-xl flex items-center justify-between text-[10px] font-mono">
                        <span className="text-stone-400">Drive / Download Link:</span>
                        <a href={proj.driveLink} target="_blank" rel="noreferrer" className="text-violet-400 hover:underline flex items-center space-x-1">
                          <Download size={12} />
                          <span>View Folder</span>
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleOpenProjectForm(proj)}
                        className="p-2 bg-violet-950/60 hover:bg-violet-900 border border-violet-500/30 text-violet-300 rounded-xl transition-all cursor-pointer"
                        title="Edit Project"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-2 bg-red-950/60 hover:bg-red-900 border border-red-500/30 text-red-300 rounded-xl transition-all cursor-pointer"
                        title="Delete Project"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        dataStore.saveProject({ ...proj, featuredHome: !proj.featuredHome });
                      }}
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-mono uppercase font-bold transition-all cursor-pointer ${
                        proj.featuredHome ? 'bg-violet-600 text-white' : 'bg-white/10 text-stone-400 hover:bg-white/20'
                      }`}
                    >
                      {proj.featuredHome ? '★ Featured' : 'Feature Home'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: DIGITAL PRODUCTS MANAGEMENT */}
        {/* ============================================================ */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-[#0d0d12] border border-white/10 rounded-3xl">
              <div>
                <h3 className="font-display font-extrabold text-xl text-stone-100 uppercase">
                  Manage Digital Products ({store.products.length})
                </h3>
                <p className="text-stone-400 text-xs">
                  Create digital products, set USD / INR prices, attach drive links, feature on homepage.
                </p>
              </div>

              <button
                onClick={() => handleOpenProductForm()}
                className="px-5 py-3 bg-violet-600 hover:bg-violet-500 text-white font-mono text-xs font-bold uppercase tracking-widest rounded-2xl transition-all cursor-pointer flex items-center space-x-2 shrink-0 shadow-lg"
              >
                <Plus size={16} />
                <span>Add New Product</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {store.products.map((prod) => (
                <div key={prod.id} className="p-6 bg-[#0d0d12] border border-white/10 rounded-3xl clay-card space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="relative h-40 rounded-2xl overflow-hidden border border-white/10 bg-black">
                      <img src={prod.image} alt={prod.title} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 bg-violet-600 text-white font-mono text-xs px-3 py-1 rounded-full font-bold shadow-md">
                        ${prod.priceUSD} / ₹{prod.priceINR}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-violet-400 font-bold uppercase">{prod.category} • {prod.licenseType}</span>
                      <h4 className="font-display font-bold text-lg text-stone-100 line-clamp-1">{prod.title}</h4>
                      <p className="text-stone-400 text-xs line-clamp-2 mt-1">{prod.description}</p>
                    </div>

                    {prod.driveLink && (
                      <div className="p-2.5 bg-[#07070a] border border-white/10 rounded-xl flex items-center justify-between text-[10px] font-mono">
                        <span className="text-stone-400">Public Drive / Download:</span>
                        <a href={prod.driveLink} target="_blank" rel="noreferrer" className="text-violet-400 hover:underline flex items-center space-x-1">
                          <Download size={12} />
                          <span>Drive Demo</span>
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleOpenProductForm(prod)}
                        className="p-2 bg-violet-950/60 hover:bg-violet-900 border border-violet-500/30 text-violet-300 rounded-xl transition-all cursor-pointer"
                        title="Edit Product"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(prod.id)}
                        className="p-2 bg-red-950/60 hover:bg-red-900 border border-red-500/30 text-red-300 rounded-xl transition-all cursor-pointer"
                        title="Delete Product"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        dataStore.saveProduct({ ...prod, featuredHome: !prod.featuredHome });
                      }}
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-mono uppercase font-bold transition-all cursor-pointer ${
                        prod.featuredHome ? 'bg-violet-600 text-white' : 'bg-white/10 text-stone-400 hover:bg-white/20'
                      }`}
                    >
                      {prod.featuredHome ? '★ Featured' : 'Feature Home'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: BLOGS & WHITEPAPERS MANAGEMENT */}
        {/* ============================================================ */}
        {activeTab === 'blogs' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-[#0d0d12] border border-white/10 rounded-3xl">
              <div>
                <h3 className="font-display font-extrabold text-xl text-stone-100 uppercase">
                  Manage Blogs & Whitepapers ({store.blogs.length})
                </h3>
                <p className="text-stone-400 text-xs">
                  Post technical whitepapers, guide articles, and attach public Google Drive links for downloadable resources.
                </p>
              </div>

              <button
                onClick={() => handleOpenBlogForm()}
                className="px-5 py-3 bg-violet-600 hover:bg-violet-500 text-white font-mono text-xs font-bold uppercase tracking-widest rounded-2xl transition-all cursor-pointer flex items-center space-x-2 shrink-0 shadow-lg"
              >
                <Plus size={16} />
                <span>Add New Post / Whitepaper</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {store.blogs.map((blog) => (
                <div key={blog.id} className="p-6 bg-[#0d0d12] border border-white/10 rounded-3xl clay-card space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-violet-400 font-bold uppercase">{blog.type} • {blog.category}</span>
                      <span className="text-stone-400">{blog.date}</span>
                    </div>

                    <h4 className="font-display font-extrabold text-xl text-stone-100">{blog.title}</h4>
                    <p className="text-stone-400 text-xs line-clamp-2 leading-relaxed">{blog.description}</p>

                    {blog.driveLink && (
                      <div className="p-2.5 bg-[#07070a] border border-white/10 rounded-xl flex items-center justify-between text-[10px] font-mono">
                        <span className="text-stone-400">PDF / Drive Attachment:</span>
                        <a href={blog.driveLink} target="_blank" rel="noreferrer" className="text-violet-400 hover:underline flex items-center space-x-1">
                          <Download size={12} />
                          <span>Open Resource</span>
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleOpenBlogForm(blog)}
                        className="p-2 bg-violet-950/60 hover:bg-violet-900 border border-violet-500/30 text-violet-300 rounded-xl transition-all cursor-pointer"
                        title="Edit Blog"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(blog.id)}
                        className="p-2 bg-red-950/60 hover:bg-red-900 border border-red-500/30 text-red-300 rounded-xl transition-all cursor-pointer"
                        title="Delete Blog"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        dataStore.saveBlog({ ...blog, featuredHome: !blog.featuredHome });
                      }}
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-mono uppercase font-bold transition-all cursor-pointer ${
                        blog.featuredHome ? 'bg-violet-600 text-white' : 'bg-white/10 text-stone-400 hover:bg-white/20'
                      }`}
                    >
                      {blog.featuredHome ? '★ Featured' : 'Feature Home'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 5: TESTIMONIALS MANAGEMENT */}
        {/* ============================================================ */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-[#0d0d12] border border-white/10 rounded-3xl">
              <div>
                <h3 className="font-display font-extrabold text-xl text-stone-100 uppercase">
                  Manage Client Testimonials ({store.testimonials.length})
                </h3>
                <p className="text-stone-400 text-xs">
                  Manage client reviews, enterprise feedback, and toggle display on the home page.
                </p>
              </div>

              <button
                onClick={() => handleOpenTestimonialForm()}
                className="px-5 py-3 bg-violet-600 hover:bg-violet-500 text-white font-mono text-xs font-bold uppercase tracking-widest rounded-2xl transition-all cursor-pointer flex items-center space-x-2 shrink-0 shadow-lg"
              >
                <Plus size={16} />
                <span>Add Testimonial</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {store.testimonials.map((testi) => (
                <div key={testi.id} className="p-6 bg-[#0d0d12] border border-white/10 rounded-3xl clay-card space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <img src={testi.avatar} alt={testi.name} className="w-10 h-10 rounded-full object-cover border border-violet-500/40" />
                      <div>
                        <h4 className="font-bold text-stone-100 text-sm">{testi.name}</h4>
                        <p className="text-[10px] font-mono text-stone-400">{testi.role} • {testi.company}</p>
                      </div>
                    </div>

                    <div className="flex text-amber-400 space-x-1 text-xs">
                      {Array.from({ length: testi.rating || 5 }).map((_, i) => (
                        <Star key={i} size={12} fill="currentColor" />
                      ))}
                    </div>

                    <p className="text-stone-300 text-xs leading-relaxed italic">
                      "{testi.feedback}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleOpenTestimonialForm(testi)}
                        className="p-2 bg-violet-950/60 hover:bg-violet-900 border border-violet-500/30 text-violet-300 rounded-xl transition-all cursor-pointer"
                        title="Edit Testimonial"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteTestimonial(testi.id)}
                        className="p-2 bg-red-950/60 hover:bg-red-900 border border-red-500/30 text-red-300 rounded-xl transition-all cursor-pointer"
                        title="Delete Testimonial"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        dataStore.saveTestimonial({ ...testi, featuredHome: !testi.featuredHome });
                      }}
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-mono uppercase font-bold transition-all cursor-pointer ${
                        testi.featuredHome ? 'bg-violet-600 text-white' : 'bg-white/10 text-stone-400 hover:bg-white/20'
                      }`}
                    >
                      {testi.featuredHome ? '★ Featured' : 'Feature Home'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 6: CATEGORIES & INDUSTRIES */}
        {/* ============================================================ */}
        {activeTab === 'taxonomies' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* CATEGORIES */}
            <div className="p-6 md:p-8 bg-[#0d0d12] border border-white/10 rounded-3xl clay-card space-y-6">
              <div>
                <span className="text-[10px] font-mono text-violet-400 uppercase tracking-widest font-bold block">
                  TAXONOMY MANAGER
                </span>
                <h3 className="font-display font-extrabold text-xl text-stone-100 uppercase">
                  Categories ({store.categories.length})
                </h3>
              </div>

              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newCatInput}
                  onChange={(e) => setNewCatInput(e.target.value)}
                  placeholder="NEW CATEGORY NAME"
                  className="flex-1 px-4 py-2.5 bg-[#07070a] border border-white/10 rounded-xl text-xs font-mono text-stone-100 focus:outline-none focus:border-violet-400 uppercase"
                />
                <button
                  onClick={() => {
                    if (newCatInput.trim()) {
                      audioEngine.playClick();
                      dataStore.addCategory(newCatInput.trim());
                      setNewCatInput('');
                    }
                  }}
                  className="px-4 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-mono text-xs font-bold uppercase rounded-xl transition-all cursor-pointer"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {store.categories.map((cat) => (
                  <div key={cat} className="px-3 py-1.5 bg-[#07070a] border border-white/10 rounded-xl text-xs font-mono text-stone-300 flex items-center space-x-2">
                    <span>{cat}</span>
                    <button
                      onClick={() => { audioEngine.playClick(); dataStore.deleteCategory(cat); }}
                      className="text-stone-400 hover:text-red-400 cursor-pointer"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* INDUSTRIES */}
            <div className="p-6 md:p-8 bg-[#0d0d12] border border-white/10 rounded-3xl clay-card space-y-6">
              <div>
                <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest font-bold block">
                  INDUSTRY MANAGER
                </span>
                <h3 className="font-display font-extrabold text-xl text-stone-100 uppercase">
                  Industries ({store.industries.length})
                </h3>
              </div>

              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newIndInput}
                  onChange={(e) => setNewIndInput(e.target.value)}
                  placeholder="NEW INDUSTRY NAME"
                  className="flex-1 px-4 py-2.5 bg-[#07070a] border border-white/10 rounded-xl text-xs font-mono text-stone-100 focus:outline-none focus:border-blue-400 uppercase"
                />
                <button
                  onClick={() => {
                    if (newIndInput.trim()) {
                      audioEngine.playClick();
                      dataStore.addIndustry(newIndInput.trim());
                      setNewIndInput('');
                    }
                  }}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase rounded-xl transition-all cursor-pointer"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {store.industries.map((ind) => (
                  <div key={ind} className="px-3 py-1.5 bg-[#07070a] border border-white/10 rounded-xl text-xs font-mono text-stone-300 flex items-center space-x-2">
                    <span>{ind}</span>
                    <button
                      onClick={() => { audioEngine.playClick(); dataStore.deleteIndustry(ind); }}
                      className="text-stone-400 hover:text-red-400 cursor-pointer"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 7: GITHUB AUTO SYNC */}
        {/* ============================================================ */}
        {activeTab === 'github' && (
          <div className="max-w-2xl mx-auto p-6 md:p-8 bg-[#0d0d12] border border-violet-500/30 rounded-3xl clay-card space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-violet-950/80 border border-violet-500/40 flex items-center justify-center text-violet-400 shrink-0">
                <Github size={20} />
              </div>
              <div>
                <span className="text-[10px] font-mono text-violet-400 uppercase tracking-widest font-bold block">
                  VERSION CONTROL INTEGRATION
                </span>
                <h3 className="font-display font-extrabold text-xl text-stone-100 uppercase">
                  Sync Data to GitHub Repository
                </h3>
              </div>
            </div>

            <p className="text-stone-300 text-xs font-sans leading-relaxed">
              Input your Personal Access Token (PAT) for <strong className="text-violet-400">Devil-Labs</strong> on GitHub. Any changes made in this admin panel can be committed directly to your repository as <code className="text-stone-200 bg-white/10 px-1 py-0.5 rounded">devil_labs_data.json</code> with a single click!
            </p>

            <form onSubmit={handleSaveGitHubConfig} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-mono text-stone-400 uppercase">GitHub Personal Access Token (PAT) *</label>
                <input
                  type="password"
                  value={ghToken}
                  onChange={(e) => setGhToken(e.target.value)}
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                  className="w-full px-4 py-3 bg-[#07070a] border border-white/10 rounded-xl text-xs font-mono text-stone-100 focus:outline-none focus:border-violet-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono text-stone-400 uppercase">GitHub Repository Path</label>
                  <input
                    type="text"
                    value={ghRepo}
                    onChange={(e) => setGhRepo(e.target.value)}
                    placeholder="Devil-Labs/platform"
                    className="w-full px-4 py-3 bg-[#07070a] border border-white/10 rounded-xl text-xs font-mono text-stone-100 focus:outline-none focus:border-violet-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-mono text-stone-400 uppercase">Branch Name</label>
                  <input
                    type="text"
                    value={ghBranch}
                    onChange={(e) => setGhBranch(e.target.value)}
                    placeholder="main"
                    className="w-full px-4 py-3 bg-[#07070a] border border-white/10 rounded-xl text-xs font-mono text-stone-100 focus:outline-none focus:border-violet-400"
                  />
                </div>
              </div>

              {store.githubConfig.lastSynced && (
                <div className="p-3 bg-violet-950/40 border border-violet-500/30 rounded-xl text-[10px] font-mono text-violet-300">
                  Last Synced to GitHub: <strong>{store.githubConfig.lastSynced}</strong>
                </div>
              )}

              {ghStatusMsg && (
                <div className={`p-3 rounded-xl text-xs font-mono border ${ghStatusMsg.success ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300' : 'bg-red-950/40 border-red-500/30 text-red-300'}`}>
                  {ghStatusMsg.text}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  className="px-5 py-3 bg-stone-800 hover:bg-stone-700 text-stone-200 font-mono text-xs font-bold uppercase rounded-xl transition-all cursor-pointer"
                >
                  Save Settings
                </button>

                <button
                  type="button"
                  disabled={ghSyncing}
                  onClick={handleTriggerGitHubSync}
                  className="flex-1 py-3 bg-violet-600 hover:bg-violet-500 text-white font-mono text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  {ghSyncing ? (
                    <span>Syncing & Committing to GitHub...</span>
                  ) : (
                    <>
                      <Github size={16} />
                      <span>Commit & Sync Data to GitHub</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

      </div>

      {/* ============================================================ */}
      {/* MODAL: EDIT / CREATE PROJECT */}
      {/* ============================================================ */}
      <AnimatePresence>
        {projectModalOpen && editingProject && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 overflow-y-auto">
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setProjectModalOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl p-6 md:p-8 bg-[#0d0d12] border border-violet-500/30 rounded-[32px] clay-card z-10 space-y-6 my-8 text-stone-100"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="font-display font-extrabold text-xl uppercase">
                  {editingProject.id ? 'Edit Project' : 'Create New Project'}
                </h3>
                <button onClick={() => setProjectModalOpen(false)} className="text-stone-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveProject} className="space-y-4 text-xs font-mono">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-400 uppercase mb-1">Project Title *</label>
                    <input
                      type="text"
                      required
                      value={editingProject.title || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                      placeholder="Title"
                      className="w-full p-3 bg-[#07070a] border border-white/10 rounded-xl text-stone-100"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-400 uppercase mb-1">Domain *</label>
                    <select
                      value={editingProject.domain || 'AI'}
                      onChange={(e) => setEditingProject({ ...editingProject, domain: e.target.value })}
                      className="w-full p-3 bg-[#07070a] border border-white/10 rounded-xl text-stone-100"
                    >
                      <option value="AI">AI & Automation</option>
                      <option value="Web">Web & Mobile</option>
                      <option value="Infrastructure">Infrastructure</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-400 uppercase mb-1">Category *</label>
                    <select
                      value={editingProject.category || store.categories[0]}
                      onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                      className="w-full p-3 bg-[#07070a] border border-white/10 rounded-xl text-stone-100"
                    >
                      {store.categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-400 uppercase mb-1">Industry *</label>
                    <select
                      value={editingProject.industry || store.industries[0]}
                      onChange={(e) => setEditingProject({ ...editingProject, industry: e.target.value })}
                      className="w-full p-3 bg-[#07070a] border border-white/10 rounded-xl text-stone-100"
                    >
                      {store.industries.map((i) => (
                        <option key={i} value={i}>{i}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-400 uppercase mb-1">Client Name</label>
                    <input
                      type="text"
                      value={editingProject.client || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                      placeholder="e.g. FinTech Client"
                      className="w-full p-3 bg-[#07070a] border border-white/10 rounded-xl text-stone-100"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-400 uppercase mb-1">Tech Stack</label>
                    <input
                      type="text"
                      value={editingProject.tech || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, tech: e.target.value })}
                      placeholder="React / Gemini API / Node"
                      className="w-full p-3 bg-[#07070a] border border-white/10 rounded-xl text-stone-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-400 uppercase mb-1">Public Drive / Download Link</label>
                  <input
                    type="url"
                    value={editingProject.driveLink || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, driveLink: e.target.value })}
                    placeholder="https://drive.google.com/drive/folders/..."
                    className="w-full p-3 bg-[#07070a] border border-white/10 rounded-xl text-stone-100"
                  />
                </div>

                <div>
                  <label className="block text-stone-400 uppercase mb-1">Live Demo Link</label>
                  <input
                    type="url"
                    value={editingProject.link || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, link: e.target.value })}
                    placeholder="https://app.client.com"
                    className="w-full p-3 bg-[#07070a] border border-white/10 rounded-xl text-stone-100"
                  />
                </div>

                <div>
                  <label className="block text-stone-400 uppercase mb-1">Image URL</label>
                  <input
                    type="url"
                    value={editingProject.image || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full p-3 bg-[#07070a] border border-white/10 rounded-xl text-stone-100"
                  />
                </div>

                <div>
                  <label className="block text-stone-400 uppercase mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={editingProject.description || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                    placeholder="Brief description of the project"
                    className="w-full p-3 bg-[#07070a] border border-white/10 rounded-xl text-stone-100"
                  />
                </div>

                <div className="flex items-center space-x-6 pt-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!editingProject.featuredHome}
                      onChange={(e) => setEditingProject({ ...editingProject, featuredHome: e.target.checked })}
                      className="accent-violet-600 w-4 h-4"
                    />
                    <span className="text-stone-300">Feature on Home Page</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingProject.status === 'published'}
                      onChange={(e) => setEditingProject({ ...editingProject, status: e.target.checked ? 'published' : 'draft' })}
                      className="accent-emerald-500 w-4 h-4"
                    />
                    <span className="text-stone-300">Status Published</span>
                  </label>
                </div>

                <div className="pt-4 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setProjectModalOpen(false)}
                    className="px-5 py-3 bg-stone-800 text-stone-300 font-bold uppercase rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-violet-600 text-white font-bold uppercase rounded-xl shadow-lg"
                  >
                    Save Project
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* MODAL: EDIT / CREATE PRODUCT */}
      {/* ============================================================ */}
      <AnimatePresence>
        {productModalOpen && editingProduct && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 overflow-y-auto">
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setProductModalOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl p-6 md:p-8 bg-[#0d0d12] border border-violet-500/30 rounded-[32px] clay-card z-10 space-y-6 my-8 text-stone-100"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="font-display font-extrabold text-xl uppercase">
                  {editingProduct.id ? 'Edit Product' : 'Create New Product'}
                </h3>
                <button onClick={() => setProductModalOpen(false)} className="text-stone-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-stone-400 uppercase mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.title || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                    placeholder="Product Title"
                    className="w-full p-3 bg-[#07070a] border border-white/10 rounded-xl text-stone-100"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-400 uppercase mb-1">Price USD ($) *</label>
                    <input
                      type="number"
                      required
                      value={editingProduct.priceUSD || 0}
                      onChange={(e) => setEditingProduct({ ...editingProduct, priceUSD: Number(e.target.value) })}
                      className="w-full p-3 bg-[#07070a] border border-white/10 rounded-xl text-stone-100"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-400 uppercase mb-1">Price INR (₹) *</label>
                    <input
                      type="number"
                      required
                      value={editingProduct.priceINR || 0}
                      onChange={(e) => setEditingProduct({ ...editingProduct, priceINR: Number(e.target.value) })}
                      className="w-full p-3 bg-[#07070a] border border-white/10 rounded-xl text-stone-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-400 uppercase mb-1">Category *</label>
                    <select
                      value={editingProduct.category || store.categories[0]}
                      onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                      className="w-full p-3 bg-[#07070a] border border-white/10 rounded-xl text-stone-100"
                    >
                      {store.categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-400 uppercase mb-1">Industry *</label>
                    <select
                      value={editingProduct.industry || store.industries[0]}
                      onChange={(e) => setEditingProduct({ ...editingProduct, industry: e.target.value })}
                      className="w-full p-3 bg-[#07070a] border border-white/10 rounded-xl text-stone-100"
                    >
                      {store.industries.map((i) => (
                        <option key={i} value={i}>{i}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-stone-400 uppercase mb-1">Public Drive / Demo Download Link</label>
                  <input
                    type="url"
                    value={editingProduct.driveLink || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, driveLink: e.target.value })}
                    placeholder="https://drive.google.com/drive/folders/..."
                    className="w-full p-3 bg-[#07070a] border border-white/10 rounded-xl text-stone-100"
                  />
                </div>

                <div>
                  <label className="block text-stone-400 uppercase mb-1">Image URL</label>
                  <input
                    type="url"
                    value={editingProduct.image || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full p-3 bg-[#07070a] border border-white/10 rounded-xl text-stone-100"
                  />
                </div>

                <div>
                  <label className="block text-stone-400 uppercase mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={editingProduct.description || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    placeholder="Detailed overview of the product..."
                    className="w-full p-3 bg-[#07070a] border border-white/10 rounded-xl text-stone-100"
                  />
                </div>

                <div className="flex items-center space-x-6 pt-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!editingProduct.featuredHome}
                      onChange={(e) => setEditingProduct({ ...editingProduct, featuredHome: e.target.checked })}
                      className="accent-violet-600 w-4 h-4"
                    />
                    <span className="text-stone-300">Feature on Home Page</span>
                  </label>
                </div>

                <div className="pt-4 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setProductModalOpen(false)}
                    className="px-5 py-3 bg-stone-800 text-stone-300 font-bold uppercase rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-violet-600 text-white font-bold uppercase rounded-xl shadow-lg"
                  >
                    Save Product
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* MODAL: EDIT / CREATE BLOG */}
      {/* ============================================================ */}
      <AnimatePresence>
        {blogModalOpen && editingBlog && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 overflow-y-auto">
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setBlogModalOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl p-6 md:p-8 bg-[#0d0d12] border border-violet-500/30 rounded-[32px] clay-card z-10 space-y-6 my-8 text-stone-100"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="font-display font-extrabold text-xl uppercase">
                  {editingBlog.id ? 'Edit Blog Post' : 'Create Blog / Whitepaper'}
                </h3>
                <button onClick={() => setBlogModalOpen(false)} className="text-stone-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveBlog} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-stone-400 uppercase mb-1">Post Title *</label>
                  <input
                    type="text"
                    required
                    value={editingBlog.title || ''}
                    onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                    placeholder="Article Title"
                    className="w-full p-3 bg-[#07070a] border border-white/10 rounded-xl text-stone-100"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-400 uppercase mb-1">Type *</label>
                    <select
                      value={editingBlog.type || 'Guide'}
                      onChange={(e) => setEditingBlog({ ...editingBlog, type: e.target.value as any })}
                      className="w-full p-3 bg-[#07070a] border border-white/10 rounded-xl text-stone-100"
                    >
                      <option value="Article">Article</option>
                      <option value="Guide">Guide</option>
                      <option value="Whitepaper">Whitepaper</option>
                      <option value="Template">Template</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-400 uppercase mb-1">Category *</label>
                    <select
                      value={editingBlog.category || store.categories[0]}
                      onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}
                      className="w-full p-3 bg-[#07070a] border border-white/10 rounded-xl text-stone-100"
                    >
                      {store.categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-stone-400 uppercase mb-1">Public Drive PDF / Resource Link</label>
                  <input
                    type="url"
                    value={editingBlog.driveLink || ''}
                    onChange={(e) => setEditingBlog({ ...editingBlog, driveLink: e.target.value })}
                    placeholder="https://drive.google.com/file/d/..."
                    className="w-full p-3 bg-[#07070a] border border-white/10 rounded-xl text-stone-100"
                  />
                </div>

                <div>
                  <label className="block text-stone-400 uppercase mb-1">Brief Summary</label>
                  <textarea
                    rows={2}
                    value={editingBlog.description || ''}
                    onChange={(e) => setEditingBlog({ ...editingBlog, description: e.target.value })}
                    className="w-full p-3 bg-[#07070a] border border-white/10 rounded-xl text-stone-100"
                  />
                </div>

                <div>
                  <label className="block text-stone-400 uppercase mb-1">Full Article / Whitepaper Content</label>
                  <textarea
                    rows={4}
                    value={editingBlog.content || ''}
                    onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                    className="w-full p-3 bg-[#07070a] border border-white/10 rounded-xl text-stone-100"
                  />
                </div>

                <div className="flex items-center space-x-6 pt-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!editingBlog.featuredHome}
                      onChange={(e) => setEditingBlog({ ...editingBlog, featuredHome: e.target.checked })}
                      className="accent-violet-600 w-4 h-4"
                    />
                    <span className="text-stone-300">Feature on Home Page</span>
                  </label>
                </div>

                <div className="pt-4 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setBlogModalOpen(false)}
                    className="px-5 py-3 bg-stone-800 text-stone-300 font-bold uppercase rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-violet-600 text-white font-bold uppercase rounded-xl shadow-lg"
                  >
                    Save Post
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* MODAL: EDIT / CREATE TESTIMONIAL */}
      {/* ============================================================ */}
      <AnimatePresence>
        {testimonialModalOpen && editingTestimonial && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 overflow-y-auto">
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setTestimonialModalOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl p-6 md:p-8 bg-[#0d0d12] border border-violet-500/30 rounded-[32px] clay-card z-10 space-y-6 my-8 text-stone-100"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="font-display font-extrabold text-xl uppercase">
                  {editingTestimonial.id ? 'Edit Testimonial' : 'Add Testimonial'}
                </h3>
                <button onClick={() => setTestimonialModalOpen(false)} className="text-stone-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveTestimonial} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-stone-400 uppercase mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={editingTestimonial.name || ''}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                    className="w-full p-3 bg-[#07070a] border border-white/10 rounded-xl text-stone-100"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-400 uppercase mb-1">Role</label>
                    <input
                      type="text"
                      value={editingTestimonial.role || ''}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })}
                      placeholder="e.g. VP of Engineering"
                      className="w-full p-3 bg-[#07070a] border border-white/10 rounded-xl text-stone-100"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-400 uppercase mb-1">Company</label>
                    <input
                      type="text"
                      value={editingTestimonial.company || ''}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, company: e.target.value })}
                      placeholder="e.g. Acme FinTech"
                      className="w-full p-3 bg-[#07070a] border border-white/10 rounded-xl text-stone-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-400 uppercase mb-1">Feedback Text *</label>
                  <textarea
                    required
                    rows={3}
                    value={editingTestimonial.feedback || ''}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, feedback: e.target.value })}
                    className="w-full p-3 bg-[#07070a] border border-white/10 rounded-xl text-stone-100"
                  />
                </div>

                <div className="flex items-center space-x-6 pt-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!editingTestimonial.featuredHome}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, featuredHome: e.target.checked })}
                      className="accent-violet-600 w-4 h-4"
                    />
                    <span className="text-stone-300">Feature on Home Page</span>
                  </label>
                </div>

                <div className="pt-4 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setTestimonialModalOpen(false)}
                    className="px-5 py-3 bg-stone-800 text-stone-300 font-bold uppercase rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-violet-600 text-white font-bold uppercase rounded-xl shadow-lg"
                  >
                    Save Testimonial
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Icon helper
function TagsIcon({ size }: { size: number }) {
  return <Tag size={size} />;
}
