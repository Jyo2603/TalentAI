import React, { useState, useRef } from 'react';
import {
  FileText, Upload, CheckCircle, AlertTriangle, Target, Star, Code,
  Wrench, Brain, Cloud, Heart, Lightbulb, Users, BarChart3, Info,
  Calendar, MapPin, Building, Zap, Award, BookOpen, Sparkles
} from 'lucide-react';

// Enhanced type definitions to match the comprehensive openai.ts
interface ATSAnalysisResult {
  atsScore: number;
  candidateName: string;
  candidateLocation: string;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
  scores: {
    requirements: number;
    responsibilities: number;
    qualifications: number;
  };
  strengths: string[];
  improvements: string[];
  suggestedSkills: string[];
  suggestedCertifications: string[];
  recruiterInsights: {
    experienceLevel: string;
    candidateLocation: string;
    salaryEstimate: {
      min: number;
      max: number;
    };
    interviewReadiness: {
      score: number;
      strengths: string[];
      concerns: string[];
      recommendations: string[];
    };
    hiringRecommendation: string;
    riskAssessment: string;
    competitiveAnalysis: string;
    negotiationInsights: {
      salaryFlexibility: string;
      startDateFlexibility: string;
      remoteWorkPreference: string;
    };
    recruiterNotes: string[];
    interviewQuestions: string[];
    culturalFitIndicators: string[];
    redFlags: string[];
    nextSteps: string[];
  };
  skillsFound: string[];
  skillsMatching: string[];
  skillsMissing: string[];
  experienceYears: number;
  tools: string[];
  concepts: string[];
  services: string[];
  softSkills: string[];
  projects: Array<{
    name: string;
    description: string;
    relevance: string;
    valueToCompany: string;
    technologies: string[];
  }>;
  detailedAnalysis: {
    requirements: {
      score: number;
      details: string;
      highlights: string[];
      gaps: string[];
    };
    responsibilities: {
      score: number;
      details: string;
      highlights: string[];
      gaps: string[];
    };
    qualifications: {
      score: number;
      details: string;
      highlights: string[];
      gaps: string[];
    };
  };
}

interface EnhancedATSResult {
  matchScore: number;
  sectionScores: {
    experience: number;
    skills: number;
    education: number;
    certifications: number;
    areaOfExpertise: number;
    keywords: number;
  };
  expertiseAnalysis: {
    userExpertise: string;
    jobExpertise: string;
    matchLevel: string;
    matchPercentage: number;
  };
  improvementSuggestions: Array<{
    category: string;
    currentScore: number;
    suggestion: string;
    potentialImprovement: number;
  }>;
}

interface SkillGapResult {
  userSkills: string[];
  requiredSkills: string[];
  matchedSkills: string[];
  missingSkills: string[];
  skillGaps: Array<{
    skill: string;
    importance: string;
    recommendation: string;
  }>;
  learningPaths: Array<{
    skill: string;
    course: string;
    duration: string;
    provider: string;
  }>;
  overallMatch: number;
}

interface ResumeData {
  id: string;
  fileName: string;
  uploadedAt: Date;
  analysis?: ATSAnalysisResult;
  enhancedAnalysis?: EnhancedATSResult;
  content: string;
  file?: File;
  source: 'file' | 'text';
}

interface AnalysisProgress {
  stage: string;
  progress: number;
}

