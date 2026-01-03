import type { StudentApplication } from '../types';
import type { CaptureLeadResult, LeadCaptureProvider, LeadPayload } from './types';
import { captureLeadStub } from './stub';

function readProvider(): LeadCaptureProvider {
  const raw =
    (import.meta as any)?.env?.VITE_LEAD_CAPTURE_PROVIDER ??
    (typeof process !== 'undefined' ? process.env.VITE_LEAD_CAPTURE_PROVIDER : undefined) ??
    'stub';

  return raw === 'supabase' ? 'supabase' : 'stub';
}

function readLeadSource(): string | null {
  const raw =
    (import.meta as any)?.env?.VITE_LEAD_SOURCE ??
    (typeof process !== 'undefined' ? process.env.VITE_LEAD_SOURCE : undefined) ??
    'wizard';
  return raw || null;
}

function readContext(): LeadPayload['context'] {
  const createdAtIso = new Date().toISOString();

  try {
    if (typeof window !== 'undefined') {
      return {
        createdAtIso,
        url: window.location?.href ?? null,
        referrer: document?.referrer ?? null,
        userAgent: navigator?.userAgent ?? null,
      };
    }
  } catch {
    // ignore
  }

  return { createdAtIso, url: null, referrer: null, userAgent: null };
}

export function buildHybridLeadPayload(application: StudentApplication): LeadPayload {
  return {
    contact: {
      firstName: application.contact.firstName,
      lastName: application.contact.lastName,
      phone: application.contact.phone,
      email: application.contact.email,
      emailConsent: application.contact.emailConsent,
      termsConsent: application.contact.termsConsent,
    },
    choices: {
      country: application.country,
      studyLevel: application.studyLevel,
      degreeType: application.degreeType,
      intake: application.intake,
      intakeYear: application.intakeYear,
      studyDuration: application.studyDuration,
      industry: application.industry,
      studyArea: application.studyArea,
      studyFormat: application.studyFormat,
    },
    context: readContext(),
  };
}

export async function captureLead(application: StudentApplication): Promise<CaptureLeadResult> {
  const provider = readProvider();
  const payload = buildHybridLeadPayload(application);
  const source = readLeadSource();

  if (provider === 'supabase') {
    // Dynamic import avoids pulling in supabase code paths when stub is used (default).
    const { captureLeadSupabase } = await import('./supabase');
    return captureLeadSupabase({ payload });
  }

  return captureLeadStub({ payload, source });
}


