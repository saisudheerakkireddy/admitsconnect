import { describe, expect, it, vi } from 'vitest';
import { captureLeadStub, LEADS_STORAGE_KEY } from '../stub';
import type { LeadPayload } from '../types';

function makePayload(): LeadPayload {
  return {
    contact: {
      firstName: 'Ada',
      lastName: 'Lovelace',
      phone: '1234567890',
      email: 'ada@example.com',
      emailConsent: true,
      termsConsent: true,
    },
    choices: {
      country: 'Canada',
      studyLevel: 'undergrad',
      degreeType: 'bsc',
      intake: 'fall',
      intakeYear: '2026',
      studyDuration: 'ug-4',
      industry: 'computer',
      studyArea: 'data-science',
      studyFormat: 'full-time',
    },
    context: {
      createdAtIso: new Date('2026-01-01T00:00:00.000Z').toISOString(),
      url: 'https://example.test/contact',
      referrer: 'https://example.test/',
      userAgent: 'vitest',
    },
  };
}

describe('captureLeadStub', () => {
  it('persists a lead to localStorage and returns an id', async () => {
    vi.stubGlobal('crypto', { randomUUID: () => '00000000-0000-0000-0000-000000000000' });

    const result = await captureLeadStub({ payload: makePayload(), source: 'wizard' });
    expect(result.ok).toBe(true);
    if (!result.ok) throw new Error('Expected ok');

    expect(result.id).toBe('00000000-0000-0000-0000-000000000000');
    const stored = JSON.parse(window.localStorage.getItem(LEADS_STORAGE_KEY) || '[]');
    expect(Array.isArray(stored)).toBe(true);
    expect(stored.length).toBe(1);
    expect(stored[0].id).toBe(result.id);
    expect(stored[0].payload.contact.email).toBe('ada@example.com');
    expect(stored[0].source).toBe('wizard');
  });

  it('returns a user-safe error when storage write fails', async () => {
    const setItem = vi.spyOn(window.localStorage.__proto__, 'setItem');
    setItem.mockImplementation(() => {
      throw new Error('quota exceeded');
    });

    const result = await captureLeadStub({ payload: makePayload(), source: 'wizard' });
    expect(result.ok).toBe(false);
    if (result.ok) throw new Error('Expected error');
    expect(result.errorMessage).toMatch(/Could not save your request/i);
  });
});


