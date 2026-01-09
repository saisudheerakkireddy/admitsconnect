# Dark Mode Implementation

## Overview

I've successfully implemented a dark mode / light mode toggle feature for your Admits Connect application! The toggle displays as:
- **Moon icon** in light mode (click to switch to dark mode)
- **Sun icon** in dark mode (click to switch to light mode)

## Features Implemented

### 1. **Theme Toggle Component** (`ThemeToggle`)
- Animated sun/moon icon that rotates and scales when switching
- Smooth transitions between themes
- Accessible (keyboard navigation and screen reader support)
- Responsive sizing across devices

### 2. **Theme Hook** (`useTheme`)
- Manages theme state (light/dark)
- Persists theme preference to `localStorage`
- Respects system preferences (detects if user has dark mode enabled in their OS)
- Auto-applies theme class to HTML root element

### 3. **Dark Mode CSS Variables**
All colors have been adapted for dark mode in `/src/styles/variables.css`:
- Background colors inverted for dark surfaces
- Text colors adjusted for readability on dark backgrounds
- Border and shadow colors optimized for dark mode
- Brand colors (primary red, secondary blue) maintained for consistency
- All color tokens use CSS variables for easy theming

### 4. **Global Theme Support**
- Theme state managed at the App level
- Theme props passed to all page components
- Theme toggle appears in header of every page
- Smooth color transitions when switching themes

## File Structure

```
src/
├── hooks/
│   └── useTheme.ts                    # Theme management hook
├── components/
│   ├── ThemeToggle/
│   │   ├── ThemeToggle.tsx           # Toggle button component
│   │   ├── ThemeToggle.css           # Toggle button styles
│   │   └── index.ts                   # Export
│   ├── Header/
│   │   ├── Header.tsx                 # Updated with theme toggle
│   │   └── Header.css                 # Header styles
│   └── WizardLayout/
│       └── WizardLayout.tsx           # Updated to pass theme props
├── styles/
│   └── variables.css                  # Dark mode CSS variables added
├── index.css                          # Global theme transitions
└── App.tsx                            # Theme state management
```

## How It Works

### Theme State Flow

1. **App.tsx** creates the theme state using `useTheme()` hook
2. Theme and toggle function passed to all page components via props
3. Each page component passes theme props to its header
4. Header displays the `ThemeToggle` component
5. When user clicks toggle:
   - Theme state updates
   - `useTheme` hook applies `.dark` or `.light` class to `<html>` element
   - CSS variables update based on the applied class
   - Theme saved to `localStorage` for persistence

### Theme Persistence

- User's theme choice saved to browser's `localStorage`
- On next visit, theme automatically restored
- Falls back to system preference if no saved theme
- Falls back to light mode if no system preference

## Updated Components

All page components have been updated to accept and pass theme props:

- ✅ MobileHomePage
- ✅ CountrySelection
- ✅ StudyAreaSelection
- ✅ IntakeYearSelection
- ✅ StudyIndustrySelection
- ✅ StudyAreaList
- ✅ StudyFormatSelection
- ✅ RecentAcademicsInfo
- ✅ TestPreferences
- ✅ ContactInfo
- ✅ ThankYou
- ✅ WizardLayout (for future use)

## Testing the Implementation

### To Test:

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Navigate to your app** (typically http://localhost:5173)

3. **Test the toggle:**
   - Look for the moon icon in the header (top right area)
   - Click it to switch to dark mode
   - The icon should change to a sun icon
   - All colors should smoothly transition to dark theme
   - Click again to switch back to light mode

4. **Test persistence:**
   - Switch to dark mode
   - Refresh the page
   - Theme should remain dark
   - Close tab and reopen - theme should still be dark

5. **Test on different pages:**
   - Navigate through the form wizard
   - Theme toggle should appear on every page
   - Theme should persist across navigation

## Customization

### Adjusting Dark Mode Colors

Edit `/src/styles/variables.css` in the `.dark` section:

```css
.dark {
  /* Backgrounds */
  --color-bg-primary: #1A1A1A;        /* Main background */
  --color-bg-secondary: #2A2A2A;      /* Secondary surfaces */
  
  /* Text */
  --color-text-primary: #E5E5E5;      /* Main text */
  --color-text-secondary: #CCCCCC;    /* Secondary text */
  
  /* etc... */
}
```

### Changing Icon Colors

Edit `/src/components/ThemeToggle/ThemeToggle.css`:

```css
.theme-toggle__icon--sun {
  color: #FDB813;  /* Sun icon color */
}

.theme-toggle__icon--moon {
  color: #7B68EE;  /* Moon icon color */
}
```

### Adjusting Transition Speed

Edit `/src/styles/variables.css`:

```css
:root {
  --transition-fast: 150ms ease;
  --transition-normal: 200ms ease;
  --transition-slow: 300ms ease;
}
```

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Accessibility

- ✅ Keyboard navigable (Tab + Enter/Space)
- ✅ ARIA labels for screen readers
- ✅ Focus indicators
- ✅ Respects prefers-color-scheme media query

## Future Enhancements (Optional)

If you want to extend this further, you could:

1. **Add more themes:** Create additional theme classes (e.g., `.blue-theme`, `.high-contrast`)
2. **Theme preview:** Show a preview before applying
3. **Scheduled themes:** Auto-switch based on time of day
4. **Per-component overrides:** Allow specific components to ignore the theme
5. **Theme settings page:** Let users customize individual colors

## Need Help?

If you encounter any issues or want to customize the implementation further, you can:

1. Check the browser console for any errors
2. Inspect the `<html>` element to verify the `.dark` or `.light` class is being applied
3. Check `localStorage` for the `theme` key
4. Verify CSS variable values in DevTools

Enjoy your new dark mode! 🌙✨

