import { useState, useId, useRef, useEffect } from 'react';
import '../../styles/FloatingInput.css';

// ============================================
// Type Definitions
// ============================================

interface FloatingInputBaseProps {
  label: string;
  error?: string;
  className?: string;
  containerClassName?: string;
  required?: boolean;
}

interface FloatingTextInputProps extends FloatingInputBaseProps {
  variant: 'text' | 'email' | 'number' | 'tel';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
}

interface FloatingSelectProps extends FloatingInputBaseProps {
  variant: 'select';
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
}

type FloatingInputProps = FloatingTextInputProps | FloatingSelectProps;

// ============================================
// Chevron Icon Component
// ============================================

const ChevronDown = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L5 5L9 1" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ============================================
// FloatingInput Component
// ============================================

export const FloatingInput: React.FC<FloatingInputProps> = (props) => {
  const { label, error, className = '', containerClassName = '', variant, required } = props;
  const id = useId();
  const [isFocused, setIsFocused] = useState(false);
  
  const hasValue = props.value !== '' && props.value !== undefined;
  const shouldFloat = isFocused || hasValue;

  // Text Input Variant
  if (variant !== 'select') {
    const { value, onChange, placeholder, disabled, name } = props as FloatingTextInputProps;
    
    return (
      <div className={`floating-container ${containerClassName}`}>
        <label 
          htmlFor={id}
          className={`floating-label ${shouldFloat ? 'floating-label--active' : ''}`}
        >
          {label}
          {required && <span className="floating-required">*</span>}
        </label>
        
        <input
          id={id}
          type={variant}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={shouldFloat ? placeholder : ''}
          disabled={disabled}
          required={required}
          className={`floating-input ${className} ${error ? 'floating-input--error' : ''}`}
        />
        
        {error && <span className="floating-error">{error}</span>}
      </div>
    );
  }

  // Select Variant
  const { value, onChange, options, placeholder, disabled, name } = props as FloatingSelectProps;
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const selectedOption = options.find(opt => opt.value === value);
  const displayValue = selectedOption?.label || '';
  const selectShouldFloat = isFocused || isOpen || hasValue;

  return (
    <div ref={containerRef} className={`floating-container ${containerClassName}`}>
      <label 
        htmlFor={id}
        className={`floating-label ${selectShouldFloat ? 'floating-label--active' : ''}`}
      >
        {label}
        {required && <span className="floating-required">*</span>}
      </label>
      
      <button
        id={id}
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
        className={`floating-input floating-select ${className} ${error ? 'floating-input--error' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {displayValue || (selectShouldFloat ? placeholder : '')}
      </button>
      
      <div className={`floating-arrow ${isOpen ? 'floating-arrow--open' : ''}`}>
        <ChevronDown />
      </div>
      
      {isOpen && (
        <div className="floating-dropdown-menu" role="listbox">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => { onChange(option.value); setIsOpen(false); }}
              className={`floating-dropdown-option ${option.value === value ? 'floating-dropdown-option--selected' : ''}`}
              role="option"
              aria-selected={option.value === value}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
      
      {/* Hidden native select for form submission */}
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      
      {error && <span className="floating-error">{error}</span>}
    </div>
  );
};

export default FloatingInput;

