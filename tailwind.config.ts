import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#0891b2', // Vibrant teal (light mode)
          light: '#06b6d4',
          dark: '#0e7490',
        },
        neutral: {
          light: '#f5f5f5',
          dark: '#2d2d2d',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        border: 'var(--border)',
        primary: 'var(--primary)',
        'primary-dark': 'var(--primary-dark)',
        'primary-light': 'var(--primary-light)',
        secondary: 'var(--secondary)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui'],
        heading: ['var(--font-poppins)', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};

export default config;
