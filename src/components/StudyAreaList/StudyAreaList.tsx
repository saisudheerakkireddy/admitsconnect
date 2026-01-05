// Study Area List Screen Component
// Dynamically loads study areas based on selected industry

import { useState, useMemo, useEffect } from 'react';
import './StudyAreaList.css';
import { useFormStore } from '../../store/formStore';
import { useFormNavigation } from '../../hooks/useFormNavigation';
import { getStudyAreasForIndustry, getIndustryById } from '../../config/studyAreaData';
import ThemeToggle from '../ThemeToggle';

const ProfileIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#333"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 14H20V11.67H0V14ZM0 8.17H20V5.83H0V8.17ZM0 0V2.33H20V0H0Z" fill="#333"/>
  </svg>
);

const LeftArrows = () => (
  <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 1L2 6L7 11" stroke="#EE1113" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 1L9 6L14 11" stroke="#EE1113" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 1L16 6L21 11" stroke="#EE1113" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RightArrows = () => (
  <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 11L22 6L17 1" stroke="#EE1113" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 11L15 6L10 1" stroke="#EE1113" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 11L8 6L3 1" stroke="#EE1113" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="7" r="5" stroke="#333" strokeWidth="1.5"/>
    <path d="M11 11L14 14" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
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

interface StudyAreaListProps {
  theme?: 'light' | 'dark';
  onThemeToggle?: () => void;
}

export default function StudyAreaList({ theme = 'light', onThemeToggle }: StudyAreaListProps) {
  const { industry, studyArea, setStudyArea } = useFormStore();
  const { goToNext, goToPrevious, canProceed } = useFormNavigation();
  const [searchTerm, setSearchTerm] = useState('');

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
  const filteredAreas = useMemo(() => {
    if (!searchTerm) return studyAreas;
    const term = searchTerm.toLowerCase();
    return studyAreas.filter(area => 
      area.name.toLowerCase().includes(term)
    );
  }, [studyAreas, searchTerm]);

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
      <div className="page-container">
        <header className="page-header">
          <div className="page-header__logo">
            <img src="/assets/logo.png" alt="AUN Logo" style={{ height: '34px' }} />
          </div>
          <div className="page-header__actions">
            {onThemeToggle && (
              <ThemeToggle theme={theme} onToggle={onThemeToggle} />
            )}
            <ProfileIcon />
            <MenuIcon />
          </div>
        </header>

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
      </div>
    );
  }

  return (
    <div className="page-container">
      <header className="page-header">
        <div className="page-header__logo">
          <img src="/assets/logo.png" alt="AUN Logo" style={{ height: '34px' }} />
        </div>
        <div className="page-header__actions">
          {onThemeToggle && (
            <ThemeToggle theme={theme} onToggle={onThemeToggle} />
          )}
          <ProfileIcon />
          <MenuIcon />
        </div>
      </header>

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

          <div className="area-search">
            <div className="search-bar">
              <div className="search-bar__icon"><SearchIcon /></div>
              <div className="search-bar__divider" />
              <input 
                type="text"
                placeholder="Search study areas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar__input"
              />
            </div>
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
          
          {filteredAreas.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
              No study areas found matching "{searchTerm}"
            </div>
          )}
        </section>

        <div className="page-divider-container">
          <div className="page-divider" />
        </div>
      </main>
    </div>
  );
}
