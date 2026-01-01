// Study Format Selection Screen Component
// Refactored with separate CSS file

import './StudyFormatSelection.css';
import { GradientBackgroundTailwind } from '../GradientBackgroundTailwind';
import { useFormStore } from '../../store/formStore';
import { useFormNavigation } from '../../hooks/useFormNavigation';

interface Option {
  id: string;
  label: string;
}

const studyFormats: Option[] = [
  { id: "full-time", label: "Full Time" },
  { id: "part-time", label: "Part Time" },
];

const attendanceTypes: Option[] = [
  { id: "on-campus", label: "On Campus" },
  { id: "online", label: "Online Learning" },
  { id: "blended", label: "Blended Learning" },
  { id: "executive", label: "Executive Programs" },
  { id: "joint", label: "Joint Programs" },
];

const budgetRanges: Option[] = [
  { id: "15-20k", label: "£ 15000 - £ 20000" },
  { id: "20-25k", label: "£ 20000 - £ 25000" },
  { id: "25k+", label: "£ 25000++" },
  { id: "30k+", label: "£ 30000++" },
];

const workExperiences: Option[] = [
  { id: "0", label: "0 Year" },
  { id: "lt3", label: "Less than 3 Years" },
  { id: "lt5", label: "Less than 5 Years" },
  { id: "5+", label: "5+ Years" },
];

const StarLogo = () => (
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 0L20.8 11H32.5L23 18L26.8 29L17 22L7.2 29L11 18L1.5 11H13.2L17 0Z" fill="#1E417C"/>
    <path d="M17 6L19.2 12.5H26L20.4 16.5L22.6 23L17 19L11.4 23L13.6 16.5L8 12.5H14.8L17 6Z" fill="#EE1113"/>
  </svg>
);

const ProfileIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="4" stroke="#1E417C" strokeWidth="1.5" fill="none"/>
    <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#1E417C" strokeWidth="1.5" fill="none"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6h16M4 12h16M4 18h16" stroke="#1E417C" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const LeftArrow = () => (
  <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 1L1 4.5L4 8" stroke="#1E417C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RightArrow = () => (
  <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L4 4.5L1 8" stroke="#1E417C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function StudyFormatSelection() {
  const { studyFormat, setStudyFormat } = useFormStore();
  const { goToNext, goToPrevious, canProceed } = useFormNavigation();

  const parseSelection = (category: string): string => {
    try {
      const selections = studyFormat ? JSON.parse(studyFormat) : {};
      return selections[category] || '';
    } catch {
      return '';
    }
  };

  const updateSelection = (category: string, value: string) => {
    try {
      const selections = studyFormat ? JSON.parse(studyFormat) : {};
      selections[category] = value;
      setStudyFormat(JSON.stringify(selections));
    } catch {
      setStudyFormat(JSON.stringify({ [category]: value }));
    }
  };

  const handleNext = () => {
    if (canProceed) goToNext();
  };

  return (
    <GradientBackgroundTailwind variant="pastel" className="page-container">
      <header className="page-header page-header--alt">
        <div className="page-header__logo page-header__logo--alt">
          <StarLogo />
          <span className="page-header__logo-text page-header__logo-text--small">One</span>
        </div>
        <div className="page-header__actions page-header__actions--alt">
          <button className="page-header__action-btn"><ProfileIcon /></button>
          <button className="page-header__action-btn"><MenuIcon /></button>
        </div>
      </header>

      <main className="page-main--alt" style={{ paddingTop: '48px' }}>
        <div className="format-nav">
          <button className="page-nav-arrow" onClick={goToPrevious}>
            <LeftArrow /><LeftArrow /><LeftArrow />
          </button>
          <h2 className="page-title">Help us to understand better</h2>
          <button className="page-nav-arrow" onClick={handleNext} disabled={!canProceed}>
            <RightArrow /><RightArrow /><RightArrow />
          </button>
        </div>

        <div className="format-sections">
          <div className="format-section">
            <p className="format-section__title">Choose your study format</p>
            <div className="format-options">
              {studyFormats.map((format) => (
                <button
                  key={format.id}
                  className={`glass-pill ${parseSelection('format') === format.id ? 'glass-pill--selected' : ''}`}
                  onClick={() => updateSelection('format', format.id)}
                >
                  <span className="glass-pill__text">{format.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="format-section">
            <p className="format-section__title">Choose your study attendance type</p>
            <div className="format-options format-options--wrap">
              {attendanceTypes.map((type) => (
                <button
                  key={type.id}
                  className={`glass-pill ${parseSelection('attendance') === type.id ? 'glass-pill--selected' : ''}`}
                  onClick={() => updateSelection('attendance', type.id)}
                >
                  <span className="glass-pill__text">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="format-section">
            <p className="format-section__title">Choose your study budget</p>
            <div className="format-options format-options--wrap">
              {budgetRanges.map((budget) => (
                <button
                  key={budget.id}
                  className={`glass-pill ${parseSelection('budget') === budget.id ? 'glass-pill--selected' : ''}`}
                  onClick={() => updateSelection('budget', budget.id)}
                >
                  <span className="glass-pill__text">{budget.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="format-section">
            <p className="format-section__title">Choose your applicable work experience?</p>
            <div className="format-options format-options--wrap format-options--narrow">
              {workExperiences.map((exp) => (
                <button
                  key={exp.id}
                  className={`glass-pill ${parseSelection('experience') === exp.id ? 'glass-pill--selected' : ''}`}
                  onClick={() => updateSelection('experience', exp.id)}
                >
                  <span className="glass-pill__text">{exp.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="format-divider" />
      </main>
    </GradientBackgroundTailwind>
  );
}

