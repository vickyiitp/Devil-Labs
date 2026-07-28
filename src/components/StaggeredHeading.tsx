import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface StaggeredHeadingProps {
  children?: React.ReactNode;
  text?: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
}

export default function StaggeredHeading({ children, text, className = "", as = 'h2' }: StaggeredHeadingProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  
  const MotionTag = motion[as as keyof typeof motion] as any;
  const content = children ?? text;

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const childVariant = {
    hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { type: "spring", stiffness: 80, damping: 20 }
    },
  };

  // Wrap text nodes in motion.span to animate them individually
  const wrappedChildren = React.Children.map(content, (child) => {
    if (typeof child === 'string') {
      const words = child.split(' ').filter(w => w.trim() !== '');
      return words.map((word, i) => (
        <motion.span key={i} variants={childVariant} className="inline-block mr-[0.25em]">
          {word}
        </motion.span>
      ));
    }
    
    // If it's a React element (like a span with a special color or br)
    if (React.isValidElement(child)) {
      if (child.type === 'br') {
        return child;
      }
      return (
        <motion.span variants={childVariant} className="inline-block mr-[0.25em]">
          {child}
        </motion.span>
      );
    }
    
    return child;
  });

  return (
    <MotionTag
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {wrappedChildren}
    </MotionTag>
  );
}
