#!/usr/bin/env node
/**
 * Industry and Study Area Data Extraction
 * Creates mappings based on folder structure and available icons
 */

const fs = require('fs');
const path = require('path');

// Paths
const ICONS_BASE = path.join(__dirname, '../src/assets/Industry_Icons');
const OUTPUT_PATH = path.join(__dirname, '../src/config/industryMapping.json');

// Industry folder mapping with proper names
const INDUSTRY_CONFIG = [
  {
    folderName: 'Agriculture and forestry',
    id: 'agriculture-forestry',
    name: 'Agriculture & Forestry',
    studyAreas: [
      'Agriculture',
      'Animal Science',
      'Food Technology',
      'Forestry',
      'Horticulture & Crop Science',
      'Marine Science'
    ]
  },
  {
    folderName: 'Applied Sciences and Professions',
    id: 'applied-sciences-professions',
    name: 'Applied Sciences & Professions',
    studyAreas: [
      'Applied Physics',
      'Applied Chemistry',
      'Applied Mathematics',
      'Biotechnology',
      'Nanotechnology',
      'Sports Science',
      'Library Science',
      'Military Science',
      'Aviation',
      'Forensic Science',
      'Security Studies'
    ]
  },
  {
    folderName: 'Art Design and Architecture',
    id: 'arts-design-architecture',
    name: 'Art, Design & Architecture',
    studyAreas: [
      'Architecture',
      'Interior Design',
      'Fashion Design',
      'Graphic Design',
      'Industrial Design',
      'Product Design',
      'Animation',
      'Fine Arts',
      'Visual Arts',
      'Digital Arts',
      'Photography',
      'Illustration',
      'Web Design',
      'Game Design',
      'Textile Design',
      'Jewelry Design',
      'Landscape Architecture',
      'Urban Design',
      'Set Design',
      'Exhibition Design',
      'UX/UI Design',
      'Motion Graphics'
    ]
  },
  {
    folderName: 'Business and management',
    id: 'business-management',
    name: 'Business & Management',
    studyAreas: [
      'Accounting',
      'Finance',
      'Marketing',
      'Management',
      'Human Resources',
      'Economics',
      'Entrepreneurship',
      'Operations Management',
      'Supply Chain Management',
      'International Business',
      'Business Analytics',
      'Strategic Management',
      'Project Management',
      'Real Estate',
      'Retail Management',
      'Banking & Insurance',
      'Investment Management',
      'Risk Management',
      'Logistics',
      'E-Commerce',
      'Business Administration',
      'Corporate Finance',
      'Taxation',
      'Auditing',
      'Management Consulting',
      'Sales Management',
      'Brand Management',
      'Digital Marketing',
      'Social Media Marketing',
      'Event Management',
      'Quality Management',
      'Innovation Management',
      'Change Management',
      'Leadership',
      'Organizational Behavior',
      'Business Intelligence',
      'Financial Planning',
      'Mergers & Acquisitions',
      'Business Development',
      'International Trade',
      'Business Law',
      'Corporate Governance',
      'Business Ethics',
      'Family Business Management'
    ]
  },
  {
    folderName: 'Computer Sciences',
    id: 'computer-science-it',
    name: 'Computer Science & IT',
    studyAreas: [
      'Artificial Intelligence',
      'Data Science',
      'Software Engineering',
      'Cybersecurity',
      'Cloud Computing',
      'Web Development',
      'Mobile Development',
      'Machine Learning',
      'Computer Networks',
      'Database Systems',
      'DevOps',
      'Blockchain',
      'Internet of Things',
      'Game Development',
      'Computer Graphics',
      'Robotics',
      'Quantum Computing'
    ]
  },
  {
    folderName: 'Education and Training',
    id: 'education-training',
    name: 'Education & Training',
    studyAreas: [
      'Early Childhood Education',
      'Primary Education',
      'Secondary Education',
      'Special Education',
      'Educational Leadership',
      'Educational Psychology',
      'Curriculum Development',
      'Instructional Design',
      'Adult Education',
      'Higher Education',
      'Online Education',
      'Educational Technology',
      'Teacher Training',
      'Literacy Education',
      'Mathematics Education',
      'Science Education',
      'Language Education',
      'Physical Education',
      'Vocational Training'
    ]
  },
  {
    folderName: 'Engineering and Technology',
    id: 'engineering-technology',
    name: 'Engineering & Technology',
    studyAreas: [
      'Mechanical Engineering',
      'Electrical Engineering',
      'Civil Engineering',
      'Chemical Engineering',
      'Aerospace Engineering',
      'Biomedical Engineering',
      'Environmental Engineering',
      'Industrial Engineering',
      'Materials Science',
      'Automotive Engineering',
      'Petroleum Engineering',
      'Mining Engineering',
      'Nuclear Engineering',
      'Marine Engineering',
      'Agricultural Engineering',
      'Systems Engineering',
      'Manufacturing Engineering',
      'Mechatronics',
      'Structural Engineering',
      'Transportation Engineering',
      'Telecommunications',
      'Electronics',
      'Instrumentation',
      'Renewable Energy'
    ]
  },
  {
    folderName: 'Environmental Sciences',
    id: 'environmental-sciences',
    name: 'Environmental Sciences',
    studyAreas: [
      'Environmental Science',
      'Environmental Management',
      'Climate Change',
      'Sustainability',
      'Ecology',
      'Conservation Biology',
      'Environmental Policy',
      'Natural Resource Management',
      'Waste Management',
      'Water Resources',
      'Environmental Health',
      'Renewable Energy',
      'Green Technology'
    ]
  },
  {
    folderName: 'Hospitality and Leisure',
    id: 'hospitality-leisure-sports',
    name: 'Hospitality, Leisure & Sports',
    studyAreas: [
      'Hotel Management',
      'Tourism',
      'Event Management',
      'Sports Management',
      'Culinary Arts',
      'Recreation & Leisure'
    ]
  },
  {
    folderName: 'Humanities',
    id: 'humanities',
    name: 'Humanities',
    studyAreas: [
      'Literature',
      'Languages',
      'Linguistics',
      'History',
      'Philosophy',
      'Religious Studies',
      'Classical Studies',
      'Cultural Studies',
      'Area Studies',
      'Archaeology',
      'Anthropology',
      'Classics',
      'Comparative Literature',
      'Creative Writing',
      'Translation Studies',
      'English Studies'
    ]
  },
  {
    folderName: 'Journalism',
    id: 'journalism-media',
    name: 'Journalism & Media',
    studyAreas: [
      'Journalism',
      'Broadcasting',
      'Digital Media',
      'Public Relations',
      'Advertising',
      'Film Production'
    ]
  },
  {
    folderName: 'Law',
    id: 'law',
    name: 'Law',
    studyAreas: [
      'Corporate Law',
      'Criminal Law',
      'International Law',
      'Constitutional Law',
      'Environmental Law',
      'Intellectual Property Law',
      'Human Rights Law',
      'Tax Law',
      'Family Law',
      'Labor Law'
    ]
  },
  {
    folderName: 'Medicine and Health',
    id: 'medicine-health',
    name: 'Medicine & Health',
    studyAreas: [
      'Medicine',
      'Nursing',
      'Pharmacy',
      'Dentistry',
      'Physiotherapy',
      'Public Health',
      'Nutrition & Dietetics',
      'Health Psychology',
      'Occupational Therapy',
      'Veterinary Science',
      'Medical Laboratory Science',
      'Radiology',
      'Pathology',
      'Surgery',
      'Pediatrics',
      'Cardiology',
      'Neurology',
      'Psychiatry',
      'Oncology',
      'Orthopedics',
      'Emergency Medicine',
      'Sports Medicine',
      'Alternative Medicine',
      'Healthcare Management',
      'Clinical Research',
      'Medical Biotechnology'
    ]
  },
  {
    folderName: 'Natural Sciences and Mathematics',
    id: 'natural-sciences-mathematics',
    name: 'Natural Sciences & Mathematics',
    studyAreas: [
      'Mathematics',
      'Physics',
      'Chemistry',
      'Biology',
      'Astronomy',
      'Geology',
      'Statistics',
      'Biochemistry',
      'Genetics',
      'Environmental Science',
      'Biophysics',
      'Microbiology',
      'Molecular Biology',
      'Zoology',
      'Botany',
      'Geophysics',
      'Meteorology',
      'Oceanography',
      'Applied Mathematics',
      'Pure Mathematics',
      'Theoretical Physics',
      'Experimental Physics',
      'Organic Chemistry',
      'Inorganic Chemistry'
    ]
  },
  {
    folderName: 'Social Sciences',
    id: 'social-sciences',
    name: 'Social Sciences',
    studyAreas: [
      'Psychology',
      'Sociology',
      'Anthropology',
      'Political Science',
      'International Relations',
      'Social Work',
      'Criminology',
      'Geography',
      'History',
      'Philosophy',
      'Development Studies',
      'Gender Studies',
      'Urban Planning',
      'Public Policy',
      'Public Administration',
      'Economics',
      'Communication Studies',
      'Media Studies',
      'Cultural Studies',
      'Demography',
      'Social Psychology',
      'Cognitive Psychology',
      'Clinical Psychology',
      'Counseling Psychology',
      'Educational Psychology',
      'Environmental Psychology',
      'Organizational Psychology',
      'Archaeology',
      'Human Geography',
      'Economic Geography',
      'Geopolitics',
      'Comparative Politics',
      'Peace and Conflict Studies',
      'Diplomacy',
      'Security Studies',
      'Migration Studies',
      'Labor Studies',
      'Social Policy'
    ]
  }
];

