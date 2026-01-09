import './Footer.css';

interface FooterProps {
    className?: string;
}

export default function Footer({ className = '' }: FooterProps) {
    return (
        <footer className={`footer ${className}`}>
            {/* Links Section */}
            <div className="footer-links">
                {/* Navigation Links */}
                <a href="https://applyuninow.com/about" className="footer-link-figma">About Us</a>
                <a href="https://applyuninow.com/explore" className="footer-link-figma">EXPLORE</a>
                <a href="https://applyuninow.com/industry" className="footer-link-figma">AI Student Advisor</a>
                {/* Legal Links */}
                <a href="https://applyuninow.com/terms-conditions" className="footer-link-figma">Terms & Conditions</a>
                <a href="https://applyuninow.com/terms-conditions" className="footer-link-figma">Privacy Policy</a>
                <a href="https://applyuninow.com/terms-conditions" className="footer-link-figma">Refund Policy</a>
                <a href="https://applyuninow.com/terms-conditions" className="footer-link-figma">Anti-Fraud Policy</a>
                <a href="https://applyuninow.com/terms-conditions" className="footer-link-figma">Grievance</a>
            </div>

            {/* Contact Info */}
            <div className="footer-contact">
                <p className="footer-contact-title-figma leading-normal">Talking to us is easy:</p>
                <p className="footer-contact-detail-figma leading-normal">+44 773 45 66688 UK</p>
                <p className="footer-contact-detail-figma leading-normal">+91 970 45 66688 IN</p>
                <p className="footer-contact-detail-figma leading-normal">support@applyuninow.com</p>
            </div>

            {/* Crafted By */}
            <p className="footer-crafted-figma leading-normal gradient-text-footer">
                Crafted by AUN Tech Consulting Pvt. Ltd.
            </p>
        </footer>
    );
}
