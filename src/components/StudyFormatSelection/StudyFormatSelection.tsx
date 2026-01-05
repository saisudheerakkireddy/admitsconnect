// Study Format Selection Screen Component
// Includes format, attendance type, budget, and work experience

import './StudyFormatSelection.css';
import { useFormStore } from '../../store/formStore';
import { useFormNavigation } from '../../hooks/useFormNavigation';
import ThemeToggle from '../ThemeToggle';

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
  { id: "15-20k", label: "£15,000 - £20,000" },
  { id: "20-25k", label: "£20,000 - £25,000" },
  { id: "25k+", label: "£25,000+" },
];

const workExperiences: Option[] = [
  { id: "lt3", label: "Less than 3 Years" },
  { id: "lt5", label: "Less than 5 Years" },
  { id: "5+", label: "5+ Years" },
];

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

interface StudyFormatSelectionProps {
  theme?: 'light' | 'dark';
  onThemeToggle?: () => void;
}

export default function StudyFormatSelection({ theme = 'light', onThemeToggle }: StudyFormatSelectionProps) {
  const { 
    studyFormat, 
    attendanceType, 
    budget, 
    workExperience,
    setStudyFormat, 
    setAttendanceType, 
    setBudget, 
    setWorkExperience 
  } = useFormStore();
  const { goToNext, goToPrevious, canProceed } = useFormNavigation();

  const handleNext = () => {
    if (canProceed) goToNext();
  };

  return (
    <div className="page-container">
      <header className="page-header page-header--alt">
        <div className="page-header__logo page-header__logo--alt">
          <img src="/assets/logo.png" alt="AUN Logo" style={{ height: '34px' }} />
        </div>
        <div className="page-header__actions page-header__actions--alt">
          {onThemeToggle && (
            <ThemeToggle theme={theme} onToggle={onThemeToggle} />
          )}
          <button className="page-header__action-btn"><ProfileIcon /></button>
          <button className="page-header__action-btn"><MenuIcon /></button>
        </div>
      </header>

      <main className="page-main--alt" style={{ paddingTop: '48px' }}>
        <div className="format-nav">
          <button className="page-nav-arrow" onClick={goToPrevious}>
            <LeftArrow /><LeftArrow /><LeftArrow />
          </button>
          <h2 className="page-title">Help us understand better</h2>
          <button className="page-nav-arrow" onClick={handleNext} disabled={!canProceed}>
            <RightArrow /><RightArrow /><RightArrow />
          </button>
        </div>

        <div className="format-sections">
          {/* Study Format */}
          <div className="format-section">
            <p className="format-section__title">Choose your study format</p>
            <div className="format-options">
              {studyFormats.map((format) => (
                <button
                  key={format.id}
                  className={`glass-pill ${studyFormat === format.id ? 'glass-pill--selected' : ''}`}
                  onClick={() => setStudyFormat(format.id)}
                >
                  <span className="glass-pill__text">{format.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Study Attendance Type */}
          <div className="format-section">
            <p className="format-section__title">Choose your study attendance type</p>
            <div className="format-options format-options--wrap">
              {attendanceTypes.map((type) => (
                <button
                  key={type.id}
                  className={`glass-pill ${attendanceType === type.id ? 'glass-pill--selected' : ''}`}
                  onClick={() => setAttendanceType(type.id)}
                >
                  <span className="glass-pill__text">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div className="format-section">
            <p className="format-section__title">Choose your desired budget (in GBP)</p>
            <div className="format-options format-options--wrap">
              {budgetRanges.map((budgetOption) => (
                <button
                  key={budgetOption.id}
                  className={`glass-pill ${budget === budgetOption.id ? 'glass-pill--selected' : ''}`}
                  onClick={() => setBudget(budgetOption.id)}
                >
                  <span className="glass-pill__text">{budgetOption.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div className="format-section">
            <p className="format-section__title">Choose your applicable work experience</p>
            <div className="format-options format-options--wrap format-options--narrow">
              {workExperiences.map((exp) => (
                <button
                  key={exp.id}
                  className={`glass-pill ${workExperience === exp.id ? 'glass-pill--selected' : ''}`}
                  onClick={() => setWorkExperience(exp.id)}
                >
                  <span className="glass-pill__text">{exp.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="format-divider" />
      </main>
    </div>
  );
}
