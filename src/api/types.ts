// API Types and Form Data Interfaces for AdmitsConnect

// ============================================
// Form Step Data Types
// ============================================

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

// Adaptive Test Score Structures
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

// English Language Test Score Structures
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

// ============================================
// Complete Application Payload
// ============================================

export interface StudentApplication {
  // Step 1: Home - Tag Preferences
  selectedTags: string[];
  
  // Step 2: Country Selection
  country: string;
  
  // Step 3: Study Level & Degree Type
  studyLevel: string;
  degreeType: string;
  
  // Step 4: Intake & Duration
  intake: string;
  intakeYear: string;
  studyDuration: string;
  
  // Step 5: Industry Selection
  industry: string;
  
  // Step 6: Study Area
  studyArea: string;
  
  // Step 7: Study Format & Preferences
  studyFormat: string;
  attendanceType: string;
  budget: string;
  workExperience: string;
  
  // Step 8: Academic Information
  academics: AcademicsData;
  
  // Step 9: Optional Assessment Information
  assessment?: AssessmentData;

  // Step 10: Contact Information
  contact: ContactData;
}

// ============================================
// Form Store State
// ============================================

export interface FormState extends Partial<StudentApplication> {
  currentStep: number;
  isSubmitting: boolean;
  isSubmitted: boolean;
  error: string | null;
}

// ============================================
// API Response Types
// ============================================

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

// ============================================
// API Response Wrappers
// ============================================

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

// ============================================
// API Endpoints Contract
// ============================================

/**
 * API Endpoints:
 * 
 * GET  /api/countries       - Fetch available destination countries
 * GET  /api/study-levels    - Fetch study level options
 * GET  /api/degree-types    - Fetch degree type options
 * GET  /api/industries      - Fetch industry options
 * GET  /api/study-areas     - Fetch study areas (can filter by industry)
 * GET  /api/study-formats   - Fetch study format options
 * GET  /api/intakes         - Fetch intake options
 * GET  /api/study-durations - Fetch study duration options
 * POST /api/applications    - Submit complete application
 */

export interface ApplicationSubmitResponse {
  success: boolean;
  applicationId: string;
  message: string;
}

// ============================================
// Route Configuration
// ============================================

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

// Step order for navigation
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

