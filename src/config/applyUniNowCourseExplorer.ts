/**
 * ApplyUniNow Course Explorer Wizard Metadata
 *
 * This file intentionally contains:
 * - a `source` object that preserves the exact provided metadata snapshot
 * - a `normalized` config used by the app (consistent, 11-step flow with /assessment)
 */

import { applyUniNowCourseExplorerSource } from './applyUniNowCourseExplorer.source';

export type WizardRoutePath =
  | '/'
  | '/country'
  | '/study-level'
  | '/intake'
  | '/industry'
  | '/study-area'
  | '/format'
  | '/academics'
  | '/assessment'
  | '/contact'
  | '/thank-you';

export interface WizardConfig {
  name: string;
  url: string;
  totalSteps: number;
  progressIndicator: string;
  routes: Record<string, WizardRoutePath>;
  stepOrder: WizardRoutePath[];
  stepLabels: Record<WizardRoutePath, string>;
  navigationFlow: Record<string, string>;
  navigation: Record<string, unknown>;
  validationRulesByStepIndex: Record<
    string,
    { route: WizardRoutePath; required: string[]; note?: string }
  >;
}

export type WizardStep =
  | {
      index: number;
      stepId: string;
      route: WizardRoutePath;
      stepLabel: string;
      component: string;
      title: string;
      required?: boolean;
      autoAdvance?: boolean;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [k: string]: any;
    };

export interface ApiConfig {
  baseUrlDefault: string;
  envVar: string;
  endpoints: Record<string, string>;
  submitApplicationHardcoded: {
    rejectIf: string;
    rejectMessage: string;
    successMessage: string;
  };
}

export interface GlobalConfig {
  disclaimer: string;
  headerStats: { courses: string; destinations: string };
}

export interface IconMappings {
  industries: Record<
    string,
    {
      iconUrl: string;
      iconClass: string;
    }
  >;
  flags: Record<string, string>;
  stats: Record<string, string>;
}

export interface ApplyUniNowCourseExplorerConfig {
  wizard: WizardConfig;
  steps: WizardStep[];
  apiConfig: ApiConfig;
  globalConfig: GlobalConfig;
  iconMappings: IconMappings;
}

export { applyUniNowCourseExplorerSource };

/**
 * Normalized config (used by the app): consistent 11-step flow.
 */