// Get icon files from a folder
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
    .replace(/[/,]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Match study areas with icon files
function matchIcons(studyAreas, iconFiles) {
  return studyAreas.map((areaName, index) => {
    // Try to find matching icon by name
    let iconFile = iconFiles.find(file => {
      const fileName = file.toLowerCase().replace('.svg', '');
      const normalizedAreaName = areaName.toLowerCase();
      return fileName.includes(normalizedAreaName) || normalizedAreaName.includes(fileName);
    });
    
    // If no match, use numbered pattern
    if (!iconFile && iconFiles[index]) {
      iconFile = iconFiles[index];
    }
    
    // Default to numbered pattern
    if (!iconFile) {
      iconFile = `Property 1=${index + 1}.svg`;
    }
    
    return {
      id: createSlug(areaName),
      name: areaName,
      iconPath: iconFile
    };
  });
}

// Process all industries
function processIndustries() {
  console.log('=== Processing Industries ===\n');
  
  const industries = INDUSTRY_CONFIG.map(industry => {
    const iconFiles = getIconFiles(industry.folderName);
    console.log(`${industry.name}: ${industry.studyAreas.length} areas, ${iconFiles.length} icons`);
    
    const studyAreas = matchIcons(industry.studyAreas, iconFiles);
    
    return {
      id: industry.id,
      name: industry.name,
      folderName: industry.folderName,
      studyAreas: studyAreas.sort((a, b) => a.name.localeCompare(b.name))
    };
  });
  
  // Sort industries alphabetically
  return industries.sort((a, b) => a.name.localeCompare(b.name));
}

// Main execution
function main() {
  try {
    console.log('=== Industry Data Extraction ===\n');
    
    const industries = processIndustries();
    
    // Create output structure
    const output = {
      generated: new Date().toISOString(),
      industries: industries,
      industryFolderMap: Object.fromEntries(
        INDUSTRY_CONFIG.map(i => [i.folderName, i.id])
      )
    };
    
    // Write output file
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
    console.log(`\n✓ Output written to: ${OUTPUT_PATH}`);
    
    // Print summary
    console.log('\n=== Summary ===');
    console.log(`Total Industries: ${industries.length}`);
    industries.forEach(industry => {
      console.log(`  - ${industry.name}: ${industry.studyAreas.length} study areas`);
    });
    
    console.log('\n=== Extraction Complete ===');
    
  } catch (error) {
    console.error('Error during extraction:', error);
    process.exit(1);
  }
}

// Run the script
main();
