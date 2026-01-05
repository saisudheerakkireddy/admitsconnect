import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

// Service links for dropdown and desktop navigation
const SERVICE_LINKS = [
  { id: 'service-1', name: 'ApplyUniNow', href: 'https://www.applyuninow.com' },
  { id: 'service-2', name: 'ApplyUniLoans', href: 'https://www.applyuniloans.com' },
  { id: 'service-3', name: 'ApplyUniHomes', href: 'https://www.applyunihomes.com' },
  { id: 'service-4', name: 'ApplyUniJobs', href: 'https://www.applyunijobs.com' },
];

// Profile Icon - Black and white version
const ProfileIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={className}
    viewBox="0 0 20 20" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="10" cy="6" r="4" stroke="#000000" strokeWidth="1.5" fill="none"/>
    <path d="M2 18c0-4 4-6 8-6s8 2 8 6" stroke="#000000" strokeWidth="1.5" fill="none"/>
  </svg>
);

// Menu Icon (Hamburger)
const MenuIcon: React.FC<{ className?: string; onClick?: () => void }> = ({ className, onClick }) => (
  <svg 
    className={className}
    onClick={onClick}
    viewBox="0 0 15 10" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="0" y1="1" x2="15" y2="1" stroke="black" strokeWidth="2"/>
    <line x1="0" y1="5" x2="15" y2="5" stroke="black" strokeWidth="2"/>
    <line x1="0" y1="9" x2="15" y2="9" stroke="black" strokeWidth="2"/>
  </svg>
);

// Close Icon
const CloseIcon: React.FC<{ className?: string; onClick?: () => void }> = ({ className, onClick }) => (
  <svg 
    className={className}
    onClick={onClick}
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18 6L6 18M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

interface HeaderProps {
  variant?: 'default' | 'alt';
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  variant = 'default', 
  className = ''
}) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogoClick = () => {
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleServiceClick = (href: string) => {
    setIsMenuOpen(false);
    // Open external links in new tab
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  const handleDesktopServiceClick = (href: string) => {
    // Open external links in new tab
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <header className={`app-header app-header--${variant} ${className}`}>
        {/* Logo - clickable to go home */}
        <div className="app-header__logo" onClick={handleLogoClick}>
          <img src="/assets/AUN Logo.svg" alt="AUN Logo" className="app-header__logo-img" />
        </div>
        
        {/* Desktop Service Links (visible on desktop only) */}
        <nav className="app-header__desktop-nav">
          {SERVICE_LINKS.map((link) => (
            <button
              key={link.id}
              className="app-header__desktop-link"
              onClick={() => handleDesktopServiceClick(link.href)}
            >
              <span className="app-header__desktop-link-prefix">ApplyUni</span>
              <span className="app-header__desktop-link-suffix">
                {link.name.replace('ApplyUni', '')}
              </span>
            </button>
          ))}
        </nav>
        
        {/* Actions */}
        <div className="app-header__actions">
          <ProfileIcon className="app-header__profile-icon" />
          {isMenuOpen ? (
            <CloseIcon className="app-header__menu-icon" onClick={toggleMenu} />
          ) : (
            <MenuIcon className="app-header__menu-icon" onClick={toggleMenu} />
          )}
        </div>
      </header>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <>
          <div className="app-header__overlay" onClick={toggleMenu} />
          <div className="app-header__dropdown">
            <div className="app-header__dropdown-content">
              {SERVICE_LINKS.map((link) => (
                <button
                  key={link.id}
                  className="app-header__dropdown-item"
                  onClick={() => handleServiceClick(link.href)}
                >
                  <span className="app-header__dropdown-item-prefix">ApplyUni</span>
                  <span className="app-header__dropdown-item-suffix">
                    {link.name.replace('ApplyUni', '')}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;

