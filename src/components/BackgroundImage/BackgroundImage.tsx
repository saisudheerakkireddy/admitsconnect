import React, { useEffect, useState } from 'react';
import './BackgroundImage.css';

export type BackgroundVariant = 'pastel-mountains' | 'gradient-blobs' | 'hybrid';

export interface BackgroundImageProps {
  variant?: BackgroundVariant;
  children: React.ReactNode;
  className?: string;
  // Backwards compatibility
  showGradient?: boolean;
  customBlobs?: any[];
}

export const BackgroundImage: React.FC<BackgroundImageProps> = ({
  variant = 'pastel-mountains',
  children,
  className = '',
  showGradient = false,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload background image based on screen size
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const img = new Image();
    
    // Load appropriate image based on screen size
    img.src = isMobile 
      ? '/assets/backgrounds/hero-bg-mobile.webp'
      : '/assets/backgrounds/hero-bg-desktop.webp';
    
    img.onload = () => setImageLoaded(true);
    img.onerror = () => {
      // Fallback to PNG if WebP fails
      if (!isMobile) {
        const fallbackImg = new Image();
        fallbackImg.src = '/assets/backgrounds/hero-bg-desktop.png';
        fallbackImg.onload = () => setImageLoaded(true);
      }
    };
  }, []);

  const showBlobs = variant === 'gradient-blobs' || variant === 'hybrid';
  const showImage = variant === 'pastel-mountains' || variant === 'hybrid';

  return (
    <div 
      className={`background-container background-container--${variant} ${className}`}
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

      {/* Content Layer */}
      <div className="background-content">
        {children}
      </div>
    </div>
  );
};

export default BackgroundImage;

