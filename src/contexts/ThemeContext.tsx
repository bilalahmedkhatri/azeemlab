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
  primary: '#06b6d4',
  primaryDark: '#0891b2',
  primaryLight: '#22d3ee',
  secondary: '#818cf8',
  background: '#0f172a',
  foreground: '#f8fafc',
  card: '#1e293b',
  cardForeground: '#f8fafc',
  muted: '#1e293b',
  mutedForeground: '#94a3b8',
  border: '#334155',
  accent: '#06b6d4',
  accentForeground: '#0f172a',
  destructive: '#f87171',
  destructiveForeground: '#0f172a',
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