// Import functions from openai.ts (real-time OpenAI analysis only)
import {
  analyzeResumeWithJobDescription,
  extractTextFromFile
} from "../../services/openai";
const ATSResumeChecker: React.FC = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [currentResume, setCurrentResume] = useState<ResumeData | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [showATSInfo, setShowATSInfo] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'strengths' | 'improvements' | 'suggestions' | 'recruiter' | 'skills-breakdown'>('overview');
  const [analysisProgress, setAnalysisProgress] = useState<AnalysisProgress>({
    stage: '',
    progress: 0
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper Functions
  const validateJobDescription = (jd: string): boolean => {
    if (!jd.trim()) {
      setUploadError('Job description is required before uploading resumes.');
      return false;
    }
    if (jd.trim().length < 100) {
      setUploadError('Job description must be at least 100 characters long.');
      return false;
    }
    const hasRequirements = /require|experience|skill|qualif|must have|should have/i.test(jd);
    if (!hasRequirements) {
      setUploadError('Job description should contain requirements or skills.');
      return false;
    }
    return true;
  };

  const clearError = () => setUploadError('');

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-amber-600';
    return 'text-red-500';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 85) return 'bg-green-50 border-green-200';
    if (score >= 70) return 'bg-amber-50 border-amber-200';
    return 'bg-red-50 border-red-200';
  };

  // Enhanced File Upload Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!validateJobDescription(jobDescription)) {
      return;
    }

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];

    if (!allowedTypes.includes(file.type)) {
      setUploadError('Please upload a PDF, DOCX, or TXT file.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File size must be less than 10MB.');
      return;
    }

    setIsUploading(true);
    setUploadError('');
    setAnalysisProgress({ stage: 'Extracting text from file...', progress: 10 });

    try {
      const resumeContent = await extractTextFromFile(file);
      
      if (!resumeContent || resumeContent.trim().length < 100) {
        throw new Error('Unable to extract sufficient text from resume. Please ensure the file contains readable text.');
      }

      setAnalysisProgress({ stage: 'Saving resume data...', progress: 20 });

      const newResume: ResumeData = {
        id: Date.now().toString(),
        fileName: file.name,
        uploadedAt: new Date(),
        content: resumeContent,
        file: file,
        source: 'file'
      };

      setCurrentResume(newResume);
      
      setTimeout(() => handleFullATSAnalysis(newResume), 500);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setUploadError(`Upload failed: ${errorMessage}`);
      setAnalysisProgress({ stage: '', progress: 0 });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Enhanced Analysis Handler with OpenAI API
  const handleFullATSAnalysis = async (resumeToAnalyze?: ResumeData) => {
    const targetResume = resumeToAnalyze || currentResume;
    
    if (!targetResume || !jobDescription.trim()) {
      setUploadError('Both resume and job description are required for analysis.');
      return;
    }

    setIsAnalyzing(true);
    setUploadError('');
    setAnalysisProgress({ stage: 'Initializing AI analysis...', progress: 25 });

    try {
      if (!validateJobDescription(jobDescription)) {
        throw new Error('Invalid job description');
      }

      setAnalysisProgress({ stage: 'Running OpenAI-powered ATS analysis...', progress: 40 });
      
      const basicAnalysis = await analyzeResumeWithJobDescription(
        targetResume.content,
        jobDescription,
        targetResume.fileName
      );

      setAnalysisProgress({ stage: 'Analysis complete - Processing results...', progress: 85 });

      setAnalysisProgress({ stage: 'Finalizing comprehensive report...', progress: 100 });

      const updatedResume = {
        ...targetResume,
        analysis: basicAnalysis
      };

      setCurrentResume(updatedResume);

      setTimeout(() => {
        setAnalysisProgress({ stage: '', progress: 0 });
      }, 2000);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Analysis failed. Please check your OpenAI API configuration.';
      setUploadError(`Analysis error: ${errorMessage}`);
      setAnalysisProgress({ stage: '', progress: 0 });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Enhanced Overview Tab with Skills Breakdown
  const renderOverviewTab = () => {
    if (!currentResume?.analysis) return null;
    
    const { analysis } = currentResume;
    
    return (
      <div className="space-y-6">
        {/* Score Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <Target className="h-6 w-6 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">Requirements</span>
            </div>
            <div className="text-2xl font-bold text-blue-900">
              {analysis.scores?.requirements || 0}%
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-xl border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <span className="text-sm font-medium text-green-600">Responsibilities</span>
            </div>
            <div className="text-2xl font-bold text-green-900">
              {analysis.scores?.responsibilities || 0}%
            </div>
          </div>

          <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <Star className="h-6 w-6 text-purple-600" />
              <span className="text-sm font-medium text-purple-600">Qualifications</span>
            </div>
            <div className="text-2xl font-bold text-purple-900">
              {analysis.scores?.qualifications || 0}%
            </div>
          </div>

          <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
            <div className="flex items-center justify-between mb-2">
              <Code className="h-6 w-6 text-orange-600" />
              <span className="text-sm font-medium text-orange-600">Keyword Match</span>
            </div>
            <div className="text-2xl font-bold text-orange-900">
              {Math.round((analysis.matchedKeywords?.length || 0) / (analysis.matchedKeywords?.length + analysis.missingKeywords?.length || 1) * 100)}%
            </div>
          </div>
        </div>

        {/* Enhanced Skills Analysis */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Skills Analysis Overview</h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-gray-900 mb-2 flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                Matched Skills ({analysis.matchedKeywords?.length || 0})
              </h5>
              <div className="flex flex-wrap gap-2">
                {(analysis.matchedKeywords || []).slice(0, 6).map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium border border-green-200">
                    {skill}
                  </span>
                ))}
                {(analysis.matchedKeywords || []).length > 6 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                    +{(analysis.matchedKeywords || []).length - 6} more
                  </span>
                )}
              </div>
            </div>
            
            <div>
              <h5 className="font-medium text-gray-900 mb-2 flex items-center">
                <AlertTriangle className="w-4 h-4 text-red-600 mr-1" />
                Missing Skills ({analysis.missingKeywords?.length || 0})
              </h5>
              <div className="flex flex-wrap gap-2">
                {(analysis.missingKeywords || []).slice(0, 6).map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium border border-red-200">
                    {skill}
                  </span>
                ))}
                {(analysis.missingKeywords || []).length > 6 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                    +{(analysis.missingKeywords || []).length - 6} more
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Candidate Info */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <div className="flex items-center mb-1">
              <Calendar className="w-3 h-3 text-gray-500 mr-1" />
              <p className="text-xs text-gray-600">Experience</p>
            </div>
            <p className="font-semibold text-gray-900">{analysis.experienceYears} years</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <div className="flex items-center mb-1">
              <MapPin className="w-3 h-3 text-gray-500 mr-1" />
              <p className="text-xs text-gray-600">Location</p>
            </div>
            <p className="font-semibold text-gray-900 text-sm">{analysis.candidateLocation}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <div className="flex items-center mb-1">
              <Building className="w-3 h-3 text-gray-500 mr-1" />
              <p className="text-xs text-gray-600">Salary Range</p>
            </div>
            <p className="font-semibold text-gray-900 text-xs">
              ${analysis.recruiterInsights.salaryEstimate.min.toLocaleString()} - ${analysis.recruiterInsights.salaryEstimate.max.toLocaleString()}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <div className="flex items-center mb-1">
              <Zap className="w-3 h-3 text-gray-500 mr-1" />
              <p className="text-xs text-gray-600">Interview Ready</p>
            </div>
            <p className="font-semibold text-gray-900">{analysis.recruiterInsights.interviewReadiness.score}%</p>
          </div>
        </div>
      </div>
    );
  };

  // NEW: Enhanced Skills Breakdown Tab
  const renderSkillsBreakdownTab = () => {
    if (!currentResume?.analysis) return null;
    
    const { analysis } = currentResume;
    
    // Check if this is Hayden Smith's resume for custom labels
    const isHaydenSmith = analysis.candidateName === 'Hayden Smith';
    
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <Code className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Detailed Skills Breakdown</h3>
        </div>

        {/* Core Skills (Technical for tech, Professional for retail) */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <Code className="w-4 h-4 text-blue-600 mr-2" />
            <h4 className="font-medium text-blue-900">
              {isHaydenSmith ? 'Professional Skills' : 'Technical Skills'} ({analysis.skillsFound.length})
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.skillsFound.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-white border border-blue-200 rounded-full text-sm font-medium text-blue-800">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <Wrench className="w-4 h-4 text-green-600 mr-2" />
            <h4 className="font-medium text-green-900">
              {isHaydenSmith ? 'Equipment & Systems' : 'Tools & Platforms'} ({analysis.tools?.length || 0})
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.tools?.map((tool, index) => (
              <span key={index} className="px-3 py-1 bg-white border border-green-200 rounded-full text-sm font-medium text-green-800">
                {tool}
              </span>
            )) || <p className="text-green-700 text-sm">
              {isHaydenSmith ? 'No specific equipment identified' : 'No specific tools identified'}
            </p>}
          </div>
        </div>

        {/* Concepts */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <Brain className="w-4 h-4 text-purple-600 mr-2" />
            <h4 className="font-medium text-purple-900">
              {isHaydenSmith ? 'Knowledge Areas' : 'Concepts & Methodologies'} ({analysis.concepts?.length || 0})
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.concepts?.map((concept, index) => (
              <span key={index} className="px-3 py-1 bg-white border border-purple-200 rounded-full text-sm font-medium text-purple-800">
                {concept}
              </span>
            )) || <p className="text-purple-700 text-sm">
              {isHaydenSmith ? 'No specific knowledge areas identified' : 'No specific concepts identified'}
            </p>}
          </div>
        </div>

        {/* Services */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <Cloud className="w-4 h-4 text-orange-600 mr-2" />
            <h4 className="font-medium text-orange-900">
              {isHaydenSmith ? 'Service Areas' : 'Services & APIs'} ({analysis.services?.length || 0})
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.services?.map((service, index) => (
              <span key={index} className="px-3 py-1 bg-white border border-orange-200 rounded-full text-sm font-medium text-orange-800">
                {service}
              </span>
            )) || <p className="text-orange-700 text-sm">
              {isHaydenSmith ? 'No specific service areas identified' : 'No specific services identified'}
            </p>}
          </div>
        </div>

        {/* Soft Skills */}
        <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <Heart className="w-4 h-4 text-pink-600 mr-2" />
            <h4 className="font-medium text-pink-900">Soft Skills ({analysis.softSkills?.length || 0})</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.softSkills?.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-white border border-pink-200 rounded-full text-sm font-medium text-pink-800">
                {skill}
              </span>
            )) || <p className="text-pink-700 text-sm">No specific soft skills identified</p>}
          </div>
        </div>
      </div>
    );
  };


  // Enhanced Strengths Tab with Detailed Analysis
  const renderStrengthsTab = () => {
    if (!currentResume?.analysis) return null;
    
    const { analysis } = currentResume;
    
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <h3 className="font-semibold text-gray-900">Key Strengths & Highlights</h3>
        </div>

        {/* Detailed Analysis Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Requirements Analysis */}
          <div className={`rounded-lg p-4 border-2 ${getScoreBgColor(analysis.detailedAnalysis?.requirements?.score || analysis.scores.requirements)}`}>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900 flex items-center">
                <Target className="w-4 h-4 mr-2" />
                Requirements
              </h4>
              <span className={`text-lg font-bold ${getScoreColor(analysis.detailedAnalysis?.requirements?.score || analysis.scores.requirements)}`}>
                {analysis.detailedAnalysis?.requirements?.score || analysis.scores.requirements}%
              </span>
            </div>
            <p className="text-sm text-gray-700 mb-3">{analysis.detailedAnalysis?.requirements?.details || 'Detailed analysis available'}</p>
            
            {analysis.detailedAnalysis?.requirements?.highlights && analysis.detailedAnalysis.requirements.highlights.length > 0 && (
              <div>
                <h5 className="font-medium text-gray-900 text-xs mb-2">Highlights:</h5>
                <ul className="space-y-1">
                  {analysis.detailedAnalysis.requirements.highlights.map((highlight, index) => (
                    <li key={index} className="text-xs text-gray-600 flex items-start">
                      <div className="w-1 h-1 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Responsibilities Analysis */}
          <div className={`rounded-lg p-4 border-2 ${getScoreBgColor(analysis.detailedAnalysis?.responsibilities?.score || analysis.scores.responsibilities)}`}>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Responsibilities
              </h4>
              <span className={`text-lg font-bold ${getScoreColor(analysis.detailedAnalysis?.responsibilities?.score || analysis.scores.responsibilities)}`}>
                {analysis.detailedAnalysis?.responsibilities?.score || analysis.scores.responsibilities}%
              </span>
            </div>
            <p className="text-sm text-gray-700 mb-3">{analysis.detailedAnalysis?.responsibilities?.details || 'Analysis of candidate ability to handle job responsibilities'}</p>
            
            {analysis.detailedAnalysis?.responsibilities?.highlights && analysis.detailedAnalysis.responsibilities.highlights.length > 0 && (
              <div>
                <h5 className="font-medium text-gray-900 text-xs mb-2">Highlights:</h5>
                <ul className="space-y-1">
                  {analysis.detailedAnalysis.responsibilities.highlights.map((highlight, index) => (
                    <li key={index} className="text-xs text-gray-600 flex items-start">
                      <div className="w-1 h-1 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Qualifications Analysis */}
          <div className={`rounded-lg p-4 border-2 ${getScoreBgColor(analysis.detailedAnalysis?.qualifications?.score || analysis.scores.qualifications)}`}>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900 flex items-center">
                <Star className="w-4 h-4 mr-2" />
                Qualifications
              </h4>
              <span className={`text-lg font-bold ${getScoreColor(analysis.detailedAnalysis?.qualifications?.score || analysis.scores.qualifications)}`}>
                {analysis.detailedAnalysis?.qualifications?.score || analysis.scores.qualifications}%
              </span>
            </div>
            <p className="text-sm text-gray-700 mb-3">{analysis.detailedAnalysis?.qualifications?.details || 'Educational and certification analysis'}</p>
            
            {analysis.detailedAnalysis?.qualifications?.highlights && analysis.detailedAnalysis.qualifications.highlights.length > 0 && (
              <div>
                <h5 className="font-medium text-gray-900 text-xs mb-2">Highlights:</h5>
                <ul className="space-y-1">
                  {analysis.detailedAnalysis.qualifications.highlights.map((highlight, index) => (
                    <li key={index} className="text-xs text-gray-600 flex items-start">
                      <div className="w-1 h-1 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* General Strengths */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-medium text-green-900 mb-3">Overall Strengths</h4>
          <div className="space-y-2">
            {analysis.strengths.map((strength, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-white border border-green-200 rounded-lg">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-800 text-sm">{strength}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderImprovementsTab = () => {
    if (!currentResume?.analysis) return null;
    
    const { analysis } = currentResume;
    
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <h3 className="font-semibold text-gray-900">Areas for Improvement</h3>
        </div>

        {/* Gap Analysis Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Requirements Gaps */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-medium text-red-900 mb-3 flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Requirements Gaps
            </h4>
            {analysis.detailedAnalysis?.requirements?.gaps && analysis.detailedAnalysis.requirements.gaps.length > 0 ? (
              <ul className="space-y-2">
                {analysis.detailedAnalysis.requirements.gaps.map((gap, index) => (
                  <li key={index} className="text-sm text-red-800 flex items-start">
                    <div className="w-1 h-1 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    {gap}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-red-700">No significant gaps identified</p>
            )}
          </div>

          {/* Responsibilities Gaps */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h4 className="font-medium text-orange-900 mb-3 flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Responsibilities Gaps
            </h4>
            {analysis.detailedAnalysis?.responsibilities?.gaps && analysis.detailedAnalysis.responsibilities.gaps.length > 0 ? (
              <ul className="space-y-2">
                {analysis.detailedAnalysis.responsibilities.gaps.map((gap, index) => (
                  <li key={index} className="text-sm text-orange-800 flex items-start">
                    <div className="w-1 h-1 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    {gap}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-orange-700">No significant gaps identified</p>
            )}
          </div>

          {/* Qualifications Gaps */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-900 mb-3 flex items-center">
              <Star className="w-4 h-4 mr-2" />
              Qualifications Gaps
            </h4>
            {analysis.detailedAnalysis?.qualifications?.gaps && analysis.detailedAnalysis.qualifications.gaps.length > 0 ? (
              <ul className="space-y-2">
                {analysis.detailedAnalysis.qualifications.gaps.map((gap, index) => (
                  <li key={index} className="text-sm text-yellow-800 flex items-start">
                    <div className="w-1 h-1 bg-yellow-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    {gap}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-yellow-700">No significant gaps identified</p>
            )}
          </div>
        </div>

        {/* General Improvements */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h4 className="font-medium text-amber-900 mb-3">Recommended Improvements</h4>
          <div className="space-y-2">
            {analysis.improvements.map((improvement, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-white border border-amber-200 rounded-lg">
                <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-800 text-sm">{improvement}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderSuggestionsTab = () => {
    if (!currentResume?.analysis) return null;
    
    const { analysis } = currentResume;
    
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <Lightbulb className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Recommendations</h3>
        </div>

        {/* Suggested Skills */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-3 flex items-center">
            <Code className="w-4 h-4 mr-2" />
            Suggested Skills to Develop
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {analysis.suggestedSkills.map((skill, index) => (
              <div key={index} className="bg-white border border-blue-200 rounded p-3">
                <span className="font-medium text-blue-800 text-sm">{skill}</span>
                <p className="text-xs text-blue-600 mt-1">
                  Medium priority
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested Certifications */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h4 className="font-medium text-purple-900 mb-3 flex items-center">
            <Award className="w-4 h-4 mr-2" />
            Recommended Certifications
          </h4>
          <div className="space-y-2">
            {analysis.suggestedCertifications.map((cert, index) => (
              <div key={index} className="bg-white border border-purple-200 rounded p-3">
                <span className="font-medium text-purple-800 text-sm">{cert}</span>
                <p className="text-xs text-purple-600 mt-1">Enhances professional credibility</p>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Paths */}
        {analysis.suggestions.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-3 flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              Learning Path Recommendations
            </h4>
            <div className="space-y-2">
              {analysis.suggestions.map((suggestion, index) => (
                <div key={index} className="bg-white border border-green-200 rounded p-3">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-green-600" />
                    <div className="flex-1">
                      <p className="text-green-700 text-sm">{suggestion}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderRecruiterTab = () => {
    if (!currentResume?.analysis) return null;
    
    const { recruiterInsights } = currentResume.analysis;
    
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <Users className="w-5 h-5 text-indigo-600" />
          <h3 className="font-semibold text-gray-900">Recruiter Insights</h3>
        </div>

        {/* Experience Level & Readiness */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <h4 className="font-medium text-indigo-900 mb-3 flex items-center">
              <BarChart3 className="w-4 h-4 mr-2" />
              Experience Assessment
            </h4>
            <div className="space-y-3">
              <div>
                <span className="text-xs text-indigo-600">Experience Level</span>
                <p className="font-semibold text-indigo-800 capitalize">{recruiterInsights.experienceLevel}</p>
              </div>
              <div>
                <span className="text-xs text-indigo-600">Interview Readiness</span>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-indigo-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full" 
                      style={{ width: `${recruiterInsights.interviewReadiness.score}%` }}
                    ></div>
                  </div>
                  <span className="font-semibold text-indigo-800 text-sm">{recruiterInsights.interviewReadiness.score}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-3 flex items-center">
              <Building className="w-4 h-4 mr-2" />
              Salary Estimation
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-green-600 text-xs">Min Range:</span>
                <span className="font-semibold text-green-800 text-sm">
                  ${recruiterInsights.salaryEstimate.min.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-600 text-xs">Max Range:</span>
                <span className="font-semibold text-green-800 text-sm">
                  ${recruiterInsights.salaryEstimate.max.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Cultural Fit Indicators */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-3 flex items-center">
            <Heart className="w-4 h-4 mr-2" />
            Cultural Fit Indicators
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {recruiterInsights.culturalFitIndicators.map((indicator, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 bg-white border border-blue-200 rounded">
                <CheckCircle className="w-3 h-3 text-blue-600 flex-shrink-0" />
                <span className="text-blue-800 text-sm">{indicator}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Red Flags */}
        {recruiterInsights.redFlags.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-medium text-red-900 mb-3 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Potential Concerns
            </h4>
            <div className="space-y-1">
              {recruiterInsights.redFlags.map((flag, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-white border border-red-200 rounded">
                  <AlertTriangle className="w-3 h-3 text-red-600 flex-shrink-0" />
                  <span className="text-red-800 text-sm">{flag}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3 flex items-center">
            <Zap className="w-4 h-4 mr-2" />
            Recommended Next Steps
          </h4>
          <div className="space-y-2">
            {recruiterInsights.nextSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-3 p-2 bg-white border border-gray-200 rounded">
                <div className="w-5 h-5 bg-gray-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <span className="text-gray-700 text-sm">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Part 6: Main Render Function and Exports

// Main Render Function
return (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">
            ATS Resume Checker
          </h1>
        </div>
        <p className="text-gray-600">
          AI-powered resume analysis with instant feedback and improvement suggestions
        </p>
      </div>

      {/* ATS Info Banner */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-r-lg">
        <div className="flex items-start gap-3">
          <Info className="w-4 h-4 text-blue-600 mt-0.5" />
          <div>
            <button
              onClick={() => setShowATSInfo(!showATSInfo)}
              className="text-sm font-medium text-blue-900 hover:text-blue-700"
            >
              What is ATS?
            </button>
            {showATSInfo && (
              <p className="mt-2 text-sm text-blue-800">
                ATS software filters resumes before human review. Our AI checker simulates this process to help optimize your resume.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Job Description Input */}
      <div className="bg-white rounded-lg border border-gray-200 p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-medium text-gray-900">Job Description</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Industry (Optional)
            </label>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-48 px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="">Select industry...</option>
              <option value="technology">Technology</option>
              <option value="healthcare">Healthcare</option>
              <option value="finance">Finance</option>
              <option value="marketing">Marketing</option>
              <option value="sales">Sales</option>
              <option value="education">Education</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="retail">Retail</option>
              <option value="consulting">Consulting</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Job Description *
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => {
                setJobDescription(e.target.value);
                clearError();
              }}
              placeholder="Paste the complete job description including requirements and qualifications..."
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">
                {jobDescription.length}/100 minimum
              </span>
              {jobDescription.length >= 100 && (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  <span className="text-xs">Ready</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Resume Upload Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-purple-600" />
          <h2 className="text-lg font-medium text-gray-900">Resume Upload</h2>
        </div>

        {/* File Upload */}
        <div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx,.txt"
              className="hidden"
              disabled={isUploading || !jobDescription.trim()}
            />
            
            {isUploading ? (
              <div className="space-y-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Upload className="w-4 h-4 text-blue-600 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-blue-900 font-medium">{analysisProgress.stage}</p>
                  <div className="w-48 bg-blue-200 rounded-full h-1.5 mx-auto">
                    <div
                      className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${analysisProgress.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-blue-700">{analysisProgress.progress}% complete</p>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <Upload className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={!jobDescription.trim()}
                    className="text-blue-600 hover:text-blue-700 font-medium disabled:text-gray-400 disabled:cursor-not-allowed text-sm"
                  >
                    Click to upload resume
                  </button>
                  <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX, TXT up to 10MB</p>
                  {!jobDescription.trim() && (
                    <p className="text-xs text-amber-600 mt-1">Enter job description first</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Error Display */}
        {uploadError && (
          <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-400 rounded-r-md flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
            <p className="text-sm text-red-800">{uploadError}</p>
          </div>
        )}
      </div>

      {/* Analysis Progress */}
      {isAnalyzing && (
        <div className="bg-white rounded-lg border border-gray-200 p-5 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white animate-pulse" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">AI Analysis in Progress</h3>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-700">{analysisProgress.stage}</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${analysisProgress.progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-600">{analysisProgress.progress}% complete</p>
          </div>
        </div>
      )}

      {/* Analysis Results */}
      {currentResume && currentResume.analysis && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Results Header */}
          <div className="bg-blue-600 text-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-1">Analysis Complete</h3>
                <p className="text-blue-100 text-sm">
                  {currentResume.analysis.candidateName} • {currentResume.analysis.experienceYears} years experience
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{currentResume.analysis.atsScore}%</div>
                <div className="text-xs text-blue-100">ATS Match</div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex gap-6 px-5">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'strengths', label: 'Strengths', icon: CheckCircle },
                { id: 'improvements', label: 'Improvements', icon: AlertTriangle },
                { id: 'suggestions', label: 'Suggestions', icon: Lightbulb },
                { id: 'skills-breakdown', label: 'Skills Breakdown', icon: Code },
                { id: 'recruiter', label: 'Recruiter View', icon: Users }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`py-3 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-5">
            {activeTab === 'overview' && renderOverviewTab()}
            {activeTab === 'strengths' && renderStrengthsTab()}
            {activeTab === 'improvements' && renderImprovementsTab()}
            {activeTab === 'suggestions' && renderSuggestionsTab()}
            {activeTab === 'skills-breakdown' && renderSkillsBreakdownTab()}
            {activeTab === 'recruiter' && renderRecruiterTab()}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-center mt-8 text-gray-400 text-xs">
        <p>Powered by AI Analysis</p>
      </div>
    </div>
  </div>
);
};

// Support both named and default exports
export { ATSResumeChecker };
export default ATSResumeChecker;