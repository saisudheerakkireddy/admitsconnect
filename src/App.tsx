import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from './api/types';
import { useTheme } from './hooks/useTheme';
import { BackgroundImage } from './components/BackgroundImage';

// Import all page components
import MobileHomePage from './components/MobileHomePage';
import CountrySelection from './components/CountrySelection';
import StudyAreaSelection from './components/StudyAreaSelection';
import IntakeYearSelection from './components/IntakeYearSelection';
import StudyIndustrySelection from './components/StudyIndustrySelection';
import StudyAreaList from './components/StudyAreaList';
import StudyFormatSelection from './components/StudyFormatSelection';
import RecentAcademicsInfo from './components/RecentAcademicsInfo';
import TestPreferences from './components/TestPreferences';
import ContactInfo from './components/ContactInfo/ContactInfo';
import ThankYou from './components/ThankYou';

// Wrapper component to provide theme to all pages
function AppContent() {
  const { theme, toggleTheme } = useTheme();

  return (
    <BackgroundImage variant="pastel-mountains" theme={theme}>
      <div className="app-wrapper">
        <Routes>
          <Route path={ROUTES.HOME} element={<MobileHomePage theme={theme} onThemeToggle={toggleTheme} />} />
          <Route path={ROUTES.COUNTRY} element={<CountrySelection theme={theme} onThemeToggle={toggleTheme} />} />
          <Route path={ROUTES.STUDY_LEVEL} element={<StudyAreaSelection theme={theme} onThemeToggle={toggleTheme} />} />
          <Route path={ROUTES.INTAKE} element={<IntakeYearSelection theme={theme} onThemeToggle={toggleTheme} />} />
          <Route path={ROUTES.INDUSTRY} element={<StudyIndustrySelection theme={theme} onThemeToggle={toggleTheme} />} />
          <Route path={ROUTES.STUDY_AREA} element={<StudyAreaList theme={theme} onThemeToggle={toggleTheme} />} />
          <Route path={ROUTES.FORMAT} element={<StudyFormatSelection theme={theme} onThemeToggle={toggleTheme} />} />
          <Route path={ROUTES.ACADEMICS} element={<RecentAcademicsInfo theme={theme} onThemeToggle={toggleTheme} />} />
          {/* Temporary: assessment step uses existing TestPreferences until ContactInfo is split out */}
          <Route path={ROUTES.ASSESSMENT} element={<TestPreferences theme={theme} onThemeToggle={toggleTheme} />} />
          <Route path={ROUTES.CONTACT} element={<ContactInfo theme={theme} onThemeToggle={toggleTheme} />} />
          <Route path={ROUTES.THANK_YOU} element={<ThankYou theme={theme} onThemeToggle={toggleTheme} />} />
        </Routes>
      </div>
    </BackgroundImage>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
