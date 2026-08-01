export type SceneId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export interface SceneDefinition {
  id: SceneId;
  title: string;
  subtitle: string;
  tag: string;
}

export const SCENES: SceneDefinition[] = [
  { id: 1, title: 'THE LAB', subtitle: '02:13 AM Workstation', tag: 'SYSTEM ONLINE' },
  { id: 2, title: 'THE MESSAGE', subtitle: 'New Client Inquiry', tag: 'INCOMING TRANSMISSION' },
  { id: 3, title: 'UNDERSTAND', subtitle: 'Problem Extraction', tag: 'THINK BEFORE CODE' },
  { id: 4, title: 'SYSTEM ARCHITECTURE', subtitle: 'Spatial Data Nodes', tag: 'ARCHITECTURE LOCKED' },
  { id: 5, title: 'DESIGN', subtitle: 'Structure Before Decoration', tag: 'RESPONSIVE LAYOUTS' },
  { id: 6, title: 'BUILD', subtitle: 'Component Assembly', tag: 'PRODUCTION SPRINT' },
  { id: 7, title: 'AUTOMATION', subtitle: 'Autonomous Agentic Workflow', tag: 'WORKS WITHOUT US' },
  { id: 8, title: 'TESTING', subtitle: 'Resilience & Self-Healing', tag: 'HARDENED QA' },
  { id: 9, title: 'DEPLOYMENT', subtitle: 'Production Stabilization', tag: 'SYSTEM ONLINE' },
  { id: 10, title: 'CLIENT REVIEW', subtitle: 'Approval & Satisfaction', tag: 'PAYMENT & SUCCESS' },
  { id: 11, title: 'MORNING REVEAL', subtitle: 'System Keeps Running', tag: 'DEVIL LABS OS' },
];
