import { ReactNode } from 'react';
import { motion } from 'motion/react';

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
  // Determine initial offscreen transforms
  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: `-${distance}`, x: 0 };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: `-${distance}`, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const initialTransform = getInitialTransform();

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...initialTransform,
        scale: 0.98
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0,
        scale: 1
      }}
      viewport={{ 
        once: true, 
        amount: threshold,
        margin: "0px 0px -40px 0px"
      }}
      transition={{ 
        type: "spring",
        stiffness: 70,
        damping: 18,
        mass: 0.8,
        delay: delay / 1000,
        duration: duration / 1000,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

