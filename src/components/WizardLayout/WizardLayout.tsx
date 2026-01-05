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
}

export default function WizardLayout({
  variant = 'white',
  headerVariant = 'alt',
  className = '',
  children,
}: WizardLayoutProps) {
  return (
    <GradientBackgroundTailwind 
      variant={variant} 
      className={`page-container ${className}`.trim()}
    >
      <Header 
        variant={headerVariant}
      />
      {children}
    </GradientBackgroundTailwind>
  );
}

export { WizardLayout };

