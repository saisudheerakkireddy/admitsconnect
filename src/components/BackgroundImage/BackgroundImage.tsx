import React, { useEffect, useState } from 'react';
import './BackgroundImage.css';

export type BackgroundVariant = 'pastel-mountains' | 'gradient-blobs' | 'hybrid';

export interface BackgroundImageProps {
  variant?: BackgroundVariant;
  children: React.ReactNode;
  className?: string;
  theme?: 'light' | 'dark';
  // Backwards compatibility
  showGradient?: boolean;
  customBlobs?: any[];
}

export const BackgroundImage: React.FC<BackgroundImageProps> = ({
  variant = 'pastel-mountains',
  children,
  className = '',
  theme = 'light',
  showGradient = false,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload background image
  useEffect(() => {
    const img = new Image();
    img.src = '/assets/backgrounds/hero-bg-desktop.webp';
    img.onload = () => setImageLoaded(true);
  }, []);

  const showBlobs = variant === 'gradient-blobs' || variant === 'hybrid';
  const showImage = variant === 'pastel-mountains' || variant === 'hybrid';

  return (
    <div 
      className={`background-container background-container--${variant} ${className}`}
      data-theme={theme}
      data-loaded={imageLoaded}
    >
      {/* Background Image Layer */}
      {showImage && (
        <div className="background-image-layer" aria-hidden="true">
          {/* CSS handles the actual image via background-image */}
        </div>
      )}

      {/* Optional: Gradient Blobs Layer (for hybrid mode) */}
      {showBlobs && showGradient && (
        <div className="background-blobs-layer" aria-hidden="true">
          {/* Blob rendering logic from GradientBackground */}
        </div>
      )}

      {/* Dark Mode Overlay */}
      {theme === 'dark' && showImage && (
        <div className="background-dark-overlay" aria-hidden="true" />
      )}

      {/* Content Layer */}
      <div className="background-content">
        {children}
      </div>
    </div>
  );
};

export default BackgroundImage;

