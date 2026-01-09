export const STUDY_LEVELS = {
    POST_GRADUATION: 'Post Graduation',
    UNDER_GRADUATION: 'Under Graduation',
    SUMMER_PROGRAMS: 'Summer Programs',
    DIPLOMA: 'Diploma',
    PRE_MASTERS: 'Pre Masters',
    DBA: 'DBA (Doctorate of Business Administration)',
    PHD: 'PhD (Doctor of Philosophy)',
    UG_INTEGRATED: 'UG - Integrated',
} as const;

export type StudyLevel = typeof STUDY_LEVELS[keyof typeof STUDY_LEVELS];

export const ACADEMIC_LEVELS = {
    SECONDARY: 'secondary',
    HIGHER_SECONDARY: 'higherSecondary',
    UNDERGRAD: 'undergrad',
    POSTGRAD: 'postgrad',
} as const;

/**
 * Determines which academic levels are required based on the selected study level.
 * 
 * Logic:
 * - UG Applicants (Under Graduation, Diploma, etc.): 10th & 12th
 * - PG Applicants (Post Graduation, Pre Masters): 10th, 12th, & UG
 * - Doctorate Applicants (PhD, DBA): 10th, 12th, UG, & PG
 */
export const getRequiredAcademicLevels = (studyLevel: string) => {
    const levels = {
        [ACADEMIC_LEVELS.SECONDARY]: true, // Always required
        [ACADEMIC_LEVELS.HIGHER_SECONDARY]: true, // Always required
        [ACADEMIC_LEVELS.UNDERGRAD]: false,
        [ACADEMIC_LEVELS.POSTGRAD]: false,
    };

    if (!studyLevel) return levels;

    // PG Applicants need UG
    const pgStudyLevels: string[] = [
        STUDY_LEVELS.POST_GRADUATION,
        STUDY_LEVELS.PRE_MASTERS,
        STUDY_LEVELS.DBA,
        STUDY_LEVELS.PHD,
    ];

    if (pgStudyLevels.includes(studyLevel)) {
        levels[ACADEMIC_LEVELS.UNDERGRAD] = true;
    }

    // Doctorate Applicants need PG
    const doctorateStudyLevels: string[] = [
        STUDY_LEVELS.DBA,
        STUDY_LEVELS.PHD,
    ];

    if (doctorateStudyLevels.includes(studyLevel)) {
        levels[ACADEMIC_LEVELS.POSTGRAD] = true;
    }

    return levels;
};
