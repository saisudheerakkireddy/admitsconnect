import { useEffect } from 'react';
import { useFormStore } from '../../store/formStore';
import { useFormNavigation } from '../../hooks/useFormNavigation';
import Header from '../Header';
import Footer from '../Footer/Footer';
import './MobileHomePage.css';

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
  const { selectedTags, toggleTag, resetStore } = useFormStore();
  const { goToNext } = useFormNavigation();

  useEffect(() => {
    resetStore();
  }, []);

  const handleNext = () => {
    goToNext();
  };

  return (
    <div className="page-container">
      <Header variant="default" />

      <main className="home-content-wrapper">
        <section className="home-section flex flex-col items-center">
          <p className="tagline-figma mb-6 tablet:mb-[42px]">
            Four Services + One Mission: <strong>Empowering global talent</strong>.
          </p>
          <p
            className="subtitle-figma"
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

        <section className="home-section home-section--tags">
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

          <div className="flex justify-center mt-[5px] mb-[var(--home-content-gap)]">
            <button
              onClick={handleNext}
              aria-label="Continue to next step"
              className="btn-next-figma"
            >
              Next
            </button>
          </div>
        </section>

        <section className="home-section">
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

        <footer className="home-section--footer">
          <Footer />
        </footer>
      </main>
    </div>
  );
}
