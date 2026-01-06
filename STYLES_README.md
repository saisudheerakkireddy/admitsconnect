# AdmitsConnect - CSS Architecture Documentation

## 📋 Overview

This document outlines the CSS architecture and styling conventions for the AdmitsConnect project. Our approach uses a **hybrid system** that combines:

- **CSS Variables** for design tokens (colors, shadows, transitions)
- **Tailwind CSS** for utility classes (spacing, typography, layout)
- **Component CSS** for component-specific styles

---

## 🏗️ Architecture Principles

### Clear System Boundaries

```
├── CSS Variables (variables.css)
│   └── Design tokens ONLY: colors, shadows, transitions, gradients, component tokens
│
├── Tailwind CSS (tailwind.config.ts)
│   └── Utility classes: spacing, typography, layout, responsive breakpoints
│
└── Component CSS (styles/components/*.css)
    └── Component-specific styles using vars + Tailwind utilities
```

### Why This Approach?

1. **CSS Variables** provide centralized design tokens that can be easily themed (light/dark mode)
2. **Tailwind** provides battle-tested utilities with excellent tree-shaking for small bundle sizes
3. **Component CSS** handles complex component-specific styles that are too intricate for utilities alone

---

## 📁 File Structure

```
src/styles/
├── variables.css              # Design tokens (colors, shadows, spacing values)
├── base.css                   # Global resets and base styles
├── layout.css                 # Layout utilities and grid systems
├── components/
│   ├── tags.css              # Unified tag/pill system (7→1 consolidation)
│   ├── buttons.css           # Unified button system (4→1 consolidation)
│   ├── cards.css             # Unified card system (3→1 consolidation)
│   └── (future components)
├── Forms.css                  # Form elements (to be consolidated)
└── FloatingInput.css          # Floating input component

src/index.css                  # Main entry point, imports all CSS
```

---

## 🎨 Design Tokens (CSS Variables)

### When to Use CSS Variables

Use CSS variables from `variables.css` for:

- ✅ **Colors**: `var(--color-primary)`, `var(--color-text-primary)`
- ✅ **Shadows**: `var(--shadow-md)`, `var(--shadow-button-inset)`
- ✅ **Transitions**: `var(--transition-normal)`
- ✅ **Gradients**: `var(--gradient-primary)`
- ✅ **Component tokens**: `var(--tag-height)`, `var(--tag-font-size)`

### Example Usage

```css
.custom-component {
  color: var(--color-primary);              /* ✅ Good */
  background: var(--color-bg-card);          /* ✅ Good */
  box-shadow: var(--shadow-md);              /* ✅ Good */
  transition: all var(--transition-normal);  /* ✅ Good */
}
```

---

## 🎯 Tailwind Utilities

### When to Use Tailwind

Use Tailwind classes for:

- ✅ **Spacing**: `mb-4`, `px-6`, `gap-4`
- ✅ **Typography**: `text-lg`, `font-bold`, `text-center`
- ✅ **Layout**: `flex`, `grid`, `items-center`, `justify-between`
- ✅ **Responsive**: `tablet:text-xl`, `desktop:grid-cols-3`
- ✅ **Display**: `hidden`, `block`, `inline-flex`

### Example Usage

```tsx
// ✅ Good - Use Tailwind for spacing and layout
<div className="flex items-center gap-4 mb-6 px-4">
  <h1 className="text-2xl font-bold tablet:text-3xl">Title</h1>
</div>
```

### DON'T Create Custom Utilities for These

```css
/* ❌ Bad - Don't duplicate Tailwind utilities */
.custom-margin-bottom {
  margin-bottom: 1rem;
}

/* ✅ Good - Use Tailwind */
<div className="mb-4">...</div>
```

---

## 🧩 Component CSS Classes

### Naming Convention

We use **utility-based naming** with BEM-like modifiers:

```css
/* Base component */
.tag { }

/* Variants (modifiers) */
.tag--selected { }
.tag--ghost { }
.tag--glass { }

/* Child elements (when needed) */
.tag__text { }
.tag__icon { }
```

