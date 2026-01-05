#!/usr/bin/env node
/**
 * Excel Data Extraction Script
 * Extracts Industry and Study Area mappings from Excel file
 * Maps them with their corresponding icon files
 * Outputs sorted JSON configuration
 */

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Paths
const EXCEL_PATH = path.join(__dirname, '../src/assets/Industry_Icons/Industry & Area list (1).xlsx');
const OUTPUT_PATH = path.join(__dirname, '../src/config/industryMapping.json');
const ICONS_BASE = path.join(__dirname, '../src/assets/Industry_Icons');

// Industry folder name mapping (from folder structure)
const INDUSTRY_FOLDERS = {
  'Agriculture and forestry': 'agriculture-forestry',
  'Applied Sciences and Professions': 'applied-sciences-professions',
  'Art Design and Architecture': 'arts-design-architecture',
  'Business and management': 'business-management',
  'Computer Sciences': 'computer-science-it',
  'Education and Training': 'education-training',
  'Engineering and Technology': 'engineering-technology',
  'Environmental Sciences': 'environmental-sciences',
  'Hospitality and Leisure': 'hospitality-leisure-sports',
  'Humanities': 'humanities',
  'Journalism': 'journalism-media',
  'Law': 'law',
  'Medicine and Health': 'medicine-health',
  'Natural Sciences and Mathematics': 'natural-sciences-mathematics',
  'Social Sciences': 'social-sciences',
};

// Read and parse Excel file
function readExcelFile() {
  console.log('Reading Excel file:', EXCEL_PATH);
  const workbook = XLSX.readFile(EXCEL_PATH);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  return data;
}

// Get all icon files in a folder
function getIconFiles(folderName) {
  const folderPath = path.join(ICONS_BASE, folderName);
  if (!fs.existsSync(folderPath)) {
    console.warn(`Folder not found: ${folderPath}`);
    return [];
  }
  return fs.readdirSync(folderPath).filter(file => file.endsWith('.svg'));
}

// Create slug from name
function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[&]/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Parse Excel data and create mapping
function parseExcelData(data) {
  const industries = {};
  
  // Skip header row(s) and parse data
  // Assuming structure: Industry Name | Study Area Name
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (!row || row.length < 2) continue;
    
    const industryName = row[0]?.toString().trim();
    const studyAreaName = row[1]?.toString().trim();
    
    if (!industryName || !studyAreaName) continue;
    
    // Find matching folder
    let folderName = null;
    let industryId = null;
    
    for (const [folder, id] of Object.entries(INDUSTRY_FOLDERS)) {
      if (industryName.includes(folder) || folder.includes(industryName)) {
        folderName = folder;
        industryId = id;
        break;
      }
    }
    
    // If no exact match, try fuzzy matching
    if (!folderName) {
      const normalizedIndustry = industryName.toLowerCase();
      for (const [folder, id] of Object.entries(INDUSTRY_FOLDERS)) {
        const normalizedFolder = folder.toLowerCase();
        if (normalizedIndustry.includes(normalizedFolder) || normalizedFolder.includes(normalizedIndustry)) {
          folderName = folder;
          industryId = id;
          break;
        }
      }
    }
    
    if (!industryId) {
      console.warn(`No folder mapping found for industry: ${industryName}`);
      continue;
    }
    
    // Initialize industry if not exists
    if (!industries[industryId]) {
      industries[industryId] = {
        id: industryId,
        name: industryName,
        folderName: folderName,
        studyAreas: []
      };
    }
    
    // Add study area
    const studyAreaSlug = createSlug(studyAreaName);
    industries[industryId].studyAreas.push({
      id: studyAreaSlug,
      name: studyAreaName
    });
  }
  
  return industries;
}

// Match study areas with icon files
function matchIconFiles(industries) {
  for (const industryId in industries) {
    const industry = industries[industryId];
    const iconFiles = getIconFiles(industry.folderName);
    
    console.log(`\nProcessing ${industry.name}: ${iconFiles.length} icons found`);
    
    // Match each study area with an icon file
    industry.studyAreas.forEach((area, index) => {
      // Try to find matching icon by name
      let iconFile = iconFiles.find(file => {
        const fileName = file.toLowerCase();
        const areaName = area.name.toLowerCase();
        return fileName.includes(areaName) || areaName.includes(fileName.replace('.svg', ''));
      });
      
      // If no match, use numbered icon
      if (!iconFile) {
        // Try Property 1=N.svg pattern
        iconFile = iconFiles.find(file => file.includes(`=${index + 1}.svg`));
      }
      
      // If still no match, use index-based
      if (!iconFile && iconFiles[index]) {
        iconFile = iconFiles[index];
      }
      
      area.iconPath = iconFile || `Property 1=${index + 1}.svg`;
    });
  }
  
  return industries;
}

// Sort industries and study areas alphabetically
function sortData(industries) {
  // Convert to array and sort industries
  const industriesArray = Object.values(industries).sort((a, b) => 
    a.name.localeCompare(b.name)
  );
  
  // Sort study areas within each industry
  industriesArray.forEach(industry => {
    industry.studyAreas.sort((a, b) => a.name.localeCompare(b.name));
  });
  
  return industriesArray;
}

// Main execution
function main() {
  try {
    console.log('=== Starting Excel Data Extraction ===\n');
    
    // Read Excel data
    const excelData = readExcelFile();
    console.log(`Parsed ${excelData.length} rows from Excel\n`);
    
    // Parse and create mapping
    let industries = parseExcelData(excelData);
    console.log(`\nFound ${Object.keys(industries).length} industries`);
    
    // Match with icon files
    industries = matchIconFiles(industries);
    
    // Sort alphabetically
    const sortedIndustries = sortData(industries);
    
    // Create output structure
    const output = {
      generated: new Date().toISOString(),
      industries: sortedIndustries,
      industryFolderMap: INDUSTRY_FOLDERS
    };
    
    // Write output file
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
    console.log(`\n✓ Output written to: ${OUTPUT_PATH}`);
    
    // Print summary
    console.log('\n=== Summary ===');
    sortedIndustries.forEach(industry => {
      console.log(`${industry.name}: ${industry.studyAreas.length} study areas`);
    });
    
    console.log('\n=== Extraction Complete ===');
    
  } catch (error) {
    console.error('Error during extraction:', error);
    process.exit(1);
  }
}

// Run the script
main();

