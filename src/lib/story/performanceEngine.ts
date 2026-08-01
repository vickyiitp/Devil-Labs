export type PerformanceTier = 'ULTRA' | 'BALANCED' | 'LITE' | 'STATIC';

export interface PerformanceConfig {
  tier: PerformanceTier;
  webglSupported: boolean;
  maxParticles: number;
  enableShadows: boolean;
  enableComplexShaders: boolean;
}

export function detectPerformanceConfig(): PerformanceConfig {
  if (typeof window === 'undefined') {
    return {
      tier: 'BALANCED',
      webglSupported: true,
      maxParticles: 350,
      enableShadows: false,
      enableComplexShaders: true,
    };
  }

  // 1. Reduced motion check
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return {
      tier: 'STATIC',
      webglSupported: false,
      maxParticles: 0,
      enableShadows: false,
      enableComplexShaders: false,
    };
  }

  // 2. WebGL Support
  let webglSupported = false;
  try {
    const canvas = document.createElement('canvas');
    webglSupported = !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    webglSupported = false;
  }

  if (!webglSupported) {
    return {
      tier: 'LITE',
      webglSupported: false,
      maxParticles: 40,
      enableShadows: false,
      enableComplexShaders: false,
    };
  }

  // 3. Hardware check
  const cores = navigator.hardwareConcurrency || 4;
  const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;

  if (isMobile || cores <= 2) {
    return {
      tier: 'BALANCED',
      webglSupported: true,
      maxParticles: 250,
      enableShadows: false,
      enableComplexShaders: true,
    };
  }

  if (cores >= 6 && window.innerWidth >= 1280) {
    return {
      tier: 'ULTRA',
      webglSupported: true,
      maxParticles: 750,
      enableShadows: true,
      enableComplexShaders: true,
    };
  }

  return {
    tier: 'BALANCED',
    webglSupported: true,
    maxParticles: 400,
    enableShadows: false,
    enableComplexShaders: true,
  };
}
