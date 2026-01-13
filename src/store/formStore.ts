import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { STEP_ORDER } from '../api/types';
import type {
  FormState,
  StudentApplication,
  AcademicsData,
  ContactData,
  AssessmentData,
  AcademicRecord,
  AdvancedAcademicRecord,
} from '../api/types';
import { getRequiredAcademicLevels } from '../utils/constants';

const initialAcademicRecord: AcademicRecord = {
  year: '',
  grade: '',
  medium: '',
};

const initialAdvancedAcademicRecord: AdvancedAcademicRecord = {
  ...initialAcademicRecord,
  degreeType: '',
  startYear: '',
  endYear: '',
  backlogs: 0,
};

const initialAcademics: AcademicsData = {
  secondary: { ...initialAcademicRecord },
  higherSecondary: { ...initialAcademicRecord },
  undergrad: undefined,
  postgrad: undefined,
};

const initialContact: ContactData = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  emailConsent: false,
  termsConsent: false,
};

const initialAssessment: AssessmentData = {
  adaptiveTest: '',
  englishLanguageTest: '',
};

const initialState: FormState = {
  currentStep: 0,
  isSubmitting: false,
  isSubmitted: false,
  error: null,

  // Form data
  selectedTags: [],
  country: '',
  studyLevel: '',
  degreeType: '',
  intake: '',
  intakeYear: '',
  studyDuration: '',
  industry: '',
  studyArea: '',
  studyFormat: '',
  attendanceType: '',
  budget: '',
  workExperience: '',
  academics: initialAcademics,
  assessment: initialAssessment,
  contact: initialContact,
};

interface FormActions {
  // Navigation
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  setSelectedTags: (tags: string[]) => void;
  toggleTag: (tag: string) => void;

  setCountry: (country: string) => void;

  setStudyLevel: (level: string) => void;
  setDegreeType: (type: string) => void;

  setIntake: (intake: string) => void;
  setIntakeYear: (year: string) => void;
  setStudyDuration: (duration: string) => void;

  setIndustry: (industry: string) => void;
  setStudyArea: (area: string) => void;
  setStudyFormat: (format: string) => void;
  setAttendanceType: (type: string) => void;
  setBudget: (budget: string) => void;
  setWorkExperience: (experience: string) => void;

  setSecondaryAcademics: (data: Partial<AcademicRecord>) => void;
  setHigherSecondaryAcademics: (data: Partial<AcademicRecord>) => void;
  setUndergradAcademics: (data: Partial<AdvancedAcademicRecord> | undefined) => void;
  setPostgradAcademics: (data: Partial<AdvancedAcademicRecord> | undefined) => void;

  setContact: (data: Partial<ContactData>) => void;

  setAssessment: (data: Partial<AssessmentData>) => void;

  setSubmitting: (isSubmitting: boolean) => void;
  setSubmitted: (isSubmitted: boolean) => void;
  setError: (error: string | null) => void;

  getApplicationData: () => StudentApplication;
  resetForm: () => void;
  resetStore: () => void;
  canProceedFromStep: (sourceStep: number) => boolean;
  canProceedToStep: (targetStep: number) => boolean;
}

