import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  return (
    <>
      <header className={`
        flex items-center justify-between
        pt-[20px] tablet:pt-[35px]
        px-4 tablet:px-[39px]
        pb-3 tablet:pb-4
        ${className}
      `}>
        {/* Logo - clickable to go home */}
        <div 
          className="flex items-center gap-[6px] cursor-pointer"
          onClick={handleLogoClick}
        >
          <img 
            src="/assets/AUN Logo.svg" 
            alt="AUN Logo" 
            className="h-[34px] w-auto" 
          />
          <span className="font-accent text-xl text-secondary">One</span>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-[18px]">
          <img 
            src={ProfileIconSvg} 
            alt="Profile" 
            className="w-[15px] h-[15px] cursor-pointer" 
          />
          {isMenuOpen ? (
            <CloseIcon 
              className="w-[15px] h-[15px] cursor-pointer" 
              onClick={toggleMenu} 
            />
          ) : (
            <img 
              src={MenuIconSvg} 
              alt="Menu" 
              className="w-[15px] h-[10px] cursor-pointer" 
              onClick={toggleMenu}
            />
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
