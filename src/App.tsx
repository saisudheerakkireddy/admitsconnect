import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from './api/types';
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

// Wrapper component to provide consistent layout
function AppContent() {
  return (
    <BackgroundImage variant="pastel-mountains">
      <div className="app-wrapper">
        <Routes>
          <Route path={ROUTES.HOME} element={<MobileHomePage />} />
          <Route path={ROUTES.COUNTRY} element={<CountrySelection />} />
          <Route path={ROUTES.STUDY_LEVEL} element={<StudyAreaSelection />} />
          <Route path={ROUTES.INTAKE} element={<IntakeYearSelection />} />
          <Route path={ROUTES.INDUSTRY} element={<StudyIndustrySelection />} />
          <Route path={ROUTES.STUDY_AREA} element={<StudyAreaList />} />
          <Route path={ROUTES.FORMAT} element={<StudyFormatSelection />} />
          <Route path={ROUTES.ACADEMICS} element={<RecentAcademicsInfo />} />
          {/* Temporary: assessment step uses existing TestPreferences until ContactInfo is split out */}
          <Route path={ROUTES.ASSESSMENT} element={<TestPreferences />} />
          <Route path={ROUTES.CONTACT} element={<ContactInfo />} />
          <Route path={ROUTES.THANK_YOU} element={<ThankYou />} />
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
