// Study Area Selection Screen Component
// Refactored with separate CSS file

import './StudyAreaSelection.css';
import { useFormStore } from '../../store/formStore';
import { useFormNavigation } from '../../hooks/useFormNavigation';
import WizardLayout from '../WizardLayout';

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

export default function StudyAreaSelection() {
  const { studyLevel, degreeType, setStudyLevel, setDegreeType } = useFormStore();
  const { goToNext, goToPrevious, canProceed } = useFormNavigation();

  const handleNext = () => {
    if (canProceed) {
      goToNext();
    }
  };

  return (
    <WizardLayout variant="white" headerVariant="alt">
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
    </WizardLayout>
  );
}

