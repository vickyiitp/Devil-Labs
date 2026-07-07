import { useEffect } from 'react';

export default function SEO({ path }: { path: string }) {
  useEffect(() => {
    let title = "Devil Labs | AI Automation & Full-Stack Architecture";
    let description = "Devil Labs engineers autonomous AI systems and scalable full-stack web infrastructure for modern enterprise.";

    switch (path) {
      case '/':
        title = "Devil Labs | Enterprise AI Automation & Full-Stack Architecture";
        description = "Devil Labs builds autonomous AI systems, AI agents, and high-performance full-stack web architectures for the modern enterprise.";
        break;
      case '/services':
        title = "AI Automation & Full-Stack Architecture Services | Devil Labs";
        description = "Explore our core capabilities: AI Automation, Full-Stack Architecture, Enterprise DevOps, and Autonomous Intelligence systems.";
        break;
      case '/process':
        title = "Our Process | AI Automation & Full-Stack Architecture Deployment";
        description = "Discover our engineered pipeline for deploying enterprise-grade AI automation and zero-tech-debt full-stack architectures in weeks.";
        break;
      case '/insights':
        title = "Lab Notes | Insights on AI Automation & Full-Stack Architecture";
        description = "Research, intelligence, and technical write-ups on AI automation, AI agents, and scalable full-stack web architecture.";
        break;
      case '/pricing':
        title = "Pricing | Enterprise AI Automation & Full-Stack Architecture";
        description = "Transparent pricing for enterprise AI automation retainers, full-stack architecture sprints, and dedicated development.";
        break;
      case '/contact':
        title = "Initialize Project | AI Automation & Full-Stack Architecture";
        description = "Start your project brief with Devil Labs to build high-velocity AI automation and scalable full-stack web architecture.";
        break;
      case '/legal/privacy':
        title = "Privacy Policy | Devil Labs";
        description = "Privacy policy and data collection protocols for Devil Labs.";
        break;
      case '/legal/terms':
        title = "Terms of Service | Devil Labs";
        description = "Terms of service and engagement parameters for Devil Labs.";
        break;
      case '/legal/msa':
        title = "Master Services Agreement | Devil Labs";
        description = "Master Services Agreement (MSA) overview for Devil Labs.";
        break;
      default:
        if (path.startsWith('/services/')) {
          title = "Service Architecture | Devil Labs";
        }
        break;
    }

    document.title = title;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

  }, [path]);

  return null;
}