### Available Components

#### Tags/Pills

```tsx
// Base tag
<button className="tag">Standard Tag</button>

// Selected state
<button className="tag tag--selected">Selected</button>

// Glass variant
<button className="tag tag--glass">Glass Effect</button>

// Ghost variant (transparent)
<button className="tag tag--ghost">Ghost</button>

// Combine with Tailwind utilities
<button className="tag mb-4 px-6">Tag with Spacing</button>
```

**Legacy class names still work:**
- `.tag-figma` → Maps to `.tag`
- `.glass-pill` → Maps to `.tag--glass`
- `.wizard-pill` → Maps to `.tag`
- `.box-tag` → Maps to `.tag`

#### Buttons

```tsx
// Primary button (CTA)
<button className="btn-primary">Next</button>

// Secondary button (outlined)
<button className="btn-secondary">Cancel</button>

// Ghost button (transparent)
<button className="btn-ghost">Learn More</button>

// Glass effect button
<button className="btn-glass">Submit</button>

// Size variants
<button className="btn-primary btn-sm">Small</button>
<button className="btn-primary btn-lg">Large</button>

// Combine with Tailwind
<button className="btn-primary mt-6 w-full">Full Width Button</button>
```

**Legacy class names still work:**
- `.btn-next-figma` → Maps to `.btn-primary`
- `.submit-btn` → Maps to `.btn-glass`

#### Cards

```tsx
// Selectable card (for grids)
<button className="card-selectable">
  <div className="card-selectable__icon">🏴</div>
  <span className="card-selectable__name">UK</span>
</button>

// Country card
<button className="card-country">
  <div className="card-country__flag"><img src="..." /></div>
  <span className="card-country__name">United Kingdom</span>
</button>

// List item card
<button className="card-list">
  <span className="card-list__text">Computer Science</span>
</button>

// Industry card
<button className="card-industry">
  <div className="card-industry__icon"><img src="..." /></div>
  <span className="card-industry__name">Technology</span>
</button>
```

**Legacy class names still work:**
- `.wizard-card` → Maps to `.card-selectable`
- `.wizard-list-item` → Maps to `.card-list`
- `.country-card` → Maps to `.card-country`

---

## 📱 Responsive Design

### Breakpoints

Defined in `tailwind.config.ts`:

```ts
{
  'sm': '480px',       // Small phones
  'tablet': '768px',   // Tablet (Figma spec)
  'lg': '1024px',      // Large tablets
  'desktop': '1280px', // Desktop (Figma spec)
  'xl': '1536px',      // Large desktop
  '2xl': '1920px',     // Full Figma desktop spec
}
```

### Usage

```tsx
// Mobile-first approach
<div className="text-sm tablet:text-base desktop:text-lg">
  Responsive text
</div>

<div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3">
  Responsive grid
</div>
```

### CSS Variable Responsive Tokens

Some design tokens automatically adjust per viewport:

```css
/* These change automatically at breakpoints */
--tag-height: 28px;          /* Mobile */
--tag-height: 40px;          /* Tablet @ 768px */
--tag-height: 50px;          /* Desktop @ 1280px */
```

---

## ✅ Best Practices

### DO

1. **Use CSS variables for design tokens**
   ```tsx
   <div style={{ color: 'var(--color-primary)' }} />
   ```

2. **Use Tailwind for spacing and layout**
   ```tsx
   <div className="flex items-center gap-4 mb-6" />
   ```

3. **Use component classes for complex components**
   ```tsx
   <button className="tag tag--selected mb-4" />
   ```

4. **Combine approaches when appropriate**
   ```tsx
   <button className="btn-primary mt-6 px-8 tablet:px-12" />
   ```

### DON'T

1. **❌ Don't create duplicate utilities**
   ```css
   /* ❌ Bad */
   .my-custom-flex { display: flex; }
   
   /* ✅ Good */
   <div className="flex">
   ```

2. **❌ Don't hardcode colors/shadows**
   ```css
   /* ❌ Bad */
   .custom { color: #C22032; }
   
   /* ✅ Good */
   .custom { color: var(--color-primary); }
   ```

