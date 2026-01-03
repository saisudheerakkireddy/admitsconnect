// Test Preferences (Assessment) Screen Component
// Refactored with separate CSS file

import { useState } from 'react';
import './TestPreferences.css';
import { GradientBackgroundTailwind } from '../GradientBackgroundTailwind';
import { useFormStore } from '../../store/formStore';
import { useFormNavigation } from '../../hooks/useFormNavigation';

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

const ChevronDown = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L5 5L9 1" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

type Option = { value: string; label: string };

const adaptiveTestOptions: Option[] = [
  { value: 'psat', label: 'Per SAT - Pre Scholastic Assessment Test' },
  { value: 'sat', label: 'SAT - Scholastic Assessment Test' },
  { value: 'act', label: 'ACT - American College Test' },
  { value: 'gre', label: 'GRE - Graduate Record Examinations' },
  { value: 'gmat', label: 'GMAT - Graduate Management Admission Test' },
  { value: 'consider-later', label: 'I wish to consider the tests but later!' },
  { value: 'not-consider', label: 'I do not wish to consider the test for making applications**!' },
];

const englishLanguageTestOptions: Option[] = [
  { value: 'ielts', label: 'IELTS - International English Language Testing Systems' },
  { value: 'toefl', label: 'TOEFL - Test of English as a Foreign Language' },
  { value: 'pte', label: 'PTE - Pearson Test of English' },
  { value: 'det', label: 'DET - Duolingo English Test' },
  { value: 'consider-later', label: 'I wish to consider the tests but later!' },
  { value: 'not-consider', label: 'I do not wish to consider the test for making applications**!' },
];

function getLabel(options: Option[], value: string) {
  return options.find((o) => o.value === value)?.label || '';
}

interface DropdownProps {
  label: string;
  value: string;
  options: Option[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
}

const Dropdown = ({ label, value, options, isOpen, onToggle, onSelect }: DropdownProps) => (
  <div className="assessment-dropdown">
    <button className="glass-pill assessment-dropdown__button" onClick={onToggle}>
      <span className="glass-pill__text">{getLabel(options, value) || label}</span>
      <div className={`assessment-dropdown__chevron ${isOpen ? 'assessment-dropdown__chevron--open' : ''}`}>
        <ChevronDown />
      </div>
    </button>
    {isOpen && (
      <div className="assessment-dropdown__menu">
        {options.map((option) => (
          <button
            key={option.value}
            className="assessment-dropdown__option"
            onClick={() => {
              onSelect(option.value);
              onToggle();
            }}
          >
            <span className="assessment-dropdown__option-text">{option.label}</span>
          </button>
        ))}
      </div>
    )}
  </div>
);

export default function TestPreferences() {
  const { assessment, setAssessment } = useFormStore();
  const { goToPrevious, goToNext, canProceed } = useFormNavigation();
  const [adaptiveOpen, setAdaptiveOpen] = useState(false);
  const [englishOpen, setEnglishOpen] = useState(false);

  const handleNext = () => {
    if (canProceed) goToNext();
  };

  return (
    <GradientBackgroundTailwind variant="pastel" className="page-container">
      <header className="page-header page-header--alt">
        <div className="page-header__logo page-header__logo--alt">
          <img src="/assets/logo.png" alt="AUN Logo" style={{ height: '34px' }} />
        </div>
        <div className="page-header__actions page-header__actions--alt">
          <button className="page-header__action-btn"><ProfileIcon /></button>
          <button className="page-header__action-btn"><MenuIcon /></button>
        </div>
      </header>

      <main className="page-main--alt">
        <div className="assessment-nav">
          <button className="page-nav-arrow" onClick={goToPrevious}>
            <LeftArrow /><LeftArrow /><LeftArrow />
          </button>
          <h2 className="page-title">Assessment</h2>
          <button className="page-nav-arrow" onClick={handleNext} disabled={!canProceed}>
            <RightArrow /><RightArrow /><RightArrow />
          </button>
        </div>

        <div className="assessment-card">
          <p className="assessment-description">
            Help us with your Additional Assessment that might be helpful for mapping your requirements on the best school for your chosen destination.
          </p>

          <div className="assessment-fields">
            <div className="assessment-field">
              <p className="assessment-field__title">Choose Adaptive Test</p>
              <Dropdown
                label="Select"
                value={assessment?.adaptiveTest || ''}
                options={adaptiveTestOptions}
                isOpen={adaptiveOpen}
                onToggle={() => {
                  setAdaptiveOpen(!adaptiveOpen);
                  setEnglishOpen(false);
                }}
                onSelect={(val) => setAssessment({ adaptiveTest: val })}
              />
            </div>

            <div className="assessment-field">
              <p className="assessment-field__title">Choose English Language Test</p>
              <Dropdown
                label="Select"
                value={assessment?.englishLanguageTest || ''}
                options={englishLanguageTestOptions}
                isOpen={englishOpen}
                onToggle={() => {
                  setEnglishOpen(!englishOpen);
                  setAdaptiveOpen(false);
                }}
                onSelect={(val) => setAssessment({ englishLanguageTest: val })}
              />
            </div>
          </div>

          <button className="assessment-next" onClick={handleNext} disabled={!canProceed}>
            Next
          </button>
        </div>

        <div className="assessment-divider" />
      </main>
    </GradientBackgroundTailwind>
  );
}

