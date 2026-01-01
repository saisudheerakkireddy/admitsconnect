// Mock API Services for AdmitsConnect
// This file simulates API calls and can be swapped for real backend integration

import type {
  ApiResponse,
  Country,
  StudyLevel,
  DegreeType,
  Industry,
  StudyArea,
  StudyFormat,
  IntakeOption,
  StudyDuration,
  StudentApplication,
  ApplicationSubmitResponse,
} from './types';

// ============================================
// Simulated Network Delay
// ============================================

const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// ============================================
// Mock Data
// ============================================

const mockCountries: Country[] = [
  { name: "Australia", flagUrl: "/AdmitsConnect_Vishal_Icons/Country Flags/Australia.svg", code: "AU" },
  { name: "Canada", flagUrl: "/AdmitsConnect_Vishal_Icons/Country Flags/Canada.svg", code: "CA" },
  { name: "UK", flagUrl: "/AdmitsConnect_Vishal_Icons/Country Flags/UK.svg", code: "GB" },
  { name: "USA", flagUrl: "/AdmitsConnect_Vishal_Icons/Country Flags/USA.svg", code: "US" },
  { name: "Ireland", flagUrl: "/AdmitsConnect_Vishal_Icons/Country Flags/Ireland.svg", code: "IE" },
  { name: "Germany", flagUrl: "/AdmitsConnect_Vishal_Icons/Country Flags/Germany.svg", code: "DE" },
  { name: "Switzerland", flagUrl: "/AdmitsConnect_Vishal_Icons/Country Flags/Switzerland.svg", code: "CH" },
  { name: "Sweden", flagUrl: "/AdmitsConnect_Vishal_Icons/Country Flags/Sweden.svg", code: "SE" },
  { name: "Netherlands", flagUrl: "/AdmitsConnect_Vishal_Icons/Country Flags/Netherlands.svg", code: "NL" },
  { name: "New Zealand", flagUrl: "/AdmitsConnect_Vishal_Icons/Country Flags/Australia.svg", code: "NZ" },
  { name: "Cyprus", flagUrl: "/AdmitsConnect_Vishal_Icons/Country Flags/Cyprus.svg", code: "CY" },
  { name: "Denmark", flagUrl: "/AdmitsConnect_Vishal_Icons/Country Flags/Denmark.svg", code: "DK" },
  { name: "France", flagUrl: "/AdmitsConnect_Vishal_Icons/Country Flags/France.svg", code: "FR" },
  { name: "Italy", flagUrl: "/AdmitsConnect_Vishal_Icons/Country Flags/Italy.svg", code: "IT" },
  { name: "Finland", flagUrl: "/AdmitsConnect_Vishal_Icons/Country Flags/Finland.svg", code: "FI" },
  { name: "Latvia", flagUrl: "/AdmitsConnect_Vishal_Icons/Country Flags/Latvia.svg", code: "LV" },
  { name: "Malta", flagUrl: "/AdmitsConnect_Vishal_Icons/Country Flags/Malta.svg", code: "MT" },
  { name: "Norway", flagUrl: "/AdmitsConnect_Vishal_Icons/Country Flags/Norway.svg", code: "NO" },
  { name: "Poland", flagUrl: "/AdmitsConnect_Vishal_Icons/Country Flags/Poland.svg", code: "PL" },
  { name: "Singapore", flagUrl: "/AdmitsConnect_Vishal_Icons/Country Flags/Singapore.svg", code: "SG" },
  { name: "Spain", flagUrl: "/AdmitsConnect_Vishal_Icons/Country Flags/Spain.svg", code: "ES" },
];

const mockStudyLevels: StudyLevel[] = [
  { id: "summer", label: "Summer Programs" },
  { id: "diploma", label: "Diploma" },
  { id: "undergrad", label: "Under Graduation" },
  { id: "ug-integrated", label: "UG - Integrated" },
  { id: "pre-masters", label: "Pre Masters" },
  { id: "postgrad", label: "Post Graduation" },
  { id: "phd", label: "PhD (Doctor of Philosophy)" },
  { id: "dba", label: "DBA (Doctorate of Business Administration)", multiline: true },
];

