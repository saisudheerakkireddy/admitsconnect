// Study Area List Screen Component
// Refactored with separate CSS file

import { useState } from 'react';
import './StudyAreaList.css';
import { GradientBackgroundTailwind } from '../GradientBackgroundTailwind';
import { useFormStore } from '../../store/formStore';
import { useFormNavigation } from '../../hooks/useFormNavigation';

interface StudyAreaOption {
  id: string;
  name: string;
}

const studyAreas: StudyAreaOption[] = [
  { id: "ai", name: "Artificial Intelligence" },
  { id: "data-science", name: "Data Science" },
  { id: "computer-science", name: "Computer Science" },
  { id: "business-admin", name: "Business Administration" },
  { id: "engineering", name: "Engineering" },
  { id: "medicine", name: "Medicine" },
  { id: "psychology", name: "Psychology" },
  { id: "economics", name: "Economics" },
  { id: "marketing", name: "Marketing" },
  { id: "finance", name: "Finance" },
];

const StarLogo = () => (
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 0L20.8 11H32.5L23 18L26.8 29L17 22L7.2 29L11 18L1.5 11H13.2L17 0Z" fill="#1E417C"/>
    <path d="M17 6L19.2 12.5H26L20.4 16.5L22.6 23L17 19L11.4 23L13.6 16.5L8 12.5H14.8L17 6Z" fill="#EE1113"/>
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

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="7" r="5" stroke="#333" strokeWidth="1.5"/>
    <path d="M11 11L14 14" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export default function StudyAreaList() {
  const { studyArea, setStudyArea } = useFormStore();
  const { goToNext, goToPrevious, canProceed } = useFormNavigation();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAreas = studyAreas.filter(area => 
    area.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNext = () => {
    if (canProceed) goToNext();
  };

  return (
    <GradientBackgroundTailwind variant="white" className="page-container">
      <header className="page-header">
        <div className="page-header__logo">
          <StarLogo />
          <span className="page-header__logo-text">One</span>
        </div>
        <div className="page-header__actions">
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

          <div className="area-search">
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
          <div className="area-list">
            {filteredAreas.map((area) => (
              <button 
                key={area.id}
                className={`area-list-item ${studyArea === area.id ? 'area-list-item--selected' : ''}`}
                onClick={() => setStudyArea(area.id)}
              >
                <span className="area-list-item__text">{area.name}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="page-divider-container">
          <div className="page-divider" />
        </div>
      </main>
    </GradientBackgroundTailwind>
  );
}