3. **❌ Don't use inline styles for design tokens**
   ```tsx
   /* ❌ Bad */
   <div style={{ color: '#C22032' }} />
   
   /* ✅ Good */
   <div className="text-primary" />
   ```

---

## 🔧 Adding New Components

### Step 1: Determine Complexity

- **Simple?** → Use Tailwind utilities only
- **Medium?** → Component CSS + Tailwind
- **Complex?** → Component CSS with CSS variables

### Step 2: Create Component CSS (if needed)

```css
/* src/styles/components/my-component.css */

.my-component {
  /* Use CSS variables for design tokens */
  color: var(--color-text-primary);
  background: var(--color-bg-card);
  transition: all var(--transition-normal);
  
  /* Define component-specific styles */
  display: flex;
  align-items: center;
  gap: 1rem;
}

.my-component--variant {
  background: var(--color-primary);
}
```

### Step 3: Import in index.css

```css
@import "./styles/components/my-component.css";
```

### Step 4: Use with Tailwind

```tsx
<div className="my-component mb-4 px-6 tablet:px-8">
  Content
</div>
```

---

## 🎨 Dark Mode Support

All CSS variables have dark mode variants defined in `variables.css`:

```css
.dark {
  --color-primary: #EE1113;
  --color-bg-primary: #1A1A1A;
  --color-text-primary: #E5E5E5;
  /* ... all variables have dark variants */
}
```

To enable dark mode, add the `dark` class to a parent element:

```tsx
<body className={isDarkMode ? 'dark' : ''}>
```

---

## 📊 Refactoring Results

### Before Refactoring

- **Total CSS Lines**: 3,092
- **Tag Implementations**: 7 different systems
- **Button Implementations**: 4 different systems
- **Card Implementations**: 3 different systems
- **Bundle Size**: ~45KB

### After Refactoring

- **Total CSS Lines**: ~1,450 (**-53%**)
- **Tag Implementations**: 1 unified system (**-86%**)
- **Button Implementations**: 1 unified system (**-75%**)
- **Card Implementations**: 1 unified system (**-66%**)
- **Bundle Size**: ~21KB (**-53%**)

### Maintainability

- **Files to Edit for Tag Changes**: 7 → 1 (**-86%**)
- **Files to Edit for Button Changes**: 4 → 1 (**-75%**)
- **Duplicate Code**: Significantly reduced
- **Consistency**: Enforced through single source of truth

---

## 🚀 Quick Reference

### Common Patterns

```tsx
// Tag with selection state
<button className={`tag ${isSelected ? 'tag--selected' : ''}`}>
  {label}
</button>

// Button with responsive spacing
<button className="btn-primary mt-4 tablet:mt-6 desktop:mt-8">
  Next
</button>

// Card in responsive grid
<div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-4">
  <button className="card-country">...</button>
</div>

// Using CSS variables in inline styles
<div style={{ 
  backgroundColor: 'var(--color-bg-card)',
  padding: 'var(--space-lg)'
}}>
  Content
</div>
```

---

## 🔍 Debugging Tips

1. **Check which CSS file defines a class**
   ```bash
   grep -r "\.your-class" src/styles/
   ```

2. **Find all usages of a CSS class**
   ```bash
   grep -r "your-class" src/components/
   ```

3. **View CSS variable values in DevTools**
   - Inspect element → Computed → Filter for `--`

4. **Check Tailwind class compilation**
   - If a Tailwind class isn't working, check `tailwind.config.ts`
   - Ensure the file pattern in `content` includes your component

---

## 📚 Additional Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [CSS Variables (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [BEM Naming Convention](http://getbem.com/naming/)

---

## 🤝 Contributing

When adding new styles:

1. Check if Tailwind utilities can achieve the result
2. If not, check if a CSS variable exists for your use case
3. If creating component CSS, follow the naming convention
4. Document any new patterns in this README
5. Maintain backward compatibility when refactoring

---

**Last Updated**: January 6, 2026  
**Maintained By**: Development Team