const mockDegreeTypes: DegreeType[] = [
  { id: "bsc", label: "BSC - Bachelor of Science" },
  { id: "ba", label: "BA - Bachelor of Arts" },
  { id: "llb", label: "LLB - Bachelor of Laws" },
  { id: "be", label: "BE - Bachelor of Engineering" },
  { id: "bba", label: "BBA - Bachelor of Business Administration" },
  { id: "associate", label: "Associate Degree" },
  { id: "academy-profession", label: "Academy Profession" },
  { id: "advanced-diploma", label: "Advanced Diploma" },
  { id: "joint-programs", label: "Joint Programs" },
];

const mockIndustries: Industry[] = [
  { id: "business", name: "Business & Management", iconUrl: "/AdmitsConnect_Vishal_Icons/Industry selection/Industry selection icon.svg" },
  { id: "engineering", name: "Engineering & Technology" },
  { id: "health", name: "Health & Medicine" },
  { id: "arts", name: "Arts & Humanities" },
  { id: "science", name: "Natural Sciences" },
  { id: "social", name: "Social Sciences" },
  { id: "law", name: "Law & Legal Studies" },
  { id: "education", name: "Education & Teaching" },
  { id: "computer", name: "Computer Science & IT" },
  { id: "agriculture", name: "Agriculture & Environment" },
];

const mockStudyAreas: StudyArea[] = [
  { id: "accounting", name: "Accounting & Finance", industryId: "business" },
  { id: "marketing", name: "Marketing", industryId: "business" },
  { id: "hr", name: "Human Resources", industryId: "business" },
  { id: "operations", name: "Operations Management", industryId: "business" },
  { id: "mechanical", name: "Mechanical Engineering", industryId: "engineering" },
  { id: "electrical", name: "Electrical Engineering", industryId: "engineering" },
  { id: "civil", name: "Civil Engineering", industryId: "engineering" },
  { id: "software", name: "Software Engineering", industryId: "computer" },
  { id: "data-science", name: "Data Science", industryId: "computer" },
  { id: "cybersecurity", name: "Cybersecurity", industryId: "computer" },
  { id: "medicine", name: "Medicine", industryId: "health" },
  { id: "nursing", name: "Nursing", industryId: "health" },
  { id: "pharmacy", name: "Pharmacy", industryId: "health" },
];

const mockStudyFormats: StudyFormat[] = [
  { id: "full-time", label: "Full Time", description: "Traditional on-campus study" },
  { id: "part-time", label: "Part Time", description: "Flexible schedule for working professionals" },
  { id: "online", label: "Online", description: "100% remote learning" },
  { id: "hybrid", label: "Hybrid", description: "Mix of online and on-campus" },
  { id: "distance", label: "Distance Learning", description: "Self-paced remote study" },
];

const mockIntakes: IntakeOption[] = [
  { id: "spring", label: "Spring" },
  { id: "summer", label: "Summer" },
  { id: "fall", label: "Fall" },
  { id: "winter", label: "Winter" },
];

const mockStudyDurations: StudyDuration[] = [
  { id: "ug-3", label: "Undergraduation 3 Years" },
  { id: "ug-4", label: "Undergraduation 4 Years" },
  { id: "ug-4plus", label: "Undergraduation 4+ Years" },
  { id: "diploma", label: "Diploma" },
  { id: "pg-1", label: "Post Graduation 1 Year" },
  { id: "pg-2", label: "Post Graduation 2 Years" },
];

const mockTags: string[] = [
  "Faster Offer",
  "Course with Internships",
  "High Offer Acceptance-Rate",
  "Affordable University",
  "Guaranteed Scholarship",
  "Trending Courses",
  "High Ranking Universities",
  "Outstanding Facilities",
  "English Test Waiver",
  "Low Tuition Deposit",
  "Backlog Acceptance",
  "MOI Acceptable",
  "Professional Accreditations",
  "Culture and Social Experience",
  "Affordable Living",
  "Career Upskilling",
  "Quick Education Loans",
  "Accommodation",
  "Part Time Jobs",
  "Pre-Departure",
  "Destination - Arrival pickup",
  "On - Arrival registrations",
  "Internship (in-line to Subject area)",
  "Part-time jobs (in-line to academics / work experience)",
];

