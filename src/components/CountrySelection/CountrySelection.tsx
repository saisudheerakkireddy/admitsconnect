// Country Selection Screen Component
// Refactored with separate CSS file

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CountrySelection.css';
import { useFormStore } from '../../store/formStore';
import { useFormNavigation } from '../../hooks/useFormNavigation';
import { ROUTES } from '../../api/types';
import WizardLayout from '../WizardLayout';

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

// Navigation Arrow Icons
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
    <WizardLayout variant="white" headerVariant="alt">
      <div className="page-wrapper">
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
      </div>
    </WizardLayout>
  );
}

