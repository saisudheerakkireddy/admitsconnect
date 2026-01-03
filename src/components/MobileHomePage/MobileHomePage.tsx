// AdmitsConnect Mobile Home Page Component
// Refactored with separate CSS file

import './MobileHomePage.css';
import { GradientBackgroundTailwind } from '../GradientBackgroundTailwind';
import { useFormStore } from '../../store/formStore';
import { useFormNavigation } from '../../hooks/useFormNavigation';

const tags = [
  "Quick Offer",
  "Course with Internships",
  "High Offer Acceptance-Rate",
  "Affordable University",
  "Guaranteed Scholarship",
  "Trending Courses",
  "High Ranking Universities",
  "Outstanding Facilities",
  "English Test Waiver",
  "Low Tuition Deposit",
  "Backlog Acceptance",
  "MOI Acceptable",
  "Professional Accreditations",
  "Culture and Social Experience",
  "Affordable Living",
  "Career Upskilling",
  "Quick Education Loans",
  "Accommodation",
  "Part Time Jobs",
  "Pre-Departure",
  "Destination - Arrival pickup",
  "On - Arrival registrations",
  "Internship (in-line to Subject area)",
  "Part-time jobs (in-line to academics / work experience)",
];

// Stats data with icon paths from Figma assets
const stats = [
  { value: "12,000+", lines: ["Students", "Helped"], iconPath: "/assets/icons/stats/Students Helped icon.svg" },
  { value: "3,00,000+", lines: ["Study", "Options"], iconPath: "/assets/icons/stats/Study Options Icon.svg" },
  { value: "2,180", lines: ["Global", "Universities"], iconPath: "/assets/icons/stats/Global Universities icon.svg" },
  { value: "100%", lines: ["Transparent", "Process"], iconPath: "/assets/icons/stats/Transparent Process icon.svg" },
  { value: "500+", lines: ["Global", "Events"], iconPath: "/assets/icons/stats/Global Events icon.svg" },
  { value: "1,200+", lines: ["Virtual", "sessions"], iconPath: "/assets/icons/stats/Virtual sessions icon.svg" },
  { value: "100%", lines: ["Student", "Satisfaction"], iconPath: "/assets/icons/stats/Student satisfaction icon.svg" },
  { value: "20+", lines: ["Study", "Destinations"], iconPath: "/assets/icons/stats/Study destination Icon.svg" },
  { value: "12+", lines: ["Year's", "Experience"], iconPath: "/assets/icons/stats/Years Experience icon.svg" },
];

// Profile Icon - Two-tone colors matching Figma design (#C22032 for head, #1E417C for body)
const ProfileIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_profile)">
      <path d="M7.5009 8.0262C9.7137 8.0262 11.514 6.22582 11.514 4.01311C11.5139 1.80047 9.71348 0 7.5009 0C5.28811 0 3.48779 1.8004 3.48779 4.01311C3.48779 6.22574 5.28819 8.0262 7.5009 8.0262ZM7.5009 1.20758C9.0483 1.20758 10.3066 2.46584 10.3066 4.01326C10.3064 5.56067 9.0483 6.81879 7.5009 6.81879C5.95349 6.81879 4.69521 5.56051 4.69521 4.01311C4.69521 2.46584 5.9541 1.20758 7.5009 1.20758Z" fill="#C22032"/>
      <path d="M0.620203 14.978C0.941362 15.0655 1.27407 14.8778 1.36273 14.556C2.11922 11.8059 4.64359 9.88523 7.5003 9.88523C10.357 9.88523 12.8809 11.8058 13.6378 14.556C13.7122 14.8241 13.9549 14.9997 14.2199 14.9997C14.273 14.9997 14.3267 14.9925 14.3804 14.978C14.7016 14.8893 14.8907 14.5572 14.8025 14.2355C13.9017 10.9631 10.899 8.67773 7.5006 8.67773C4.10232 8.67773 1.09918 10.9628 0.198395 14.2355C0.109716 14.5566 0.299051 14.8894 0.620203 14.978Z" fill="#1E417C"/>
    </g>
    <defs>
      <clipPath id="clip0_profile">
        <rect width="15" height="15" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

