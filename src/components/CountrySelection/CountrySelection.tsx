// Country Selection Screen Component
// Refactored with separate CSS file

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CountrySelection.css';
import { GradientBackgroundTailwind } from '../GradientBackgroundTailwind';
import { useFormStore } from '../../store/formStore';
import { useFormNavigation } from '../../hooks/useFormNavigation';
import { ROUTES } from '../../api/types';

interface Country {
  name: string;
  flagUrl: string;
}

const countries: Country[] = [
  { name: "Australia", flagUrl: "/assets/icons/flags/Australia.svg" },
  { name: "Canada", flagUrl: "/assets/icons/flags/Canada.svg" },
  { name: "UK", flagUrl: "/assets/icons/flags/UK.svg" },
  { name: "USA", flagUrl: "/assets/icons/flags/USA.svg" },
  { name: "Ireland", flagUrl: "/assets/icons/flags/Ireland.svg" },
  { name: "Germany", flagUrl: "/assets/icons/flags/Germany.svg" },
  { name: "Switzerland", flagUrl: "/assets/icons/flags/Switzerland.svg" },
  { name: "Sweden", flagUrl: "/assets/icons/flags/Sweden.svg" },
  { name: "Netherlands", flagUrl: "/assets/icons/flags/Netherlands.svg" },
  { name: "New Zealand", flagUrl: "/assets/icons/flags/NewZealand.svg" },
  { name: "Cyprus", flagUrl: "/assets/icons/flags/Cyprus.svg" },
  { name: "Denmark", flagUrl: "/assets/icons/flags/Denmark.svg" },
  { name: "France", flagUrl: "/assets/icons/flags/France.svg" },
  { name: "Italy", flagUrl: "/assets/icons/flags/Italy.svg" },
  { name: "Finland", flagUrl: "/assets/icons/flags/Finland.svg" },
  { name: "Latvia", flagUrl: "/assets/icons/flags/Latvia.svg" },
  { name: "Malta", flagUrl: "/assets/icons/flags/Malta.svg" },
  { name: "Norway", flagUrl: "/assets/icons/flags/Norway.svg" },
  { name: "Poland", flagUrl: "/assets/icons/flags/Poland.svg" },
  { name: "Singapore", flagUrl: "/assets/icons/flags/Singapore.svg" },
  { name: "Spain", flagUrl: "/assets/icons/flags/Spain.svg" },
];


// Profile Icon
const ProfileIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#333"/>
  </svg>
);

// Menu Icon
const MenuIcon = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 14H20V11.67H0V14ZM0 8.17H20V5.83H0V8.17ZM0 0V2.33H20V0H0Z" fill="#333"/>
  </svg>
);

// Navigation Arrow Icons
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

// Country Card Component
interface CountryCardProps {
  country: Country;
  isSelected: boolean;
  onSelect: () => void;
}

const CountryCard = ({ country, isSelected, onSelect }: CountryCardProps) => (
  <button 
    className={`country-card ${isSelected ? 'country-card--selected' : ''}`}
    onClick={onSelect}
  >
    <div className="country-card__flag">
      <img 
        src={country.flagUrl} 
        alt={`${country.name} flag`}
        onError={(e) => {
          (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iNTQiIHZpZXdCb3g9IjAgMCA1NiA1NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNTYiIGhlaWdodD0iNTQiIHJ4PSI0IiBmaWxsPSIjZTBlMGUwIi8+PC9zdmc+';
        }}
      />
    </div>
    <p className="country-card__name">{country.name}</p>
  </button>
);

export default function CountrySelection() {
  const { country, setCountry } = useFormStore();
  const { goToPrevious, canProceed } = useFormNavigation();
  const navigate = useNavigate();

  // Reset country selection when entering this page
  useEffect(() => {
    setCountry('');
  }, [setCountry]);

  const handleCountrySelect = (countryName: string) => {
    setCountry(countryName);
    // Navigate directly to next page in one click
    navigate(ROUTES.STUDY_LEVEL);
  };

  const handleNext = () => {
    if (canProceed) {
      navigate(ROUTES.STUDY_LEVEL);
    }
  };

  return (
    <GradientBackgroundTailwind variant="white" className="page-container">
      {/* Header */}
      <header className="country-header">
        <div className="country-header__logo">
          <img src="/assets/logo.png" alt="AUN Logo" style={{ height: '34px' }} />
        </div>
        <div className="country-header__actions">
          <ProfileIcon />
          <MenuIcon />
        </div>
      </header>

      {/* Main Content */}
      <main className="country-main">
        {/* Navigation Row */}
        <div className="country-nav-row">
          <button className="country-nav-arrow" onClick={goToPrevious}>
            <LeftArrows />
          </button>
          <h1 className="country-page-title">Choose Your Country</h1>
          <button 
            className="country-nav-arrow"
            onClick={handleNext}
            disabled={!canProceed}
          >
            <RightArrows />
          </button>
        </div>

        {/* Country Grid */}
        <div className="country-grid">
          {countries.map((c, index) => (
            <CountryCard 
              key={index} 
              country={c}
              isSelected={country === c.name}
              onSelect={() => handleCountrySelect(c.name)}
            />
          ))}
        </div>

        {/* Divider */}
        <div className="country-divider-container">
          <div className="country-divider" />
        </div>
      </main>
    </GradientBackgroundTailwind>
  );
}

