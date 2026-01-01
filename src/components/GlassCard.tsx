/**
 * GlassCard Component
 * 
 * A glassmorphism-styled card component designed to work beautifully
 * over the GradientBackground component.
 * 
 * Features:
 * - Frosted glass effect with backdrop blur
 * - Subtle border for depth
 * - Customizable blur intensity and opacity
 * - Works great on both pastel and white gradient variants
 */

import React from 'react';

// ============================================================================
// TYPES
// ============================================================================

export interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  /** Blur intensity: 'subtle' | 'medium' | 'strong' */
  blur?: 'subtle' | 'medium' | 'strong';
  /** Background opacity: 0.0 - 1.0 */
  opacity?: number;
  /** Border style */
  border?: 'none' | 'light' | 'gradient';
  /** Border radius in Tailwind notation or pixels */
  rounded?: string;
  /** Padding in Tailwind notation */
  padding?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Click handler */
  onClick?: () => void;
  /** Hover effect */
  hoverable?: boolean;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const BLUR_VALUES = {
  subtle: '8px',
  medium: '16px',
  strong: '24px',
};

const BORDER_STYLES = {
  none: 'none',
  light: '1px solid rgba(255, 255, 255, 0.3)',
  gradient: '1px solid rgba(255, 255, 255, 0.2)',
};

// ============================================================================
// COMPONENT
// ============================================================================

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  blur = 'medium',
  opacity = 0.7,
  border = 'light',
  rounded = '16px',
  padding = '24px',
  style = {},
  onClick,
  hoverable = false,
}) => {
  const cardStyle: React.CSSProperties = {
    background: `rgba(255, 255, 255, ${opacity})`,
    backdropFilter: `blur(${BLUR_VALUES[blur]})`,
    WebkitBackdropFilter: `blur(${BLUR_VALUES[blur]})`, // Safari support
    border: BORDER_STYLES[border],
    borderRadius: rounded,
    padding,
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    transition: hoverable ? 'all 0.3s ease' : undefined,
    cursor: onClick ? 'pointer' : undefined,
    ...style,
  };

  const hoverableClasses = hoverable
    ? 'hover:bg-white/80 hover:shadow-lg hover:-translate-y-1 transform'
    : '';

  return (
    <div
      className={`${hoverableClasses} ${className}`}
      style={cardStyle}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
};

// ============================================================================
// TAILWIND VERSION (for projects using Tailwind exclusively)
// ============================================================================

export interface GlassCardTailwindProps {
  children: React.ReactNode;
  className?: string;
  blur?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  hoverable?: boolean;
  onClick?: () => void;
}

export const GlassCardTailwind: React.FC<GlassCardTailwindProps> = ({
  children,
  className = '',
  blur = 'xl',
  hoverable = false,
  onClick,
}) => {
  const blurClass = `backdrop-blur-${blur}`;
  const hoverClasses = hoverable
    ? 'hover:bg-white/80 hover:shadow-lg hover:-translate-y-1 transition-all duration-300'
    : '';
  const cursorClass = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={`
        bg-white/70 
        ${blurClass}
        border border-white/30 
        rounded-2xl 
        p-6 
        shadow-lg
        ${hoverClasses}
        ${cursorClass}
        ${className}
      `}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
};

export default GlassCard;

