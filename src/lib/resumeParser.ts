
import { ResumeData } from '@/types/resume';

// This is a mock implementation for demo purposes
// In a real application, this would connect to an AI service or API
export const extractResumeData = (file: File): ResumeData => {
  // In a real app, we would send the file to an AI service
  // For demo purposes, we're returning mock data
  
  // Generate some randomized but plausible data
  const mockNames = [
    "Alex Johnson",
    "Jamie Smith",
    "Taylor Williams",
    "Morgan Chen",
    "Jordan Garcia"
  ];
  
  const mockSkills = [
    "JavaScript", "Python", "React", "TypeScript", 
    "Node.js", "SQL", "Data Analysis", "Project Management",
    "AWS", "DevOps", "UI/UX", "Agile Methodology"
  ];
  
  const mockCompanies = [
    "TechCorp Solutions", 
    "Innovative Systems Inc", 
    "DataTech Global",
    "NextGen Software",
    "Cloud Solutions Group"
  ];
  
  const mockUniversities = [
    "State University",
    "Tech Institute",
    "University of Technology",
    "International University",
    "National College"
  ];
  
  // Randomly select data to create a varied resume
  const randomName = mockNames[Math.floor(Math.random() * mockNames.length)];
  const randomSkillsCount = 4 + Math.floor(Math.random() * 6); // 4-9 skills
  const randomSkills = shuffleArray([...mockSkills]).slice(0, randomSkillsCount);
  
  // Create random experience entries
  const experienceCount = 1 + Math.floor(Math.random() * 3); // 1-3 experiences
  const experiences = Array.from({ length: experienceCount }).map((_, i) => {
    const company = mockCompanies[Math.floor(Math.random() * mockCompanies.length)];
    const positions = ["Software Engineer", "Data Scientist", "Product Manager", "UX Designer"];
    const position = positions[Math.floor(Math.random() * positions.length)];
    const currentYear = new Date().getFullYear();
    const endYear = currentYear - i;
    const startYear = endYear - (1 + Math.floor(Math.random() * 3));
    
    return {
      company,
      position,
      startDate: `${startYear}`,
      endDate: i === 0 ? "Present" : `${endYear}`,
      description: [
        `Led development of key ${position.toLowerCase()} initiatives`,
        `Collaborated with cross-functional teams to deliver projects`,
        `Improved system performance by optimizing code and processes`
      ]
    };
  });
  
  // Create random education entries
  const educationCount = 1 + Math.floor(Math.random() * 2); // 1-2 educations
  const educations = Array.from({ length: educationCount }).map(() => {
    const institution = mockUniversities[Math.floor(Math.random() * mockUniversities.length)];
    const degrees = ["Bachelor of Science", "Master of Science", "Bachelor of Arts"];
    const fields = ["Computer Science", "Information Technology", "Data Science"];
    const degree = degrees[Math.floor(Math.random() * degrees.length)];
    const field = fields[Math.floor(Math.random() * fields.length)];
    const endYear = 2010 + Math.floor(Math.random() * 13); // 2010-2022
    const startYear = endYear - 4;
    
    return {
      institution,
      degree,
      field,
      startDate: `${startYear}`,
      endDate: `${endYear}`,
      gpa: (3 + Math.random()).toFixed(1)
    };
  });
  
  // Construct and return the mock resume data
  return {
    personalInfo: {
      name: randomName,
      email: generateEmail(randomName),
      phone: generatePhone(),
      location: "San Francisco, CA",
      summary: `Experienced professional with expertise in ${randomSkills.slice(0, 3).join(", ")}, and a passion for solving complex problems.`
    },
    skills: randomSkills,
    experience: experiences,
    education: educations,
    matchPercentage: 65 + Math.floor(Math.random() * 30) // 65-95%
  };
};

// Helper functions for generating mock data
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function generateEmail(name: string): string {
  const domains = ["gmail.com", "outlook.com", "yahoo.com", "company.com"];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const formattedName = name.toLowerCase().replace(/\s+/g, ".");
  return `${formattedName}@${domain}`;
}

function generatePhone(): string {
  const area = Math.floor(Math.random() * 900) + 100;
  const mid = Math.floor(Math.random() * 900) + 100;
  const end = Math.floor(Math.random() * 9000) + 1000;
  return `(${area}) ${mid}-${end}`;
}
