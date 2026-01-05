// Intake Year Selection Screen Component
// Refactored with separate CSS file

import { useState } from 'react';
import './IntakeYearSelection.css';
import { useFormStore } from '../../store/formStore';
import { useFormNavigation } from '../../hooks/useFormNavigation';
import ThemeToggle from '../ThemeToggle';

interface DurationOption {
  label: string;
}

const studyDurations: DurationOption[] = [
  { label: "Diploma" },
  { label: "Post Graduation 1 Year" },
  { label: "Post Graduation 2 Year" },
  { label: "Undergraduation 3 Years" },
  { label: "Undergraduation 4 Years" },
  { label: "Undergraduation 4+ Years" },
];

const intakeOptions = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const yearOptions = ["2026", "2027", "2028", "2029", "2030"];


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

const ChevronDown = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L5 5L9 1" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface DropdownProps {
  label: string;
  value: string;
  options: string[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
}

const Dropdown = ({ label, value, options, isOpen, onToggle, onSelect }: DropdownProps) => (
  <div className="intake-dropdown">
    <button className="glass-pill intake-dropdown__button" onClick={onToggle}>
      <span className="glass-pill__text">{value || label}</span>
      <div className={`intake-dropdown__chevron ${isOpen ? 'intake-dropdown__chevron--open' : ''}`}>
        <ChevronDown />
      </div>
    </button>
    {isOpen && (
      <div className="intake-dropdown__menu">
        {options.map((option) => (
          <button
            key={option}
            className="intake-dropdown__option"
            onClick={() => { onSelect(option); onToggle(); }}
          >
            <span className="intake-dropdown__option-text">{option}</span>
          </button>
        ))}
      </div>
    )}
  </div>
);

interface IntakeYearSelectionProps {
  theme?: 'light' | 'dark';
  onThemeToggle?: () => void;
}

export default function IntakeYearSelection({ theme = 'light', onThemeToggle }: IntakeYearSelectionProps) {
  const { intake, intakeYear, studyDuration, setIntake, setIntakeYear, setStudyDuration } = useFormStore();
  const { goToNext, goToPrevious, canProceed } = useFormNavigation();
  const [intakeOpen, setIntakeOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);

  const handleNext = () => {
    if (canProceed) goToNext();
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
        <section className="intake-section">
          <div className="intake-nav">
            <button className="page-nav-arrow" onClick={goToPrevious}>
              <LeftArrows />
            </button>
            <h1 className="page-title">Choose intake and year</h1>
            <button className="page-nav-arrow" onClick={handleNext} disabled={!canProceed}>
              <RightArrows />
            </button>
          </div>

          <div className="intake-dropdowns">
            <Dropdown 
              label="Intake" 
              value={intake || ''}
              options={intakeOptions}
              isOpen={intakeOpen}
              onToggle={() => { setIntakeOpen(!intakeOpen); setYearOpen(false); }}
              onSelect={setIntake}
            />
            <Dropdown 
              label="Intake Year" 
              value={intakeYear || ''}
              options={yearOptions}
              isOpen={yearOpen}
              onToggle={() => { setYearOpen(!yearOpen); setIntakeOpen(false); }}
              onSelect={setIntakeYear}
            />
          </div>
        </section>

        <section className="duration-section">
          <h2 className="duration-section__title">Choose your study duration</h2>
          <div className="duration-pills">
            {studyDurations.map((option, index) => (
              <button 
                key={index}
                className={`glass-pill ${studyDuration === option.label ? 'glass-pill--selected' : ''}`}
                onClick={() => setStudyDuration(option.label)}
              >
                <span className="glass-pill__text">{option.label}</span>
              </button>
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