// Menu Icon - matching Figma design
const MenuIcon = () => (
  <svg width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.833336 9.99999C0.597225 9.99999 0.399447 9.91999 0.240003 9.75999C0.0805585 9.59999 0.000558429 9.40221 2.87356e-06 9.16666C-0.000552682 8.9311 0.0794474 8.73332 0.240003 8.57332C0.400558 8.41332 0.598336 8.33332 0.833336 8.33332H14.1667C14.4028 8.33332 14.6008 8.41332 14.7608 8.57332C14.9208 8.73332 15.0006 8.9311 15 9.16666C14.9994 9.40221 14.9194 9.60027 14.76 9.76082C14.6006 9.92138 14.4028 10.0011 14.1667 9.99999H0.833336ZM0.833336 5.83333C0.597225 5.83333 0.399447 5.75333 0.240003 5.59333C0.0805585 5.43333 0.000558429 5.23555 2.87356e-06 4.99999C-0.000552682 4.76444 0.0794474 4.56666 0.240003 4.40666C0.400558 4.24666 0.598336 4.16666 0.833336 4.16666H14.1667C14.4028 4.16666 14.6008 4.24666 14.7608 4.40666C14.9208 4.56666 15.0006 4.76444 15 4.99999C14.9994 5.23555 14.9194 5.43361 14.76 5.59416C14.6006 5.75472 14.4028 5.83444 14.1667 5.83333H0.833336ZM0.833336 1.66666C0.597225 1.66666 0.399447 1.58666 0.240003 1.42667C0.0805585 1.26667 0.000558429 1.06889 2.87356e-06 0.833332C-0.000552682 0.597777 0.0794474 0.4 0.240003 0.24C0.400558 0.08 0.598336 0 0.833336 0H14.1667C14.4028 0 14.6008 0.08 14.7608 0.24C14.9208 0.4 15.0006 0.597777 15 0.833332C14.9994 1.06889 14.9194 1.26694 14.76 1.4275C14.6006 1.58805 14.4028 1.66778 14.1667 1.66666H0.833336Z" fill="black"/>
  </svg>
);

// Tag Button Component
interface TagButtonProps {
  label: string;
  isSelected: boolean;
  onToggle: () => void;
}

const TagButton = ({ label, isSelected, onToggle }: TagButtonProps) => (
  <button className="home-tag-button" onClick={onToggle}>
    <div className={`home-tag-button__inner ${isSelected ? 'home-tag-button__inner--selected' : ''}`}>
      <span className={`home-tag-button__text ${isSelected ? 'home-tag-button__text--selected' : ''}`}>
        {label}
      </span>
    </div>
  </button>
);

// Stat Card Component
interface StatCardProps {
  value: string;
  lines: string[];
  iconPath: string;
}

const StatCard = ({ value, lines, iconPath }: StatCardProps) => (
  <div className="stat-card">
    <div className="stat-card__icon">
      <img src={iconPath} alt="" width="28" height="28" />
    </div>
    <div className="stat-card__content">
      <p className="stat-card__value">{value}</p>
      {lines.map((line, i) => (
        <p key={i} className="stat-card__label">{line}</p>
      ))}
    </div>
  </div>
);

export default function MobileHomePage() {
  const { selectedTags, toggleTag } = useFormStore();
  const { goToNext } = useFormNavigation();

  const handleNext = () => {
    goToNext();
  };

  return (
    <GradientBackgroundTailwind variant="white" className="page-container page-container--wide">
      {/* Header */}
      <header className="home-header">
        <div className="home-header__logo">
          <img src="/assets/logo.png" alt="AUN Logo" />
        </div>
        <div className="home-header__actions">
          <ProfileIcon />
          <MenuIcon />
        </div>
      </header>

      {/* Main Content */}
      <main className="home-main">
        {/* Tagline Section */}
        <section className="tagline-section">
          <p className="tagline-section__subtitle">
            Four Services <span className="font-semibold">+</span> One Mission:
          </p>
          <p className="tagline-section__title">
            Empowering global talent.
          </p>
          <p className="tagline-section__highlight">
            Not just study options but
          </p>
          <p className="tagline-section__highlight">
            Experience the future-ready-courses.
          </p>
        </section>

        {/* Tags Section */}
        <section className="tags-section">
          <div className="tags-wrapper">
            {tags.map((tag, index) => (
              <TagButton 
                key={index} 
                label={tag} 
                isSelected={selectedTags?.includes(tag) || false}
                onToggle={() => toggleTag(tag)}
              />
            ))}
          </div>
          
          {/* Next Button */}
          <div className="next-button-container">
            <button onClick={handleNext} className="next-button">
              Next
            </button>
          </div>
        </section>

        {/* Divider */}
        <div className="home-divider-container">
          <div className="home-divider" />
        </div>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <StatCard 
                key={index} 
                value={stat.value} 
                lines={stat.lines} 
                iconPath={stat.iconPath}
              />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="home-footer">
          <div className="footer-primary-links">
            <a href="#" className="footer-primary-link">About Us</a>
            <a href="#" className="footer-primary-link">EXPLORE</a>
            <a href="#" className="footer-primary-link">AI Student Advisor</a>
          </div>
          
          <div className="footer-secondary-links">
            <a href="#" className="footer-secondary-link">T&C</a>
            <a href="#" className="footer-secondary-link">Privacy Policy</a>
            <a href="#" className="footer-secondary-link">Refund Policy</a>
            <a href="#" className="footer-secondary-link">Anti-Fraud Policy</a>
            <a href="#" className="footer-secondary-link">Grievance</a>
          </div>

          <div className="footer-contact">
            <p className="footer-contact__title">Quick Question?</p>
            <p className="footer-contact__info">+44 773 45 66688 UK</p>
            <p className="footer-contact__info">+91 970 45 66688 IN</p>
            <p className="footer-contact__info">support@applyuninow.com</p>
            <p className="footer-copyright">Crafted by AUN Tech Consulting Pvt. Ltd.</p>
          </div>
        </footer>
      </main>
    </GradientBackgroundTailwind>
  );
}

