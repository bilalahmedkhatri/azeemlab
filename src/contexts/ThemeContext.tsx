'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeColors {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  secondary: string;
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
}

interface ThemeContextType {
  theme: Theme;
  colors: ThemeColors;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const lightColors: ThemeColors = {
  primary: '#0891b2', // Teal
  primaryDark: '#0e7490',
  primaryLight: '#06b6d4',
  secondary: '#6366f1',
  background: '#ffffff',
  foreground: '#0f172a',
  card: '#ffffff',
  cardForeground: '#0f172a',
  muted: '#f1f5f9',
  mutedForeground: '#64748b',
  border: '#e2e8f0',
  accent: '#0891b2',
  accentForeground: '#ffffff',
  destructive: '#ef4444',
  destructiveForeground: '#ffffff',
};

const darkColors: ThemeColors = {
  primary: '#00d4ff', // Vibrant bright cyan
  primaryDark: '#00b8e6',
  primaryLight: '#33ddff',
  secondary: '#a78bfa',
  background: '#0d1117', // Very dark blue-black
  foreground: '#ffffff', // Pure white text
  card: '#161b22', // Slightly elevated dark
  cardForeground: '#ffffff',
  muted: '#21262d',
  mutedForeground: '#8b949e',
  border: '#30363d',
  accent: '#00d4ff', // Bright cyan
  accentForeground: '#0d1117',
  destructive: '#f85149',
  destructiveForeground: '#ffffff',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;
    setThemeState(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const colors = theme === 'light' ? lightColors : darkColors;

  const value = {
    theme,
    colors,
    toggleTheme,
    setTheme,
  };

  // Apply CSS variables
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  }, [theme, colors, mounted]);

  if (!mounted) {
    // To prevent FOUC, we can render the children with a default context,
    // but the real theme will be applied via CSS variables once mounted.
    // The `suppressHydrationWarning` on <html> in layout.tsx is important.
    return (
      <ThemeContext.Provider value={value}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Responsive breakpoint utilities
export const breakpoints = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export type Breakpoint = keyof typeof breakpoints;

// Hook for responsive behavior
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

export function useBreakpoint(breakpoint: Breakpoint): boolean {
  return useMediaQuery(`(min-width: ${breakpoints[breakpoint]})`);
}

// Responsive utilities
export const responsive = {
  isMobile: () => useMediaQuery(`(max-width: ${breakpoints.md})`),
  isTablet: () => useMediaQuery(`(min-width: ${breakpoints.md}) and (max-width: ${breakpoints.lg})`),
  isDesktop: () => useMediaQuery(`(min-width: ${breakpoints.lg})`),
  isLargeDesktop: () => useMediaQuery(`(min-width: ${breakpoints.xl})`),
};
