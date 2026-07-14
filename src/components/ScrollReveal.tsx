import { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  threshold?: number;
  key?: string | number;
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 700,
  distance = '24px',
  direction = 'up',
  threshold = 0.05,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if client/system prefers reduced motion to prevent forced animations
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px', // Triggers slightly before element enters to avoid visible stutter
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold]);

  const getTransformStyle = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up':
          return `translateY(${distance})`;
        case 'down':
          return `translateY(-${distance})`;
        case 'left':
          return `translateX(${distance})`;
        case 'right':
          return `translateX(-${distance})`;
        default:
          return 'none';
      }
    }
    return 'translate(0, 0)';
  };

  const style = {
    opacity: isVisible ? 1 : 0,
    transform: getTransformStyle(),
    transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    willChange: isVisible ? 'auto' : 'opacity, transform',
  };

  return (
    <div ref={elementRef} className={className} style={style}>
      {children}
    </div>
  );
}
