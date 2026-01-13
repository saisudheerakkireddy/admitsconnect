#!/usr/bin/env node
/**
 * Script to generate icon mapping files for all industries
 * Reads from industryMapping.json and creates TypeScript files with static imports
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the industry mapping JSON
const mappingPath = path.join(__dirname, '../config/industryMapping.json');
const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf-8'));

// Output directory for icon files
const outputDir = path.join(__dirname, '../components/StudyAreaList/icons');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Helper: Convert kebab-case to PascalCase
function toPascalCase(str) {
    return str
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
}

// Helper: Sanitize variable name
function toVariableName(str) {
    return str
        .replace(/[^a-zA-Z0-9-]/g, '')
        .split('-')
        .map((word, index) =>
            index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join('');
}

// Generate icon mapping file for each industry
mapping.industries.forEach(industry => {
    const fileName = `${toPascalCase(industry.id)}Icons.ts`;
    const filePath = path.join(outputDir, fileName);

    // Generate imports
    const imports = industry.studyAreas.map(area => {
        const varName = toPascalCase(area.id);
        const assetPath = `../../../assets/Industry_Icons/${industry.folderName}/${area.iconPath}`;
        return `import ${varName} from '${assetPath}';`;
    }).join('\n');

    // Generate mapping object
    const mappingEntries = industry.studyAreas.map(area => {
        const varName = toPascalCase(area.id);
        return `  '${area.id}': ${varName},`;
    }).join('\n');

    const exportName = `${toPascalCase(industry.id)}Icons`;

    // Generate file content
    const fileContent = `/**
 * ${industry.name} - Study Area Icon Mappings
 * Static imports for Vite bundling
 */

${imports}

export const ${exportName}: Record<string, string> = {
${mappingEntries}
};
`;

    // Write file
    fs.writeFileSync(filePath, fileContent, 'utf-8');
    console.log(`✓ Created ${fileName}`);
});

console.log(`\n✅ Generated ${mapping.industries.length} icon mapping files`);
