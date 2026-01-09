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
  /** Optional: animation delay for staggered float effect */
  animationDelay?: string;
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
 * Variant 1: Pastel Gradient Background (Updated from Figma spec)
 * Used on: Home page, Form screens, Thank You page
 * 
 * Base background: white with animated pastel blobs
 * Blobs: Purple and Cyan with 100px blur, 20s float animation
 */
const PASTEL_BLOBS: BlobConfig[] = [
  {
    id: 'blob-1-purple-top',
    color: '#E8D6F0', // pastel-purple-base
    width: 246,
    height: 246,
    top: '13%',
    left: '26%',
    blur: 100,
    opacity: 0.8,
    animationDelay: '0s',
  },
  {
    id: 'blob-2-cyan-left',
    color: '#D6F0F5', // pastel-cyan-base
    width: 376,
    height: 376,
    bottom: '16%',
    left: '0',
    blur: 100,
    opacity: 0.8,
    animationDelay: '-5s',
  },
  {
    id: 'blob-3-cyan-center',
    color: '#C8EBF2', // pastel-cyan-medium
    width: 172,
    height: 172,
    bottom: '7%',
    left: '69%',
    blur: 90,
    opacity: 0.7,
    animationDelay: '-10s',
  },
  {
    id: 'blob-4-purple-top-right',
    color: '#DBC9E8', // pastel-purple-medium
    width: 376,
    height: 376,
    top: '-8%',
    left: '65%',
    blur: 100,
    opacity: 0.8,
    animationDelay: '-15s',
  },
];

/**
 * Variant 2: White Background with Animated Blobs (Updated from Figma spec)
 * Used on: Country Selection, Study Area screens
 * 
 * Base background: #FFFFFF (white)
 * Uses same blob config as pastel for consistency
 */
const WHITE_BLOBS: BlobConfig[] = [
  {
    id: 'blob-1-purple-top',
    color: '#E8D6F0', // pastel-purple-base
    width: 246,
    height: 246,
    top: '13%',
    left: '26%',
    blur: 100,
    opacity: 0.8,
    animationDelay: '0s',
  },
  {
    id: 'blob-2-cyan-left',
    color: '#D6F0F5', // pastel-cyan-base
    width: 376,
    height: 376,
    bottom: '16%',
    left: '0',
    blur: 100,
    opacity: 0.8,
    animationDelay: '-5s',
  },
  {
    id: 'blob-3-cyan-center',
    color: '#C8EBF2', // pastel-cyan-medium
    width: 172,
    height: 172,
    bottom: '7%',
    left: '69%',
    blur: 90,
    opacity: 0.7,
    animationDelay: '-10s',
  },
  {
    id: 'blob-4-purple-top-right',
    color: '#DBC9E8', // pastel-purple-medium
    width: 376,
    height: 376,
    top: '-8%',
    left: '65%',
    blur: 100,
    opacity: 0.8,
    animationDelay: '-15s',
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

const getBackgroundStyle = (variant: GradientVariant): React.CSSProperties => {
  // Variant is kept for forward-compatibility (future spec differences).
  // Read it to satisfy `noUnusedParameters` without changing behavior.
  void variant;
  // Both variants now use white background with animated blobs
  return {
    background: '#FFFFFF',
  };
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
  animate?: boolean;
}

const GradientBlob: React.FC<GradientBlobProps> = ({ config, animate = true }) => {
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
    // Animation: 20s ease-in-out infinite float
    animation: animate ? `blobFloat 20s ease-in-out infinite` : 'none',
    animationDelay: config.animationDelay || '0s',
    ...(config.top && { top: config.top }),
    ...(config.left && { left: config.left }),
    ...(config.right && { right: config.right }),
    ...(config.bottom && { bottom: config.bottom }),
  };

  return <div style={style} aria-hidden="true" data-blob-id={config.id} className="gradient-blob" />;
};

// ============================================================================
// ANIMATION KEYFRAMES (injected via style tag)
// ============================================================================

const blobAnimationStyles = `
@keyframes blobFloat {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(10px, -15px) scale(1.02);
  }
  50% {
    transform: translate(-5px, 10px) scale(0.98);
  }
  75% {
    transform: translate(-10px, -5px) scale(1.01);
  }
}

@media (prefers-reduced-motion: reduce) {
  .gradient-blob {
    animation: none !important;
  }
}
`;

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
    <>
      {/* Inject animation keyframes */}
      <style>{blobAnimationStyles}</style>
      
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
    </>
  );
};

export default GradientBackground;

