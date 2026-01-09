/**
 * FigmaTag Component
 * 
 * A responsive tag/chip button component that matches exact Figma specifications
 * across all viewport breakpoints (Mobile, Tablet, Desktop).
 * 
 * Uses CSS custom properties defined in variables.css for responsive styling:
 * - Mobile (base): 8px font, 28px height, 23px radius, Poppins Medium
 * - Tablet (768px+): 12px font, 40px height, 30px radius, Comfortaa Regular
 * - Desktop (1280px+): 15px font, 50px height, 30px radius, Poppins Medium
 * 
 * @example
 * ```tsx
 * <FigmaTag 
 *   label="Quick Offer" 
 *   isSelected={isSelected} 
 *   onToggle={() => handleToggle()} 
 * />
 * ```
 */

import { memo, type ButtonHTMLAttributes } from 'react';

export interface FigmaTagProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  /** The text label to display in the tag */
  label: string;
  /** Whether the tag is currently selected */
  isSelected?: boolean;
  /** Callback fired when the tag is clicked */
  onToggle?: () => void;
  /** Optional icon to display before the label */
  icon?: React.ReactNode;
  /** Optional custom className to extend styles */
  className?: string;
}

/**
 * FigmaTag - Responsive tag button matching Figma design system
 */
export const FigmaTag = memo(function FigmaTag({
  label,
  isSelected = false,
  onToggle,
  icon,
  className = '',
  disabled,
  ...props
}: FigmaTagProps) {
  const baseClasses = 'tag-figma';
  const selectedClass = isSelected ? 'tag-figma--selected' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onToggle}
      aria-pressed={isSelected}
      disabled={disabled}
      className={`${baseClasses} ${selectedClass} ${disabledClass} ${className}`.trim()}
      {...props}
    >
      {icon && <span className="mr-1.5 flex-shrink-0">{icon}</span>}
      {label}
    </button>
  );
});

export default FigmaTag;