export const useFormStore = create<FormState & FormActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      setCurrentStep: (step) => set({ currentStep: step }),

      nextStep: () => set((state) => ({
        currentStep: Math.min(state.currentStep + 1, STEP_ORDER.length - 1)
      })),

      prevStep: () => set((state) => ({
        currentStep: Math.max(state.currentStep - 1, 0)
      })),

      setSelectedTags: (tags) => set({ selectedTags: tags }),

      toggleTag: (tag) => set((state) => {
        const tags = state.selectedTags || [];
        const exists = tags.includes(tag);
        return {
          selectedTags: exists
            ? tags.filter(t => t !== tag)
            : [...tags, tag]
        };
      }),

      setCountry: (country) => set({ country }),

      setStudyLevel: (studyLevel) => set({ studyLevel }),
      setDegreeType: (degreeType) => set({ degreeType }),

      setIntake: (intake) => set({ intake }),
      setIntakeYear: (intakeYear) => set({ intakeYear }),
      setStudyDuration: (studyDuration) => set({ studyDuration }),

      setIndustry: (industry) => set({ industry }),
      setStudyArea: (studyArea) => set({ studyArea }),
      setStudyFormat: (studyFormat) => set({ studyFormat }),
      setAttendanceType: (attendanceType) => set({ attendanceType }),
      setBudget: (budget) => set({ budget }),
      setWorkExperience: (workExperience) => set({ workExperience }),

      setSecondaryAcademics: (data) => set((state) => ({
        academics: {
          ...state.academics!,
          secondary: { ...state.academics!.secondary, ...data }
        }
      })),

      setHigherSecondaryAcademics: (data) => set((state) => ({
        academics: {
          ...state.academics!,
          higherSecondary: { ...state.academics!.higherSecondary, ...data }
        }
      })),

      setUndergradAcademics: (data) => set((state) => ({
        academics: {
          ...state.academics!,
          undergrad: data === undefined
            ? undefined
            : { ...initialAdvancedAcademicRecord, ...state.academics?.undergrad, ...data }
        }
      })),

      setPostgradAcademics: (data) => set((state) => ({
        academics: {
          ...state.academics!,
          postgrad: data === undefined
            ? undefined
            : { ...initialAdvancedAcademicRecord, ...state.academics?.postgrad, ...data }
        }
      })),

      setContact: (data) => set((state) => ({
        contact: { ...state.contact!, ...data }
      })),

      setAssessment: (data) => set((state) => ({
        assessment: { ...(state.assessment || initialAssessment), ...data }
      })),

      setSubmitting: (isSubmitting) => set({ isSubmitting }),
      setSubmitted: (isSubmitted) => set({ isSubmitted }),
      setError: (error) => set({ error }),

      getApplicationData: (): StudentApplication => {
        const state = get();
        return {
          selectedTags: state.selectedTags || [],
          country: state.country || '',
          studyLevel: state.studyLevel || '',
          degreeType: state.degreeType || '',
          intake: state.intake || '',
          intakeYear: state.intakeYear || '',
          studyDuration: state.studyDuration || '',
          industry: state.industry || '',
          studyArea: state.studyArea || '',
          studyFormat: state.studyFormat || '',
          attendanceType: state.attendanceType || '',
          budget: state.budget || '',
          workExperience: state.workExperience || '',
          academics: state.academics || initialAcademics,
          assessment: state.assessment || initialAssessment,
          contact: state.contact || initialContact,
        };
      },

      resetForm: () => set({ ...initialState }),

      resetStore: () => {
        localStorage.removeItem('admits-connect-form');
        set({ ...initialState });
      },

      canProceedFromStep: (sourceStep: number): boolean => {
        const state = get();

        switch (sourceStep) {
          case 0:
            return true;
          case 1:
            return !!state.country;
          case 2:
            const requiresDegreeType =
              state.studyLevel === 'Under Graduation' ||
              state.studyLevel === 'Post Graduation';

            if (requiresDegreeType) {
              return !!state.studyLevel && !!state.degreeType;
            } else {
              return !!state.studyLevel;
            }
          case 3:
            return !!state.intake && !!state.intakeYear && !!state.studyDuration;
          case 4:
            return !!state.industry;
          case 5:
            return !!state.studyArea;
          case 6:
            return !!(
              state.studyFormat &&
              state.attendanceType &&
              state.budget &&
              state.workExperience
            );
          case 7:
            const isSecondaryComplete = !!(
              state.academics?.secondary?.year &&
              state.academics?.secondary?.grade &&
              state.academics?.secondary?.medium
            );
            const isHigherSecondaryComplete = !!(
              state.academics?.higherSecondary?.year &&
              state.academics?.higherSecondary?.grade &&
              state.academics?.higherSecondary?.medium
            );

            if (!isSecondaryComplete || !isHigherSecondaryComplete) return false;

            const studyLevel = state.studyLevel || '';
            const requiredLevels = getRequiredAcademicLevels(studyLevel);

            if (requiredLevels.undergrad) {
              const isUgComplete = !!(
                state.academics?.undergrad?.degreeType &&
                state.academics?.undergrad?.startYear &&
                state.academics?.undergrad?.endYear &&
                state.academics?.undergrad?.grade &&
                state.academics?.undergrad?.medium
              );
              if (!isUgComplete) return false;
            }

            if (requiredLevels.postgrad) {
              const isPgComplete = !!(
                state.academics?.postgrad?.degreeType &&
                state.academics?.postgrad?.startYear &&
                state.academics?.postgrad?.endYear &&
                state.academics?.postgrad?.grade &&
                state.academics?.postgrad?.medium
              );
              if (!isPgComplete) return false;
            }

            return true;
          case 8:
            return true;
          case 9:
            return !!(
              state.contact?.firstName &&
              state.contact?.lastName &&
              state.contact?.phone &&
              state.contact?.email &&
              state.contact?.termsConsent
            );
          default:
            return true;
        }
      },

      canProceedToStep: (targetStep: number): boolean => {
        const state = get();
        if (targetStep <= state.currentStep) return true;
        for (let step = state.currentStep; step < targetStep; step++) {
          if (!get().canProceedFromStep(step)) return false;
        }
        return true;
      },
    }),
    {
      name: 'admits-connect-form',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        selectedTags: state.selectedTags,
        country: state.country,
        studyLevel: state.studyLevel,
        degreeType: state.degreeType,
        intake: state.intake,
        intakeYear: state.intakeYear,
        studyDuration: state.studyDuration,
        industry: state.industry,
        studyArea: state.studyArea,
        studyFormat: state.studyFormat,
        attendanceType: state.attendanceType,
        budget: state.budget,
        workExperience: state.workExperience,
        academics: state.academics,
        assessment: state.assessment,
        contact: state.contact,
        currentStep: state.currentStep,
      }),
    }
  )
);

export const useCurrentStep = () => useFormStore((state) => state.currentStep);
export const useSelectedTags = () => useFormStore((state) => state.selectedTags);
export const useCountry = () => useFormStore((state) => state.country);
export const useStudyPreferences = () => useFormStore((state) => ({
  studyLevel: state.studyLevel,
  degreeType: state.degreeType,
  intake: state.intake,
  intakeYear: state.intakeYear,
  studyDuration: state.studyDuration,
}));
export const useAcademics = () => useFormStore((state) => state.academics);
export const useContact = () => useFormStore((state) => state.contact);
export const useSubmissionState = () => useFormStore((state) => ({
  isSubmitting: state.isSubmitting,
  isSubmitted: state.isSubmitted,
  error: state.error,
}));

