export type LeadCaptureProvider = 'stub' | 'supabase';

export type LeadChoices = {
  country: string;
  studyLevel: string;
  degreeType: string;
  intake: string;
  intakeYear: string;
  studyDuration: string;
  industry: string;
  studyArea: string;
  studyFormat: string;
};

export type LeadContext = {
  createdAtIso: string;
  url: string | null;
  referrer: string | null;
  userAgent: string | null;
};

export type LeadPayload = {
  contact: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    emailConsent: boolean;
    termsConsent: boolean;
  };
  choices: LeadChoices;
  context: LeadContext;
};

export type CaptureLeadOk = {
  ok: true;
  id: string;
};

export type CaptureLeadErr = {
  ok: false;
  errorMessage: string;
  errorCode?:
    | 'CONFIG_MISSING'
    | 'STORAGE_UNAVAILABLE'
    | 'PROVIDER_ERROR'
    | 'UNKNOWN';
};

export type CaptureLeadResult = CaptureLeadOk | CaptureLeadErr;


