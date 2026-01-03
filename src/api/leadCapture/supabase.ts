import type { CaptureLeadResult, LeadPayload } from './types';

function getMissingEnvMessage(): CaptureLeadResult {
  return {
    ok: false,
    errorCode: 'CONFIG_MISSING',
    errorMessage: 'Submission is not configured. Please try again later.',
  };
}

type Env = {
  supabaseUrl: string;
  supabaseAnonKey: string;
  leadsTable: string;
  source: string | null;
};

function readEnv(): Env | null {
  const supabaseUrl =
    (import.meta as any)?.env?.VITE_SUPABASE_URL ??
    (typeof process !== 'undefined' ? process.env.VITE_SUPABASE_URL : undefined);
  const supabaseAnonKey =
    (import.meta as any)?.env?.VITE_SUPABASE_ANON_KEY ??
    (typeof process !== 'undefined' ? process.env.VITE_SUPABASE_ANON_KEY : undefined);
  const leadsTable =
    (import.meta as any)?.env?.VITE_SUPABASE_LEADS_TABLE ??
    (typeof process !== 'undefined' ? process.env.VITE_SUPABASE_LEADS_TABLE : undefined) ??
    'leads';
  const source =
    (import.meta as any)?.env?.VITE_LEAD_SOURCE ??
    (typeof process !== 'undefined' ? process.env.VITE_LEAD_SOURCE : undefined) ??
    'wizard';

  if (!supabaseUrl || !supabaseAnonKey) return null;
  return { supabaseUrl, supabaseAnonKey, leadsTable, source };
}

export async function captureLeadSupabase(params: { payload: LeadPayload }): Promise<CaptureLeadResult> {
  const env = readEnv();
  if (!env) return getMissingEnvMessage();

  try {
    // Lazy import so tests and stub flows never touch this module at runtime.
    const { createClient } = await import('@supabase/supabase-js');
    const client = createClient(env.supabaseUrl, env.supabaseAnonKey);

    const { data, error } = await client
      .from(env.leadsTable)
      .insert({ payload: params.payload, source: env.source })
      .select('id')
      .single();

    if (error || !data?.id) {
      if (import.meta.env.DEV) console.warn('Supabase lead insert failed', error);
      return {
        ok: false,
        errorCode: 'PROVIDER_ERROR',
        errorMessage: 'Submission failed. Please try again.',
      };
    }

    return { ok: true, id: String(data.id) };
  } catch (e) {
    if (import.meta.env.DEV) console.warn('Supabase lead capture exception', e);
    return {
      ok: false,
      errorCode: 'PROVIDER_ERROR',
      errorMessage: 'Submission failed. Please try again.',
    };
  }
}


