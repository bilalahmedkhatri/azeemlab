export const themeColors = {
  light: {
    // Backgrounds
    background: {
      primary: '#FFFFFF',
      secondary: '#F8FAFC',
      tertiary: '#F1F5F9',
      card: '#FFFFFF',
      footer: '#1E3A8A', // deep blue footer
    },

    // Text
    text: {
      primary: '#0F172A',     // main text
      secondary: '#475569',   // muted text
      tertiary: '#94A3B8',
      inverse: '#FFFFFF',     // text on dark bg (footer)
      footer: '#E5E7EB',      // footer text
    },

    // Surfaces
    surface: {
      card: '#FFFFFF',
      elevated: '#FFFFFF',
      overlay: 'rgba(15, 23, 42, 0.5)',
    },

    // Borders
    border: {
      primary: '#E2E8F0',
      secondary: '#CBD5E1',
      accent: '#3B82F6', // blue border
    },

    // Brand colors (BLUE dominant)
    accent: {
      primary: '#2563EB',   // main blue (buttons, links)
      secondary: '#1E40AF', // darker blue
      light: '#60A5FA',     // soft blue highlight
      pink: '#EC4899',      // subtle pink (hover / highlights only)
    },

    // Shadows
    shadow: {
      sm: '0 1px 2px rgba(0,0,0,0.05)',
      md: '0 4px 10px rgba(0,0,0,0.08)',
      lg: '0 12px 30px rgba(0,0,0,0.12)',
      xl: '0 30px 60px rgba(0,0,0,0.15)',
    },
  },

  dark: {
    // Backgrounds
    background: {
      primary: '#0B1220',
      secondary: '#0F172A',
      tertiary: '#1E293B',
      card: '#0F172A',
      footer: '#020617', // very dark blue footer
    },

    // Text
    text: {
      primary: '#E5E7EB',
      secondary: '#CBD5E1',
      tertiary: '#94A3B8',
      inverse: '#020617',
      footer: '#CBD5E1',
    },

    // Surfaces
    surface: {
      card: '#0F172A',
      elevated: '#1E293B',
      overlay: 'rgba(2, 6, 23, 0.75)',
    },

    // Borders
    border: {
      primary: '#1E293B',
      secondary: '#334155',
      accent: '#3B82F6',
    },

    // Brand colors (BLUE dominant)
    accent: {
      primary: '#3B82F6',   // blue dominant
      secondary: '#1D4ED8',
      light: '#93C5FD',
      pink: '#F472B6',      // subtle pink support
    },

    // Shadows
    shadow: {
      sm: '0 1px 2px rgba(0,0,0,0.4)',
      md: '0 6px 14px rgba(0,0,0,0.5)',
      lg: '0 20px 40px rgba(0,0,0,0.6)',
      xl: '0 40px 80px rgba(0,0,0,0.7)',
    },
  },
} as const;

export type ThemeMode = 'light' | 'dark';
export type ThemeColors = typeof themeColors;
