// Study Industry Selection Screen Component
// Styled to match CountrySelection for UI consistency

import { useState } from 'react';
import './StudyIndustrySelection.css';
import { GradientBackgroundTailwind } from '../GradientBackgroundTailwind';
import { useFormStore } from '../../store/formStore';
import { useFormNavigation } from '../../hooks/useFormNavigation';

interface Industry {
  id: string;
  name: string;
  icon: React.ReactNode;
}

// Industry Icons - Red color (#C22032) to match brand
const AppliedScienceIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 8C22.2091 8 24 6.20914 24 4C24 1.79086 22.2091 0 20 0C17.7909 0 16 1.79086 16 4C16 6.20914 17.7909 8 20 8Z" stroke="#C22032" strokeWidth="1.5" fill="none"/>
    <path d="M16 12H24V28H28V32H12V28H16V12Z" stroke="#C22032" strokeWidth="1.5" fill="none"/>
    <path d="M8 36H32" stroke="#C22032" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="20" cy="20" r="3" fill="#C22032"/>
  </svg>
);

const BusinessIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="12" width="32" height="24" rx="2" stroke="#C22032" strokeWidth="1.5" fill="none"/>
    <path d="M14 12V8C14 6.89543 14.8954 6 16 6H24C25.1046 6 26 6.89543 26 8V12" stroke="#C22032" strokeWidth="1.5" fill="none"/>
    <path d="M4 20H36" stroke="#C22032" strokeWidth="1.5"/>
    <rect x="16" y="16" width="8" height="8" rx="1" fill="#C22032"/>
  </svg>
);

const EngineeringIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="16" stroke="#C22032" strokeWidth="1.5" fill="none"/>
    <circle cx="20" cy="20" r="8" stroke="#C22032" strokeWidth="1.5" fill="none"/>
    <circle cx="20" cy="20" r="3" fill="#C22032"/>
    <path d="M20 4V10" stroke="#C22032" strokeWidth="1.5"/>
    <path d="M20 30V36" stroke="#C22032" strokeWidth="1.5"/>
    <path d="M4 20H10" stroke="#C22032" strokeWidth="1.5"/>
    <path d="M30 20H36" stroke="#C22032" strokeWidth="1.5"/>
  </svg>
);

const HealthIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 36C20 36 34 26 34 16C34 10 29.5228 6 24 6C21.5 6 20 8 20 8C20 8 18.5 6 16 6C10.4772 6 6 10 6 16C6 26 20 36 20 36Z" stroke="#C22032" strokeWidth="1.5" fill="none"/>
    <path d="M16 18H24" stroke="#C22032" strokeWidth="2" strokeLinecap="round"/>
    <path d="M20 14V22" stroke="#C22032" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ArtsIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="16" stroke="#C22032" strokeWidth="1.5" fill="none"/>
    <circle cx="14" cy="14" r="3" fill="#C22032"/>
    <circle cx="26" cy="14" r="3" fill="#C22032"/>
    <circle cx="14" cy="26" r="3" fill="#C22032"/>
    <circle cx="26" cy="26" r="3" fill="#C22032"/>
    <path d="M8 20L32 20" stroke="#C22032" strokeWidth="1.5" strokeDasharray="2 2"/>
  </svg>
);

const ComputerIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="6" width="32" height="22" rx="2" stroke="#C22032" strokeWidth="1.5" fill="none"/>
    <path d="M12 34H28" stroke="#C22032" strokeWidth="2" strokeLinecap="round"/>
    <path d="M16 28V34" stroke="#C22032" strokeWidth="1.5"/>
    <path d="M24 28V34" stroke="#C22032" strokeWidth="1.5"/>
    <path d="M12 14L16 18L12 22" stroke="#C22032" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 22H28" stroke="#C22032" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const SocialIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="12" r="6" stroke="#C22032" strokeWidth="1.5" fill="none"/>
    <path d="M8 36C8 28 13.3726 22 20 22C26.6274 22 32 28 32 36" stroke="#C22032" strokeWidth="1.5" fill="none"/>
    <circle cx="8" cy="16" r="4" stroke="#C22032" strokeWidth="1.5" fill="none"/>
    <circle cx="32" cy="16" r="4" stroke="#C22032" strokeWidth="1.5" fill="none"/>
  </svg>
);

const LawIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 4V36" stroke="#C22032" strokeWidth="1.5"/>
    <path d="M8 10H32" stroke="#C22032" strokeWidth="2" strokeLinecap="round"/>
    <path d="M4 18L12 10L12 18L4 18Z" stroke="#C22032" strokeWidth="1.5" fill="none"/>
    <path d="M36 18L28 10L28 18L36 18Z" stroke="#C22032" strokeWidth="1.5" fill="none"/>
    <rect x="12" y="32" width="16" height="4" rx="1" fill="#C22032"/>
  </svg>
);

const industries: Industry[] = [
  { id: "applied-sciences", name: "Applied Sciences &\nProfessionals", icon: <AppliedScienceIcon /> },
  { id: "business", name: "Business &\nManagement", icon: <BusinessIcon /> },
  { id: "engineering", name: "Engineering &\nTechnology", icon: <EngineeringIcon /> },
  { id: "health", name: "Health &\nMedicine", icon: <HealthIcon /> },
  { id: "arts", name: "Arts &\nHumanities", icon: <ArtsIcon /> },
  { id: "computer", name: "Computer Science\n& IT", icon: <ComputerIcon /> },
  { id: "social", name: "Social\nSciences", icon: <SocialIcon /> },
  { id: "law", name: "Law &\nLegal Studies", icon: <LawIcon /> },
];

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

// Industry Card Component - matching CountryCard pattern
interface IndustryCardProps {
  industry: Industry;
  isSelected: boolean;
  onSelect: () => void;
}

const IndustryCard = ({ industry, isSelected, onSelect }: IndustryCardProps) => (
  <button 
    className={`industry-card ${isSelected ? 'industry-card--selected' : ''}`}
    onClick={onSelect}
  >
    <div className="industry-card__icon">
      {industry.icon}
    </div>
    <p className="industry-card__name">{industry.name}</p>
  </button>
);

export default function StudyIndustrySelection() {
  const { industry, setIndustry } = useFormStore();
  const { goToNext, goToPrevious, canProceed } = useFormNavigation();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIndustries = industries.filter(ind => 
    ind.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNext = () => {
    if (canProceed) goToNext();
  };

  return (
    <GradientBackgroundTailwind variant="white" className="page-container">
      <header className="page-header">
        <div className="page-header__logo">
          <img src="/assets/logo.png" alt="AUN Logo" style={{ height: '34px' }} />
        </div>
        <div className="page-header__actions">
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
                industry={ind}
                isSelected={industry === ind.id}
                onSelect={() => setIndustry(ind.id)}
              />
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
