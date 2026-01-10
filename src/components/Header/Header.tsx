import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { useFormStore } from '../../store/formStore';
import ProfileIconSvg from '../../assets/Header_Icons/Profile icon 1.svg';
import MenuIconSvg from '../../assets/Header_Icons/Vector.svg';

// Close Icon (for menu close state)
const CloseIcon: React.FC<{ className?: string; onClick?: () => void }> = ({ className, onClick }) => (
  <svg
    className={className}
    onClick={onClick}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18 6L6 18M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" />
  </svg>
);



interface HeaderProps {
  variant?: 'default' | 'alt';
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  variant: _variant = 'default',
  className = ''
}) => {
  const navigate = useNavigate();
  const { resetStore } = useFormStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogoClick = () => {
    resetStore();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className={`
        header-figma
        ${className}
      `}>
        {/* Logo - clickable to go home */}
        <div
          className="flex items-end gap-[6px] cursor-pointer"
          onClick={handleLogoClick}
        >
          <img
            src="/assets/AUN Logo.svg"
            alt="AUN Logo"
            className="header-logo-figma"
          />
          <span className="header-one-text-figma">One</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-[14px] tablet:gap-[18px] desktop:gap-[24px]">
          <img
            src={ProfileIconSvg}
            alt="Profile"
            className="header-profile-icon-figma cursor-pointer"
          />

          {isMenuOpen ? (
            <CloseIcon
              className="header-menu-icon-figma cursor-pointer"
              onClick={toggleMenu}
            />
          ) : (
            <img
              src={MenuIconSvg}
              alt="Menu"
              className="header-menu-icon-figma cursor-pointer"
              onClick={toggleMenu}
            />
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
