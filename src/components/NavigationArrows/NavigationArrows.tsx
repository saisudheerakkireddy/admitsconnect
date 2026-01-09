// Navigation Arrows Component
// Reusable navigation arrows with consistent styling across all pages
// Left arrows: Navy (#1E417C), Right arrows: Red (#C22032)

import './NavigationArrows.css';

interface NavigationArrowsProps {
  onPrevious?: () => void;
  onNext?: () => void;
  canGoNext?: boolean;
  canGoPrevious?: boolean;
}

export const LeftArrows = () => (
  <svg width="50" height="19" viewBox="0 0 50 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="nav-arrows-svg">
    <path d="M7 1.5L2 9.5L7 17.5" stroke="#1E417C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 1.5L9 9.5L14 17.5" stroke="#1E417C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 1.5L16 9.5L21 17.5" stroke="#1E417C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const RightArrows = () => (
  <svg width="50" height="19" viewBox="0 0 50 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="nav-arrows-svg">
    <path d="M43 17.5L48 9.5L43 1.5" stroke="#C22032" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M36 17.5L41 9.5L36 1.5" stroke="#C22032" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M29 17.5L34 9.5L29 1.5" stroke="#C22032" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function NavigationArrows({ 
  onPrevious, 
  onNext, 
  canGoNext = true,
  canGoPrevious = true 
}: NavigationArrowsProps) {
  return (
    <>
      <button 
        className="nav-arrow-btn nav-arrow-btn--left" 
        onClick={onPrevious}
        disabled={!canGoPrevious}
        aria-label="Previous page"
      >
        <LeftArrows />
      </button>
      <button 
        className="nav-arrow-btn nav-arrow-btn--right"
        onClick={onNext}
        disabled={!canGoNext}
        aria-label="Next page"
      >
        <RightArrows />
      </button>
    </>
  );
}

// Export individual components for flexibility
export { NavigationArrows };


