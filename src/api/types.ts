export interface AcademicRecord {
  year: string;
  grade: string;
  medium: string;
}

export interface AdvancedAcademicRecord extends AcademicRecord {
  degreeType: string;
  startYear: string;
  endYear: string;
  backlogs: number;
}

export interface AcademicsData {
  secondary: AcademicRecord;
  higherSecondary: AcademicRecord;
  undergrad?: AdvancedAcademicRecord;
  postgrad?: AdvancedAcademicRecord;
}

export interface ContactData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  emailConsent: boolean;
  termsConsent: boolean;
}

export interface GREScores {
  overall: string;
  verbalReasoning: string;
  quantitativeReasoning: string;
  analyticalWriting: string;
}

export interface GMATScores {
  overall: string;
  mathematics: string;
  verbal: string;
  integratedReasoning: string;
}

export interface IELTSTOEFLPTEScores {
  overall: string;
  reading: string;
  writing: string;
  speaking: string;
  listening: string;
}

export interface DETScores {
  overall: string;
  literacy: string;
  conversation: string;
  comprehension: string;
  production: string;
}

export interface AssessmentData {
  adaptiveTest: string;
  adaptiveTestScores?: GREScores | GMATScores;
  englishLanguageTest: string;
  englishTestScores?: IELTSTOEFLPTEScores | DETScores;
}

export interface StudentApplication {
  selectedTags: string[];
  country: string;
  studyLevel: string;
  degreeType: string;
  intake: string;
  intakeYear: string;
  studyDuration: string;
  industry: string;
  studyArea: string;
  studyFormat: string;
  attendanceType: string;
  budget: string;
  workExperience: string;
  academics: AcademicsData;
  assessment?: AssessmentData;
  contact: ContactData;
}

export interface FormState extends Partial<StudentApplication> {
  currentStep: number;
  isSubmitting: boolean;
  isSubmitted: boolean;
  error: string | null;
}

export interface Country {
  name: string;
  flagUrl: string;
  code: string;
}

export interface StudyLevel {
  id: string;
  label: string;
  multiline?: boolean;
}

export interface DegreeType {
  id: string;
  label: string;
}

export interface Industry {
  id: string;
  name: string;
  iconUrl?: string;
}

export interface StudyArea {
  id: string;
  name: string;
  industryId: string;
}

export interface StudyFormat {
  id: string;
  label: string;
  description?: string;
}

export interface IntakeOption {
  id: string;
  label: string;
}

export interface StudyDuration {
  id: string;
  label: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  error: string;
  code?: string;
}

export interface ApplicationSubmitResponse {
  success: boolean;
  applicationId: string;
  message: string;
}

export const ROUTES = {
  HOME: '/',
  COUNTRY: '/country',
  STUDY_LEVEL: '/study-level',
  INTAKE: '/intake',
  INDUSTRY: '/industry',
  STUDY_AREA: '/study-area',
  FORMAT: '/format',
  ACADEMICS: '/academics',
  ASSESSMENT: '/assessment',
  CONTACT: '/contact',
  THANK_YOU: '/thank-you',
} as const;

export type RoutePath = typeof ROUTES[keyof typeof ROUTES];

export const STEP_ORDER: RoutePath[] = [
  ROUTES.HOME,
  ROUTES.COUNTRY,
  ROUTES.STUDY_LEVEL,
  ROUTES.INTAKE,
  ROUTES.INDUSTRY,
  ROUTES.STUDY_AREA,
  ROUTES.FORMAT,
  ROUTES.ACADEMICS,
  ROUTES.ASSESSMENT,
  ROUTES.CONTACT,
  ROUTES.THANK_YOU,
];

