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

export const CLIENT_PROJECTS: Project[] = [];

export const DEMO_PROJECTS: Project[] = [];

export const CATEGORIES = [
  "All",
  "AI",
  "Web",
  "Infrastructure"
];
