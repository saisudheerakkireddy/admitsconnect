// GradientIcon - Utility component to apply gradient filter to SVG icons
// Uses CSS filters and SVG gradient definitions

import './GradientIcon.css';

export interface GradientIconProps {
  /** Path to the SVG icon */
  src: string;
  /** Alt text for accessibility */
  alt?: string;
  /** Additional CSS class */
  className?: string;
  /** Icon size in pixels (default: 48) */
  size?: number;
}

// Unique ID for the gradient definition to avoid conflicts
const GRADIENT_ID = 'icon-gradient-filter';

export function GradientIcon({ 
  src, 
  alt = '', 
  className = '',
  size = 48 
}: GradientIconProps) {
  return (
    <div 
      className={`gradient-icon ${className}`.trim()}
      style={{ width: size, height: size }}
    >
      <img 
        src={src} 
        alt={alt} 
        className="gradient-icon__img"
      />
      {/* SVG filter definition for gradient coloring */}
      <svg width="0" height="0" aria-hidden="true" className="gradient-icon__defs">
        <defs>
          <linearGradient id={GRADIENT_ID} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F4303B" />
            <stop offset="100%" stopColor="#2E23F3" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default GradientIcon;

