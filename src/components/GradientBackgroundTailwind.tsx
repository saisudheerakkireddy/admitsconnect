/**
 * GradientBackground - Tailwind CSS Optimized Version
 * 
 * This version uses Tailwind classes where possible for better consistency
 * with Tailwind-based projects. Uses inline styles only for dynamic values.
 * 
 * Updated to match Figma spec with animated pastel blobs.
 * Compatible with Tailwind CSS v4.x
 */

import React from 'react';

// ============================================================================
// TYPES
// ============================================================================

export type GradientVariant = 'pastel' | 'white';

export interface GradientBackgroundTailwindProps {
  variant?: GradientVariant;
  children: React.ReactNode;
  className?: string;
}

// ============================================================================
// BLOB CONFIGURATION (from Figma spec)
// ============================================================================

interface BlobConfig {
  id: string;
  color: string;
  width: number;
  height: number;
  top?: string;
  left?: string;
  bottom?: string;
  blur: number;
  opacity: number;
  animationDelay: string;
}

const BLOBS: BlobConfig[] = [
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
// ANIMATION KEYFRAMES
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
  .gradient-blob-tw {
    animation: none !important;
  }
}
`;

// ============================================================================
// BLOB COMPONENT
// ============================================================================

const AnimatedBlob: React.FC<{ config: BlobConfig }> = ({ config }) => (
  <div
    className="absolute rounded-full gradient-blob-tw"
    style={{
      width: config.width,
      height: config.height,
      top: config.top,
      left: config.left,
      bottom: config.bottom,
      background: `radial-gradient(circle, ${config.color} 0%, transparent 70%)`,
      filter: `blur(${config.blur}px)`,
      opacity: config.opacity,
      animation: 'blobFloat 20s ease-in-out infinite',
      animationDelay: config.animationDelay,
      willChange: 'transform',
    }}
  />
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const GradientBackgroundTailwind: React.FC<GradientBackgroundTailwindProps> = ({
  variant = 'white',
  children,
  className = '',
}) => {
  const showBlobs = variant === 'pastel';

  return (
    <>
      {/* Inject animation keyframes */}
      {showBlobs && <style>{blobAnimationStyles}</style>}
      
      <div
        className={`relative min-h-screen w-full overflow-hidden bg-transparent ${className}`}
      >
        {/* Blob Container - only show for pastel variant */}
        {showBlobs && (
          <div className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
            {BLOBS.map((blob) => (
              <AnimatedBlob key={blob.id} config={blob} />
            ))}
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 w-full">{children}</div>
      </div>
    </>
  );
};

export default GradientBackgroundTailwind;
