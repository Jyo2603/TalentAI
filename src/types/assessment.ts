export interface Question {
  id: string;
  type: 'multiple-choice' | 'coding' | 'short-answer' | 'file-upload';
  title: string;
  description: string;
  content: string;
  options?: string[]; // for multiple choice
  correctAnswer?: string | string[]; // for auto-grading
  points: number;
  timeLimit?: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard';
  skills: string[];
  category: 'technical' | 'behavioral' | 'problem-solving' | 'domain-specific';
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  type: 'template' | 'custom' | 'ai-generated';
  role: string;
  department: string;
  skills: string[];
  questions: Question[];
  timeLimit: number; // total time in minutes
  passingScore: number; // percentage
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: number; // in minutes
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  usageCount: number;
  averageScore?: number;
  completionRate?: number;
}

export interface AssessmentTemplate {
  id: string;
  name: string;
  description: string;
  role: string;
  department: string;
  skills: string[];
  questionCount: number;
  estimatedDuration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isPopular: boolean;
  usageCount: number;
  averageScore: number;
  questions: Question[];
}

export interface QuestionBank {
  id: string;
  category: 'technical' | 'behavioral' | 'problem-solving' | 'domain-specific';
  skill: string;
  questions: Question[];
}

export interface AIAssessmentRequest {
  jobTitle: string;
  department: string;
  requiredSkills: string[];
  experienceLevel: 'junior' | 'mid' | 'senior';
  questionCount: number;
  timeLimit: number;
  focusAreas: string[];
}

export interface AssessmentResult {
  id: string;
  assessmentId: string;
  candidateId: string;
  candidateName: string;
  jobId: string;
  startedAt: Date;
  completedAt?: Date;
  totalScore: number;
  maxScore: number;
  percentage: number;
  timeSpent: number; // in minutes
  status: 'not-started' | 'in-progress' | 'completed' | 'expired';
  questionResults: QuestionResult[];
  passed: boolean;
  feedback?: string;
}

export interface QuestionResult {
  questionId: string;
  answer: string | string[];
  isCorrect?: boolean;
  score: number;
  maxScore: number;
  timeSpent: number; // in seconds
  feedback?: string;
}