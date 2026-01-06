// AdmitsConnect Home Page Component
// Responsive implementation matching Figma specs (Mobile-first)
// Breakpoints: Mobile (base) → Tablet (768px) → Desktop (1280px)

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

/**
 * TagButton Component
 * Uses CSS custom properties for responsive sizing (defined in variables.css)
 * Mobile: 8px font, 28px height, 23px radius
 * Tablet: 12px font (Comfortaa), 40px height, 30px radius  
 * Desktop: 15px font (Poppins), 50px height, 30px radius
 */
interface TagButtonProps {
  label: string;
  isSelected: boolean;
  onToggle: () => void;
}

const TagButton = ({ label, isSelected, onToggle }: TagButtonProps) => (
  <button 
    onClick={onToggle}
    aria-pressed={isSelected}
    className={`tag-figma ${isSelected ? 'tag-figma--selected' : ''}`}
  >
    {label}
  </button>
);

/**
 * StatCard Component
 * Uses CSS custom properties for responsive icon and text sizing
 * Mobile: 20px icons, 8px text
 * Tablet/Desktop: 32px icons, 15px text
 */
interface StatCardProps {
  value: string;
  lines: string[];
  iconPath: string;
}

const StatCard = ({ value, lines, iconPath }: StatCardProps) => (
  <div className="flex flex-col items-center text-center gap-2">
    <img 
      src={iconPath} 
      alt="" 
      className="stats-icon-figma object-contain"
    />
    <div className="stats-value-figma font-primary text-black">
      <p className="font-normal m-0">{value}</p>
      {lines.map((line, i) => (
        <p key={i} className="font-normal m-0">{line}</p>
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
    <div className="page-container">
      {/* Header - Uses responsive CSS custom properties */}
      <Header variant="default" />

      {/* Main Content - Responsive container */}
      <main className="w-full mx-auto px-(--content-padding) tablet:px-[39px] desktop:px-[110px]">
        {/* Tagline Section - Uses Figma-aligned responsive classes */}
        <section className="text-center mb-10 tablet:mb-20 mt-0">
          <p className="tagline-figma mx-auto mb-6 tablet:mb-[42px] text-center">
            Four Services + One Mission: <strong>Empowering global talent</strong>.
          </p>
          <p 
            className="subtitle-figma mx-auto text-center"
            style={{
              background: 'linear-gradient(140.59deg, #EE1113 0.91%, #7403FA 96.74%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Not just study options but experience the future-ready-courses.
          </p>
        </section>

        {/* Tags Section - Uses CSS custom properties for responsive gap/sizing */}
        <section className="mb-10 tablet:mb-20">
          <div className="tag-container">
            {tags.map((tag, index) => (
              <TagButton 
                key={index} 
                label={tag} 
                isSelected={selectedTags?.includes(tag) || false}
                onToggle={() => toggleTag(tag)}
              />
            ))}
          </div>
          
          {/* Next Button - Figma spec: Red pill button with "Next" text */}
          <div className="flex justify-center mt-10 tablet:mt-14 mb-0">
            <button 
              onClick={handleNext} 
              aria-label="Continue to next step"
              className="btn-next-figma"
            >
              Next
            </button>
          </div>
        </section>

        {/* Stats Section - Responsive grid: 3 cols mobile/tablet → 9 cols desktop */}
        <section className="mb-10 tablet:mb-20">
          <div className="stats-grid-figma">
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

        {/* Footer - Horizontal layout matching Figma design */}
        <footer className="text-center pb-6 tablet:pb-10 mt-10 tablet:mt-16">
          {/* Links Section - Horizontal on all viewports */}
          <div className="flex flex-wrap justify-center items-center gap-x-6 tablet:gap-x-8 gap-y-3 mb-6 tablet:mb-8 max-w-[1400px] mx-auto px-4">
            {/* Navigation Links */}
            <a href="#" className="footer-link-figma">About Us</a>
            <a href="#" className="footer-link-figma">EXPLORE</a>
            <a href="#" className="footer-link-figma">AI Student Advisor</a>
            {/* Legal Links */}
            <a href="#" className="footer-link-figma">Terms & Conditions</a>
            <a href="#" className="footer-link-figma">Privacy Policy</a>
            <a href="#" className="footer-link-figma">Refund Policy</a>
            <a href="#" className="footer-link-figma">Anti-Fraud Policy</a>
            <a href="#" className="footer-link-figma">Grievance</a>
          </div>

          {/* Contact Info - Horizontal layout with "Talking to us is easy:" */}
          <div className="flex flex-wrap justify-center items-center gap-x-4 tablet:gap-x-8 gap-y-2 mb-6">
            <p className="footer-contact-title-figma leading-normal">Talking to us is easy:</p>
            <p className="footer-contact-detail-figma leading-normal">+44 773 45 66688 UK</p>
            <p className="footer-contact-detail-figma leading-normal">+91 970 45 66688 IN</p>
            <p className="footer-contact-detail-figma leading-normal">support@applyuninow.com</p>
          </div>

          {/* Crafted By */}
          <p className="footer-crafted-figma leading-normal pt-2 gradient-text-footer">
            Crafted by AUN Tech Consulting Pvt. Ltd.
          </p>
        </footer>
      </main>
    </div>
  );
}
