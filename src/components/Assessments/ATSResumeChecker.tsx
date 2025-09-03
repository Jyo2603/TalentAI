import React, { useState } from 'react';
import { Upload, FileText, Star, Award, CheckCircle, AlertTriangle, Download, Eye, Trash2, Search, User, TrendingUp, Target, BookOpen, GraduationCap, Briefcase, Clock, DollarSign, X } from 'lucide-react';

interface ResumeAnalysis {
  id: string;
  fileName: string;
  candidateName: string;
  uploadedAt: Date;
  atsScore: number;
  fileSize: string;
  analysis: {
    atsScore: number;
    scores: {
      keywordDensity: number;
      formatCompatibility: number;
      contentQuality: number;
      skillsCoverage: number;
    };
    strengths: string[];
    improvements: string[];
    suggestedSkills: string[];
    suggestedCertifications: string[];
    recruiterInsights: {
      experienceLevel: 'entry' | 'mid' | 'senior' | 'executive';
      roleAlignment: number;
      salaryEstimate: { min: number; max: number };
      interviewReadiness: number;
      culturalFitIndicators: string[];
      redFlags: string[];
      nextSteps: string[];
    };
    skillsFound: string[];
    experienceYears: number;
  };
  status: 'completed';
}

const sampleResumes: ResumeAnalysis[] = [
  {
    id: '1',
    fileName: 'Alex_Johnson_Resume.pdf',
    candidateName: 'Alex Johnson',
    uploadedAt: new Date('2025-01-14T14:20:00'),
    atsScore: 92,
    fileSize: '0.8 MB',
    status: 'completed',
    analysis: {
      atsScore: 92,
      scores: {
        keywordDensity: 95,
        formatCompatibility: 90,
        contentQuality: 92,
        skillsCoverage: 88
      },
      strengths: [
        'Extensive React and TypeScript experience',
        'Strong leadership and mentoring background',
        'Proven track record with large-scale applications',
        'Excellent technical architecture skills'
      ],
      improvements: [
        'Could add more backend development experience',
        'Include cloud infrastructure certifications',
        'Add more cross-functional collaboration examples',
        'Mention specific performance optimization metrics'
      ],
      suggestedSkills: [
        'GraphQL',
        'Next.js',
        'Kubernetes',
        'Microservices',
        'Performance Optimization'
      ],
      suggestedCertifications: [
        'AWS Solutions Architect',
        'React Professional Certification',
        'Google Cloud Professional',
        'Kubernetes Administrator'
      ],
      recruiterInsights: {
        experienceLevel: 'senior',
        roleAlignment: 95,
        salaryEstimate: { min: 140000, max: 180000 },
        interviewReadiness: 95,
        culturalFitIndicators: [
          'Strong mentoring and leadership qualities',
          'Proven ability to work with large teams',
          'Experience with modern development practices',
          'Track record of delivering complex projects'
        ],
        redFlags: [],
        nextSteps: [
          'Schedule technical architecture interview',
          'Discuss team leadership experience',
          'Review portfolio and code samples',
          'Conduct cultural fit assessment'
        ]
      },
      skillsFound: ['React', 'TypeScript', 'JavaScript', 'Node.js', 'CSS', 'HTML', 'GraphQL', 'AWS', 'Git'],
      experienceYears: 5
    }
  },
  {
    id: '2',
    fileName: 'Maria_Rodriguez_Resume.pdf',
    candidateName: 'Maria Rodriguez',
    uploadedAt: new Date('2025-01-13T09:15:00'),
    atsScore: 88,
    fileSize: '1.5 MB',
    status: 'completed',
    analysis: {
      atsScore: 88,
      scores: {
        keywordDensity: 90,
        formatCompatibility: 85,
        contentQuality: 88,
        skillsCoverage: 90
      },
      strengths: [
        'PhD in Computer Science with ML specialization',
        'Published research papers in top-tier conferences',
        'Hands-on experience with TensorFlow and PyTorch',
        'Strong mathematical and statistical background'
      ],
      improvements: [
        'Add more industry/commercial ML experience',
        'Include examples of production ML deployments',
        'Mention experience with MLOps and model monitoring',
        'Add business impact metrics from ML projects'
      ],
      suggestedSkills: [
        'MLOps',
        'Kubernetes',
        'Apache Spark',
        'Model Deployment',
        'A/B Testing'
      ],
      suggestedCertifications: [
        'AWS Machine Learning Specialty',
        'Google Cloud ML Engineer',
        'TensorFlow Developer Certificate',
        'Databricks Certified ML Associate'
      ],
      recruiterInsights: {
        experienceLevel: 'senior',
        roleAlignment: 90,
        salaryEstimate: { min: 160000, max: 200000 },
        interviewReadiness: 85,
        culturalFitIndicators: [
          'Strong research and analytical mindset',
          'Academic excellence and continuous learning',
          'Experience presenting complex technical concepts',
          'Collaborative research background'
        ],
        redFlags: [
          'Limited commercial/industry experience',
          'May need guidance on business applications of ML'
        ],
        nextSteps: [
          'Technical ML interview with case studies',
          'Assess ability to translate research to business value',
          'Evaluate communication skills with non-technical stakeholders',
          'Review research publications and projects'
        ]
      },
      skillsFound: ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Deep Learning', 'Statistics', 'R', 'SQL'],
      experienceYears: 6
    }
  },
  {
    id: '3',
    fileName: 'David_Kim_Resume.pdf',
    candidateName: 'David Kim',
    uploadedAt: new Date('2025-01-12T16:45:00'),
    atsScore: 65,
    fileSize: '0.9 MB',
    status: 'completed',
    analysis: {
      atsScore: 65,
      scores: {
        keywordDensity: 60,
        formatCompatibility: 75,
        contentQuality: 65,
        skillsCoverage: 60
      },
      strengths: [
        'Solid foundation in web development fundamentals',
        'Experience with multiple programming languages',
        'Good problem-solving and analytical skills',
        'Eager to learn and adapt to new technologies'
      ],
      improvements: [
        'Needs more experience with modern frameworks',
        'Limited experience with large-scale applications',
        'Could benefit from more advanced JavaScript knowledge',
        'Lacks experience with cloud platforms and DevOps'
      ],
      suggestedSkills: [
        'React.js',
        'TypeScript',
        'AWS',
        'Docker',
        'API Development'
      ],
      suggestedCertifications: [
        'JavaScript Algorithms and Data Structures',
        'React Developer Certification',
        'AWS Cloud Practitioner',
        'Google Analytics Certified'
      ],
      recruiterInsights: {
        experienceLevel: 'mid',
        roleAlignment: 65,
        salaryEstimate: { min: 75000, max: 95000 },
        interviewReadiness: 70,
        culturalFitIndicators: [
          'Shows willingness to learn new technologies',
          'Good communication skills',
          'Team player with collaborative mindset'
        ],
        redFlags: [
          'May need significant training and mentoring',
          'Limited experience with modern development practices',
          'Gaps in advanced technical knowledge'
        ],
        nextSteps: [
          'Conduct technical skills assessment',
          'Evaluate learning ability and growth potential',
          'Assess fit for junior or mid-level positions',
          'Consider for roles with strong mentorship support'
        ]
      },
      skillsFound: ['JavaScript', 'HTML', 'CSS', 'PHP', 'MySQL', 'jQuery', 'Bootstrap'],
      experienceYears: 3
    }
  },
  {
    id: '4',
    fileName: 'Sarah_Wilson_Resume.pdf',
    candidateName: 'Sarah Wilson',
    uploadedAt: new Date('2025-01-11T11:30:00'),
    atsScore: 95,
    fileSize: '1.1 MB',
    status: 'completed',
    analysis: {
      atsScore: 95,
      scores: {
        keywordDensity: 98,
        formatCompatibility: 95,
        contentQuality: 95,
        skillsCoverage: 92
      },
      strengths: [
        'Exceptional product management experience at scale',
        'Strong data-driven decision making approach',
        'Proven track record of successful product launches',
        'Excellent stakeholder management and communication skills'
      ],
      improvements: [
        'Could add more technical depth understanding',
        'Include more international market experience',
        'Add examples of crisis management and pivoting',
        'Mention experience with emerging technologies'
      ],
      suggestedSkills: [
        'Product Analytics',
        'A/B Testing',
        'User Research',
        'Roadmap Planning',
        'Agile Methodologies'
      ],
      suggestedCertifications: [
        'Certified Product Manager (CPM)',
        'Google Analytics Certified',
        'Scrum Product Owner Certification',
        'Design Thinking Certification'
      ],
      recruiterInsights: {
        experienceLevel: 'senior',
        roleAlignment: 95,
        salaryEstimate: { min: 150000, max: 190000 },
        interviewReadiness: 95,
        culturalFitIndicators: [
          'Strong strategic thinking and vision',
          'Data-driven approach to product decisions',
          'Excellent cross-functional collaboration',
          'Customer-centric mindset and user empathy'
        ],
        redFlags: [],
        nextSteps: [
          'Product strategy case study interview',
          'Stakeholder management scenario assessment',
          'Review product portfolio and success metrics',
          'Cultural fit and leadership style evaluation'
        ]
      },
      skillsFound: ['Product Strategy', 'Analytics', 'User Research', 'Agile', 'Roadmapping', 'A/B Testing', 'SQL'],
      experienceYears: 8
    }
  }
];

