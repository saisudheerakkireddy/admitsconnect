/**
 * GradientBackground - Tailwind CSS Optimized Version
 * 
 * This version uses Tailwind classes where possible for better consistency
 * with Tailwind-based projects. Uses inline styles only for dynamic values.
 * 
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
// VARIANT: PASTEL (Form screens, Thank You page)
// ============================================================================

const PastelGradientBackground: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <div
      className={`relative min-h-screen overflow-hidden ${className}`}
      style={{
        background: 'linear-gradient(to bottom, #E8D5E8 0%, #D5E8E8 50%, #C5F0E8 100%)',
      }}
    >
      {/* Blob Container */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Purple blob - top right */}
        <div
          className="absolute rounded-full opacity-60"
          style={{
            width: 250,
            height: 250,
            top: 75,
            right: -50,
            background: 'radial-gradient(circle, rgba(200, 162, 200, 0.5) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        
        {/* Cyan blob - center left */}
        <div
          className="absolute rounded-full opacity-60"
          style={{
            width: 250,
            height: 250,
            top: 488,
            left: -50,
            background: 'radial-gradient(circle, rgba(150, 220, 220, 0.5) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        
        {/* Pink small blob - top left */}
        <div
          className="absolute rounded-full opacity-50"
          style={{
            width: 130,
            height: 130,
            top: 70,
            left: 14,
            background: 'radial-gradient(circle, rgba(255, 182, 193, 0.4) 0%, transparent 70%)',
            filter: 'blur(64px)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// ============================================================================
// VARIANT: WHITE (Country Selection, Study Area screens)
// ============================================================================

const WhiteGradientBackground: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <div 
      className={`relative min-h-screen overflow-hidden ${className}`}
      style={{
        // Soft pink-lavender to light blue gradient as base (matching Figma)
        background: 'linear-gradient(135deg, rgba(255, 230, 240, 0.6) 0%, rgba(240, 248, 255, 0.8) 50%, rgba(230, 250, 255, 0.7) 100%)',
      }}
    >
      {/* Blob Container - matching Figma's #38D3F0 cyan and soft pink */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Cyan blob - top right (Figma: #38D3F0) */}
        <div
          className="absolute rounded-full"
          style={{
            width: 280,
            height: 280,
            top: -80,
            right: -60,
            background: 'radial-gradient(circle, rgba(56, 211, 240, 0.5) 0%, transparent 70%)',
            filter: 'blur(65px)',
          }}
        />
        
        {/* Pink blob - left side (larger, elliptical) */}
        <div
          className="absolute rounded-full"
          style={{
            width: 320,
            height: 450,
            top: '15%',
            left: -100,
            background: 'radial-gradient(circle, rgba(255, 180, 210, 0.45) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        
        {/* Cyan blob - middle right (subtle) - Figma: #38D3F0 */}
        <div
          className="absolute rounded-full"
          style={{
            width: 180,
            height: 180,
            top: '45%',
            right: -40,
            background: 'radial-gradient(circle, rgba(56, 211, 240, 0.3) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        
        {/* Cyan blob - bottom right (Figma: #38D3F0 with heavy blur) */}
        <div
          className="absolute rounded-full"
          style={{
            width: 350,
            height: 350,
            bottom: -120,
            right: -40,
            background: 'radial-gradient(circle, rgba(56, 211, 240, 0.45) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
        
        {/* Pink blob - bottom left */}
        <div
          className="absolute rounded-full"
          style={{
            width: 200,
            height: 200,
            bottom: -50,
            left: -30,
            background: 'radial-gradient(circle, rgba(255, 180, 210, 0.4) 0%, transparent 70%)',
            filter: 'blur(70px)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const GradientBackgroundTailwind: React.FC<GradientBackgroundTailwindProps> = ({
  variant = 'white',
  children,
  className = '',
}) => {
  if (variant === 'pastel') {
    return <PastelGradientBackground className={className}>{children}</PastelGradientBackground>;
  }
  
  return <WhiteGradientBackground className={className}>{children}</WhiteGradientBackground>;
};

export default GradientBackgroundTailwind;

