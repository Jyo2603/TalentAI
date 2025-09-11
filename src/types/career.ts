export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  postedDate: Date;
  applicationDeadline?: Date;
  isRemote: boolean;
  experienceLevel: 'entry' | 'mid' | 'senior' | 'executive';
  skills: string[];
  applicationCount: number;
  isActive: boolean;
  seoSlug: string;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
  mission: string;
  values: string[];
  founded: number;
  size: string;
  industry: string;
  headquarters: string;
  website: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    instagram?: string;
  };
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  avatar: string;
  linkedIn?: string;
  twitter?: string;
}

export interface CompanyBenefit {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'health' | 'financial' | 'time-off' | 'growth' | 'perks';
}

export interface OfficeLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  isPrimary: boolean;
  description: string;
  image: string;
  amenities: string[];
}

export interface JobApplication {
  id: string;
  jobId: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone?: string;
  resumeUrl?: string;
  coverLetter?: string;
  linkedInProfile?: string;
  portfolioUrl?: string;
  expectedSalary?: number;
  availableStartDate?: Date;
  howDidYouHear: string;
  additionalInfo?: string;
  submittedAt: Date;
  status: 'submitted' | 'reviewing' | 'shortlisted' | 'rejected';
  source: 'career-site' | 'linkedin' | 'referral' | 'job-board';
}

export interface CandidatePortalData {
  applicationId: string;
  jobTitle: string;
  submittedAt: Date;
  status: JobApplication['status'];
  statusHistory: {
    status: JobApplication['status'];
    date: Date;
    note?: string;
  }[];
  nextSteps?: string;
  interviewDate?: Date;
  feedback?: string;
}