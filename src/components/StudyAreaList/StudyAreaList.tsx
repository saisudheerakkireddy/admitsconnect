// Study Area List Screen Component
// Matching Figma Design with card grid layout (same as StudyIndustrySelection)

import { useMemo, useEffect } from 'react';
import './StudyAreaList.css';
import { useFormStore } from '../../store/formStore';
import { useFormNavigation } from '../../hooks/useFormNavigation';
import { getStudyAreasForIndustry, getIndustryById } from '../../config/studyAreaData';
import WizardLayout from '../WizardLayout';
import { LeftArrows, RightArrows } from '../NavigationArrows';

// Study Area Card with Icon
interface StudyAreaCardProps {
  id: string;
  name: string;
  iconPath: string;
  isSelected: boolean;
  onSelect: () => void;
}

const StudyAreaCard = ({ name, iconPath, isSelected, onSelect }: StudyAreaCardProps) => {
  return (
    <button 
      className={`area-card ${isSelected ? 'area-card--selected' : ''}`}
      onClick={onSelect}
    >
      <div className="area-card__icon">
        <img src={iconPath} alt={name} />
      </div>
      <span className="area-card__name">{name}</span>
    </button>
  );
};

export default function StudyAreaList() {
  const { industry, studyArea, setStudyArea } = useFormStore();
  const { goToNext, goToPrevious } = useFormNavigation();

  // Get study areas for selected industry
  const studyAreas = useMemo(() => {
    if (!industry) return [];
    return getStudyAreasForIndustry(industry);
  }, [industry]);

  // Get industry details for display
  const selectedIndustry = useMemo(() => {
    if (!industry) return null;
    return getIndustryById(industry);
  }, [industry]);

  // Filter areas based on search
  const filteredAreas = studyAreas;

  // If no industry selected, redirect back
  useEffect(() => {
    if (!industry) {
      console.warn('No industry selected, redirecting to industry selection');
    }
  }, [industry]);

  const handleAreaSelect = (areaId: string) => {
    // Select area and navigate to next page
    setStudyArea(areaId);
    goToNext();
  };

  const handleNext = () => {
    if (studyArea) goToNext();
  };

  // Show message if no industry is selected
  if (!industry || !selectedIndustry) {
    return (
      <WizardLayout variant="white" headerVariant="alt">
        <main className="area-main">
          <div className="area-empty-state">
            <h2>No Industry Selected</h2>
            <p>Please select an industry first to view available study areas.</p>
            <button onClick={goToPrevious} className="area-back-btn">
              Go Back to Industry Selection
            </button>
          </div>
        </main>
      </WizardLayout>
    );
  }

  return (
    <WizardLayout variant="white" headerVariant="alt">
      <main className="area-main">
        <section className="area-section">
          {/* Navigation Row */}
          <div className="area-nav-row">
            <button className="nav-arrow-btn nav-arrow-btn--left" onClick={goToPrevious} aria-label="Previous page">
              <LeftArrows />
            </button>
            <h1 className="area-page-title">Choose Your Study Area</h1>
            <button 
              className="nav-arrow-btn nav-arrow-btn--right" 
              onClick={handleNext} 
              disabled={!studyArea}
              aria-label="Next page"
            >
              <RightArrows />
            </button>
          </div>

          {/* Subtitle showing selected industry */}
          <div className="area-subtitle">
            Study areas for <strong>{selectedIndustry.name}</strong>
          </div>

          {/* Study Area Grid - Same as Industry Grid */}
          <div className="area-grid">
            {filteredAreas.map((area) => (
              <StudyAreaCard 
                key={area.id}
                id={area.id}
                name={area.name}
                iconPath={area.iconPath}
                isSelected={studyArea === area.id}
                onSelect={() => handleAreaSelect(area.id)}
              />
            ))}
          </div>
        </section>

        <div className="area-divider-container">
          <div className="area-divider" />
        </div>
      </main>
    </WizardLayout>
  );
}
