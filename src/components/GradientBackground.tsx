/**
 * GradientBackground Component
 * 
 * A reusable gradient background component with blurred blob effects.
 * Based on the AdmitsConnect design system from Figma.
 * 
 * @variant "pastel" - Purple/cyan/mint gradient background (for forms, thank you pages)
 * @variant "white" - White background with cyan/pink blobs (for selection screens)
 */

import React from 'react';

// ============================================================================
// TYPES
// ============================================================================

export type GradientVariant = 'pastel' | 'white';

export interface BlobConfig {
  id: string;
  color: string;
  width: number;
  height: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  blur: number;
  opacity: number;
  /** Optional: for elliptical shapes */
  borderRadius?: string;
}

export interface GradientBackgroundProps {
  /** The variant to use */
  variant?: GradientVariant;
  /** Child content to render above the gradient */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Minimum height of the container */
  minHeight?: string;
  /** Custom blobs configuration (overrides variant defaults) */
  customBlobs?: BlobConfig[];
  /** Whether to show the gradient (useful for conditional rendering) */
  showGradient?: boolean;
}

// ============================================================================
// BLOB CONFIGURATIONS
// ============================================================================

/**
 * Variant 1: Pastel Gradient Background
 * Used on: Home page, Form screens, Thank You page
 * 
 * Base background: linear-gradient(to bottom, #E8D5E8, #D5E8E8, #C5F0E8)
 * Blobs: Purple, Blue, Pink with heavy blur
 */
const PASTEL_BLOBS: BlobConfig[] = [
  {
    id: 'pastel-purple-top-right',
    color: 'rgba(200, 162, 200, 0.5)', // Purple-200 equivalent
    width: 250,
    height: 250,
    top: '75px',
    right: '-50px',
    blur: 80,
    opacity: 0.6,
  },
  {
    id: 'pastel-cyan-center-left',
    color: 'rgba(150, 220, 220, 0.5)', // Cyan/teal blob
    width: 250,
    height: 250,
    top: '488px',
    left: '-50px',
    blur: 80,
    opacity: 0.6,
  },
  {
    id: 'pastel-pink-small',
    color: 'rgba(255, 182, 193, 0.4)', // Pink-200 equivalent
    width: 130,
    height: 130,
    top: '70px',
    left: '14px',
    blur: 64,
    opacity: 0.5,
  },
];

/**
 * Variant 2: White Background with Colored Blobs
 * Used on: Country Selection, Study Area screens
 * 
 * Base background: #FFFFFF (white)
 * Blobs: Cyan and Pink with medium blur
 */
const WHITE_BLOBS: BlobConfig[] = [
  {
    id: 'white-cyan-top-right',
    color: 'rgba(56, 211, 240, 0.45)', // Bright cyan
    width: 280,
    height: 280,
    top: '-80px',
    right: '-60px',
    blur: 60,
    opacity: 0.45,
  },
  {
    id: 'white-pink-left',
    color: 'rgba(255, 150, 200, 0.5)', // Soft pink
    width: 320,
    height: 450,
    top: '15%',
    left: '-100px',
    blur: 80,
    opacity: 0.5,
  },
  {
    id: 'white-cyan-middle-right',
    color: 'rgba(56, 211, 240, 0.25)', // Light cyan
    width: 180,
    height: 180,
    top: '45%',
    right: '-40px',
    blur: 60,
    opacity: 0.25,
  },
  {
    id: 'white-cyan-bottom',
    color: 'rgba(56, 211, 240, 0.4)', // Cyan bottom
    width: 350,
    height: 350,
    bottom: '-120px',
    right: '-40px',
    blur: 90,
    opacity: 0.4,
  },
  {
    id: 'white-pink-bottom-left',
    color: 'rgba(255, 150, 200, 0.45)', // Pink bottom left
    width: 200,
    height: 200,
    bottom: '-50px',
    left: '-30px',
    blur: 70,
    opacity: 0.45,
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

const getBackgroundStyle = (variant: GradientVariant): React.CSSProperties => {
  switch (variant) {
    case 'pastel':
      return {
        background: 'linear-gradient(to bottom, #E8D5E8 0%, #D5E8E8 50%, #C5F0E8 100%)',
      };
    case 'white':
    default:
      return {
        background: '#FFFFFF',
      };
  }
};

const getBlobsForVariant = (variant: GradientVariant): BlobConfig[] => {
  switch (variant) {
    case 'pastel':
      return PASTEL_BLOBS;
    case 'white':
    default:
      return WHITE_BLOBS;
  }
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

interface GradientBlobProps {
  config: BlobConfig;
}

const GradientBlob: React.FC<GradientBlobProps> = ({ config }) => {
  const style: React.CSSProperties = {
    position: 'absolute',
    width: config.width,
    height: config.height,
    borderRadius: config.borderRadius || '50%',
    background: `radial-gradient(circle, ${config.color} 0%, transparent 70%)`,
    filter: `blur(${config.blur}px)`,
    opacity: config.opacity,
    pointerEvents: 'none',
    willChange: 'transform', // Performance optimization
    ...(config.top && { top: config.top }),
    ...(config.left && { left: config.left }),
    ...(config.right && { right: config.right }),
    ...(config.bottom && { bottom: config.bottom }),
  };

  return <div style={style} aria-hidden="true" data-blob-id={config.id} />;
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  variant = 'white',
  children,
  className = '',
  minHeight = '100vh',
  customBlobs,
  showGradient = true,
}) => {
  const blobs = customBlobs || getBlobsForVariant(variant);

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    minHeight,
    overflow: 'hidden',
    ...(showGradient ? getBackgroundStyle(variant) : {}),
  };

  return (
    <div style={containerStyle} className={className}>
      {/* Gradient Blobs Layer */}
      {showGradient && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 0,
          }}
          aria-hidden="true"
        >
          {blobs.map((blob) => (
            <GradientBlob key={blob.id} config={blob} />
          ))}
        </div>
      )}

      {/* Content Layer */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default GradientBackground;

