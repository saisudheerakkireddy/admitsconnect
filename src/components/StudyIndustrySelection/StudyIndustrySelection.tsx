// Study Industry Selection Screen Component
// Dynamically loads all industries from configuration

import { useState } from 'react';
import './StudyIndustrySelection.css';
import { useFormStore } from '../../store/formStore';
import { useFormNavigation } from '../../hooks/useFormNavigation';
import { getAllIndustries, searchIndustries } from '../../config/studyAreaData';
import { IndustryIcons } from './IndustryIcons';
import ThemeToggle from '../ThemeToggle';

// Common icons
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="7" r="5" stroke="#333" strokeWidth="1.5"/>
    <path d="M11 11L14 14" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

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
          <div style={{ width: 50, height: 50 }} />
        )}
      </div>
      <p className="industry-card__name">{industryName}</p>
    </button>
  );
};

interface StudyIndustrySelectionProps {
  theme?: 'light' | 'dark';
  onThemeToggle?: () => void;
}

export default function StudyIndustrySelection({ theme = 'light', onThemeToggle }: StudyIndustrySelectionProps) {
  const { industry, setIndustry } = useFormStore();
  const { goToNext, goToPrevious, canProceed } = useFormNavigation();
  const [searchTerm, setSearchTerm] = useState('');

  // Get all industries (already sorted alphabetically from the data)
  const allIndustries = getAllIndustries();
  
  // Filter based on search
  const filteredIndustries = searchTerm 
    ? searchIndustries(searchTerm)
    : allIndustries;

  const handleNext = () => {
    if (canProceed) goToNext();
  };

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
          <div className="industry-nav">
            <button className="page-nav-arrow" onClick={goToPrevious}>
              <LeftArrows />
            </button>
            <h1 className="page-title">Choose Your Study Industry</h1>
            <button className="page-nav-arrow" onClick={handleNext} disabled={!canProceed}>
              <RightArrows />
            </button>
          </div>

          <div className="industry-search">
            <div className="search-bar">
              <div className="search-bar__icon"><SearchIcon /></div>
              <div className="search-bar__divider" />
              <input 
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar__input"
              />
            </div>
          </div>
        </section>

        <section>
          <div className="industry-grid">
            {filteredIndustries.map((ind) => (
              <IndustryCard 
                key={ind.id}
                industryId={ind.id}
                industryName={ind.name}
                isSelected={industry === ind.id}
                onSelect={() => setIndustry(ind.id)}
              />
            ))}
          </div>
          
          {filteredIndustries.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
              No industries found matching "{searchTerm}"
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
