// Contact Info / Submit Screen Component
// This component was split out from the prior `TestPreferences` implementation so `/assessment` can exist separately.

import './ContactInfo.css';
import { useEffect } from 'react';
import { useFormStore } from '../../store/formStore';
import { useFormNavigation } from '../../hooks/useFormNavigation';
import { submitApplication } from '../../api/services';
import WizardLayout from '../WizardLayout';

const LeftArrow = () => (
  <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 1L1 4.5L4 8" stroke="#1E417C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RightArrow = () => (
  <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L4 4.5L1 8" stroke="#C22032" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 3L3 5L7 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ContactInfo() {
  const { contact, setContact, getApplicationData, setSubmitting, setSubmitted, setError, isSubmitting } =
    useFormStore();
  const { goToPrevious, goToNext } = useFormNavigation();

  // Initialize terms consent as checked by default
  useEffect(() => {
    if (contact && contact.termsConsent === undefined) {
      setContact({ termsConsent: true, emailConsent: true });
    }
  }, [contact, setContact]);

  const handleSubmit = async () => {
    if (!contact?.termsConsent) {
      setError('Please accept the terms and conditions');
      return;
    }

    if (!contact?.firstName || !contact?.lastName || !contact?.phone || !contact?.email) {
      setError('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const applicationData = getApplicationData();
      const response = await submitApplication(applicationData);

      if (response.success) {
        setSubmitted(true);
        goToNext();
      } else {
        setError(response.data.message || 'Submission failed. Please try again.');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <WizardLayout variant="white" headerVariant="alt">
      <main className="page-main--alt">
        <div className="contact-nav">
          <button className="page-nav-arrow" onClick={goToPrevious}>
            <LeftArrow />
            <LeftArrow />
            <LeftArrow />
          </button>
          <h2 className="page-title page-title--highlight">Almost there..!</h2>
          <button className="page-nav-arrow" disabled>
            <RightArrow />
            <RightArrow />
            <RightArrow />
          </button>
        </div>

        <div className="contact-form">
          <p className="contact-form__description">
            We enable you to explore all the study options in one place and to find the best study programme that
            matches your needs, goals, and preferences.
          </p>

          <div className="contact-form__fields">
            <input
              type="text"
              placeholder="First Name"
              value={contact?.firstName || ''}
              onChange={(e) => setContact({ firstName: e.target.value })}
              className="glass-input glass-input--full"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={contact?.lastName || ''}
              onChange={(e) => setContact({ lastName: e.target.value })}
              className="glass-input glass-input--full"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={contact?.phone || ''}
              onChange={(e) => setContact({ phone: e.target.value })}
              className="glass-input glass-input--full"
            />
            <input
              type="email"
              placeholder="Email ID"
              value={contact?.email || ''}
              onChange={(e) => setContact({ email: e.target.value })}
              className="glass-input glass-input--full"
            />
          </div>

          <div className="contact-form__divider" />

          <div className="contact-form__consents">
            <div className="contact-consent">
              <div className="contact-consent__checkbox">
                <button
                  type="button"
                  onClick={() => setContact({ emailConsent: !contact?.emailConsent })}
                  className={`contact-consent__box ${contact?.emailConsent ? 'contact-consent__box--checked' : ''}`}
                >
                  {contact?.emailConsent && <CheckIcon />}
                </button>
              </div>
              <p
                className="contact-consent__label"
                onClick={() => setContact({ emailConsent: !contact?.emailConsent })}
                style={{ cursor: 'pointer' }}
              >
                Receive monthly emails right to your inbox with programmes that match your individual profile as well as
                useful information to plan your study abroad journey.
              </p>
            </div>

            <div className="contact-consent">
              <div className="contact-consent__checkbox">
                <button
                  type="button"
                  onClick={() => setContact({ termsConsent: !contact?.termsConsent })}
                  className={`contact-consent__box contact-consent__box--required ${contact?.termsConsent ? 'contact-consent__box--checked' : ''}`}
                  title="This field is required and must be accepted"
                >
                  {contact?.termsConsent && <CheckIcon />}
                </button>
              </div>
              <p
                className="contact-consent__label"
                onClick={(e) => {
                  // Prevent toggle if clicking on links
                  if ((e.target as HTMLElement).tagName === 'A') return;
                  setContact({ termsConsent: !contact?.termsConsent });
                }}
                style={{ cursor: 'pointer' }}
              >
                By registering, you agree to our{' '}
                <a href="/privacy-policy" className="contact-consent__link">Privacy Statement</a>
                {' '}and{' '}
                <a href="/terms-conditions" className="contact-consent__link">Terms and Conditions.</a>
                {' '}<span className="contact-consent__required">*</span>
              </p>
            </div>
          </div>

          <button onClick={handleSubmit} disabled={isSubmitting} className="contact-submit">
            <span className="contact-submit__text">{isSubmitting ? 'Submitting...' : 'Submit'}</span>
          </button>
        </div>

        <div className="contact-divider" />
      </main>
    </WizardLayout>
  );
}


