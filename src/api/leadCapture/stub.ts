import type { CaptureLeadResult, LeadPayload } from './types';

export const LEADS_STORAGE_KEY = 'admits-connect:leads';

type StoredLead = {
  id: string;
  createdAtIso: string;
  payload: LeadPayload;
  source: string | null;
};

function safeGetLocalStorage(): Storage | null {
  try {
    if (typeof window === 'undefined') return null;
    return window.localStorage ?? null;
  } catch {
    return null;
  }
}

function safeNowIso(): string {
  return new Date().toISOString();
}

function safeGenerateId(): string {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
  } catch {
    // ignore
  }
  return `stub_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function readStoredLeads(storage: Storage): StoredLead[] {
  const raw = storage.getItem(LEADS_STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StoredLead[]) : [];
  } catch {
    return [];
  }
}

function writeStoredLeads(storage: Storage, leads: StoredLead[]) {
  storage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
}

export async function captureLeadStub(params: {
  payload: LeadPayload;
  source: string | null;
}): Promise<CaptureLeadResult> {
  const storage = safeGetLocalStorage();
  if (!storage) {
    return {
      ok: false,
      errorCode: 'STORAGE_UNAVAILABLE',
      errorMessage: 'Could not save your request on this device. Please try again.',
    };
  }

  try {
    const id = safeGenerateId();
    const createdAtIso = safeNowIso();
    const leads = readStoredLeads(storage);
    const next: StoredLead[] = [{ id, createdAtIso, payload: params.payload, source: params.source }, ...leads].slice(
      0,
      200
    );
    writeStoredLeads(storage, next);
    return { ok: true, id };
  } catch (e) {
    if (import.meta.env.DEV) console.warn('Lead stub persistence failed', e);
    return {
      ok: false,
      errorCode: 'STORAGE_UNAVAILABLE',
      errorMessage: 'Could not save your request on this device. Please try again.',
    };
  }
}


