import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from './api/types';

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
import ThankYou from './components/ThankYou';

function App() {
  return (
    <BrowserRouter>
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
          <Route path={ROUTES.CONTACT} element={<TestPreferences />} />
          <Route path={ROUTES.THANK_YOU} element={<ThankYou />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
