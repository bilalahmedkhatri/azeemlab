export const themeColors = {
  light: {
    // Backgrounds
    background: {
      primary: '#FFFFFF',
      secondary: '#F9FAFB',
      tertiary: '#F3F4F6',
      card: '#FFFFFF',
    },
    // Text
    text: {
      primary: '#111827',
      secondary: '#6B7280',
      tertiary: '#9CA3AF',
      inverse: '#FFFFFF',
    },
    // Surfaces
    surface: {
      card: '#FFFFFF',
      elevated: '#FFFFFF',
      overlay: 'rgba(0, 0, 0, 0.5)',
    },
    // Borders
    border: {
      primary: '#E5E7EB',
      secondary: '#D1D5DB',
      accent: '#0891b2',
    },
    // Accent colors (brand colors remain mostly the same)
    accent: {
      primary: '#0891b2',
      secondary: '#0e7490',
      light: '#67e8f9',
      dark: '#164e63',
    },
    // Shadows
    shadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    },
  },
  dark: {
    // Backgrounds
    background: {
      primary: '#0F172A',      // Slate 900
      secondary: '#1E293B',    // Slate 800
      tertiary: '#334155',     // Slate 700
      card: '#1E293B',
    },
    // Text
    text: {
      primary: '#F8FAFC',      // Slate 50
      secondary: '#CBD5E1',    // Slate 300
      tertiary: '#94A3B8',     // Slate 400
      inverse: '#0F172A',
    },
    // Surfaces
    surface: {
      card: '#1E293B',
      elevated: '#334155',
      overlay: 'rgba(0, 0, 0, 0.75)',
    },
    // Borders
    border: {
      primary: '#334155',
      secondary: '#475569',
      accent: '#06b6d4',
    },
    // Accent colors (slightly adjusted for dark mode contrast)
    accent: {
      primary: '#06b6d4',      // Cyan 500
      secondary: '#0891b2',    // Cyan 600
      light: '#22d3ee',        // Cyan 400
      dark: '#0e7490',         // Cyan 700
    },
    // Shadows (minimal in dark mode)
    shadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.6)',
    },
  },
} as const;

export type ThemeMode = 'light' | 'dark';
export type ThemeColors = typeof themeColors;
