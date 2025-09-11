export interface ResumeUploadRequest {
  file: Express.Multer.File;
}

export interface ATSCheckRequest {
  resumeText: string;
  jobDescription: string;
  candidateName?: string;
}

export interface ExtractedText {
  content: string;
  metadata: {
    fileName: string;
    fileSize: number;
    fileType: string;
    extractionMethod: string;
    pageCount?: number;
    wordCount: number;
    extractedAt: Date;
  };
}

export interface ATSAnalysisResult {
  matchScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
  detailedAnalysis: {
    skillsMatch: number;
    experienceMatch: number;
    educationMatch: number;
    keywordDensity: number;
  };
  candidateProfile: {
    name: string;
    location?: string;
    experienceYears: number;
    skills: string[];
    education: string[];
  };
  recruiterInsights: {
    interviewReadiness: number;
    salaryRange: { min: number; max: number };
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
  };
}

export interface PDFTextItem {
  str: string;
  dir: string;
  width: number;
  height: number;
  transform: number[];
  fontName: string;
  hasEOL: boolean;
}

export interface ProcessedTextItem {
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: number;
  fontName: string;
}

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: Date;
}

export interface FileValidationError {
  field: string;
  message: string;
  code: string;
}

export interface UploadConfig {
  maxFileSize: number;
  allowedMimeTypes: string[];
  allowedExtensions: string[];
  uploadDir: string;
}
