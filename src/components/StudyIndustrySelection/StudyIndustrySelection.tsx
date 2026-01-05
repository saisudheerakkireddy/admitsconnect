// Study Industry Selection Screen Component
// Dynamically loads all industries from configuration

import './StudyIndustrySelection.css';
import { useFormStore } from '../../store/formStore';
import { useFormNavigation } from '../../hooks/useFormNavigation';
import { getAllIndustries } from '../../config/studyAreaData';
import { IndustryIcons } from './IndustryIcons';
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

export default function StudyIndustrySelection() {
  const { industry, setIndustry } = useFormStore();
  const { goToNext, goToPrevious, canProceed } = useFormNavigation();

  // Get all industries (already sorted alphabetically from the data)
  const allIndustries = getAllIndustries();
  
  // Filter based on search
  const filteredIndustries = allIndustries;

  const handleNext = () => {
    if (canProceed) goToNext();
  };

  return (
    <WizardLayout variant="white" headerVariant="alt">
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
        </section>

        <div className="page-divider-container">
          <div className="page-divider" />
        </div>
      </main>
    </WizardLayout>
  );
}
