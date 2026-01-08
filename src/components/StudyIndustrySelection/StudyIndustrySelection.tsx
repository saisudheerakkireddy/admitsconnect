// Study Industry Selection Screen Component
// Matching Figma Design with card grid layout

import './StudyIndustrySelection.css';
import { useFormStore } from '../../store/formStore';
import { useFormNavigation } from '../../hooks/useFormNavigation';
import { getAllIndustries } from '../../config/studyAreaData';
import { IndustryIcons } from './IndustryIcons';
import WizardLayout from '../WizardLayout';
import { LeftArrows, RightArrows } from '../NavigationArrows';

// Industry Card Component
interface IndustryCardProps {
  industryId: string;
  industryName: string;
  isSelected: boolean;
  onSelect: () => void;
}

const IndustryCard = ({ industryId, industryName, isSelected, onSelect }: IndustryCardProps) => {
  const iconUrl = IndustryIcons[industryId];
  
  return (
    <button 
      className={`industry-card ${isSelected ? 'industry-card--selected' : ''}`}
      onClick={onSelect}
    >
      <div className="industry-card__icon">
        {iconUrl ? (
          <img src={iconUrl} alt={industryName} />
        ) : (
          <div className="industry-card__icon-placeholder" />
        )}
      </div>
      <p className="industry-card__name">{industryName}</p>
    </button>
  );
};

export default function StudyIndustrySelection() {
  const { industry, setIndustry } = useFormStore();
  const { goToNext, goToPrevious, canProceed } = useFormNavigation();

  // Get all industries (already sorted alphabetically from the data)
  const allIndustries = getAllIndustries();

  const handleIndustrySelect = (industryId: string) => {
    // Select industry and navigate to next page
    setIndustry(industryId);
    // Navigate to next page after selection
    goToNext();
  };

  const handleNext = () => {
    if (canProceed) goToNext();
  };

  return (
    <WizardLayout variant="white" headerVariant="alt">
      <main className="industry-main">
        <section className="industry-section">
          {/* Navigation Row */}
          <div className="industry-nav-row">
            <button className="nav-arrow-btn nav-arrow-btn--left" onClick={goToPrevious} aria-label="Previous page">
              <LeftArrows />
            </button>
            <h1 className="industry-page-title">Choose Your Study Industry</h1>
            <button 
              className="nav-arrow-btn nav-arrow-btn--right" 
              onClick={handleNext} 
              disabled={!canProceed}
              aria-label="Next page"
            >
              <RightArrows />
            </button>
          </div>

          {/* Industry Grid - 5 columns on desktop */}
          <div className="industry-grid">
            {allIndustries.map((ind) => (
              <IndustryCard 
                key={ind.id}
                industryId={ind.id}
                industryName={ind.name}
                isSelected={industry === ind.id}
                onSelect={() => handleIndustrySelect(ind.id)}
              />
            ))}
          </div>
        </section>

        <div className="industry-divider-container">
          <div className="industry-divider" />
        </div>
      </main>
    </WizardLayout>
  );
}
