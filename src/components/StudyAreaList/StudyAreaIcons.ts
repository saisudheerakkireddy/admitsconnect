/**
 * Study Area Icons - Barrel Export
 * Aggregates all industry icon mappings and provides a lookup function
 */

import { AgricultureForestryIcons } from './icons/AgricultureForestryIcons';
import { AppliedSciencesProfessionsIcons } from './icons/AppliedSciencesProfessionsIcons';
import { ArtsDesignArchitectureIcons } from './icons/ArtsDesignArchitectureIcons';
import { BusinessManagementIcons } from './icons/BusinessManagementIcons';
import { ComputerScienceItIcons } from './icons/ComputerScienceItIcons';
import { EducationTrainingIcons } from './icons/EducationTrainingIcons';
import { EngineeringTechnologyIcons } from './icons/EngineeringTechnologyIcons';
import { EnvironmentalSciencesIcons } from './icons/EnvironmentalSciencesIcons';
import { HospitalityLeisureSportsIcons } from './icons/HospitalityLeisureSportsIcons';
import { HumanitiesIcons } from './icons/HumanitiesIcons';
import { JournalismMediaIcons } from './icons/JournalismMediaIcons';
import { LawIcons } from './icons/LawIcons';
import { MedicineHealthIcons } from './icons/MedicineHealthIcons';
import { NaturalSciencesMathematicsIcons } from './icons/NaturalSciencesMathematicsIcons';
import { SocialSciencesIcons } from './icons/SocialSciencesIcons';

/**
 * Master mapping: industry ID -> study area icon mappings
 */
const INDUSTRY_ICON_MAPPINGS: Record<string, Record<string, string>> = {
    'agriculture-forestry': AgricultureForestryIcons,
    'applied-sciences-professions': AppliedSciencesProfessionsIcons,
    'arts-design-architecture': ArtsDesignArchitectureIcons,
    'business-management': BusinessManagementIcons,
    'computer-science-it': ComputerScienceItIcons,
    'education-training': EducationTrainingIcons,
    'engineering-technology': EngineeringTechnologyIcons,
    'environmental-sciences': EnvironmentalSciencesIcons,
    'hospitality-leisure-sports': HospitalityLeisureSportsIcons,
    'humanities': HumanitiesIcons,
    'journalism-media': JournalismMediaIcons,
    'law': LawIcons,
    'medicine-health': MedicineHealthIcons,
    'natural-sciences-mathematics': NaturalSciencesMathematicsIcons,
    'social-sciences': SocialSciencesIcons,
};

/**
 * Get icon URL for a specific study area within an industry
 * @param industryId - The industry ID
 * @param studyAreaId - The study area ID
 * @returns The imported icon URL or undefined if not found
 */
export function getStudyAreaIcon(industryId: string, studyAreaId: string): string | undefined {
    const industryIcons = INDUSTRY_ICON_MAPPINGS[industryId];
    if (!industryIcons) {
        console.warn(`No icon mapping found for industry: ${industryId}`);
        return undefined;
    }

    const iconUrl = industryIcons[studyAreaId];
    if (!iconUrl) {
        console.warn(`No icon found for study area: ${studyAreaId} in industry: ${industryId}`);
        return undefined;
    }

    return iconUrl;
}

/**
 * Get all icon mappings for a specific industry
 * @param industryId - The industry ID
 * @returns Record of study area IDs to icon URLs
 */
export function getIndustryIconMappings(industryId: string): Record<string, string> | undefined {
    return INDUSTRY_ICON_MAPPINGS[industryId];
}
