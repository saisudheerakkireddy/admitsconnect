// Study Area Data Configuration
// Maps industries to their study areas with icon paths
import industryMapping from './industryMapping.json';

export interface StudyArea {
  id: string;
  name: string;
  iconPath: string;
}

export interface Industry {
  id: string;
  name: string;
  folderName: string;
  studyAreas: StudyArea[];
}

// Re-export the generated mapping
export const industries: Industry[] = industryMapping.industries;
export const industryFolderMap: Record<string, string> = industryMapping.industryFolderMap;

/**
 * Get all industries sorted alphabetically
 * @returns Array of all industries
 */
export function getAllIndustries(): Industry[] {
  return industries;
}

/**
 * Get study areas for a given industry ID
 * @param industryId - The industry ID from the form store
 * @returns Array of study areas with full icon paths (sorted alphabetically)
 */
export function getStudyAreasForIndustry(industryId: string): StudyArea[] {
  const industry = industries.find(ind => ind.id === industryId);
  if (!industry) return [];
  
  // Map to full icon paths relative to public directory
  return industry.studyAreas.map(area => ({
    ...area,
    iconPath: `/src/assets/Industry_Icons/${industry.folderName}/${area.iconPath}`,
  }));
}

/**
 * Get an industry by its ID
 * @param industryId - The industry ID
 * @returns Industry object or undefined
 */
export function getIndustryById(industryId: string): Industry | undefined {
  return industries.find(ind => ind.id === industryId);
}

/**
 * Get the folder name for a given industry ID
 */
export function getIndustryFolderName(industryId: string): string | undefined {
  const industry = industries.find(ind => ind.id === industryId);
  return industry?.folderName;
}

/**
 * Search industries by name
 * @param searchTerm - The search term
 * @returns Filtered industries matching the search term
 */
export function searchIndustries(searchTerm: string): Industry[] {
  if (!searchTerm) return industries;
  
  const term = searchTerm.toLowerCase();
  return industries.filter(industry => 
    industry.name.toLowerCase().includes(term)
  );
}

/**
 * Search study areas across all industries
 * @param searchTerm - The search term
 * @returns Array of { industry, studyArea } matches
 */
export function searchStudyAreas(searchTerm: string): Array<{ industry: Industry; studyArea: StudyArea }> {
  if (!searchTerm) return [];
  
  const term = searchTerm.toLowerCase();
  const results: Array<{ industry: Industry; studyArea: StudyArea }> = [];
  
  industries.forEach(industry => {
    industry.studyAreas.forEach(area => {
      if (area.name.toLowerCase().includes(term)) {
        results.push({ industry, studyArea: area });
      }
    });
  });
  
  return results;
}
