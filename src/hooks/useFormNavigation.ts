// Form Navigation Hook for Multi-Step Form Flow
import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import { STEP_ORDER, ROUTES, type RoutePath } from '../api/types';
import { useFormStore } from '../store/formStore';

// ============================================
// Hook Interface
// ============================================

interface UseFormNavigationReturn {
  // Current state
  currentStep: number;
  totalSteps: number;
  currentPath: RoutePath;
  isFirstStep: boolean;
  isLastStep: boolean;
  progress: number; // 0-100 percentage
  
  // Navigation functions
  goToNext: () => void;
  goToPrevious: () => void;
  goToStep: (step: number) => void;
  goToPath: (path: RoutePath) => void;
  goHome: () => void;
  
  // Validation
  canProceed: boolean;
  canGoBack: boolean;
}

// ============================================
// Hook Implementation
// ============================================

export function useFormNavigation(): UseFormNavigationReturn {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Subscribe to all form state that affects validation
  const { 
    currentStep, 
    setCurrentStep, 
    canProceedFromStep, 
    canProceedToStep,
    // Subscribe to all values that affect canProceed validation
    country,
    studyLevel,
    degreeType,
    intake,
    intakeYear,
    studyDuration,
    industry,
    studyArea,
    studyFormat,
    attendanceType,
    budget,
    workExperience,
    academics,
    contact,
  } = useFormStore();
  
  // Determine current step from URL
  const currentStepFromPath = useMemo(() => {
    const index = STEP_ORDER.indexOf(location.pathname as RoutePath);
    return index >= 0 ? index : 0;
  }, [location.pathname]);
  
  // Sync store step with URL if they differ
  if (currentStepFromPath !== currentStep) {
    setCurrentStep(currentStepFromPath);
  }
  
  const totalSteps = STEP_ORDER.length;
  const isFirstStep = currentStepFromPath === 0;
  const isLastStep = currentStepFromPath === totalSteps - 1;
  const progress = Math.round((currentStepFromPath / (totalSteps - 1)) * 100);
  
  // Check if user can proceed from current step to next step
  // Include all state values as dependencies to trigger re-computation
  const canProceed = useMemo(() => {
    return canProceedFromStep(currentStepFromPath);
  }, [
    currentStepFromPath, 
    canProceedFromStep,
    country,
    studyLevel,
    degreeType,
    intake,
    intakeYear,
    studyDuration,
    industry,
    studyArea,
    studyFormat,
    attendanceType,
    budget,
    workExperience,
    academics,
    contact,
  ]);
  
  const canGoBack = !isFirstStep;
  
  // Navigate to next step
  const goToNext = useCallback(() => {
    if (currentStepFromPath < totalSteps - 1 && canProceed) {
      const nextPath = STEP_ORDER[currentStepFromPath + 1];
      setCurrentStep(currentStepFromPath + 1);
      navigate(nextPath);
    }
  }, [currentStepFromPath, totalSteps, canProceed, setCurrentStep, navigate]);
  
  // Navigate to previous step
  const goToPrevious = useCallback(() => {
    if (currentStepFromPath > 0) {
      const prevPath = STEP_ORDER[currentStepFromPath - 1];
      setCurrentStep(currentStepFromPath - 1);
      navigate(prevPath);
    }
  }, [currentStepFromPath, setCurrentStep, navigate]);
  
  // Navigate to specific step number
  const goToStep = useCallback((step: number) => {
    if (step >= 0 && step < totalSteps) {
      // Can always go back, but need validation to go forward
      if (step <= currentStepFromPath || canProceedToStep(step)) {
        const path = STEP_ORDER[step];
        setCurrentStep(step);
        navigate(path);
      }
    }
  }, [totalSteps, currentStepFromPath, canProceedToStep, setCurrentStep, navigate]);
  
  // Navigate to specific path
  const goToPath = useCallback((path: RoutePath) => {
    const stepIndex = STEP_ORDER.indexOf(path);
    if (stepIndex >= 0) {
      goToStep(stepIndex);
    }
  }, [goToStep]);
  
  // Go back to home/first step
  const goHome = useCallback(() => {
    setCurrentStep(0);
    navigate(ROUTES.HOME);
  }, [setCurrentStep, navigate]);
  
  return {
    currentStep: currentStepFromPath,
    totalSteps,
    currentPath: STEP_ORDER[currentStepFromPath],
    isFirstStep,
    isLastStep,
    progress,
    goToNext,
    goToPrevious,
    goToStep,
    goToPath,
    goHome,
    canProceed,
    canGoBack,
  };
}

// ============================================
// Step Labels (for progress indicators)
// ============================================

export const STEP_LABELS: Record<RoutePath, string> = {
  [ROUTES.HOME]: 'Preferences',
  [ROUTES.COUNTRY]: 'Country',
  [ROUTES.STUDY_LEVEL]: 'Study Level',
  [ROUTES.INTAKE]: 'Intake',
  [ROUTES.INDUSTRY]: 'Industry',
  [ROUTES.STUDY_AREA]: 'Study Area',
  [ROUTES.FORMAT]: 'Format',
  [ROUTES.ACADEMICS]: 'Academics',
  [ROUTES.ASSESSMENT]: 'Assessment',
  [ROUTES.CONTACT]: 'Contact',
  [ROUTES.THANK_YOU]: 'Complete',
};

// ============================================
// Progress Bar Component Helper
// ============================================

export function getStepInfo(stepIndex: number) {
  const path = STEP_ORDER[stepIndex];
  return {
    path,
    label: STEP_LABELS[path],
    index: stepIndex,
  };
}

export default useFormNavigation;

