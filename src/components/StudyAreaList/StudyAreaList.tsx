// Study Area List Screen Component
// Dynamically loads study areas based on selected industry

import { useMemo, useEffect } from 'react';
import './StudyAreaList.css';
import { useFormStore } from '../../store/formStore';
import { useFormNavigation } from '../../hooks/useFormNavigation';
import { getStudyAreasForIndustry, getIndustryById } from '../../config/studyAreaData';
import WizardLayout from '../WizardLayout';

const LeftArrows = () => (
  <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 1L2 6L7 11" stroke="#1E417C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 1L9 6L14 11" stroke="#1E417C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 1L16 6L21 11" stroke="#1E417C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RightArrows = () => (
  <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 11L22 6L17 1" stroke="#C22032" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 11L15 6L10 1" stroke="#C22032" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 11L8 6L3 1" stroke="#C22032" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

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
        <img src={iconPath} alt={name} width="40" height="40" />
      </div>
      <span className="area-card__name">{name}</span>
    </button>
  );
};

export default function StudyAreaList() {
  const { industry, studyArea, setStudyArea } = useFormStore();
  const { goToNext, goToPrevious, canProceed } = useFormNavigation();

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
      // Optionally redirect back to industry selection
    }
  }, [industry]);

  const handleNext = () => {
    if (canProceed) goToNext();
  };

  // Show message if no industry is selected
  if (!industry || !selectedIndustry) {
    return (
      <WizardLayout variant="white" headerVariant="alt">
        <main className="page-main">
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>No Industry Selected</h2>
            <p style={{ marginBottom: '2rem', color: '#666' }}>
              Please select an industry first to view available study areas.
            </p>
            <button 
              onClick={goToPrevious}
              className="glass-pill glass-pill--selected"
              style={{ padding: '1rem 2rem' }}
            >
              Go Back to Industry Selection
            </button>
          </div>
        </main>
      </WizardLayout>
    );
  }

  return (
    <WizardLayout variant="white" headerVariant="alt">
      <main className="page-main">
        <section>
          <div className="area-nav">
            <button className="page-nav-arrow" onClick={goToPrevious}>
              <LeftArrows />
            </button>
            <h1 className="page-title">Choose Your Study Area</h1>
            <button className="page-nav-arrow" onClick={handleNext} disabled={!canProceed}>
              <RightArrows />
            </button>
          </div>

          <div className="area-subtitle">
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '1rem' }}>
              Study areas for <strong>{selectedIndustry.name}</strong>
            </p>
          </div>
        </section>

        <section>
          <div className="area-grid">
            {filteredAreas.map((area) => (
              <StudyAreaCard 
                key={area.id}
                id={area.id}
                name={area.name}
                iconPath={area.iconPath}
                isSelected={studyArea === area.id}
                onSelect={() => setStudyArea(area.id)}
              />
            ))}
          </div>
        </section>

        <div className="page-divider-container">
          <div className="page-divider" />
        </div>
      </main>
    </WizardLayout>
  );
}
