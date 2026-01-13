import './StudyFormatSelection.css';
import { useFormStore } from '../../store/formStore';
import { useFormNavigation } from '../../hooks/useFormNavigation';
import WizardLayout from '../WizardLayout';
import { LeftArrows, RightArrows } from '../NavigationArrows';

interface Option {
  id: string;
  label: string;
}

const studyFormats: Option[] = [
  { id: "full-time", label: "Full Time" },
  { id: "part-time", label: "Part Time" },
];

const attendanceTypes: Option[] = [
  { id: "on-campus", label: "On campus" },
  { id: "online", label: "Online Learning" },
  { id: "blended", label: "Blended Learning" },
  { id: "executive", label: "Executive Programs" },
  { id: "joint", label: "Joint Programs" },
];

const budgetRanges: Option[] = [
  { id: "15-20k", label: "£ 15000 - £ 20000" },
  { id: "20-25k", label: "£ 20000 - £ 25000" },
  { id: "25k+", label: "£ 25000++" },
  { id: "30k+", label: "£30000++" },
];

const workExperiences: Option[] = [
  { id: "0", label: "0 Year" },
  { id: "lt3", label: "Less than 3 years" },
  { id: "lt5", label: "Less than 5 years" },
  { id: "5+", label: "5+ Years" },
];

export default function StudyFormatSelection() {
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

  const handleFormatSelect = (id: string) => {
    setStudyFormat(studyFormat === id ? '' : id);
  };

  const handleAttendanceSelect = (id: string) => {
    setAttendanceType(attendanceType === id ? '' : id);
  };

  const handleBudgetSelect = (id: string) => {
    setBudget(budget === id ? '' : id);
  };

  const handleExperienceSelect = (id: string) => {
    setWorkExperience(workExperience === id ? '' : id);
  };

  return (
    <WizardLayout variant="white" headerVariant="alt">
      <main className="format-main">
        <div className="format-nav-row">
          <button className="nav-arrow-btn nav-arrow-btn--left" onClick={goToPrevious} aria-label="Previous page">
            <LeftArrows />
          </button>
          <h1 className="format-page-title">Help us to understand better</h1>
          <button 
            className="nav-arrow-btn nav-arrow-btn--right" 
            onClick={handleNext} 
            disabled={!canProceed}
            aria-label="Next page"
          >
            <RightArrows />
          </button>
        </div>

        <div className="format-sections">
          <div className="format-section">
            <h2 className="format-section__title">Choose your study format</h2>
            <div className="format-pills">
              {studyFormats.map((format) => (
                <button
                  key={format.id}
                  className={`format-pill ${studyFormat === format.id ? 'format-pill--selected' : ''}`}
                  onClick={() => handleFormatSelect(format.id)}
                >
                  {format.label}
                </button>
              ))}
            </div>
          </div>

          <div className="format-section">
            <h2 className="format-section__title">Choose your study attendance type</h2>
            <div className="format-pills">
              {attendanceTypes.map((type) => (
                <button
                  key={type.id}
                  className={`format-pill ${attendanceType === type.id ? 'format-pill--selected' : ''}`}
                  onClick={() => handleAttendanceSelect(type.id)}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className="format-section">
            <h2 className="format-section__title">Choose your study budget</h2>
            <div className="format-pills">
              {budgetRanges.map((budgetOption) => (
                <button
                  key={budgetOption.id}
                  className={`format-pill ${budget === budgetOption.id ? 'format-pill--selected' : ''}`}
                  onClick={() => handleBudgetSelect(budgetOption.id)}
                >
                  {budgetOption.label}
                </button>
              ))}
            </div>
          </div>

          <div className="format-section">
            <h2 className="format-section__title">Choose your applicable work experience?</h2>
            <div className="format-pills">
              {workExperiences.map((exp) => (
                <button
                  key={exp.id}
                  className={`format-pill ${workExperience === exp.id ? 'format-pill--selected' : ''}`}
                  onClick={() => handleExperienceSelect(exp.id)}
                >
                  {exp.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="format-divider-container">
          <div className="format-divider" />
        </div>
      </main>
    </WizardLayout>
  );
}
