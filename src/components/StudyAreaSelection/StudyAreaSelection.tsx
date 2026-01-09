// Study Area Selection Screen Component
// Refactored with separate CSS file

import './StudyAreaSelection.css';
import { useFormStore } from '../../store/formStore';
import { useFormNavigation } from '../../hooks/useFormNavigation';
import WizardLayout from '../WizardLayout';
import { LeftArrows, RightArrows } from '../NavigationArrows';
import { useState, useEffect } from 'react';

interface StudyOption {
  label: string;
  multiline?: boolean;
}

// Study levels ordered for 5-3 layout (matching Figma design)
const studyLevels: StudyOption[] = [
  // Row 1 (5 items)
  { label: "Post Graduation" },
  { label: "Under Graduation" },
  { label: "Summer Programs" },
  { label: "Diploma" },
  { label: "Pre Masters" },
  // Row 2 (3 items)
  { label: "DBA (Doctorate of Business Administration)" },
  { label: "PhD (Doctor of Philosophy)" },
  { label: "UG - Integrated" },
];

// Degree types for Under Graduation (Bachelor's degrees)
const undergradDegreeTypes: StudyOption[] = [
  { label: "BSC - Bachelor of Science" },
  { label: "BA - Bachelor of Arts" },
  { label: "BL - Bachelor of Laws" },
  { label: "BE - Bachelors of Engineering" },
  { label: "BBA - Bachelor of Business Administration" },
  { label: "Associate Degree" },
  { label: "Academy Profession" },
  { label: "Advanced Diploma" },
  { label: "Joint Programs" },
];

// Degree types for Post Graduation (Master's degrees)
const postgradDegreeTypes: StudyOption[] = [
  { label: "MSc - Master of Science" },
  { label: "M.Ph - Master of Philosophy" },
  { label: "MBA - Masters of Business Administration" },
  { label: "PhD - Doctor of Philosophy" },
  { label: "Doctorate - Academics General" },
  { label: "MA - Master of Arts" },
  { label: "Postgraduate certificate" },
  { label: "Graduate diploma" },
  { label: "M.Res - Master of Research" },
  { label: "M.Ed - Master of Education" },
  { label: "LLM - Master of Laws" },
  { label: "M.Arch - Master of Architecture" },
  { label: "Postgraduate Certificate in Education" },
  { label: "MEng - Master of Engineering" },
  { label: "MEM - Masters of Engineering Management" },
  { label: "MFA - Master of Fine Arts" },
  { label: "MSW - Master of Social Work" },
  { label: "Master of Business" },
  { label: "M.D. - Doctor of Medicine" },
  { label: "M.Fin/MiF/MFiN - Master of Finance" },
];

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
  const [activeStep, setActiveStep] = useState(0);

  // Determine if degree type selection should be shown
  const shouldShowDegreeType = studyLevel === 'Under Graduation' || studyLevel === 'Post Graduation';

  // Get appropriate degree types based on study level
  const degreeTypes = studyLevel === 'Under Graduation'
    ? undergradDegreeTypes
    : studyLevel === 'Post Graduation'
      ? postgradDegreeTypes
      : [];

  const handleStudyLevelSelect = (label: string) => {
    // Toggle: if already selected, deselect; otherwise select
    if (studyLevel === label) {
      setStudyLevel('');
    } else {
      setStudyLevel(label);

      // Check if we need to show degree type selection
      const isDegreeLevel = label === 'Under Graduation' || label === 'Post Graduation';

      if (isDegreeLevel) {
        // Scroll to next section if available
        setTimeout(() => {
          document.getElementById('degree-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        // For other levels, auto-navigate to next step
        // Small timeout to allow the user to see the selection
        setTimeout(() => {
          goToNext();
        }, 300);
      }
    }
    // Clear degree type when changing study level
    if (degreeType) {
      setDegreeType('');
    }
  };

  const handleDegreeTypeSelect = (label: string) => {
    setDegreeType(label);
    // Auto-navigate to next step after selection
    setTimeout(() => {
      goToNext();
    }, 300);
  };

  const handleNext = () => {
    if (canProceed) {
      goToNext();
    }
  };

  // Intersection Observer for active step
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === 'study-level-section') setActiveStep(0);
            if (entry.target.id === 'degree-section') setActiveStep(1);
          }
        });
      },
      { threshold: 0.5 }
    );

    const studySection = document.getElementById('study-level-section');
    const degreeSection = document.getElementById('degree-section');

    if (studySection) observer.observe(studySection);
    if (degreeSection) observer.observe(degreeSection);

    return () => observer.disconnect();
  }, [shouldShowDegreeType]);

  const scrollToSection = (index: number) => {
    const id = index === 0 ? 'study-level-section' : 'degree-section';
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <WizardLayout variant="white" headerVariant="alt">
      <main className="study-main">
        {/* Vertical Stepper */}
        <div className="vertical-stepper">
          <div className="stepper-line">
            <div
              className="stepper-progress"
              style={{ height: `${shouldShowDegreeType ? (activeStep / 1) * 100 : 0}%` }}
            />
          </div>
          <button
            className={`stepper-dot ${activeStep >= 0 ? 'active' : ''}`}
            onClick={() => scrollToSection(0)}
            aria-label="Go to Study Level"
          />
          {shouldShowDegreeType && (
            <button
              className={`stepper-dot ${activeStep >= 1 ? 'active' : ''}`}
              onClick={() => scrollToSection(1)}
              aria-label="Go to Degree Type"
            />
          )}
        </div>

        <section id="study-level-section" className="study-level-section">
          {/* Navigation Row - Same structure as CountrySelection */}
          <div className="study-nav-row">
            <button className="nav-arrow-btn nav-arrow-btn--left" onClick={goToPrevious} aria-label="Previous page">
              <LeftArrows />
            </button>
            <h1 className="study-page-title">Choose the study level</h1>
            <button
              className="nav-arrow-btn nav-arrow-btn--right"
              onClick={handleNext}
              disabled={!canProceed}
              aria-label="Next page"
            >
              <RightArrows />
            </button>
          </div>

          {/* Study Level Pills - 5-3 layout */}
          <div className="study-pills-container">
            {studyLevels.map((option, index) => (
              <PillButton
                key={index}
                option={option}
                isSelected={studyLevel === option.label}
                onSelect={() => handleStudyLevelSelect(option.label)}
              />
            ))}
          </div>
        </section>

        {shouldShowDegreeType && (
          <section id="degree-section" className="degree-section">
            <h2 className="degree-section__title">Choose the Degree Type</h2>
            <div className="study-pills-container degree-pills-container">
              {degreeTypes.map((option, index) => (
                <PillButton
                  key={index}
                  option={option}
                  isSelected={degreeType === option.label}
                  onSelect={() => handleDegreeTypeSelect(option.label)}
                />
              ))}
            </div>
          </section>
        )}

        <div className="study-divider-container">
          <div className="study-divider" />
        </div>
      </main>
    </WizardLayout>
  );
}

