// Intake Year Selection Screen Component
// Matching Figma Design

import { useState } from 'react';
import './IntakeYearSelection.css';
import { useFormStore } from '../../store/formStore';
import { useFormNavigation } from '../../hooks/useFormNavigation';
import WizardLayout from '../WizardLayout';
import { LeftArrows, RightArrows } from '../NavigationArrows';

interface DurationOption {
  label: string;
}

// Study durations ordered to match Figma (3-1 layout)
const studyDurations: DurationOption[] = [
  // Row 1 (3 items)
  { label: "Undergraduation 3 Years" },
  { label: "Under Graduation 4 Years" },
  { label: "Under Graduation 4+ Years" },
  // Row 2 (1 item)
  { label: "Diploma" },
];

const intakeOptions = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const yearOptions = ["2025", "2026", "2027", "2028", "2029", "2030"];

const ChevronDown = () => (
  <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L8 8L15 1" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
    <button className="intake-dropdown__button" onClick={onToggle}>
      <span className="intake-dropdown__label">{value || label}</span>
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
            {option}
          </button>
        ))}
      </div>
    )}
  </div>
);

export default function IntakeYearSelection() {
  const { intake, intakeYear, studyDuration, setIntake, setIntakeYear, setStudyDuration } = useFormStore();
  const { goToNext, goToPrevious, canProceed } = useFormNavigation();
  const [intakeOpen, setIntakeOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);

  const handleNext = () => {
    if (canProceed) goToNext();
  };

  const handleDurationSelect = (label: string) => {
    // Toggle: if already selected, deselect; otherwise select
    if (studyDuration === label) {
      setStudyDuration('');
    } else {
      setStudyDuration(label);
    }
  };

  return (
    <WizardLayout variant="white" headerVariant="alt">
      <main className="intake-main">
        <section className="intake-section">
          {/* Navigation Row */}
          <div className="intake-nav-row">
            <button className="nav-arrow-btn nav-arrow-btn--left" onClick={goToPrevious} aria-label="Previous page">
              <LeftArrows />
            </button>
            <h1 className="intake-page-title">Choose intake and year.</h1>
            <button 
              className="nav-arrow-btn nav-arrow-btn--right" 
              onClick={handleNext} 
              disabled={!canProceed}
              aria-label="Next page"
            >
              <RightArrows />
            </button>
          </div>

          {/* Dropdowns - Side by side */}
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
          <h2 className="duration-section__title">Choose your study duration.</h2>
          <div className="duration-pills">
            {studyDurations.map((option, index) => (
              <button 
                key={index}
                className={`glass-pill ${studyDuration === option.label ? 'glass-pill--selected' : ''}`}
                onClick={() => handleDurationSelect(option.label)}
              >
                <span className="glass-pill__text">{option.label}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="intake-divider-container">
          <div className="intake-divider" />
        </div>
      </main>
    </WizardLayout>
  );
}
