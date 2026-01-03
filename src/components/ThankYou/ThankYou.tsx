// Thank You Confirmation Screen Component
// Refactored with separate CSS file

import './ThankYou.css';
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

const HomeIcon = () => (
  <svg width="31" height="26" viewBox="0 0 31 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.5 0L0 10V26H10V16H21V26H31V10L15.5 0Z" fill="#9E9E9E"/>
  </svg>
);

export default function ThankYou() {
  const { resetForm } = useFormStore();
  const { goHome } = useFormNavigation();

  const handleGoHome = () => {
    resetForm();
    goHome();
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
        <div className="thankyou-nav">
          <button className="page-nav-arrow" disabled>
            <LeftArrow /><LeftArrow /><LeftArrow />
          </button>
          <h2 className="page-title page-title--highlight">Thankyou..!</h2>
          <button className="page-nav-arrow" disabled>
            <RightArrow /><RightArrow /><RightArrow />
          </button>
        </div>

        <div className="thankyou-content">
          <div className="thankyou-text">
            <p className="thankyou-text__title">Thankyou..!</p>
            
            <div className="thankyou-text__body">
              <p>Thank you for letting us know your interest</p>
              <p>and your study abroad partner will connect</p>
              <p>you at the earliest possible.</p>
            </div>
            
            <div className="thankyou-text__body">
              <p>We are FULLY DIGITAL and focusing</p>
              <p>for truest global student recruitment.</p>
            </div>
          </div>

          <button className="thankyou-home-btn" onClick={handleGoHome}>
            <HomeIcon />
          </button>
        </div>

        <div className="thankyou-divider" />
      </main>
    </GradientBackgroundTailwind>
  );
}

