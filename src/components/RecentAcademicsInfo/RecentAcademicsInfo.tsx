// Recent Academics Info Screen Component
// Refactored with separate CSS file

import { useState } from 'react';
import './RecentAcademicsInfo.css';
import { FloatingInput } from '../FloatingInput';
import { useFormStore } from '../../store/formStore';
import { useFormNavigation } from '../../hooks/useFormNavigation';
import WizardLayout from '../WizardLayout';

const LeftArrow = () => (
  <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 1L1 4.5L4 8" stroke="#1E417C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RightArrow = () => (
  <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L4 4.5L1 8" stroke="#C22032" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronDown = () => (
  <svg width="7" height="4" viewBox="0 0 7 4" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L3.5 3L6 1" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronUp = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 7L6 4L9 7" stroke="#505050" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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

export default function RecentAcademicsInfo() {
  const { academics, setSecondaryAcademics, setHigherSecondaryAcademics, setUndergradAcademics, setPostgradAcademics } = useFormStore();
  const { goToNext, goToPrevious, canProceed } = useFormNavigation();
  
  const [undergradExpanded, setUndergradExpanded] = useState(false);
  const [postgradExpanded, setPostgradExpanded] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleNext = () => {
    if (canProceed) goToNext();
  };

  const renderDropdown = (
    id: string, 
    value: string, 
    onChange: (val: string) => void, 
    options: string[] = mediumOptions,
    placeholder: string = 'Select',
    width: string = '150px'
  ) => (
    <div className="academics-dropdown">
      <button
        className="glass-pill glass-input--small"
        style={{ width, position: 'relative' }}
        onClick={() => setOpenDropdown(openDropdown === id ? null : id)}
      >
        <span className="glass-pill__text" style={{ 
          overflow: 'hidden', 
          textOverflow: 'ellipsis', 
          whiteSpace: 'nowrap',
          paddingRight: '20px'
        }}>
          {value || placeholder}
        </span>
        <div style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)' }}>
          <ChevronDown />
        </div>
      </button>
      {openDropdown === id && (
        <div className="academics-dropdown__menu" style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {options.map((option) => (
            <button
              key={option}
              className="academics-dropdown__option"
              onClick={() => { onChange(option); setOpenDropdown(null); }}
            >
              <span className="glass-pill__text" style={{ textAlign: 'left', width: '100%' }}>{option}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <WizardLayout variant="white" headerVariant="alt">
      <main className="page-main--alt" style={{ paddingTop: '24px' }}>
        <div className="academics-nav">
          <button className="page-nav-arrow" onClick={goToPrevious}>
            <LeftArrow /><LeftArrow /><LeftArrow />
          </button>
          <h2 className="page-title">Help us to Understand better</h2>
          <button className="page-nav-arrow" onClick={handleNext} disabled={!canProceed}>
            <RightArrow /><RightArrow /><RightArrow />
          </button>
        </div>

        <div className="academics-form">
          {/* Secondary School */}
          <div className="academics-section">
            <p className="academics-section__title">Secondary school Certificate / 10th</p>
            <div className="academics-section__fields">
              <FloatingInput
                variant="text"
                label="Year of Completion"
                value={academics?.secondary?.year || ''}
                onChange={(val) => setSecondaryAcademics({ year: val })}
                containerClassName="floating-container--full"
              />
              <FloatingInput
                variant="text"
                label="Achieved Grade"
                value={academics?.secondary?.grade || ''}
                onChange={(val) => setSecondaryAcademics({ grade: val })}
                containerClassName="floating-container--full"
              />
              <FloatingInput
                variant="select"
                label="Medium"
                value={academics?.secondary?.medium || ''}
                onChange={(val) => setSecondaryAcademics({ medium: val })}
                options={mediumOptions.map(opt => ({ value: opt, label: opt }))}
                containerClassName="floating-container--small"
              />
            </div>
          </div>

          {/* Higher Secondary */}
          <div className="academics-section">
            <p className="academics-section__title">Higher Secondary school Certificate / 12th</p>
            <div className="academics-section__fields">
              <input
                type="text"
                placeholder="Enter Year of Completion"
                value={academics?.higherSecondary?.year || ''}
                onChange={(e) => setHigherSecondaryAcademics({ year: e.target.value })}
                className="glass-input glass-input--full"
              />
              <input
                type="text"
                placeholder="Enter the Achieved Grade"
                value={academics?.higherSecondary?.grade || ''}
                onChange={(e) => setHigherSecondaryAcademics({ grade: e.target.value })}
                className="glass-input glass-input--full"
              />
              {renderDropdown('higher-secondary-medium', academics?.higherSecondary?.medium || '', (val) => setHigherSecondaryAcademics({ medium: val }))}
            </div>
          </div>

          {/* Under Graduation */}
          <div className="academics-section">
            <button 
              className="academics-section__toggle"
              onClick={() => {
                setUndergradExpanded(!undergradExpanded);
                if (!undergradExpanded && !academics?.undergrad) setUndergradAcademics({});
              }}
            >
              <p className="academics-section__title" style={{ marginBottom: 0 }}>Under Graduation</p>
              <div className={`academics-section__toggle-icon ${undergradExpanded ? 'academics-section__toggle-icon--open' : ''}`}>
                <ChevronUp />
              </div>
            </button>
            {undergradExpanded && (
              <div className="academics-section__fields">
                {renderDropdown(
                  'undergrad-degree', 
                  academics?.undergrad?.degreeType || '', 
                  (val) => setUndergradAcademics({ degreeType: val }),
                  undergradDegreeTypes,
                  'Choose the Type of Degree',
                  '100%'
                )}
                <input type="text" placeholder="Enter the Start Year" value={academics?.undergrad?.startYear || ''} onChange={(e) => setUndergradAcademics({ startYear: e.target.value })} className="glass-input" style={{ width: '116px' }} />
                <input type="text" placeholder="Enter the End Year" value={academics?.undergrad?.endYear || ''} onChange={(e) => setUndergradAcademics({ endYear: e.target.value })} className="glass-input" style={{ width: '112px' }} />
                <input type="text" placeholder="Enter the Achieved Grade" value={academics?.undergrad?.grade || ''} onChange={(e) => setUndergradAcademics({ grade: e.target.value })} className="glass-input" style={{ width: '140px' }} />
                <input type="number" placeholder="Enter Total Backlogs" value={academics?.undergrad?.backlogs || ''} onChange={(e) => setUndergradAcademics({ backlogs: parseInt(e.target.value) || 0 })} className="glass-input" style={{ width: '119px' }} />
                {renderDropdown('undergrad-medium', academics?.undergrad?.medium || '', (val) => setUndergradAcademics({ medium: val }), mediumOptions, 'Medium', '150px')}
              </div>
            )}
          </div>

          {/* Post Graduation */}
          <div className="academics-section">
            <button 
              className="academics-section__toggle"
              onClick={() => {
                setPostgradExpanded(!postgradExpanded);
                if (!postgradExpanded && !academics?.postgrad) setPostgradAcademics({});
              }}
            >
              <p className="academics-section__title" style={{ marginBottom: 0 }}>Post Graduation</p>
              <div className={`academics-section__toggle-icon ${postgradExpanded ? 'academics-section__toggle-icon--open' : ''}`}>
                <ChevronUp />
              </div>
            </button>
            {postgradExpanded && (
              <div className="academics-section__fields">
                {renderDropdown(
                  'postgrad-degree', 
                  academics?.postgrad?.degreeType || '', 
                  (val) => setPostgradAcademics({ degreeType: val }),
                  postgradDegreeTypes,
                  'Choose the Type of Degree',
                  '100%'
                )}
                <input type="text" placeholder="Enter the Start Year" value={academics?.postgrad?.startYear || ''} onChange={(e) => setPostgradAcademics({ startYear: e.target.value })} className="glass-input" style={{ width: '116px' }} />
                <input type="text" placeholder="Enter the End Year" value={academics?.postgrad?.endYear || ''} onChange={(e) => setPostgradAcademics({ endYear: e.target.value })} className="glass-input" style={{ width: '112px' }} />
                <input type="text" placeholder="Enter the Achieved Grade" value={academics?.postgrad?.grade || ''} onChange={(e) => setPostgradAcademics({ grade: e.target.value })} className="glass-input" style={{ width: '140px' }} />
                <input type="number" placeholder="Enter Total Backlogs" value={academics?.postgrad?.backlogs || ''} onChange={(e) => setPostgradAcademics({ backlogs: parseInt(e.target.value) || 0 })} className="glass-input" style={{ width: '119px' }} />
                {renderDropdown('postgrad-medium', academics?.postgrad?.medium || '', (val) => setPostgradAcademics({ medium: val }), mediumOptions, 'Medium', '150px')}
              </div>
            )}
          </div>
        </div>

        <div className="academics-divider" />
      </main>
    </WizardLayout>
  );
}