export const ATSResumeChecker: React.FC = () => {
  const [uploadedResumes, setUploadedResumes] = useState<ResumeAnalysis[]>(sampleResumes);
  const [selectedResume, setSelectedResume] = useState<ResumeAnalysis | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeAnalysisTab, setActiveAnalysisTab] = useState<'overview' | 'strengths' | 'improvements' | 'suggestions' | 'insights'>('overview');

  const filteredResumes = uploadedResumes.filter(resume => {
    const searchLower = searchTerm.toLowerCase();
    return resume.fileName.toLowerCase().includes(searchLower) ||
           resume.candidateName?.toLowerCase().includes(searchLower);
  });

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getExperienceLevelColor = (level: string) => {
    switch (level) {
      case 'entry': return 'bg-blue-100 text-blue-800';
      case 'mid': return 'bg-green-100 text-green-800';
      case 'senior': return 'bg-purple-100 text-purple-800';
      case 'executive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const deleteResume = (id: string) => {
    setUploadedResumes(prev => prev.filter(resume => resume.id !== id));
    if (selectedResume?.id === id) {
      setSelectedResume(uploadedResumes.find(r => r.id !== id) || null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Create new sample resume
    const newResume: ResumeAnalysis = {
      id: Date.now().toString(),
      fileName: file.name,
      candidateName: file.name.replace(/\.(pdf|doc|docx)$/i, '').replace(/[-_]/g, ' '),
      uploadedAt: new Date(),
      atsScore: Math.floor(Math.random() * 40) + 60, // 60-100
      fileSize: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      status: 'completed',
      analysis: {
        atsScore: Math.floor(Math.random() * 40) + 60,
        scores: {
          keywordDensity: Math.floor(Math.random() * 30) + 70,
          formatCompatibility: Math.floor(Math.random() * 20) + 80,
          contentQuality: Math.floor(Math.random() * 30) + 70,
          skillsCoverage: Math.floor(Math.random() * 40) + 60
        },
        strengths: [
          'Good technical foundation',
          'Relevant educational background',
          'Shows learning potential',
          'Professional presentation'
        ],
        improvements: [
          'Add more industry experience',
          'Include quantifiable achievements',
          'Expand technical skill set',
          'Add professional references'
        ],
        suggestedSkills: ['React', 'TypeScript', 'AWS', 'Docker', 'Testing'],
        suggestedCertifications: ['AWS Certified', 'React Professional', 'Google Analytics'],
        recruiterInsights: {
          experienceLevel: 'entry',
          roleAlignment: Math.floor(Math.random() * 30) + 60,
          salaryEstimate: { min: 50000, max: 75000 },
          interviewReadiness: Math.floor(Math.random() * 30) + 70,
          culturalFitIndicators: [
            'Shows initiative and drive',
            'Good communication skills',
            'Team collaboration experience'
          ],
          redFlags: ['Limited professional experience'],
          nextSteps: [
            'Technical screening interview',
            'Skills assessment test',
            'Cultural fit evaluation'
          ]
        },
        skillsFound: ['JavaScript', 'HTML', 'CSS', 'Python', 'Git'],
        experienceYears: Math.random() > 0.5 ? 1 : 2
      }
    };

    setUploadedResumes(prev => [newResume, ...prev]);
    setSelectedResume(newResume);
    
    // Clear input
    e.target.value = '';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">ATS Resume Checker</h2>
          <p className="text-gray-600 mt-1">Analyze resumes for ATS compatibility and get detailed insights</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search resumes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors flex items-center space-x-2">
            <Upload size={16} />
            <span>Upload Resume</span>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resume List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Analyzed Resumes ({filteredResumes.length})</h3>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              <div className="space-y-2 p-2">
                {filteredResumes.map((resume) => (
                  <div
                    key={resume.id}
                    onClick={() => setSelectedResume(resume)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedResume?.id === resume.id 
                        ? 'bg-blue-50 border border-blue-200' 
                        : 'hover:bg-gray-50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{resume.candidateName}</p>
                        <p className="text-xs text-gray-500 truncate">{resume.fileName}</p>
                        <p className="text-xs text-gray-400">{resume.uploadedAt.toLocaleDateString()}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getScoreColor(resume.atsScore)}`}>
                          {resume.atsScore}%
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteResume(resume.id);
                          }}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            resume.atsScore >= 80 ? 'bg-green-500' : 
                            resume.atsScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${resume.atsScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Details */}
        <div className="lg:col-span-2">
          {!selectedResume ? (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <Eye size={48} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Resume to View Analysis</h3>
              <p className="text-gray-600">Choose a resume from the list to see detailed ATS analysis and insights</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedResume.candidateName}</h3>
                    <p className="text-sm text-gray-600">{selectedResume.fileName} • {selectedResume.fileSize}</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">ATS Score</p>
                      <span className={`text-2xl font-bold px-3 py-1 rounded-lg ${getScoreColor(selectedResume.atsScore)}`}>
                        {selectedResume.atsScore}%
                      </span>
                    </div>
                    
                    <button
                      onClick={() => setSelectedResume(null)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Score Breakdown */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-blue-800">{selectedResume.analysis.scores.keywordDensity}%</p>
                    <p className="text-xs text-blue-600">Keyword Density</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-green-800">{selectedResume.analysis.scores.formatCompatibility}%</p>
                    <p className="text-xs text-green-600">Format Score</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-purple-800">{selectedResume.analysis.scores.contentQuality}%</p>
                    <p className="text-xs text-purple-600">Content Quality</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-orange-800">{selectedResume.analysis.scores.skillsCoverage}%</p>
                    <p className="text-xs text-orange-600">Skills Coverage</p>
                  </div>
                </div>

                {/* Quick Insights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <User size={14} className="text-gray-600" />
                      <span className="text-xs font-medium text-gray-700">Experience Level</span>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getExperienceLevelColor(selectedResume.analysis.recruiterInsights.experienceLevel)}`}>
                      {selectedResume.analysis.recruiterInsights.experienceLevel} ({selectedResume.analysis.experienceYears} years)
                    </span>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <DollarSign size={14} className="text-gray-600" />
                      <span className="text-xs font-medium text-gray-700">Salary Estimate</span>
                    </div>
                    <p className="text-sm font-bold text-gray-900">
                      ${selectedResume.analysis.recruiterInsights.salaryEstimate.min.toLocaleString()} - ${selectedResume.analysis.recruiterInsights.salaryEstimate.max.toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Target size={14} className="text-gray-600" />
                      <span className="text-xs font-medium text-gray-700">Role Alignment</span>
                    </div>
                    <p className="text-sm font-bold text-gray-900">{selectedResume.analysis.recruiterInsights.roleAlignment}%</p>
                  </div>
                </div>

                {/* Analysis Tabs */}
                <div className="border-b border-gray-200 mb-6">
                  <nav className="flex space-x-8" aria-label="Tabs">
                    {[
                      { id: 'overview', name: 'Overview', icon: TrendingUp },
                      { id: 'strengths', name: 'Strengths', icon: CheckCircle },
                      { id: 'improvements', name: 'Improvements', icon: AlertTriangle },
                      { id: 'suggestions', name: 'Suggestions', icon: BookOpen },
                      { id: 'insights', name: 'Recruiter Insights', icon: Briefcase }
                    ].map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveAnalysisTab(tab.id as any)}
                          className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                            activeAnalysisTab === tab.id
                              ? 'border-blue-500 text-blue-600'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          <Icon size={16} />
                          <span>{tab.name}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Tab Content */}
                {activeAnalysisTab === 'overview' && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills Detected</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedResume.analysis.skillsFound.map((skill) => (
                          <span key={skill} className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeAnalysisTab === 'strengths' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume Strengths</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedResume.analysis.strengths.map((strength, index) => (
                        <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="flex items-start space-x-3">
                            <CheckCircle size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-green-800">{strength}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeAnalysisTab === 'improvements' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Areas for Improvement</h3>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {selectedResume.analysis.improvements.map((improvement, index) => (
                        <div key={index} className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                          <div className="flex items-start space-x-3">
                            <AlertTriangle size={18} className="text-orange-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-orange-800">{improvement}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeAnalysisTab === 'suggestions' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-blue-900 mb-4 flex items-center space-x-2">
                        <Target size={20} />
                        <span>Suggested Skills</span>
                      </h4>
                      <div className="space-y-3">
                        {selectedResume.analysis.suggestedSkills.map((skill, index) => (
                          <div key={index} className="bg-white border border-blue-200 rounded-lg p-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-blue-800">{skill}</span>
                              <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">High Impact</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-purple-900 mb-4 flex items-center space-x-2">
                        <Award size={20} />
                        <span>Recommended Certifications</span>
                      </h4>
                      <div className="space-y-3">
                        {selectedResume.analysis.suggestedCertifications.map((cert, index) => (
                          <div key={index} className="bg-white border border-purple-200 rounded-lg p-3">
                            <div className="flex items-start space-x-3">
                              <Award size={16} className="text-purple-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-sm font-medium text-purple-800">{cert}</p>
                                <p className="text-xs text-purple-600 mt-1">Industry recognized</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeAnalysisTab === 'insights' && (
                  <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-blue-900 mb-4">Candidate Profile</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-blue-700 font-medium">Experience Level</p>
                          <span className={`inline-block px-3 py-1 rounded-lg text-sm font-medium ${getExperienceLevelColor(selectedResume.analysis.recruiterInsights.experienceLevel)}`}>
                            {selectedResume.analysis.recruiterInsights.experienceLevel} ({selectedResume.analysis.experienceYears} years)
                          </span>
                        </div>
                        <div>
                          <p className="text-sm text-blue-700 font-medium">Role Alignment</p>
                          <p className="text-xl font-bold text-blue-800">{selectedResume.analysis.recruiterInsights.roleAlignment}%</p>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <p className="text-sm text-blue-700 font-medium mb-2">Estimated Salary Range</p>
                        <div className="bg-white rounded-lg p-3 border border-blue-200">
                          <p className="text-lg font-bold text-gray-900">
                            ${selectedResume.analysis.recruiterInsights.salaryEstimate.min.toLocaleString()} - ${selectedResume.analysis.recruiterInsights.salaryEstimate.max.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-600">Based on experience and skills</p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className="text-sm text-blue-700 font-medium mb-2">Interview Readiness</p>
                        <div className="flex items-center space-x-3">
                          <div className="flex-1 bg-blue-200 rounded-full h-3">
                            <div 
                              className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                              style={{ width: `${selectedResume.analysis.recruiterInsights.interviewReadiness}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-bold text-blue-800">{selectedResume.analysis.recruiterInsights.interviewReadiness}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-green-900 mb-4">Cultural Fit Indicators</h4>
                      <div className="space-y-2">
                        {selectedResume.analysis.recruiterInsights.culturalFitIndicators.map((indicator, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-green-800">{indicator}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {selectedResume.analysis.recruiterInsights.redFlags.length > 0 && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-red-900 mb-4">Potential Concerns</h4>
                        <div className="space-y-2">
                          {selectedResume.analysis.recruiterInsights.redFlags.map((flag, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <AlertTriangle size={16} className="text-red-600 mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-red-800">{flag}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                        <Briefcase size={20} />
                        <span>Recommended Next Steps</span>
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedResume.analysis.recruiterInsights.nextSteps.map((step, index) => (
                          <div key={index} className="bg-white border border-gray-200 rounded-lg p-3">
                            <div className="flex items-start space-x-3">
                              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-xs font-bold text-white">{index + 1}</span>
                              </div>
                              <p className="text-sm text-gray-800">{step}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};