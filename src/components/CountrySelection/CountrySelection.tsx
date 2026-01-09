// Country Selection Screen Component
// Viewport-responsive design with consistent navigation

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CountrySelection.css';
import { useFormStore } from '../../store/formStore';
import { useFormNavigation } from '../../hooks/useFormNavigation';
import { ROUTES } from '../../api/types';
import WizardLayout from '../WizardLayout';
import { LeftArrows, RightArrows } from '../NavigationArrows';

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
      <main className="country-main">
        {/* Navigation Row with Title and Arrows - Consistent styling */}
        <div className="country-nav-row">
          <button className="nav-arrow-btn nav-arrow-btn--left" onClick={goToPrevious} aria-label="Previous page">
            <LeftArrows />
          </button>
          <h1 className="country-page-title">Choose Your Country</h1>
          <button 
            className="nav-arrow-btn nav-arrow-btn--right"
            onClick={handleNext}
            disabled={!canProceed}
            aria-label="Next page"
          >
            <RightArrows />
          </button>
        </div>

        {/* Country Grid - Viewport responsive (3-6 columns) */}
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

        {/* Bottom Divider - Responsive width */}
        <div className="country-divider-container">
          <div className="country-divider" />
        </div>
      </main>
    </WizardLayout>
  );
}

