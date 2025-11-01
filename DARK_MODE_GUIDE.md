# 🌓 Dark Mode Implementation Guide

## Overview
A complete dark mode system using React Context, CSS Variables, and Tailwind CSS. The theme persists across sessions using localStorage and respects user's system preferences.

---

## 🏗️ Architecture

### **Files Created**
1. **`src/lib/theme.ts`** - Theme color definitions
2. **`src/contexts/ThemeContext.tsx`** - React Context for theme state
3. **`src/components/ThemeToggle.tsx`** - Animated toggle button
4. **Updated:** `src/styles/globals.css` - CSS variables for both themes
5. **Updated:** `src/app/layout.tsx` - ThemeProvider wrapper
6. **Updated:** `src/components/layout/Header.tsx` - Dark mode styles + toggle
7. **Updated:** `tailwind.config.ts` - Dark mode configuration

---

## 🎨 Color System

### Light Theme
```css
Background: #FFFFFF (White)
Text: #111827 (Gray 900)
Card: #FFFFFF
Accent: #0891b2 (Cyan 600)
Border: #E5E7EB (Gray 200)
```

### Dark Theme
```css
Background: #0F172A (Slate 900)
Text: #F8FAFC (Slate 50)
Card: #1E293B (Slate 800)
Accent: #06B6D4 (Cyan 500)
Border: #334155 (Slate 700)
```

---

## 🔧 Implementation Details

### 1. Theme Definition (`lib/theme.ts`)
```typescript
export const themeColors = {
  light: {
    background: { primary: '#FFFFFF', secondary: '#F9FAFB' },
    text: { primary: '#111827', secondary: '#6B7280' },
    accent: { primary: '#0891b2' },
  },
  dark: {
    background: { primary: '#0F172A', secondary: '#1E293B' },
    text: { primary: '#F8FAFC', secondary: '#CBD5E1' },
    accent: { primary: '#06b6d4' },
  },
}
```

### 2. Theme Context (`contexts/ThemeContext.tsx`)
```typescript
// Provides: theme, toggleTheme, setTheme
<ThemeProvider>
  {children}
</ThemeProvider>
```

**Features:**
- ✅ Reads from localStorage on mount
- ✅ Respects system `prefers-color-scheme`
- ✅ Applies `data-theme` attribute to `<html>`
- ✅ Prevents hydration mismatch

### 3. Theme Toggle Component
```typescript
<ThemeToggle />
```

**Features:**
- 🌙 Animated sun/moon icons
- 🎚️ Sliding thumb animation
- 🎨 Gradient track (yellow→orange for light, blue→purple for dark)
- ♿ Accessible with ARIA labels

### 4. CSS Variables (`styles/globals.css`)
```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #111827;
  --accent-primary: #0891b2;
}

[data-theme='dark'] {
  --bg-primary: #0f172a;
  --text-primary: #f8fafc;
  --accent-primary: #06b6d4;
}
```

**Smooth Transitions:**
```css
* {
  transition-property: background-color, border-color, color;
  transition-duration: 200ms;
}
```

---

## 📦 Usage in Components

### Using Tailwind Dark Mode Classes
```tsx
<div className="bg-white dark:bg-slate-900">
  <h1 className="text-gray-900 dark:text-white">Hello</h1>
  <button className="bg-accent hover:bg-accent-dark dark:bg-cyan-500">
    Click Me
  </button>
</div>
```

### Using the Theme Hook
```tsx
import { useTheme } from '@/contexts/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}
```

### Using CSS Variables
```tsx
<div style={{ 
  backgroundColor: 'var(--bg-primary)',
  color: 'var(--text-primary)' 
}}>
  Content
</div>
```

---

## 🎯 Components Updated for Dark Mode

### ✅ Header
- Background: `bg-white dark:bg-slate-900`
- Text: `text-neutral-dark dark:text-white`
- Mobile menu: `dark:bg-slate-800`
- Borders: `dark:border-gray-700`

