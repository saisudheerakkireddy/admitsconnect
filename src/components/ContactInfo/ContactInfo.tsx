// Contact Info / Submit Screen Component
// This component was split out from the prior `TestPreferences` implementation so `/assessment` can exist separately.

import './ContactInfo.css';
import { useEffect, useState } from 'react';
import { useFormStore } from '../../store/formStore';
import { useFormNavigation } from '../../hooks/useFormNavigation';
import { submitApplication } from '../../api/services';
import WizardLayout from '../WizardLayout';
import validator from 'validator';

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

interface FormErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  terms?: string;
}

export default function ContactInfo() {
  const { contact, setContact, getApplicationData, setSubmitting, setSubmitted, setError: setGlobalError, isSubmitting, error: globalError } =
    useFormStore();
  const { goToPrevious, goToNext } = useFormNavigation();

  // Local state for inline errors
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Initialize terms consent as checked by default
  useEffect(() => {
    if (contact && contact.termsConsent === undefined) {
      setContact({ termsConsent: true, emailConsent: true });
    }
  }, [contact, setContact]);

  const validateField = (name: string, value: any): string | undefined => {
    switch (name) {
      case 'firstName':
        if (!value) return 'First Name is required';
        if (!/^[a-zA-Z\s]*$/.test(value)) return 'Only alphabets are allowed';
        if (value.length > 15) return 'Max 15 characters allowed';
        return undefined;
      case 'lastName':
        if (!value) return 'Last Name is required';
        if (value.length > 15) return 'Max 15 characters allowed';
        return undefined;
      case 'phone':
        if (!value) return 'Phone Number is required';
        if (!/^\d{10}$/.test(value)) return 'Phone number must be exactly 10 digits';
        return undefined;
      case 'email':
        if (!value) return 'Email is required';
        if (!validator.isEmail(value)) return 'Please enter a valid email address';
        if (!value.endsWith('@gmail.com')) return 'Only Gmail addresses are allowed';
        return undefined;
      case 'termsConsent':
        if (!value) return 'You must accept the terms and conditions';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const value = field === 'termsConsent' ? contact?.termsConsent : contact?.[field as keyof typeof contact];
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: string, value: any) => {
    setContact({ [field]: value });

    // Clear error immediately on change if it was invalid
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async () => {
    // Validate all fields
    const newErrors: FormErrors = {};
    let isValid = true;

    const fields = ['firstName', 'lastName', 'phone', 'email', 'termsConsent'];
    fields.forEach(field => {
      const value = field === 'termsConsent' ? contact?.termsConsent : contact?.[field as keyof typeof contact];
      const error = validateField(field, value);
      if (error) {
        newErrors[field as keyof FormErrors] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched({
      firstName: true,
      lastName: true,
      phone: true,
      email: true,
      termsConsent: true
    });

    if (!isValid) {
      setGlobalError('Please fix the errors above');
      return;
    }

    setSubmitting(true);
    setGlobalError(null);

    try {
      const applicationData = getApplicationData();
      const response = await submitApplication(applicationData);

      if (response.success) {
        setSubmitted(true);
        goToNext();
      } else {
        setGlobalError(response.data.message || 'Submission failed. Please try again.');
      }
    } catch {
      setGlobalError('An error occurred. Please try again.');
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
            <div className="field-group">
              <input
                type="text"
                placeholder="First Name"
                value={contact?.firstName || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^[a-zA-Z\s]*$/.test(val) && val.length <= 15) {
                    handleChange('firstName', val);
                  }
                }}
                onBlur={() => handleBlur('firstName')}
                className={`glass-input glass-input--full ${touched.firstName && errors.firstName ? 'input-error' : ''}`}
              />
              {touched.firstName && errors.firstName && <span className="error-text">{errors.firstName}</span>}
            </div>

            <div className="field-group">
              <input
                type="text"
                placeholder="Last Name"
                value={contact?.lastName || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val.length <= 15) {
                    handleChange('lastName', val);
                  }
                }}
                onBlur={() => handleBlur('lastName')}
                className={`glass-input glass-input--full ${touched.lastName && errors.lastName ? 'input-error' : ''}`}
              />
              {touched.lastName && errors.lastName && <span className="error-text">{errors.lastName}</span>}
            </div>

            <div className="field-group">
              <input
                type="tel"
                placeholder="Phone Number"
                value={contact?.phone || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d*$/.test(val) && val.length <= 10) {
                    handleChange('phone', val);
                  }
                }}
                onBlur={() => handleBlur('phone')}
                className={`glass-input glass-input--full ${touched.phone && errors.phone ? 'input-error' : ''}`}
              />
              {touched.phone && errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>

            <div className="field-group">
              <input
                type="email"
                placeholder="Email ID"
                value={contact?.email || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val.length <= 30) {
                    handleChange('email', val);
                  }
                }}
                onBlur={() => handleBlur('email')}
                className={`glass-input glass-input--full ${touched.email && errors.email ? 'input-error' : ''}`}
              />
              {touched.email && errors.email && <span className="error-text">{errors.email}</span>}
            </div>
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
                  onClick={() => {
                    const newValue = !contact?.termsConsent;
                    setContact({ termsConsent: newValue });
                    if (newValue) {
                      setErrors(prev => ({ ...prev, terms: undefined }));
                    }
                  }}
                  className={`contact-consent__box contact-consent__box--required ${contact?.termsConsent ? 'contact-consent__box--checked' : ''} ${touched.termsConsent && errors.terms ? 'input-error' : ''}`}
                  title="This field is required and must be accepted"
                >
                  {contact?.termsConsent && <CheckIcon />}
                </button>
              </div>
              <div className="flex flex-col w-full">
                <p
                  className="contact-consent__label"
                  onClick={(e) => {
                    if ((e.target as HTMLElement).tagName === 'A') return;
                    const newValue = !contact?.termsConsent;
                    setContact({ termsConsent: newValue });
                    if (newValue) {
                      setErrors(prev => ({ ...prev, terms: undefined }));
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  By registering, you agree to our{' '}
                  <a href="/privacy-policy" className="contact-consent__link">Privacy Statement</a>
                  {' '}and{' '}
                  <a href="/terms-conditions" className="contact-consent__link">Terms and Conditions.</a>
                  {' '}<span className="contact-consent__required">*</span>
                </p>
                {touched.termsConsent && errors.terms && <span className="error-text" style={{ marginLeft: 0 }}>{errors.terms}</span>}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <button onClick={handleSubmit} disabled={isSubmitting} className="contact-submit">
              <span className="contact-submit__text">{isSubmitting ? 'Submitting...' : 'Submit'}</span>
            </button>
            {globalError && <p className="submit-error">{globalError}</p>}
          </div>
        </div>

        <div className="contact-divider" />
      </main>
    </WizardLayout>
  );
}