// ============================================
// API Service Functions
// ============================================

/**
 * Fetch available destination countries
 */
export async function getCountries(): Promise<ApiResponse<Country[]>> {
  await delay();
  return {
    success: true,
    data: mockCountries,
  };
}

/**
 * Fetch study level options
 */
export async function getStudyLevels(): Promise<ApiResponse<StudyLevel[]>> {
  await delay();
  return {
    success: true,
    data: mockStudyLevels,
  };
}

/**
 * Fetch degree type options
 */
export async function getDegreeTypes(): Promise<ApiResponse<DegreeType[]>> {
  await delay();
  return {
    success: true,
    data: mockDegreeTypes,
  };
}

/**
 * Fetch industry options
 */
export async function getIndustries(): Promise<ApiResponse<Industry[]>> {
  await delay();
  return {
    success: true,
    data: mockIndustries,
  };
}

/**
 * Fetch study area options, optionally filtered by industry
 */
export async function getStudyAreas(industryId?: string): Promise<ApiResponse<StudyArea[]>> {
  await delay();
  const filtered = industryId 
    ? mockStudyAreas.filter(area => area.industryId === industryId)
    : mockStudyAreas;
  return {
    success: true,
    data: filtered,
  };
}

/**
 * Fetch study format options
 */
export async function getStudyFormats(): Promise<ApiResponse<StudyFormat[]>> {
  await delay();
  return {
    success: true,
    data: mockStudyFormats,
  };
}

/**
 * Fetch intake options
 */
export async function getIntakes(): Promise<ApiResponse<IntakeOption[]>> {
  await delay();
  return {
    success: true,
    data: mockIntakes,
  };
}

/**
 * Fetch study duration options
 */
export async function getStudyDurations(): Promise<ApiResponse<StudyDuration[]>> {
  await delay();
  return {
    success: true,
    data: mockStudyDurations,
  };
}

/**
 * Fetch available tags/preferences
 */
export async function getTags(): Promise<ApiResponse<string[]>> {
  await delay();
  return {
    success: true,
    data: mockTags,
  };
}

/**
 * Submit the complete student application
 */
export async function submitApplication(
  application: StudentApplication
): Promise<ApiResponse<ApplicationSubmitResponse>> {
  await delay(1000); // Longer delay for submission
  
  // Simulate validation
  if (!application.contact.email || !application.contact.termsConsent) {
    return {
      success: false,
      data: {
        success: false,
        applicationId: '',
        message: 'Please complete all required fields and accept terms.',
      },
    };
  }
  
  // Generate a mock application ID
  const applicationId = `APP-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  
  // Log the application for debugging (in real app, this would go to backend)
  console.log('Application submitted:', {
    applicationId,
    application,
  });
  
  return {
    success: true,
    data: {
      success: true,
      applicationId,
      message: 'Your application has been submitted successfully! Our team will contact you soon.',
    },
  };
}

// ============================================
// API Configuration (for future real backend)
// ============================================

export const API_CONFIG = {
  // Replace with your actual backend URL when ready
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.admitsconnect.com',
  
  endpoints: {
    countries: '/api/countries',
    studyLevels: '/api/study-levels',
    degreeTypes: '/api/degree-types',
    industries: '/api/industries',
    studyAreas: '/api/study-areas',
    studyFormats: '/api/study-formats',
    intakes: '/api/intakes',
    studyDurations: '/api/study-durations',
    tags: '/api/tags',
    applications: '/api/applications',
  },
};

// ============================================
// Real API Implementation (commented for future use)
// ============================================

/*
// Uncomment and modify when ready to connect to real backend

import axios from 'axios';

const apiClient = axios.create({
  baseURL: API_CONFIG.baseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getCountriesReal(): Promise<ApiResponse<Country[]>> {
  const response = await apiClient.get(API_CONFIG.endpoints.countries);
  return response.data;
}

export async function submitApplicationReal(
  application: StudentApplication
): Promise<ApiResponse<ApplicationSubmitResponse>> {
  const response = await apiClient.post(API_CONFIG.endpoints.applications, application);
  return response.data;
}
*/

