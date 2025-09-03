import React, { useState } from 'react';
import { BookOpen, Wand2, BarChart3, FileText } from 'lucide-react';
import { AssessmentLibrary } from './AssessmentLibrary';
import { AIAssessmentGenerator } from './AIAssessmentGenerator';
import { ResultsDashboard } from './ResultsDashboard';
import { ATSResumeChecker } from './ATSResumeChecker';
import type { Assessment } from '../../types/assessment';

export const Assessments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'library' | 'ai-generator' | 'ats-checker' | 'results'>('library');
  const [assessments, setAssessments] = useState<Assessment[]>(() => {
    // Load assessments from localStorage
    const saved = localStorage.getItem('assessments');
    return saved ? JSON.parse(saved) : [];
  });

  // Reload assessments when component mounts or tab changes
  React.useEffect(() => {
    const saved = localStorage.getItem('assessments');
    if (saved) {
      setAssessments(JSON.parse(saved));
    }
  }, [activeTab]);

  const tabs = [
    { 
      id: 'library' as const, 
      label: 'Assessment Library', 
      icon: BookOpen,
      description: 'Pre-built role-based assessments'
    },
    { 
      id: 'ai-generator' as const, 
      label: 'AI Generator', 
      icon: Wand2,
      description: 'Generate tests from job descriptions'
    },
    { 
      id: 'ats-checker' as const, 
      label: 'ATS Resume Checker', 
      icon: FileText,
      description: 'Upload and analyze resume ATS scores'
    },
    { 
      id: 'results' as const, 
      label: 'Results Dashboard', 
      icon: BarChart3,
      description: 'View candidate scores and progress'
    }
  ];

  const handleSaveAssessment = (assessmentData: Partial<Assessment>) => {
    const newAssessment: Assessment = {
      id: Date.now().toString(),
      title: assessmentData.title || 'New Assessment',
      description: assessmentData.description || '',
      type: assessmentData.type || 'ai-generated',
      role: assessmentData.role || '',
      department: assessmentData.department || '',
      skills: assessmentData.skills || [],
      questions: assessmentData.questions || [],
      timeLimit: assessmentData.timeLimit || 60,
      passingScore: assessmentData.passingScore || 70,
      difficulty: assessmentData.difficulty || 'intermediate',
      estimatedDuration: assessmentData.estimatedDuration || 60,
      isActive: true,
      createdBy: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      usageCount: 0
    };
    
    const updatedAssessments = [newAssessment, ...assessments];
    setAssessments(updatedAssessments);
    
    // Save to localStorage
    localStorage.setItem('assessments', JSON.stringify(updatedAssessments));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'library':
        return <AssessmentLibrary assessments={assessments} onSaveAssessment={handleSaveAssessment} />;
      case 'ai-generator':
        return <AIAssessmentGenerator onSaveAssessment={handleSaveAssessment} />;
      case 'ats-checker':
        return <ATSResumeChecker />;
      case 'results':
        return <ResultsDashboard assessments={assessments} />;
      default:
        return <AssessmentLibrary assessments={assessments} onSaveAssessment={handleSaveAssessment} />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Assessments</h1>
          <p className="text-gray-600 mt-2">Create, manage, and analyze candidate assessments</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-3 px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={18} />
                  <div className="text-left">
                    <div>{tab.label}</div>
                    <div className="text-xs opacity-75">{tab.description}</div>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};