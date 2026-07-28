import React, { useState, useEffect, useRef } from 'react';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  placeholderSrc?: string;
  rootMargin?: string;
  threshold?: number;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  loading?: 'lazy' | 'eager';
  onLoad?: React.ReactEventHandler<HTMLImageElement>;
  onLoadCallback?: () => void;
}


export default function Image({
  src,
  alt,
  className = '',
  placeholderSrc,
  rootMargin = '150px',
  threshold = 0.01,
  referrerPolicy = 'no-referrer',
  loading,
  onLoad,
  onLoadCallback,
  ...props
}: ImageProps) {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Default low-res/placeholder generator if not provided
  const getPlaceholder = () => {
    if (placeholderSrc) return placeholderSrc;
    if (src.includes('github.com') || src.includes('githubusercontent.com')) {
      const separator = src.includes('?') ? '&' : '?';
      return `${src}${separator}size=16`;
    }
    return null;
  };

  const lowResUrl = getPlaceholder();

  // Instant vector brand SVG placeholder (Loads immediately, 0ms latency)
  const defaultSvgPlaceholder = `data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 100 100'%3E%3Crect width%3D'100%25' height%3D'100%25' fill%3D'%2307060d'%2F%3E%3Cdefs%3E%3ClinearGradient id%3D'g' x1%3D'0%25' y1%3D'0%25' x2%3D'100%25' y2%3D'100%25'%3E%3Cstop offset%3D'0%25' stop-color%3D'%231a0e35' stop-opacity%3D'0.6'%2F%3E%3Cstop offset%3D'100%25' stop-color%3D'%2307060d' stop-opacity%3D'0.9'%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect width%3D'100%25' height%3D'100%25' fill%3D'url(%23g)'%2F%3E%3C%2Fsvg%3E`;

  useEffect(() => {
    // If IntersectionObserver is not supported, load immediately
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
      observer.disconnect();
    };
  }, [rootMargin, threshold]);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    if (onLoadCallback) {
      onLoadCallback();
    }
    if (onLoad) {
      onLoad(e);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-[#07060d] select-none ${className}`}
    >
      {/* 1. Base SVG Gradient Background Placeholder */}
      <img
        src={defaultSvgPlaceholder}
        alt=""
        aria-hidden="true"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
      />

      {/* 2. Low-res blurred placeholder (faded out once main image loads) */}
      {lowResUrl && (
        <img
          src={lowResUrl}
          alt=""
          aria-hidden="true"
          decoding="async"
          referrerPolicy={referrerPolicy}
          className={`absolute inset-0 w-full h-full object-cover scale-110 filter blur-xl transition-opacity duration-700 pointer-events-none z-1 ${
            isLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        />
      )}

      {/* 3. Actual High-Res Image (Loaded when container intersects viewport) */}
      {isInView && (
        <img
          {...props}
          src={src}
          alt={alt}
          decoding="async"
          referrerPolicy={referrerPolicy}
          onLoad={handleImageLoad}
          className={`w-full h-full object-cover relative z-10 transition-all duration-700 ease-out ${
            isLoaded
              ? 'opacity-100 filter blur-0 scale-100'
              : 'opacity-0 filter blur-lg scale-[1.03]'
          }`}
        />
      )}
    </div>
  );
}
