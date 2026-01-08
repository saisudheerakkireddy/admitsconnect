

import './ThankYou.css';
import { useFormStore } from '../../store/formStore';
import { useFormNavigation } from '../../hooks/useFormNavigation';
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

export default function ThankYou() {
  const { resetForm } = useFormStore();
  const { goHome } = useFormNavigation();

  const handleGoHome = () => {
    resetForm();
    goHome();
  };

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
            <div className="thankyou-logo">
              <img src="/assets/AUN Logo.svg" alt="AUN Logo" className="thankyou-logo-img" />
              <span className="thankyou-logo-text">One</span>
            </div>
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

        <footer className="thankyou-footer">
          <div className="thankyou-footer-links">
            <a href="#">About Us</a>
            <a href="#">EXPLORE</a>
            <a href="#">AI Student Advisor</a>
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Refund Policy</a>
            <a href="#">Anti-Fraud Policy</a>
            <a href="#">Grievance</a>
          </div>

          <div className="thankyou-footer-contact">
            <p className="thankyou-contact-label">Talking to us is easy:</p>
            <p>+44 773 45 66688 UK</p>
            <p>+91 970 45 66688 IN</p>
            <p>support@applyuninow.com</p>
          </div>

          <p className="thankyou-footer-copyright">
            Crafted by AUN Tech Consulting Pvt. Ltd.
          </p>
        </footer>
      </main>
    </WizardLayout>
  );
}

