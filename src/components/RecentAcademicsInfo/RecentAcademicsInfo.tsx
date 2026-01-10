// Recent Academics Info Screen Component
// Matching Figma Design - "Help us to understand better"

import { useState, useEffect } from 'react';
import './RecentAcademicsInfo.css';
import { useFormStore } from '../../store/formStore';
import { useFormNavigation } from '../../hooks/useFormNavigation';
import WizardLayout from '../WizardLayout';
import { LeftArrows, RightArrows } from '../NavigationArrows';
import { getRequiredAcademicLevels } from '../../utils/constants';

const ChevronDown = () => (
  <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L7 7L13 1" stroke="#C22032" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const mediumOptions = ["English", "Regional"];

const undergradDegreeTypes = [
  "BE / B.Tech – Bachelor of Technology",
  "B.Arch – Bachelor of Architecture",
  "BBA – Bachelor of Business Administration",
  "BCom – Bachelor of Commerce",
  "BCA – Bachelor of Computer Applications",
  "B.Sc – Information Technology",
  "BPharma – Bachelor of Pharmacy",
  "B.Sc – Interior Design",
  "BDS – Bachelor of Dental Surgery",
  "B.Sc – Mathematics",
  "B.Sc – Chemistry",
  "Others"
];

const postgradDegreeTypes = [
  "M.Tech",
  "MBA",
  "MCA",
  "MS",
  "MRS",
  "Others"
];

interface DropdownProps {
  id: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder: string;
  isOpen: boolean;
  onToggle: () => void;
}

const Dropdown = ({ value, onChange, options, placeholder, isOpen, onToggle }: DropdownProps) => (
  <div className="academics-dropdown">
    <button className="academics-input academics-input--dropdown" onClick={onToggle}>
      <span className="academics-input__text">{value || placeholder}</span>
      <div className={`academics-input__chevron ${isOpen ? 'academics-input__chevron--open' : ''}`}>
        <ChevronDown />
      </div>
    </button>
    {isOpen && (
      <div className="academics-dropdown__menu">
        {options.map((option) => (
          <button
            key={option}
            className="academics-dropdown__option"
            onClick={() => { onChange(option); onToggle(); }}
          >
            {option}
          </button>
        ))}
      </div>
    )}
  </div>
);

export default function RecentAcademicsInfo() {
  const { academics, setSecondaryAcademics, setHigherSecondaryAcademics, setUndergradAcademics, setPostgradAcademics, studyLevel } = useFormStore();
  const { goToNext, goToPrevious, canProceed } = useFormNavigation();

  // Determine which fields to show based on study level
  const requiredLevels = getRequiredAcademicLevels(studyLevel || '');
  const showUgFields = requiredLevels.undergrad;
  const showPgFields = requiredLevels.postgrad;

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [hasAutoScrolled, setHasAutoScrolled] = useState(false);

  const handleNext = () => {
    if (canProceed) goToNext();
  };

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const scrollToSection = (index: number) => {
    const sectionId = index === 0 ? 'schooling-section' : 'graduation-section';
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Input Sanitization Helpers
  const handleYearChange = (val: string, setter: (val: string) => void) => {
    const sanitized = val.replace(/\D/g, '').slice(0, 4);
    setter(sanitized);
  };

  const handleGradeChange = (val: string, setter: (val: string) => void) => {
    // Allow only digits and one decimal point
    if (!/^\d*\.?\d*$/.test(val)) return;

    const parts = val.split('.');

    // Case 1: Integer only (no decimal point)
    if (parts.length === 1) {
      if (val.length <= 3) {
        setter(val);
      }
    }
    // Case 2: Float (has decimal point)
    else {
      // Total digits (integer part + fractional part) should be <= 5
      const totalDigits = parts[0].length + parts[1].length;
      if (totalDigits <= 5) {
        setter(val);
      }
    }
  };

  const handleBacklogChange = (val: string, setter: (val: number) => void) => {
    if (val === '') {
      setter(-1); // Handle empty
      return;
    }
    // Only allow digits
    if (!/^\d+$/.test(val)) return;

    const num = parseInt(val, 10);
    // Only update if valid
    if (num >= 0 && num <= 50) {
      setter(num);
    }
  };

  // Auto-scroll when Schooling section is complete
  useEffect(() => {
    const isSecondaryComplete =
      academics?.secondary?.year &&
      academics?.secondary?.year.length === 4 &&
      academics?.secondary?.grade &&
      academics?.secondary?.medium;

    const isHigherSecondaryComplete =
      academics?.higherSecondary?.year &&
      academics?.higherSecondary?.year.length === 4 &&
      academics?.higherSecondary?.grade &&
      academics?.higherSecondary?.medium;

    if (isSecondaryComplete && isHigherSecondaryComplete && !hasAutoScrolled && activeStep === 0) {
      if (showUgFields || showPgFields) {
        scrollToSection(1);
        setHasAutoScrolled(true);
      }
    }
  }, [academics, hasAutoScrolled, activeStep, showUgFields, showPgFields]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === 'schooling-section') setActiveStep(0);
            if (entry.target.id === 'graduation-section') setActiveStep(1);
          }
        });
      },
      { threshold: 0.5 }
    );

    const schoolingSection = document.getElementById('schooling-section');
    const graduationSection = document.getElementById('graduation-section');

    if (schoolingSection) observer.observe(schoolingSection);
    if (graduationSection) observer.observe(graduationSection);

    return () => observer.disconnect();
  }, []);

  // Auto-navigate removed to allow "Move Down" behavior (scroll to Graduation)
  // User will manually click Next after filling all details

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown && !(event.target as Element).closest('.academics-dropdown')) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  return (
    <WizardLayout variant="white" headerVariant="alt">
      <main className="academics-main">
        {/* Vertical Stepper */}
        <div className="vertical-stepper">
          <div className="stepper-line">
            <div
              className="stepper-progress"
              style={{ height: `${(activeStep / 1) * 100}%` }}
            />
          </div>
          <button
            className={`stepper-dot ${activeStep >= 0 ? 'active' : ''}`}
            onClick={() => scrollToSection(0)}
            aria-label="Go to Schooling"
          />
          {(showUgFields || showPgFields) && (
            <button
              className={`stepper-dot ${activeStep >= 1 ? 'active' : ''}`}
              onClick={() => scrollToSection(1)}
              aria-label="Go to Graduation"
            />
          )}
        </div>

        {/* SECTION 1: Schooling (10th & 12th) */}
        <div id="schooling-section" className="academics-scroll-section">
          {/* Navigation Row */}
          <div className="academics-nav-row">
            <button className="nav-arrow-btn nav-arrow-btn--left" onClick={goToPrevious} aria-label="Previous page">
              <LeftArrows />
            </button>
            <h1 className="academics-page-title">Help us to understand better</h1>
            <button
              className="nav-arrow-btn nav-arrow-btn--right"
              onClick={handleNext}
              disabled={!canProceed}
              aria-label="Next page"
            >
              <RightArrows />
            </button>
          </div>

          <div className="academics-form">
            {/* Secondary School Certificate / 10th */}
            <div className="academics-section">
              <h2 className="academics-section__title">Secondary school certificate / 10th</h2>
              <div className="academics-section__fields">
                <div className="academics-field-row">
                  <input
                    type="text"
                    placeholder="Enter Year of Completion"
                    value={academics?.secondary?.year || ''}
                    onChange={(e) => handleYearChange(e.target.value, (val) => setSecondaryAcademics({ year: val }))}
                    className="academics-input"
                    maxLength={4}
                  />
                  <input
                    type="text"
                    placeholder="Enter the Achieved Grade"
                    value={academics?.secondary?.grade || ''}
                    onChange={(e) => handleGradeChange(e.target.value, (val) => setSecondaryAcademics({ grade: val }))}
                    className="academics-input"
                  />
                  <Dropdown
                    id="secondary-medium"
                    value={academics?.secondary?.medium || ''}
                    onChange={(val) => setSecondaryAcademics({ medium: val })}
                    options={mediumOptions}
                    placeholder="Medium"
                    isOpen={openDropdown === 'secondary-medium'}
                    onToggle={() => toggleDropdown('secondary-medium')}
                  />
                </div>
              </div>
            </div>

            {/* Higher Secondary School Certificate / 12th */}
            <div className="academics-section">
              <h2 className="academics-section__title">Higher Secondary school certificate / 12th</h2>
              <div className="academics-section__fields">
                <div className="academics-field-row">
                  <input
                    type="text"
                    placeholder="Enter Year of Completion"
                    value={academics?.higherSecondary?.year || ''}
                    onChange={(e) => handleYearChange(e.target.value, (val) => setHigherSecondaryAcademics({ year: val }))}
                    className="academics-input"
                    maxLength={4}
                  />
                  <input
                    type="text"
                    placeholder="Enter the Achieved Grade"
                    value={academics?.higherSecondary?.grade || ''}
                    onChange={(e) => handleGradeChange(e.target.value, (val) => setHigherSecondaryAcademics({ grade: val }))}
                    className="academics-input"
                  />
                  <Dropdown
                    id="higher-secondary-medium"
                    value={academics?.higherSecondary?.medium || ''}
                    onChange={(val) => setHigherSecondaryAcademics({ medium: val })}
                    options={mediumOptions}
                    placeholder="Medium"
                    isOpen={openDropdown === 'higher-secondary-medium'}
                    onToggle={() => toggleDropdown('higher-secondary-medium')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: Graduation (UG & PG) */}
        {(showUgFields || showPgFields) && (
          <div id="graduation-section" className="academics-scroll-section">
            <div className="academics-form">
              {/* Under Graduation */}
              {showUgFields && (
                <div className="academics-section">
                  <h2 className="academics-section__title">Under Graduation</h2>
                  <div className="academics-section__fields academics-section__fields--expanded">
                    <div className="academics-field-row">
                      <Dropdown
                        id="undergrad-degree"
                        value={academics?.undergrad?.degreeType || ''}
                        onChange={(val) => setUndergradAcademics({ degreeType: val })}
                        options={undergradDegreeTypes}
                        placeholder="Choose the Type of Degree"
                        isOpen={openDropdown === 'undergrad-degree'}
                        onToggle={() => toggleDropdown('undergrad-degree')}
                      />
                      <input
                        type="text"
                        placeholder="Enter the Start Year"
                        value={academics?.undergrad?.startYear || ''}
                        onChange={(e) => handleYearChange(e.target.value, (val) => setUndergradAcademics({ startYear: val }))}
                        className="academics-input"
                        maxLength={4}
                      />
                      <input
                        type="text"
                        placeholder="Enter the End Year"
                        value={academics?.undergrad?.endYear || ''}
                        onChange={(e) => handleYearChange(e.target.value, (val) => setUndergradAcademics({ endYear: val }))}
                        className="academics-input"
                        maxLength={4}
                      />
                    </div>
                    <div className="academics-field-row">
                      <input
                        type="text"
                        placeholder="Enter the Achieved Grade"
                        value={academics?.undergrad?.grade || ''}
                        onChange={(e) => handleGradeChange(e.target.value, (val) => setUndergradAcademics({ grade: val }))}
                        className="academics-input"
                      />
                      <input
                        type="text"
                        placeholder="Enter total Backlogs"
                        value={academics?.undergrad?.backlogs === -1 ? '' : academics?.undergrad?.backlogs ?? ''}
                        onChange={(e) => handleBacklogChange(e.target.value, (val) => setUndergradAcademics({ backlogs: val }))}
                        className="academics-input"
                      />
                      <Dropdown
                        id="undergrad-medium"
                        value={academics?.undergrad?.medium || ''}
                        onChange={(val) => setUndergradAcademics({ medium: val })}
                        options={mediumOptions}
                        placeholder="Medium"
                        isOpen={openDropdown === 'undergrad-medium'}
                        onToggle={() => toggleDropdown('undergrad-medium')}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Post Graduation */}
              {showPgFields && (
                <div className="academics-section">
                  <h2 className="academics-section__title">Post Graduation</h2>
                  <div className="academics-section__fields academics-section__fields--expanded">
                    <div className="academics-field-row">
                      <Dropdown
                        id="postgrad-degree"
                        value={academics?.postgrad?.degreeType || ''}
                        onChange={(val) => setPostgradAcademics({ degreeType: val })}
                        options={postgradDegreeTypes}
                        placeholder="Choose the Type of Degree"
                        isOpen={openDropdown === 'postgrad-degree'}
                        onToggle={() => toggleDropdown('postgrad-degree')}
                      />
                      <input
                        type="text"
                        placeholder="Enter the Start Year"
                        value={academics?.postgrad?.startYear || ''}
                        onChange={(e) => handleYearChange(e.target.value, (val) => setPostgradAcademics({ startYear: val }))}
                        className="academics-input"
                        maxLength={4}
                      />
                      <input
                        type="text"
                        placeholder="Enter the End Year"
                        value={academics?.postgrad?.endYear || ''}
                        onChange={(e) => handleYearChange(e.target.value, (val) => setPostgradAcademics({ endYear: val }))}
                        className="academics-input"
                        maxLength={4}
                      />
                    </div>
                    <div className="academics-field-row">
                      <input
                        type="text"
                        placeholder="Enter the Achieved Grade"
                        value={academics?.postgrad?.grade || ''}
                        onChange={(e) => handleGradeChange(e.target.value, (val) => setPostgradAcademics({ grade: val }))}
                        className="academics-input"
                      />
                      <input
                        type="text"
                        placeholder="Enter total Backlogs"
                        value={academics?.postgrad?.backlogs === -1 ? '' : academics?.postgrad?.backlogs ?? ''}
                        onChange={(e) => handleBacklogChange(e.target.value, (val) => setPostgradAcademics({ backlogs: val }))}
                        className="academics-input"
                      />
                      <Dropdown
                        id="postgrad-medium"
                        value={academics?.postgrad?.medium || ''}
                        onChange={(val) => setPostgradAcademics({ medium: val })}
                        options={mediumOptions}
                        placeholder="Medium"
                        isOpen={openDropdown === 'postgrad-medium'}
                        onToggle={() => toggleDropdown('postgrad-medium')}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Row for Graduation Section */}
            <div className="academics-nav-row" style={{ marginTop: '2rem' }}>
              <button className="nav-arrow-btn nav-arrow-btn--left" onClick={goToPrevious} aria-label="Previous page">
                <LeftArrows />
              </button>
              <button
                className="nav-arrow-btn nav-arrow-btn--right"
                onClick={handleNext}
                disabled={!canProceed}
                aria-label="Next page"
              >
                <RightArrows />
              </button>
            </div>
          </div>
        )}
      </main>
    </WizardLayout>
  );
}