export const applyUniNowCourseExplorer: ApplyUniNowCourseExplorerConfig = {
  // Spread source then normalize wizard fields we need to be consistent in-app
  ...(applyUniNowCourseExplorerSource as unknown as ApplyUniNowCourseExplorerConfig),
  wizard: {
    ...(applyUniNowCourseExplorerSource.wizard as unknown as WizardConfig),
    routes: {
      ...(applyUniNowCourseExplorerSource.wizard.routes as unknown as Record<string, WizardRoutePath>),
      ASSESSMENT: '/assessment',
    },
    stepOrder: [
      '/',
      '/country',
      '/study-level',
      '/intake',
      '/industry',
      '/study-area',
      '/format',
      '/academics',
      '/assessment',
      '/contact',
      '/thank-you',
    ],
    stepLabels: {
      ...(applyUniNowCourseExplorerSource.wizard.stepLabels as unknown as Record<WizardRoutePath, string>),
      '/assessment': 'Assessment',
    },
    totalSteps: 11,
    validationRulesByStepIndex: {
      ...(applyUniNowCourseExplorerSource.wizard.validationRulesByStepIndex as unknown as WizardConfig['validationRulesByStepIndex']),
      '8': {
        route: '/assessment',
        required: [],
        note: 'Optional assessment screen',
      },
      '9': {
        route: '/contact',
        required: [
          'contact.firstName',
          'contact.lastName',
          'contact.phone',
          'contact.email',
          'contact.termsConsent',
        ],
        note: 'emailConsent is optional',
      },
      '10': {
        route: '/thank-you',
        required: [],
        note: 'Final confirmation screen',
      },
    },
  },
  steps: (applyUniNowCourseExplorerSource.steps as unknown as WizardStep[]),
  apiConfig: {
    baseUrlDefault: 'https://api.admitsconnect.com',
    envVar: 'import.meta.env.VITE_API_BASE_URL',
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
    submitApplicationHardcoded: {
      rejectIf: 'missing contact.email OR missing contact.termsConsent',
      rejectMessage: 'Please complete all required fields and accept terms.',
      successMessage:
        'Your application has been submitted successfully! Our team will contact you soon.',
    },
  },
  globalConfig: {
    disclaimer:
      "*This information is for reference only, we do not endorse any specific Universities or Courses. This information is provided solely for educational reference and we'd love to help you.",
    headerStats: {
      courses: '3,43,000+',
      destinations: '9',
    },
  },
  iconMappings: {
    industries: {
      'agriculture-forestry': {
        iconUrl: '/assets/icons/industry/agriculture.svg',
        iconClass: 'industry-agriculture',
      },
      'applied-sciences-professions': {
        iconUrl: '/assets/icons/industry/applied-sciences.svg',
        iconClass: 'industry-applied-sciences',
      },
      'arts-design-architecture': {
        iconUrl: '/assets/icons/industry/arts.svg',
        iconClass: 'industry-arts',
      },
      'business-management': {
        iconUrl: '/assets/icons/industry/business.svg',
        iconClass: 'industry-business',
      },
      'computer-science-it': {
        iconUrl: '/assets/icons/industry/computer.svg',
        iconClass: 'industry-computer',
      },
      'education-training': {
        iconUrl: '/assets/icons/industry/education.svg',
        iconClass: 'industry-education',
      },
      'engineering-technology': {
        iconUrl: '/assets/icons/industry/engineering.svg',
        iconClass: 'industry-engineering',
      },
      'environmental-studies-earth-sciences': {
        iconUrl: '/assets/icons/industry/environmental.svg',
        iconClass: 'industry-environmental',
      },
      'hospitality-leisure-sports': {
        iconUrl: '/assets/icons/industry/hospitality.svg',
        iconClass: 'industry-hospitality',
      },
      humanities: {
        iconUrl: '/assets/icons/industry/humanities.svg',
        iconClass: 'industry-humanities',
      },
      'journalism-media': {
        iconUrl: '/assets/icons/industry/journalism.svg',
        iconClass: 'industry-journalism',
      },
      law: {
        iconUrl: '/assets/icons/industry/law.svg',
        iconClass: 'industry-law',
      },
      'medicine-health': {
        iconUrl: '/assets/icons/industry/health.svg',
        iconClass: 'industry-health',
      },
      'natural-sciences-mathematics': {
        iconUrl: '/assets/icons/industry/natural-sciences.svg',
        iconClass: 'industry-natural-sciences',
      },
      'social-sciences': {
        iconUrl: '/assets/icons/industry/social.svg',
        iconClass: 'industry-social',
      },
    },
    flags: {
      australia: '/assets/icons/flags/Australia.svg',
      canada: '/assets/icons/flags/Canada.svg',
      uk: '/assets/icons/flags/UK.svg',
      usa: '/assets/icons/flags/USA.svg',
      ireland: '/assets/icons/flags/Ireland.svg',
      germany: '/assets/icons/flags/Germany.svg',
      switzerland: '/assets/icons/flags/Switzerland.svg',
      sweden: '/assets/icons/flags/Sweden.svg',
      netherlands: '/assets/icons/flags/Netherlands.svg',
      'new-zealand': '/assets/icons/flags/NewZealand.svg',
      cyprus: '/assets/icons/flags/Cyprus.svg',
      denmark: '/assets/icons/flags/Denmark.svg',
      france: '/assets/icons/flags/France.svg',
      italy: '/assets/icons/flags/Italy.svg',
      finland: '/assets/icons/flags/Finland.svg',
      latvia: '/assets/icons/flags/Latvia.svg',
      malta: '/assets/icons/flags/Malta.svg',
      norway: '/assets/icons/flags/Norway.svg',
      poland: '/assets/icons/flags/Poland.svg',
      singapore: '/assets/icons/flags/Singapore.svg',
      spain: '/assets/icons/flags/Spain.svg',
    },
    stats: {
      'students-helped': '/assets/icons/stats/Students Helped icon.svg',
      'study-options': '/assets/icons/stats/Study Options Icon.svg',
      'global-universities': '/assets/icons/stats/Global Universities icon.svg',
      'transparent-process': '/assets/icons/stats/Transparent Process icon.svg',
      'global-events': '/assets/icons/stats/Global Events icon.svg',
      'virtual-sessions': '/assets/icons/stats/Virtual sessions icon.svg',
      'student-satisfaction': '/assets/icons/stats/Student satisfaction icon.svg',
      'study-destinations': '/assets/icons/stats/Study destination Icon.svg',
      'years-experience': '/assets/icons/stats/Years Experience icon.svg',
    },
  },
};

export function assertWizardConfig(config: ApplyUniNowCourseExplorerConfig): void {
  // Minimal invariants for safety (dev-time)
  const stepOrder = config.wizard.stepOrder;

  if (config.wizard.totalSteps !== stepOrder.length) {
    throw new Error(
      `[wizard] totalSteps (${config.wizard.totalSteps}) must equal stepOrder.length (${stepOrder.length})`
    );
  }

  const uniqueRoutes = new Set(stepOrder);
  if (uniqueRoutes.size !== stepOrder.length) {
    throw new Error('[wizard] stepOrder contains duplicate routes');
  }

  for (const route of stepOrder) {
    if (!config.wizard.stepLabels[route]) {
      throw new Error(`[wizard] stepLabels missing label for route: ${route}`);
    }
  }
}


