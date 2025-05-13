
export interface ResumeData {
  personalInfo: PersonalInfo;
  skills: string[];
  education: Education[];
  experience: Experience[];
  score?: number;
  matchPercentage?: number;
}

export interface PersonalInfo {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  website?: string;
  summary?: string;
}

export interface Education {
  institution: string;
  degree?: string;
  field?: string;
  startDate?: string;
  endDate?: string;
  gpa?: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate?: string;
  endDate?: string;
  description?: string[];
  achievements?: string[];
}
