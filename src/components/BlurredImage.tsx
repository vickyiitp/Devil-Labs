import React, { useState } from 'react';

interface BlurredImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderSrc?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  loading?: 'lazy' | 'eager';
}

export default function BlurredImage({
  src,
  alt,
  className = '',
  placeholderSrc,
  referrerPolicy = 'no-referrer',
  loading = 'lazy'
}: BlurredImageProps) {
  const [isHighResLoaded, setIsHighResLoaded] = useState(false);
  const [isLowResLoaded, setIsLowResLoaded] = useState(false);

  // Helper to determine/generate low-res URL if not provided
  const getLowResSrc = () => {
    if (placeholderSrc) return placeholderSrc;
    
    // Check if it's a GitHub avatar URL (which is the case for the project's images)
    if (src.includes('github.com') || src.includes('githubusercontent.com')) {
      const separator = src.includes('?') ? '&' : '?';
      return `${src}${separator}size=16`;
    }
    
    return null;
  };

  const lowResUrl = getLowResSrc();

  // Inline SVG base fallback (Phase 0) - beautiful styled violet-to-dark brand gradient
  const svgPlaceholder = `data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 100 100'%3E%3Crect width%3D'100%25' height%3D'100%25' fill%3D'%2307060d'%2F%3E%3Cdefs%3E%3ClinearGradient id%3D'g' x1%3D'0%25' y1%3D'0%25' x2%3D'100%25' y2%3D'100%25'%3E%3Cstop offset%3D'0%25' stop-color%3D'%231a0e35' stop-opacity%3D'0.6'%2F%3E%3Cstop offset%3D'100%25' stop-color%3D'%2307060d' stop-opacity%3D'0.9'%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect width%3D'100%25' height%3D'100%25' fill%3D'url(%23g)'%2F%3E%3C%2Fsvg%3E`;

  return (
    <div className={`relative overflow-hidden bg-[#07060d] select-none ${className}`}>
      {/* Phase 0: SVG base brand gradient fallback (Loads instantly with 0ms delay) */}
      <img
        src={svgPlaceholder}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Phase 1: Low-resolution blurred version (Loads almost instantly, < 1KB) */}
      {lowResUrl && (
        <img
          src={lowResUrl}
          alt=""
          aria-hidden="true"
          referrerPolicy={referrerPolicy}
          onLoad={() => setIsLowResLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover scale-115 filter blur-xl transition-all duration-500 ${
            isLowResLoaded ? 'opacity-100' : 'opacity-0'
          } ${isHighResLoaded ? 'opacity-0 pointer-events-none transition-opacity duration-700' : ''}`}
        />
      )}

      {/* Phase 2: High-resolution full image */}
      <img
        src={src}
        alt={alt}
        loading={loading}
        referrerPolicy={referrerPolicy}
        onLoad={() => setIsHighResLoaded(true)}
        className={`w-full h-full object-cover absolute inset-0 z-10 transition-all duration-700 ease-out ${
          isHighResLoaded ? 'opacity-100 scale-100 filter blur-0' : 'opacity-0 scale-[1.02] filter blur-md'
        }`}
      />
    </div>
  );
}
