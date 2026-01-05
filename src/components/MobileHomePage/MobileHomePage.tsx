// AdmitsConnect Mobile Home Page Component
// Refactored with separate CSS file

import './MobileHomePage.css';
import { useFormStore } from '../../store/formStore';
import { useFormNavigation } from '../../hooks/useFormNavigation';
import Header from '../Header';

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
    <div className="page-container page-container--wide">
      {/* Header */}
      <Header variant="default" />

      {/* Main Content */}
      <div className="page-wrapper">
        <main className="home-main">
          {/* Tagline Section */}
          <section className="tagline-section">
            <p className="tagline-section__subtitle">
              Four Services <span className="font-semibold">+</span> One Mission: <span className="tagline-section__title">Empowering global talent.</span>
            </p>
            <p className="tagline-section__highlight">
              Not just study options but Experience the future-ready-courses.
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
      </div>
    </div>
  );
}

