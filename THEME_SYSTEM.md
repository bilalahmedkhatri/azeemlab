# Theme System Documentation

## Overview
The theme system provides comprehensive theming capabilities with light/dark mode support, responsive utilities, and CSS variable-based color management.

## Features
- 🌓 Light/Dark mode toggle
- 🎨 CSS variable-based theming
- 📱 Responsive breakpoint utilities
- 💾 Persistent theme preference (localStorage)
- 🎯 System preference detection
- ⚡ Smooth transitions

## Usage

### Basic Theme Toggle

```tsx
import { ThemeToggle } from '@/components/ui/ThemeToggle';

function MyComponent() {
  return <ThemeToggle />;
}
```

### Using Theme in Components

```tsx
'use client';

import { useTheme } from '@/contexts/ThemeContext';

function MyComponent() {
  const { theme, colors, toggleTheme, setTheme } = useTheme();
  
  return (
    <div style={{ backgroundColor: colors.primary }}>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

### Responsive Utilities

```tsx
import { useBreakpoint, responsive } from '@/contexts/ThemeContext';

function ResponsiveComponent() {
  const isMobile = responsive.isMobile();
  const isTablet = responsive.isTablet();
  const isDesktop = useBreakpoint('lg');
  
  return (
    <div>
      {isMobile && <p>Mobile View</p>}
      {isTablet && <p>Tablet View</p>}
      {isDesktop && <p>Desktop View</p>}
    </div>
  );
}
```

### Custom Media Queries

```tsx
import { useMediaQuery } from '@/contexts/ThemeContext';

