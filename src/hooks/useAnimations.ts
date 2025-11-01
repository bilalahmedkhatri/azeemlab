'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

/**
 * Hook for triggering animations when element enters viewport
 */
export function useScrollAnimation(threshold = 0.1, triggerOnce = true) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
  });

  return { ref, inView };
}

/**
 * Hook for animated number counting
 */
export function useCounter(end: number, duration = 2000, start = 0) {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView && !isVisible) {
      setIsVisible(true);
      let startTime: number | null = null;
      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        
        // Easing function (easeOutCubic)
        const easeOut = 1 - Math.pow(1 - percentage, 3);
        
        setCount(Math.floor(start + (end - start) * easeOut));

        if (percentage < 1) {
          requestAnimationFrame(animateCount);
        } else {
          setCount(end);
        }
      };

      requestAnimationFrame(animateCount);
    }
  }, [inView, end, duration, start, isVisible]);

  return { count, ref };
}

/**
 * Hook for scroll progress
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(scrollPercent);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return progress;
}

/**
 * Hook for detecting if user has scrolled past threshold
 */
export function useScrolled(threshold = 50) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
}

/**
 * Hook for mouse position tracking
 */
export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return position;
}

/**
 * Hook for prefetching on hover
 */
export function usePrefetchOnHover(href: string) {
  const [isPrefetched, setIsPrefetched] = useState(false);
  const prefetchTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (!isPrefetched) {
      prefetchTimerRef.current = setTimeout(() => {
        setIsPrefetched(true);
        // Next.js Router.prefetch would go here
      }, 100);
    }
  };

  const handleMouseLeave = () => {
    if (prefetchTimerRef.current) {
      clearTimeout(prefetchTimerRef.current);
    }
  };

  return { handleMouseEnter, handleMouseLeave };
}
