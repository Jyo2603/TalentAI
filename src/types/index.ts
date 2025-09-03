export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'recruiter' | 'manager';
  avatar?: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  skills: string[];
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  status: 'draft' | 'active' | 'paused' | 'closed';
  createdAt: Date;
  applicantCount: number;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  jobId: string;
  applicationDate: Date;
  status: 'applied' | 'shortlisted' | 'interview' | 'hired' | 'rejected';
  testScore?: number;
  atsScore?: number;
  skills: string[];
  experience: number;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  skills: string[];
  certifications: string[];
  availability: 'available' | 'assigned' | 'unavailable';
  currentWorkload: 'light' | 'medium' | 'heavy';
  pastProjects: string[];
  joinDate: Date;
  experience: number;
  avatar?: string;
  currentProject?: string;
  availableDate?: Date;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  requiredSkills: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
  deadline: Date;
  status: 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled';
  assignedEmployees: string[];
  createdBy: string;
  createdAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  type: 'hiring' | 'staffing' | 'review';
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  assignedTo: string;
  dueDate: Date;
  relatedId?: string;
  createdAt: Date;
}

export interface DashboardMetrics {
  openJobs: number;
  externalApplicants: number;
  benchEmployees: number;
  tasksToday: number;
  avgAtsScore: number;
  timeToHire: number;
}

export type NavItem = 
  | 'dashboard' 
  | 'inbox' 
  | 'calendar' 
  | 'open-hiring' 
  | 'candidates' 
  | 'assessments' 
  | 'referrals' 
  | 'career-site'
  | 'offer-management'
  | 'talent-pool' 
  | 'projects' 
  | 'assignments'
  | 'onboarding'
  | 'account-settings'
  | 'admin-settings';