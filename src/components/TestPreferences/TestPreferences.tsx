// Test Preferences (Assessment) Screen Component
// With conditional score inputs based on test selection

import { useState } from 'react';
import './TestPreferences.css';
import { useFormStore } from '../../store/formStore';
import { useFormNavigation } from '../../hooks/useFormNavigation';
import ThemeToggle from '../ThemeToggle';

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

// Score Input Component
interface ScoreInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const ScoreInput = ({ label, value, onChange, placeholder = "Enter score" }: ScoreInputProps) => (
  <div className="score-input">
    <label className="score-input__label">{label}</label>
    <input
      type="text"
      className="glass-input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  </div>
);

interface TestPreferencesProps {
  theme?: 'light' | 'dark';
  onThemeToggle?: () => void;
}

export default function TestPreferences({ theme = 'light', onThemeToggle }: TestPreferencesProps) {
  const { assessment, setAssessment } = useFormStore();
  const { goToPrevious, goToNext, canProceed } = useFormNavigation();
  const [adaptiveOpen, setAdaptiveOpen] = useState(false);
  const [englishOpen, setEnglishOpen] = useState(false);

  // Helper functions for score management
  const getAdaptiveScore = (field: string) => {
    if (!assessment?.adaptiveTestScores) return '';
    return (assessment.adaptiveTestScores as any)[field] || '';
  };

  const setAdaptiveScore = (field: string, value: string) => {
    const currentScores = assessment?.adaptiveTestScores || {};
    setAssessment({
      adaptiveTestScores: {
        ...currentScores,
        [field]: value,
      } as any,
    });
  };

  const getEnglishScore = (field: string) => {
    if (!assessment?.englishTestScores) return '';
    return (assessment.englishTestScores as any)[field] || '';
  };

  const setEnglishScore = (field: string, value: string) => {
    const currentScores = assessment?.englishTestScores || {};
    setAssessment({
      englishTestScores: {
        ...currentScores,
        [field]: value,
      } as any,
    });
  };

  const handleAdaptiveTestChange = (value: string) => {
    setAssessment({ 
      adaptiveTest: value,
      adaptiveTestScores: undefined // Clear scores when changing test
    });
  };

  const handleEnglishTestChange = (value: string) => {
    setAssessment({ 
      englishLanguageTest: value,
      englishTestScores: undefined // Clear scores when changing test
    });
  };

  const handleNext = () => {
    if (canProceed) goToNext();
  };

  // Determine if we need to show score inputs
  const showAdaptiveScores = assessment?.adaptiveTest && 
    assessment.adaptiveTest !== 'consider-later' && 
    assessment.adaptiveTest !== 'not-consider';

  const showEnglishScores = assessment?.englishLanguageTest && 
    assessment.englishLanguageTest !== 'consider-later' && 
    assessment.englishLanguageTest !== 'not-consider';

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
            {/* Adaptive Test Selection */}
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
                onSelect={handleAdaptiveTestChange}
              />
              
              {/* GRE Score Inputs */}
              {showAdaptiveScores && assessment.adaptiveTest === 'gre' && (
                <div className="score-inputs-grid">
                  <ScoreInput label="Overall Score" value={getAdaptiveScore('overall')} onChange={(v) => setAdaptiveScore('overall', v)} />
                  <ScoreInput label="Verbal Reasoning" value={getAdaptiveScore('verbalReasoning')} onChange={(v) => setAdaptiveScore('verbalReasoning', v)} />
                  <ScoreInput label="Quantitative Reasoning" value={getAdaptiveScore('quantitativeReasoning')} onChange={(v) => setAdaptiveScore('quantitativeReasoning', v)} />
                  <ScoreInput label="Analytical Writing" value={getAdaptiveScore('analyticalWriting')} onChange={(v) => setAdaptiveScore('analyticalWriting', v)} />
                </div>
              )}

              {/* GMAT Score Inputs */}
              {showAdaptiveScores && assessment.adaptiveTest === 'gmat' && (
                <div className="score-inputs-grid">
                  <ScoreInput label="Overall Score" value={getAdaptiveScore('overall')} onChange={(v) => setAdaptiveScore('overall', v)} />
                  <ScoreInput label="Mathematics" value={getAdaptiveScore('mathematics')} onChange={(v) => setAdaptiveScore('mathematics', v)} />
                  <ScoreInput label="Verbal" value={getAdaptiveScore('verbal')} onChange={(v) => setAdaptiveScore('verbal', v)} />
                  <ScoreInput label="Integrated Reasoning" value={getAdaptiveScore('integratedReasoning')} onChange={(v) => setAdaptiveScore('integratedReasoning', v)} />
                </div>
              )}
            </div>

            {/* English Language Test Selection */}
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
                onSelect={handleEnglishTestChange}
              />

              {/* IELTS/TOEFL/PTE Score Inputs */}
              {showEnglishScores && ['ielts', 'toefl', 'pte'].includes(assessment.englishLanguageTest || '') && (
                <div className="score-inputs-grid">
                  <ScoreInput label="Overall Score" value={getEnglishScore('overall')} onChange={(v) => setEnglishScore('overall', v)} />
                  <ScoreInput label="Reading" value={getEnglishScore('reading')} onChange={(v) => setEnglishScore('reading', v)} />
                  <ScoreInput label="Writing" value={getEnglishScore('writing')} onChange={(v) => setEnglishScore('writing', v)} />
                  <ScoreInput label="Speaking" value={getEnglishScore('speaking')} onChange={(v) => setEnglishScore('speaking', v)} />
                  <ScoreInput label="Listening" value={getEnglishScore('listening')} onChange={(v) => setEnglishScore('listening', v)} />
                </div>
              )}

              {/* DET Score Inputs */}
              {showEnglishScores && assessment.englishLanguageTest === 'det' && (
                <div className="score-inputs-grid">
                  <ScoreInput label="Overall Score" value={getEnglishScore('overall')} onChange={(v) => setEnglishScore('overall', v)} />
                  <ScoreInput label="Literacy" value={getEnglishScore('literacy')} onChange={(v) => setEnglishScore('literacy', v)} />
                  <ScoreInput label="Conversation" value={getEnglishScore('conversation')} onChange={(v) => setEnglishScore('conversation', v)} />
                  <ScoreInput label="Comprehension" value={getEnglishScore('comprehension')} onChange={(v) => setEnglishScore('comprehension', v)} />
                  <ScoreInput label="Production" value={getEnglishScore('production')} onChange={(v) => setEnglishScore('production', v)} />
                </div>
              )}
            </div>
          </div>

          <button className="assessment-next" onClick={handleNext} disabled={!canProceed}>
            Next
          </button>
        </div>

        <div className="assessment-divider" />
      </main>
    </div>
  );
}
