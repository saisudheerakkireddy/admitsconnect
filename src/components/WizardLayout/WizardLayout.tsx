// WizardLayout - Centralized layout component for wizard pages
// Wraps GradientBackgroundTailwind + Header pattern

import './WizardLayout.css';
import { GradientBackgroundTailwind } from '../GradientBackgroundTailwind';
import Header from '../Header';

export interface WizardLayoutProps {
  /** Background variant: 'pastel' or 'white' */
  variant?: 'pastel' | 'white';
  /** Header variant: 'default' or 'alt' */
  headerVariant?: 'default' | 'alt';
  /** Additional CSS class for the container */
  className?: string;
  /** Page content */
  children: React.ReactNode;
  /** Theme: 'light' or 'dark' */
  theme?: 'light' | 'dark';
  /** Theme toggle callback */
  onThemeToggle?: () => void;
}

export default function WizardLayout({
  variant = 'white',
  headerVariant = 'alt',
  className = '',
  children,
  theme = 'light',
  onThemeToggle,
}: WizardLayoutProps) {
  return (
    <GradientBackgroundTailwind 
      variant={variant} 
      className={`page-container ${className}`.trim()}
    >
      <Header 
        variant={headerVariant}
        theme={theme}
        onThemeToggle={onThemeToggle}
      />
      {children}
    </GradientBackgroundTailwind>
  );
}

export { WizardLayout };

