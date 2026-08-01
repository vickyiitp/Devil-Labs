export type PerformanceTier = 'ULTRA' | 'BALANCED' | 'LITE' | 'STATIC';

export interface DeviceCapability {
  tier: PerformanceTier;
  webglSupported: boolean;
  maxParticles: number;
  enableShadows: boolean;
  enableShaders: boolean;
}

export function detectDeviceCapability(): DeviceCapability {
  if (typeof window === 'undefined') {
    return {
      tier: 'BALANCED',
      webglSupported: true,
      maxParticles: 400,
      enableShadows: false,
      enableShaders: true,
    };
  }

  // 1. Reduced Motion Preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return {
      tier: 'STATIC',
      webglSupported: false,
      maxParticles: 0,
      enableShadows: false,
      enableShaders: false,
    };
  }

  // 2. WebGL Support Test
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
      maxParticles: 50,
      enableShadows: false,
      enableShaders: false,
    };
  }

  // 3. Hardware Concurrency & Screen Dimensions
  const cores = navigator.hardwareConcurrency || 4;
  const isMobile = window.innerWidth < 768 || ('ontouchstart' in window);

  if (isMobile || cores <= 2) {
    return {
      tier: 'BALANCED',
      webglSupported: true,
      maxParticles: 300,
      enableShadows: false,
      enableShaders: true,
    };
  }

  if (cores >= 6 && window.innerWidth >= 1280) {
    return {
      tier: 'ULTRA',
      webglSupported: true,
      maxParticles: 800,
      enableShadows: true,
      enableShaders: true,
    };
  }

  return {
    tier: 'BALANCED',
    webglSupported: true,
    maxParticles: 500,
    enableShadows: false,
    enableShaders: true,
  };
}
