// Study Area Selection Screen Component
// Refactored with separate CSS file

import './StudyAreaSelection.css';
import { useFormStore } from '../../store/formStore';
import { useFormNavigation } from '../../hooks/useFormNavigation';
import ThemeToggle from '../ThemeToggle';

interface StudyOption {
  label: string;
  multiline?: boolean;
}

const studyLevels: StudyOption[] = [
  { label: "Summer Programs" },
  { label: "Diploma" },
  { label: "Under Graduation" },
  { label: "UG - Integrated" },
  { label: "Pre Masters" },
  { label: "Post Graduation" },
  { label: "PhD (Doctor of Philosophy)" },
  { label: "DBA (Doctorate of\nBusiness Administration)", multiline: true },
];

const degreeTypes: StudyOption[] = [
  { label: "BSC - Bachelor of Science" },
  { label: "BA - Bachelor of Arts" },
  { label: "BBA - Bachelor of Laws" },
  { label: "BE - Bachelors of Engineering" },
  { label: "BBA - Bachelor of Business Administration" },
  { label: "Associate Degree" },
  { label: "Academy Profession" },
  { label: "Advanced Diploma" },
  { label: "Joint Programs" },
];


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

interface PillButtonProps {
  option: StudyOption;
  isSelected: boolean;
  onSelect: () => void;
}

const PillButton = ({ option, isSelected, onSelect }: PillButtonProps) => (
  <button 
    className={`glass-pill ${isSelected ? 'glass-pill--selected' : ''}`}
    onClick={onSelect}
  >
    <span className={`glass-pill__text ${option.multiline ? 'whitespace-pre-line text-center' : ''}`}>
      {option.label}
    </span>
  </button>
);

interface StudyAreaSelectionProps {
  theme?: 'light' | 'dark';
  onThemeToggle?: () => void;
}

export default function StudyAreaSelection({ theme = 'light', onThemeToggle }: StudyAreaSelectionProps) {
  const { studyLevel, degreeType, setStudyLevel, setDegreeType } = useFormStore();
  const { goToNext, goToPrevious, canProceed } = useFormNavigation();

  const handleNext = () => {
    if (canProceed) {
      goToNext();
    }
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
        <section className="study-level-section">
          <div className="study-level-nav">
            <button className="page-nav-arrow" onClick={goToPrevious}>
              <LeftArrows />
            </button>
            <h1 className="page-title">Choose Your Study Level</h1>
            <button 
              className="page-nav-arrow"
              onClick={handleNext}
              disabled={!canProceed}
            >
              <RightArrows />
            </button>
          </div>

          <div className="study-pills-container">
            {studyLevels.map((option, index) => (
              <PillButton 
                key={index} 
                option={option}
                isSelected={studyLevel === option.label}
                onSelect={() => setStudyLevel(option.label)}
              />
            ))}
          </div>
        </section>

        <section className="degree-section">
          <h2 className="degree-section__title">Choose the Degree Type</h2>
          <div className="study-pills-container">
            {degreeTypes.map((option, index) => (
              <PillButton 
                key={index} 
                option={option}
                isSelected={degreeType === option.label}
                onSelect={() => setDegreeType(option.label)}
              />
            ))}
          </div>
        </section>

        <div className="page-divider-container">
          <div className="page-divider" />
        </div>
      </main>
    </div>
  );
}

