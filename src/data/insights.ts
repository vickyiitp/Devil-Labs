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

export const articles: Article[] = [
  {
    id: 1,
    tag: '[Architecture]',
    title: 'Microservices vs. Monoliths in the Era of AI Agents',
    excerpt: 'Evaluating the cost of network latency when routing LLM responses through distributed systems.',
    readTime: '6 MIN READ',
    content: `The paradigm of software development is undergoing a tectonic shift. As AI agents route requests and consume tokens dynamically, traditional microservice latencies become magnified. We analyze how unified modular monoliths can deliver sub-100ms latency figures by keeping agent state, context injection, and system databases colocated inside high-performance server clusters. By minimizing serial network hops across micro-endpoints, we reclaim crucial milliseconds that foundation model gateways often consume.`
  },
  {
    id: 2,
    tag: '[AI Agents]',
    title: 'The Fallacy of Zero-Shot Enterprise Deployments',
    excerpt: 'Why raw foundation models fail in production, and how strict structural guardrails prevent catastrophic logic loops.',
    readTime: '12 MIN READ',
    content: `Zero-shot requests rarely succeed in highly secure business environments. This paper explores the necessity of strict system schemas, state-machine verification, and deterministic routing filters. By framing LLMs with hard-coded validation gates, we eliminate hallucination-driven logic failure loops completely. We demonstrate how stateful agent architectures outperforms stateless prompts in multi-step enterprise workflows.`
  },
  {
    id: 3,
    tag: '[Systems Design]',
    title: 'State Management for Real-Time LLM Streams',
    excerpt: 'Strategies for handling token-by-token streaming in React Server Components without blocking the main thread.',
    readTime: '8 MIN READ',
    content: `React Server Components (RSC) and server-sent events (SSE) have revolutionized how we stream data. We detail a custom debounced buffer architecture that manages rapid state refreshes without causing UI stuttering, retaining smooth layout animations and high refresh rates even during heavy token stream arrivals.`
  },
  {
    id: 4,
    tag: '[Security]',
    title: 'Hardening Agentic Workflows Against Prompt Injection',
    excerpt: 'An architectural review of isolation layers and query sanitization techniques for public-facing AI.',
    readTime: '15 MIN READ',
    content: `Security in the age of natural language inputs requires a complete rethink of safety parameters. We present our multi-layered isolation proxy system that translates raw language requests into strictly typed payloads before they interact with internal database APIs. Sanitizing natural language at the gateway prevents malicious context overrides and state tampering.`
  },
  {
    id: 5,
    tag: '[Vibe Coding]',
    title: 'Why Vibe Coding is Replacing Traditional Frontend Development',
    excerpt: 'An inside look at how AI-assisted generation is shifting the role of the developer from a syntax writer to an architectural director.',
    readTime: '10 MIN READ',
    content: `In the era of LLMs, writing raw syntax is increasingly becoming a bottleneck. 'Vibe Coding'—the process of directing autonomous AI agents using high-level intent, conceptual architectures, and iterative design reviews—is the new standard. This shift elevates the developer from a line-by-line keyboard typist to a high-level system architect. It results in phenomenal velocity while maintaining rigorous compliance to code quality and structural cleanliness.`
  }
];
