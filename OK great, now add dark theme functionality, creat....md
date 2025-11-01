## **🌓 Dark Theme Functionality Strategy**

To implement a robust dark theme, you'll typically use a combination of global state management and CSS variables, with the theme.ts file acting as the single source of truth for all design tokens.

### **1\. The theme.ts File (Design Token Store)**

The theme.ts file will export an object containing all your design constants. For a dark theme, this involves defining your colors based on a "semantic" or "purpose-driven" naming convention, rather than just "blue" or "white."

* **Structure:** Define properties for both light and dark modes.

| Property | Light Mode Value (Example) | Dark Mode Value (Example) | Purpose |
| :---- | :---- | :---- | :---- |
| color.background.primary | \#FFFFFF (White) | \#1A1A1A (Dark Gray) | Main page background. |
| color.text.primary | \#1A1A1A (Dark Gray) | \#FFFFFF (White) | Standard body text. |
| color.surface.card | \#F4F4F4 (Light Gray) | \#2A2A2A (Slightly Lighter Dark) | Background for cards, sections, or modals. |
| color.accent | \#0070F3 (Electric Blue) | \#4A90E2 (Lighter Blue) | Buttons, links, and highlighted elements (must retain contrast). |
| shadow.standard | 0 4px 6px rgba(0,0,0,0.1) | none or 0 0 10px rgba(255,255,255,0.05) | Box shadows. Often reduced or inverted in dark mode. |

### **2\. Implementation Logic (The Flow)**

* **Theme Context/State Management:** You'll need a **React Context** (or a state management library like Zustand/Redux) to hold the current theme state ('light' or 'dark'). This context wrapper is placed in your global app/layout.tsx file.  
* **User Interface:** A **Theme Toggle Component** (e.g., a sun/moon icon) is placed, likely in the header (components/layout/Header.tsx). When clicked, it updates the theme state in the Context.  
* **Applying Styles via CSS Variables:**  
  * The theme.ts values are dynamically converted into **CSS Custom Properties (Variables)**.  
  * The current theme (e.g., data-theme="dark") is set as an attribute on the \<body\> or \<html\> element.  
  * Your global CSS defines the variables based on this attribute:  
    CSS  
    :root { /\* Default/Light Theme \*/  
      \--color\-bg-primary: \#FFFFFF;  
    }  
    \[data-theme="dark"\] { /\* Dark Theme \*/  
      \--color\-bg-primary: \#1A1A1A;  
    }

* **Component Usage:** Components access the variables using standard CSS: background-color: var(--color-bg-primary);. When the theme state updates, the data-theme attribute changes, and the browser automatically uses the corresponding set of variables, instantly changing the site's appearance.

### **3\. Persisting the Theme**

The user's theme preference must be saved using **localStorage**.

1. When the user toggles the theme, update the state *and* save the preference (e.g., localStorage.setItem('theme', 'dark')).  
2. On initial load of the page, the Context checks localStorage to retrieve the user's last preference and set the initial theme state.

---

## **✨ Animation Strategy (Component-Specific)**

To achieve different, impactful animations on every component, the strategy should focus on **subtlety, performance, and utilizing Intersection Observer** for scroll-based effects.

### **1\. Goal: "Different Animation on Every Component"**

The goal is achieved by using a **small library of distinct animation types** and applying them selectively to major components or sections. This avoids visual noise while ensuring variety.

| Component / Section | Suggested Animation Type | Why it Works |
| :---- | :---- | :---- |
| **Hero Section Headline** | **Typewriter/Staggered Reveal** | Draws immediate attention and conveys a sense of sophistication. |
| **Service Cards** | **Fade-in Up/Slide-in Right** | As the card scrolls into view, it slides or lifts slightly to signal readiness. |
| **Portfolio Images** | **Subtle Scale/3D Tilt** | A slight scaling or perspective shift on hover, or a gentle fade-in upon loading. |
| **Testimonial Quotes** | **Delayed Fade-in** | Ensures the text is read clearly, appearing a moment after the section is visible. |
| **CTAs (Buttons)** | **Pulse/Subtle Hover Glow** | Signals interactivity and guides the user toward the conversion goal. |

### **2\. Implementation Technique: Animation Library**

It's best practice to use a robust, modern animation library that handles performance optimization and complex sequences. **Framer Motion** is a popular choice for Next.js/React.

* **Logic:** Wrap the component you want to animate in a Framer Motion component (e.g., \<motion.div\>).  
* **Properties:** Define the animation using declarative properties:  
  * initial: The state *before* the animation (e.g., opacity: 0, y: 50).  
  * animate: The state *during* the animation (e.g., opacity: 1, y: 0).  
  * transition: Defines the timing, duration, and easing (e.g., duration: 0.8, delay: 0.2).

### **3\. Triggering the Animation (Scroll-Based)**

For an agency site, you typically want elements to animate only when they scroll into the user's viewport.

* **Intersection Observer:** The animation library (like Framer Motion) handles this automatically using a built-in feature called **whileInView** or a similar hook that leverages the **Intersection Observer API**.  
* **Threshold:** You can define how much of the element must be visible before the animation triggers (e.g., amount: 0.6 means 60% of the component is visible).

This strategy ensures animations are smooth, performant, and add visual polish without distracting from your agency's message or work.

use **CSS variables within Tailwind CSS** for a faster theming workflow?