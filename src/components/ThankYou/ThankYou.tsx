

import './ThankYou.css';

import WizardLayout from '../WizardLayout';

// Stats data matching MobileHomePage
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

const StatCard = ({ value, lines, iconPath }: { value: string; lines: string[]; iconPath: string }) => (
  <div className="thankyou-stat-card">
    <img src={iconPath} alt="" className="thankyou-stat-icon" />
    <div className="thankyou-stat-text">
      <p className="thankyou-stat-value">{value}</p>
      {lines.map((line, i) => (
        <p key={i} className="thankyou-stat-label">{line}</p>
      ))}
    </div>
  </div>
);

import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';

export default function ThankYou() {
  // handleGoHome removed as it is unused

  return (
    <WizardLayout variant="white" headerVariant="default">
      <main className="page-main--thankyou">
        <div className="thankyou-content">
          <h2 className="thankyou-title">Thankyou..!</h2>

          <div className="thankyou-message">
            <p>Thank you for letting us know your interest</p>
            <p>and your study abroad partner will connect you at the earliest possible.</p>
          </div>

          <div className="thankyou-message thankyou-message--highlight">
            <p>We are FULLY DIGITAL and focusing for truest global student recruitment.</p>
          </div>

          <div className="thankyou-logo-container">
            <Link to="/" className="thankyou-logo">
              <img src="/assets/AUN Logo.svg" alt="AUN Logo" className="thankyou-logo-img" />
              <span className="thankyou-logo-text">One</span>
            </Link>
          </div>

          <div className="thankyou-stats-grid">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                value={stat.value}
                lines={stat.lines}
                iconPath={stat.iconPath}
              />
            ))}
          </div>
        </div>
        <Footer className="thankyou-footer" />
      </main>
    </WizardLayout>
  );
}