function MyComponent() {
  const isLargeScreen = useMediaQuery('(min-width: 1280px)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  
  return (
    <div>
      {isLargeScreen && <p>Large Screen Content</p>}
      {!prefersReducedMotion && <AnimatedComponent />}
    </div>
  );
}
```

## Color Tokens

### Light Mode Colors
- `--background`: #ffffff
- `--foreground`: #0f172a
- `--accent`: #0891b2 (Teal)
- `--accent-dark`: #0e7490
- `--accent-light`: #06b6d4
- `--card`: #ffffff
- `--muted`: #f1f5f9
- `--border`: #e2e8f0

### Dark Mode Colors
- `--background`: #0f172a
- `--foreground`: #f8fafc
- `--accent`: #06b6d4 (Lighter Teal)
- `--accent-dark`: #0891b2
- `--accent-light`: #22d3ee
- `--card`: #1e293b
- `--muted`: #1e293b
- `--border`: #334155

## Breakpoints

```typescript
const breakpoints = {
  xs: '475px',
  sm: '640px',   // Tablet portrait
  md: '768px',   // Tablet landscape
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px' // Extra large
};
```

## Tailwind CSS Classes

### Background Colors
```tsx
<div className="bg-background">
<div className="bg-card">
<div className="bg-accent">
<div className="bg-muted">
```

### Text Colors
```tsx
<p className="text-foreground">
<p className="text-accent">
<p className="text-muted-foreground">
```

### Dark Mode Variants
```tsx
<div className="bg-white dark:bg-gray-900">
<p className="text-gray-900 dark:text-white">
<button className="bg-accent dark:bg-accent-light">
```

## Responsive Classes

### Tailwind Responsive Modifiers
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
<p className="text-sm md:text-base lg:text-lg">
<div className="p-4 md:p-6 lg:p-8">
```

### Custom Responsive Component
```tsx
function ResponsiveGrid() {
  const { isMobile, isTablet, isDesktop } = responsive;
  
  return (
    <div className={`grid gap-4 ${
      isMobile() ? 'grid-cols-1' :
      isTablet() ? 'grid-cols-2' :
      'grid-cols-3'
    }`}>
      {/* Content */}
    </div>
  );
}
```

## Best Practices

### 1. Always Use Client Components for Theme Hooks
```tsx
'use client'; // Required for useTheme, useBreakpoint, etc.

import { useTheme } from '@/contexts/ThemeContext';
```

### 2. Use CSS Variables for Dynamic Styling
```tsx
// Good ✅
<div style={{ backgroundColor: 'var(--accent)' }}>

// Also Good ✅
<div className="bg-accent">

// Avoid ❌ (hard-coded colors)
<div style={{ backgroundColor: '#0891b2' }}>
```

### 3. Responsive Design First
```tsx
// Mobile-first approach ✅
<div className="w-full md:w-1/2 lg:w-1/3">

// Not recommended ❌
<div className="w-1/3 md:w-1/2 sm:w-full">
```

### 4. Theme-Aware Components
```tsx
function Card({ children }) {
  return (
    <div className="bg-card text-card-foreground border border-border rounded-lg shadow-lg dark:shadow-2xl">
      {children}
    </div>
  );
}
```

## Advanced Usage

### Custom Theme Colors
Modify `src/contexts/ThemeContext.tsx`:

```typescript
const lightColors: ThemeColors = {
  // ... existing colors
  custom: '#ff6b6b', // Add custom color
};

const darkColors: ThemeColors = {
  // ... existing colors
  custom: '#ff8787', // Dark mode variant
};
```

### Persist Additional Settings
```typescript
const { theme, setTheme } = useTheme();

// Save with additional metadata
const savePreference = (newTheme: Theme) => {
  setTheme(newTheme);
  localStorage.setItem('theme-timestamp', Date.now().toString());
};
```

## Troubleshooting

### Theme Not Persisting
Ensure localStorage is available:
```typescript
if (typeof window !== 'undefined') {
  localStorage.setItem('theme', theme);
}
```

### Flash of Unstyled Content (FOUC)
The ThemeProvider includes a mounting check:
```typescript
if (!mounted) {
  return <>{children}</>;
}
```

### Dark Mode Not Working
Check `html` element has `suppressHydrationWarning`:
```tsx
<html lang="en" suppressHydrationWarning>
```

## API Reference

### `useTheme()`
Returns theme context:
- `theme`: Current theme ('light' | 'dark')
- `colors`: Theme color object
- `toggleTheme`: Function to toggle theme
- `setTheme`: Function to set specific theme

### `useBreakpoint(breakpoint)`
Returns boolean if viewport matches breakpoint:
```typescript
const isDesktop = useBreakpoint('lg'); // true if >= 1024px
```

### `useMediaQuery(query)`
Returns boolean if media query matches:
```typescript
const isPortrait = useMediaQuery('(orientation: portrait)');
```

### `responsive`
Object with helper functions:
- `isMobile()`: Returns true if < 768px
- `isTablet()`: Returns true if 768px - 1024px
- `isDesktop()`: Returns true if >= 1024px
- `isLargeDesktop()`: Returns true if >= 1280px

## Examples

### Theme-Aware Card Component
```tsx
import { useTheme } from '@/contexts/ThemeContext';

function Card({ children, variant = 'default' }) {
  const { theme } = useTheme();
  
  const variants = {
    default: 'bg-card text-card-foreground',
    accent: 'bg-accent text-accent-foreground',
    muted: 'bg-muted text-muted-foreground',
  };
  
  return (
    <div className={`${variants[variant]} rounded-lg p-6 shadow-lg transition-all duration-300`}>
      {children}
    </div>
  );
}
```

### Responsive Navigation
```tsx
import { responsive } from '@/contexts/ThemeContext';

function Navigation() {
  const isMobile = responsive.isMobile();
  
  return (
    <nav className="bg-background border-b border-border">
      {isMobile ? <MobileMenu /> : <DesktopMenu />}
    </nav>
  );
}
```

### Conditional Animations
```tsx
import { useMediaQuery } from '@/contexts/ThemeContext';

function AnimatedSection() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  
  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
    >
      Content
    </motion.div>
  );
}
```

## Integration with Existing Components

The theme system is already integrated into:
- ✅ Layout (root provider)
- ✅ Header (theme toggle)
- ✅ Global CSS (color variables)
- ✅ All UI components (via CSS variables)

No additional changes needed to existing components!