### ⏳ Pending Updates (To Do)
- [ ] Footer
- [ ] Hero Section
- [ ] Service Cards
- [ ] Portfolio Grid
- [ ] Team Cards
- [ ] Contact Form
- [ ] CTASection
- [ ] All custom components

---

## 🚀 How to Apply Dark Mode to Components

### Step 1: Update Background Colors
```tsx
// Before
<div className="bg-white">

// After
<div className="bg-white dark:bg-slate-900">
```

### Step 2: Update Text Colors
```tsx
// Before
<h2 className="text-gray-900">

// After
<h2 className="text-gray-900 dark:text-white">
```

### Step 3: Update Borders
```tsx
// Before
<div className="border border-gray-200">

// After
<div className="border border-gray-200 dark:border-slate-700">
```

### Step 4: Update Card Backgrounds
```tsx
// Before
<Card className="bg-white shadow-lg">

// After
<Card className="bg-white dark:bg-slate-800 shadow-lg dark:shadow-xl">
```

---

## 🎨 Common Dark Mode Patterns

### Gradient Backgrounds
```tsx
// Light → Dark gradient
className="bg-gradient-to-br from-teal-600 to-teal-800 dark:from-cyan-600 dark:to-blue-800"
```

### Hover States
```tsx
className="hover:bg-gray-100 dark:hover:bg-slate-700"
```

### Input Fields
```tsx
className="bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white"
```

### Shadows
```tsx
className="shadow-md dark:shadow-2xl dark:shadow-black/50"
```

---

## 📋 Checklist for Dark Mode

### Global Setup
- [x] Install theme system (Context + CSS vars)
- [x] Create ThemeToggle component
- [x] Add to Header
- [x] Configure Tailwind dark mode
- [x] Update global CSS

### Component Updates
- [x] Header
- [ ] Footer
- [ ] HeroSection
- [ ] ServicesSection
- [ ] PortfolioSection
- [ ] AboutSection
- [ ] CTASection
- [ ] ContactForm
- [ ] Button
- [ ] Card
- [ ] Input/TextArea/Select
- [ ] Team Cards
- [ ] Process Section
- [ ] FAQ Section
- [ ] Stats Counter
- [ ] Testimonial Carousel

---

## 🧪 Testing Dark Mode

### Manual Testing
1. Click theme toggle in header
2. Verify colors switch smoothly
3. Refresh page - theme persists
4. Check localStorage has 'theme' key
5. Test in both mobile and desktop

### System Preference
1. Change OS theme to dark
2. Clear localStorage
3. Load site - should default to dark
4. Toggle theme - should override system preference

---

## 🐛 Common Issues & Solutions

### Issue: Flashing on page load
**Solution:** The `suppressHydrationWarning` prop on `<html>` prevents this

### Issue: Theme doesn't persist
**Solution:** Check localStorage is working, verify ThemeProvider is wrapping app

### Issue: Some components don't change
**Solution:** Add `dark:` classes to all color-related classes

### Issue: Transitions too slow
**Solution:** Adjust `transition-duration` in globals.css

---

## 🎓 Best Practices

1. **Use semantic color names** - `bg-primary`, `text-secondary` not `bg-white`
2. **Test contrast** - Ensure text is readable in both themes
3. **Minimal shadows in dark mode** - Reduce or invert shadows
4. **Softer colors in dark mode** - Lower saturation for accent colors
5. **Consistent transitions** - All theme changes should animate smoothly

---

## 📊 Performance

- **Initial load:** ~5KB (Context + CSS vars)
- **Toggle speed:** < 200ms transition
- **localStorage read:** Synchronous, negligible impact
- **No flash:** suppressHydrationWarning prevents FOUC

---

## 🔮 Future Enhancements

- [ ] Auto theme based on time of day
- [ ] Custom theme builder
- [ ] Multiple theme options (dark, light, high contrast)
- [ ] Theme preview before applying
- [ ] Keyboard shortcut (Cmd/Ctrl + D)

---

**Built with ❤️ using React Context, Tailwind CSS, and Framer Motion**
